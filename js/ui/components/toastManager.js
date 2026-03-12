/* ============================================================
   TOAST MANAGER — Notification Toast System
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Displays non-blocking notification toasts with:
   - 4 types: info, success, error, warning
   - Auto-dismiss with configurable duration
   - Maximum visible toasts (oldest removed first)
   - Smooth enter/exit animations via CSS classes
   - Accessible (role="status", aria-live)
   - Stack from bottom-right on desktop, bottom on mobile

   Toast HTML structure (dynamically created):
   <div class="toast toast-{type}" role="status" aria-live="polite">
     <span class="toast-icon">{icon}</span>
     <span class="toast-msg">{message}</span>
     <button class="toast-close" aria-label="Close">×</button>
   </div>

   Dependencies: UIConstants (for durations, max visible, icons)
   Used by: Every module that needs user feedback
   ============================================================ */

'use strict';

var ToastManager = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _container    = null;   // The toast container element
  var _activeToasts = [];     // Array of { element, timerId }
  var _idCounter    = 0;


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Get toast settings from UIConstants or defaults.
   */
  function _getSettings() {
    var UC = window.UIConstants;
    return {
      maxVisible:     (UC && UC.TOAST_MAX_VISIBLE)       || 3,
      defaultDur:     (UC && UC.TOAST_DEFAULT_DURATION)   || 3000,
      errorDur:       (UC && UC.TOAST_ERROR_DURATION)     || 4000,
      quickDur:       (UC && UC.TOAST_QUICK_DURATION)     || 1500,
      exitAnimMs:     (UC && UC.TOAST_EXIT_ANIMATION_MS)  || 300,
      icons: (UC && UC.TOAST_ICONS) || {
        info:    'ℹ️',
        success: '✅',
        error:   '❌',
        warning: '⚠️'
      }
    };
  }

  /**
   * Ensure the toast container exists in the DOM.
   * @returns {HTMLElement}
   */
  function _ensureContainer() {
    if (_container && document.body.contains(_container)) {
      return _container;
    }

    // Check if container already exists (from HTML)
    _container = document.getElementById('toast-container');

    if (!_container) {
      _container = document.createElement('div');
      _container.id = 'toast-container';
      _container.className = 'toast-container';
      _container.setAttribute('aria-live', 'polite');
      _container.setAttribute('aria-relevant', 'additions');
      document.body.appendChild(_container);
    }

    return _container;
  }

  /**
   * Get duration for a given toast type.
   * @param {string} type
   * @param {number} [customDuration]
   * @returns {number} milliseconds
   */
  function _getDuration(type, customDuration) {
    if (typeof customDuration === 'number' && customDuration > 0) {
      return customDuration;
    }

    var s = _getSettings();
    if (type === 'error')   return s.errorDur;
    if (type === 'success') return s.quickDur;
    return s.defaultDur;
  }

  /**
   * Remove a toast from the DOM with exit animation.
   * @param {string} toastId
   */
  function _dismiss(toastId) {
    var index = -1;
    for (var i = 0; i < _activeToasts.length; i++) {
      if (_activeToasts[i].id === toastId) {
        index = i;
        break;
      }
    }

    if (index === -1) return;

    var entry = _activeToasts[index];

    // Clear auto-dismiss timer
    if (entry.timerId) {
      clearTimeout(entry.timerId);
    }

    // Start exit animation
    entry.element.classList.add('toast-exit');

    // Remove from DOM after animation
    var exitMs = _getSettings().exitAnimMs;
    setTimeout(function() {
      if (entry.element.parentNode) {
        entry.element.parentNode.removeChild(entry.element);
      }

      // Remove from active list
      for (var j = 0; j < _activeToasts.length; j++) {
        if (_activeToasts[j].id === toastId) {
          _activeToasts.splice(j, 1);
          break;
        }
      }
    }, exitMs);
  }

  /**
   * Enforce max visible toasts — remove oldest if over limit.
   */
  function _enforceMaxVisible() {
    var max = _getSettings().maxVisible;
    while (_activeToasts.length >= max) {
      var oldest = _activeToasts[0];
      if (oldest) {
        _dismiss(oldest.id);
      } else {
        break;
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Show a toast notification.
     *
     * @param {string} message - The message text
     * @param {string} [type='info'] - 'info' | 'success' | 'error' | 'warning'
     * @param {number} [duration] - Custom auto-dismiss duration (ms)
     * @returns {string} Toast ID (for manual dismiss)
     */
    show: function(message, type, duration) {
      type = type || 'info';
      var settings = _getSettings();
      var container = _ensureContainer();
      var toastId = 'toast_' + (++_idCounter);
      var dur = _getDuration(type, duration);

      // Enforce max visible
      _enforceMaxVisible();

      // ── Create toast element ──
      var toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.id = toastId;
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');

      // Icon
      var icon = document.createElement('span');
      icon.className = 'toast-icon';
      icon.textContent = settings.icons[type] || settings.icons.info;
      icon.setAttribute('aria-hidden', 'true');

      // Message
      var msg = document.createElement('span');
      msg.className = 'toast-msg';
      msg.textContent = message;

      // Close button
      var closeBtn = document.createElement('button');
      closeBtn.className = 'toast-close';
      closeBtn.setAttribute('aria-label', 'Close notification');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', function() {
        _dismiss(toastId);
      });

      // Assemble
      toast.appendChild(icon);
      toast.appendChild(msg);
      toast.appendChild(closeBtn);

      // Add to container
      container.appendChild(toast);

      // Trigger enter animation (force reflow)
      toast.offsetHeight; // eslint-disable-line no-unused-expressions
      toast.classList.add('toast-enter');

      // ── Auto-dismiss timer ──
      var timerId = setTimeout(function() {
        _dismiss(toastId);
      }, dur);

      // ── Track active toast ──
      _activeToasts.push({
        id:      toastId,
        element: toast,
        timerId: timerId,
        type:    type
      });

      return toastId;
    },

    /**
     * Manually dismiss a toast by ID.
     * @param {string} toastId
     */
    dismiss: function(toastId) {
      _dismiss(toastId);
    },

    /**
     * Dismiss all active toasts.
     */
    dismissAll: function() {
      // Dismiss from newest to oldest to avoid index shifting
      var ids = [];
      for (var i = 0; i < _activeToasts.length; i++) {
        ids.push(_activeToasts[i].id);
      }
      for (var j = 0; j < ids.length; j++) {
        _dismiss(ids[j]);
      }
    },

    /**
     * Convenience: Show an info toast.
     * @param {string} message
     * @returns {string} Toast ID
     */
    info: function(message) {
      return this.show(message, 'info');
    },

    /**
     * Convenience: Show a success toast.
     * @param {string} message
     * @returns {string} Toast ID
     */
    success: function(message) {
      return this.show(message, 'success');
    },

    /**
     * Convenience: Show an error toast.
     * @param {string} message
     * @returns {string} Toast ID
     */
    error: function(message) {
      return this.show(message, 'error');
    },

    /**
     * Convenience: Show a warning toast.
     * @param {string} message
     * @returns {string} Toast ID
     */
    warning: function(message) {
      return this.show(message, 'warning');
    },

    /**
     * Get the number of currently visible toasts.
     * @returns {number}
     */
    getActiveCount: function() {
      return _activeToasts.length;
    }
  };

})();

// Expose globally
window.ToastManager = ToastManager;
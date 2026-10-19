/* ============================================================
   PALETTE MANAGER — Question Navigation Palette Controller
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Manages the question palette UI (both mobile modal & desktop sidebar):
   - Renders numbered grid buttons (1–N)
   - Color-codes by status: current / answered / review / visited / unanswered
   - Handles click-to-jump navigation
   - Renders summary stats (answered / unanswered / review counts)
   - Mobile: Opens as a bottom sheet modal
   - Desktop: Updates the sidebar palette in real-time

   Color coding:
   - Blue outline  → Current question
   - Green fill    → Answered
   - Amber fill    → Marked for review
   - No fill       → Unanswered (default grey border)

   Dependencies: ExamState, ExamEngine, Helpers
   Used by: ExamRenderer, ExamEngine
   ============================================================ */

'use strict';

var PaletteManager = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _isModalOpen = false;


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Escape HTML (safety for any dynamic content).
   * @param {string} str
   * @returns {string}
   */
  function _esc(str) {
    if (window.Helpers && typeof Helpers.escapeHtml === 'function') {
      return Helpers.escapeHtml(str);
    }
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Get CSS class for a palette button based on question status.
   * @param {number} idx - Question index
   * @returns {string} CSS class(es)
   */
  function _getButtonClass(idx) {
    if (!window.ExamState) return '';
    var status = ExamState.getPaletteStatus(idx);
    switch (status) {
      case 'current':    return 'current';
      case 'answered':   return 'answered';
      case 'review':     return 'review';
      case 'visited':    return 'visited';
      case 'unanswered':
      default:           return '';
    }
  }

  /**
   * Build the palette grid HTML.
   * @returns {string}
   */
  function _buildGridHTML() {
    if (!window.ExamState) return '';

    var total = ExamState.getTotalQuestions();
    if (total === 0) return '<p class="palette-empty">No questions</p>';

    var html = '<div class="palette-grid">';

    for (var i = 0; i < total; i++) {
      var cls  = _getButtonClass(i);
      var num  = i + 1;
      var ariaLabel = 'Question ' + num;

      // Add status to aria-label
      var status = ExamState.getPaletteStatus(i);
      if (status === 'answered') ariaLabel += ' (answered)';
      else if (status === 'review') ariaLabel += ' (marked for review)';
      else if (status === 'current') ariaLabel += ' (current)';

      html += '<button class="pal-btn ' + cls + '" ' +
              'data-pal-idx="' + i + '" ' +
              'aria-label="' + _esc(ariaLabel) + '">' +
              num +
              '</button>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Build the palette summary stats HTML.
   * @returns {string}
   */
  function _buildSummaryHTML() {
    if (!window.ExamState) return '';

    var counts = ExamState.getCounts();

    return '<div class="palette-summary">' +
      '<div class="pal-stat">' +
        '<span class="pal-stat-dot" style="background:var(--c-green)"></span>' +
        '<span>' + counts.answered + ' Answered</span>' +
      '</div>' +
      '<div class="pal-stat">' +
        '<span class="pal-stat-dot" style="background:var(--c-text-3)"></span>' +
        '<span>' + counts.unanswered + ' Unanswered</span>' +
      '</div>' +
      '<div class="pal-stat">' +
        '<span class="pal-stat-dot" style="background:var(--c-amber)"></span>' +
        '<span>' + counts.review + ' Review</span>' +
      '</div>' +
    '</div>';
  }

  /**
   * Attach click handlers to palette buttons using event delegation.
   * @param {HTMLElement} container - The container holding palette buttons
   */
  function _attachClickHandlers(container) {
    if (!container) return;

    container.addEventListener('click', function(e) {
      var btn = e.target.closest('.pal-btn');
      if (!btn) return;

      var idx = parseInt(btn.getAttribute('data-pal-idx'), 10);
      if (isNaN(idx)) return;

      // Navigate to the question
      if (window.ExamEngine && typeof ExamEngine.goToQuestion === 'function') {
        ExamEngine.goToQuestion(idx);
      }

      // Close mobile modal if open
      if (_isModalOpen) {
        PaletteManager.closeModal();
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /* ─────────────────────────────────────────────────────────
       SIDEBAR PALETTE (desktop)
       ───────────────────────────────────────────────────────── */

    /**
     * Render the full sidebar palette (desktop).
     * Called once when exam starts.
     * @param {string} containerId - ID of the sidebar palette container
     */
    renderSidebar: function(containerId) {
      var container = document.getElementById(containerId);
      if (!container) return;

      var html = _buildSummaryHTML() + _buildGridHTML();
      container.innerHTML = html;

      _attachClickHandlers(container);
    },

    /**
     * Update just the palette button states and summary (no full re-render).
     * Called after every answer/navigation/review change.
     */
    updatePalette: function() {
      // ── Update sidebar buttons ──
      var sidebarBtns = document.querySelectorAll('.exam-sidebar .pal-btn');
      for (var i = 0; i < sidebarBtns.length; i++) {
        var idx = parseInt(sidebarBtns[i].getAttribute('data-pal-idx'), 10);
        if (isNaN(idx)) continue;

        var newClass = _getButtonClass(idx);
        // Reset status classes
        sidebarBtns[i].className = 'pal-btn' + (newClass ? ' ' + newClass : '');
      }

      // ── Update modal buttons (if open) ──
      var modalBtns = document.querySelectorAll('.palette-modal .pal-btn');
      for (var j = 0; j < modalBtns.length; j++) {
        var mIdx = parseInt(modalBtns[j].getAttribute('data-pal-idx'), 10);
        if (isNaN(mIdx)) continue;

        var mClass = _getButtonClass(mIdx);
        modalBtns[j].className = 'pal-btn' + (mClass ? ' ' + mClass : '');
      }

      // ── Ensure active button is scrolled into view in sidebar grid ──
      var currentBtn = document.querySelector('.exam-sidebar .pal-btn.current');
      if (currentBtn && typeof currentBtn.scrollIntoView === 'function') {
        currentBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }

      // ── Update summary stats ──
      this.updateSummary();
    },

    /**
     * Update the summary stats in both sidebar and modal.
     */
    updateSummary: function() {
      if (!window.ExamState) return;

      var counts = ExamState.getCounts();

      // Update all summary containers
      var summaries = document.querySelectorAll('.palette-summary .pal-stat span:last-child');
      if (summaries.length >= 3) {
        summaries[0].textContent = counts.answered   + ' Answered';
        summaries[1].textContent = counts.unanswered + ' Unanswered';
        summaries[2].textContent = counts.review     + ' Review';
      }
    },

    /* ─────────────────────────────────────────────────────────
       MOBILE MODAL PALETTE
       ───────────────────────────────────────────────────────── */

    /**
     * Open the palette as a bottom-sheet modal (mobile).
     */
    openModal: function() {
      if (_isModalOpen) return;
      _isModalOpen = true;

      // Check if modal already exists
      var existing = document.getElementById('palette-modal-overlay');
      if (existing) {
        existing.classList.remove('hidden');
        existing.classList.add('modal-enter');
        return;
      }

      // ── Create modal overlay ──
      var overlay = document.createElement('div');
      overlay.id = 'palette-modal-overlay';
      overlay.className = 'modal-overlay modal-enter';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Question Palette');

      // ── Create modal content ──
      var modal = document.createElement('div');
      modal.className = 'modal-sheet palette-modal';

      // Header
      var header = document.createElement('div');
      header.className = 'modal-header';
      header.innerHTML =
        '<h3 class="modal-title">Question Palette</h3>' +
        '<button class="modal-close-btn" aria-label="Close palette">&times;</button>';

      // Body
      var body = document.createElement('div');
      body.className = 'modal-body';
      body.innerHTML = _buildSummaryHTML() + _buildGridHTML();

      // Assemble
      modal.appendChild(header);
      modal.appendChild(body);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      // ── Attach handlers ──
      _attachClickHandlers(body);

      // Close button
      var closeBtn = header.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          PaletteManager.closeModal();
        });
      }

      // Close on overlay click (outside modal)
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          PaletteManager.closeModal();
        }
      });

      // Close on Escape
      var escHandler = function(e) {
        if (e.key === 'Escape') {
          PaletteManager.closeModal();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);

      // Focus trap — focus close button
      if (closeBtn) closeBtn.focus();

      // Pause timer while palette is open (optional UX)
      // Not pausing — palette is quick-use overlay
    },

    /**
     * Close the palette modal.
     */
    closeModal: function() {
      if (!_isModalOpen) return;
      _isModalOpen = false;

      var overlay = document.getElementById('palette-modal-overlay');
      if (overlay) {
        overlay.classList.add('modal-exit');

        setTimeout(function() {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 300); // Match CSS exit animation
      }
    },

    /**
     * Toggle the palette modal (mobile).
     */
    toggle: function() {
      if (_isModalOpen) {
        this.closeModal();
      } else {
        this.openModal();
      }
    },

    /**
     * Check if the palette modal is currently open.
     * @returns {boolean}
     */
    isModalOpen: function() {
      return _isModalOpen;
    },

    /* ─────────────────────────────────────────────────────────
       STATUS STRIP (mobile — above bottom nav)
       ───────────────────────────────────────────────────────── */

    /**
     * Update the status strip counts (mobile view).
     */
    updateStatusStrip: function() {
      if (!window.ExamState) return;

      var counts = ExamState.getCounts();

      // Find status strip elements
      var ansEl   = document.getElementById('ss-answered-count');
      var unansEl = document.getElementById('ss-unanswered-count');
      var revEl   = document.getElementById('ss-review-count');

      if (ansEl)   ansEl.textContent = counts.answered;
      if (unansEl) unansEl.textContent = counts.unanswered;
      if (revEl)   revEl.textContent = counts.review;
    },

    /* ─────────────────────────────────────────────────────────
       FULL RENDER (called once on exam start)
       ────────────────────────────────────────────────���──────── */

    /**
     * Full initial render of palette (sidebar + status strip).
     * @param {string} sidebarContainerId
     */
    init: function(sidebarContainerId) {
      this.renderSidebar(sidebarContainerId);
      this.updateStatusStrip();
    },

    /**
     * Clean up palette state (on exam exit/submit).
     */
    destroy: function() {
      _isModalOpen = false;
      var overlay = document.getElementById('palette-modal-overlay');
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }
  };

})();

// Expose globally
window.PaletteManager = PaletteManager;
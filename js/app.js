/* ============================================================
   APP — Main Application Controller & Orchestrator
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   This is the ENTRY POINT of the application.
   It bootstraps all modules, hydrates state, and starts the UI.

   Boot sequence:
   1. Check environment (localStorage, DOM ready)
   2. Run storage migration (v1/v2 → v3)
   3. Hydrate AppState from StorageService
   4. Initialize Nav system
   5. Route to correct initial view (Onboard vs Dashboard)
   6. Render initial view
   7. Set up global event listeners
   8. Flush offline form queue (if online)

   Global error handling:
   - window.onerror for uncaught errors
   - Graceful fallback if any module fails to load

   Dependencies: ALL modules (loaded before app.js in index.html)
   ============================================================ */

'use strict';

var App = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _initialized = false;
  var _bootStart   = 0;


  /* ═══════════════════════════════════════════════════════════
     PRIVATE: ENVIRONMENT CHECKS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Check that all critical modules are loaded.
   * @returns {{ ok: boolean, missing: Array<string> }}
   */
  function _checkModules() {
    var required = [
      { name: 'ExamConstants',      ref: window.ExamConstants },
      { name: 'UIConstants',        ref: window.UIConstants },
      { name: 'QUESTION_BANK',      ref: window.QUESTION_BANK },
      { name: 'TEST_CONFIG',        ref: window.TEST_CONFIG },
      { name: 'Helpers',            ref: window.Helpers },
      { name: 'Formatters',         ref: window.Formatters },
      { name: 'Validators',         ref: window.Validators },
      { name: 'StorageService',     ref: window.StorageService },
      { name: 'ExamState',          ref: window.ExamState },
      { name: 'AppState',           ref: window.AppState },
      { name: 'StateManager',       ref: window.StateManager },
      { name: 'QuestionResolver',   ref: window.QuestionResolver },
      { name: 'ScoringEngine',      ref: window.ScoringEngine },
      { name: 'TimerModule',        ref: window.TimerModule },
      { name: 'ExamEngine',         ref: window.ExamEngine },
      { name: 'FormSubmitter',      ref: window.FormSubmitter },
      { name: 'Nav',                ref: window.Nav },
      { name: 'ToastManager',       ref: window.ToastManager },
      { name: 'PaletteManager',     ref: window.PaletteManager },
      { name: 'OnboardRenderer',    ref: window.OnboardRenderer },
      { name: 'DashboardRenderer',  ref: window.DashboardRenderer },
      { name: 'ExamRenderer',       ref: window.ExamRenderer },
      { name: 'ResultRenderer',     ref: window.ResultRenderer },
      { name: 'AnalyticsRenderer',  ref: window.AnalyticsRenderer },
      { name: 'ProfileRenderer',    ref: window.ProfileRenderer }
    ];

    var missing = [];
    for (var i = 0; i < required.length; i++) {
      if (!required[i].ref) {
        missing.push(required[i].name);
      }
    }

    return {
      ok:      missing.length === 0,
      missing: missing
    };
  }

  /**
   * Check environment capabilities.
   * @returns {{ ok: boolean, issues: Array<string> }}
   */
  function _checkEnvironment() {
    var issues = [];

    // localStorage
    if (window.Helpers && !Helpers.hasLocalStorage()) {
      issues.push('localStorage is not available. Data will not be saved.');
    } else if (!window.Helpers) {
      try {
        var t = '__npp__';
        localStorage.setItem(t, '1');
        localStorage.removeItem(t);
      } catch (e) {
        issues.push('localStorage is not available.');
      }
    }

    // JSON support
    if (!window.JSON) {
      issues.push('JSON is not supported in this browser.');
    }

    return {
      ok:     issues.length === 0,
      issues: issues
    };
  }


  /* ═══════════════════════════════════════════════════════════
     PRIVATE: BOOT STEPS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Step 1: Run storage migration from older versions.
   */
  function _migrateStorage() {
    if (window.StorageService && typeof StorageService.migrateFromOlderVersions === 'function') {
      StorageService.migrateFromOlderVersions();
    }
  }

  /**
   * Step 2: Hydrate AppState from persisted data.
   */
  function _hydrateState() {
    if (!window.StorageService || !window.AppState) return;

    var data = StorageService.loadAll();
    AppState.hydrate(data);
  }

  /**
   * Step 3: Run state integrity checks.
   */
  function _checkStateIntegrity() {
    if (window.StateManager && typeof StateManager.checkIntegrity === 'function') {
      var result = StateManager.checkIntegrity();
      if (!result.valid) {
        console.warn('[App] State integrity issues:', result.issues);
      }
    }
  }

  /**
   * Step 4: Initialize navigation and determine starting view.
   */
  function _initNavigation() {
    var startView = 'view-onboard';

    if (window.AppState && AppState.isOnboarded()) {
      startView = 'view-dashboard';
    }

    if (window.Nav && typeof Nav.init === 'function') {
      Nav.init(startView);
    }

    return startView;
  }

  /**
   * Step 5: Render the initial view.
   * @param {string} startView
   */
  function _renderInitialView(startView) {
    if (startView === 'view-onboard') {
      if (window.OnboardRenderer) {
        OnboardRenderer.render();
      }
    } else if (startView === 'view-dashboard') {
      if (window.DashboardRenderer) {
        DashboardRenderer.render();
      }
    }
  }

  /**
   * Step 6: Set up global event listeners.
   */
  function _setupGlobalListeners() {

    // ── Prevent accidental page close during exam ──
    window.addEventListener('beforeunload', function(e) {
      if (window.ExamState && ExamState.isActive()) {
        var msg = 'You have an active exam in progress. Are you sure you want to leave?';
        e.returnValue = msg;
        return msg;
      }
    });

    // ── Auto-save state periodically ──
    var autoSaveInterval = (window.UIConstants && UIConstants.AUTO_SAVE_INTERVAL) || 30000;
    setInterval(function() {
      _autoSave();
    }, autoSaveInterval);

    // ── Listen for AppState view changes to trigger renders ──
    if (window.AppState && typeof AppState.on === 'function') {
      AppState.on('view:changed', function(data) {
        _onViewChanged(data.current, data.previous);
      });
    }

    // ── Keyboard shortcut: Escape to close modals ──
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (window.AppState && AppState.getModalOpen()) {
          AppState.closeModal();
        }
      }
    });

    // ── Touch: Prevent double-tap zoom on buttons (mobile) ──
    document.addEventListener('touchend', function(e) {
      var target = e.target;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        e.preventDefault();
        target.click();
      }
    }, { passive: false });
  }

  /**
   * Step 7: Flush offline form submission queue.
   */
  function _flushOfflineQueue() {
    if (window.FormSubmitter && typeof FormSubmitter.flushQueue === 'function') {
      var qLen = FormSubmitter.getQueueLength();
      if (qLen > 0 && navigator.onLine) {
        console.log('[App] Flushing ' + qLen + ' queued submission(s)...');
        FormSubmitter.flushQueue();
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PRIVATE: RUNTIME HANDLERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Handle view change events — trigger appropriate renders.
   * @param {string} current
   * @param {string} previous
   */
  function _onViewChanged(current, previous) {
    // Clean up previous view if exam
    if (previous === 'view-exam' && current !== 'view-exam') {
      if (window.PaletteManager) PaletteManager.destroy();
    }

    // Render destination view content
    switch (current) {
      case 'view-dashboard':
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        break;
      case 'view-analytics':
        if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        break;
      case 'view-profile':
        if (window.ProfileRenderer) ProfileRenderer.render();
        break;
      // view-exam and view-result are rendered by ExamEngine directly
    }
  }

  /**
   * Auto-save AppState to StorageService.
   */
  function _autoSave() {
    if (!window.AppState || !window.StorageService) return;

    try {
      var data = AppState.dehydrate();
      StorageService.saveAll(data);
    } catch (e) {
      console.warn('[App] Auto-save failed:', e.message);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PRIVATE: ERROR HANDLING
     ═══════════════════════════════════════════════════════════ */

  /**
   * Set up global error handler.
   */
  function _setupErrorHandling() {
    window.onerror = function(message, source, lineno, colno, error) {
      console.error('[App] Uncaught error:', message, 'at', source, lineno + ':' + colno);

      // Show user-friendly toast if possible
      if (window.ToastManager) {
        ToastManager.error('An unexpected error occurred. Please try again.');
      }

      // Don't suppress — let it propagate for debugging
      return false;
    };

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
      console.error('[App] Unhandled promise rejection:', e.reason);
    });
  }

  /**
   * Show a fatal error screen if critical modules are missing.
   * @param {Array<string>} missing
   */
  function _showFatalError(missing) {
    var app = document.getElementById('app');
    if (!app) app = document.body;

    app.innerHTML =
      '<div style="max-width:600px;margin:80px auto;padding:24px;text-align:center;font-family:sans-serif;">' +
        '<h1 style="font-size:48px;margin-bottom:16px;">⚠️</h1>' +
        '<h2 style="margin-bottom:12px;">NursePrep Pro — Load Error</h2>' +
        '<p style="color:#666;margin-bottom:16px;">Some required modules failed to load. Please check your internet connection and reload.</p>' +
        '<p style="font-size:13px;color:#999;margin-bottom:24px;">Missing: ' + missing.join(', ') + '</p>' +
        '<button onclick="location.reload()" style="padding:10px 24px;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-size:15px;">🔄 Reload App</button>' +
      '</div>';
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Boot the application.
     * Called once from the DOMContentLoaded event at the bottom of index.html.
     */
    init: function() {
      if (_initialized) {
        console.warn('[App] Already initialized.');
        return;
      }

      _bootStart = Date.now();
      console.log('[App] NursePrep Pro v3.0 — Booting...');

      // ── Step 0: Error handling ──
      _setupErrorHandling();

      // ── Step 1: Check modules ──
      var moduleCheck = _checkModules();
      if (!moduleCheck.ok) {
        console.error('[App] Missing modules:', moduleCheck.missing);
        _showFatalError(moduleCheck.missing);
        return;
      }

      // ── Step 2: Check environment ──
      var envCheck = _checkEnvironment();
      if (!envCheck.ok) {
        console.warn('[App] Environment issues:', envCheck.issues);
        // Non-fatal — continue with warnings
      }

      // ── Step 3: Migrate storage ──
      _migrateStorage();

      // ── Step 4: Hydrate state ──
      _hydrateState();

      // ── Step 5: Check state integrity ──
      _checkStateIntegrity();

      // ── Step 6: Init navigation + determine start view ──
      var startView = _initNavigation();

      // ── Step 7: Render initial view ──
      _renderInitialView(startView);

      // ── Step 8: Global listeners ──
      _setupGlobalListeners();

      // ── Step 9: Flush offline queue ──
      _flushOfflineQueue();

      // ── Done ──
      _initialized = true;
      var bootTime = Date.now() - _bootStart;

      console.log(
        '[App] ✅ Boot complete in ' + bootTime + 'ms. ' +
        'View: ' + startView + '. ' +
        'Student: ' + (AppState.isOnboarded() ? AppState.getFirstName() : 'Not registered') + '. ' +
        'Attempts: ' + AppState.getTotalAttempts() + '.'
      );

      // Welcome toast (only for returning users)
      if (startView === 'view-dashboard' && window.ToastManager && window.AppState) {
        var greeting = 'Welcome back';
        if (window.UIConstants && typeof UIConstants.getGreeting === 'function') {
          greeting = UIConstants.getGreeting();
        }
        ToastManager.info(greeting + ', ' + AppState.getFirstName() + '! 👋');
      }
    },

    /**
     * Get boot status info (for debugging).
     * @returns {Object}
     */
    getStatus: function() {
      return {
        initialized: _initialized,
        bootTime:    _bootStart ? (Date.now() - _bootStart) : 0,
        modules:     _checkModules(),
        environment: _checkEnvironment(),
        state:       window.StateManager ? StateManager.getSummary() : null
      };
    },

    /**
     * Force a full re-render of the current view.
     * Useful after data import or settings change.
     */
    refresh: function() {
      if (!window.Nav) return;

      var current = Nav.getCurrentView();
      _onViewChanged(current, '');
    },

    /**
     * Full application reset — clears all data, returns to onboard.
     */
    reset: function() {
      if (window.ExamState && ExamState.isActive()) {
        if (window.TimerModule) TimerModule.stop();
        ExamState.reset();
      }

      if (window.StorageService) StorageService.clearAll();
      if (window.StateManager)   StateManager.resetAll();
      if (window.Nav)            Nav.forceGoTo('view-onboard');
      if (window.OnboardRenderer) OnboardRenderer.render();

      if (window.ToastManager) {
        ToastManager.info('App has been reset.');
      }
    }
  };

})();

// Expose globally
window.App = App;

/* ═══════════════════════════════════════════════════════════
   AUTO-START ON DOM READY
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
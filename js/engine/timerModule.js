/* ============================================================
   TIMER MODULE — Exam Countdown Timer Controller
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Manages the exam countdown timer with:
   - Precise 1-second tick interval
   - Warning state (≤2 min remaining)
   - Critical state (≤30 sec remaining)
   - Tab visibility handling (deducts hidden time)
   - Auto-submit on expiry
   - Pause/resume capability

   Architecture:
   - Reads/writes timer state via ExamState
   - Calls a `onTick` callback every second for UI update
   - Calls `onExpire` callback when time reaches 0
   - Calls `onWarning`/`onCritical` callbacks on state transitions

   Dependencies: ExamState, ExamConstants
   Used by: ExamEngine
   ============================================================ */

'use strict';

var TimerModule = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _intervalId     = null;    // setInterval ID
  var _callbacks      = {
    onTick:     null,   // fn(timeRemaining, timerState)
    onWarning:  null,   // fn() — fired once on entering warning zone
    onCritical: null,   // fn() — fired once on entering critical zone
    onExpire:   null    // fn() — fired when timer reaches 0
  };

  // Track state transitions (fire callbacks only once)
  var _warningFired   = false;
  var _criticalFired  = false;


  /* ═══════════════════════════════════════════════════════════
     PRIVATE METHODS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Get tick interval from ExamConstants or default.
   * @returns {number} milliseconds
   */
  function _getTickInterval() {
    return (window.ExamConstants && ExamConstants.TIMER_TICK_INTERVAL) || 1000;
  }

  /**
   * The core tick function called every second.
   * Updates ExamState, checks thresholds, fires callbacks.
   */
  function _tick() {
    // Safety: only tick if exam is active
    if (!window.ExamState || !ExamState.isActive()) {
      _stop();
      return;
    }

    // Decrement timer in ExamState
    var remaining = ExamState.tickTimer();

    // Build timer state info for callbacks
    var timerState = {
      remaining:  remaining,
      isWarning:  ExamState.isTimerWarning(),
      isCritical: ExamState.isTimerCritical(),
      progress:   ExamState.getTimerProgress()
    };

    // ── Fire onTick callback ──
    if (typeof _callbacks.onTick === 'function') {
      try {
        _callbacks.onTick(remaining, timerState);
      } catch (e) {
        console.error('[TimerModule] onTick callback error:', e);
      }
    }

    // ── Fire onWarning callback (once) ──
    if (timerState.isWarning && !_warningFired) {
      _warningFired = true;
      if (typeof _callbacks.onWarning === 'function') {
        try {
          _callbacks.onWarning();
        } catch (e) {
          console.error('[TimerModule] onWarning callback error:', e);
        }
      }
    }

    // ── Fire onCritical callback (once) ──
    if (timerState.isCritical && !_criticalFired) {
      _criticalFired = true;
      if (typeof _callbacks.onCritical === 'function') {
        try {
          _callbacks.onCritical();
        } catch (e) {
          console.error('[TimerModule] onCritical callback error:', e);
        }
      }
    }

    // ── Fire onExpire when timer reaches 0 ──
    if (remaining <= 0) {
      _stop();
      ExamState.setTimerRunning(false);

      if (typeof _callbacks.onExpire === 'function') {
        // Small delay to let the final tick render
        var delay = (window.ExamConstants && ExamConstants.AUTO_SUBMIT_DELAY) || 2000;
        setTimeout(function() {
          try {
            _callbacks.onExpire();
          } catch (e) {
            console.error('[TimerModule] onExpire callback error:', e);
          }
        }, delay);
      }
    }
  }

  /**
   * Stop the interval timer.
   */
  function _stop() {
    if (_intervalId !== null) {
      clearInterval(_intervalId);
      _intervalId = null;
    }
  }


  /* ═══════════════════════════════════════════════════════════
     TAB VISIBILITY HANDLER
     ═══════════════════════════════════════════════════════════ */

  /**
   * Handle document visibility change.
   * When tab is hidden → record timestamp.
   * When tab is visible → deduct hidden time from timer.
   */
  function _onVisibilityChange() {
    if (!window.ExamState || !ExamState.isActive()) return;

    if (document.hidden) {
      // Tab hidden — record timestamp
      ExamState.markHidden();
    } else {
      // Tab visible — correct timer
      var hiddenSec = ExamState.markVisible();

      if (hiddenSec > 0) {
        // Check if timer expired while hidden
        if (ExamState.getTimeRemaining() <= 0) {
          _stop();
          ExamState.setTimerRunning(false);

          if (typeof _callbacks.onExpire === 'function') {
            try {
              _callbacks.onExpire();
            } catch (e) {
              console.error('[TimerModule] onExpire (from hidden) error:', e);
            }
          }
        }
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Start the countdown timer.
     * ExamState must already be initialized with time.
     *
     * @param {Object} callbacks
     *   @param {Function} callbacks.onTick     - fn(remaining, timerState) called every second
     *   @param {Function} callbacks.onWarning  - fn() called once when entering warning zone
     *   @param {Function} callbacks.onCritical - fn() called once when entering critical zone
     *   @param {Function} callbacks.onExpire   - fn() called when timer hits 0
     */
    start: function(callbacks) {
      // Store callbacks
      _callbacks = {
        onTick:     (callbacks && callbacks.onTick)     || null,
        onWarning:  (callbacks && callbacks.onWarning)  || null,
        onCritical: (callbacks && callbacks.onCritical) || null,
        onExpire:   (callbacks && callbacks.onExpire)    || null
      };

      // Reset transition flags
      _warningFired  = false;
      _criticalFired = false;

      // Clear any existing interval
      _stop();

      // Mark timer as running
      if (window.ExamState) {
        ExamState.setTimerRunning(true);
      }

      // Start the interval
      _intervalId = setInterval(_tick, _getTickInterval());

      // Attach visibility listener
      document.addEventListener('visibilitychange', _onVisibilityChange);
    },

    /**
     * Stop the timer completely (exam submitted or exited).
     */
    stop: function() {
      _stop();

      if (window.ExamState) {
        ExamState.setTimerRunning(false);
      }

      // Remove visibility listener
      document.removeEventListener('visibilitychange', _onVisibilityChange);

      // Clear callbacks
      _callbacks = {
        onTick:     null,
        onWarning:  null,
        onCritical: null,
        onExpire:   null
      };

      _warningFired  = false;
      _criticalFired = false;
    },

    /**
     * Pause the timer (keeps state but stops ticking).
     * Used for modal overlays (submit confirmation, palette).
     */
    pause: function() {
      _stop();
      if (window.ExamState) {
        ExamState.setTimerRunning(false);
      }
    },

    /**
     * Resume the timer after a pause.
     */
    resume: function() {
      if (_intervalId !== null) return; // Already running

      if (window.ExamState && ExamState.isActive() && ExamState.getTimeRemaining() > 0) {
        ExamState.setTimerRunning(true);
        _intervalId = setInterval(_tick, _getTickInterval());
      }
    },

    /**
     * Check if the timer is currently running.
     * @returns {boolean}
     */
    isRunning: function() {
      return _intervalId !== null;
    },

    /**
     * Get the current formatted time string.
     * @returns {string} "MM:SS" format
     */
    getFormattedTime: function() {
      var remaining = window.ExamState ? ExamState.getTimeRemaining() : 0;
      if (window.Formatters && typeof Formatters.toMMSS === 'function') {
        return Formatters.toMMSS(remaining);
      }
      // Inline fallback
      var m = Math.floor(remaining / 60);
      var s = remaining % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    },

    /**
     * Get the CSS class for the timer based on its state.
     * @returns {string} '' | 'warning' | 'critical'
     */
    getTimerCSSClass: function() {
      if (!window.ExamState) return '';
      if (ExamState.isTimerCritical()) return 'critical';
      if (ExamState.isTimerWarning())  return 'warning';
      return '';
    }
  };

})();

// Expose globally
window.TimerModule = TimerModule;
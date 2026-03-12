/* ============================================================
   EXAM ENGINE — Core Exam Lifecycle Controller
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Orchestrates the complete exam lifecycle:
   1. START  → Resolve questions → Init state → Start timer → Render
   2. ANSWER → Update state → Update palette → Update UI
   3. NAV    → Update index → Render question → Update controls
   4. SUBMIT → Stop timer → Score → Save → Render result
   5. EXIT   → Confirm → Reset state → Navigate to dashboard

   This is the central coordinator between:
   - QuestionResolver (question selection)
   - ExamState (runtime state)
   - TimerModule (countdown)
   - ScoringEngine (result calculation)
   - ExamRenderer (UI rendering)
   - StorageService (persistence)
   - FormSubmitter (result submission)
   - AppState (attempt history)

   Dependencies: All engine/, state/, services/, and exam UI modules
   Used by: App (startExam, from dashboard test card click)
   ============================================================ */

'use strict';

var ExamEngine = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _currentResult = null;   // Latest result from ScoringEngine
  var _isProcessing  = false;  // Guard against double-submit


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Show a toast notification if ToastManager is available.
   * @param {string} message
   * @param {string} type - 'info' | 'success' | 'error' | 'warning'
   */
  function _toast(message, type) {
    if (window.ToastManager && typeof ToastManager.show === 'function') {
      ToastManager.show(message, type || 'info');
    }
  }

  /**
   * Safely call ExamRenderer methods.
   * @param {string} method
   * @param {...*} args
   */
  function _render(method) {
    if (window.ExamRenderer && typeof ExamRenderer[method] === 'function') {
      var args = Array.prototype.slice.call(arguments, 1);
      ExamRenderer[method].apply(ExamRenderer, args);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /* ─────────────────────────────────────────────────────────
       START EXAM
       ───────────────────────────────────────────────────────── */

    /**
     * Start a new exam session.
     *
     * @param {string} testId - The TEST_CONFIG id to start
     * @returns {boolean} Success
     */
    startExam: function(testId) {
      // ── Guard: Check if can start ──
      if (window.StateManager) {
        var check = StateManager.canStartExam();
        if (!check.allowed) {
          _toast(check.reason, 'warning');
          return false;
        }
      }

      // ── Step 1: Find test config ──
      var config = null;
      if (window.QuestionResolver && typeof QuestionResolver.findTestConfig === 'function') {
        config = QuestionResolver.findTestConfig(testId);
      }

      if (!config) {
        _toast('Test not found: ' + testId, 'error');
        console.error('[ExamEngine] Test config not found for id:', testId);
        return false;
      }

      // ── Step 2: Resolve questions ──
      var resolved = QuestionResolver.resolve(config);

      if (!resolved || !resolved.questions || resolved.questions.length === 0) {
        _toast('No questions available for this test.', 'error');
        console.error('[ExamEngine] QuestionResolver returned 0 questions for:', testId);
        return false;
      }

      console.log(
        '[ExamEngine] Resolved ' + resolved.questions.length + ' questions for "' + config.title + '"',
        resolved.meta
      );

      // ── Step 3: Initialize exam state ──
      ExamState.init(config, resolved.questions);

      // ── Step 4: Reset processing flag ──
      _currentResult = null;
      _isProcessing  = false;

      // ── Step 5: Navigate to exam view ──
      if (window.Nav && typeof Nav.goTo === 'function') {
        Nav.goTo('view-exam');
      }

      // ── Step 6: Render exam UI ──
      _render('renderExam');

      // ── Step 7: Start timer ──
      if (window.TimerModule) {
        TimerModule.start({
          onTick: function(remaining, timerState) {
            _render('updateTimer', remaining, timerState);
          },
          onWarning: function() {
            _render('setTimerWarning');
            _toast('⚠️ Only 2 minutes remaining!', 'warning');
          },
          onCritical: function() {
            _render('setTimerCritical');
            _toast('🚨 30 seconds left! Submit now!', 'error');
          },
          onExpire: function() {
            _toast('⏰ Time\'s up! Auto-submitting...', 'warning');
            ExamEngine.submitExam('auto');
          }
        });
      }

      _toast('📝 Exam started — Good luck!', 'success');
      return true;
    },

    /* ─────────────────────────────────────────────────────────
       ANSWER A QUESTION
       ───────────────────────────────────────────────────────── */

    /**
     * Select an answer for the current question.
     * @param {number} optionIndex - 0-based option index
     */
    selectAnswer: function(optionIndex) {
      if (!ExamState.isActive()) return;

      var currentAnswer = ExamState.getCurrentAnswer();

      // Toggle: if same option clicked again, deselect
      if (currentAnswer === optionIndex) {
        ExamState.clearAnswer();
      } else {
        ExamState.setAnswer(optionIndex);
      }

      // Update UI
      _render('renderOptions');
      _render('updatePalette');
      _render('updateStatusStrip');
    },

    /**
     * Clear the answer for the current question.
     */
    clearAnswer: function() {
      if (!ExamState.isActive()) return;

      ExamState.clearAnswer();

      _render('renderOptions');
      _render('updatePalette');
      _render('updateStatusStrip');
    },

    /* ─────────────────────────────────────────────────────────
       MARK FOR REVIEW
       ───────────────────────────────────────────────────────── */

    /**
     * Toggle the "marked for review" flag on the current question.
     */
    toggleReview: function() {
      if (!ExamState.isActive()) return;

      var isMarked = ExamState.toggleReview();

      _render('updateReviewButton', isMarked);
      _render('updatePalette');
      _render('updateStatusStrip');

      if (isMarked) {
        _toast('🔖 Marked for review', 'info');
      }
    },

    /* ─────────────────────────────────────────────────────────
       NAVIGATION
       ───────────────────────────────────────────────────────── */

    /**
     * Navigate to the next question.
     */
    goNext: function() {
      if (!ExamState.isActive()) return;

      if (ExamState.goNext()) {
        _render('renderQuestion');
        _render('updateNavControls');
        _render('updatePalette');
        _render('updateProgress');
      }
    },

    /**
     * Navigate to the previous question.
     */
    goPrev: function() {
      if (!ExamState.isActive()) return;

      if (ExamState.goPrev()) {
        _render('renderQuestion');
        _render('updateNavControls');
        _render('updatePalette');
        _render('updateProgress');
      }
    },

    /**
     * Jump to a specific question by index.
     * @param {number} idx - 0-based index
     */
    goToQuestion: function(idx) {
      if (!ExamState.isActive()) return;

      if (ExamState.goToQuestion(idx)) {
        _render('renderQuestion');
        _render('updateNavControls');
        _render('updatePalette');
        _render('updateProgress');
      }
    },

    /* ─────────────────────────────────────────────────────────
       SUBMIT EXAM
       ───────────────────────────────────────────────────────── */

    /**
     * Submit the exam and calculate results.
     *
     * @param {string} [method='manual'] - 'manual' (user clicked) or 'auto' (timer expired)
     * @returns {Object|null} The full result object
     */
    submitExam: function(method) {
      // ── Guard: Prevent double submit ──
      if (_isProcessing) {
        console.warn('[ExamEngine] Submit already in progress.');
        return null;
      }

      if (!ExamState.isActive()) {
        console.warn('[ExamEngine] No active exam to submit.');
        return null;
      }

      _isProcessing = true;
      method = method || 'manual';

      // ── Step 1: Stop timer ──
      if (window.TimerModule) {
        TimerModule.stop();
      }

      // ── Step 2: Mark exam as submitted in state ──
      ExamState.markSubmitted(method);

      // ── Step 3: Get exam snapshot ──
      var snapshot = ExamState.snapshot();

      // ── Step 4: Calculate results ──
      var result = null;
      if (window.ScoringEngine && typeof ScoringEngine.calculate === 'function') {
        result = ScoringEngine.calculate(snapshot);
      }

      if (!result) {
        console.error('[ExamEngine] ScoringEngine returned null.');
        _isProcessing = false;
        _toast('Error calculating results.', 'error');
        return null;
      }

      _currentResult = result;

      // ── Step 5: Create attempt summary & save ──
      var attemptSummary = null;
      if (window.ScoringEngine && typeof ScoringEngine.toAttemptSummary === 'function') {
        attemptSummary = ScoringEngine.toAttemptSummary(result);
      }

      if (attemptSummary) {
        // Save to AppState
        if (window.AppState) {
          AppState.addAttempt(attemptSummary);
        }

        // Persist to storage
        if (window.StorageService && typeof StorageService.addAttempt === 'function') {
          StorageService.addAttempt(attemptSummary);
        }
      }

      // ── Step 6: Submit to Formspree (async, non-blocking) ──
      if (window.FormSubmitter && typeof FormSubmitter.submit === 'function') {
        var student = window.AppState ? AppState.getStudent() : null;
        if (student && window.ScoringEngine) {
          var payload = ScoringEngine.toFormPayload(result, student);
          FormSubmitter.submit(payload);
        }
      }

      // ── Step 7: Navigate to result view ──
      if (window.Nav && typeof Nav.goTo === 'function') {
        Nav.goTo('view-result');
      }

      // ── Step 8: Render results ──
      if (window.ResultRenderer && typeof ResultRenderer.renderResult === 'function') {
        ResultRenderer.renderResult(result);
      }

      // ── Step 9: Clean up ──
      _isProcessing = false;

      console.log(
        '[ExamEngine] Exam submitted (' + method + '). Score: ' +
        result.score + '/' + result.maxScore +
        ' (' + result.accuracy + '% accuracy)'
      );

      return result;
    },

    /* ─────────────────────────────────────────────────────────
       EXIT EXAM (without submitting)
       ───────────────────────────────────────────────────────── */

    /**
     * Exit the exam without submitting.
     * Resets all exam state and navigates to dashboard.
     */
    exitExam: function() {
      // Stop timer
      if (window.TimerModule) {
        TimerModule.stop();
      }

      // Reset exam state
      ExamState.reset();

      // Navigate back
      if (window.Nav && typeof Nav.goTo === 'function') {
        Nav.goTo('view-dashboard');
      }

      _toast('Exam exited. Progress was not saved.', 'info');
    },

    /* ─────────────────────────────────────────────────────────
       SUBMIT CONFIRMATION DATA
       ───────────────────────────────────────────────────────── */

    /**
     * Get data for the submit confirmation modal.
     * @returns {Object} { counts, timeRemaining, timeFormatted }
     */
    getSubmitSummary: function() {
      return {
        counts:         ExamState.getCounts(),
        timeRemaining:  ExamState.getTimeRemaining(),
        timeFormatted:  window.TimerModule ? TimerModule.getFormattedTime() : '00:00',
        testTitle:      ExamState.getTestTitle(),
        totalQuestions: ExamState.getTotalQuestions()
      };
    },

    /* ─────────────────────────────────────────────────────────
       KEYBOARD HANDLER
       ───────────────────────────────────────────────────────── */

    /**
     * Handle keyboard events during exam.
     * Called from a global keydown listener set up by App or ExamRenderer.
     *
     * @param {KeyboardEvent} e
     */
    handleKeyboard: function(e) {
      if (!ExamState.isActive()) return;

      // Don't intercept if user is typing in an input
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      var key = e.key;
      var EC  = window.ExamConstants;

      if (!EC) return;

      // ── Option selection (1–4) ──
      if (EC.KEY_OPTION_MAP && EC.KEY_OPTION_MAP.hasOwnProperty(key)) {
        e.preventDefault();
        this.selectAnswer(EC.KEY_OPTION_MAP[key]);
        return;
      }

      // ── Navigation ──
      if (EC.SHORTCUTS) {
        if (EC.SHORTCUTS.NEXT && EC.SHORTCUTS.NEXT.indexOf(key) !== -1) {
          e.preventDefault();
          this.goNext();
          return;
        }

        if (EC.SHORTCUTS.PREV && EC.SHORTCUTS.PREV.indexOf(key) !== -1) {
          e.preventDefault();
          this.goPrev();
          return;
        }

        // ── Mark for review ──
        if (EC.SHORTCUTS.MARK_REVIEW && EC.SHORTCUTS.MARK_REVIEW.indexOf(key) !== -1) {
          e.preventDefault();
          this.toggleReview();
          return;
        }

        // ── Clear response ──
        if (EC.SHORTCUTS.CLEAR_RESPONSE && EC.SHORTCUTS.CLEAR_RESPONSE.indexOf(key) !== -1) {
          e.preventDefault();
          this.clearAnswer();
          return;
        }

        // ── Open palette ──
        if (EC.SHORTCUTS.OPEN_PALETTE && EC.SHORTCUTS.OPEN_PALETTE.indexOf(key) !== -1) {
          e.preventDefault();
          if (window.PaletteManager && typeof PaletteManager.toggle === 'function') {
            PaletteManager.toggle();
          }
          return;
        }
      }
    },

    /* ─────────────────────────────────────────────────────────
       GETTERS
       ───────────────────────────────────────────────────────── */

    /**
     * Get the most recent exam result.
     * @returns {Object|null}
     */
    getLastResult: function() {
      return _currentResult;
    },

    /**
     * Check if an exam is currently active.
     * @returns {boolean}
     */
    isActive: function() {
      return window.ExamState ? ExamState.isActive() : false;
    }
  };

})();

// Expose globally
window.ExamEngine = ExamEngine;
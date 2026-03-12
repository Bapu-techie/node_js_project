/* ============================================================
   EXAM STATE — Runtime Exam State Manager
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Manages all mutable state during an active exam session.
   This is the SINGLE SOURCE OF TRUTH for:
   - Current question index
   - User's selected answers
   - Marked-for-review flags
   - Timer state (remaining seconds, paused, hidden)
   - Resolved questions array
   - Exam metadata (test config, start time)

   Design:
   - All state is stored in a single `_state` object
   - External access via getter/setter methods only
   - `reset()` clears everything for a new exam
   - No DOM access — pure state management
   - No localStorage — that's StorageLayer's job

   Used by: ExamEngine, TimerModule, ExamRenderer,
            ScoringEngine, ResultEngine, App
   ============================================================ */

'use strict';

var ExamState = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _state = {
    // Exam identity
    testConfig:       null,       // The TEST_CONFIG object for this exam
    testId:           '',         // e.g. 'mock_aiims_1'
    testTitle:        '',         // e.g. 'AIIMS Mock Test — Series 1'
    testType:         '',         // e.g. 'mock'

    // Questions
    questions:        [],         // Resolved flat array of question objects
    totalQuestions:    0,         // questions.length

    // Navigation
    currentIndex:     0,          // 0-based index of current question

    // User responses
    answers:          [],         // Array[totalQuestions] — selected option index or null
    markedForReview:  [],         // Array[totalQuestions] — boolean flags
    visitedFlags:     [],         // Array[totalQuestions] — boolean (has user seen this Q?)

    // Timer
    timeRemaining:    0,          // Seconds remaining
    timeLimitSeconds: 0,          // Total seconds allocated
    timerRunning:     false,      // Is timer actively counting down?
    timerWarning:     false,      // In warning zone (<= 2 min)?
    timerCritical:    false,      // In critical zone (<= 30 sec)?

    // Tab visibility
    hiddenSince:      null,       // Timestamp when tab was hidden
    totalHiddenTime:  0,          // Total seconds spent with tab hidden

    // Exam lifecycle
    startTime:        null,       // Date.now() when exam started
    endTime:          null,       // Date.now() when exam ended
    isActive:         false,      // Is an exam currently in progress?
    isSubmitted:      false,      // Has the exam been submitted?
    submitMethod:     ''          // 'manual' | 'auto' (timer expired)
  };


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /* ─────────────────────────────────────────────────────────
       INITIALIZATION
       ───────────────────────────────────────────────────────── */

    /**
     * Initialize exam state for a new exam session.
     * @param {Object} config - The TEST_CONFIG object
     * @param {Array} resolvedQuestions - Flat array of question objects from QuestionResolver
     */
    init: function(config, resolvedQuestions) {
      if (!config || !Array.isArray(resolvedQuestions) || resolvedQuestions.length === 0) {
        console.error('[ExamState] init() called with invalid params');
        return;
      }

      var total = resolvedQuestions.length;
      var timeSecs = (config.timeLimitMinutes || 60) * 60;

      _state.testConfig       = config;
      _state.testId           = config.id || '';
      _state.testTitle        = config.title || '';
      _state.testType         = config.type || '';
      _state.questions        = resolvedQuestions;
      _state.totalQuestions    = total;
      _state.currentIndex     = 0;

      // Initialize answer arrays
      _state.answers          = new Array(total);
      _state.markedForReview  = new Array(total);
      _state.visitedFlags     = new Array(total);
      for (var i = 0; i < total; i++) {
        _state.answers[i]         = null;
        _state.markedForReview[i] = false;
        _state.visitedFlags[i]    = false;
      }
      // First question is visited immediately
      _state.visitedFlags[0] = true;

      // Timer
      _state.timeRemaining    = timeSecs;
      _state.timeLimitSeconds  = timeSecs;
      _state.timerRunning     = false;
      _state.timerWarning     = false;
      _state.timerCritical    = false;

      // Tab
      _state.hiddenSince      = null;
      _state.totalHiddenTime  = 0;

      // Lifecycle
      _state.startTime        = Date.now();
      _state.endTime          = null;
      _state.isActive         = true;
      _state.isSubmitted      = false;
      _state.submitMethod     = '';
    },

    /**
     * Reset all exam state to initial empty values.
     * Called after navigating away from exam or starting a new one.
     */
    reset: function() {
      _state.testConfig       = null;
      _state.testId           = '';
      _state.testTitle        = '';
      _state.testType         = '';
      _state.questions        = [];
      _state.totalQuestions    = 0;
      _state.currentIndex     = 0;
      _state.answers          = [];
      _state.markedForReview  = [];
      _state.visitedFlags     = [];
      _state.timeRemaining    = 0;
      _state.timeLimitSeconds  = 0;
      _state.timerRunning     = false;
      _state.timerWarning     = false;
      _state.timerCritical    = false;
      _state.hiddenSince      = null;
      _state.totalHiddenTime  = 0;
      _state.startTime        = null;
      _state.endTime          = null;
      _state.isActive         = false;
      _state.isSubmitted      = false;
      _state.submitMethod     = '';
    },

    /* ─────────────────────────────────────────────────────────
       GETTERS — Exam Identity
       ───────────────────────────────────────────────────────── */

    getTestConfig:    function() { return _state.testConfig; },
    getTestId:        function() { return _state.testId; },
    getTestTitle:     function() { return _state.testTitle; },
    getTestType:      function() { return _state.testType; },

    /* ─────────────────────────────────────────────────────────
       GETTERS — Questions
       ───────────────────────────────────────────────────────── */

    getQuestions:      function() { return _state.questions; },
    getTotalQuestions:  function() { return _state.totalQuestions; },

    /**
     * Get a question object by index.
     * @param {number} idx
     * @returns {Object|null}
     */
    getQuestion: function(idx) {
      if (idx >= 0 && idx < _state.totalQuestions) {
        return _state.questions[idx];
      }
      return null;
    },

    /**
     * Get the current question object.
     * @returns {Object|null}
     */
    getCurrentQuestion: function() {
      return _state.questions[_state.currentIndex] || null;
    },

    /* ─────────────────────────────────────────────────────────
       NAVIGATION
       ───────────────────────────────────────────────────────── */

    getCurrentIndex:  function() { return _state.currentIndex; },

    /**
     * Navigate to a specific question index.
     * Marks the target question as visited.
     * @param {number} idx - 0-based index
     * @returns {boolean} Success
     */
    goToQuestion: function(idx) {
      if (idx >= 0 && idx < _state.totalQuestions) {
        _state.currentIndex = idx;
        _state.visitedFlags[idx] = true;
        return true;
      }
      return false;
    },

    /**
     * Go to next question.
     * @returns {boolean} true if moved, false if at last question
     */
    goNext: function() {
      if (_state.currentIndex < _state.totalQuestions - 1) {
        _state.currentIndex++;
        _state.visitedFlags[_state.currentIndex] = true;
        return true;
      }
      return false;
    },

    /**
     * Go to previous question.
     * @returns {boolean} true if moved, false if at first question
     */
    goPrev: function() {
      if (_state.currentIndex > 0) {
        _state.currentIndex--;
        _state.visitedFlags[_state.currentIndex] = true;
        return true;
      }
      return false;
    },

    isFirstQuestion: function() { return _state.currentIndex === 0; },
    isLastQuestion:  function() { return _state.currentIndex === _state.totalQuestions - 1; },

    /* ─────────────────────────────────────────────────────────
       ANSWERS
       ───────────────────────────────────────────────────────── */

    /**
     * Get the answer for a specific question.
     * @param {number} idx
     * @returns {number|null} Selected option index, or null if unanswered
     */
    getAnswer: function(idx) {
      if (idx >= 0 && idx < _state.totalQuestions) {
        return _state.answers[idx];
      }
      return null;
    },

    /**
     * Get the answer for the current question.
     * @returns {number|null}
     */
    getCurrentAnswer: function() {
      return _state.answers[_state.currentIndex];
    },

    /**
     * Set the answer for the current question.
     * @param {number} optionIndex - 0-based option index
     */
    setAnswer: function(optionIndex) {
      if (typeof optionIndex === 'number' && optionIndex >= 0) {
        _state.answers[_state.currentIndex] = optionIndex;
      }
    },

    /**
     * Set answer for a specific question index.
     * @param {number} questionIdx
     * @param {number} optionIndex
     */
    setAnswerAt: function(questionIdx, optionIndex) {
      if (questionIdx >= 0 && questionIdx < _state.totalQuestions) {
        _state.answers[questionIdx] = (typeof optionIndex === 'number' && optionIndex >= 0) ? optionIndex : null;
      }
    },

    /**
     * Clear the answer for the current question.
     */
    clearAnswer: function() {
      _state.answers[_state.currentIndex] = null;
    },

    /**
     * Get all answers array.
     * @returns {Array}
     */
    getAllAnswers: function() {
      return _state.answers.slice();
    },

    /**
     * Check if a question has been answered.
     * @param {number} idx
     * @returns {boolean}
     */
    isAnswered: function(idx) {
      return _state.answers[idx] !== null && _state.answers[idx] !== undefined;
    },

    /* ─────────────────────────────────────────────────────────
       MARK FOR REVIEW
       ───────────────────────────────────────────────────────── */

    /**
     * Check if a question is marked for review.
     * @param {number} idx
     * @returns {boolean}
     */
    isMarkedForReview: function(idx) {
      return !!_state.markedForReview[idx];
    },

    /**
     * Toggle review mark on the current question.
     * @returns {boolean} New marked state
     */
    toggleReview: function() {
      var idx = _state.currentIndex;
      _state.markedForReview[idx] = !_state.markedForReview[idx];
      return _state.markedForReview[idx];
    },

    /**
     * Set review mark for a specific question.
     * @param {number} idx
     * @param {boolean} marked
     */
    setReview: function(idx, marked) {
      if (idx >= 0 && idx < _state.totalQuestions) {
        _state.markedForReview[idx] = !!marked;
      }
    },

    /* ─────────────────────────────────────────────────────────
       VISITED FLAGS
       ───────────────────────────────────────────────────────── */

    isVisited: function(idx) {
      return !!_state.visitedFlags[idx];
    },

    /* ─────────────────────────────────────────────────────────
       COMPUTED COUNTS (for palette, status strip, submit modal)
       ───────────────────────────────────────────────────────── */

    /**
     * Get a summary of answer status counts.
     * @returns {{ answered: number, unanswered: number, review: number, visited: number }}
     */
    getCounts: function() {
      var answered   = 0;
      var unanswered = 0;
      var review     = 0;
      var visited    = 0;

      for (var i = 0; i < _state.totalQuestions; i++) {
        if (_state.answers[i] !== null && _state.answers[i] !== undefined) answered++;
        else unanswered++;
        if (_state.markedForReview[i]) review++;
        if (_state.visitedFlags[i]) visited++;
      }

      return {
        answered:   answered,
        unanswered: unanswered,
        review:     review,
        visited:    visited
      };
    },

    /**
     * Get the palette status for a question.
     * @param {number} idx
     * @returns {string} 'current' | 'answered' | 'review' | 'visited' | 'unanswered'
     */
    getPaletteStatus: function(idx) {
      if (idx === _state.currentIndex) return 'current';
      if (_state.markedForReview[idx]) return 'review';
      if (_state.answers[idx] !== null && _state.answers[idx] !== undefined) return 'answered';
      if (_state.visitedFlags[idx]) return 'visited';
      return 'unanswered';
    },

    /* ─────────────────────────────────────────────────────────
       TIMER STATE
       ───────────────────────────────────────────────────────── */

    getTimeRemaining:    function() { return _state.timeRemaining; },
    getTimeLimitSeconds: function() { return _state.timeLimitSeconds; },
    isTimerRunning:      function() { return _state.timerRunning; },
    isTimerWarning:      function() { return _state.timerWarning; },
    isTimerCritical:     function() { return _state.timerCritical; },

    /**
     * Decrement timer by 1 second.
     * Updates warning/critical flags.
     * @returns {number} New time remaining
     */
    tickTimer: function() {
      if (_state.timeRemaining > 0) {
        _state.timeRemaining--;
      }

      // Update warning/critical flags using ExamConstants if available
      var warnThreshold = (window.ExamConstants && ExamConstants.TIMER_WARNING_THRESHOLD) || 120;
      var critThreshold = (window.ExamConstants && ExamConstants.TIMER_CRITICAL_THRESHOLD) || 30;

      _state.timerWarning  = _state.timeRemaining <= warnThreshold && _state.timeRemaining > critThreshold;
      _state.timerCritical = _state.timeRemaining <= critThreshold;

      return _state.timeRemaining;
    },

    /**
     * Set the timer remaining directly (e.g., after tab-switch correction).
     * @param {number} secs
     */
    setTimeRemaining: function(secs) {
      _state.timeRemaining = Math.max(0, Math.floor(secs));
    },

    setTimerRunning: function(running) { _state.timerRunning = !!running; },

    /**
     * Get the progress of time elapsed as a percentage (0–100).
     * @returns {number}
     */
    getTimerProgress: function() {
      if (_state.timeLimitSeconds === 0) return 0;
      var elapsed = _state.timeLimitSeconds - _state.timeRemaining;
      return Math.min(100, (elapsed / _state.timeLimitSeconds) * 100);
    },

    /* ─────────────────────────────────────────────────────────
       TAB VISIBILITY
       ───────────────────────────────────────────────────────── */

    getHiddenSince:     function() { return _state.hiddenSince; },
    getTotalHiddenTime: function() { return _state.totalHiddenTime; },

    /**
     * Record when the tab was hidden.
     */
    markHidden: function() {
      _state.hiddenSince = Date.now();
    },

    /**
     * Record when the tab became visible again.
     * Calculates hidden duration and corrects timer.
     * @returns {number} Seconds the tab was hidden
     */
    markVisible: function() {
      if (!_state.hiddenSince) return 0;

      var hiddenMs = Date.now() - _state.hiddenSince;
      var hiddenSec = Math.floor(hiddenMs / 1000);
      _state.hiddenSince = null;

      var minCorrection = (window.ExamConstants && ExamConstants.HIDDEN_TIME_MIN_CORRECTION) || 2;
      if (hiddenSec >= minCorrection) {
        _state.totalHiddenTime += hiddenSec;
        // Correct the timer — deduct hidden time
        _state.timeRemaining = Math.max(0, _state.timeRemaining - hiddenSec);
      }

      return hiddenSec;
    },

    /* ─────────────────────────────────────────────────────────
       EXAM LIFECYCLE
       ───────────────────────────────────────────────────────── */

    isActive:    function() { return _state.isActive; },
    isSubmitted: function() { return _state.isSubmitted; },
    getStartTime: function() { return _state.startTime; },
    getEndTime:   function() { return _state.endTime; },
    getSubmitMethod: function() { return _state.submitMethod; },

    /**
     * Mark the exam as submitted.
     * @param {string} method - 'manual' or 'auto'
     */
    markSubmitted: function(method) {
      _state.endTime      = Date.now();
      _state.isActive     = false;
      _state.isSubmitted  = true;
      _state.timerRunning = false;
      _state.submitMethod = method || 'manual';
    },

    /**
     * Get total time taken in seconds.
     * @returns {number}
     */
    getTimeTaken: function() {
      var end = _state.endTime || Date.now();
      return Math.floor((end - _state.startTime) / 1000);
    },

    /**
     * Get exam progress as a percentage (questions answered / total).
     * @returns {number} 0–100
     */
    getProgress: function() {
      if (_state.totalQuestions === 0) return 0;
      var counts = this.getCounts();
      return Math.round((counts.answered / _state.totalQuestions) * 100);
    },

    /* ─────────────────────────────────────────────────────────
       SNAPSHOT — For Result/Storage
       ───────────────────────────────────────────────────────── */

    /**
     * Create a snapshot of the current exam state for results/storage.
     * @returns {Object} Serializable state snapshot
     */
    snapshot: function() {
      return {
        testId:           _state.testId,
        testTitle:        _state.testTitle,
        testType:         _state.testType,
        totalQuestions:    _state.totalQuestions,
        answers:          _state.answers.slice(),
        markedForReview:  _state.markedForReview.slice(),
        questions:        _state.questions,
        startTime:        _state.startTime,
        endTime:          _state.endTime || Date.now(),
        timeLimitSeconds: _state.timeLimitSeconds,
        timeRemaining:    _state.timeRemaining,
        totalHiddenTime:  _state.totalHiddenTime,
        submitMethod:     _state.submitMethod,
        negativeMarking:  _state.testConfig ? !!_state.testConfig.negativeMarking : true
      };
    },

    /* ─────────────────────────────────────────────────────────
       DEBUG (development only)
       ───────────────────────────────────────────────────────── */

    /** @private For debugging — returns raw state reference */
    _debug: function() {
      return _state;
    }
  };

})();

// Expose globally
window.ExamState = ExamState;
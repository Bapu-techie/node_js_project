/* ============================================================
   STATE INDEX — State Layer Coordination
   NursePrep Pro v3.0

   Thin coordination layer that provides:
   1. A unified access point for both state managers
   2. Cross-state convenience methods
   3. State integrity checks
   4. Debug utilities

   Load order: After examState.js and appState.js
   ============================================================ */

'use strict';

var StateManager = (function() {

  return {

    /* ─────────────────────────────────────────────────────────
       REFERENCES (convenience)
       ───────────────────────────────────────────────────────── */

    exam: window.ExamState,
    app:  window.AppState,

    /* ─────────────────────────────────────────────────────────
       CROSS-STATE CONVENIENCE
       ───────────────────────────────────────────────────────── */

    /**
     * Check if the user can start a new exam.
     * Requires: onboarded student, no active exam.
     * @returns {{ allowed: boolean, reason: string }}
     */
    canStartExam: function() {
      if (!window.AppState.isOnboarded()) {
        return { allowed: false, reason: 'Please complete your profile first.' };
      }
      if (window.ExamState.isActive()) {
        return { allowed: false, reason: 'An exam is already in progress.' };
      }
      return { allowed: true, reason: '' };
    },

    /**
     * Check if the user can navigate away from the current view.
     * Blocks navigation during active exam.
     * @returns {{ allowed: boolean, reason: string }}
     */
    canNavigateAway: function() {
      if (window.ExamState.isActive()) {
        return {
          allowed: false,
          reason: 'You have an active exam. Submit or exit first.'
        };
      }
      return { allowed: true, reason: '' };
    },

    /**
     * Get a combined state summary for debugging or analytics.
     * @returns {Object}
     */
    getSummary: function() {
      var examCounts = window.ExamState.isActive()
        ? window.ExamState.getCounts()
        : null;

      return {
        isOnboarded:    window.AppState.isOnboarded(),
        studentName:    window.AppState.getFirstName(),
        currentView:    window.AppState.getCurrentView(),
        totalAttempts:  window.AppState.getTotalAttempts(),
        examActive:     window.ExamState.isActive(),
        examTestId:     window.ExamState.getTestId(),
        examCounts:     examCounts,
        examTimeLeft:   window.ExamState.getTimeRemaining()
      };
    },

    /* ─────────────────────────────────────────────────────────
       STATE INTEGRITY
       ───────────────────────────────────────────────────────── */

    /**
     * Run integrity checks on both state managers.
     * Called on app init and after storage hydration.
     * @returns {{ valid: boolean, issues: Array<string> }}
     */
    checkIntegrity: function() {
      var issues = [];

      // Check AppState
      var student = window.AppState.getStudent();
      if (student) {
        if (!student.name || typeof student.name !== 'string') {
          issues.push('Student name is missing or invalid.');
        }
        if (!student.email || typeof student.email !== 'string') {
          issues.push('Student email is missing or invalid.');
        }
      }

      // Check attempts
      var attempts = window.AppState.getAttempts();
      for (var i = 0; i < attempts.length; i++) {
        var a = attempts[i];
        if (!a.testId) {
          issues.push('Attempt at index ' + i + ' missing testId.');
        }
        if (typeof a.score === 'undefined') {
          issues.push('Attempt at index ' + i + ' missing score.');
        }
      }

      // Check ExamState if active
      if (window.ExamState.isActive()) {
        if (window.ExamState.getTotalQuestions() === 0) {
          issues.push('Active exam has 0 questions.');
        }
        if (!window.ExamState.getTestId()) {
          issues.push('Active exam has no testId.');
        }
      }

      return {
        valid:  issues.length === 0,
        issues: issues
      };
    },

    /* ─────────────────────────────────────────────────────────
       FULL RESET (logout / clear data)
       ───────────────────────────────────────────────────────── */

    /**
     * Reset ALL application state.
     * Used for logout or data clear.
     */
    resetAll: function() {
      window.ExamState.reset();
      window.AppState.setStudent(null);
      window.AppState.clearAttempts();
      window.AppState.setActiveFilter('all');
      window.AppState.setSearchQuery('');
      window.AppState.closeModal();
      window.AppState.setLoading(false);
      window.AppState.updateSettings({
        soundEnabled: false,
        animEnabled:  true
      });
    },

    /* ─────────────────────────────────────────────────────────
       DEBUG
       ───────────────────────────────────────────────────────── */

    /**
     * Dump full state to console (development only).
     */
    dump: function() {
      console.group('[StateManager] Full State Dump');
      console.log('AppState:', window.AppState._debug());
      console.log('ExamState:', window.ExamState._debug());
      console.log('Summary:', this.getSummary());
      console.log('Integrity:', this.checkIntegrity());
      console.groupEnd();
    }
  };

})();

// Expose globally
window.StateManager = StateManager;
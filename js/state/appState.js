/* ============================================================
   APP STATE — Application-Level State Manager
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Manages all NON-EXAM mutable state:
   - Student profile (name, email, joined date)
   - Current view / navigation history
   - Dashboard state (active filter, search query)
   - Attempt history (loaded from StorageLayer)
   - Analytics aggregations
   - UI flags (modals, loading states)

   Design:
   - Single `_state` object — single source of truth
   - Getter/setter pattern — no direct property access
   - Event-driven updates via lightweight callback system
   - No DOM manipulation — UI reads state via getters

   Used by: App, Nav, DashboardRenderer, ResultEngine,
            AnalyticsRenderer, ProfileRenderer
   ============================================================ */

'use strict';

var AppState = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _state = {
    // Student profile
    student: null,           // { name, email, joinedDate } or null if not onboarded

    // Navigation
    currentView:   '',       // Current view ID e.g. 'view-dashboard'
    previousView:  '',       // Previous view ID for back navigation
    viewHistory:   [],       // Stack of visited views

    // Dashboard state
    activeFilter:  'all',    // Current test type filter: 'all' | 'topic' | 'subject' | 'multi' | 'mock' | 'quick'
    searchQuery:   '',       // Dashboard test search query

    // Attempt history (loaded from storage)
    attempts:      [],       // Array of attempt summary objects

    // UI flags
    isLoading:     false,    // Global loading state
    modalOpen:     '',       // Currently open modal ID or ''

    // Settings
    settings: {
      soundEnabled:  false,
      animEnabled:   true
    }
  };


  /* ═══════════════════════════════════════════════════════════
     LIGHTWEIGHT EVENT SYSTEM
     Allows UI components to subscribe to state changes.
     ═══════════════════════════════════════════════════════════ */

  var _listeners = {};

  function _emit(event, data) {
    if (_listeners[event]) {
      for (var i = 0; i < _listeners[event].length; i++) {
        try {
          _listeners[event][i](data);
        } catch (e) {
          console.error('[AppState] Listener error on "' + event + '":', e);
        }
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /* ─────────────────────────────────────────────────────────
       EVENT SYSTEM
       ─────────────────────────────────────────────���─────────── */

    /**
     * Subscribe to a state change event.
     * @param {string} event - Event name
     * @param {Function} callback
     */
    on: function(event, callback) {
      if (typeof callback !== 'function') return;
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(callback);
    },

    /**
     * Unsubscribe from a state change event.
     * @param {string} event
     * @param {Function} callback
     */
    off: function(event, callback) {
      if (!_listeners[event]) return;
      _listeners[event] = _listeners[event].filter(function(fn) {
        return fn !== callback;
      });
    },

    /* ─────────────────────────────────────────────────────────
       STUDENT PROFILE
       ───────────────────────────────────────────────────────── */

    /**
     * Get the current student profile.
     * @returns {{ name: string, email: string, joinedDate: string }|null}
     */
    getStudent: function() {
      return _state.student;
    },

    /**
     * Set the student profile.
     * @param {{ name: string, email: string, joinedDate?: string }} student
     */
    setStudent: function(student) {
      if (!student) {
        _state.student = null;
      } else {
        _state.student = {
          name:       student.name || '',
          email:      student.email || '',
          joinedDate: student.joinedDate || new Date().toISOString()
        };
      }
      _emit('student:changed', _state.student);
    },

    /**
     * Check if a student profile exists (is onboarded).
     * @returns {boolean}
     */
    isOnboarded: function() {
      return _state.student !== null && !!_state.student.name;
    },

    /**
     * Get the student's first name (for greeting).
     * @returns {string}
     */
    getFirstName: function() {
      if (!_state.student || !_state.student.name) return '';
      return _state.student.name.trim().split(/\s+/)[0];
    },

    /**
     * Get student initials (for avatar).
     * @returns {string} e.g. "RP"
     */
    getInitials: function() {
      if (!_state.student || !_state.student.name) return '?';
      var parts = _state.student.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    },

    /* ─────────────────────────────────────────────────────────
       NAVIGATION
       ───────────────────────────────────────────────────────── */

    getCurrentView:  function() { return _state.currentView; },
    getPreviousView: function() { return _state.previousView; },

    /**
     * Set the current view and push to history.
     * @param {string} viewId
     */
    setCurrentView: function(viewId) {
      if (viewId === _state.currentView) return;

      _state.previousView = _state.currentView;
      _state.currentView = viewId;

      // Push to history stack (limit 20)
      _state.viewHistory.push(viewId);
      if (_state.viewHistory.length > 20) {
        _state.viewHistory.shift();
      }

      _emit('view:changed', {
        current:  _state.currentView,
        previous: _state.previousView
      });
    },

    /**
     * Go back to the previous view.
     * @returns {string} The view navigated to, or '' if no history
     */
    goBack: function() {
      if (_state.viewHistory.length < 2) return '';
      _state.viewHistory.pop(); // Remove current
      var prev = _state.viewHistory[_state.viewHistory.length - 1];
      _state.previousView = _state.currentView;
      _state.currentView = prev;

      _emit('view:changed', {
        current:  _state.currentView,
        previous: _state.previousView
      });

      return prev;
    },

    /**
     * Get the full view history stack.
     * @returns {Array<string>}
     */
    getViewHistory: function() {
      return _state.viewHistory.slice();
    },

    /* ─────────────────────────────────────────────────────────
       DASHBOARD STATE
       ───────────────────────────────────────────────────────── */

    getActiveFilter: function() { return _state.activeFilter; },

    /**
     * Set the active test type filter.
     * @param {string} filter - 'all' | 'topic' | 'subject' | 'multi' | 'mock' | 'quick'
     */
    setActiveFilter: function(filter) {
      _state.activeFilter = filter || 'all';
      _emit('filter:changed', _state.activeFilter);
    },

    getSearchQuery: function() { return _state.searchQuery; },

    /**
     * Set the dashboard search query.
     * @param {string} query
     */
    setSearchQuery: function(query) {
      _state.searchQuery = (typeof query === 'string') ? query.trim() : '';
      _emit('search:changed', _state.searchQuery);
    },

    /* ─────────────────────────────────────────────────────────
       ATTEMPT HISTORY
       ───────────────────────────────────────────────────────── */

    /**
     * Get all stored attempts.
     * @returns {Array}
     */
    getAttempts: function() {
      return _state.attempts;
    },

    /**
     * Set the attempts array (loaded from storage).
     * @param {Array} attempts
     */
    setAttempts: function(attempts) {
      _state.attempts = Array.isArray(attempts) ? attempts : [];
      _emit('attempts:changed', _state.attempts);
    },

    /**
     * Add a new attempt to the front of the list.
     * @param {Object} attempt
     */
    addAttempt: function(attempt) {
      if (!attempt) return;
      _state.attempts.unshift(attempt);

      // Cap at max stored attempts
      var max = (window.UIConstants && UIConstants.MAX_STORED_ATTEMPTS) || 200;
      if (_state.attempts.length > max) {
        _state.attempts = _state.attempts.slice(0, max);
      }

      _emit('attempts:changed', _state.attempts);
    },

    /**
     * Clear all attempts.
     */
    clearAttempts: function() {
      _state.attempts = [];
      _emit('attempts:changed', _state.attempts);
    },

    /**
     * Get attempts for a specific test.
     * @param {string} testId
     * @returns {Array}
     */
    getAttemptsForTest: function(testId) {
      return _state.attempts.filter(function(a) {
        return a.testId === testId;
      });
    },

    /**
     * Get the total number of attempts.
     * @returns {number}
     */
    getTotalAttempts: function() {
      return _state.attempts.length;
    },

    /**
     * Get the most recent N attempts.
     * @param {number} n
     * @returns {Array}
     */
    getRecentAttempts: function(n) {
      return _state.attempts.slice(0, n || 10);
    },

    /* ─────────────────────────────────────────────────────────
       COMPUTED ANALYTICS (from attempts)
       ───────────────────────────────────────────────────────── */

    /**
     * Get overall stats aggregated from all attempts.
     * @returns {{ totalAttempts, avgScore, avgAccuracy, bestScore, totalTimeSec, testsCompleted }}
     */
    getOverallStats: function() {
      var attempts = _state.attempts;
      if (attempts.length === 0) {
        return {
          totalAttempts: 0,
          avgScore: 0,
          avgAccuracy: 0,
          bestScore: 0,
          totalTimeSec: 0,
          testsCompleted: 0
        };
      }

      var totalScore    = 0;
      var totalAccuracy = 0;
      var bestScore     = -Infinity;
      var totalTime     = 0;
      var uniqueTests   = {};

      for (var i = 0; i < attempts.length; i++) {
        var a = attempts[i];
        totalScore    += (a.score || 0);
        totalAccuracy += (a.accuracy || 0);
        totalTime     += (a.timeTaken || 0);
        if ((a.score || 0) > bestScore) bestScore = a.score || 0;
        uniqueTests[a.testId] = true;
      }

      return {
        totalAttempts:  attempts.length,
        avgScore:       totalScore / attempts.length,
        avgAccuracy:    totalAccuracy / attempts.length,
        bestScore:      bestScore === -Infinity ? 0 : bestScore,
        totalTimeSec:   totalTime,
        testsCompleted: Object.keys(uniqueTests).length
      };
    },

    /**
     * Get per-subject accuracy stats.
     * @returns {Object} { physics: { total, correct, accuracy }, ... }
     */
    getSubjectStats: function() {
      var stats = {};
      var attempts = _state.attempts;

      for (var i = 0; i < attempts.length; i++) {
        var a = attempts[i];
        if (!a.subjectBreakdown) continue;

        for (var subj in a.subjectBreakdown) {
          if (!a.subjectBreakdown.hasOwnProperty(subj)) continue;
          var bd = a.subjectBreakdown[subj];

          if (!stats[subj]) {
            stats[subj] = { total: 0, correct: 0 };
          }
          stats[subj].total   += (bd.total || 0);
          stats[subj].correct += (bd.correct || 0);
        }
      }

      // Calculate accuracy
      for (var key in stats) {
        if (stats.hasOwnProperty(key)) {
          stats[key].accuracy = stats[key].total > 0
            ? (stats[key].correct / stats[key].total) * 100
            : 0;
        }
      }

      return stats;
    },

    /* ─────────────────────────────────────────────────────────
       UI FLAGS
       ───────────────────────────────────────────────────────── */

    isLoading: function() { return _state.isLoading; },

    setLoading: function(loading) {
      _state.isLoading = !!loading;
      _emit('loading:changed', _state.isLoading);
    },

    getModalOpen: function() { return _state.modalOpen; },

    /**
     * Open a modal by ID.
     * @param {string} modalId
     */
    openModal: function(modalId) {
      _state.modalOpen = modalId || '';
      _emit('modal:changed', _state.modalOpen);
    },

    /**
     * Close the currently open modal.
     */
    closeModal: function() {
      var was = _state.modalOpen;
      _state.modalOpen = '';
      _emit('modal:changed', '');
      return was;
    },

    /* ─────────────────────────────────────────────────────────
       SETTINGS
       ───────────────────────────────────────────────────────── */

    getSettings: function() {
      return {
        soundEnabled: _state.settings.soundEnabled,
        animEnabled:  _state.settings.animEnabled
      };
    },

    /**
     * Update settings (partial update).
     * @param {Object} updates - { soundEnabled?, animEnabled? }
     */
    updateSettings: function(updates) {
      if (!updates || typeof updates !== 'object') return;

      if (typeof updates.soundEnabled === 'boolean') {
        _state.settings.soundEnabled = updates.soundEnabled;
      }
      if (typeof updates.animEnabled === 'boolean') {
        _state.settings.animEnabled = updates.animEnabled;
      }

      _emit('settings:changed', _state.settings);
    },

    /* ─────────────────────────────────────────────────────────
       HYDRATION — Load state from storage on startup
       ───────────────────────────────────────────────────────── */

    /**
     * Hydrate app state from persisted data.
     * Called once on app init by App controller.
     * @param {{ student?, attempts?, settings? }} data
     */
    hydrate: function(data) {
      if (!data) return;

      if (data.student) {
        this.setStudent(data.student);
      }

      if (Array.isArray(data.attempts)) {
        this.setAttempts(data.attempts);
      }

      if (data.settings) {
        this.updateSettings(data.settings);
      }
    },

    /**
     * Dehydrate app state for persistence.
     * Returns serializable data for StorageLayer.
     * @returns {{ student, attempts, settings }}
     */
    dehydrate: function() {
      return {
        student:  _state.student,
        attempts: _state.attempts,
        settings: _state.settings
      };
    },

    /* ────────────────────────────────────────���────────────────
       DEBUG
       ───────────────────────────────────────────────────────── */

    /** @private */
    _debug: function() {
      return _state;
    }
  };

})();

// Expose globally
window.AppState = AppState;
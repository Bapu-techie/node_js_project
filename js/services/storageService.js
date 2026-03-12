/* ============================================================
   STORAGE SERVICE — LocalStorage Abstraction Layer
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Clean abstraction over localStorage with:
   - JSON serialization/deserialization
   - Versioned storage keys (v3 migration-safe)
   - Quota management & error handling
   - Import/export functionality
   - Atomic read/write operations
   - Storage usage reporting

   Keys used (from UIConstants.STORAGE_KEYS):
   - npp_student_v3      → Student profile
   - npp_attempts_v3     → Attempt history array
   - npp_settings_v3     → App settings
   - npp_submit_queue_v3 → Offline form submission queue
   - npp_theme_v3        → Theme preference

   Used by: App (init hydration), ExamEngine (save attempt),
            FormSubmitter (queue), ProfileRenderer (export/import)
   ============================================================ */

'use strict';

var StorageService = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Get storage keys from UIConstants or use defaults.
   * @returns {Object}
   */
  function _keys() {
    if (window.UIConstants && UIConstants.STORAGE_KEYS) {
      return UIConstants.STORAGE_KEYS;
    }
    // Fallback defaults
    return {
      STUDENT:      'npp_student_v3',
      ATTEMPTS:     'npp_attempts_v3',
      SETTINGS:     'npp_settings_v3',
      SUBMIT_QUEUE: 'npp_submit_queue_v3',
      THEME:        'npp_theme_v3'
    };
  }

  /**
   * Safely get and parse JSON from localStorage.
   * @param {string} key
   * @returns {*} Parsed value or null on failure
   */
  function _get(key) {
    try {
      var raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[StorageService] Failed to read key "' + key + '":', e.message);
      return null;
    }
  }

  /**
   * Safely serialize and write JSON to localStorage.
   * @param {string} key
   * @param {*} value
   * @returns {boolean} Success
   */
  function _set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      // Likely QuotaExceededError
      console.error('[StorageService] Failed to write key "' + key + '":', e.message);

      // Attempt to free space if quota exceeded
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        _handleQuotaExceeded(key, value);
      }
      return false;
    }
  }

  /**
   * Remove a key from localStorage.
   * @param {string} key
   */
  function _remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('[StorageService] Failed to remove key "' + key + '":', e.message);
    }
  }

  /**
   * Handle quota exceeded by trimming old attempts.
   * @param {string} key - The key that failed to write
   * @param {*} value - The value that failed to write
   */
  function _handleQuotaExceeded(key, value) {
    console.warn('[StorageService] Quota exceeded. Attempting to free space...');

    var keys = _keys();

    // Strategy: trim attempts to half
    var attempts = _get(keys.ATTEMPTS);
    if (Array.isArray(attempts) && attempts.length > 10) {
      var trimmed = attempts.slice(0, Math.floor(attempts.length / 2));
      try {
        localStorage.setItem(keys.ATTEMPTS, JSON.stringify(trimmed));
        // Retry the original write
        localStorage.setItem(key, JSON.stringify(value));
        console.log('[StorageService] Freed space by trimming attempts from ' + attempts.length + ' to ' + trimmed.length);
      } catch (e2) {
        console.error('[StorageService] Still cannot write after trimming. Storage may be full.');
      }
    }
  }

  /**
   * Check if localStorage is available.
   * @returns {boolean}
   */
  function _isAvailable() {
    try {
      var testKey = '__npp_storage_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /* ─────────────────────────────────────────────────────────
       AVAILABILITY CHECK
       ───────────────────────────────────────────────────────── */

    /**
     * Check if localStorage is available and writable.
     * @returns {boolean}
     */
    isAvailable: function() {
      return _isAvailable();
    },

    /* ─────────────────────────────────────────────────────────
       STUDENT PROFILE
       ───────────────────────────────────────────────────────── */

    /**
     * Load student profile from storage.
     * @returns {{ name: string, email: string, joinedDate: string }|null}
     */
    loadStudent: function() {
      return _get(_keys().STUDENT);
    },

    /**
     * Save student profile to storage.
     * @param {{ name: string, email: string, joinedDate?: string }} student
     * @returns {boolean} Success
     */
    saveStudent: function(student) {
      if (!student) return false;
      return _set(_keys().STUDENT, {
        name:       student.name || '',
        email:      student.email || '',
        joinedDate: student.joinedDate || new Date().toISOString()
      });
    },

    /**
     * Remove student profile from storage.
     */
    clearStudent: function() {
      _remove(_keys().STUDENT);
    },

    /* ─────────────────────────────────────────────────────────
       ATTEMPT HISTORY
       ───────────────────────────────────────────────────────── */

    /**
     * Load all attempts from storage.
     * @returns {Array} Array of attempt objects, or empty array
     */
    loadAttempts: function() {
      var data = _get(_keys().ATTEMPTS);
      return Array.isArray(data) ? data : [];
    },

    /**
     * Save the full attempts array to storage.
     * @param {Array} attempts
     * @returns {boolean} Success
     */
    saveAttempts: function(attempts) {
      if (!Array.isArray(attempts)) return false;

      // Enforce max limit
      var max = (window.UIConstants && UIConstants.MAX_STORED_ATTEMPTS) || 200;
      var toSave = attempts.length > max ? attempts.slice(0, max) : attempts;

      return _set(_keys().ATTEMPTS, toSave);
    },

    /**
     * Add a single attempt and persist.
     * Prepends to array (newest first).
     * @param {Object} attempt
     * @returns {boolean} Success
     */
    addAttempt: function(attempt) {
      if (!attempt || !attempt.testId) return false;

      var attempts = this.loadAttempts();
      attempts.unshift(attempt);

      return this.saveAttempts(attempts);
    },

    /**
     * Clear all attempts from storage.
     */
    clearAttempts: function() {
      _remove(_keys().ATTEMPTS);
    },

    /* ─────────────────────────────────────────────────────────
       SETTINGS
       ───────────────────────────────────────────────────────── */

    /**
     * Load settings from storage.
     * @returns {Object|null}
     */
    loadSettings: function() {
      return _get(_keys().SETTINGS);
    },

    /**
     * Save settings to storage.
     * @param {Object} settings
     * @returns {boolean}
     */
    saveSettings: function(settings) {
      if (!settings || typeof settings !== 'object') return false;
      return _set(_keys().SETTINGS, settings);
    },

    /**
     * Clear settings from storage.
     */
    clearSettings: function() {
      _remove(_keys().SETTINGS);
    },

    /* ─────────────────────────────────────────────────────────
       FORM SUBMISSION QUEUE (offline support)
       ───────────────────────────────────────────────────────── */

    /**
     * Load the offline submission queue.
     * @returns {Array}
     */
    loadSubmitQueue: function() {
      var data = _get(_keys().SUBMIT_QUEUE);
      return Array.isArray(data) ? data : [];
    },

    /**
     * Save the submission queue.
     * @param {Array} queue
     * @returns {boolean}
     */
    saveSubmitQueue: function(queue) {
      if (!Array.isArray(queue)) return false;

      // Enforce max queue size
      var max = (window.UIConstants && UIConstants.MAX_SUBMIT_QUEUE) || 20;
      var toSave = queue.length > max ? queue.slice(-max) : queue;

      return _set(_keys().SUBMIT_QUEUE, toSave);
    },

    /**
     * Add an item to the submission queue.
     * @param {Object} item
     * @returns {boolean}
     */
    enqueueSubmission: function(item) {
      if (!item) return false;
      var queue = this.loadSubmitQueue();
      queue.push(item);
      return this.saveSubmitQueue(queue);
    },

    /**
     * Remove the first item from the queue (after successful submit).
     * @returns {Object|null} The removed item
     */
    dequeueSubmission: function() {
      var queue = this.loadSubmitQueue();
      if (queue.length === 0) return null;

      var item = queue.shift();
      this.saveSubmitQueue(queue);
      return item;
    },

    /**
     * Clear the submission queue.
     */
    clearSubmitQueue: function() {
      _remove(_keys().SUBMIT_QUEUE);
    },

    /* ─────────────────────────────────────────────────────────
       THEME
       ───────────────────────────────────────────────────────── */

    loadTheme: function() {
      return _get(_keys().THEME);
    },

    saveTheme: function(theme) {
      return _set(_keys().THEME, theme);
    },

    /* ─────────────────────────────────────────────────────────
       BULK OPERATIONS
       ───────────────────────────────────────────────────────── */

    /**
     * Load all app data from storage.
     * Used by App.init() to hydrate AppState.
     * @returns {{ student, attempts, settings }}
     */
    loadAll: function() {
      return {
        student:  this.loadStudent(),
        attempts: this.loadAttempts(),
        settings: this.loadSettings()
      };
    },

    /**
     * Save all app data to storage.
     * Used by App on periodic auto-save.
     * @param {{ student?, attempts?, settings? }} data
     */
    saveAll: function(data) {
      if (!data) return;
      if (data.student)  this.saveStudent(data.student);
      if (data.attempts) this.saveAttempts(data.attempts);
      if (data.settings) this.saveSettings(data.settings);
    },

    /**
     * Clear ALL NursePrep Pro data from storage.
     * Used by "Clear All Data" in profile settings.
     */
    clearAll: function() {
      var keys = _keys();
      for (var k in keys) {
        if (keys.hasOwnProperty(k)) {
          _remove(keys[k]);
        }
      }
    },

    /* ─────────────────────────────────────────────────────────
       EXPORT / IMPORT
       ───────────────────────────────────────────────────────── */

    /**
     * Export all data as a JSON string (for download/backup).
     * @returns {string} JSON string
     */
    exportData: function() {
      var data = this.loadAll();
      data.exportDate = new Date().toISOString();
      data.appVersion = (window.UIConstants && UIConstants.APP_VERSION) || '3.0.0';
      return JSON.stringify(data, null, 2);
    },

    /**
     * Import data from a JSON string (from file upload/restore).
     * Validates data structure before importing.
     * @param {string} jsonString
     * @returns {{ success: boolean, message: string }}
     */
    importData: function(jsonString) {
      var data;
      try {
        data = JSON.parse(jsonString);
      } catch (e) {
        return { success: false, message: 'Invalid JSON format.' };
      }

      // Validate using Validators if available
      if (window.Validators && typeof Validators.validateImportData === 'function') {
        var validation = Validators.validateImportData(data);
        if (!validation.valid) {
          return { success: false, message: validation.message };
        }
      }

      // Import each section
      if (data.student)  this.saveStudent(data.student);
      if (data.attempts) this.saveAttempts(data.attempts);
      if (data.settings) this.saveSettings(data.settings);

      return { success: true, message: 'Data imported successfully.' };
    },

    /* ─────────────────────────────────────────────────────────
       STORAGE USAGE INFO
       ───────────────────────────────────────────────────────── */

    /**
     * Get storage usage information.
     * @returns {{ used: number, usedFormatted: string, keyBreakdown: Object }}
     */
    getUsageInfo: function() {
      var keys = _keys();
      var totalBytes = 0;
      var breakdown = {};

      for (var k in keys) {
        if (keys.hasOwnProperty(k)) {
          var raw = localStorage.getItem(keys[k]);
          var size = raw ? new Blob([raw]).size : 0;
          breakdown[k] = size;
          totalBytes += size;
        }
      }

      var usedKB = (totalBytes / 1024).toFixed(1);
      var usedMB = (totalBytes / (1024 * 1024)).toFixed(2);

      return {
        used:          totalBytes,
        usedKB:        parseFloat(usedKB),
        usedMB:        parseFloat(usedMB),
        usedFormatted: totalBytes > 1048576 ? usedMB + ' MB' : usedKB + ' KB',
        keyBreakdown:  breakdown
      };
    },

    /* ─────────────────────────────────────────────────────────
       MIGRATION (from older versions)
       ───────────────────────────────────────────────────────── */

    /**
     * Check for old version data and migrate if found.
     * Looks for v1/v2 keys and migrates to v3.
     */
    migrateFromOlderVersions: function() {
      var oldKeys = [
        { old: 'npp_student_v1',  new: _keys().STUDENT },
        { old: 'npp_student_v2',  new: _keys().STUDENT },
        { old: 'npp_attempts_v1', new: _keys().ATTEMPTS },
        { old: 'npp_attempts_v2', new: _keys().ATTEMPTS },
        { old: 'npp_settings_v1', new: _keys().SETTINGS },
        { old: 'npp_settings_v2', new: _keys().SETTINGS }
      ];

      var migrated = false;

      for (var i = 0; i < oldKeys.length; i++) {
        var entry = oldKeys[i];
        var oldData = _get(entry.old);

        if (oldData !== null) {
          // Only migrate if new key doesn't already have data
          var newData = _get(entry.new);
          if (newData === null) {
            _set(entry.new, oldData);
            console.log('[StorageService] Migrated "' + entry.old + '" → "' + entry.new + '"');
            migrated = true;
          }
          // Remove old key
          _remove(entry.old);
        }
      }

      if (migrated) {
        console.log('[StorageService] Migration complete.');
      }
    }
  };

})();

// Expose globally
window.StorageService = StorageService;
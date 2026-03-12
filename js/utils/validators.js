/* ============================================================
   VALIDATORS — Input Validation Functions
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Pure validation functions — no side effects, no DOM access.
   Each returns { valid: boolean, message: string }.

   Categories:
   - Student profile validation (name, email)
   - Exam validation (test config, question, answer)
   - Data validation (import data, attempt object)
   - Generic validators (required, range, pattern)

   Dependencies: None (self-contained)
   Used by: OnboardRenderer, ExamEngine, StorageService, FormSubmitter
   ============================================================ */

'use strict';

var Validators = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Create a validation result object.
   * @param {boolean} valid
   * @param {string} [message='']
   * @returns {{ valid: boolean, message: string }}
   */
  function _result(valid, message) {
    return {
      valid:   !!valid,
      message: message || ''
    };
  }

  // Common regex patterns
  var EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  var NAME_REGEX  = /^[a-zA-Z\s.\-']+$/;

  var MIN_NAME_LENGTH  = 2;
  var MAX_NAME_LENGTH  = 100;
  var MAX_EMAIL_LENGTH = 254;


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /* ─────────────────────────────────────────────────────────
       STUDENT PROFILE VALIDATORS
       ───────────────────────────────────────────────────────── */

    /**
     * Validate a student name.
     * Rules: Required, 2–100 chars, letters/spaces/dots/hyphens/apostrophes only.
     * @param {string} name
     * @returns {{ valid: boolean, message: string }}
     */
    validateName: function(name) {
      if (typeof name !== 'string') {
        return _result(false, 'Name is required.');
      }

      var trimmed = name.trim();

      if (trimmed.length === 0) {
        return _result(false, 'Name is required.');
      }

      if (trimmed.length < MIN_NAME_LENGTH) {
        return _result(false, 'Name must be at least ' + MIN_NAME_LENGTH + ' characters.');
      }

      if (trimmed.length > MAX_NAME_LENGTH) {
        return _result(false, 'Name must be less than ' + MAX_NAME_LENGTH + ' characters.');
      }

      if (!NAME_REGEX.test(trimmed)) {
        return _result(false, 'Name can only contain letters, spaces, dots, hyphens, and apostrophes.');
      }

      return _result(true);
    },

    /**
     * Validate an email address.
     * Rules: Required, valid format, max 254 chars.
     * @param {string} email
     * @returns {{ valid: boolean, message: string }}
     */
    validateEmail: function(email) {
      if (typeof email !== 'string') {
        return _result(false, 'Email is required.');
      }

      var trimmed = email.trim();

      if (trimmed.length === 0) {
        return _result(false, 'Email is required.');
      }

      if (trimmed.length > MAX_EMAIL_LENGTH) {
        return _result(false, 'Email is too long (max ' + MAX_EMAIL_LENGTH + ' characters).');
      }

      if (!EMAIL_REGEX.test(trimmed)) {
        return _result(false, 'Please enter a valid email address.');
      }

      return _result(true);
    },

    /**
     * Validate a full student profile object.
     * @param {{ name: string, email: string }} student
     * @returns {{ valid: boolean, message: string, errors: Object }}
     */
    validateStudent: function(student) {
      if (!student || typeof student !== 'object') {
        return { valid: false, message: 'Student data is required.', errors: {} };
      }

      var nameResult  = this.validateName(student.name);
      var emailResult = this.validateEmail(student.email);

      var errors = {};
      if (!nameResult.valid)  errors.name  = nameResult.message;
      if (!emailResult.valid) errors.email = emailResult.message;

      var valid = nameResult.valid && emailResult.valid;
      var message = valid ? '' : 'Please fix the errors above.';

      return {
        valid:   valid,
        message: message,
        errors:  errors
      };
    },

    /* ─────────────────────────────────────────────────────────
       EXAM VALIDATORS
       ───────────────────────────────────────────────────────── */

    /**
     * Validate a test config object.
     * @param {Object} config
     * @returns {{ valid: boolean, message: string }}
     */
    validateTestConfig: function(config) {
      if (!config || typeof config !== 'object') {
        return _result(false, 'Invalid test configuration.');
      }

      if (!config.id || typeof config.id !== 'string') {
        return _result(false, 'Test config missing id.');
      }

      if (!config.title || typeof config.title !== 'string') {
        return _result(false, 'Test config missing title.');
      }

      if (!Array.isArray(config.sections) || config.sections.length === 0) {
        return _result(false, 'Test config has no sections.');
      }

      for (var i = 0; i < config.sections.length; i++) {
        var section = config.sections[i];
        if (!section.subject || !Array.isArray(section.topics)) {
          return _result(false, 'Section ' + i + ' is invalid (missing subject or topics).');
        }
      }

      if (typeof config.timeLimitMinutes !== 'number' || config.timeLimitMinutes <= 0) {
        return _result(false, 'Test config has invalid time limit.');
      }

      return _result(true);
    },

    /**
     * Validate a question object has all required fields.
     * @param {Object} question
     * @returns {{ valid: boolean, message: string }}
     */
    validateQuestion: function(question) {
      if (!question || typeof question !== 'object') {
        return _result(false, 'Invalid question object.');
      }

      if (!question.id) {
        return _result(false, 'Question missing id.');
      }

      if (typeof question.question !== 'string' || question.question.length === 0) {
        return _result(false, 'Question "' + question.id + '" has no question text.');
      }

      if (!Array.isArray(question.options) || question.options.length < 2) {
        return _result(false, 'Question "' + question.id + '" needs at least 2 options.');
      }

      if (typeof question.correctAnswer !== 'number' ||
          question.correctAnswer < 0 ||
          question.correctAnswer >= question.options.length) {
        return _result(false, 'Question "' + question.id + '" has invalid correctAnswer.');
      }

      return _result(true);
    },

    /**
     * Validate an answer selection.
     * @param {number} optionIndex
     * @param {number} totalOptions
     * @returns {{ valid: boolean, message: string }}
     */
    validateAnswer: function(optionIndex, totalOptions) {
      if (optionIndex === null || optionIndex === undefined) {
        return _result(true); // Unanswered is valid
      }

      if (typeof optionIndex !== 'number') {
        return _result(false, 'Answer must be a number.');
      }

      if (optionIndex < 0 || optionIndex >= (totalOptions || 4)) {
        return _result(false, 'Answer out of range (0–' + ((totalOptions || 4) - 1) + ').');
      }

      return _result(true);
    },

    /* ─────────────────────────────────────────────────────────
       DATA VALIDATORS
       ───────────────────────────────────────────────────────── */

    /**
     * Validate imported data structure.
     * Ensures it has the expected shape before importing.
     * @param {Object} data
     * @returns {{ valid: boolean, message: string }}
     */
    validateImportData: function(data) {
      if (!data || typeof data !== 'object') {
        return _result(false, 'Invalid data format.');
      }

      // Must have at least one recognized key
      var hasStudent  = data.hasOwnProperty('student');
      var hasAttempts = data.hasOwnProperty('attempts');
      var hasSettings = data.hasOwnProperty('settings');

      if (!hasStudent && !hasAttempts && !hasSettings) {
        return _result(false, 'Data has no recognized fields (student, attempts, or settings).');
      }

      // Validate student if present
      if (hasStudent && data.student !== null) {
        if (typeof data.student !== 'object') {
          return _result(false, 'Student field is not a valid object.');
        }
        if (!data.student.name || !data.student.email) {
          return _result(false, 'Student data missing name or email.');
        }
      }

      // Validate attempts if present
      if (hasAttempts) {
        if (!Array.isArray(data.attempts)) {
          return _result(false, 'Attempts must be an array.');
        }

        // Spot-check first few entries
        var checkCount = Math.min(data.attempts.length, 5);
        for (var i = 0; i < checkCount; i++) {
          var a = data.attempts[i];
          if (!a || typeof a !== 'object') {
            return _result(false, 'Attempt at index ' + i + ' is not a valid object.');
          }
          if (!a.testId) {
            return _result(false, 'Attempt at index ' + i + ' missing testId.');
          }
        }
      }

      // Validate settings if present
      if (hasSettings && data.settings !== null) {
        if (typeof data.settings !== 'object') {
          return _result(false, 'Settings field is not a valid object.');
        }
      }

      return _result(true);
    },

    /**
     * Validate an attempt summary object (for storage).
     * @param {Object} attempt
     * @returns {{ valid: boolean, message: string }}
     */
    validateAttempt: function(attempt) {
      if (!attempt || typeof attempt !== 'object') {
        return _result(false, 'Invalid attempt object.');
      }

      if (!attempt.testId) {
        return _result(false, 'Attempt missing testId.');
      }

      if (typeof attempt.score === 'undefined') {
        return _result(false, 'Attempt missing score.');
      }

      if (typeof attempt.totalQuestions !== 'number' || attempt.totalQuestions <= 0) {
        return _result(false, 'Attempt has invalid totalQuestions.');
      }

      return _result(true);
    },

    /* ───────────────────────────��─────────────────────────────
       GENERIC VALIDATORS
       ───────────────────────────────────────────────────────── */

    /**
     * Check if a value is present (not null, undefined, or empty string).
     * @param {*} value
     * @param {string} [fieldName='This field']
     * @returns {{ valid: boolean, message: string }}
     */
    required: function(value, fieldName) {
      fieldName = fieldName || 'This field';

      if (value === null || value === undefined) {
        return _result(false, fieldName + ' is required.');
      }

      if (typeof value === 'string' && value.trim().length === 0) {
        return _result(false, fieldName + ' is required.');
      }

      return _result(true);
    },

    /**
     * Check if a number is within a range.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @param {string} [fieldName='Value']
     * @returns {{ valid: boolean, message: string }}
     */
    inRange: function(value, min, max, fieldName) {
      fieldName = fieldName || 'Value';

      if (typeof value !== 'number') {
        return _result(false, fieldName + ' must be a number.');
      }

      if (value < min || value > max) {
        return _result(false, fieldName + ' must be between ' + min + ' and ' + max + '.');
      }

      return _result(true);
    },

    /**
     * Check if a string matches a regex pattern.
     * @param {string} value
     * @param {RegExp} pattern
     * @param {string} [message='Invalid format.']
     * @returns {{ valid: boolean, message: string }}
     */
    matchesPattern: function(value, pattern, message) {
      if (typeof value !== 'string') {
        return _result(false, message || 'Invalid format.');
      }

      if (!pattern.test(value)) {
        return _result(false, message || 'Invalid format.');
      }

      return _result(true);
    }
  };

})();

// Expose globally
window.Validators = Validators;
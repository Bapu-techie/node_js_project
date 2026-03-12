/* ============================================================
   QUESTION RESOLVER — Question Selection & Resolution Engine
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Resolves a TEST_CONFIG's `sections` array into a flat array
   of question objects, ready for the exam.

   Process:
   1. Iterate each section in the test config
   2. For each section.subject + section.topics[], pull from QUESTION_BANK
   3. Deduplicate by question ID
   4. Shuffle questions (randomize order)
   5. Cap at totalQuestions limit (if specified)
   6. Validate each resolved question

   For MOCK tests (AIIMS pattern):
   - Distributes questions per subject according to AIIMS weights
   - Physics: 15, Chemistry: 15, Biology: 30, GK: 10 = 70 total

   Dependencies: QUESTION_BANK, ExamConstants, Helpers
   Used by: ExamEngine.startExam()
   ============================================================ */

'use strict';

var QuestionResolver = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Shuffle an array using Fisher-Yates algorithm.
   * Returns a new shuffled array.
   * @param {Array} arr
   * @returns {Array}
   */
  function _shuffle(arr) {
    if (window.Helpers && typeof Helpers.shuffle === 'function') {
      return Helpers.shuffle(arr);
    }
    // Inline fallback
    var result = arr.slice();
    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  /**
   * Pull questions from QUESTION_BANK for a given subject and topic.
   * @param {string} subject - e.g. 'physics'
   * @param {string} topic - e.g. 'optics'
   * @returns {Array} Array of question objects, or empty array
   */
  function _pullQuestions(subject, topic) {
    if (!window.QUESTION_BANK) {
      console.error('[QuestionResolver] QUESTION_BANK not loaded.');
      return [];
    }

    var subjectBank = QUESTION_BANK[subject];
    if (!subjectBank) {
      console.warn('[QuestionResolver] Subject "' + subject + '" not found in QUESTION_BANK.');
      return [];
    }

    var topicQuestions = subjectBank[topic];
    if (!Array.isArray(topicQuestions)) {
      console.warn('[QuestionResolver] Topic "' + topic + '" not found in QUESTION_BANK.' + subject);
      return [];
    }

    return topicQuestions;
  }

  /**
   * Deduplicate questions by their `id` field.
   * @param {Array} questions
   * @returns {Array} Deduplicated array
   */
  function _deduplicate(questions) {
    var seen = {};
    var result = [];

    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var id = q.id || ('unknown_' + i);
      if (!seen[id]) {
        seen[id] = true;
        result.push(q);
      }
    }

    return result;
  }

  /**
   * Validate a question object has all required fields.
   * @param {Object} q
   * @returns {boolean}
   */
  function _isValidQuestion(q) {
    if (!q || typeof q !== 'object') return false;
    if (!q.id) return false;
    if (typeof q.question !== 'string' || q.question.length === 0) return false;
    if (!Array.isArray(q.options) || q.options.length < 2) return false;
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) return false;
    return true;
  }

  /**
   * Get AIIMS distribution: Physics 15, Chemistry 15, Biology 30, GK 10.
   * Returns the target question count per subject for mock tests.
   * @returns {Object}
   */
  function _getAIIMSDistribution() {
    if (window.ExamConstants && ExamConstants.AIIMS_PATTERN) {
      var subj = ExamConstants.AIIMS_PATTERN.subjects;
      var dist = {};
      for (var key in subj) {
        if (subj.hasOwnProperty(key)) {
          dist[key] = subj[key].questions;
        }
      }
      return dist;
    }
    // Fallback
    return {
      physics:   15,
      chemistry: 15,
      biology:   30,
      gk:        10
    };
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Resolve a test config into a flat, shuffled array of questions.
     *
     * @param {Object} testConfig - A TEST_CONFIG entry
     * @param {Object} [options] - Optional overrides
     * @param {boolean} [options.shuffle=true] - Whether to shuffle questions
     * @param {number}  [options.maxQuestions] - Override max question count
     * @returns {{ questions: Array, meta: Object }}
     *   questions: Flat array of validated question objects
     *   meta: { totalResolved, totalAvailable, subjectCounts, duplicatesRemoved }
     */
    resolve: function(testConfig, options) {
      options = options || {};
      var shouldShuffle = options.shuffle !== false; // default true
      var maxQuestions   = options.maxQuestions || testConfig.totalQuestions || null;

      if (!testConfig || !Array.isArray(testConfig.sections)) {
        console.error('[QuestionResolver] Invalid testConfig — missing sections array.');
        return { questions: [], meta: { error: 'Invalid config' } };
      }

      var isMock = testConfig.type === 'mock';
      var allQuestions = [];
      var subjectPools = {}; // { physics: [...], chemistry: [...], ... }
      var totalAvailable = 0;

      // ── Step 1: Pull questions from each section ──
      for (var s = 0; s < testConfig.sections.length; s++) {
        var section = testConfig.sections[s];
        var subject = section.subject;
        var topics  = section.topics;

        if (!subject || !Array.isArray(topics)) {
          console.warn('[QuestionResolver] Skipping invalid section at index ' + s);
          continue;
        }

        if (!subjectPools[subject]) {
          subjectPools[subject] = [];
        }

        for (var t = 0; t < topics.length; t++) {
          var pulled = _pullQuestions(subject, topics[t]);
          totalAvailable += pulled.length;

          for (var p = 0; p < pulled.length; p++) {
            subjectPools[subject].push(pulled[p]);
          }
        }
      }

      // ── Step 2: Handle MOCK tests with AIIMS distribution ──
      if (isMock && maxQuestions) {
        var dist = _getAIIMSDistribution();

        for (var subj in subjectPools) {
          if (subjectPools.hasOwnProperty(subj)) {
            var pool = _deduplicate(subjectPools[subj]);
            pool = _shuffle(pool);

            var target = dist[subj] || Math.ceil(maxQuestions / Object.keys(subjectPools).length);
            var selected = pool.slice(0, target);

            for (var q = 0; q < selected.length; q++) {
              allQuestions.push(selected[q]);
            }
          }
        }
      } else {
        // ── Non-mock: Combine all subject pools ──
        for (var key in subjectPools) {
          if (subjectPools.hasOwnProperty(key)) {
            for (var j = 0; j < subjectPools[key].length; j++) {
              allQuestions.push(subjectPools[key][j]);
            }
          }
        }
      }

      // ── Step 3: Deduplicate ──
      var beforeDedup = allQuestions.length;
      allQuestions = _deduplicate(allQuestions);
      var duplicatesRemoved = beforeDedup - allQuestions.length;

      // ── Step 4: Validate ──
      allQuestions = allQuestions.filter(function(q) {
        var valid = _isValidQuestion(q);
        if (!valid) {
          console.warn('[QuestionResolver] Skipping invalid question:', q.id || 'unknown');
        }
        return valid;
      });

      // ── Step 5: Shuffle ──
      if (shouldShuffle) {
        allQuestions = _shuffle(allQuestions);
      }

      // ── Step 6: Cap at max questions ──
      if (maxQuestions && allQuestions.length > maxQuestions) {
        allQuestions = allQuestions.slice(0, maxQuestions);
      }

      // ── Step 7: Build subject count metadata ──
      var subjectCounts = {};
      for (var i = 0; i < allQuestions.length; i++) {
        var qs = allQuestions[i].subject || 'unknown';
        subjectCounts[qs] = (subjectCounts[qs] || 0) + 1;
      }

      // ── Return ──
      return {
        questions: allQuestions,
        meta: {
          totalResolved:      allQuestions.length,
          totalAvailable:     totalAvailable,
          duplicatesRemoved:  duplicatesRemoved,
          subjectCounts:      subjectCounts,
          isMock:             isMock,
          testId:             testConfig.id,
          testType:           testConfig.type
        }
      };
    },

    /**
     * Get the total number of available questions for a test config
     * WITHOUT actually resolving them (fast count).
     *
     * @param {Object} testConfig
     * @returns {number}
     */
    countAvailable: function(testConfig) {
      if (!testConfig || !Array.isArray(testConfig.sections)) return 0;

      var total = 0;
      for (var s = 0; s < testConfig.sections.length; s++) {
        var section = testConfig.sections[s];
        if (!section.subject || !Array.isArray(section.topics)) continue;

        for (var t = 0; t < section.topics.length; t++) {
          var pulled = _pullQuestions(section.subject, section.topics[t]);
          total += pulled.length;
        }
      }

      return total;
    },

    /**
     * Get all unique subjects referenced by a test config.
     * @param {Object} testConfig
     * @returns {Array<string>}
     */
    getSubjects: function(testConfig) {
      if (!testConfig || !Array.isArray(testConfig.sections)) return [];

      var subjects = {};
      for (var i = 0; i < testConfig.sections.length; i++) {
        subjects[testConfig.sections[i].subject] = true;
      }

      return Object.keys(subjects);
    },

    /**
     * Get all unique topic keys referenced by a test config.
     * @param {Object} testConfig
     * @returns {Array<string>}
     */
    getTopics: function(testConfig) {
      if (!testConfig || !Array.isArray(testConfig.sections)) return [];

      var topics = [];
      for (var i = 0; i < testConfig.sections.length; i++) {
        var section = testConfig.sections[i];
        if (Array.isArray(section.topics)) {
          for (var j = 0; j < section.topics.length; j++) {
            if (topics.indexOf(section.topics[j]) === -1) {
              topics.push(section.topics[j]);
            }
          }
        }
      }

      return topics;
    },

    /**
     * Find a test config by ID from the global TEST_CONFIG array.
     * @param {string} testId
     * @returns {Object|null}
     */
    findTestConfig: function(testId) {
      if (!window.TEST_CONFIG || !Array.isArray(TEST_CONFIG)) return null;

      for (var i = 0; i < TEST_CONFIG.length; i++) {
        if (TEST_CONFIG[i].id === testId) return TEST_CONFIG[i];
      }

      return null;
    }
  };

})();

// Expose globally
window.QuestionResolver = QuestionResolver;
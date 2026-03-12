/* ============================================================
   SCORING ENGINE — AIIMS Exam Scoring Calculator
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   AIIMS Scoring Pattern:
   - Correct answer:    +1 mark
   - Wrong answer:      −1/3 mark (negative marking)
   - Unanswered:         0 marks

   Produces a comprehensive result object with:
   - Raw score (with negative marking)
   - Max possible score
   - Accuracy percentage
   - Subject-wise breakdown
   - Difficulty-wise breakdown
   - Per-question detailed analysis
   - Performance classification

   Dependencies: ExamConstants, Formatters
   Used by: ExamEngine.submitExam(), ResultRenderer, FormSubmitter
   ============================================================ */

'use strict';

var ScoringEngine = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Get scoring constants.
   */
  function _getConstants() {
    if (window.ExamConstants) {
      return {
        correct:       ExamConstants.SCORE_CORRECT,
        wrongFraction: ExamConstants.SCORE_WRONG_FRACTION,
        unanswered:    ExamConstants.SCORE_UNANSWERED
      };
    }
    return { correct: 1, wrongFraction: 1 / 3, unanswered: 0 };
  }

  /**
   * Determine question status.
   * @param {number|null} userAnswer
   * @param {number} correctAnswer
   * @returns {string} 'correct' | 'wrong' | 'skipped'
   */
  function _getStatus(userAnswer, correctAnswer) {
    if (userAnswer === null || userAnswer === undefined) return 'skipped';
    return userAnswer === correctAnswer ? 'correct' : 'wrong';
  }

  /**
   * Calculate marks for a single question.
   * @param {string} status
   * @param {boolean} negativeMarking
   * @returns {number}
   */
  function _getMarks(status, negativeMarking) {
    var c = _getConstants();

    if (status === 'correct')  return c.correct;
    if (status === 'wrong')    return negativeMarking ? -c.wrongFraction : 0;
    return c.unanswered;
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Calculate the complete result for an exam.
     *
     * @param {Object} examSnapshot - From ExamState.snapshot()
     *   Required: { questions, answers, testId, testTitle, testType,
     *               totalQuestions, negativeMarking, startTime, endTime,
     *               timeLimitSeconds, timeRemaining, submitMethod, totalHiddenTime }
     *
     * @returns {Object} Comprehensive result object
     */
    calculate: function(examSnapshot) {
      if (!examSnapshot || !Array.isArray(examSnapshot.questions)) {
        console.error('[ScoringEngine] Invalid exam snapshot.');
        return null;
      }

      var questions        = examSnapshot.questions;
      var answers          = examSnapshot.answers || [];
      var markedForReview  = examSnapshot.markedForReview || [];
      var negativeMarking  = examSnapshot.negativeMarking !== false;
      var total            = questions.length;

      // ── Accumulators ──
      var totalScore       = 0;
      var maxScore         = total * _getConstants().correct;
      var correctCount     = 0;
      var wrongCount       = 0;
      var skippedCount     = 0;
      var negativeMarks    = 0;

      // ── Per-question detailed analysis ──
      var questionDetails  = [];

      // ── Subject breakdown ──
      var subjectBreakdown = {};

      // ── Difficulty breakdown ──
      var diffBreakdown    = {
        easy:   { total: 0, correct: 0, wrong: 0, skipped: 0 },
        medium: { total: 0, correct: 0, wrong: 0, skipped: 0 },
        hard:   { total: 0, correct: 0, wrong: 0, skipped: 0 }
      };

      // ── Topic breakdown ──
      var topicBreakdown = {};

      // ── Process each question ──
      for (var i = 0; i < total; i++) {
        var q          = questions[i];
        var userAnswer = (i < answers.length) ? answers[i] : null;
        var status     = _getStatus(userAnswer, q.correctAnswer);
        var marks      = _getMarks(status, negativeMarking);

        // Accumulate totals
        totalScore += marks;

        if (status === 'correct') {
          correctCount++;
        } else if (status === 'wrong') {
          wrongCount++;
          negativeMarks += Math.abs(marks);
        } else {
          skippedCount++;
        }

        // ── Subject breakdown ──
        var subj = q.subject || 'unknown';
        if (!subjectBreakdown[subj]) {
          subjectBreakdown[subj] = {
            subject:  subj,
            label:    q.subjectName || subj,
            total:    0,
            correct:  0,
            wrong:    0,
            skipped:  0,
            score:    0,
            maxScore: 0,
            accuracy: 0
          };
        }
        var sb = subjectBreakdown[subj];
        sb.total++;
        sb.maxScore += _getConstants().correct;
        sb.score    += marks;
        if (status === 'correct')  sb.correct++;
        else if (status === 'wrong') sb.wrong++;
        else sb.skipped++;

        // ── Difficulty breakdown ──
        var diff = q.difficulty || 'medium';
        if (!diffBreakdown[diff]) {
          diffBreakdown[diff] = { total: 0, correct: 0, wrong: 0, skipped: 0 };
        }
        diffBreakdown[diff].total++;
        diffBreakdown[diff][status]++;

        // ── Topic breakdown ──
        var topic = q.topicKey || 'unknown';
        if (!topicBreakdown[topic]) {
          topicBreakdown[topic] = {
            topic:   topic,
            subject: subj,
            total:   0,
            correct: 0,
            wrong:   0,
            skipped: 0
          };
        }
        topicBreakdown[topic].total++;
        topicBreakdown[topic][status]++;

        // ── Per-question detail ──
        questionDetails.push({
          index:          i,
          questionId:     q.id,
          question:       q.question,
          options:        q.options,
          correctAnswer:  q.correctAnswer,
          userAnswer:     userAnswer,
          status:         status,
          marks:          marks,
          explanation:    q.explanation || '',
          difficulty:     diff,
          subject:        subj,
          subjectName:    q.subjectName || subj,
          topicKey:       topic,
          wasMarked:      !!markedForReview[i]
        });
      }

      // ── Calculate subject accuracies ──
      for (var sk in subjectBreakdown) {
        if (subjectBreakdown.hasOwnProperty(sk)) {
          var s = subjectBreakdown[sk];
          var attempted = s.correct + s.wrong;
          s.accuracy = attempted > 0 ? (s.correct / attempted) * 100 : 0;
        }
      }

      // ── Overall accuracy (of attempted questions) ──
      var totalAttempted = correctCount + wrongCount;
      var accuracy = totalAttempted > 0
        ? (correctCount / totalAttempted) * 100
        : 0;

      // ── Score as percentage of max ──
      var scorePercent = maxScore > 0
        ? (totalScore / maxScore) * 100
        : 0;

      // ── Time calculations ──
      var timeTaken = 0;
      if (examSnapshot.startTime && examSnapshot.endTime) {
        timeTaken = Math.floor((examSnapshot.endTime - examSnapshot.startTime) / 1000);
      }

      var avgTimePerQuestion = total > 0 ? Math.floor(timeTaken / total) : 0;

      // ── Performance level ──
      var perfLevel = null;
      if (window.ExamConstants && typeof ExamConstants.getPerformanceLevel === 'function') {
        perfLevel = ExamConstants.getPerformanceLevel(accuracy);
      }

      var scoreClass = '';
      if (window.ExamConstants && typeof ExamConstants.getScoreClass === 'function') {
        scoreClass = ExamConstants.getScoreClass(scorePercent);
      }


      // ══════════════════════════════════════════════════════
      // RETURN COMPREHENSIVE RESULT
      // ══════════════════════════════════════════════════════
      return {
        // ── Identity ──
        testId:           examSnapshot.testId,
        testTitle:        examSnapshot.testTitle,
        testType:         examSnapshot.testType,
        date:             new Date().toISOString(),

        // ── Score ──
        score:            parseFloat(totalScore.toFixed(2)),
        maxScore:         maxScore,
        scorePercent:     parseFloat(scorePercent.toFixed(1)),
        scoreClass:       scoreClass,

        // ── Counts ──
        totalQuestions:   total,
        correctCount:     correctCount,
        wrongCount:       wrongCount,
        skippedCount:     skippedCount,
        attemptedCount:   totalAttempted,
        negativeMarks:    parseFloat(negativeMarks.toFixed(2)),

        // ── Percentages ──
        accuracy:         parseFloat(accuracy.toFixed(1)),
        attemptRate:      parseFloat(((totalAttempted / total) * 100).toFixed(1)),

        // ── Performance ──
        performanceLevel: perfLevel,

        // ── Time ──
        timeTaken:           timeTaken,
        timeLimitSeconds:    examSnapshot.timeLimitSeconds || 0,
        timeRemaining:       examSnapshot.timeRemaining || 0,
        avgTimePerQuestion:  avgTimePerQuestion,
        totalHiddenTime:     examSnapshot.totalHiddenTime || 0,
        submitMethod:        examSnapshot.submitMethod || 'manual',

        // ── Breakdowns ──
        subjectBreakdown:    subjectBreakdown,
        difficultyBreakdown: diffBreakdown,
        topicBreakdown:      topicBreakdown,

        // ── Per-question details (for review) ──
        questionDetails:     questionDetails,

        // ── Settings ──
        negativeMarking:     negativeMarking
      };
    },

    /**
     * Build a compact attempt summary for storage.
     * Strips detailed question data to save space.
     *
     * @param {Object} fullResult - From calculate()
     * @returns {Object} Compact attempt object
     */
    toAttemptSummary: function(fullResult) {
      if (!fullResult) return null;

      return {
        testId:          fullResult.testId,
        testTitle:       fullResult.testTitle,
        testType:        fullResult.testType,
        date:            fullResult.date,
        score:           fullResult.score,
        maxScore:        fullResult.maxScore,
        scorePercent:    fullResult.scorePercent,
        totalQuestions:  fullResult.totalQuestions,
        correctCount:    fullResult.correctCount,
        wrongCount:      fullResult.wrongCount,
        skippedCount:    fullResult.skippedCount,
        accuracy:        fullResult.accuracy,
        attemptRate:     fullResult.attemptRate,
        negativeMarks:   fullResult.negativeMarks,
        timeTaken:       fullResult.timeTaken,
        submitMethod:    fullResult.submitMethod,
        subjectBreakdown: fullResult.subjectBreakdown
      };
    },

    /**
     * Build a payload for Formspree submission.
     * Includes score summary + student info.
     *
     * @param {Object} fullResult - From calculate()
     * @param {Object} student - { name, email }
     * @returns {Object} Formspree payload
     */
    toFormPayload: function(fullResult, student) {
      if (!fullResult || !student) return null;

      var fmt = window.Formatters;
      var timeTakenStr = fmt ? fmt.toHumanTime(fullResult.timeTaken) : fullResult.timeTaken + 's';
      var scoreStr     = fmt ? fmt.formatScore(fullResult.score) : String(fullResult.score);

      // Build subject lines
      var subjectLines = [];
      for (var subj in fullResult.subjectBreakdown) {
        if (fullResult.subjectBreakdown.hasOwnProperty(subj)) {
          var sb = fullResult.subjectBreakdown[subj];
          subjectLines.push(
            sb.label + ': ' + sb.correct + '/' + sb.total +
            ' (' + sb.accuracy.toFixed(0) + '%)'
          );
        }
      }

      return {
        _subject:     '[NursePrep Pro] ' + fullResult.testTitle + ' — ' + student.name,
        studentName:  student.name,
        studentEmail: student.email,
        testId:       fullResult.testId,
        testTitle:    fullResult.testTitle,
        testType:     fullResult.testType,
        score:        scoreStr,
        maxScore:     fullResult.maxScore,
        scorePercent: fullResult.scorePercent + '%',
        accuracy:     fullResult.accuracy + '%',
        correct:      fullResult.correctCount,
        wrong:        fullResult.wrongCount,
        skipped:      fullResult.skippedCount,
        negMarks:     fullResult.negativeMarks,
        timeTaken:    timeTakenStr,
        submitMethod: fullResult.submitMethod,
        subjects:     subjectLines.join(' | '),
        date:         fullResult.date,
        appVersion:   (window.UIConstants && UIConstants.APP_VERSION) || '3.0.0'
      };
    }
  };

})();

// Expose globally
window.ScoringEngine = ScoringEngine;
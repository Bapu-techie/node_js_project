/* ============================================================
   RESULT RENDERER — Post-Exam Results Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders the comprehensive result view after exam submission:
   - Score hero card (score, max, percentage, performance level)
   - Stats grid (correct, wrong, skipped, neg marks, time, accuracy)
   - Subject-wise breakdown bars
   - Difficulty-wise breakdown
   - Full question review (expandable — correct answer + explanation)
   - Action buttons (Dashboard, Retake, Share)

   HTML targets (inside #view-result):
   - #result-hero          → Score hero card container
   - #result-stats         → Stats grid container
   - #result-subjects      → Subject breakdown container
   - #result-difficulty    → Difficulty breakdown container
   - #result-questions     → Question review accordion container
   - #result-actions       → Action buttons container

   Dependencies: ExamConstants, UIConstants, Formatters, Helpers,
                 ExamEngine, Nav, DashboardRenderer
   Used by: ExamEngine.submitExam()
   ============================================================ */

'use strict';

var ResultRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _currentResult = null;
  var _bound         = false;


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  function _el(id) {
    return document.getElementById(id);
  }

  function _esc(str) {
    if (window.Helpers && typeof Helpers.escapeHtml === 'function') {
      return Helpers.escapeHtml(str);
    }
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ─────────────────────────────────────────────────────────
     HERO CARD
     ───────────────────────────────────────────────────────── */

  function _renderHero(result) {
    var container = _el('result-hero');
    if (!container) return;

    var perf = result.performanceLevel || {};
    var perfLabel = perf.label || '';
    var perfClass = perf.class || '';
    var scoreClass = result.scoreClass || '';

    var fmt = window.Formatters;
    var scoreStr = fmt ? fmt.formatScore(result.score) : String(result.score);
    var timeStr  = fmt ? fmt.toHumanTime(result.timeTaken) : result.timeTaken + 's';

    var EC = window.ExamConstants;
    var typeInfo = { label: result.testType, icon: '📝', badge: 'badge-teal' };
    if (EC && typeof EC.getTestTypeInfo === 'function') {
      typeInfo = EC.getTestTypeInfo(result.testType);
    }

    container.innerHTML =
      '<div class="result-hero-inner ' + _esc(perfClass) + '">' +
        '<span class="result-type-badge ' + _esc(typeInfo.badge) + '">' +
          typeInfo.icon + ' ' + _esc(typeInfo.label) +
        '</span>' +
        '<h2 class="result-title">' + _esc(result.testTitle) + '</h2>' +
        '<div class="result-score-ring">' +
          '<span class="score-big ' + _esc(scoreClass) + '">' + _esc(scoreStr) + '</span>' +
          '<span class="score-divider">/</span>' +
          '<span class="score-max">' + result.maxScore + '</span>' +
        '</div>' +
        '<div class="result-pct">' + result.scorePercent.toFixed(1) + '%</div>' +
        '<p class="result-perf-label">' + _esc(perfLabel) + '</p>' +
        '<div class="result-hero-meta">' +
          '<span>⏱️ ' + _esc(timeStr) + '</span>' +
          '<span>📊 ' + result.accuracy.toFixed(1) + '% accuracy</span>' +
          '<span>' + (result.submitMethod === 'auto' ? '⏰ Auto-submitted' : '✅ Manual') + '</span>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     STATS GRID
     ───────────────────────────────────────────────────────── */

  function _renderStats(result) {
    var container = _el('result-stats');
    if (!container) return;

    var fmt = window.Formatters;

    var items = [
      { icon: '✅', label: 'Correct',      value: result.correctCount,  color: 'stat-green' },
      { icon: '❌', label: 'Wrong',         value: result.wrongCount,    color: 'stat-rose' },
      { icon: '⏭️', label: 'Skipped',       value: result.skippedCount,  color: 'stat-gray' },
      { icon: '➖', label: 'Neg. Marks',    value: result.negativeMarks ? '-' + result.negativeMarks.toFixed(2) : '0', color: 'stat-amber' },
      { icon: '📝', label: 'Attempted',     value: result.attemptedCount + '/' + result.totalQuestions, color: 'stat-blue' },
      { icon: '🎯', label: 'Attempt Rate',  value: result.attemptRate.toFixed(0) + '%', color: 'stat-purple' }
    ];

    var html = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      html += '<div class="result-stat-card ' + item.color + '">' +
        '<span class="rstat-icon">' + item.icon + '</span>' +
        '<span class="rstat-val">' + _esc(String(item.value)) + '</span>' +
        '<span class="rstat-label">' + _esc(item.label) + '</span>' +
      '</div>';
    }

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     SUBJECT BREAKDOWN
     ───────────────────────────────────────────────────────── */

  function _renderSubjects(result) {
    var container = _el('result-subjects');
    if (!container) return;

    var breakdown = result.subjectBreakdown;
    if (!breakdown || Object.keys(breakdown).length === 0) {
      container.innerHTML = '<p class="empty-text">No subject data available.</p>';
      return;
    }

    var EC = window.ExamConstants;
    var html = '<h3 class="result-section-title">📊 Subject-wise Performance</h3>';

    for (var subj in breakdown) {
      if (!breakdown.hasOwnProperty(subj)) continue;

      var sb = breakdown[subj];
      var subjLabel = sb.label || subj;
      var subjIcon  = '';
      if (EC && typeof EC.getSubjectInfo === 'function') {
        var si = EC.getSubjectInfo(subj);
        subjLabel = si.label;
        subjIcon  = si.icon + ' ';
      }

      var accPct = sb.accuracy.toFixed(0);
      var barClass = '';
      if (EC && typeof EC.getScoreClass === 'function') {
        barClass = EC.getScoreClass(sb.accuracy);
      }

      html += '<div class="subj-row">' +
        '<div class="subj-header">' +
          '<span class="subj-name">' + subjIcon + _esc(subjLabel) + '</span>' +
          '<span class="subj-detail">' +
            sb.correct + '/' + sb.total + ' correct · ' + accPct + '%' +
          '</span>' +
        '</div>' +
        '<div class="subj-bar-bg">' +
          '<div class="subj-bar-fill ' + barClass + '" style="width:' + accPct + '%"></div>' +
        '</div>' +
      '</div>';
    }

    container.innerHTML = html;
  }

  /* ───────���─────────────────────────────────────────────────
     DIFFICULTY BREAKDOWN
     ───────────────────────────────────────────────────────── */

  function _renderDifficulty(result) {
    var container = _el('result-difficulty');
    if (!container) return;

    var diff = result.difficultyBreakdown;
    if (!diff) {
      container.innerHTML = '';
      return;
    }

    var EC = window.ExamConstants;
    var levels = ['easy', 'medium', 'hard'];
    var html = '<h3 class="result-section-title">📈 Difficulty Analysis</h3>' +
               '<div class="diff-grid">';

    for (var i = 0; i < levels.length; i++) {
      var key = levels[i];
      var d   = diff[key];
      if (!d || d.total === 0) continue;

      var diffInfo = { label: key, cssClass: '' };
      if (EC && typeof EC.getDifficultyInfo === 'function') {
        diffInfo = EC.getDifficultyInfo(key);
      }

      var acc = (d.correct + d.wrong) > 0
        ? ((d.correct / (d.correct + d.wrong)) * 100).toFixed(0)
        : '0';

      html += '<div class="diff-card">' +
        '<span class="diff-badge ' + _esc(diffInfo.cssClass) + '">' + _esc(diffInfo.label) + '</span>' +
        '<div class="diff-stats">' +
          '<span class="diff-fraction">' + d.correct + '/' + d.total + '</span>' +
          '<span class="diff-acc">' + acc + '% accuracy</span>' +
        '</div>' +
        '<div class="diff-breakdown">' +
          '<span class="dbs correct">✅ ' + d.correct + '</span>' +
          '<span class="dbs wrong">❌ ' + d.wrong + '</span>' +
          '<span class="dbs skipped">⏭️ ' + d.skipped + '</span>' +
        '</div>' +
      '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     QUESTION REVIEW (Expandable Accordion)
     ───────────────────────────────────────────────────────── */

  function _renderQuestionReview(result) {
    var container = _el('result-questions');
    if (!container) return;

    var details = result.questionDetails;
    if (!Array.isArray(details) || details.length === 0) {
      container.innerHTML = '<p class="empty-text">No question details available.</p>';
      return;
    }

    var EC     = window.ExamConstants;
    var labels = (EC && EC.OPTION_LABELS) || ['A', 'B', 'C', 'D'];

    var html = '<h3 class="result-section-title">📝 Question Review</h3>' +
               '<div class="review-filter-bar">' +
                 '<button class="review-filter active" data-rfilter="all">All (' + details.length + ')</button>' +
                 '<button class="review-filter" data-rfilter="correct">✅ Correct</button>' +
                 '<button class="review-filter" data-rfilter="wrong">❌ Wrong</button>' +
                 '<button class="review-filter" data-rfilter="skipped">⏭️ Skipped</button>' +
               '</div>';

    for (var i = 0; i < details.length; i++) {
      var q = details[i];
      var num = i + 1;

      var statusIcon = '⏭️';
      var statusClass = 'skipped';
      if (q.status === 'correct') { statusIcon = '✅'; statusClass = 'correct'; }
      else if (q.status === 'wrong') { statusIcon = '❌'; statusClass = 'wrong'; }

      // Build options HTML
      var optionsHtml = '';
      for (var o = 0; o < q.options.length; o++) {
        var optClass = '';
        var optSuffix = '';

        if (o === q.correctAnswer) {
          optClass = 'opt-correct';
          optSuffix = ' ✓';
        }

        if (q.userAnswer === o && o !== q.correctAnswer) {
          optClass = 'opt-wrong';
          optSuffix = ' ✗';
        }

        if (q.userAnswer === o && o === q.correctAnswer) {
          optClass = 'opt-correct';
          optSuffix = ' ✓ (your answer)';
        } else if (q.userAnswer === o) {
          optSuffix += ' (your answer)';
        }

        var optLabel = labels[o] || String.fromCharCode(65 + o);

        optionsHtml += '<div class="rev-opt ' + optClass + '">' +
          '<span class="rev-opt-label">' + _esc(optLabel) + '</span>' +
          '<span class="rev-opt-text">' + _esc(q.options[o]) + _esc(optSuffix) + '</span>' +
        '</div>';
      }

      // Difficulty badge
      var diffHtml = '';
      if (EC && typeof EC.getDifficultyInfo === 'function') {
        var di = EC.getDifficultyInfo(q.difficulty);
        diffHtml = '<span class="q-diff-badge ' + _esc(di.cssClass) + '">' + _esc(di.label) + '</span>';
      }

      // Marks
      var marksStr = q.marks > 0 ? '+' + q.marks.toFixed(2) : q.marks.toFixed(2);

      html += '<details class="rev-item ' + statusClass + '" data-status="' + q.status + '">' +
        '<summary class="rev-summary">' +
          '<span class="rev-num">' + num + '</span>' +
          '<span class="rev-status-icon">' + statusIcon + '</span>' +
          '<span class="rev-q-text">' + _esc(q.question.substring(0, 80)) + (q.question.length > 80 ? '…' : '') + '</span>' +
          '<span class="rev-marks">' + _esc(marksStr) + '</span>' +
        '</summary>' +
        '<div class="rev-body">' +
          '<div class="rev-meta">' +
            '<span class="rev-subject">' + _esc(q.subjectName) + '</span>' +
            diffHtml +
            (q.wasMarked ? '<span class="rev-marked">🔖 Was marked</span>' : '') +
          '</div>' +
          '<p class="rev-full-q">' + _esc(q.question) + '</p>' +
          '<div class="rev-options">' + optionsHtml + '</div>' +
          (q.explanation
            ? '<div class="rev-explanation">' +
                '<strong>💡 Explanation:</strong>' +
                '<p>' + _esc(q.explanation) + '</p>' +
              '</div>'
            : '') +
        '</div>' +
      '</details>';
    }

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     ACTION BUTTONS
     ───────────────────────────────────────────────────────── */

  function _renderActions(result) {
    var container = _el('result-actions');
    if (!container) return;

    container.innerHTML =
      '<button class="btn-primary" id="result-dashboard-btn">📊 Dashboard</button>' +
      '<button class="btn-secondary" id="result-retake-btn">🔄 Retake Test</button>' +
      '<button class="btn-secondary" id="result-analytics-btn">📈 Analytics</button>';
  }

  /* ─────────────────────────────────────────────────────────
     EVENT HANDLERS
     ───────────────────────────────────────────────────────── */

  function _bindEvents() {
    if (_bound) return;
    _bound = true;

    // Dashboard button
    document.addEventListener('click', function(e) {
      // Dashboard
      if (e.target.id === 'result-dashboard-btn' || e.target.closest('#result-dashboard-btn')) {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        return;
      }

      // Retake
      if (e.target.id === 'result-retake-btn' || e.target.closest('#result-retake-btn')) {
        if (_currentResult && window.ExamEngine) {
          ExamEngine.startExam(_currentResult.testId);
        }
        return;
      }

      // Analytics
      if (e.target.id === 'result-analytics-btn' || e.target.closest('#result-analytics-btn')) {
        if (window.Nav) Nav.goTo('view-analytics');
        if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        return;
      }

      // Review filter buttons
      var filterBtn = e.target.closest('.review-filter');
      if (filterBtn) {
        var filter = filterBtn.getAttribute('data-rfilter');
        _applyReviewFilter(filter);

        // Update active state
        var allFilters = document.querySelectorAll('.review-filter');
        for (var i = 0; i < allFilters.length; i++) {
          allFilters[i].classList.toggle('active', allFilters[i] === filterBtn);
        }
      }
    });
  }

  /**
   * Filter question review items by status.
   * @param {string} filter - 'all' | 'correct' | 'wrong' | 'skipped'
   */
  function _applyReviewFilter(filter) {
    var items = document.querySelectorAll('.rev-item');
    for (var i = 0; i < items.length; i++) {
      var status = items[i].getAttribute('data-status');
      if (filter === 'all' || status === filter) {
        items[i].style.display = '';
      } else {
        items[i].style.display = 'none';
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Render the complete result view.
     * @param {Object} result - From ScoringEngine.calculate()
     */
    renderResult: function(result) {
      if (!result) {
        console.error('[ResultRenderer] No result to render.');
        return;
      }

      _currentResult = result;

      _renderHero(result);
      _renderStats(result);
      _renderSubjects(result);
      _renderDifficulty(result);
      _renderQuestionReview(result);
      _renderActions(result);

      _bindEvents();
    },

    /**
     * Get the currently displayed result.
     * @returns {Object|null}
     */
    getCurrentResult: function() {
      return _currentResult;
    }
  };

})();

// Expose globally
window.ResultRenderer = ResultRenderer;
/* ============================================================
   ANALYTICS RENDERER — Performance Analytics Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders the analytics view with aggregated performance data:
   - Overall stats hero (total attempts, avg accuracy, best, time)
   - Accuracy trend line (last 10 attempts as a text-based chart)
   - Subject-wise accuracy comparison bars
   - Test type performance breakdown
   - Strengths & weaknesses analysis
   - Study recommendations

   All data sourced from AppState.getAttempts() — no external API.

   HTML targets (inside #view-analytics):
   - #analytics-hero        → Overall stats summary
   - #analytics-trend       → Accuracy trend section
   - #analytics-subjects    → Subject comparison bars
   - #analytics-types       → Test type breakdown
   - #analytics-strengths   → Strengths & weaknesses section
   - #analytics-actions     → Action buttons

   Dependencies: AppState, ExamConstants, Formatters, Helpers, Nav
   Used by: App, DashboardRenderer, ResultRenderer
   ============================================================ */

'use strict';

var AnalyticsRenderer = (function() {

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
     HERO STATS
     ───────────────────────────────────────────────────────── */

  function _renderHero() {
    var container = _el('analytics-hero');
    if (!container) return;

    var stats = { totalAttempts: 0, avgScore: 0, avgAccuracy: 0, bestScore: 0, totalTimeSec: 0, testsCompleted: 0 };
    if (window.AppState && typeof AppState.getOverallStats === 'function') {
      stats = AppState.getOverallStats();
    }

    if (stats.totalAttempts === 0) {
      container.innerHTML =
        '<div class="analytics-empty-hero">' +
          '<p class="empty-icon">📊</p>' +
          '<h3>No Analytics Yet</h3>' +
          '<p>Complete your first test to see performance insights!</p>' +
        '</div>';
      return;
    }

    var fmt = window.Formatters;
    var avgAccStr = stats.avgAccuracy.toFixed(1) + '%';
    var bestStr   = fmt ? fmt.formatScore(stats.bestScore) : String(stats.bestScore);
    var timeStr   = fmt ? fmt.toHumanTime(stats.totalTimeSec) : Math.floor(stats.totalTimeSec / 60) + ' min';

    container.innerHTML =
      '<div class="a-hero-grid">' +
        '<div class="a-hero-card">' +
          '<span class="a-hero-icon">📝</span>' +
          '<span class="a-hero-val">' + stats.totalAttempts + '</span>' +
          '<span class="a-hero-label">Total Attempts</span>' +
        '</div>' +
        '<div class="a-hero-card">' +
          '<span class="a-hero-icon">🎯</span>' +
          '<span class="a-hero-val">' + _esc(avgAccStr) + '</span>' +
          '<span class="a-hero-label">Avg Accuracy</span>' +
        '</div>' +
        '<div class="a-hero-card">' +
          '<span class="a-hero-icon">🏆</span>' +
          '<span class="a-hero-val">' + _esc(bestStr) + '</span>' +
          '<span class="a-hero-label">Best Score</span>' +
        '</div>' +
        '<div class="a-hero-card">' +
          '<span class="a-hero-icon">⏱️</span>' +
          '<span class="a-hero-val">' + _esc(timeStr) + '</span>' +
          '<span class="a-hero-label">Total Study Time</span>' +
        '</div>' +
        '<div class="a-hero-card">' +
          '<span class="a-hero-icon">📚</span>' +
          '<span class="a-hero-val">' + stats.testsCompleted + '</span>' +
          '<span class="a-hero-label">Unique Tests</span>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     ACCURACY TREND (last 10 attempts — text-based bar chart)
     ───────────────────────────────────────────────────────── */

  function _renderTrend() {
    var container = _el('analytics-trend');
    if (!container) return;

    var attempts = [];
    if (window.AppState && typeof AppState.getRecentAttempts === 'function') {
      attempts = AppState.getRecentAttempts(10);
    }

    if (attempts.length < 2) {
      container.innerHTML =
        '<h3 class="a-section-title">📈 Accuracy Trend</h3>' +
        '<p class="empty-text">Need at least 2 attempts to show trends.</p>';
      return;
    }

    // Reverse to show oldest→newest (left→right)
    var reversed = attempts.slice().reverse();

    var EC = window.ExamConstants;
    var html = '<h3 class="a-section-title">📈 Accuracy Trend (Last ' + reversed.length + ' Attempts)</h3>' +
               '<div class="trend-chart">';

    for (var i = 0; i < reversed.length; i++) {
      var a = reversed[i];
      var acc = (a.accuracy || 0).toFixed(0);
      var barHeight = Math.max(5, Math.min(100, a.accuracy || 0));

      var barClass = '';
      if (EC && typeof EC.getScoreClass === 'function') {
        barClass = EC.getScoreClass(a.accuracy || 0);
      }

      var fmt = window.Formatters;
      var dateLabel = '';
      if (fmt && typeof fmt.toShortDate === 'function') {
        dateLabel = fmt.toShortDate(a.date);
      } else {
        dateLabel = '#' + (i + 1);
      }

      html += '<div class="trend-bar-col" title="' + _esc(a.testTitle || '') + ': ' + acc + '%">' +
        '<span class="trend-val">' + acc + '%</span>' +
        '<div class="trend-bar ' + barClass + '" style="height:' + barHeight + '%"></div>' +
        '<span class="trend-label">' + _esc(dateLabel) + '</span>' +
      '</div>';
    }

    html += '</div>';

    // Trend direction
    var first = reversed[0].accuracy || 0;
    var last  = reversed[reversed.length - 1].accuracy || 0;
    var diff  = last - first;
    var trendIcon = diff > 0 ? '📈' : (diff < 0 ? '📉' : '➡️');
    var trendText = diff > 0
      ? 'Improving! +' + diff.toFixed(1) + '% since first attempt.'
      : (diff < 0
          ? 'Declining. ' + diff.toFixed(1) + '% since first attempt.'
          : 'Steady performance.');

    html += '<p class="trend-summary">' + trendIcon + ' ' + _esc(trendText) + '</p>';

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     SUBJECT-WISE COMPARISON
     ───────────────────────────────────────────────────────── */

  function _renderSubjects() {
    var container = _el('analytics-subjects');
    if (!container) return;

    var subjStats = {};
    if (window.AppState && typeof AppState.getSubjectStats === 'function') {
      subjStats = AppState.getSubjectStats();
    }

    var subjects = Object.keys(subjStats);
    if (subjects.length === 0) {
      container.innerHTML =
        '<h3 class="a-section-title">📚 Subject Performance</h3>' +
        '<p class="empty-text">No subject data available yet.</p>';
      return;
    }

    var EC = window.ExamConstants;
    var html = '<h3 class="a-section-title">📚 Subject Performance</h3>';

    // Sort by accuracy descending
    subjects.sort(function(a, b) {
      return (subjStats[b].accuracy || 0) - (subjStats[a].accuracy || 0);
    });

    for (var i = 0; i < subjects.length; i++) {
      var key = subjects[i];
      var s   = subjStats[key];

      var subjLabel = key;
      var subjIcon  = '';
      if (EC && typeof EC.getSubjectInfo === 'function') {
        var si = EC.getSubjectInfo(key);
        subjLabel = si.label;
        subjIcon  = si.icon + ' ';
      }

      var accPct = s.accuracy.toFixed(0);
      var barClass = '';
      if (EC && typeof EC.getScoreClass === 'function') {
        barClass = EC.getScoreClass(s.accuracy);
      }

      html += '<div class="subj-row">' +
        '<div class="subj-header">' +
          '<span class="subj-name">' + subjIcon + _esc(subjLabel) + '</span>' +
          '<span class="subj-detail">' +
            s.correct + '/' + s.total + ' correct · ' + accPct + '%' +
          '</span>' +
        '</div>' +
        '<div class="subj-bar-bg">' +
          '<div class="subj-bar-fill ' + barClass + '" style="width:' + accPct + '%"></div>' +
        '</div>' +
      '</div>';
    }

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     TEST TYPE BREAKDOWN
     ───────────────────────────────────────────────────────── */

  function _renderTestTypes() {
    var container = _el('analytics-types');
    if (!container) return;

    var attempts = [];
    if (window.AppState && typeof AppState.getAttempts === 'function') {
      attempts = AppState.getAttempts();
    }

    if (attempts.length === 0) {
      container.innerHTML = '';
      return;
    }

    // Aggregate by test type
    var typeStats = {};
    for (var i = 0; i < attempts.length; i++) {
      var a = attempts[i];
      var t = a.testType || 'unknown';

      if (!typeStats[t]) {
        typeStats[t] = { count: 0, totalAcc: 0, bestAcc: 0 };
      }
      typeStats[t].count++;
      typeStats[t].totalAcc += (a.accuracy || 0);
      if ((a.accuracy || 0) > typeStats[t].bestAcc) {
        typeStats[t].bestAcc = a.accuracy || 0;
      }
    }

    var EC = window.ExamConstants;
    var html = '<h3 class="a-section-title">🏷️ Performance by Test Type</h3>' +
               '<div class="type-grid">';

    for (var type in typeStats) {
      if (!typeStats.hasOwnProperty(type)) continue;

      var ts = typeStats[type];
      var avgAcc = (ts.totalAcc / ts.count).toFixed(0);

      var typeInfo = { label: type, icon: '📝', badge: 'badge-teal' };
      if (EC && typeof EC.getTestTypeInfo === 'function') {
        typeInfo = EC.getTestTypeInfo(type);
      }

      html += '<div class="type-card">' +
        '<span class="type-badge ' + _esc(typeInfo.badge) + '">' +
          typeInfo.icon + ' ' + _esc(typeInfo.label) +
        '</span>' +
        '<div class="type-stats">' +
          '<div>' + ts.count + ' attempt' + (ts.count > 1 ? 's' : '') + '</div>' +
          '<div>Avg: ' + avgAcc + '%</div>' +
          '<div>Best: ' + ts.bestAcc.toFixed(0) + '%</div>' +
        '</div>' +
      '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     STRENGTHS & WEAKNESSES
     ───────────────────────────────────────────────────────── */

  function _renderStrengths() {
    var container = _el('analytics-strengths');
    if (!container) return;

    var subjStats = {};
    if (window.AppState && typeof AppState.getSubjectStats === 'function') {
      subjStats = AppState.getSubjectStats();
    }

    var subjects = Object.keys(subjStats);
    if (subjects.length < 2) {
      container.innerHTML = '';
      return;
    }

    // Sort by accuracy
    subjects.sort(function(a, b) {
      return (subjStats[b].accuracy || 0) - (subjStats[a].accuracy || 0);
    });

    var EC = window.ExamConstants;

    // Strengths (top 2 with accuracy >= 60%)
    var strengths = [];
    for (var i = 0; i < subjects.length && strengths.length < 2; i++) {
      if (subjStats[subjects[i]].accuracy >= 60) {
        strengths.push(subjects[i]);
      }
    }

    // Weaknesses (bottom 2 with accuracy < 60%)
    var weaknesses = [];
    for (var j = subjects.length - 1; j >= 0 && weaknesses.length < 2; j--) {
      if (subjStats[subjects[j]].accuracy < 60) {
        weaknesses.push(subjects[j]);
      }
    }

    var html = '<h3 class="a-section-title">💡 Strengths & Weaknesses</h3>' +
               '<div class="sw-grid">';

    // Strengths column
    html += '<div class="sw-col sw-strengths">' +
            '<h4 class="sw-heading">💪 Strengths</h4>';

    if (strengths.length === 0) {
      html += '<p class="sw-empty">Keep practicing to build strengths!</p>';
    } else {
      for (var s = 0; s < strengths.length; s++) {
        var sKey = strengths[s];
        var sLabel = sKey;
        if (EC && typeof EC.getSubjectInfo === 'function') {
          sLabel = EC.getSubjectInfo(sKey).icon + ' ' + EC.getSubjectInfo(sKey).label;
        }
        html += '<div class="sw-item sw-strong">' +
          '<span>' + _esc(sLabel) + '</span>' +
          '<span class="sw-acc">' + subjStats[sKey].accuracy.toFixed(0) + '%</span>' +
        '</div>';
      }
    }
    html += '</div>';

    // Weaknesses column
    html += '<div class="sw-col sw-weaknesses">' +
            '<h4 class="sw-heading">📈 Needs Improvement</h4>';

    if (weaknesses.length === 0) {
      html += '<p class="sw-empty">Great — no weak areas detected!</p>';
    } else {
      for (var w = 0; w < weaknesses.length; w++) {
        var wKey = weaknesses[w];
        var wLabel = wKey;
        if (EC && typeof EC.getSubjectInfo === 'function') {
          wLabel = EC.getSubjectInfo(wKey).icon + ' ' + EC.getSubjectInfo(wKey).label;
        }
        html += '<div class="sw-item sw-weak">' +
          '<span>' + _esc(wLabel) + '</span>' +
          '<span class="sw-acc">' + subjStats[wKey].accuracy.toFixed(0) + '%</span>' +
        '</div>';
      }
    }
    html += '</div></div>';

    // Study tip
    if (weaknesses.length > 0) {
      var weakLabel = weaknesses[0];
      if (EC && typeof EC.getSubjectInfo === 'function') {
        weakLabel = EC.getSubjectInfo(weaknesses[0]).label;
      }
      html += '<div class="study-tip">' +
        '<strong>💡 Study Tip:</strong> Focus on <strong>' + _esc(weakLabel) + '</strong> — ' +
        'try the topic-wise tests to improve specific chapters.' +
      '</div>';
    }

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     ACTION BUTTONS
     ───────────────────────────────────────────────────────── */

  function _renderActions() {
    var container = _el('analytics-actions');
    if (!container) return;

    container.innerHTML =
      '<button class="btn-primary" id="analytics-dash-btn">📊 Dashboard</button>' +
      '<button class="btn-secondary" id="analytics-profile-btn">👤 Profile</button>';

    var dashBtn = _el('analytics-dash-btn');
    if (dashBtn) {
      dashBtn.addEventListener('click', function() {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
      });
    }

    var profBtn = _el('analytics-profile-btn');
    if (profBtn) {
      profBtn.addEventListener('click', function() {
        if (window.Nav) Nav.goTo('view-profile');
        if (window.ProfileRenderer) ProfileRenderer.render();
      });
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Render the complete analytics view.
     */
    render: function() {
      _renderHero();
      _renderTrend();
      _renderSubjects();
      _renderTestTypes();
      _renderStrengths();
      _renderActions();
    }
  };

})();

// Expose globally
window.AnalyticsRenderer = AnalyticsRenderer;
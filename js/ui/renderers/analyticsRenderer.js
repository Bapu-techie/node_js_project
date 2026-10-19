/* ============================================================
   ANALYTICS RENDERER — Performance Analytics Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders the analytics view with aggregated performance data:
   - Official Top Navbar (AIIMS branding, Candidate Profile Chip)
   - Overall stats hero (Readiness status + 5 ambient KPI cards)
   - Accuracy trend line with 75% AIIMS cutoff benchmark
   - Subject-wise sectional accuracy comparison bars
   - Test category performance breakdown
   - Strategic strengths & weaknesses diagnostic
   - NCERT High-yield study recommendations
   - Bottom Action Dock

   All data sourced from AppState.getAttempts() — no external API.

   HTML targets (inside #view-analytics):
   - #analytics-hero        → Overall stats summary & readiness
   - #analytics-trend       → Accuracy trend chart
   - #analytics-subjects    → Subject comparison bars
   - #analytics-types       → Test type breakdown
   - #analytics-strengths   → Strengths & weaknesses section
   - #analytics-actions     → Action buttons

   Dependencies: AppState, ExamConstants, Formatters, Helpers, Nav
   Used by: App, DashboardRenderer, ResultRenderer, ProfileRenderer
   ============================================================ */

'use strict';

var AnalyticsRenderer = (function() {

  var _bound = false;

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
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function _getCandidateInfo() {
    var name = 'Rohit';
    var initials = 'R';
    if (window.AppState) {
      if (typeof AppState.getFirstName === 'function') {
        var fn = AppState.getFirstName();
        if (fn && fn.toLowerCase() !== 'test' && fn.toLowerCase() !== 'student') {
          name = fn.charAt(0).toUpperCase() + fn.slice(1);
        }
      }
      if (typeof AppState.getInitials === 'function') {
        var ini = AppState.getInitials();
        if (ini && ini.toLowerCase() !== 't') initials = ini.toUpperCase();
      }
    }
    return { name: name, initials: initials };
  }

  /* ─────────────────────────────────────────────────────────
     UPDATE TOP NAVBAR
     ───────────────────────────────────────────────────────── */

  function _updateNavbar() {
    var cand = _getCandidateInfo();
    var chipAvatar = _el('analytics-chip-avatar');
    var chipName   = _el('analytics-chip-name');
    if (chipAvatar) chipAvatar.textContent = cand.initials;
    if (chipName)   chipName.textContent   = cand.name;
  }

  /* ─────────────────────────────────────────────────────────
     1. HERO STATS & READINESS BANNER
     ───────────────────────────────────────────────────────── */

  function _renderHero() {
    var container = _el('analytics-hero');
    if (!container) return;

    var stats = { totalAttempts: 0, avgScore: 0, avgAccuracy: 0, bestScore: 0, totalTimeSec: 0, testsCompleted: 0 };
    if (window.AppState && typeof AppState.getOverallStats === 'function') {
      stats = AppState.getOverallStats();
    }

    var cand = _getCandidateInfo();

    if (stats.totalAttempts === 0) {
      container.innerHTML =
        '<div class="analytics-empty-hero">' +
          '<div class="empty-hero-icon" aria-hidden="true">📊</div>' +
          '<div class="empty-hero-content">' +
            '<span class="empty-hero-tag">AIIMS DIAGNOSTIC STAGE</span>' +
            '<h2 class="empty-hero-title">No CBT Test Records Found Yet</h2>' +
            '<p class="empty-hero-text">Welcome, <strong>' + _esc(cand.name) + '</strong>! Complete your first full mock test or chapter drill on the dashboard to unlock comprehensive performance analytics, accuracy trends, and subject competency ratings.</p>' +
            '<button class="analytics-start-btn" id="analytics-empty-cta-btn" type="button">' +
              '🚀 Launch Your First Practice Test' +
            '</button>' +
          '</div>' +
        '</div>';
      return;
    }

    var fmt = window.Formatters;
    var avgAccNum = Number(stats.avgAccuracy || 0);
    var avgAccStr = avgAccNum.toFixed(1) + '%';
    var bestStr   = fmt ? fmt.formatScore(stats.bestScore) : Number(stats.bestScore || 0).toFixed(2);
    var timeStr   = fmt ? fmt.toHumanTime(stats.totalTimeSec) : Math.floor(stats.totalTimeSec / 60) + 'm';

    // Readiness Status determination
    var readinessLabel = '';
    var readinessBadgeClass = '';
    var readinessDesc = '';

    if (avgAccNum >= 75) {
      readinessLabel = 'AIIMS & MP PNST READY · TOP 1% CONTENDER';
      readinessBadgeClass = 'badge-ready-top';
      readinessDesc = 'Your cumulative performance exceeds the AIIMS & MP PNST 2027 projected general merit cutoff (75%). Maintain momentum with full-length timed simulations.';
    } else if (avgAccNum >= 60) {
      readinessLabel = 'QUALIFYING MERIT TIER · ON TRACK';
      readinessBadgeClass = 'badge-ready-good';
      readinessDesc = 'Strong foundational understanding across primary subjects. Sharpen speed and negative-mark containment in low-accuracy chapters to enter the distinction band.';
    } else if (avgAccNum >= 40) {
      readinessLabel = 'DEVELOPING COMPETENCY · FOUNDATIONAL DRILLS ACTIVE';
      readinessBadgeClass = 'badge-ready-avg';
      readinessDesc = 'Solid study progress observed. Focus on high-yield NCERT chapters and take targeted topic drills to elevate sectional accuracy above 60%.';
    } else {
      readinessLabel = 'DIAGNOSTIC PHASE · TARGETED REVISION NEEDED';
      readinessBadgeClass = 'badge-ready-dev';
      readinessDesc = 'Initial practice benchmark calibrated. Thoroughly review incorrect answers in scorecard view and revise fundamental concepts before re-attempting.';
    }

    container.innerHTML =
      '<div class="analytics-hero-banner">' +
        '<div class="hero-banner-header">' +
          '<div class="hero-banner-title-box">' +
            '<div class="hero-badge-row">' +
              '<span class="hero-official-badge">🏥 AIIMS &amp; MP PNST 2027 PREPARATION RADAR</span>' +
              '<span class="hero-readiness-badge ' + readinessBadgeClass + '">' + readinessLabel + '</span>' +
            '</div>' +
            '<h2 class="hero-banner-title">Performance Executive Dossier — ' + _esc(cand.name) + '</h2>' +
            '<p class="hero-banner-desc">' + readinessDesc + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="a-hero-grid">' +
          '<div class="a-hero-card card-glow-teal">' +
            '<div class="a-hero-card-head">' +
              '<span class="a-hero-icon" aria-hidden="true">📝</span>' +
              '<span class="a-hero-pill pill-teal">Total Tests</span>' +
            '</div>' +
            '<div class="a-hero-val">' + stats.totalAttempts + '</div>' +
            '<div class="a-hero-label">Exams Completed</div>' +
          '</div>' +

          '<div class="a-hero-card card-glow-blue">' +
            '<div class="a-hero-card-head">' +
              '<span class="a-hero-icon" aria-hidden="true">🎯</span>' +
              '<span class="a-hero-pill pill-blue">AIIMS Cutoff: 75%</span>' +
            '</div>' +
            '<div class="a-hero-val">' + _esc(avgAccStr) + '</div>' +
            '<div class="a-hero-label">Cumulative Accuracy</div>' +
          '</div>' +

          '<div class="a-hero-card card-glow-green">' +
            '<div class="a-hero-card-head">' +
              '<span class="a-hero-icon" aria-hidden="true">🏆</span>' +
              '<span class="a-hero-pill pill-green">Top Milestone</span>' +
            '</div>' +
            '<div class="a-hero-val">' + _esc(bestStr) + '</div>' +
            '<div class="a-hero-label">Highest Score Achieved</div>' +
          '</div>' +

          '<div class="a-hero-card card-glow-purple">' +
            '<div class="a-hero-card-head">' +
              '<span class="a-hero-icon" aria-hidden="true">⏱️</span>' +
              '<span class="a-hero-pill pill-purple">Total Time</span>' +
            '</div>' +
            '<div class="a-hero-val">' + _esc(timeStr) + '</div>' +
            '<div class="a-hero-label">Active Simulation Hours</div>' +
          '</div>' +

          '<div class="a-hero-card card-glow-amber">' +
            '<div class="a-hero-card-head">' +
              '<span class="a-hero-icon" aria-hidden="true">📚</span>' +
              '<span class="a-hero-pill pill-amber">Breadth</span>' +
            '</div>' +
            '<div class="a-hero-val">' + stats.testsCompleted + '</div>' +
            '<div class="a-hero-label">Distinct Test Papers</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     2. ACCURACY TREND CHART WITH 75% AIIMS BENCHMARK
     ───────────────────────────────────────────────────────── */

  function _renderTrend() {
    var container = _el('analytics-trend');
    if (!container) return;

    var attempts = [];
    if (window.AppState && typeof AppState.getRecentAttempts === 'function') {
      attempts = AppState.getRecentAttempts(10);
    }

    if (attempts.length === 0) {
      container.innerHTML =
        '<div class="analytics-card-header">' +
          '<div>' +
            '<h3 class="a-section-title">📈 Accuracy Trajectory &amp; AIIMS Benchmark</h3>' +
            '<p class="a-section-sub">Chronological accuracy progression against the AIIMS 75% benchmark cutoff.</p>' +
          '</div>' +
        '</div>' +
        '<div class="trend-empty-box">' +
          '<span class="trend-empty-icon">📊</span>' +
          '<p class="empty-text">No attempts logged yet. Complete tests to visualize your progress curve.</p>' +
        '</div>';
      return;
    }

    // Reverse to show oldest→newest (left→right)
    var reversed = attempts.slice().reverse();
    var EC = window.ExamConstants;

    var html =
      '<div class="analytics-card-header">' +
        '<div>' +
          '<h3 class="a-section-title">📈 Accuracy Trajectory &amp; AIIMS Benchmark</h3>' +
          '<p class="a-section-sub">Chronological accuracy curve across last ' + reversed.length + ' test attempt' + (reversed.length > 1 ? 's' : '') + ' with AIIMS 75% selection target.</p>' +
        '</div>' +
        '<span class="trend-badge-count">' + reversed.length + ' Recorded Attempts</span>' +
      '</div>';

    html += '<div class="trend-chart-wrapper">' +
              '<div class="trend-chart-stage">' +
                '<!-- AIIMS & MP PNST Cutoff Reference Line -->' +
                '<div class="trend-cutoff-benchmark" style="bottom: 75%;" title="AIIMS &amp; MP PNST 2027 Target Selection Cutoff (75%)">' +
                  '<span class="cutoff-line-label">🎯 AIIMS &amp; PNST Target (75%)</span>' +
                  '<div class="cutoff-line-dash"></div>' +
                '</div>' +
                '<div class="trend-bars-container">';

    for (var i = 0; i < reversed.length; i++) {
      var a = reversed[i];
      var rawAcc = Number(a.accuracy || 0);
      var acc = Math.max(0, Math.min(100, Math.round(rawAcc)));
      var barHeight = Math.max(6, acc);

      var barColorClass = 'bar-poor';
      if (acc >= 75) {
        barColorClass = 'bar-excellent';
      } else if (acc >= 60) {
        barColorClass = 'bar-good';
      } else if (acc >= 40) {
        barColorClass = 'bar-average';
      }

      var fmt = window.Formatters;
      var dateLabel = '';
      if (fmt && typeof fmt.toShortDate === 'function') {
        dateLabel = fmt.toShortDate(a.date);
      } else {
        dateLabel = '#' + (i + 1);
      }

      var testTitle = a.testTitle || ('Test #' + (i + 1));
      var scoreVal  = typeof a.score === 'number' ? a.score.toFixed(1) : a.score;

      html +=
        '<div class="trend-bar-col" title="' + _esc(testTitle) + ' · Score: ' + scoreVal + ' · Accuracy: ' + acc + '%">' +
          '<span class="trend-val-chip ' + barColorClass + '">' + acc + '%</span>' +
          '<div class="trend-bar-track">' +
            '<div class="trend-bar-fill ' + barColorClass + '" style="height:' + barHeight + '%"></div>' +
          '</div>' +
          '<div class="trend-col-meta">' +
            '<span class="trend-attempt-num">#' + (i + 1) + '</span>' +
            '<span class="trend-label" title="' + _esc(dateLabel) + '">' + _esc(dateLabel) + '</span>' +
          '</div>' +
        '</div>';
    }

    html += '</div></div></div>';

    // Analytical trend insight
    var trendBox = '';
    if (reversed.length >= 2) {
      var first = reversed[0].accuracy || 0;
      var last  = reversed[reversed.length - 1].accuracy || 0;
      var diff  = last - first;
      if (diff > 0) {
        trendBox =
          '<div class="trend-insight-box insight-positive">' +
            '<span class="insight-icon">📈</span>' +
            '<div class="insight-body">' +
              '<strong>Positive Growth Trajectory:</strong> Accuracy has increased by <strong>+' + diff.toFixed(1) + '%</strong> since your earliest attempt. Consistent simulation is elevating test speed and retention.' +
            '</div>' +
          '</div>';
      } else if (diff < 0) {
        trendBox =
          '<div class="trend-insight-box insight-warning">' +
            '<span class="insight-icon">⚠️</span>' +
            '<div class="insight-body">' +
              '<strong>Remedial Diagnostic Alert:</strong> Accuracy dropped by <strong>' + Math.abs(diff).toFixed(1) + '%</strong> in your most recent session. Review negative marks in the scorecard to reinforce weaker chapters.' +
            '</div>' +
          '</div>';
      } else {
        trendBox =
          '<div class="trend-insight-box insight-neutral">' +
            '<span class="insight-icon">➡️</span>' +
            '<div class="insight-body">' +
              '<strong>Consistent Performance Baseline:</strong> Accuracy has held steady across attempts. Push for consecutive scores above 75% to cement your qualifying margin.' +
            '</div>' +
          '</div>';
      }
    } else {
      trendBox =
        '<div class="trend-insight-box insight-neutral">' +
          '<span class="insight-icon">💡</span>' +
          '<div class="insight-body">' +
            '<strong>Initial Baseline Established:</strong> 1 full test recorded. Complete additional mock tests to reveal your dynamic accuracy growth trajectory.' +
          '</div>' +
        '</div>';
    }

    html += trendBox;
    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     3. TEST TYPE BREAKDOWN
     ───────────────────────────────────────────────────────── */

  function _renderTestTypes() {
    var container = _el('analytics-types');
    if (!container) return;

    var attempts = [];
    if (window.AppState && typeof AppState.getAttempts === 'function') {
      attempts = AppState.getAttempts();
    }

    if (attempts.length === 0) {
      container.innerHTML =
        '<div class="analytics-card-header">' +
          '<div>' +
            '<h3 class="a-section-title">🏷️ Performance by Test Category</h3>' +
            '<p class="a-section-sub">Metrics split across Full Mocks, Sectional, and Topic Tests.</p>' +
          '</div>' +
        '</div>' +
        '<div class="empty-text-box">' +
          '<p class="empty-text">No category metrics logged yet.</p>' +
        '</div>';
      return;
    }

    // Aggregate by test type
    var typeStats = {};
    for (var i = 0; i < attempts.length; i++) {
      var a = attempts[i];
      var t = a.testType || 'full_mock';

      if (!typeStats[t]) {
        typeStats[t] = { count: 0, totalAcc: 0, bestAcc: 0, totalScore: 0 };
      }
      typeStats[t].count++;
      typeStats[t].totalAcc += (a.accuracy || 0);
      typeStats[t].totalScore += (a.score || 0);
      if ((a.accuracy || 0) > typeStats[t].bestAcc) {
        typeStats[t].bestAcc = a.accuracy || 0;
      }
    }

    var EC = window.ExamConstants;
    var html =
      '<div class="analytics-card-header">' +
        '<div>' +
          '<h3 class="a-section-title">🏷️ Performance by Test Category</h3>' +
          '<p class="a-section-sub">Comparative metrics across Full Mock Tests, Subject Tests, and Topic Drills.</p>' +
        '</div>' +
      '</div>' +
      '<div class="type-grid">';

    for (var type in typeStats) {
      if (!typeStats.hasOwnProperty(type)) continue;

      var ts = typeStats[type];
      var avgAcc = (ts.totalAcc / ts.count).toFixed(0);

      var typeInfo = { label: type, icon: '📝', badge: 'badge-teal' };
      if (EC && typeof EC.getTestTypeInfo === 'function') {
        typeInfo = EC.getTestTypeInfo(type);
      }

      html +=
        '<div class="type-card">' +
          '<div class="type-card-head">' +
            '<span class="type-badge ' + _esc(typeInfo.badge) + '">' +
              typeInfo.icon + ' ' + _esc(typeInfo.label) +
            '</span>' +
            '<span class="type-attempts-pill">' + ts.count + ' attempt' + (ts.count > 1 ? 's' : '') + '</span>' +
          '</div>' +
          '<div class="type-stats-grid">' +
            '<div class="type-stat-item">' +
              '<span class="type-stat-label">Average Accuracy</span>' +
              '<span class="type-stat-val val-acc">' + avgAcc + '%</span>' +
            '</div>' +
            '<div class="type-stat-item">' +
              '<span class="type-stat-label">Peak Accuracy</span>' +
              '<span class="type-stat-val val-best">' + ts.bestAcc.toFixed(0) + '%</span>' +
            '</div>' +
          '</div>' +
          '<div class="type-meter-bg">' +
            '<div class="type-meter-fill" style="width: ' + Math.min(100, avgAcc) + '%"></div>' +
          '</div>' +
        '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     4. SUBJECT-WISE COMPETENCY COMPARISON
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
        '<div class="analytics-card-header">' +
          '<div>' +
            '<h3 class="a-section-title">📚 Sectional Subject Competency</h3>' +
            '<p class="a-section-sub">Accuracy, question volume, and qualifying benchmark per syllabus section.</p>' +
          '</div>' +
        '</div>' +
        '<div class="empty-text-box">' +
          '<p class="empty-text">No subject questions answered yet. Complete tests to view subject competency breakdown.</p>' +
        '</div>';
      return;
    }

    var EC = window.ExamConstants;

    // Sort by accuracy descending
    subjects.sort(function(a, b) {
      return (subjStats[b].accuracy || 0) - (subjStats[a].accuracy || 0);
    });

    var html =
      '<div class="analytics-card-header">' +
        '<div>' +
          '<h3 class="a-section-title">📚 Sectional Subject Competency</h3>' +
          '<p class="a-section-sub">Accuracy, question volume, and AIIMS 60% qualification standard per syllabus subject.</p>' +
        '</div>' +
      '</div>' +
      '<div class="subj-deck-list">';

    for (var i = 0; i < subjects.length; i++) {
      var key = subjects[i];
      var s   = subjStats[key];

      var subjLabel = key;
      var subjIcon  = '📚';
      if (EC && typeof EC.getSubjectInfo === 'function') {
        var si = EC.getSubjectInfo(key);
        subjLabel = si.label;
        subjIcon  = si.icon;
      }

      var accVal = Number(s.accuracy || 0);
      var accPct = Math.min(100, Math.round(accVal));

      var statusBadge = '';
      var barClass = '';
      if (accVal >= 75) {
        statusBadge = '<span class="subj-status-badge badge-mastery">Mastery (≥75%)</span>';
        barClass = 'fill-excellent';
      } else if (accVal >= 60) {
        statusBadge = '<span class="subj-status-badge badge-qualified">Qualified (≥60%)</span>';
        barClass = 'fill-good';
      } else if (accVal >= 40) {
        statusBadge = '<span class="subj-status-badge badge-average">Average (40–59%)</span>';
        barClass = 'fill-average';
      } else {
        statusBadge = '<span class="subj-status-badge badge-focus">Focus Required (&lt;40%)</span>';
        barClass = 'fill-poor';
      }

      html +=
        '<div class="subj-deck-item">' +
          '<div class="subj-deck-header">' +
            '<div class="subj-title-group">' +
              '<span class="subj-icon-badge" aria-hidden="true">' + subjIcon + '</span>' +
              '<span class="subj-name-text">' + _esc(subjLabel) + '</span>' +
            '</div>' +
            '<div class="subj-meta-group">' +
              statusBadge +
              '<span class="subj-acc-metric ' + barClass + '">' + accPct + '%</span>' +
            '</div>' +
          '</div>' +

          '<div class="subj-progress-track">' +
            '<div class="subj-benchmark-marker" style="left: 60%;" title="AIIMS Sectional Cutoff (60%)"></div>' +
            '<div class="subj-bar-fill ' + barClass + '" style="width:' + accPct + '%"></div>' +
          '</div>' +

          '<div class="subj-footer-details">' +
            '<span class="subj-stat-counter">✅ <strong>' + s.correct + '</strong> of <strong>' + s.total + '</strong> questions answered correctly</span>' +
            '<span class="subj-target-note">' + (accVal >= 60 ? 'Above sectional target' : 'Below 60% qualifying target') + '</span>' +
          '</div>' +
        '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     5. STRENGTHS & WEAKNESSES DIAGNOSTIC
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
      container.innerHTML =
        '<div class="analytics-card-header">' +
          '<div>' +
            '<h3 class="a-section-title">💡 Strategic Diagnostic &amp; Study Blueprint</h3>' +
            '<p class="a-section-sub">Identify top retention subjects and target revision areas.</p>' +
          '</div>' +
        '</div>' +
        '<div class="empty-text-box">' +
          '<p class="empty-text">Complete tests with multiple subjects to unlock your strengths and focus areas diagnostic.</p>' +
        '</div>';
      return;
    }

    // Sort by accuracy
    subjects.sort(function(a, b) {
      return (subjStats[b].accuracy || 0) - (subjStats[a].accuracy || 0);
    });

    var EC = window.ExamConstants;

    // Strengths (accuracy >= 55%)
    var strengths = [];
    for (var i = 0; i < subjects.length && strengths.length < 2; i++) {
      if (subjStats[subjects[i]].accuracy >= 55) {
        strengths.push(subjects[i]);
      }
    }

    // Weaknesses (bottom 2 with accuracy < 65%)
    var weaknesses = [];
    for (var j = subjects.length - 1; j >= 0 && weaknesses.length < 2; j--) {
      var sKey = subjects[j];
      if (strengths.indexOf(sKey) === -1 || subjStats[sKey].accuracy < 60) {
        weaknesses.push(sKey);
      }
    }

    var html =
      '<div class="analytics-card-header">' +
        '<div>' +
          '<h3 class="a-section-title">💡 High-Yield Strategic Diagnostic</h3>' +
          '<p class="a-section-sub">AIIMS preparation balance analysis: Demonstrated strengths vs. high-yield revision focus areas.</p>' +
        '</div>' +
      '</div>' +
      '<div class="sw-grid-deck">';

    // Strengths Column
    html +=
      '<div class="sw-deck-col sw-deck-strengths">' +
        '<div class="sw-col-header header-strong">' +
          '<span class="sw-header-icon" aria-hidden="true">💪</span>' +
          '<div>' +
            '<h4 class="sw-header-title">Demonstrated Strengths</h4>' +
            '<span class="sw-header-sub">High accuracy &amp; reliable marks</span>' +
          '</div>' +
        '</div>' +
        '<div class="sw-items-list">';

    if (strengths.length === 0) {
      html += '<p class="sw-empty-note">Practice more tests to establish your highest-scoring subjects!</p>';
    } else {
      for (var s = 0; s < strengths.length; s++) {
        var strKey = strengths[s];
        var sLabel = strKey;
        var sIcon  = '📚';
        if (EC && typeof EC.getSubjectInfo === 'function') {
          var sInfo = EC.getSubjectInfo(strKey);
          sLabel = sInfo.label;
          sIcon  = sInfo.icon;
        }
        var sAcc = subjStats[strKey].accuracy.toFixed(0);

        html +=
          '<div class="sw-item-card strong-card">' +
            '<div class="sw-item-info">' +
              '<span class="sw-item-icon">' + sIcon + '</span>' +
              '<span class="sw-item-name">' + _esc(sLabel) + '</span>' +
            '</div>' +
            '<span class="sw-item-acc acc-strong">' + sAcc + '%</span>' +
          '</div>';
      }
    }
    html += '</div></div>';

    // Weaknesses / Focus Areas Column
    html +=
      '<div class="sw-deck-col sw-deck-focus">' +
        '<div class="sw-col-header header-focus">' +
          '<span class="sw-header-icon" aria-hidden="true">⚠️</span>' +
          '<div>' +
            '<h4 class="sw-header-title">Priority Focus Areas</h4>' +
            '<span class="sw-header-sub">Maximum score uplift opportunity</span>' +
          '</div>' +
        '</div>' +
        '<div class="sw-items-list">';

    if (weaknesses.length === 0) {
      html += '<p class="sw-empty-note">Superb! All tested subjects are performing at or above target!</p>';
    } else {
      for (var w = 0; w < weaknesses.length; w++) {
        var wKey = weaknesses[w];
        var wLabel = wKey;
        var wIcon  = '📚';
        if (EC && typeof EC.getSubjectInfo === 'function') {
          var wInfo = EC.getSubjectInfo(wKey);
          wLabel = wInfo.label;
          wIcon  = wInfo.icon;
        }
        var wAcc = subjStats[wKey].accuracy.toFixed(0);

        html +=
          '<div class="sw-item-card focus-card">' +
            '<div class="sw-item-info">' +
              '<span class="sw-item-icon">' + wIcon + '</span>' +
              '<span class="sw-item-name">' + _esc(wLabel) + '</span>' +
            '</div>' +
            '<span class="sw-item-acc acc-focus">' + wAcc + '%</span>' +
          '</div>';
      }
    }
    html += '</div></div></div>';

    // Study Tip Banner
    var focusSubjName = weaknesses.length > 0 ? weaknesses[0] : (subjects[subjects.length - 1] || 'Physics');
    if (EC && typeof EC.getSubjectInfo === 'function') {
      focusSubjName = EC.getSubjectInfo(focusSubjName).label;
    }

    html +=
      '<div class="analytics-blueprint-card">' +
        '<div class="blueprint-badge">📖 AIIMS EXAM BLUEPRINT DIRECTIVE</div>' +
        '<div class="blueprint-content">' +
          '<p class="blueprint-text">' +
            '<strong>Priority Revision Action:</strong> Allocate 45 minutes daily to <strong>' + _esc(focusSubjName) + '</strong> NCERT exemplar problems. Re-test with dedicated chapter drills on the dashboard to convert weak areas into high-scoring strongholds.' +
          '</p>' +
        '</div>' +
      '</div>';

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     6. BOTTOM ACTION DOCK
     ───────────────────────────────────────────────────────── */

  function _renderActions() {
    var container = _el('analytics-actions');
    if (!container) return;

    container.innerHTML =
      '<div class="analytics-actions-inner">' +
        '<button class="analytics-action-btn primary" id="analytics-dash-btn" type="button">' +
          '<span class="btn-icon" aria-hidden="true">←</span> <span>Return to Dashboard</span>' +
        '</button>' +
        '<button class="analytics-action-btn secondary" id="analytics-practice-btn" type="button">' +
          '<span class="btn-icon" aria-hidden="true">📝</span> <span>Take Practice Test</span>' +
        '</button>' +
        '<button class="analytics-action-btn tertiary" id="analytics-profile-btn" type="button">' +
          '<span class="btn-icon" aria-hidden="true">👤</span> <span>Profile &amp; Settings</span>' +
        '</button>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     7. EVENT BINDINGS
     ───────────────────────────────────────────────────────── */

  function _bindEvents() {
    if (_bound) return;
    _bound = true;

    document.addEventListener('click', function(e) {
      // 1. Dashboard button (Bottom Dock, Top Header, or Legacy)
      if (
        e.target.closest('#analytics-dash-btn') ||
        e.target.closest('#analytics-dash-header-btn') ||
        e.target.closest('#analytics-back-btn')
      ) {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        return;
      }

      // 2. Practice Test button
      if (e.target.closest('#analytics-practice-btn') || e.target.closest('#analytics-empty-cta-btn')) {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        var testsEl = document.getElementById('dash-tests-grid');
        if (testsEl) {
          setTimeout(function() {
            testsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
        return;
      }

      // 3. Profile button
      if (e.target.closest('#analytics-profile-btn') || e.target.closest('#analytics-profile-header-btn')) {
        if (window.Nav) Nav.goTo('view-profile');
        if (window.ProfileRenderer) ProfileRenderer.render();
        return;
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Render the complete analytics view.
     */
    render: function() {
      _bindEvents();
      _updateNavbar();
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
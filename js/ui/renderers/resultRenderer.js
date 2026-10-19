/* ============================================================
   RESULT RENDERER — Post-Exam Results Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Million-Dollar Desktop-First CBT Official Scorecard & Evaluation Report:
   - Sticky Premier Desktop Navbar
   - Executive 3-Column Scorecard Hero Banner
   - 6 KPI Analytics Cards with ambient soft glows
   - 2-Column Analytical Deck (Subject breakdown & Difficulty benchmark)
   - Question Review Center:
     * Subject Filter Tabs (All, Physics, Biology, Chemistry)
     * Status Filter Pills (All, Correct, Wrong, Unattempted)
     * Live Keyword Search
     * Expand All / Collapse All toggle
     * Readable question cards with math symbol formatting
     * High-contrast option tags (Correct key, Your selection)
     * High-yield NCERT Explanation cards
   - Executive Bottom Action Dock + Next-Step Guidance
   - Print Scorecard support

   Dependencies: ExamConstants, UIConstants, Formatters, Helpers,
                 ExamEngine, Nav, DashboardRenderer, AppState
   Used by: ExamEngine.submitExam()
   ============================================================ */

'use strict';

var ResultRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _currentResult      = null;
  var _bound              = false;
  var _allExpanded        = false;
  var _activeStatusFilter = 'all';
  var _activeSubjFilter   = 'all';
  var _searchQuery        = '';


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
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * Format common scientific/math symbols for clean display.
   */
  function _beautifyText(text) {
    if (!text) return '';
    return text
      .replace(/rho_c/g, 'ρ_c')
      .replace(/rho_s/g, 'ρ_s')
      .replace(/<=>/g, '⇌')
      .replace(/<->/g, '⇄')
      .replace(/->/g, '→')
      .replace(/<-/g, '←')
      .replace(/~=/g, '≈')
      .replace(/~/g, '≈');
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
     1. HERO SCORECARD BANNER
     ───────────────────────────────────────────────────────── */

  function _renderHero(result) {
    var container = _el('result-hero');
    if (!container) return;

    var perf = result.performanceLevel || {};
    var perfLabel = perf.label || 'Evaluated';
    var perfClass = perf.class || 'perf-good';
    var scoreClass = result.scoreClass || 'score-good';

    var fmt = window.Formatters;
    var scoreStr = fmt ? fmt.formatScore(result.score) : Number(result.score || 0).toFixed(2);
    var timeStr  = fmt ? fmt.toHumanTime(result.timeTaken) : result.timeTaken + 's';

    var EC = window.ExamConstants;
    var typeInfo = { label: result.testType || 'Full Mock Test', icon: '📝', badge: 'badge-teal' };
    if (EC && typeof EC.getTestTypeInfo === 'function') {
      typeInfo = EC.getTestTypeInfo(result.testType);
    }

    var cand = _getCandidateInfo();
    var now = new Date();
    var dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    // Update navbar chip
    var chipAvatar = _el('result-chip-avatar');
    var chipName   = _el('result-chip-name');
    if (chipAvatar) chipAvatar.textContent = cand.initials;
    if (chipName)   chipName.textContent   = cand.name;

    // Official merit standing badge text
    var meritStanding = 'ACCELERATED PRACTICE RECOMMENDED';
    if (result.scorePercent >= 75) {
      meritStanding = 'TOP 1% RANKING · DISTINCTION';
    } else if (result.scorePercent >= 50) {
      meritStanding = 'QUALIFIED · PROJECTED MERIT LIST';
    } else if (result.scorePercent >= 35) {
      meritStanding = 'AVERAGE STANDING · MORE DRILLS NEEDED';
    }

    container.innerHTML =
      '<div class="result-hero-inner ' + _esc(perfClass) + '">' +
        '<!-- Left Column: Official Exam & Candidate Credentials -->' +
        '<div class="result-hero-left">' +
          '<div class="result-badge-row">' +
            '<span class="result-official-badge">🏥 AIIMS &amp; MP PNST 2027 CBT EVALUATION</span>' +
            '<span class="result-type-badge ' + _esc(typeInfo.badge) + '">' +
              typeInfo.icon + ' ' + _esc(typeInfo.label) +
            '</span>' +
            '<span class="result-marking-badge" title="AIIMS &amp; MP PNST Official Negative Marking Scheme">' +
              '⚖️ Marking: +1.00 / −0.33' +
            '</span>' +
          '</div>' +

          '<h2 class="result-title">' + _esc(result.testTitle) + '</h2>' +

          '<div class="result-candidate-strip">' +
            '<span class="rc-item">Candidate: <strong>' + _esc(cand.name) + '</strong></span>' +
            '<span class="rc-sep">·</span>' +
            '<span class="rc-item">Attempt ID: <strong>CBT-2027-M1</strong></span>' +
            '<span class="rc-sep">·</span>' +
            '<span class="rc-item">Date: <strong>' + dateStr + '</strong></span>' +
            '<span class="rc-sep">·</span>' +
            '<span class="rc-item">Duration: <strong>' + _esc(timeStr) + '</strong></span>' +
          '</div>' +
        '</div>' +

        '<!-- Center Column: Digital Score Showcase -->' +
        '<div class="result-hero-center">' +
          '<div class="result-score-circle">' +
            '<span class="score-label">EVALUATED AGGREGATE SCORE</span>' +
            '<div class="result-score-ring">' +
              '<span class="score-big ' + _esc(scoreClass) + '">' + _esc(scoreStr) + '</span>' +
              '<span class="score-divider">/</span>' +
              '<span class="score-max">' + result.maxScore + '</span>' +
            '</div>' +
            '<div class="result-pct-pill">' + result.scorePercent.toFixed(1) + '% Net Aggregate</div>' +
          '</div>' +
        '</div>' +

        '<!-- Right Column: Merit Standing & Verified Evaluation -->' +
        '<div class="result-hero-right">' +
          '<div class="result-perf-box">' +
            '<span class="perf-status-badge ' + _esc(perfClass) + '">🎯 ' + _esc(meritStanding) + '</span>' +
            '<div class="perf-metrics-mini">' +
              '<div class="pmm-item">' +
                '<span class="pmm-label">Accuracy</span>' +
                '<strong class="pmm-val">' + result.accuracy.toFixed(1) + '%</strong>' +
              '</div>' +
              '<div class="pmm-item">' +
                '<span class="pmm-label">Attempted</span>' +
                '<strong class="pmm-val">' + result.attemptedCount + '/' + result.totalQuestions + '</strong>' +
              '</div>' +
              '<div class="pmm-item">' +
                '<span class="pmm-label">Grading</span>' +
                '<strong class="pmm-val">' + (result.submitMethod === 'auto' ? 'Auto CBT' : 'Official') + '</strong>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ─────────────────────────────────────────────────────────
     2. SIX KPI STATS CARDS
     ───────────────────────────────────────────────────────── */

  function _renderStats(result) {
    var container = _el('result-stats');
    if (!container) return;

    var avgSpeed = result.attemptedCount > 0
      ? Math.round(result.timeTaken / result.attemptedCount)
      : 0;

    var items = [
      {
        icon: '✅',
        label: 'Correct Answers',
        value: result.correctCount,
        sub: '+' + result.correctCount + ' Marks Earned',
        color: 'stat-green'
      },
      {
        icon: '❌',
        label: 'Wrong Answers',
        value: result.wrongCount,
        sub: result.negativeMarks > 0 ? '−' + result.negativeMarks.toFixed(2) + ' Deducted' : '0.00 Penalty',
        color: 'stat-rose'
      },
      {
        icon: '⏭️',
        label: 'Unattempted',
        value: result.skippedCount,
        sub: result.skippedCount + ' Left Clean',
        color: 'stat-gray'
      },
      {
        icon: '🎯',
        label: 'Accuracy Rate',
        value: result.accuracy.toFixed(1) + '%',
        sub: result.accuracy >= 75 ? 'Target Exceeded' : 'Target: ≥75%',
        color: 'stat-teal'
      },
      {
        icon: '📝',
        label: 'Total Attempted',
        value: result.attemptedCount + '/' + result.totalQuestions,
        sub: result.attemptRate.toFixed(0) + '% Attempt Rate',
        color: 'stat-blue'
      },
      {
        icon: '⚡',
        label: 'Avg Speed per Question',
        value: avgSpeed + 's / Q',
        sub: 'Optimal Pacing: ~72s',
        color: 'stat-purple'
      }
    ];

    var html = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      html +=
        '<div class="result-stat-card ' + item.color + '">' +
          '<div class="rstat-top">' +
            '<span class="rstat-icon" aria-hidden="true">' + item.icon + '</span>' +
            '<span class="rstat-sub">' + _esc(item.sub) + '</span>' +
          '</div>' +
          '<div class="rstat-val">' + _esc(String(item.value)) + '</div>' +
          '<div class="rstat-label">' + _esc(item.label) + '</div>' +
        '</div>';
    }

    container.innerHTML = html;
  }


  /* ─────────────────────────────────────────────────────────
     3. SUBJECT BREAKDOWN (Left Deck Card)
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
    var html =
      '<div class="deck-card-header">' +
        '<div class="deck-title-group">' +
          '<h3 class="result-section-title">📊 Sectional Subject-Wise Breakdown</h3>' +
          '<span class="deck-subtitle">Sectional marks distribution and accuracy analysis</span>' +
        '</div>' +
      '</div>' +
      '<div class="subject-deck-list">';

    var iconMap = {
      physics: '⚛️',
      chemistry: '🧪',
      biology: '🧬',
      gk: '🌐'
    };

    for (var subj in breakdown) {
      if (!breakdown.hasOwnProperty(subj)) continue;

      var sb = breakdown[subj];
      var subjLabel = sb.label || subj;
      var subjIcon  = iconMap[subj.toLowerCase()] || '📚';
      if (EC && typeof EC.getSubjectInfo === 'function') {
        var si = EC.getSubjectInfo(subj);
        subjLabel = si.label;
        if (si.icon) subjIcon = si.icon;
      }

      var accPct = sb.accuracy.toFixed(0);
      var netMarks = (sb.correct - (sb.wrong / 3)).toFixed(2);
      var skippedCount = sb.total - sb.correct - sb.wrong;

      var barClass = '';
      if (EC && typeof EC.getScoreClass === 'function') {
        barClass = EC.getScoreClass(sb.accuracy);
      }

      html +=
        '<div class="subj-card-item">' +
          '<div class="subj-header">' +
            '<div class="subj-name-wrap">' +
              '<span class="subj-icon">' + subjIcon + '</span>' +
              '<strong class="subj-name">' + _esc(subjLabel) + '</strong>' +
              '<span class="subj-weight-pill">' + sb.total + ' Qs</span>' +
            '</div>' +
            '<div class="subj-marks-pill">' +
              'Net Marks: <strong>' + netMarks + '</strong> / ' + sb.total +
            '</div>' +
          '</div>' +

          '<div class="subj-pills-row">' +
            '<span class="subj-pill sp-correct">✅ ' + sb.correct + ' Correct</span>' +
            '<span class="subj-pill sp-wrong">❌ ' + sb.wrong + ' Wrong</span>' +
            '<span class="subj-pill sp-skipped">⏭️ ' + skippedCount + ' Skipped</span>' +
            '<span class="subj-pill sp-acc">' + accPct + '% Accuracy</span>' +
          '</div>' +

          '<div class="subj-bar-bg">' +
            '<div class="subj-bar-fill ' + barClass + '" style="width:' + Math.max(accPct, 2) + '%"></div>' +
          '</div>' +
        '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }


  /* ─────────────────────────────────────────────────────────
     4. DIFFICULTY BREAKDOWN (Right Deck Card)
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
    var benchmarkMap = {
      easy: 'AIIMS Target: >85% Accuracy',
      medium: 'AIIMS Target: >60% Accuracy',
      hard: 'AIIMS Target: >40% Accuracy'
    };

    var html =
      '<div class="deck-card-header">' +
        '<div class="deck-title-group">' +
          '<h3 class="result-section-title">📈 Difficulty-Wise Performance Analysis</h3>' +
          '<span class="deck-subtitle">Question complexity breakdown vs AIIMS selection benchmark</span>' +
        '</div>' +
      '</div>' +
      '<div class="diff-deck-grid">';

    for (var i = 0; i < levels.length; i++) {
      var key = levels[i];
      var d   = diff[key];
      if (!d || d.total === 0) continue;

      var diffInfo = { label: key.toUpperCase(), cssClass: 'diff-' + key };
      if (EC && typeof EC.getDifficultyInfo === 'function') {
        diffInfo = EC.getDifficultyInfo(key);
      }

      var attempted = d.correct + d.wrong;
      var acc = attempted > 0
        ? ((d.correct / attempted) * 100).toFixed(0)
        : '0';

      html +=
        '<div class="diff-card ' + key + '">' +
          '<div class="diff-card-top">' +
            '<div class="diff-badge-wrap">' +
              '<span class="diff-badge ' + _esc(diffInfo.cssClass) + '">' + _esc(diffInfo.label) + '</span>' +
              '<span class="diff-benchmark">' + benchmarkMap[key] + '</span>' +
            '</div>' +
            '<span class="diff-ratio"><strong>' + d.correct + '</strong> / ' + d.total + ' (' + acc + '%)</span>' +
          '</div>' +

          '<div class="diff-meter-bg">' +
            '<div class="diff-meter-fill ' + key + '" style="width:' + Math.max(parseInt(acc, 10), 2) + '%"></div>' +
          '</div>' +

          '<div class="diff-stats-line">' +
            '<span class="dbs correct">✅ ' + d.correct + ' Correct</span>' +
            '<span class="dbs wrong">❌ ' + d.wrong + ' Wrong</span>' +
            '<span class="dbs skipped">⏭️ ' + d.skipped + ' Skipped</span>' +
          '</div>' +
        '</div>';
    }

    html +=
      '<!-- AIIMS Strategy Callout Box -->' +
      '<div class="diff-strategy-box">' +
        '<span class="strategy-icon">💡</span>' +
        '<div class="strategy-text">' +
          '<strong>AIIMS Selection Blueprint:</strong> Easy and Medium questions constitute 89% (89/100) of the examination. Maximizing accuracy on these two tiers ensures guaranteed AIIMS BSc Nursing admission.' +
        '</div>' +
      '</div>';

    html += '</div>';
    container.innerHTML = html;
  }


  /* ─────────────────────────────────────────────────────────
     5. QUESTION REVIEW ACCORDION
     ───────────────────────────────────────────────────────── */

  function _renderQuestionReview(result) {
    var container = _el('result-questions');
    if (!container) return;

    var details = result.questionDetails;
    if (!Array.isArray(details) || details.length === 0) {
      container.innerHTML = '<p class="empty-text">No question review details available.</p>';
      return;
    }

    var EC     = window.ExamConstants;
    var labels = (EC && EC.OPTION_LABELS) || ['A', 'B', 'C', 'D'];

    // Collect subject counts for tabs
    var subjCounts = {};
    for (var s = 0; s < details.length; s++) {
      var sbj = (details[s].subject || 'other').toLowerCase();
      subjCounts[sbj] = (subjCounts[sbj] || 0) + 1;
    }

    var html =
      '<div class="review-header-dock">' +
        '<div class="review-title-box">' +
          '<h3 class="result-section-title">📝 Question-by-Question Review &amp; Explanations</h3>' +
          '<span class="review-subtitle">Examine answer choices, correct keys, and step-by-step NCERT solutions</span>' +
        '</div>' +

        '<div class="review-toolbar-row">' +
          '<!-- Subject Filter Tabs -->' +
          '<div class="review-subj-tabs" role="tablist">' +
            '<button class="subj-tab active" data-subfilter="all" type="button">All Subjects (' + details.length + ')</button>' +
            (subjCounts['physics'] ? '<button class="subj-tab" data-subfilter="physics" type="button">⚛️ Physics (' + subjCounts['physics'] + ')</button>' : '') +
            (subjCounts['biology'] ? '<button class="subj-tab" data-subfilter="biology" type="button">🧬 Biology (' + subjCounts['biology'] + ')</button>' : '') +
            (subjCounts['chemistry'] ? '<button class="subj-tab" data-subfilter="chemistry" type="button">🧪 Chemistry (' + subjCounts['chemistry'] + ')</button>' : '') +
          '</div>' +

          '<!-- Search & Status Filters -->' +
          '<div class="review-filter-actions">' +
            '<div class="review-search-wrap">' +
              '<input type="text" id="review-search-input" class="review-search-input" placeholder="🔍 Search question or keyword..." aria-label="Search question review" />' +
            '</div>' +

            '<div class="review-status-filters">' +
              '<button class="review-filter active" data-rfilter="all" type="button">All (' + details.length + ')</button>' +
              '<button class="review-filter rf-correct" data-rfilter="correct" type="button">✅ Correct (' + result.correctCount + ')</button>' +
              '<button class="review-filter rf-wrong" data-rfilter="wrong" type="button">❌ Wrong (' + result.wrongCount + ')</button>' +
              '<button class="review-filter rf-skipped" data-rfilter="skipped" type="button">⏭️ Skipped (' + result.skippedCount + ')</button>' +
            '</div>' +

            '<button id="rev-toggle-all-btn" class="rev-toggle-btn" type="button">Expand All ▾</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="review-accordion-list" id="review-accordion-list">';

    for (var i = 0; i < details.length; i++) {
      var q = details[i];
      var num = i + 1;

      var statusIcon  = '⏭️';
      var statusClass = 'skipped';
      var statusLabel = 'Unattempted (0.00)';
      if (q.status === 'correct') {
        statusIcon  = '✅';
        statusClass = 'correct';
        statusLabel = 'Correct (+1.00)';
      } else if (q.status === 'wrong') {
        statusIcon  = '❌';
        statusClass = 'wrong';
        statusLabel = 'Wrong (−0.33)';
      }

      var qSubject = (q.subject || 'general').toLowerCase();
      var qQuestionClean = _beautifyText(q.question);

      // Build options cards
      var optionsHtml = '';
      for (var o = 0; o < q.options.length; o++) {
        var optClass  = '';
        var optTag    = '';

        var isUserAnswer    = (q.userAnswer === o);
        var isCorrectAnswer = (q.correctAnswer === o);

        if (isUserAnswer && isCorrectAnswer) {
          optClass = 'opt-user-correct';
          optTag   = '<span class="rev-opt-tag correct">✓ Your Answer (Correct)</span>';
        } else if (isUserAnswer && !isCorrectAnswer) {
          optClass = 'opt-user-wrong';
          optTag   = '<span class="rev-opt-tag wrong">✗ Your Selection (Incorrect)</span>';
        } else if (isCorrectAnswer) {
          optClass = 'opt-key-correct';
          optTag   = '<span class="rev-opt-tag key">✓ Official Correct Answer</span>';
        }

        var optLabel = labels[o] || String.fromCharCode(65 + o);
        var optFormatted = (window.StemFormatter && typeof StemFormatter.formatOption === 'function')
          ? StemFormatter.formatOption(q.options[o])
          : _esc(_beautifyText(q.options[o]));

        optionsHtml +=
          '<div class="rev-opt ' + optClass + '">' +
            '<span class="rev-opt-label">' + _esc(optLabel) + '</span>' +
            '<span class="rev-opt-text">' + optFormatted + '</span>' +
            optTag +
          '</div>';
      }

      // Difficulty badge
      var diffHtml = '';
      if (EC && typeof EC.getDifficultyInfo === 'function') {
        var di = EC.getDifficultyInfo(q.difficulty);
        diffHtml = '<span class="q-diff-badge ' + _esc(di.cssClass) + '">' + _esc(di.label) + '</span>';
      }

      var subjLabel = q.subjectName || q.subject || 'General';
      var qStemHtml = (window.StemFormatter && typeof StemFormatter.formatQuestion === 'function')
        ? StemFormatter.formatQuestion(q)
        : _esc(qQuestionClean);

      html +=
        '<details class="rev-item ' + statusClass + '" data-status="' + q.status + '" data-subject="' + qSubject + '" data-qtext="' + _esc(q.question.toLowerCase()) + '">' +
          '<summary class="rev-summary">' +
            '<div class="rev-sum-top">' +
              '<div class="rev-sum-meta">' +
                '<span class="rev-num">Question ' + num + '</span>' +
                '<span class="rev-subj-chip">' + _esc(subjLabel) + '</span>' +
                diffHtml +
                (q.wasMarked ? '<span class="rev-marked" title="Marked for review during exam">★ Marked</span>' : '') +
              '</div>' +
              '<div class="rev-sum-badge">' +
                '<span class="rev-status-pill ' + statusClass + '">' + statusIcon + ' ' + statusLabel + '</span>' +
                '<span class="rev-chevron" aria-hidden="true">▾</span>' +
              '</div>' +
            '</div>' +

            '<div class="rev-sum-body">' +
              '<div class="rev-q-text">' + qStemHtml + '</div>' +
            '</div>' +
          '</summary>' +

          '<div class="rev-body">' +
            '<div class="rev-body-heading">Answer Options:</div>' +
            '<div class="rev-options">' + optionsHtml + '</div>' +
            (q.explanation
              ? '<div class="rev-explanation">' +
                  '<div class="rev-exp-header">' +
                    '<span class="exp-icon">💡</span>' +
                    '<strong>NCERT Concept &amp; In-Depth Solution:</strong>' +
                  '</div>' +
                  '<div class="rev-exp-text">' +
                    ((window.StemFormatter && typeof StemFormatter.format === 'function')
                      ? StemFormatter.format(q.explanation)
                      : _esc(_beautifyText(q.explanation))) +
                  '</div>' +
                '</div>'
              : '') +
          '</div>' +
        '</details>';
    }

    html += '</div>';
    container.innerHTML = html;
  }


  /* ─────────────────────────────────────────────────────────
     6. BOTTOM ACTION DOCK & GUIDANCE
     ───────────────────────────────────────────────────────── */

  function _renderActions(result) {
    var container = _el('result-actions');
    if (!container) return;

    container.innerHTML =
      '<div class="result-actions-card">' +
        '<div class="rac-guidance">' +
          '<span class="rac-icon">🎓</span>' +
          '<div class="rac-text">' +
            '<strong>AIIMS BSc Nursing Prep Status Saved</strong>' +
            '<p>Your exam performance metrics, speed breakdown, and 100-question review history have been recorded to your candidate profile.</p>' +
          '</div>' +
        '</div>' +
        '<div class="result-actions-inner">' +
          '<button class="result-action-btn primary" id="result-dashboard-btn" type="button">' +
            '<span class="btn-icon">📊</span> <span>Return to Dashboard</span>' +
          '</button>' +
          '<button class="result-action-btn" id="result-retake-btn" type="button">' +
            '<span class="btn-icon">🔄</span> <span>Retake Test</span>' +
          '</button>' +
          '<button class="result-action-btn" id="result-analytics-btn" type="button">' +
            '<span class="btn-icon">📈</span> <span>Deep Analytics</span>' +
          '</button>' +
          '<button class="result-action-btn print" id="result-print-btn" type="button">' +
            '<span class="btn-icon">🖨️</span> <span>Print Official Scorecard</span>' +
          '</button>' +
        '</div>' +
      '</div>';
  }


  /* ─────────────────────────────────────────────────────────
     7. EVENT BINDING & INTERACTIVITY
     ───────────────────────────────────────────────────────── */

  function _bindEvents() {
    if (_bound) return;
    _bound = true;

    document.addEventListener('click', function(e) {
      // 1. Dashboard button
      if (e.target.closest('#result-dashboard-btn') || e.target.closest('#result-dash-header-btn')) {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        return;
      }

      // 2. Retake button
      if (e.target.closest('#result-retake-btn')) {
        if (_currentResult && window.ExamEngine) {
          ExamEngine.startExam(_currentResult.testId);
        }
        return;
      }

      // 3. Analytics button
      if (e.target.closest('#result-analytics-btn')) {
        if (window.Nav) Nav.goTo('view-analytics');
        if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        return;
      }

      // 4. Print button
      if (e.target.closest('#result-print-btn') || e.target.closest('#result-print-header-btn')) {
        window.print();
        return;
      }

      // 5. Subject Filter Tabs
      var subjTab = e.target.closest('.subj-tab');
      if (subjTab) {
        _activeSubjFilter = subjTab.getAttribute('data-subfilter') || 'all';
        var allTabs = document.querySelectorAll('.subj-tab');
        for (var t = 0; t < allTabs.length; t++) {
          allTabs[t].classList.toggle('active', allTabs[t] === subjTab);
        }
        _filterQuestions();
        return;
      }

      // 6. Status Filter Pills
      var filterBtn = e.target.closest('.review-filter');
      if (filterBtn) {
        _activeStatusFilter = filterBtn.getAttribute('data-rfilter') || 'all';
        var allFilters = document.querySelectorAll('.review-filter');
        for (var f = 0; f < allFilters.length; f++) {
          allFilters[f].classList.toggle('active', allFilters[f] === filterBtn);
        }
        _filterQuestions();
        return;
      }

      // 7. Expand All / Collapse All toggle
      var toggleBtn = e.target.closest('#rev-toggle-all-btn');
      if (toggleBtn) {
        _allExpanded = !_allExpanded;
        var items = document.querySelectorAll('.rev-item');
        for (var j = 0; j < items.length; j++) {
          if (items[j].style.display !== 'none') {
            items[j].open = _allExpanded;
          }
        }
        toggleBtn.textContent = _allExpanded ? 'Collapse All ▴' : 'Expand All ▾';
        return;
      }
    });

    // 8. Live search input
    document.addEventListener('input', function(e) {
      if (e.target.id === 'review-search-input') {
        _searchQuery = (e.target.value || '').trim().toLowerCase();
        _filterQuestions();
      }
    });
  }

  /**
   * Multi-dimensional filtering: Subject + Status + Keyword
   */
  function _filterQuestions() {
    var items = document.querySelectorAll('.rev-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var status  = item.getAttribute('data-status');
      var subject = item.getAttribute('data-subject');
      var qtext   = item.getAttribute('data-qtext') || '';

      var matchesStatus  = (_activeStatusFilter === 'all' || status === _activeStatusFilter);
      var matchesSubject = (_activeSubjFilter === 'all' || subject === _activeSubjFilter);
      var matchesSearch  = (!_searchQuery || qtext.indexOf(_searchQuery) !== -1);

      if (matchesStatus && matchesSubject && matchesSearch) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {
    renderResult: function(result) {
      if (!result) {
        console.error('[ResultRenderer] No result to render.');
        return;
      }

      _currentResult      = result;
      _allExpanded        = false;
      _activeStatusFilter = 'all';
      _activeSubjFilter   = 'all';
      _searchQuery        = '';

      _renderHero(result);
      _renderStats(result);
      _renderSubjects(result);
      _renderDifficulty(result);
      _renderQuestionReview(result);
      _renderActions(result);

      _bindEvents();

      // Scroll container to top
      var container = document.querySelector('.result-container');
      if (container) container.scrollTop = 0;
      window.scrollTo(0, 0);
    },

    getCurrentResult: function() {
      return _currentResult;
    }
  };

})();

// Expose globally
window.ResultRenderer = ResultRenderer;
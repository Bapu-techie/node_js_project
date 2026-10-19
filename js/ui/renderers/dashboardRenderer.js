/* ============================================================
   DASHBOARD RENDERER — Main Dashboard Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders and manages the dashboard view:
   - Welcome card with greeting + student name
   - Quick stats strip (attempts, accuracy, best score)
   - Test type filter pills (All, Topic, Subject, Multi, Mock, Quick)
   - Searchable test card grid
   - Recent attempt history table

   HTML targets (inside #view-dashboard):
   - #dash-greeting          → Greeting + name
   - #dash-stats-strip       → Quick stats row
   - #dash-filter-bar        → Filter pills container
   - #dash-search            → Search input
   - #dash-test-grid         → Test cards container
   - #dash-test-count        → Filtered test count display
   - #dash-history-table     → Recent history tbody

   Dependencies: AppState, ExamConstants, UIConstants, Formatters,
                 Helpers, TEST_CONFIG, Nav, ExamEngine
   Used by: App, OnboardRenderer (after registration)
   ============================================================ */

'use strict';

var DashboardRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═════════════════��═════════════════════════════════════════ */

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
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ─────────────────────────────────────────────────────────
     GREETING & STATS
     ───────────────────────────────────────────────────────── */

  function _renderGreeting() {
    var greetEl  = _el('dash-greeting');
    var avatarEl = _el('dash-chip-avatar');
    var nameEl   = _el('dash-chip-name');

    var firstName = 'Aspirant';
    var initials  = 'R';

    if (window.AppState) {
      if (typeof AppState.getFirstName === 'function') {
        var fn = AppState.getFirstName();
        if (fn) firstName = fn;
      }
      if (typeof AppState.getInitials === 'function') {
        var ini = AppState.getInitials();
        if (ini) initials = ini;
      }
    }

    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl)   nameEl.textContent = firstName;

    if (greetEl) {
      var greeting = 'Welcome';
      if (window.UIConstants && typeof UIConstants.getGreeting === 'function') {
        greeting = UIConstants.getGreeting().replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim();
      }

      greetEl.innerHTML =
        '<div class="dash-greeting-badge">' +
          '<span class="dash-greeting-time">' + _esc(greeting) + ', </span>' +
          '<strong class="dash-greeting-name">' + _esc(firstName) + '</strong>' +
          '<span class="dash-greeting-dot" aria-hidden="true"></span>' +
          '<span class="dash-greeting-target">AIIMS &amp; MP PNST 2027 Target</span>' +
        '</div>';
    }
  }

  function _renderStats() {
    var container = _el('dash-stats-strip');
    if (!container) return;

    var stats = { totalAttempts: 0, avgAccuracy: 0, bestScore: 0, testsCompleted: 0 };
    if (window.AppState && typeof AppState.getOverallStats === 'function') {
      stats = AppState.getOverallStats();
    }

    var totalTests = (window.TEST_CONFIG && TEST_CONFIG.length) || 145;
    var completionPct = totalTests > 0 ? ((stats.testsCompleted / totalTests) * 100).toFixed(0) : 0;

    // Update hero progress banner if present
    var pctEl  = _el('dash-progress-pct');
    var fillEl = _el('dash-progress-fill');
    var subEl  = _el('dash-progress-sub');
    if (pctEl)  pctEl.textContent = completionPct + '%';
    if (fillEl) fillEl.style.width = Math.max(completionPct, stats.testsCompleted > 0 ? 3 : 0) + '%';
    if (subEl)  subEl.textContent = stats.testsCompleted + ' of ' + totalTests + ' Tests Practiced';

    var fmt = window.Formatters;
    var accuracyStr = fmt ? fmt.formatPercent(stats.avgAccuracy, 0) : stats.avgAccuracy.toFixed(0) + '%';
    var bestStr     = fmt ? fmt.formatScore(stats.bestScore) : String(stats.bestScore);

    // Accuracy badge label
    var accBadge = 'Baseline';
    var accTagClass = 'tag-blue';
    if (stats.avgAccuracy >= 80) {
      accBadge = 'AIIMS Ready';
      accTagClass = 'tag-green';
    } else if (stats.avgAccuracy >= 50) {
      accBadge = 'Good Pace';
      accTagClass = 'tag-teal';
    } else if (stats.totalAttempts > 0) {
      accBadge = 'In Training';
      accTagClass = 'tag-amber';
    }

    container.innerHTML =
      '<div class="stat-card stat-card-attempts">' +
        '<div class="sc-header">' +
          '<div class="sc-icon sc-icon-teal" aria-hidden="true">🎯</div>' +
          '<span class="sc-tag tag-teal">Activity</span>' +
        '</div>' +
        '<div class="sc-content">' +
          '<div class="sc-val">' + stats.totalAttempts + '</div>' +
          '<div class="sc-label">Total Attempts</div>' +
          '<div class="sc-sub">Practice sessions completed</div>' +
        '</div>' +
      '</div>' +

      '<div class="stat-card stat-card-accuracy">' +
        '<div class="sc-header">' +
          '<div class="sc-icon sc-icon-blue" aria-hidden="true">📈</div>' +
          '<span class="sc-tag ' + accTagClass + '">' + accBadge + '</span>' +
        '</div>' +
        '<div class="sc-content">' +
          '<div class="sc-val">' + _esc(accuracyStr) + '</div>' +
          '<div class="sc-label">Average Accuracy</div>' +
          '<div class="sc-sub">Target benchmark: 80%+</div>' +
        '</div>' +
      '</div>' +

      '<div class="stat-card stat-card-score">' +
        '<div class="sc-header">' +
          '<div class="sc-icon sc-icon-amber" aria-hidden="true">🏆</div>' +
          '<span class="sc-tag tag-amber">Best Run</span>' +
        '</div>' +
        '<div class="sc-content">' +
          '<div class="sc-val">' + _esc(bestStr) + '<span class="sc-val-unit"> pts</span></div>' +
          '<div class="sc-label">Personal Best Score</div>' +
          '<div class="sc-sub">With -⅓ negative marking</div>' +
        '</div>' +
      '</div>' +

      '<div class="stat-card stat-card-done">' +
        '<div class="sc-header">' +
          '<div class="sc-icon sc-icon-purple" aria-hidden="true">📚</div>' +
          '<span class="sc-tag tag-purple">' + completionPct + '% Done</span>' +
        '</div>' +
        '<div class="sc-content">' +
          '<div class="sc-val">' + stats.testsCompleted + '<span class="sc-val-slash"> / ' + totalTests + '</span></div>' +
          '<div class="sc-label">Tests Mastered</div>' +
          '<div class="sc-sub">Across all chapters &amp; mocks</div>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     FILTER BAR
     ───────────────────────────────────────────────────────── */

  function _renderFilterBar() {
    var container = _el('dash-filter-bar');
    if (!container) return;

    var options = [
      { key: 'all',     label: 'All Tests',  icon: '📚' },
      { key: 'topic',   label: 'Topic',      icon: '📝' },
      { key: 'subject', label: 'Subject',    icon: '📚' },
      { key: 'multi',   label: 'Multi',      icon: '🔗' },
      { key: 'mock',    label: 'Mock',       icon: '🎯' },
      { key: 'quick',   label: 'Quick',      icon: '⚡' }
    ];

    if (window.UIConstants && Array.isArray(UIConstants.FILTER_OPTIONS)) {
      options = UIConstants.FILTER_OPTIONS;
    }

    var active = 'all';
    if (window.AppState && typeof AppState.getActiveFilter === 'function') {
      active = AppState.getActiveFilter();
    }

    var html = '';
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var cls = (opt.key === active) ? ' active' : '';
      html += '<button class="filter-pill' + cls + '" data-filter="' + _esc(opt.key) + '">' +
              '<span class="filter-icon">' + opt.icon + '</span>' +
              '<span>' + _esc(opt.label) + '</span>' +
              '</button>';
    }

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     TEST CARDS
     ───────────────────────────────────────────────────────── */

  /**
   * Get filtered and searched test configs.
   * @returns {Array}
   */
  function _getFilteredTests() {
    if (!window.TEST_CONFIG || !Array.isArray(TEST_CONFIG)) return [];

    var filter = 'all';
    var search = '';
    if (window.AppState) {
      filter = AppState.getActiveFilter() || 'all';
      search = (AppState.getSearchQuery() || '').toLowerCase();
    }

    var filtered = [];
    for (var i = 0; i < TEST_CONFIG.length; i++) {
      var t = TEST_CONFIG[i];

      // Type filter
      if (filter !== 'all' && t.type !== filter) continue;

      // Search filter
      if (search) {
        var haystack = (
          (t.title || '') + ' ' +
          (t.subject || '') + ' ' +
          (t.chapter || '') + ' ' +
          (t.description || '')
        ).toLowerCase();

        if (haystack.indexOf(search) === -1) continue;
      }

      filtered.push(t);
    }

    return filtered;
  }

  /**
   * Get the best attempt info for a test.
   * @param {string} testId
   * @returns {{ best: number|null, attempts: number }|null}
   */
  function _getTestAttemptInfo(testId) {
    if (!window.AppState) return null;

    var attempts = AppState.getAttemptsForTest(testId);
    if (attempts.length === 0) return null;

    var best = -Infinity;
    for (var i = 0; i < attempts.length; i++) {
      if ((attempts[i].scorePercent || 0) > best) {
        best = attempts[i].scorePercent || 0;
      }
    }

    return {
      best:     best === -Infinity ? null : best,
      attempts: attempts.length
    };
  }

  /**
   * Find a test config entry by id.
   * @param {string} testId
   * @returns {Object|null}
   */
  function _findTestConfig(testId) {
    if (!window.TEST_CONFIG || !Array.isArray(TEST_CONFIG)) return null;
    for (var i = 0; i < TEST_CONFIG.length; i++) {
      if (TEST_CONFIG[i].id === testId) return TEST_CONFIG[i];
    }
    return null;
  }

  /**
   * Render a single test card HTML.
   * @param {Object} test - TEST_CONFIG entry
   * @returns {string}
   */
  function _buildTestCard(test) {
    var EC = window.ExamConstants;

    // Type info
    var typeLabel = test.type;
    var typeIcon  = '📝';
    var typeBadge = 'badge-teal';
    if (EC && typeof EC.getTestTypeInfo === 'function') {
      var info = EC.getTestTypeInfo(test.type);
      typeLabel = info.label;
      typeIcon  = info.icon;
      typeBadge = info.badge;
    }

    var is100Q = (test.id === 'full_mock_100_test_1' || test.totalQuestions === 100);
    if (is100Q) {
      typeLabel = '100Q Full Mock';
      typeIcon  = '🌟';
      typeBadge = 'badge-amber';
    }

    // Duration
    var durStr = test.timeLimitMinutes + ' min';
    if (window.Formatters && typeof Formatters.toMinutesDuration === 'function') {
      durStr = Formatters.toMinutesDuration(test.timeLimitMinutes);
    }

    // Question count and marks
    var qCount = test.totalQuestions || 10;
    var marksTotal = qCount * 1;

    // Subject pill & icon
    var subLower = (test.subject || '').toLowerCase();
    var subIcon = '📚';
    var subClass = 'tc-sub-all';
    if (subLower.indexOf('bio') !== -1) {
      subIcon = '🧬';
      subClass = 'tc-sub-bio';
    } else if (subLower.indexOf('chem') !== -1) {
      subIcon = '🧪';
      subClass = 'tc-sub-chem';
    } else if (subLower.indexOf('phy') !== -1) {
      subIcon = '⚡';
      subClass = 'tc-sub-phy';
    } else if (subLower.indexOf('gk') !== -1 || subLower.indexOf('general') !== -1) {
      subIcon = '📰';
      subClass = 'tc-sub-gk';
    } else {
      subIcon = '🏥';
      subClass = 'tc-sub-all';
    }

    // Chapter or topic pill
    var chapterTag = '';
    if (test.chapter && test.chapter !== test.title) {
      chapterTag = '<span class="tc-chapter-pill" title="' + _esc(test.chapter) + '">' + _esc(test.chapter) + '</span>';
    }

    // Previous attempt info
    var attemptInfo = _getTestAttemptInfo(test.id);
    var attemptHtml = '';
    var btnText = is100Q ? 'Start 100Q Mock Test 🚀' : 'Start Test →';

    if (attemptInfo && attemptInfo.attempts > 0) {
      btnText = is100Q ? 'Retake 100Q Test ↻' : 'Retake Test ↻';
      var bestPct = attemptInfo.best !== null ? Math.round(attemptInfo.best) : 0;
      var scoreClass = 'score-poor';
      var barFillClass = 'bar-rose';
      if (bestPct >= 80) {
        scoreClass = 'score-excellent';
        barFillClass = 'bar-green';
      } else if (bestPct >= 60) {
        scoreClass = 'score-good';
        barFillClass = 'bar-teal';
      } else if (bestPct >= 40) {
        scoreClass = 'score-average';
        barFillClass = 'bar-amber';
      }

      attemptHtml =
        '<div class="tc-attempt-box">' +
          '<div class="tc-attempt-header">' +
            '<span class="tc-best-score ' + scoreClass + '">Best: <strong>' + bestPct + '%</strong></span>' +
            '<span class="tc-attempt-count">' + attemptInfo.attempts + ' attempt' + (attemptInfo.attempts > 1 ? 's' : '') + '</span>' +
          '</div>' +
          '<div class="tc-attempt-bar-bg" aria-hidden="true">' +
            '<div class="tc-attempt-bar-fill ' + barFillClass + '" style="width: ' + Math.max(bestPct, 5) + '%;"></div>' +
          '</div>' +
        '</div>';
    } else {
      attemptHtml =
        '<div class="tc-attempt-box tc-unattempted">' +
          '<span class="tc-unattempted-text">✨ Not attempted yet • Ready to start</span>' +
        '</div>';
    }

    // Negative marking badge
    var negHtml = test.negativeMarking
      ? '<span class="tc-neg-badge" title="AIIMS Marking: +1 correct, -1/3 wrong"><span class="tc-neg-dot"></span>−⅓ Negative</span>'
      : '<span class="tc-noneg-badge" title="No marks deducted for incorrect answers">No Negative</span>';

    // Featured banner for 100Q test
    var featuredRibbon = is100Q
      ? '<div class="tc-featured-banner"><span class="tc-featured-star">⭐</span> HIGH-YIELD FULL MOCK</div>'
      : '';

    var cardExtraClass = is100Q ? ' tc-featured' : '';

    return '<div class="test-card' + cardExtraClass + '" data-test-id="' + _esc(test.id) + '" tabindex="0" role="button" ' +
           'aria-label="Start ' + _esc(test.title) + '">' +
      featuredRibbon +
      '<div class="tc-header">' +
        '<span class="tc-badge ' + _esc(typeBadge) + '"><span class="tc-badge-icon">' + typeIcon + '</span> ' + _esc(typeLabel) + '</span>' +
        negHtml +
      '</div>' +

      '<div class="tc-sub-strip">' +
        '<span class="tc-subject-pill ' + subClass + '">' + subIcon + ' ' + _esc(test.subject) + '</span>' +
        chapterTag +
      '</div>' +

      '<h3 class="tc-title">' + _esc(test.title) + '</h3>' +
      (test.description ? '<p class="tc-desc">' + _esc(test.description) + '</p>' : '<p class="tc-desc tc-desc-placeholder">Curated standard AIIMS BSc Nursing practice test pattern.</p>') +

      '<div class="tc-meta">' +
        '<div class="tc-meta-item" title="Question Count">' +
          '<span class="tc-meta-icon">📋</span>' +
          '<span class="tc-meta-val">' + qCount + '</span>' +
          '<span class="tc-meta-lbl">Qs</span>' +
        '</div>' +
        '<div class="tc-meta-item" title="Time Duration">' +
          '<span class="tc-meta-icon">⏱️</span>' +
          '<span class="tc-meta-val">' + _esc(durStr) + '</span>' +
        '</div>' +
        '<div class="tc-meta-item" title="Maximum Marks (+1 per question)">' +
          '<span class="tc-meta-icon">🏆</span>' +
          '<span class="tc-meta-val">' + marksTotal + '</span>' +
          '<span class="tc-meta-lbl">Marks</span>' +
        '</div>' +
      '</div>' +

      attemptHtml +

      '<button class="tc-start-btn btn-primary" data-start-test="' + _esc(test.id) + '" type="button">' +
        '<span>' + _esc(btnText) + '</span>' +
      '</button>' +
    '</div>';
  }

  function _renderTestGrid() {
    var container = _el('dash-test-grid');
    var countEl   = _el('dash-test-count');
    if (!container) return;

    var tests = _getFilteredTests();

    // Update count
    if (countEl) {
      countEl.textContent = tests.length + ' test' + (tests.length !== 1 ? 's' : '') + ' available';
    }

    if (tests.length === 0) {
      container.innerHTML =
        '<div class="empty-state">' +
          '<p class="empty-icon">🔍</p>' +
          '<p class="empty-text">No tests match your filter.</p>' +
        '</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < tests.length; i++) {
      html += _buildTestCard(tests[i]);
    }

    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     HISTORY TABLE
     ───────────────────────────────────────────────────────── */

  function _renderHistory() {
    var tbody = _el('dash-history-table');
    if (!tbody) return;

    var attempts = [];
    if (window.AppState && typeof AppState.getRecentAttempts === 'function') {
      var maxDisplay = (window.UIConstants && UIConstants.HISTORY_MAX_DISPLAY) || 50;
      attempts = AppState.getRecentAttempts(maxDisplay);
    }

    if (attempts.length === 0) {
      tbody.innerHTML =
        '<tr class="history-empty-row">' +
          '<td colspan="6">' +
            '<div class="history-empty-card">' +
              '<div class="he-icon">📑</div>' +
              '<h3 class="he-title">No Test Attempts Yet</h3>' +
              '<p class="he-sub">Take your first practice or mock test above to see your scores, time metrics, and performance analytics here.</p>' +
              '<button class="he-cta-btn btn-primary" data-start-test="full_mock_100_test_1" type="button">' +
                'Start 100-Question Test 🚀' +
              '</button>' +
            '</div>' +
          '</td>' +
        '</tr>';
      return;
    }

    var fmt = window.Formatters;
    var html = '';

    for (var i = 0; i < attempts.length; i++) {
      var a = attempts[i];

      var testMeta = _findTestConfig(a.testId);
      var testSubject = (testMeta && testMeta.subject) ? testMeta.subject : 'Practice';
      var testType = (testMeta && testMeta.type) ? testMeta.type.toUpperCase() : 'TEST';

      var dateStr = a.date;
      if (fmt && typeof fmt.toRelativeDate === 'function') {
        dateStr = fmt.toRelativeDate(a.date);
      }

      var scoreStr = (a.score !== undefined ? a.score : '—');
      var maxScoreStr = (a.maxScore || '—');
      var accVal = Math.round(a.accuracy !== undefined ? a.accuracy : (a.scorePercent || 0));
      var accStr = accVal + '%';

      var accTagClass = 'tag-amber';
      if (accVal >= 80) accTagClass = 'tag-green';
      else if (accVal >= 60) accTagClass = 'tag-teal';
      else if (accVal < 40) accTagClass = 'tag-rose';

      var timeStr = '—';
      if (a.timeTaken && fmt && typeof fmt.toHumanTime === 'function') {
        timeStr = fmt.toHumanTime(a.timeTaken);
      }

      var scoreClass = '';
      if (window.ExamConstants && typeof ExamConstants.getScoreClass === 'function') {
        scoreClass = ExamConstants.getScoreClass(a.scorePercent || 0);
      }

      var statusPill = a.submitMethod === 'auto'
        ? '<span class="hist-status-pill pill-auto" title="Submitted automatically when timer expired">⏰ Time Expired</span>'
        : '<span class="hist-status-pill pill-manual" title="Submitted manually by candidate">✅ Completed</span>';

      html += '<tr class="history-data-row">' +
        '<td class="hist-col-test">' +
          '<div class="hist-test-info">' +
            '<span class="hist-test-title">' + _esc(a.testTitle || a.testId) + '</span>' +
            '<span class="hist-test-sub"><span class="hist-sub-tag">' + _esc(testSubject) + '</span> • ' + _esc(testType) + '</span>' +
          '</div>' +
        '</td>' +
        '<td class="hist-col-date">' +
          '<span class="hist-date-main">' + _esc(dateStr) + '</span>' +
        '</td>' +
        '<td class="hist-col-score">' +
          '<span class="hist-score-badge ' + scoreClass + '">' + _esc(String(scoreStr)) + ' <span class="hist-score-max">/ ' + _esc(String(maxScoreStr)) + '</span></span>' +
        '</td>' +
        '<td class="hist-col-acc">' +
          '<span class="hist-acc-pill ' + accTagClass + '">' + _esc(accStr) + '</span>' +
        '</td>' +
        '<td class="hist-col-time">' +
          '<span class="hist-time-tag">⏱️ ' + _esc(timeStr) + '</span>' +
        '</td>' +
        '<td class="hist-col-status">' + statusPill + '</td>' +
      '</tr>';
    }

    tbody.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     EVENT HANDLERS
     ───────────────────────────────────────────────────────── */

  /**
   * Handle filter pill click.
   * @param {Event} e
   */
  function _onFilterClick(e) {
    var pill = e.target.closest('.filter-pill');
    if (!pill) return;

    var filter = pill.getAttribute('data-filter');
    if (!filter) return;

    // Update AppState
    if (window.AppState) {
      AppState.setActiveFilter(filter);
    }

    // Update active pill visual
    var pills = document.querySelectorAll('.filter-pill');
    for (var i = 0; i < pills.length; i++) {
      pills[i].classList.toggle('active', pills[i].getAttribute('data-filter') === filter);
    }

    // Re-render test grid
    _renderTestGrid();
  }

  /**
   * Handle search input.
   */
  function _onSearch() {
    var input = _el('dash-search');
    if (!input) return;

    if (window.AppState) {
      AppState.setSearchQuery(input.value);
    }

    _renderTestGrid();
  }

  /**
   * Handle test card / start button click.
   * @param {Event} e
   */
  function _onTestCardClick(e) {
    // Find start button or card
    var startBtn = e.target.closest('[data-start-test]');
    var card     = e.target.closest('.test-card');

    var testId = null;
    if (startBtn) {
      testId = startBtn.getAttribute('data-start-test');
    } else if (card && e.target.tagName !== 'BUTTON') {
      testId = card.getAttribute('data-test-id');
    }

    if (!testId) return;

    // Start the exam
    if (window.ExamEngine && typeof ExamEngine.startExam === 'function') {
      ExamEngine.startExam(testId);
    }
  }

  /**
   * Handle keyboard Enter/Space on test cards.
   * @param {KeyboardEvent} e
   */
  function _onTestCardKeydown(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    var card = e.target.closest('.test-card');
    if (!card) return;

    e.preventDefault();
    var testId = card.getAttribute('data-test-id');
    if (testId && window.ExamEngine) {
      ExamEngine.startExam(testId);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Render the complete dashboard view.
     */
    render: function() {
      _renderGreeting();
      _renderStats();
      _renderFilterBar();
      _renderTestGrid();
      _renderHistory();

      this.bindEvents();
    },

    /**
     * Refresh just the dynamic parts (stats, test grid, history).
     * Called when returning from result/analytics view.
     */
    refresh: function() {
      _renderGreeting();
      _renderStats();
      _renderTestGrid();
      _renderHistory();
    },

    /**
     * Bind dashboard event listeners.
     */
    bindEvents: function() {
      if (_bound) return;
      _bound = true;

      // Filter pills — event delegation on container
      var filterBar = _el('dash-filter-bar');
      if (filterBar) {
        filterBar.addEventListener('click', _onFilterClick);
      }

      // Search input — debounced
      var searchInput = _el('dash-search');
      if (searchInput) {
        var debounced = (window.Helpers && typeof Helpers.debounce === 'function')
          ? Helpers.debounce(_onSearch, 250)
          : _onSearch;

        searchInput.addEventListener('input', debounced);
      }

      // Test card grid — event delegation
      var testGrid = _el('dash-test-grid');
      if (testGrid) {
        testGrid.addEventListener('click', _onTestCardClick);
        testGrid.addEventListener('keydown', _onTestCardKeydown);
      }

      // Nav buttons (analytics, profile)
      var analyticsBtn = _el('dash-analytics-btn');
      if (analyticsBtn) {
        analyticsBtn.addEventListener('click', function() {
          if (window.Nav) Nav.goTo('view-analytics');
          if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        });
      }

      var historyAnalyticsBtn = _el('dash-history-analytics-btn');
      if (historyAnalyticsBtn) {
        historyAnalyticsBtn.addEventListener('click', function() {
          if (window.Nav) Nav.goTo('view-analytics');
          if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        });
      }

      // History table clicks (e.g. empty-state CTA button)
      var histTable = _el('dash-history-table');
      if (histTable) {
        histTable.addEventListener('click', function(e) {
          var startBtn = e.target.closest('[data-start-test]');
          if (startBtn) {
            var tid = startBtn.getAttribute('data-start-test');
            if (tid && window.ExamEngine) {
              ExamEngine.startExam(tid);
            }
          }
        });
      }

      var profileBtn = _el('dash-profile-btn');
      if (profileBtn) {
        profileBtn.addEventListener('click', function() {
          if (window.Nav) Nav.goTo('view-profile');
          if (window.ProfileRenderer) ProfileRenderer.render();
        });
      }

      // Theme toggle button
      var themeBtn = _el('dash-theme-btn');
      if (themeBtn) {
        var themeIcon = themeBtn.querySelector('.theme-icon-display');
        var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        if (themeIcon) {
          themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        }

        themeBtn.addEventListener('click', function() {
          var cur = document.documentElement.getAttribute('data-theme') || 'light';
          var next = cur === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          if (themeIcon) {
            themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
          }
          if (window.StorageService && typeof StorageService.saveTheme === 'function') {
            StorageService.saveTheme(next);
          }
          if (window.ToastManager && typeof ToastManager.show === 'function') {
            ToastManager.show(next === 'dark' ? '🌙 Dark theme enabled' : '☀️ Light theme enabled', 'info');
          }
        });
      }
    }
  };

})();

// Expose globally
window.DashboardRenderer = DashboardRenderer;
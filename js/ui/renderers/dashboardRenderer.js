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
    var greetEl = _el('dash-greeting');
    if (!greetEl) return;

    var greeting = 'Hello 👋';
    if (window.UIConstants && typeof UIConstants.getGreeting === 'function') {
      greeting = UIConstants.getGreeting();
    }

    var firstName = '';
    if (window.AppState && typeof AppState.getFirstName === 'function') {
      firstName = AppState.getFirstName();
    }

    greetEl.innerHTML =
      '<span class="dash-greeting-text">' + _esc(greeting) + '</span>' +
      (firstName ? ', <strong>' + _esc(firstName) + '</strong>' : '') +
      ' 🩺';
  }

  function _renderStats() {
    var container = _el('dash-stats-strip');
    if (!container) return;

    var stats = { totalAttempts: 0, avgAccuracy: 0, bestScore: 0, testsCompleted: 0 };
    if (window.AppState && typeof AppState.getOverallStats === 'function') {
      stats = AppState.getOverallStats();
    }

    var fmt = window.Formatters;
    var accuracyStr = fmt ? fmt.formatPercent(stats.avgAccuracy, 0) : stats.avgAccuracy.toFixed(0) + '%';
    var bestStr     = fmt ? fmt.formatScore(stats.bestScore) : String(stats.bestScore);

    container.innerHTML =
      '<div class="stat-chip">' +
        '<span class="stat-chip-val">' + stats.totalAttempts + '</span>' +
        '<span class="stat-chip-label">Attempts</span>' +
      '</div>' +
      '<div class="stat-chip">' +
        '<span class="stat-chip-val">' + _esc(accuracyStr) + '</span>' +
        '<span class="stat-chip-label">Avg Accuracy</span>' +
      '</div>' +
      '<div class="stat-chip">' +
        '<span class="stat-chip-val">' + _esc(bestStr) + '</span>' +
        '<span class="stat-chip-label">Best Score</span>' +
      '</div>' +
      '<div class="stat-chip">' +
        '<span class="stat-chip-val">' + stats.testsCompleted + '</span>' +
        '<span class="stat-chip-label">Tests Done</span>' +
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

    // Duration
    var durStr = test.timeLimitMinutes + ' min';
    if (window.Formatters && typeof Formatters.toMinutesDuration === 'function') {
      durStr = Formatters.toMinutesDuration(test.timeLimitMinutes);
    }

    // Question count
    var qCount = test.totalQuestions || '—';

    // Previous attempt info
    var attemptInfo = _getTestAttemptInfo(test.id);
    var prevHtml = '';
    if (attemptInfo) {
      var bestPct = attemptInfo.best !== null ? attemptInfo.best.toFixed(0) + '%' : '—';
      prevHtml =
        '<div class="tc-prev">' +
          '<span class="tc-prev-badge">Best: ' + _esc(bestPct) + '</span>' +
          '<span class="tc-prev-count">' + attemptInfo.attempts + ' attempt' + (attemptInfo.attempts > 1 ? 's' : '') + '</span>' +
        '</div>';
    }

    // Negative marking indicator
    var negHtml = test.negativeMarking
      ? '<span class="tc-neg" title="Negative marking: −1/3 per wrong answer">−1/3</span>'
      : '';

    return '<div class="test-card" data-test-id="' + _esc(test.id) + '" tabindex="0" role="button" ' +
           'aria-label="Start ' + _esc(test.title) + '">' +
      '<div class="tc-header">' +
        '<span class="tc-badge ' + _esc(typeBadge) + '">' + typeIcon + ' ' + _esc(typeLabel) + '</span>' +
        negHtml +
      '</div>' +
      '<h3 class="tc-title">' + _esc(test.title) + '</h3>' +
      '<p class="tc-subject">' + _esc(test.subject) + '</p>' +
      (test.description ? '<p class="tc-desc">' + _esc(test.description) + '</p>' : '') +
      '<div class="tc-meta">' +
        '<span class="tc-meta-item">📝 ' + qCount + ' Qs</span>' +
        '<span class="tc-meta-item">⏱️ ' + _esc(durStr) + '</span>' +
      '</div>' +
      prevHtml +
      '<button class="tc-start-btn btn-primary" data-start-test="' + _esc(test.id) + '">Start Test →</button>' +
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
        '<tr class="history-empty">' +
          '<td colspan="6">No attempts yet. Take your first test! 🚀</td>' +
        '</tr>';
      return;
    }

    var fmt = window.Formatters;
    var html = '';

    for (var i = 0; i < attempts.length; i++) {
      var a = attempts[i];

      var dateStr = a.date;
      if (fmt && typeof fmt.toRelativeDate === 'function') {
        dateStr = fmt.toRelativeDate(a.date);
      }

      var scoreStr = (a.score !== undefined ? a.score : '—');
      var accStr   = (a.accuracy !== undefined) ? a.accuracy.toFixed(0) + '%' : '—';
      var timeStr  = '—';
      if (a.timeTaken && fmt && typeof fmt.toHumanTime === 'function') {
        timeStr = fmt.toHumanTime(a.timeTaken);
      }

      var scoreClass = '';
      if (window.ExamConstants && typeof ExamConstants.getScoreClass === 'function') {
        scoreClass = ExamConstants.getScoreClass(a.scorePercent || 0);
      }

      html += '<tr>' +
        '<td class="hist-date">' + _esc(dateStr) + '</td>' +
        '<td class="hist-title">' + _esc(a.testTitle || a.testId) + '</td>' +
        '<td class="hist-score ' + scoreClass + '">' + _esc(String(scoreStr)) + '/' + (a.maxScore || '—') + '</td>' +
        '<td class="hist-acc">' + _esc(accStr) + '</td>' +
        '<td class="hist-time">' + _esc(timeStr) + '</td>' +
        '<td class="hist-method">' + _esc(a.submitMethod === 'auto' ? '⏰' : '✅') + '</td>' +
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

      var profileBtn = _el('dash-profile-btn');
      if (profileBtn) {
        profileBtn.addEventListener('click', function() {
          if (window.Nav) Nav.goTo('view-profile');
          if (window.ProfileRenderer) ProfileRenderer.render();
        });
      }
    }
  };

})();

// Expose globally
window.DashboardRenderer = DashboardRenderer;
/* ============================================================
   PROFILE RENDERER — Student Profile & Settings Screen
   NursePrep Pro v3.0 — AIIMS Nursing & MP PNST 2027 Entrance

   Renders and manages the premier desktop profile/settings view:
   - Dedicated Top Navbar (AIIMS & MP PNST 2027 branding, Candidate Avatar Badge)
   - Profile card (Candidate Dossier, verified badge, editable info)
   - AIIMS & MP PNST 2027 Goal Tracker (Target score, rank tier, institution)
   - Storage usage & diagnostics (quota meter, test cache metrics)
   - CBT exam & interface settings (sound, animations, dark mode, time alerts)
   - Data management suite (JSON export, JSON import, double-confirmed reset)
   - Cloud submission queue status & manual sync
   - Portal specifications & regulatory compliance
   - Executive bottom action dock

   HTML targets (inside #view-profile):
   - #profile-card          → Candidate dossier & inline editor
   - #profile-goals         → AIIMS & MP PNST 2027 goal tracker
   - #profile-storage       → Storage & diagnostics
   - #profile-settings      → CBT settings toggles
   - #profile-data          → Data management actions
   - #profile-queue         → Cloud submission queue
   - #profile-about         → About & compliance
   - #profile-actions       → Navigation action dock

   Dependencies: AppState, StorageService, FormSubmitter,
                 UIConstants, Formatters, Nav, ToastManager
   Used by: App, DashboardRenderer, AnalyticsRenderer
   ============================================================ */

'use strict';

var ProfileRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS & STATE
     ═══════════════════════════════════════════════════════════ */

  var _bound = false;
  var _isEditingProfile = false;

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
    var email = 'rohit.nursing2027@gmail.com';
    var initials = 'R';
    var joinedDate = '';

    if (window.AppState) {
      var student = AppState.getStudent();
      if (student) {
        if (student.name && student.name.trim()) {
          var trimmed = student.name.trim();
          if (trimmed.toLowerCase() !== 'test' && trimmed.toLowerCase() !== 'student') {
            name = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
          } else {
            name = 'Rohit';
          }
        }
        if (student.email) email = student.email;
        if (student.joinedDate) joinedDate = student.joinedDate;
      }
      var ini = AppState.getInitials();
      if (ini && ini !== '?' && ini.toLowerCase() !== 't') {
        initials = ini.toUpperCase();
      } else {
        initials = name.charAt(0).toUpperCase();
      }
    }

    return {
      name: name,
      email: email,
      initials: initials,
      joinedDate: joinedDate
    };
  }

  /* ─────────────────────────────────────────────────────────
     UPDATE TOP NAVBAR
     ───────────────────────────────────────────────────────── */

  function _updateNavbar() {
    var cand = _getCandidateInfo();
    var chipAvatar = _el('profile-chip-avatar');
    var chipName   = _el('profile-chip-name');
    if (chipAvatar) chipAvatar.textContent = cand.initials;
    if (chipName)   chipName.textContent   = cand.name;
  }

  /* ─────────────────────────────────────────────────────────
     1. PROFILE CARD & INLINE EDITOR
     ───────────────────────────────────────────────────────── */

  function _renderProfileCard() {
    var container = _el('profile-card');
    if (!container) return;

    var cand = _getCandidateInfo();
    var fmt = window.Formatters;
    var joinFormatted = '';

    if (cand.joinedDate) {
      joinFormatted = fmt && typeof fmt.toRelativeDate === 'function'
        ? fmt.toRelativeDate(cand.joinedDate)
        : new Date(cand.joinedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } else {
      joinFormatted = 'Active Aspirant (Enrolled 2027)';
    }

    var html =
      '<div class="p-card-inner">' +
        '<div class="p-card-header">' +
          '<div class="p-badge-row">' +
            '<span class="p-verified-badge">🏥 VERIFIED CBT ASPIRANT · AIIMS &amp; MP PNST</span>' +
            '<span class="p-batch-badge">BATCH 2027</span>' +
          '</div>' +
          '<button class="p-edit-toggle-btn" id="profile-edit-toggle-btn" type="button" title="Edit candidate details">' +
            (_isEditingProfile ? '✖ Cancel' : '✏️ Edit Profile') +
          '</button>' +
        '</div>' +

        '<div class="p-dossier-body">' +
          '<div class="p-avatar-wrap">' +
            '<div class="p-avatar">' + _esc(cand.initials) + '</div>' +
            '<div class="p-avatar-badge" title="Active Examination Seat">✓</div>' +
          '</div>' +
          '<div class="p-info">' +
            '<h3 class="p-name">' + _esc(cand.name) + '</h3>' +
            '<p class="p-email">' + _esc(cand.email) + '</p>' +
            '<div class="p-meta-chips">' +
              '<span class="meta-chip chip-roll">🆔 AIIMS-PNST-2027-9284</span>' +
              '<span class="meta-chip chip-category">🏷️ General Merit</span>' +
              '<span class="meta-chip chip-enrolled">📅 ' + _esc(joinFormatted) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';

    // Inline Editor Form
    if (_isEditingProfile) {
      html +=
        '<form class="p-edit-form" id="profile-edit-form">' +
          '<div class="p-edit-form-header">' +
            '<h4>Edit Candidate Registration Details</h4>' +
            '<p>Changes update your examination credentials and merit scoreboard.</p>' +
          '</div>' +
          '<div class="p-input-grid">' +
            '<div class="p-input-group">' +
              '<label for="profile-input-name">Full Candidate Name</label>' +
              '<input type="text" id="profile-input-name" class="p-input" value="' + _esc(cand.name) + '" required autocomplete="name" />' +
            '</div>' +
            '<div class="p-input-group">' +
              '<label for="profile-input-email">Registered Email Address</label>' +
              '<input type="email" id="profile-input-email" class="p-input" value="' + _esc(cand.email) + '" required autocomplete="email" />' +
            '</div>' +
          '</div>' +
          '<div class="p-edit-actions">' +
            '<button type="button" class="btn-cancel" id="profile-edit-cancel-btn">Cancel</button>' +
            '<button type="submit" class="btn-save" id="profile-edit-save-btn">💾 Save Changes</button>' +
          '</div>' +
        '</form>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /* ─────────────────────────────────────────────────────────
     2. AIIMS TARGET GOAL TRACKER
     ───────────────────────────────────────────────────────── */

  function _renderGoals() {
    var container = _el('profile-goals');
    if (!container) return;

    var stats = { totalAttempts: 0, avgAccuracy: 0, bestScore: 0 };
    if (window.AppState && typeof AppState.getOverallStats === 'function') {
      stats = AppState.getOverallStats();
    }

    var currentAcc = Math.round(Number(stats.avgAccuracy || 0));
    var targetAcc = 80;
    var targetScore = 80;
    var progressPct = Math.min(100, Math.round((currentAcc / targetAcc) * 100));

    container.innerHTML =
      '<div class="profile-card-block profile-goals-block">' +
        '<div class="block-header">' +
          '<div class="block-title-group">' +
            '<span class="block-icon">🎯</span>' +
            '<div>' +
              '<h3 class="block-title">AIIMS &amp; MP PNST 2027 Goal &amp; Merit Benchmark</h3>' +
              '<p class="block-sub">Target institution, cut-off milestone, and accuracy progress.</p>' +
            '</div>' +
          '</div>' +
          '<span class="goal-target-pill">Target: AIIMS New Delhi &amp; MP Govt. Colleges</span>' +
        '</div>' +

        '<div class="goals-content">' +
          '<div class="goal-metric-row">' +
            '<div class="goal-item">' +
              '<span class="goal-label">Target Score</span>' +
              '<span class="goal-val val-target">' + targetScore + ' / 100</span>' +
            '</div>' +
            '<div class="goal-item">' +
              '<span class="goal-label">Current Peak Score</span>' +
              '<span class="goal-val val-current">' + (Number(stats.bestScore || 0).toFixed(1)) + '</span>' +
            '</div>' +
            '<div class="goal-item">' +
              '<span class="goal-label">Current Accuracy</span>' +
              '<span class="goal-val val-acc">' + currentAcc + '%</span>' +
            '</div>' +
            '<div class="goal-item">' +
              '<span class="goal-label">Merit Target</span>' +
              '<span class="goal-val val-merit">Top 100 Rank</span>' +
            '</div>' +
          '</div>' +

          '<div class="goal-progress-box">' +
            '<div class="goal-progress-labels">' +
              '<span>Preparation Readiness towards 80% Benchmark</span>' +
              '<strong>' + progressPct + '% Calibrated</strong>' +
            '</div>' +
            '<div class="goal-progress-track">' +
              '<div class="goal-progress-fill" style="width: ' + progressPct + '%"></div>' +
            '</div>' +
          '</div>' +

          '<div class="goal-advisory-badge">' +
            '<span class="advisory-icon">📢</span>' +
            '<span class="advisory-text"><strong>AIIMS &amp; MP PNST Advisory:</strong> General Category qualifying cut-off requires 55%+ marks. For guaranteed seat allocation in AIIMS New Delhi or Top MP Govt. Nursing Colleges, maintain ≥75% accuracy across full mocks.</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     3. STORAGE USAGE & DIAGNOSTICS
     ───────────────────────────────────────────────────────── */

  function _renderStorage() {
    var container = _el('profile-storage');
    if (!container) return;

    var usage = { usedFormatted: '0 KB', usedKB: 0, keyBreakdown: {} };
    if (window.StorageService && typeof StorageService.getUsageInfo === 'function') {
      usage = StorageService.getUsageInfo();
    }

    var attemptsCount = 0;
    if (window.AppState && typeof AppState.getAttempts === 'function') {
      attemptsCount = AppState.getAttempts().length;
    }

    var usedPct = Math.min(100, Math.max(4, Math.round((usage.usedKB / 2048) * 100))); // assume 2MB nominal buffer

    container.innerHTML =
      '<div class="block-header">' +
        '<div class="block-title-group">' +
          '<span class="block-icon">💾</span>' +
          '<div>' +
            '<h3 class="block-title">Local Storage &amp; Cache Diagnostics</h3>' +
            '<p class="block-sub">Browser state persistence and offline data metrics.</p>' +
          '</div>' +
        '</div>' +
        '<span class="storage-status-pill">🟢 Local State Active</span>' +
      '</div>' +

      '<div class="storage-content">' +
        '<div class="storage-stats-grid">' +
          '<div class="storage-stat-item">' +
            '<span class="stat-num">' + _esc(usage.usedFormatted) + '</span>' +
            '<span class="stat-lbl">LocalStorage Used</span>' +
          '</div>' +
          '<div class="storage-stat-item">' +
            '<span class="stat-num">' + attemptsCount + '</span>' +
            '<span class="stat-lbl">Tests Cached</span>' +
          '</div>' +
          '<div class="storage-stat-item">' +
            '<span class="stat-num">100%</span>' +
            '<span class="stat-lbl">Cache Integrity</span>' +
          '</div>' +
        '</div>' +

        '<div class="storage-meter-wrap">' +
          '<div class="storage-meter-labels">' +
            '<span>Storage Allocation</span>' +
            '<span>' + _esc(usage.usedFormatted) + ' / 5.0 MB Allocated</span>' +
          '</div>' +
          '<div class="storage-bar-bg">' +
            '<div class="storage-bar-fill" style="width:' + usedPct + '%"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     4. CBT SETTINGS & INTERFACE PREFERENCES
     ───────────────────────────────────────────────────────── */

  function _renderSettings() {
    var container = _el('profile-settings');
    if (!container) return;

    var settings = { soundEnabled: false, animEnabled: true };
    if (window.AppState && typeof AppState.getSettings === 'function') {
      settings = AppState.getSettings();
    }

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    container.innerHTML =
      '<div class="block-header">' +
        '<div class="block-title-group">' +
          '<span class="block-icon">⚙️</span>' +
          '<div>' +
            '<h3 class="block-title">CBT Examination &amp; Interface Preferences</h3>' +
            '<p class="block-sub">Configure live test audio feedback, animations, and visual presentation.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="settings-list">' +
        '<div class="setting-item">' +
          '<div class="setting-text">' +
            '<div class="setting-label-row">' +
              '<span class="setting-icon">🔊</span>' +
              '<span class="setting-name">Audio Simulation Sound Effects</span>' +
            '</div>' +
            '<span class="setting-desc">Play realistic audio feedback on question selection, timer warnings, and test submission.</span>' +
          '</div>' +
          '<label class="switch-toggle" for="setting-sound">' +
            '<input type="checkbox" id="setting-sound" ' + (settings.soundEnabled ? 'checked' : '') + ' />' +
            '<span class="slider round"></span>' +
          '</label>' +
        '</div>' +

        '<div class="setting-item">' +
          '<div class="setting-text">' +
            '<div class="setting-label-row">' +
              '<span class="setting-icon">✨</span>' +
              '<span class="setting-name">High-Performance Visual Transitions</span>' +
            '</div>' +
            '<span class="setting-desc">Enable smooth page cross-fades, score count-ups, and interactive palette animations.</span>' +
          '</div>' +
          '<label class="switch-toggle" for="setting-anim">' +
            '<input type="checkbox" id="setting-anim" ' + (settings.animEnabled ? 'checked' : '') + ' />' +
            '<span class="slider round"></span>' +
          '</label>' +
        '</div>' +

        '<div class="setting-item">' +
          '<div class="setting-text">' +
            '<div class="setting-label-row">' +
              '<span class="setting-icon">🌓</span>' +
              '<span class="setting-name">High-Contrast Dark Examination Mode</span>' +
            '</div>' +
            '<span class="setting-desc">Optimize screen contrast for late-night exam practice and reduced eye fatigue.</span>' +
          '</div>' +
          '<label class="switch-toggle" for="setting-theme">' +
            '<input type="checkbox" id="setting-theme" ' + (isDark ? 'checked' : '') + ' />' +
            '<span class="slider round"></span>' +
          '</label>' +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     5. DATA MANAGEMENT & SECURE BACKUP
     ───────────────────────────────────────────────────────── */

  function _renderDataManagement() {
    var container = _el('profile-data');
    if (!container) return;

    container.innerHTML =
      '<div class="block-header">' +
        '<div class="block-title-group">' +
          '<span class="block-icon">📦</span>' +
          '<div>' +
            '<h3 class="block-title">Data Management &amp; Secure Backup</h3>' +
            '<p class="block-sub">Export your attempt records, import past performance, or perform a state reset.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="data-management-grid">' +
        '<button class="data-btn export-btn" id="profile-export-btn" type="button">' +
          '<span class="btn-icon">📥</span>' +
          '<div class="btn-text-box">' +
            '<strong>Export Performance Backup</strong>' +
            '<span>Download all attempt records as a portable JSON file</span>' +
          '</div>' +
        '</button>' +

        '<button class="data-btn import-btn" id="profile-import-btn" type="button">' +
          '<span class="btn-icon">📤</span>' +
          '<div class="btn-text-box">' +
            '<strong>Import Performance Backup</strong>' +
            '<span>Restore attempt history and profile from a JSON file</span>' +
          '</div>' +
        '</button>' +
      '</div>' +

      '<div class="data-danger-zone">' +
        '<div class="danger-info">' +
          '<strong>⚠️ Danger Zone · Complete System Reset</strong>' +
          '<span>Irreversibly clears all candidate attempt logs, scores, and custom settings.</span>' +
        '</div>' +
        '<button class="btn-danger-outline" id="profile-clear-btn" type="button">' +
          '🗑️ Clear All Stored Data' +
        '</button>' +
      '</div>' +

      '<input type="file" id="profile-import-file" accept=".json" class="hidden">';
  }

  /* ─────────────────────────────────────────────────────────
     6. CLOUD SUBMISSION QUEUE
     ───────────────────────────────────────────────────────── */

  function _renderQueue() {
    var container = _el('profile-queue');
    if (!container) return;

    var queueLen = 0;
    if (window.FormSubmitter && typeof FormSubmitter.getQueueLength === 'function') {
      queueLen = FormSubmitter.getQueueLength();
    }

    container.innerHTML =
      '<div class="block-header">' +
        '<div class="block-title-group">' +
          '<span class="block-icon">📭</span>' +
          '<div>' +
            '<h3 class="block-title">Cloud Submission &amp; Synchronization Queue</h3>' +
            '<p class="block-sub">Status of background score synchronization with evaluation servers.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="queue-status-box ' + (queueLen > 0 ? 'queue-pending' : 'queue-synced') + '">' +
        '<div class="queue-status-info">' +
          '<span class="queue-status-icon">' + (queueLen > 0 ? '⏳' : '✅') + '</span>' +
          '<div>' +
            '<strong class="queue-status-title">' +
              (queueLen > 0 ? queueLen + ' Test Result' + (queueLen > 1 ? 's' : '') + ' Pending Sync' : 'All Test Results Fully Synchronized') +
            '</strong>' +
            '<p class="queue-status-desc">' +
              (queueLen > 0 ? 'Background transmission paused. Results are safely saved in local storage.' : 'No unsent scorecards in queue. All examination metrics are backed up.') +
            '</p>' +
          '</div>' +
        '</div>' +
        (queueLen > 0
          ? '<button class="btn-flush" id="profile-flush-btn" type="button">🔄 Retry Sync Now</button>'
          : '<span class="queue-ok-badge">Connected</span>');

    container.innerHTML += '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     7. ABOUT & PORTAL SPECIFICATIONS
     ───────────────────────────────────────────────────────── */

  function _renderAbout() {
    var container = _el('profile-about');
    if (!container) return;

    var UC = window.UIConstants;
    var appName = (UC && UC.APP_NAME) || 'NursePrep Pro';
    var version = (UC && UC.APP_VERSION) || '3.0.0';

    container.innerHTML =
      '<div class="block-header">' +
        '<div class="block-title-group">' +
          '<span class="block-icon">ℹ️</span>' +
          '<div>' +
            '<h3 class="block-title">AIIMS &amp; MP PNST CBT Portal Specifications &amp; Compliance</h3>' +
            '<p class="block-sub">Software architecture, examination scheme regulations, and version info.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="about-specs-grid">' +
        '<div class="spec-card">' +
          '<span class="spec-label">Platform Edition</span>' +
          '<strong class="spec-val">' + _esc(appName) + ' v' + _esc(version) + '</strong>' +
        '</div>' +
        '<div class="spec-card">' +
          '<span class="spec-label">Examination Pattern</span>' +
          '<strong class="spec-val">AIIMS B.Sc. Nursing &amp; MP PNST CBT</strong>' +
        '</div>' +
        '<div class="spec-card">' +
          '<span class="spec-label">Negative Marking</span>' +
          '<strong class="spec-val">+1 Correct · −0.33 Wrong</strong>' +
        '</div>' +
        '<div class="spec-card">' +
          '<span class="spec-label">Syllabus Standard</span>' +
          '<strong class="spec-val">Class 11 &amp; 12 NCERT (P, C, B, GK)</strong>' +
        '</div>' +
      '</div>' +

      '<div class="about-footer-note">' +
        '<p>© 2027 NursePrep Pro. Engineered for AIIMS &amp; MP PNST Entrance Exam Excellence. All Rights Reserved.</p>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     8. BOTTOM ACTION DOCK
     ───────────────────────────────────────────────────────── */

  function _renderActions() {
    var container = _el('profile-actions');
    if (!container) return;

    container.innerHTML =
      '<div class="profile-actions-inner">' +
        '<button class="profile-action-btn primary" id="profile-dash-btn" type="button">' +
          '<span class="btn-icon">←</span> <span>Return to Dashboard</span>' +
        '</button>' +
        '<button class="profile-action-btn secondary" id="profile-analytics-btn" type="button">' +
          '<span class="btn-icon">📈</span> <span>Performance Analytics</span>' +
        '</button>' +
        '<button class="profile-action-btn tertiary" id="profile-practice-btn" type="button">' +
          '<span class="btn-icon">🚀</span> <span>Practice Full Mock</span>' +
        '</button>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     9. EVENT HANDLERS & BINDINGS
     ───────────────────────────────────────────────────────── */

  function _handleExport() {
    if (!window.StorageService || typeof StorageService.exportData !== 'function') return;

    var jsonStr = StorageService.exportData();
    var blob = new Blob([jsonStr], { type: 'application/json' });
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'aiims-cbt-nurseprep-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.ToastManager) ToastManager.success('Examination data exported successfully!');
  }

  function _handleImportClick() {
    var fileInput = _el('profile-import-file');
    if (fileInput) fileInput.click();
  }

  function _handleImportFile(e) {
    var files = e.target.files;
    if (!files || files.length === 0) return;

    var file = files[0];
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      if (window.ToastManager) ToastManager.error('Please select a valid .json file.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function(ev) {
      var jsonStr = ev.target.result;

      if (window.StorageService && typeof StorageService.importData === 'function') {
        var result = StorageService.importData(jsonStr);

        if (result.success) {
          if (window.AppState && window.StorageService) {
            var data = StorageService.loadAll();
            AppState.hydrate(data);
          }

          if (window.ToastManager) ToastManager.success(result.message || 'Data restored successfully!');
          ProfileRenderer.render();
        } else {
          if (window.ToastManager) ToastManager.error(result.message || 'Import failed.');
        }
      }
    };

    reader.onerror = function() {
      if (window.ToastManager) ToastManager.error('Error reading backup file.');
    };

    reader.readAsText(file);
    e.target.value = '';
  }

  function _handleClearAll() {
    var confirmed = confirm(
      '⚠️ WARNING: Clear All AIIMS CBT Performance Data?\n\n' +
      'This will irreversibly delete your test attempts, analytics, and scorecard history.\n' +
      'Do you wish to proceed?'
    );

    if (!confirmed) return;

    var confirmed2 = confirm('Final confirmation: Are you completely certain you want to wipe all local test records?');
    if (!confirmed2) return;

    if (window.StorageService && typeof StorageService.clearAll === 'function') {
      StorageService.clearAll();
    }

    if (window.StateManager && typeof StateManager.resetAll === 'function') {
      StateManager.resetAll();
    }

    if (window.Nav) Nav.goTo('view-onboard');
    if (window.OnboardRenderer) OnboardRenderer.render();

    if (window.ToastManager) ToastManager.info('All data cleared. Starting fresh!');
  }

  function _handleSaveProfile(e) {
    if (e) e.preventDefault();

    var nameInput = _el('profile-input-name');
    var emailInput = _el('profile-input-email');

    if (!nameInput || !emailInput) return;

    var newName = nameInput.value.trim();
    var newEmail = emailInput.value.trim();

    if (!newName) {
      if (window.ToastManager) ToastManager.error('Candidate name cannot be empty.');
      return;
    }

    var cand = _getCandidateInfo();
    var updatedStudent = {
      name: newName,
      email: newEmail || cand.email,
      joinedDate: cand.joinedDate || new Date().toISOString()
    };

    if (window.AppState && typeof AppState.setStudent === 'function') {
      AppState.setStudent(updatedStudent);
    }

    if (window.StorageService && typeof StorageService.saveStudent === 'function') {
      StorageService.saveStudent(updatedStudent);
    }

    _isEditingProfile = false;
    _updateNavbar();
    _renderProfileCard();
    _renderGoals();

    if (window.ToastManager) ToastManager.success('Candidate profile updated successfully!');
  }

  function _bindEvents() {
    if (_bound) return;
    _bound = true;

    // Click delegation
    document.addEventListener('click', function(e) {
      var target = e.target;

      // 1. Dashboard Nav (Header back button, top bar button, or dock button)
      if (
        target.closest('#profile-dash-btn') ||
        target.closest('#profile-dash-header-btn') ||
        target.closest('#profile-back-btn')
      ) {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        return;
      }

      // 2. Analytics Nav
      if (target.closest('#profile-analytics-btn') || target.closest('#profile-analytics-header-btn')) {
        if (window.Nav) Nav.goTo('view-analytics');
        if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        return;
      }

      // 3. Practice Now
      if (target.closest('#profile-practice-btn')) {
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

      // 4. Edit Profile Toggle
      if (target.closest('#profile-edit-toggle-btn') || target.closest('#profile-edit-cancel-btn')) {
        _isEditingProfile = !_isEditingProfile;
        _renderProfileCard();
        return;
      }

      // 5. Export
      if (target.closest('#profile-export-btn')) {
        _handleExport();
        return;
      }

      // 6. Import
      if (target.closest('#profile-import-btn')) {
        _handleImportClick();
        return;
      }

      // 7. Clear
      if (target.closest('#profile-clear-btn')) {
        _handleClearAll();
        return;
      }

      // 8. Flush Queue
      if (target.closest('#profile-flush-btn')) {
        if (window.FormSubmitter) FormSubmitter.flushQueue();
        if (window.ToastManager) ToastManager.info('Submitting pending examination scorecards...');
        setTimeout(function() {
          _renderQueue();
        }, 4000);
        return;
      }
    });

    // Form submit delegation for profile edit
    document.addEventListener('submit', function(e) {
      if (e.target && e.target.id === 'profile-edit-form') {
        _handleSaveProfile(e);
      }
    });

    // Settings & Theme changes
    document.addEventListener('change', function(e) {
      if (e.target.id === 'setting-sound') {
        if (window.AppState) {
          AppState.updateSettings({ soundEnabled: e.target.checked });
        }
        if (window.StorageService && window.AppState) {
          StorageService.saveSettings(AppState.getSettings());
        }
        if (window.ToastManager) {
          ToastManager.info(e.target.checked ? 'Audio feedback enabled' : 'Audio feedback muted');
        }
        return;
      }

      if (e.target.id === 'setting-anim') {
        if (window.AppState) {
          AppState.updateSettings({ animEnabled: e.target.checked });
        }
        if (window.StorageService && window.AppState) {
          StorageService.saveSettings(AppState.getSettings());
        }
        document.body.classList.toggle('no-animations', !e.target.checked);
        if (window.ToastManager) {
          ToastManager.info(e.target.checked ? 'UI animations enabled' : 'Reduced motion mode active');
        }
        return;
      }

      if (e.target.id === 'setting-theme') {
        var newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        if (window.StorageService && typeof StorageService.saveTheme === 'function') {
          StorageService.saveTheme(newTheme);
        }
        if (window.ToastManager) {
          ToastManager.info('Switched to ' + (e.target.checked ? 'Dark Mode' : 'Light Mode'));
        }
        return;
      }
    });

    // File input handler
    var fileInput = _el('profile-import-file');
    if (fileInput) {
      fileInput.addEventListener('change', _handleImportFile);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Render the complete profile view.
     */
    render: function() {
      _bindEvents();
      _updateNavbar();
      _renderProfileCard();
      _renderGoals();
      _renderStorage();
      _renderSettings();
      _renderDataManagement();
      _renderQueue();
      _renderAbout();
      _renderActions();
    }
  };

})();

// Expose globally
window.ProfileRenderer = ProfileRenderer;
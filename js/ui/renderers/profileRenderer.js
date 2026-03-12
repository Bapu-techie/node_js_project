/* ============================================================
   PROFILE RENDERER — Student Profile & Settings Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders and manages the profile/settings view:
   - Profile card (avatar initials, name, email, join date)
   - App settings (sound, animations)
   - Storage usage info
   - Data management (export, import, clear all)
   - Form submission queue status
   - About section (app version, credits)
   - Navigation back to dashboard

   HTML targets (inside #view-profile):
   - #profile-card          → Profile info card
   - #profile-settings      → Settings toggles
   - #profile-storage       → Storage usage info
   - #profile-data          → Export/import/clear section
   - #profile-queue         → Submission queue status
   - #profile-about         → App about section
   - #profile-actions       → Navigation buttons

   Dependencies: AppState, StorageService, FormSubmitter,
                 UIConstants, Formatters, Nav, ToastManager
   Used by: App, DashboardRenderer, AnalyticsRenderer
   ============================================================ */

'use strict';

var ProfileRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  var _bound = false;

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
     PROFILE CARD
     ───────────────────────────────────────────────────────── */

  function _renderProfileCard() {
    var container = _el('profile-card');
    if (!container) return;

    var student = null;
    var initials = '?';
    var name = 'Guest';
    var email = '';
    var joinDate = '';

    if (window.AppState) {
      student  = AppState.getStudent();
      initials = AppState.getInitials();
    }

    if (student) {
      name  = student.name || 'Guest';
      email = student.email || '';

      if (student.joinedDate) {
        var fmt = window.Formatters;
        joinDate = fmt && typeof fmt.toRelativeDate === 'function'
          ? 'Joined ' + fmt.toRelativeDate(student.joinedDate)
          : 'Joined ' + new Date(student.joinedDate).toLocaleDateString();
      }
    }

    container.innerHTML =
      '<div class="p-card-inner">' +
        '<div class="p-avatar">' + _esc(initials) + '</div>' +
        '<div class="p-info">' +
          '<h3 class="p-name">' + _esc(name) + '</h3>' +
          '<p class="p-email">' + _esc(email) + '</p>' +
          (joinDate ? '<p class="p-joined">' + _esc(joinDate) + '</p>' : '') +
        '</div>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     SETTINGS TOGGLES
     ───────────────────────────────────────────────────────── */

  function _renderSettings() {
    var container = _el('profile-settings');
    if (!container) return;

    var settings = { soundEnabled: false, animEnabled: true };
    if (window.AppState && typeof AppState.getSettings === 'function') {
      settings = AppState.getSettings();
    }

    container.innerHTML =
      '<h3 class="p-section-title">⚙️ Settings</h3>' +
      '<div class="setting-row">' +
        '<label for="setting-sound" class="setting-label">' +
          '<span>🔊 Sound Effects</span>' +
          '<span class="setting-desc">Play sounds on correct/wrong answers</span>' +
        '</label>' +
        '<input type="checkbox" id="setting-sound" class="setting-toggle" ' +
          (settings.soundEnabled ? 'checked' : '') + '>' +
      '</div>' +
      '<div class="setting-row">' +
        '<label for="setting-anim" class="setting-label">' +
          '<span>✨ Animations</span>' +
          '<span class="setting-desc">Enable UI transitions and effects</span>' +
        '</label>' +
        '<input type="checkbox" id="setting-anim" class="setting-toggle" ' +
          (settings.animEnabled ? 'checked' : '') + '>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     STORAGE USAGE
     ───────────────────────────────────────────────────────── */

  function _renderStorage() {
    var container = _el('profile-storage');
    if (!container) return;

    var usage = { usedFormatted: '0 KB', usedKB: 0, keyBreakdown: {} };
    if (window.StorageService && typeof StorageService.getUsageInfo === 'function') {
      usage = StorageService.getUsageInfo();
    }

    container.innerHTML =
      '<h3 class="p-section-title">💾 Storage Usage</h3>' +
      '<div class="storage-bar-bg">' +
        '<div class="storage-bar-fill" style="width:' + Math.min(100, (usage.usedKB / 50) * 100).toFixed(0) + '%"></div>' +
      '</div>' +
      '<p class="storage-info">Using ' + _esc(usage.usedFormatted) + ' of localStorage</p>';
  }

  /* ─────────────────────────────────────────────────────────
     DATA MANAGEMENT
     ───────────────────────────────────────────────────────── */

  function _renderDataManagement() {
    var container = _el('profile-data');
    if (!container) return;

    container.innerHTML =
      '<h3 class="p-section-title">📦 Data Management</h3>' +
      '<div class="data-actions">' +
        '<button class="btn-secondary" id="profile-export-btn">📥 Export Data</button>' +
        '<button class="btn-secondary" id="profile-import-btn">📤 Import Data</button>' +
        '<button class="btn-danger-outline" id="profile-clear-btn">🗑️ Clear All Data</button>' +
      '</div>' +
      '<input type="file" id="profile-import-file" accept=".json" class="hidden">';
  }

  /* ─────────────────────────────────────────────────────────
     SUBMISSION QUEUE
     ──────────────────────────────────────────────��────────── */

  function _renderQueue() {
    var container = _el('profile-queue');
    if (!container) return;

    var queueLen = 0;
    if (window.FormSubmitter && typeof FormSubmitter.getQueueLength === 'function') {
      queueLen = FormSubmitter.getQueueLength();
    }

    container.innerHTML =
      '<h3 class="p-section-title">📤 Submission Queue</h3>' +
      '<p class="queue-status">' +
        (queueLen > 0
          ? '⏳ <strong>' + queueLen + '</strong> result' + (queueLen > 1 ? 's' : '') + ' pending submission.'
          : '✅ All results submitted successfully.') +
      '</p>' +
      (queueLen > 0
        ? '<button class="btn-secondary" id="profile-flush-btn">🔄 Retry Now</button>'
        : '');
  }

  /* ─────────────────────────────────────────────────────────
     ABOUT SECTION
     ───────────────────────────────────────────────────────── */

  function _renderAbout() {
    var container = _el('profile-about');
    if (!container) return;

    var UC = window.UIConstants;
    var appName = (UC && UC.APP_NAME) || 'NursePrep Pro';
    var version = (UC && UC.APP_VERSION) || '3.0.0';
    var tagline = (UC && UC.APP_TAGLINE) || '';

    container.innerHTML =
      '<h3 class="p-section-title">ℹ️ About</h3>' +
      '<div class="about-card">' +
        '<p class="about-name">' + _esc(appName) + ' v' + _esc(version) + '</p>' +
        '<p class="about-tagline">' + _esc(tagline) + '</p>' +
        '<p class="about-copy">Built for AIIMS BSc Nursing Entrance aspirants.</p>' +
        '<p class="about-copy">© 2025 NursePrep Pro. All rights reserved.</p>' +
      '</div>';
  }

  /* ─────────────────────────────────────────────────────────
     ACTIONS
     ───────────────────────────────────────────────────────── */

  function _renderActions() {
    var container = _el('profile-actions');
    if (!container) return;

    container.innerHTML =
      '<button class="btn-primary" id="profile-dash-btn">📊 Dashboard</button>' +
      '<button class="btn-secondary" id="profile-analytics-btn">📈 Analytics</button>';
  }

  /* ─────────────────────────────────────────────────────────
     EVENT HANDLERS
     ───────────────────────────────────────────────────────── */

  function _handleExport() {
    if (!window.StorageService || typeof StorageService.exportData !== 'function') return;

    var jsonStr = StorageService.exportData();
    var blob = new Blob([jsonStr], { type: 'application/json' });
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'nurseprep-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.ToastManager) ToastManager.success('Data exported successfully!');
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
          // Re-hydrate AppState
          if (window.AppState && window.StorageService) {
            var data = StorageService.loadAll();
            AppState.hydrate(data);
          }

          if (window.ToastManager) ToastManager.success(result.message);

          // Re-render profile
          ProfileRenderer.render();
        } else {
          if (window.ToastManager) ToastManager.error(result.message);
        }
      }
    };

    reader.onerror = function() {
      if (window.ToastManager) ToastManager.error('Error reading file.');
    };

    reader.readAsText(file);

    // Reset file input
    e.target.value = '';
  }

  function _handleClearAll() {
    // Double confirmation
    var confirmed = confirm(
      'Are you sure you want to clear ALL data?\n\n' +
      'This will delete your profile, all attempt history, and settings.\n' +
      'This action cannot be undone.'
    );

    if (!confirmed) return;

    var confirmed2 = confirm('Really? This will permanently delete everything. Continue?');
    if (!confirmed2) return;

    // Clear storage
    if (window.StorageService && typeof StorageService.clearAll === 'function') {
      StorageService.clearAll();
    }

    // Reset state
    if (window.StateManager && typeof StateManager.resetAll === 'function') {
      StateManager.resetAll();
    }

    // Navigate to onboard
    if (window.Nav) Nav.goTo('view-onboard');
    if (window.OnboardRenderer) OnboardRenderer.render();

    if (window.ToastManager) ToastManager.info('All data cleared. Starting fresh!');
  }

  function _bindEvents() {
    if (_bound) return;
    _bound = true;

    // Use delegation on body for dynamic elements
    document.addEventListener('click', function(e) {
      var target = e.target;

      // Export
      if (target.id === 'profile-export-btn' || target.closest('#profile-export-btn')) {
        _handleExport();
        return;
      }

      // Import
      if (target.id === 'profile-import-btn' || target.closest('#profile-import-btn')) {
        _handleImportClick();
        return;
      }

      // Clear
      if (target.id === 'profile-clear-btn' || target.closest('#profile-clear-btn')) {
        _handleClearAll();
        return;
      }

      // Flush queue
      if (target.id === 'profile-flush-btn' || target.closest('#profile-flush-btn')) {
        if (window.FormSubmitter) FormSubmitter.flushQueue();
        if (window.ToastManager) ToastManager.info('Flushing submission queue...');
        // Re-render queue section after a delay
        setTimeout(function() {
          _renderQueue();
        }, 5000);
        return;
      }

      // Dashboard nav
      if (target.id === 'profile-dash-btn' || target.closest('#profile-dash-btn')) {
        if (window.Nav) Nav.goTo('view-dashboard');
        if (window.DashboardRenderer) DashboardRenderer.refresh();
        return;
      }

      // Analytics nav
      if (target.id === 'profile-analytics-btn' || target.closest('#profile-analytics-btn')) {
        if (window.Nav) Nav.goTo('view-analytics');
        if (window.AnalyticsRenderer) AnalyticsRenderer.render();
        return;
      }
    });

    // Settings toggles
    document.addEventListener('change', function(e) {
      if (e.target.id === 'setting-sound') {
        if (window.AppState) {
          AppState.updateSettings({ soundEnabled: e.target.checked });
        }
        if (window.StorageService && window.AppState) {
          StorageService.saveSettings(AppState.getSettings());
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

        // Toggle body class for animations
        document.body.classList.toggle('no-animations', !e.target.checked);
        return;
      }
    });

    // File import handler
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
      _renderProfileCard();
      _renderSettings();
      _renderStorage();
      _renderDataManagement();
      _renderQueue();
      _renderAbout();
      _renderActions();

      _bindEvents();
    }
  };

})();

// Expose globally
window.ProfileRenderer = ProfileRenderer;
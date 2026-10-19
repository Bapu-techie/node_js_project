/* ============================================================
   UI CONSTANTS — User Interface Configuration Values
   NursePrep Pro v3.0

   Centralized constants for UI behavior, limits, and content.
   Referenced by renderers, Nav, ToastManager, App controller.

   Categories:
   - View identifiers
   - Toast settings
   - Navigation settings
   - Dashboard limits
   - Modal identifiers
   - Palette settings
   - Greeting messages
   - App metadata
   ============================================================ */

'use strict';

var UIConstants = {

  /* ═══════════════════════════════════════════════════════════
     VIEW IDENTIFIERS
     ═══════════════════════════════════════════════════════════ */

  /** All registered view element IDs */
  VIEWS: {
    ONBOARD:   'view-onboard',
    DASHBOARD: 'view-dashboard',
    EXAM:      'view-exam',
    RESULT:    'view-result',
    ANALYTICS: 'view-analytics',
    PROFILE:   'view-profile'
  },

  /** Ordered array of all view IDs */
  VIEW_LIST: [
    'view-onboard',
    'view-dashboard',
    'view-exam',
    'view-result',
    'view-analytics',
    'view-profile'
  ],

  /** View titles for browser history / document.title */
  VIEW_TITLES: {
    'view-onboard':   'NursePrep Pro — AIIMS & MP PNST 2027 Entrance',
    'view-dashboard': 'NursePrep Pro — Dashboard | AIIMS & MP PNST 2027',
    'view-exam':      'NursePrep Pro — Live Exam Console | AIIMS & MP PNST 2027',
    'view-result':    'NursePrep Pro — Official Scorecard | AIIMS & MP PNST 2027',
    'view-analytics': 'NursePrep Pro — Performance Analytics | AIIMS & MP PNST 2027',
    'view-profile':   'NursePrep Pro — Profile & Settings | AIIMS & MP PNST 2027'
  },

  /* ═══════════════════════════════════════════════════════════
     TOAST SETTINGS
     ═══════════════════════════════════════════════════════════ */

  /** Maximum number of simultaneous visible toasts */
  TOAST_MAX_VISIBLE: 3,

  /** Default toast display duration (ms) */
  TOAST_DEFAULT_DURATION: 3000,

  /** Toast duration for errors (longer) */
  TOAST_ERROR_DURATION: 4000,

  /** Toast duration for quick confirmations (shorter) */
  TOAST_QUICK_DURATION: 1500,

  /** Toast icons by type */
  TOAST_ICONS: {
    info:    'ℹ️',
    success: '✅',
    error:   '❌',
    warning: '⚠️'
  },

  /** Toast exit animation duration (ms) — must match CSS */
  TOAST_EXIT_ANIMATION_MS: 300,

  /* ═══════════════════════════════════════════════════════════
     NAVIGATION
     ═══════════════════════════════════════════════════════════ */

  /** Views that support browser back navigation */
  NAVIGABLE_VIEWS: [
    'view-onboard',
    'view-dashboard',
    'view-result',
    'view-analytics',
    'view-profile'
  ],

  /** Views where back button is blocked (with warning) */
  BACK_BLOCKED_VIEWS: ['view-exam'],

  /** Scroll areas to reset when switching views */
  SCROLL_AREAS: {
    'view-dashboard': '.dash-scroll',
    'view-exam':      '.question-area',
    'view-result':    '.result-scroll',
    'view-analytics': '.analytics-scroll',
    'view-profile':   '.profile-scroll'
  },

  /* ═══════════════════════════════════════════════════════════
     DASHBOARD LIMITS
     ═══════════════════════════════════════════════════════════ */

  /** Maximum recent attempts shown in history table */
  HISTORY_MAX_DISPLAY: 50,

  /** Filter options for test list */
  FILTER_OPTIONS: [
    { key: 'all',     label: 'All Tests',     icon: '📚' },
    { key: 'multi',   label: 'Multi & 100Q',  icon: '🔗' },
    { key: 'mock',    label: 'AIIMS Mocks',   icon: '🎯' },
    { key: 'subject', label: 'Subject Tests', icon: '🧪' },
    { key: 'topic',   label: 'Topic Tests',   icon: '📝' },
    { key: 'quick',   label: 'Speed Drills',  icon: '⚡' }
  ],

  /* ═══════════════════════════════════════════════════════════
     MODAL IDENTIFIERS
     ═══════════════════════════════════════════════════════════ */

  MODALS: {
    SUBMIT:   'submitModal',
    PALETTE:  'paletteModal',
    CONFIRM:  'confirmModal',
    PROFILE:  'profileModal'
  },

  /* ════════════════════════════��══════════════════════════════
     PALETTE SETTINGS
     ═══════════════════════════════════════════════════════════ */

  /** Number of columns in the palette grid (mobile) */
  PALETTE_COLS_MOBILE: 6,

  /** Number of columns in the palette grid (desktop sidebar) */
  PALETTE_COLS_DESKTOP: 5,

  /** Palette button state CSS classes */
  PALETTE_STATES: {
    CURRENT:    'current',
    ANSWERED:   'answered',
    REVIEW:     'review',
    UNANSWERED: ''
  },

  /* ═══════════════════════════════════════════════════════════
     GREETINGS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Time-of-day greetings for the welcome card.
   * Each entry: { startHour, endHour, text }
   */
  GREETINGS: [
    { start: 0,  end: 5,  text: 'Good night 🌙' },
    { start: 5,  end: 12, text: 'Good morning ☀️' },
    { start: 12, end: 17, text: 'Good afternoon 🌤️' },
    { start: 17, end: 21, text: 'Good evening 🌅' },
    { start: 21, end: 24, text: 'Good night 🌙' }
  ],

  /* ═══════════════════════════════════════════════════════════
     APP METADATA
     ═══════════════════════════════════════════════════════════ */

  APP_NAME:     'NursePrep Pro',
  APP_VERSION:  '3.0.0',
  APP_TAGLINE:  'AIIMS Nursing & MP PNST 2027 Exam Preparation Platform',
  APP_LOGO:     '🏥',

  /** Formspree endpoint for result submission */
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xbdzgnbe',

  /* ═══════════════════════════════════════════════════════════
     STORAGE KEYS
     ═══════════════════════════════════════════════════════════ */

  STORAGE_KEYS: {
    STUDENT:      'npp_student_v3',
    ATTEMPTS:     'npp_attempts_v3',
    SETTINGS:     'npp_settings_v3',
    SUBMIT_QUEUE: 'npp_submit_queue_v3',
    THEME:        'npp_theme_v3'
  },

  /** Maximum attempts stored in localStorage */
  MAX_STORED_ATTEMPTS: 200,

  /** Maximum items in form submission queue */
  MAX_SUBMIT_QUEUE: 20,

  /* ═══════════════════════════════════════════════════════════
     FORM SUBMISSION
     ═══════════════════════════════════════════════════════════ */

  /** Maximum retry attempts for form submission */
  FORM_MAX_RETRIES: 3,

  /** Base delay for exponential backoff (ms) */
  FORM_BASE_DELAY: 1000,

  /** Minimum interval between form submissions (ms) */
  FORM_RATE_LIMIT: 10000,

  /** Delay before flushing queue on coming back online (ms) */
  FORM_ONLINE_FLUSH_DELAY: 3000,

  /* ═══════════════════════════════════════════════════════════
     HELPER METHODS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Get the time-of-day greeting.
   * @returns {string}
   */
  getGreeting: function() {
    var hour = new Date().getHours();
    for (var i = 0; i < this.GREETINGS.length; i++) {
      var g = this.GREETINGS[i];
      if (hour >= g.start && hour < g.end) return g.text;
    }
    return 'Hello 👋';
  },

  /**
   * Get the page title for a given view.
   * @param {string} viewId
   * @returns {string}
   */
  getViewTitle: function(viewId) {
    return this.VIEW_TITLES[viewId] || this.APP_NAME;
  },

  /**
   * Check if a view blocks back navigation.
   * @param {string} viewId
   * @returns {boolean}
   */
  isBackBlocked: function(viewId) {
    return this.BACK_BLOCKED_VIEWS.indexOf(viewId) !== -1;
  },

  /**
   * Get the scroll area selector for a view.
   * @param {string} viewId
   * @returns {string|null}
   */
  getScrollArea: function(viewId) {
    return this.SCROLL_AREAS[viewId] || null;
  }
};

// Expose globally
window.UIConstants = UIConstants;
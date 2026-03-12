/* ============================================================
   NAV — View Navigation Controller
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Manages single-page view switching with:
   - Show/hide view containers by ID
   - Document title updates
   - Scroll position reset per view
   - Browser history (pushState) for back/forward
   - Back-navigation blocking during active exams
   - AppState synchronization
   - Screen reader announcements on view change
   - Focus management (blur before hide, focus after show)
   - inert attribute management (blocks all interaction on hidden views)

   Views (6 total):
   - view-onboard    → First-time registration
   - view-dashboard  → Test list, history, stats
   - view-exam       → Active exam interface
   - view-result     → Post-exam results
   - view-analytics  → Performance analytics
   - view-profile    → Profile & settings

   Dependencies: UIConstants, AppState, ExamState
   Used by: App, ExamEngine, all renderers
   ============================================================ */

   'use strict';

   var Nav = (function () {
   
     /* ═══════════════════════════════════════════════════════════
        PRIVATE STATE
        ═══════════════════════════════════════════════════════════ */
   
     var _currentView = '';
     var _initialized = false;
   
   
     /* ═══════════════════════════════════════════════════════════
        PRIVATE HELPERS
        ═══════════════════════════════════════════════════════════ */
   
     /**
      * Get all registered view IDs.
      * Falls back to hardcoded list if UIConstants not loaded yet.
      * @returns {Array<string>}
      */
     function _getViewList() {
       if (window.UIConstants && Array.isArray(UIConstants.VIEW_LIST)) {
         return UIConstants.VIEW_LIST;
       }
       return [
         'view-onboard', 'view-dashboard', 'view-exam',
         'view-result',  'view-analytics', 'view-profile'
       ];
     }
   
     /**
      * Get document title for a view.
      * @param {string} viewId
      * @returns {string}
      */
     function _getTitle(viewId) {
       if (window.UIConstants && typeof UIConstants.getViewTitle === 'function') {
         return UIConstants.getViewTitle(viewId);
       }
       // Fallback titles if UIConstants not loaded
       var titles = {
         'view-onboard':   'NursePrep Pro — Get Started',
         'view-dashboard': 'NursePrep Pro — Dashboard',
         'view-exam':      'NursePrep Pro — Exam',
         'view-result':    'NursePrep Pro — Results',
         'view-analytics': 'NursePrep Pro — Analytics',
         'view-profile':   'NursePrep Pro — Profile'
       };
       return titles[viewId] || 'NursePrep Pro';
     }
   
     /**
      * Get scroll area selector for a view.
      * @param {string} viewId
      * @returns {string|null}
      */
     function _getScrollArea(viewId) {
       if (window.UIConstants && typeof UIConstants.getScrollArea === 'function') {
         return UIConstants.getScrollArea(viewId);
       }
       // Fallback scroll areas
       var areas = {
         'view-dashboard': '.dash-container',
         'view-result':    '.result-container',
         'view-analytics': '.analytics-container',
         'view-profile':   '.profile-container'
       };
       return areas[viewId] || null;
     }
   
     /**
      * Check if back navigation should be blocked.
      * Blocked only during an active, unsubmitted exam.
      * @param {string} viewId
      * @returns {boolean}
      */
     function _isBackBlocked(viewId) {
       if (window.UIConstants && typeof UIConstants.isBackBlocked === 'function') {
         return UIConstants.isBackBlocked(viewId);
       }
       return viewId === 'view-exam';
     }
   
     /**
      * Announce the view change to screen readers.
      * Uses a visually-hidden aria-live region injected into the DOM.
      * The #sr-announcement div should exist in index.html.
      * If it doesn't, this function creates it automatically.
      * @param {string} viewId
      */
     function _announceView(viewId) {
       var title = _getTitle(viewId);
   
       // Find existing announcement region
       var el = document.getElementById('sr-announcement');
   
       // If index.html doesn't have it, create it once
       if (!el) {
         el = document.createElement('div');
         el.id = 'sr-announcement';
         el.setAttribute('aria-live', 'polite');
         el.setAttribute('aria-atomic', 'true');
         // .sr-only class from reset.css hides it visually
         el.className = 'sr-only';
         document.body.appendChild(el);
       }
   
       // Clear first so repeated navigation to same view still fires
       el.textContent = '';
       // Small timeout ensures screen reader detects the content change
       setTimeout(function () {
         el.textContent = 'Navigated to ' + title;
       }, 100);
     }
   
     /**
      * Hide ALL view containers.
      *
      * THREE things happen to each hidden view:
      * 1. blur()         — moves focus away BEFORE hiding (fixes aria-hidden + focus error)
      * 2. aria-hidden    — hides from screen readers
      * 3. inert          — blocks ALL clicks, keyboard, and pointer events
      *
      * Without inert: inputs and buttons on hidden views can still
      * accidentally receive focus via tab key causing confusing UX.
      */
     function _hideAll() {
       var views = _getViewList();
       for (var i = 0; i < views.length; i++) {
         var el = document.getElementById(views[i]);
         if (!el) continue;
   
         // ── STEP 1: Move focus away BEFORE hiding ──────────────
         // Critical: if a button/input inside this view has focus
         // and we set aria-hidden without blurring first,
         // the browser throws:
         // "Blocked aria-hidden on element because its descendant retained focus"
         // This was the exact error in the console screenshot.
         var focused = el.querySelector(':focus');
         if (focused) {
           focused.blur();
         }
   
         // ── STEP 2: Hide visually ──────────────────────────────
         el.classList.add('hidden');
   
         // ── STEP 3: Hide from screen readers ──────────────────
         el.setAttribute('aria-hidden', 'true');
   
         // ── STEP 4: Block ALL interaction ─────────────────────
         // inert prevents: tab focus, click events, pointer events,
         // form submission, keyboard shortcuts — everything.
         // This is why inputs were unclickable:
         // index.html correctly sets inert on hidden views,
         // but the old _showView() never removed it.
         el.setAttribute('inert', '');
       }
     }
   
     /**
      * Show a specific view container.
      *
      * THREE things must be undone from _hideAll():
      * 1. Remove .hidden      — makes view visible
      * 2. Remove aria-hidden  — restores to screen readers
      * 3. Remove inert        — THIS WAS MISSING in the old code.
      *                          Without removing inert, the view
      *                          appears on screen but NOTHING is
      *                          clickable or typeable. This was the
      *                          root cause of the unclickable inputs bug.
      *
      * @param {string} viewId
      */
     function _showView(viewId) {
       var el = document.getElementById(viewId);
       if (!el) {
         console.error('[Nav] Cannot show view — element not found:', viewId);
         return;
       }
   
       // ── STEP 1: Show visually ──────────────────────────────
       el.classList.remove('hidden');
   
       // ── STEP 2: Restore to screen readers ─────────────────
       // IMPORTANT: Use removeAttribute, NOT setAttribute('aria-hidden','false')
       // The string 'false' does NOT reliably work across all screen readers.
       // Removing the attribute entirely is the correct approach.
       el.removeAttribute('aria-hidden');
   
       // ── STEP 3: Restore ALL interaction ───────────────────
       // THIS WAS THE MISSING LINE causing unclickable inputs + button.
       // inert was set in index.html on all hidden views, and
       // the old _showView() never removed it.
       // Result: view looked visible but was completely non-interactive.
       el.removeAttribute('inert');
   
       // ── STEP 4: Move focus to first interactive element ───
       // Improves keyboard navigation and screen reader UX.
       // Timeout ensures the DOM is fully painted before focusing.
       setTimeout(function () {
         // Priority: first input, then first button, then anything focusable
         var firstFocusable = el.querySelector(
           'input:not([disabled]):not([type="hidden"]),' +
           'select:not([disabled]),' +
           'textarea:not([disabled]),' +
           'button:not([disabled]),' +
           '[href],' +
           '[tabindex]:not([tabindex="-1"])'
         );
         if (firstFocusable) {
           firstFocusable.focus({ preventScroll: true });
         }
       }, 50);
     }
   
     /**
      * Reset scroll position for the view's scroll container.
      * Also resets window scroll as a fallback.
      * @param {string} viewId
      */
     function _resetScroll(viewId) {
       var selector = _getScrollArea(viewId);
       if (selector) {
         var scrollEl = document.querySelector(selector);
         if (scrollEl) {
           scrollEl.scrollTop = 0;
         }
       }
       window.scrollTo(0, 0);
     }
   
     /**
      * Handle browser back/forward button (popstate event).
      * Blocks navigation if exam is active.
      * @param {PopStateEvent} e
      */
     function _onPopState(e) {
       var state = e.state;
       if (!state || !state.view) return;
   
       var targetView = state.view;
   
       // Block back during active exam
       if (_isBackBlocked(_currentView)) {
         // Re-push current state so the URL doesn't change
         history.pushState({ view: _currentView }, '', '');
         if (window.ToastManager) {
           ToastManager.show('Submit or exit the exam first.', 'warning');
         }
         return;
       }
   
       // Navigate without pushing another history entry
       _navigateTo(targetView, false);
     }
   
     /**
      * Core navigation logic — called by all public methods.
      *
      * Sequence:
      * 1. Validate view exists
      * 2. Update internal state
      * 3. Hide all views (with blur + aria-hidden + inert)
      * 4. Show target view (remove hidden + aria-hidden + inert)
      * 5. Reset scroll
      * 6. Update document title
      * 7. Push browser history (optional)
      * 8. Sync AppState
      * 9. Announce to screen readers
      * 10. Fire nav:viewChanged custom event
      *
      * @param {string}  viewId       - Target view ID
      * @param {boolean} pushHistory  - Whether to push a history entry
      */
     function _navigateTo(viewId, pushHistory) {
   
       // No-op if already on this view
       if (viewId === _currentView) return;
   
       // Validate the target view exists in our list
       var views = _getViewList();
       if (views.indexOf(viewId) === -1) {
         console.warn('[Nav] Unknown view ID:', viewId, '— navigation cancelled.');
         return;
       }
   
       var previousView = _currentView;
       _currentView = viewId;
   
       // ── 3. Hide all views ──
       _hideAll();
   
       // ── 4. Show target view ──
       _showView(viewId);
   
       // ── 5. Reset scroll ──
       _resetScroll(viewId);
   
       // ── 6. Document title ──
       document.title = _getTitle(viewId);
   
       // ── 7. Browser history ──
       if (pushHistory !== false) {
         history.pushState({ view: viewId }, '', '');
       }
   
       // ── 8. Sync AppState ──
       if (window.AppState && typeof AppState.setCurrentView === 'function') {
         AppState.setCurrentView(viewId);
       }
   
       // ── 9. Announce to screen readers ──
       _announceView(viewId);
   
       // ── 10. Fire custom event ──
       // Other modules can listen: document.addEventListener('nav:viewChanged', fn)
       try {
         var event = new CustomEvent('nav:viewChanged', {
           detail: {
             current:  viewId,
             previous: previousView
           }
         });
         document.dispatchEvent(event);
       } catch (err) {
         // CustomEvent not supported (very old browsers only)
         // Log non-TypeError errors — TypeError = browser doesn't support CustomEvent
         if (!(err instanceof TypeError)) {
           console.error('[Nav] Failed to dispatch nav:viewChanged:', err);
         }
       }
   
       console.log('[Nav] Navigated:', previousView || '(none)', '→', viewId);
     }
   
   
     /* ═══════════════════════════════════════════════════════════
        PUBLIC API
        ═══════════════════════════════════════════════════════════ */
   
     return {
   
       /**
        * Initialize the navigation system.
        * Must be called ONCE on app startup (called by app.js).
        * Sets up popstate listener and navigates to the initial view.
        *
        * @param {string} [initialView] - View ID to show first
        */
       init: function (initialView) {
         if (_initialized) return;
         _initialized = true;
   
         // Listen for browser back/forward button
         window.addEventListener('popstate', _onPopState);
   
         // Set initial browser history state
         var startView = initialView || 'view-onboard';
         history.replaceState({ view: startView }, '', '');
   
         // Navigate to the starting view
         _navigateTo(startView, false);
   
         console.log('[Nav] Initialized. Starting view:', startView);
       },
   
       /**
        * Navigate to a view with guard checks.
        * Blocked if an active exam is running (unless going to result).
        *
        * @param {string} viewId - Target view ID
        */
       goTo: function (viewId) {
   
         // Guard: block navigation away from exam while exam is active
         var isExamActive = window.ExamState &&
                            ExamState.isActive() &&
                            !ExamState.isSubmitted();
         var isLeavingExam   = _currentView === 'view-exam';
         var isGoingToResult = viewId === 'view-result';
   
         if (isExamActive && isLeavingExam && !isGoingToResult) {
           if (window.ToastManager) {
             ToastManager.show('Submit or exit the exam first.', 'warning');
           }
           return;
         }
   
         _navigateTo(viewId, true);
       },
   
       /**
        * Go back to the previous view.
        * Uses AppState history if available, falls back to dashboard.
        * Always blocked during an active exam.
        */
       goBack: function () {
         if (_isBackBlocked(_currentView)) {
           if (window.ToastManager) {
             ToastManager.show('Submit or exit the exam first.', 'warning');
           }
           return;
         }
   
         // Try AppState navigation history
         if (window.AppState && typeof AppState.goBack === 'function') {
           var prev = AppState.goBack();
           if (prev) {
             _navigateTo(prev, false);
             return;
           }
         }
   
         // Safe fallback — always land on dashboard
         _navigateTo('view-dashboard', true);
       },
   
       /**
        * Get the ID of the currently visible view.
        * @returns {string}
        */
       getCurrentView: function () {
         return _currentView;
       },
   
       /**
        * Check if the app is currently on a specific view.
        * @param {string} viewId
        * @returns {boolean}
        */
       isOn: function (viewId) {
         return _currentView === viewId;
       },
   
       /**
        * Force-navigate to a view, bypassing all guards.
        * Used by ExamEngine.submitExam() for the submit → result flow.
        * Also used by exitExam() for exam → dashboard flow.
        *
        * @param {string} viewId
        */
       forceGoTo: function (viewId) {
         _navigateTo(viewId, true);
       },
   
       /**
        * Check if navigation is currently initialized.
        * Useful for app.js to verify Nav is ready.
        * @returns {boolean}
        */
       isInitialized: function () {
         return _initialized;
       }
     };
   
   })();
   
   // Expose globally so all other modules can call Nav.goTo() etc.
   window.Nav = Nav;
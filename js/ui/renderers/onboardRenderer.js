/* ============================================================
   ONBOARD RENDERER — First-Time Registration Screen
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders and manages the onboarding/registration form:
   - Welcome hero section with app branding
   - Name + Email input fields
   - Real-time inline validation
   - Submit → save to StorageService + AppState → navigate to dashboard
   - Accessible form with proper labels and error messages

   HTML targets (inside #view-onboard):
   - #onboard-form            → The form element
   - #onboard-name            → Name input
   - #onboard-email           → Email input
   - #onboard-name-error      → Name error message
   - #onboard-email-error     → Email error message
   - #onboard-submit-btn      → Submit button

   Dependencies: Validators, AppState, StorageService, Nav, ToastManager
   Used by: App (init)
   ============================================================ */

'use strict';

var OnboardRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _bound = false;  // Event listeners attached?


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Get an element by ID (shorthand).
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  function _el(id) {
    return document.getElementById(id);
  }

  /**
   * Set an error message on a field.
   * @param {string} errorElId - ID of the error span
   * @param {string} message - Error message or '' to clear
   */
  function _setError(errorElId, message) {
    var el = _el(errorElId);
    if (!el) return;

    el.textContent = message;

    if (message) {
      el.classList.add('visible');
      el.setAttribute('role', 'alert');
    } else {
      el.classList.remove('visible');
      el.removeAttribute('role');
    }
  }

  /**
   * Set input field visual error state.
   * @param {string} inputId
   * @param {boolean} hasError
   */
  function _setInputError(inputId, hasError) {
    var input = _el(inputId);
    if (!input) return;

    if (hasError) {
      input.classList.add('input-error');
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.classList.remove('input-error');
      input.setAttribute('aria-invalid', 'false');
    }
  }

  /**
   * Validate the name field and show/clear errors.
   * @returns {boolean} Valid
   */
  function _validateName() {
    var input = _el('onboard-name');
    if (!input) return false;

    var value = input.value.trim();

    if (window.Validators && typeof Validators.validateName === 'function') {
      var result = Validators.validateName(value);
      _setError('onboard-name-error', result.valid ? '' : result.message);
      _setInputError('onboard-name', !result.valid);
      return result.valid;
    }

    // Fallback basic check
    var valid = value.length >= 2;
    _setError('onboard-name-error', valid ? '' : 'Name must be at least 2 characters.');
    _setInputError('onboard-name', !valid);
    return valid;
  }

  /**
   * Validate the email field and show/clear errors.
   * @returns {boolean} Valid
   */
  function _validateEmail() {
    var input = _el('onboard-email');
    if (!input) return false;

    var value = input.value.trim();

    if (window.Validators && typeof Validators.validateEmail === 'function') {
      var result = Validators.validateEmail(value);
      _setError('onboard-email-error', result.valid ? '' : result.message);
      _setInputError('onboard-email', !result.valid);
      return result.valid;
    }

    // Fallback
    var valid = value.indexOf('@') > 0 && value.indexOf('.') > 0;
    _setError('onboard-email-error', valid ? '' : 'Enter a valid email address.');
    _setInputError('onboard-email', !valid);
    return valid;
  }

  /**
   * Handle form submission.
   * @param {Event} e
   */
  function _handleSubmit(e) {
    e.preventDefault();

    // Validate both fields
    var nameValid  = _validateName();
    var emailValid = _validateEmail();

    if (!nameValid || !emailValid) {
      // Focus first invalid field
      if (!nameValid) {
        var nameInput = _el('onboard-name');
        if (nameInput) nameInput.focus();
      } else {
        var emailInput = _el('onboard-email');
        if (emailInput) emailInput.focus();
      }
      return;
    }

    // ── Build student profile ──
    var name  = _el('onboard-name').value.trim();
    var email = _el('onboard-email').value.trim().toLowerCase();

    var student = {
      name:       name,
      email:      email,
      joinedDate: new Date().toISOString()
    };

    // ── Save to AppState ──
    if (window.AppState && typeof AppState.setStudent === 'function') {
      AppState.setStudent(student);
    }

    // ── Persist to storage ──
    if (window.StorageService && typeof StorageService.saveStudent === 'function') {
      StorageService.saveStudent(student);
    }

    // ── Success feedback ──
    if (window.ToastManager) {
      var firstName = name.split(/\s+/)[0];
      ToastManager.success('Welcome, ' + firstName + '! 🎉');
    }

    // ── Navigate to dashboard ──
    if (window.Nav && typeof Nav.goTo === 'function') {
      Nav.goTo('view-dashboard');
    }

    // ── Render dashboard ──
    if (window.DashboardRenderer && typeof DashboardRenderer.render === 'function') {
      DashboardRenderer.render();
    }
  }

  /**
   * Handle real-time input validation (on blur and input).
   */
  function _handleNameInput() {
    var input = _el('onboard-name');
    if (!input) return;

    var value = input.value.trim();
    // Only validate if user has typed something (avoid premature errors)
    if (value.length > 0) {
      _validateName();
    } else {
      _setError('onboard-name-error', '');
      _setInputError('onboard-name', false);
    }
  }

  function _handleEmailInput() {
    var input = _el('onboard-email');
    if (!input) return;

    var value = input.value.trim();
    if (value.length > 0) {
      _validateEmail();
    } else {
      _setError('onboard-email-error', '');
      _setInputError('onboard-email', false);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Render the onboarding view.
     * Populates any dynamic content and binds event listeners.
     */
    render: function() {
      // ── Set app branding ──
      var appNameEl = _el('onboard-app-name');
      if (appNameEl && window.UIConstants) {
        appNameEl.textContent = UIConstants.APP_NAME || 'NursePrep Pro';
      }

      var appTagEl = _el('onboard-tagline');
      if (appTagEl && window.UIConstants) {
        appTagEl.textContent = UIConstants.APP_TAGLINE || '';
      }

      var appLogoEl = _el('onboard-logo');
      if (appLogoEl && window.UIConstants) {
        appLogoEl.textContent = UIConstants.APP_LOGO || '🏥';
      }

      // ── Clear any previous input values ──
      var nameInput = _el('onboard-name');
      var emailInput = _el('onboard-email');
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';

      // ── Clear errors ──
      _setError('onboard-name-error', '');
      _setError('onboard-email-error', '');
      _setInputError('onboard-name', false);
      _setInputError('onboard-email', false);

      // ── Bind events (only once) ──
      this.bindEvents();
    },

    /**
     * Bind form event listeners.
     * Safe to call multiple times — only binds once.
     */
    bindEvents: function() {
      if (_bound) return;
      _bound = true;

      // Form submit
      var form = _el('onboard-form');
      if (form) {
        form.addEventListener('submit', _handleSubmit);
      }

      // Real-time validation
      var nameInput = _el('onboard-name');
      if (nameInput) {
        nameInput.addEventListener('blur', _validateName);
        nameInput.addEventListener('input', _handleNameInput);
      }

      var emailInput = _el('onboard-email');
      if (emailInput) {
        emailInput.addEventListener('blur', _validateEmail);
        emailInput.addEventListener('input', _handleEmailInput);
      }

      // Submit button (backup — form submit handles it)
      var submitBtn = _el('onboard-submit-btn');
      if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
          // Form submit handler will be triggered by the form
          // This is a fallback if button is outside form
          var form = _el('onboard-form');
          if (form) {
            form.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        });
      }
    }
  };

})();

// Expose globally
window.OnboardRenderer = OnboardRenderer;
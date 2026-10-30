/* ============================================================
   ONBOARD RENDERER — Authentication & Student Registration Screen
   NursePrep Pro v3.0 — AIIMS Nursing & MP PNST 2027 Entrance

   Renders and manages candidate authentication:
   - Mode switching: Sign In (Existing Candidate) vs Create Account (New Candidate)
   - Cross-device Firebase Cloud Authentication (Email + Password)
   - Real-time inline field validation (Name, Email, Password)
   - Password reset via Firebase Auth
   - Seamless local / offline fallback mode
   - Automatic Cloud Hydration upon login

   HTML targets (inside #view-onboard):
   - #tab-auth-login          → Sign In tab button
   - #tab-auth-register       → Create Account tab button
   - #form-group-name         → Name container (visible in register mode)
   - #form-group-password     → Password container
   - #onboard-name            → Name input
   - #onboard-email           → Email input
   - #onboard-password        → Password input
   - #onboard-forgot-link     → Forgot password link
   - #onboard-submit-btn      → Action submit button
   - #onboard-offline-btn     → Continue offline button

   Dependencies: Validators, AppState, StorageService, FirebaseService,
                 Nav, ToastManager, DashboardRenderer
   ============================================================ */

'use strict';

var OnboardRenderer = (function() {

  var _bound = false;
  var _mode  = 'login'; // 'login' or 'register'

  function _el(id) {
    return document.getElementById(id);
  }

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

  function _validateName() {
    if (_mode === 'login') return true;

    var input = _el('onboard-name');
    if (!input) return false;

    var value = input.value.trim();
    if (window.Validators && typeof Validators.validateName === 'function') {
      var result = Validators.validateName(value);
      _setError('onboard-name-error', result.valid ? '' : result.message);
      _setInputError('onboard-name', !result.valid);
      return result.valid;
    }

    var valid = value.length >= 2;
    _setError('onboard-name-error', valid ? '' : 'Name must be at least 2 characters.');
    _setInputError('onboard-name', !valid);
    return valid;
  }

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

    var valid = value.indexOf('@') > 0 && value.indexOf('.') > 0;
    _setError('onboard-email-error', valid ? '' : 'Enter a valid email address.');
    _setInputError('onboard-email', !valid);
    return valid;
  }

  function _validatePassword() {
    var input = _el('onboard-password');
    if (!input) return true;

    var value = input.value;
    var valid = Boolean(value && value.length >= 6);

    _setError('onboard-password-error', valid ? '' : 'Password must be at least 6 characters.');
    _setInputError('onboard-password', !valid);
    return valid;
  }

  /**
   * Switch authentication mode between 'login' and 'register'
   * @param {'login'|'register'} mode
   */
  function setMode(mode) {
    _mode = mode;

    var tabLogin    = _el('tab-auth-login');
    var tabRegister = _el('tab-auth-register');
    var nameGroup   = _el('form-group-name');
    var submitBtn   = _el('onboard-submit-btn');
    var forgotLink  = _el('onboard-forgot-link');

    if (mode === 'register') {
      if (tabRegister) {
        tabRegister.classList.add('active');
        tabRegister.setAttribute('aria-selected', 'true');
      }
      if (tabLogin) {
        tabLogin.classList.remove('active');
        tabLogin.setAttribute('aria-selected', 'false');
      }
      if (nameGroup) nameGroup.style.display = 'flex';
      if (forgotLink) forgotLink.style.display = 'none';
      if (submitBtn) submitBtn.innerHTML = '✨ Create Account &amp; Start';
    } else {
      if (tabLogin) {
        tabLogin.classList.add('active');
        tabLogin.setAttribute('aria-selected', 'true');
      }
      if (tabRegister) {
        tabRegister.classList.remove('active');
        tabRegister.setAttribute('aria-selected', 'false');
      }
      if (nameGroup) nameGroup.style.display = 'none';
      if (forgotLink) forgotLink.style.display = 'inline';
      if (submitBtn) submitBtn.innerHTML = '🚀 Sign In &amp; Load Tests';
    }

    // Clear previous errors
    _setError('onboard-name-error', '');
    _setError('onboard-email-error', '');
    _setError('onboard-password-error', '');
    _setInputError('onboard-name', false);
    _setInputError('onboard-email', false);
    _setInputError('onboard-password', false);
  }

  /**
   * Handle Form Submission (Sign In or Register)
   */
  function _handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    var emailValid = _validateEmail();
    var nameValid  = _validateName();
    var passValid  = _validatePassword();

    if (!emailValid || !nameValid || !passValid) {
      if (!nameValid && _mode === 'register') {
        var nIn = _el('onboard-name');
        if (nIn) nIn.focus();
      } else if (!emailValid) {
        var eIn = _el('onboard-email');
        if (eIn) eIn.focus();
      } else if (!passValid) {
        var pIn = _el('onboard-password');
        if (pIn) pIn.focus();
      }
      return;
    }

    var email = _el('onboard-email').value.trim().toLowerCase();
    var pass  = _el('onboard-password').value;
    var name  = (_mode === 'register' && _el('onboard-name'))
                  ? _el('onboard-name').value.trim()
                  : email.split('@')[0];

    var submitBtn = _el('onboard-submit-btn');
    var prevBtnText = submitBtn ? submitBtn.innerHTML : '';

    // Check if Firebase is available and configured
    var isFirebase = window.FirebaseService && FirebaseService.isReady();

    if (isFirebase) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="status-indicator-dot" style="margin-right:8px;"></span> Contacting Cloud...';
      }

      if (_mode === 'login') {
        // ── 1. FIREBASE SIGN IN ──
        FirebaseService.signIn(email, pass)
          .then(function(user) {
            return FirebaseService.loadUserData(user.uid);
          })
          .then(function(cloudData) {
            var student = (cloudData && cloudData.student) ? cloudData.student : {
              name:       (cloudData && cloudData.student && cloudData.student.name) || name,
              email:      email,
              joinedDate: new Date().toISOString()
            };

            // Hydrate AppState from Cloud
            if (cloudData) {
              if (!cloudData.student) cloudData.student = student;
              if (window.AppState) AppState.hydrate(cloudData);
            } else {
              if (window.AppState) AppState.setStudent(student);
            }

            // Sync to local storage as cache
            if (window.StorageService) {
              StorageService.saveStudent(student);
              if (cloudData && Array.isArray(cloudData.attempts)) {
                StorageService.saveAttempts(cloudData.attempts);
              }
            }

            if (window.ToastManager) {
              var count = (cloudData && Array.isArray(cloudData.attempts)) ? cloudData.attempts.length : 0;
              ToastManager.success('Welcome back, ' + student.name + '! (' + count + ' tests synced ☁️)');
            }

            _navigateToDashboard();
          })
          .catch(function(err) {
            console.error('[OnboardRenderer] Sign in error:', err);
            var msg = err.message || 'Failed to sign in.';
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
              msg = 'Incorrect email or password. Please verify or create an account.';
            }
            _setError('onboard-password-error', msg);
            _setInputError('onboard-password', true);
            if (window.ToastManager) ToastManager.error(msg);
          })
          .finally(function() {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = prevBtnText;
            }
          });

      } else {
        // ── 2. FIREBASE REGISTER ──
        FirebaseService.signUp(name, email, pass)
          .then(function(res) {
            var student = res.profile;

            if (window.AppState) {
              AppState.setStudent(student);
            }

            if (window.StorageService) {
              StorageService.saveStudent(student);
            }

            if (window.ToastManager) {
              ToastManager.success('Account created! Welcome, ' + name + '! 🎉');
            }

            _navigateToDashboard();
          })
          .catch(function(err) {
            console.error('[OnboardRenderer] Sign up error:', err);
            var msg = err.message || 'Failed to create account.';
            if (err.code === 'auth/email-already-in-use') {
              msg = 'An account with this email already exists. Switch to Sign In!';
            }
            _setError('onboard-email-error', msg);
            _setInputError('onboard-email', true);
            if (window.ToastManager) ToastManager.error(msg);
          })
          .finally(function() {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = prevBtnText;
            }
          });
      }

    } else {
      // ── 3. LOCAL / OFFLINE MODE (No Firebase configured yet) ──
      var localStudent = {
        name:       name || 'Candidate',
        email:      email,
        joinedDate: new Date().toISOString()
      };

      if (window.AppState) {
        AppState.setStudent(localStudent);
      }
      if (window.StorageService) {
        StorageService.saveStudent(localStudent);
      }

      if (window.ToastManager) {
        ToastManager.success('Welcome, ' + localStudent.name + '! (Local Storage Mode) 🚀');
      }

      _navigateToDashboard();
    }
  }

  /**
   * Handle Offline / Demo Mode bypass button
   */
  function _handleOfflineMode() {
    var email = (_el('onboard-email') && _el('onboard-email').value.trim()) || 'aspirant@nurseprep.local';
    var name  = (_el('onboard-name') && _el('onboard-name').value.trim()) || 'Candidate';

    var localStudent = {
      name:       name,
      email:      email,
      joinedDate: new Date().toISOString()
    };

    if (window.AppState) AppState.setStudent(localStudent);
    if (window.StorageService) StorageService.saveStudent(localStudent);

    if (window.ToastManager) {
      ToastManager.info('Running in Local Offline Mode. Test data is stored on this browser.');
    }

    _navigateToDashboard();
  }

  /**
   * Handle Forgot Password click
   */
  function _handleForgot(e) {
    if (e && e.preventDefault) e.preventDefault();

    var emailInput = _el('onboard-email');
    var email = emailInput ? emailInput.value.trim() : '';

    if (!email || email.indexOf('@') === -1) {
      _setError('onboard-email-error', 'Enter your registered email address first.');
      _setInputError('onboard-email', true);
      if (emailInput) emailInput.focus();
      return;
    }

    if (window.FirebaseService && FirebaseService.isReady()) {
      FirebaseService.resetPassword(email)
        .then(function() {
          if (window.ToastManager) {
            ToastManager.success('Password reset email sent to ' + email + '!');
          }
        })
        .catch(function(err) {
          if (window.ToastManager) {
            ToastManager.error(err.message || 'Could not send reset email.');
          }
        });
    } else {
      if (window.ToastManager) {
        ToastManager.info('Firebase cloud is not configured. Password reset is handled in cloud mode.');
      }
    }
  }

  function _navigateToDashboard() {
    if (window.Nav && typeof Nav.goTo === 'function') {
      Nav.goTo('view-dashboard');
    }
    if (window.DashboardRenderer && typeof DashboardRenderer.render === 'function') {
      DashboardRenderer.render();
    }
  }

  return {
    render: function() {
      // Clear values and errors
      var nameIn = _el('onboard-name');
      var mailIn = _el('onboard-email');
      var passIn = _el('onboard-password');
      if (nameIn) nameIn.value = '';
      if (mailIn) mailIn.value = '';
      if (passIn) passIn.value = '';

      setMode('login');
      this.bindEvents();
    },

    bindEvents: function() {
      if (_bound) return;
      _bound = true;

      // Tab switcher
      var tabLogin    = _el('tab-auth-login');
      var tabRegister = _el('tab-auth-register');
      if (tabLogin)    tabLogin.addEventListener('click', function() { setMode('login'); });
      if (tabRegister) tabRegister.addEventListener('click', function() { setMode('register'); });

      // Form submit
      var form = _el('onboard-form');
      if (form) form.addEventListener('submit', _handleSubmit);

      // Forgot password link
      var forgotLink = _el('onboard-forgot-link');
      if (forgotLink) forgotLink.addEventListener('click', _handleForgot);

      // Offline mode button
      var offlineBtn = _el('onboard-offline-btn');
      if (offlineBtn) offlineBtn.addEventListener('click', _handleOfflineMode);
    }
  };

})();

// Expose globally
if (typeof window !== 'undefined') {
  window.OnboardRenderer = OnboardRenderer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OnboardRenderer;
}

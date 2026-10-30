/* ============================================================
   FIREBASE SERVICE — Authentication & Cloud Firestore Persistence
   NursePrep Pro v3.0 — AIIMS Nursing & MP PNST 2027 Entrance

   Cross-device cloud synchronization:
   - Firebase Authentication (Email/Password & Session Persistence)
   - Cloud Firestore (Profile, Goal Tracker, Attempt History)
   - Two-Way Sync (Cloud <-> Local Storage automatic reconciliation)
   - Built-in Offline Persistence (syncs automatically when online)
   - Graceful fallback when Firebase keys are not configured

   Firestore Data Schema:
   📁 users/{uid}
       ├── profile:  { name, email, joinedDate }
       ├── settings: { darkMode, sound, animations, timeAlerts }
       ├── goals:    { targetScore, targetCollege, targetRankTier }
       ├── attempts: [ { testId, testTitle, score, accuracy, ... }, ... ]
       └── 📁 attempts/{attemptId}
             └── { testId, testTitle, score, maxScore, accuracy, subjectScores, ... }

   Dependencies: Firebase SDK (compat), FirebaseConfig
   ============================================================ */

'use strict';

var FirebaseService = (function() {

  var _auth      = null;
  var _db        = null;
  var _user      = null;
  var _isReady   = false;
  var _listeners = [];

  /**
   * Helper to get active user (cached or synchronous from auth)
   * @returns {Object|null}
   */
  function getUser() {
    return _user || (_auth ? _auth.currentUser : null);
  }

  /**
   * Initialize Firebase App, Auth and Firestore
   */
  function init() {
    if (typeof window === 'undefined' || typeof firebase === 'undefined') {
      console.info('[FirebaseService] Firebase SDK not loaded in window. Operating in local mode.');
      return false;
    }

    if (!window.FirebaseConfig || !FirebaseConfig.isConfigured()) {
      console.info('[FirebaseService] Firebase keys not yet configured. Operating in local storage mode.');
      return false;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseConfig.get());
      }

      _auth = firebase.auth();
      _db   = firebase.firestore();

      // Enable offline persistence in Firestore
      _db.enablePersistence({ synchronizeTabs: true }).catch(function(err) {
        if (err.code === 'failed-precondition') {
          console.warn('[FirebaseService] Multiple tabs open, offline persistence enabled in first tab only.');
        } else if (err.code === 'unimplemented') {
          console.warn('[FirebaseService] Browser does not support Firestore offline persistence.');
        }
      });

      // Listen to auth state changes
      _auth.onAuthStateChanged(function(user) {
        _user = user;
        for (var i = 0; i < _listeners.length; i++) {
          try {
            _listeners[i](_user);
          } catch (e) {
            console.error('[FirebaseService] Auth listener error:', e);
          }
        }
      });

      _isReady = true;
      console.log('[FirebaseService] Connected to Firebase successfully.');
      return true;
    } catch (err) {
      console.error('[FirebaseService] Initialization failed:', err);
      _isReady = false;
      return false;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // AUTHENTICATION METHODS
  // ═══════════════════════════════════════════════════════════

  /**
   * Register a new student account
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  function signUp(name, email, password) {
    if (!_isReady || !_auth) {
      return Promise.reject(new Error('Firebase is not configured. Please enter your Firebase keys in js/services/firebaseConfig.js.'));
    }

    return _auth.createUserWithEmailAndPassword(email, password)
      .then(function(credential) {
        var user = credential.user;
        _user = user;

        return user.updateProfile({ displayName: name }).then(function() {
          var initialProfile = {
            name:       name,
            email:      email,
            joinedDate: new Date().toISOString()
          };

          // Save initial document in Firestore
          return _db.collection('users').doc(user.uid).set({
            profile:   initialProfile,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true }).then(function() {
            return { user: user, profile: initialProfile };
          });
        });
      });
  }

  /**
   * Sign in an existing student account
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  function signIn(email, password) {
    if (!_isReady || !_auth) {
      return Promise.reject(new Error('Firebase is not configured. Please enter your Firebase keys in js/services/firebaseConfig.js.'));
    }

    return _auth.signInWithEmailAndPassword(email, password)
      .then(function(credential) {
        _user = credential.user;
        return credential.user;
      });
  }

  /**
   * Sign out current student
   * @returns {Promise<void>}
   */
  function signOut() {
    _user = null;
    if (!_isReady || !_auth) {
      return Promise.resolve();
    }
    return _auth.signOut();
  }

  /**
   * Send password reset email
   * @param {string} email
   * @returns {Promise<void>}
   */
  function resetPassword(email) {
    if (!_isReady || !_auth) {
      return Promise.reject(new Error('Firebase is not configured.'));
    }
    return _auth.sendPasswordResetEmail(email);
  }

  /**
   * Subscribe to auth changes
   * @param {Function} callback
   */
  function onAuthStateChanged(callback) {
    if (typeof callback === 'function') {
      _listeners.push(callback);
      var current = getUser();
      if (_isReady && current) {
        callback(current);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // CLOUD FIRESTORE DATA METHODS (Two-Way Resilient Sync)
  // ═══════════════════════════════════════════════════════════

  /**
   * Load complete student data (Profile, Attempts, Settings, Goals) from Cloud
   * Robust against missing indexes and supports auto-merging unsynced local attempts.
   * @param {string} uid
   * @returns {Promise<Object>}
   */
  function loadUserData(uid) {
    if (!_isReady || !_db) {
      return Promise.resolve(null);
    }

    var currentUser = getUser();
    var targetUid = uid || (currentUser ? currentUser.uid : null);
    if (!targetUid) {
      return Promise.resolve(null);
    }

    var userDocRef = _db.collection('users').doc(targetUid);

    // Fetch user doc and attempts subcollection without brittle orderBy constraints
    return Promise.all([
      userDocRef.get().catch(function(err) {
        console.warn('[FirebaseService] Could not read userDoc:', err);
        return { exists: false, data: function() { return {}; } };
      }),
      userDocRef.collection('attempts').get().catch(function(err) {
        console.warn('[FirebaseService] Could not read attempts subcollection:', err);
        return { empty: true, forEach: function() {} };
      })
    ]).then(function(results) {
      var userDocSnap  = results[0];
      var attemptsSnap = results[1];

      var userData = (userDocSnap && userDocSnap.exists) ? userDocSnap.data() : {};
      var attemptsMap = {};

      // 1. First populate any attempts saved directly on the root user document
      if (Array.isArray(userData.attempts)) {
        for (var i = 0; i < userData.attempts.length; i++) {
          var item = userData.attempts[i];
          if (item && item.testId) {
            var itemKey = item.id || (item.testId + '_' + (item.timestamp || item.date || i));
            item.id = itemKey;
            attemptsMap[itemKey] = item;
          }
        }
      }

      // 2. Merge attempts from the subcollection
      if (attemptsSnap && typeof attemptsSnap.forEach === 'function') {
        attemptsSnap.forEach(function(doc) {
          var att = doc.data();
          att.id = doc.id;
          attemptsMap[doc.id] = att;
        });
      }

      // 3. Two-Way Sync: Check if there are any local attempts taken on this device that need uploading
      if (typeof window !== 'undefined' && window.StorageService && typeof StorageService.loadAttempts === 'function') {
        try {
          var localAttempts = StorageService.loadAttempts() || [];
          for (var k = 0; k < localAttempts.length; k++) {
            var la = localAttempts[k];
            if (la && la.testId) {
              var laid = la.id || (la.testId + '_' + (la.date ? new Date(la.date).getTime() : k));
              la.id = laid;
              if (!attemptsMap[laid]) {
                // Local attempt not yet in cloud! Auto-save it
                attemptsMap[laid] = la;
                saveAttempt(la);
              }
            }
          }
        } catch (e) {
          console.warn('[FirebaseService] Local attempt auto-sync check notice:', e);
        }
      }

      var attempts = [];
      for (var key in attemptsMap) {
        if (attemptsMap.hasOwnProperty(key)) {
          attempts.push(attemptsMap[key]);
        }
      }

      // Sort newest first
      attempts.sort(function(a, b) {
        var tA = a.timestamp || (a.date ? new Date(a.date).getTime() : 0) || 0;
        var tB = b.timestamp || (b.date ? new Date(b.date).getTime() : 0) || 0;
        return tB - tA;
      });

      return {
        student:  userData.profile  || null,
        settings: userData.settings || null,
        goals:    userData.goals    || null,
        attempts: attempts
      };
    }).catch(function(err) {
      console.error('[FirebaseService] Failed to load user data from cloud:', err);
      return null;
    });
  }

  /**
   * Save a completed test attempt to Firestore subcollection & user document
   * @param {Object} attemptSummary
   * @returns {Promise<string>}
   */
  function saveAttempt(attemptSummary) {
    if (!_isReady || !_db) {
      console.warn('[FirebaseService] Firebase not ready to save attempt.');
      return Promise.resolve(null);
    }

    var currentUser = getUser();
    if (!currentUser) {
      console.warn('[FirebaseService] Cannot save attempt: User not authenticated.');
      return Promise.resolve(null);
    }

    if (!attemptSummary) {
      return Promise.reject(new Error('Missing attemptSummary'));
    }

    var targetUid = currentUser.uid;
    var nowMs = Date.now();
    var attemptId = attemptSummary.id || ('att_' + (attemptSummary.testId || 'test') + '_' + nowMs);
    attemptSummary.id = attemptId;
    attemptSummary.timestamp = attemptSummary.timestamp || nowMs;
    attemptSummary.date = attemptSummary.date || new Date().toISOString();

    var payload = Object.assign({}, attemptSummary, {
      id:        attemptId,
      timestamp: attemptSummary.timestamp,
      date:      attemptSummary.date,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    var userDocRef = _db.collection('users').doc(targetUid);

    // Save to subcollection AND save into user root doc's attempts array
    return userDocRef.collection('attempts').doc(attemptId).set(payload, { merge: true })
      .then(function() {
        console.log('[FirebaseService] Attempt successfully saved to Cloud Firestore:', attemptId);

        var cleanSummary = Object.assign({}, payload);
        delete cleanSummary.createdAt;

        return userDocRef.set({
          attempts: firebase.firestore.FieldValue.arrayUnion(cleanSummary),
          lastAttempt: cleanSummary,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      })
      .then(function() {
        return attemptId;
      })
      .catch(function(err) {
        console.error('[FirebaseService] Failed to save attempt to cloud:', err);
        throw err;
      });
  }

  /**
   * Save / update candidate profile in cloud
   * @param {Object} profile
   * @returns {Promise<void>}
   */
  function saveProfile(profile) {
    var currentUser = getUser();
    if (!_isReady || !_db || !currentUser) return Promise.resolve();

    return _db.collection('users').doc(currentUser.uid).set({
      profile:   profile,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  /**
   * Save / update goal tracking in cloud
   * @param {Object} goals
   * @returns {Promise<void>}
   */
  function saveGoals(goals) {
    var currentUser = getUser();
    if (!_isReady || !_db || !currentUser) return Promise.resolve();

    return _db.collection('users').doc(currentUser.uid).set({
      goals:     goals,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  /**
   * Save / update candidate preferences in cloud
   * @param {Object} settings
   * @returns {Promise<void>}
   */
  function saveSettings(settings) {
    var currentUser = getUser();
    if (!_isReady || !_db || !currentUser) return Promise.resolve();

    return _db.collection('users').doc(currentUser.uid).set({
      settings:  settings,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════

  return {
    init:               init,
    isReady:            function() { return _isReady; },
    getUser:            getUser,
    getCurrentUser:     getUser,
    isAuthenticated:    function() { return Boolean(getUser()); },
    onAuthStateChanged: onAuthStateChanged,
    signUp:             signUp,
    signIn:             signIn,
    signOut:            signOut,
    resetPassword:      resetPassword,
    loadUserData:       loadUserData,
    saveAttempt:        saveAttempt,
    saveProfile:        saveProfile,
    saveGoals:          saveGoals,
    saveSettings:       saveSettings
  };

})();

// Expose globally and support Node.js export
if (typeof window !== 'undefined') {
  window.FirebaseService = FirebaseService;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FirebaseService;
}

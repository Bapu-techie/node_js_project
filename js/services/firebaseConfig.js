/* ============================================================
   FIREBASE CONFIGURATION
   NursePrep Pro v3.0 — AIIMS Nursing & MP PNST 2027 Entrance

   Instructions:
   1. Create a free project at https://console.firebase.google.com/
   2. Enable "Authentication" -> "Email/Password" provider.
   3. Enable "Cloud Firestore Database" in test mode or with security rules.
   4. Register a Web App ("</>") and paste your firebaseConfig values below.
   ============================================================ */

'use strict';

var FIREBASE_CONFIG = {

  apiKey: "AIzaSyC5bV1lyetUWwDnykEOAOTJG0VsE1jZUOY",
  authDomain: "nurseprep-cbt.firebaseapp.com",
  projectId: "nurseprep-cbt",
  storageBucket: "nurseprep-cbt.firebasestorage.app",
  messagingSenderId: "564678420507",
  appId: "1:564678420507:web:0891d89e048a13351570be",
  measurementId: "G-NHWX0H8P9W"
};

var FirebaseConfig = (function () {
  return {
    get: function () {
      return FIREBASE_CONFIG;
    },

    /**
     * Checks if Firebase credentials have been configured by the user
     * (i.e. not using the placeholder template keys).
     * @returns {boolean}
     */
    isConfigured: function () {
      return Boolean(
        FIREBASE_CONFIG &&
        FIREBASE_CONFIG.apiKey &&
        !FIREBASE_CONFIG.apiKey.includes("Placeholder") &&
        FIREBASE_CONFIG.projectId &&
        FIREBASE_CONFIG.projectId !== "nurseprep-pro"
      );
    }
  };
})();

// Expose globally and support Node.js export
if (typeof window !== 'undefined') {
  window.FIREBASE_CONFIG = FIREBASE_CONFIG;
  window.FirebaseConfig = FirebaseConfig;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FIREBASE_CONFIG: FIREBASE_CONFIG, FirebaseConfig: FirebaseConfig };
}

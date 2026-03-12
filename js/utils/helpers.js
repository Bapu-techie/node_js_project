/* ============================================================
   HELPERS — General-Purpose Utility Functions
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Pure utility functions — no side effects, minimal DOM access.
   Used across all modules for common operations.

   Categories:
   - Array utilities (shuffle, chunk, unique, flatten)
   - Object utilities (deepClone, merge, pick)
   - DOM helpers (escapeHtml, createElement, addClass/removeClass)
   - Function helpers (debounce, throttle, noop)
   - ID/random generation
   - Browser detection

   Dependencies: None (self-contained)
   Used by: Every module
   ============================================================ */

'use strict';

var Helpers = (function() {

  return {

    /* ═══════════════════════════════════════════════════════════
       ARRAY UTILITIES
       ═══════════════════════════════════════════════════════════ */

    /**
     * Shuffle an array using Fisher-Yates algorithm.
     * Returns a NEW shuffled array — does NOT mutate the original.
     * @param {Array} arr
     * @returns {Array}
     */
    shuffle: function(arr) {
      if (!Array.isArray(arr)) return [];

      var result = arr.slice();
      for (var i = result.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
      return result;
    },

    /**
     * Split an array into chunks of a given size.
     * @param {Array} arr
     * @param {number} size
     * @returns {Array<Array>}
     */
    chunk: function(arr, size) {
      if (!Array.isArray(arr) || size <= 0) return [];

      var result = [];
      for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    },

    /**
     * Get unique values from an array.
     * @param {Array} arr
     * @returns {Array}
     */
    unique: function(arr) {
      if (!Array.isArray(arr)) return [];

      var seen = {};
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        var key = String(arr[i]);
        if (!seen[key]) {
          seen[key] = true;
          result.push(arr[i]);
        }
      }
      return result;
    },

    /**
     * Flatten a nested array by one level.
     * @param {Array} arr
     * @returns {Array}
     */
    flatten: function(arr) {
      if (!Array.isArray(arr)) return [];

      var result = [];
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          for (var j = 0; j < arr[i].length; j++) {
            result.push(arr[i][j]);
          }
        } else {
          result.push(arr[i]);
        }
      }
      return result;
    },

    /**
     * Sum an array of numbers.
     * @param {Array<number>} arr
     * @returns {number}
     */
    sum: function(arr) {
      if (!Array.isArray(arr)) return 0;
      var total = 0;
      for (var i = 0; i < arr.length; i++) {
        total += (typeof arr[i] === 'number' ? arr[i] : 0);
      }
      return total;
    },

    /* ═══════════════════════════════════════════════════════════
       OBJECT UTILITIES
       ═══════════════════════════════════════════════════════════ */

    /**
     * Deep clone an object (JSON-safe only).
     * @param {*} obj
     * @returns {*}
     */
    deepClone: function(obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch (e) {
        console.warn('[Helpers] deepClone failed:', e.message);
        return obj;
      }
    },

    /**
     * Shallow merge two objects (target gets source's properties).
     * Returns a NEW object.
     * @param {Object} target
     * @param {Object} source
     * @returns {Object}
     */
    merge: function(target, source) {
      var result = {};

      if (target && typeof target === 'object') {
        for (var k1 in target) {
          if (target.hasOwnProperty(k1)) result[k1] = target[k1];
        }
      }

      if (source && typeof source === 'object') {
        for (var k2 in source) {
          if (source.hasOwnProperty(k2)) result[k2] = source[k2];
        }
      }

      return result;
    },

    /**
     * Pick specified keys from an object.
     * @param {Object} obj
     * @param {Array<string>} keys
     * @returns {Object}
     */
    pick: function(obj, keys) {
      if (!obj || !Array.isArray(keys)) return {};

      var result = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (obj.hasOwnProperty(key)) {
          result[key] = obj[key];
        }
      }
      return result;
    },

    /**
     * Check if an object is empty (has no own enumerable properties).
     * @param {Object} obj
     * @returns {boolean}
     */
    isEmpty: function(obj) {
      if (!obj || typeof obj !== 'object') return true;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },

    /* ═══════════════════════════════════════════════════════════
       DOM HELPERS
       ═══════════════════════════════════════════════════════════ */

    /**
     * Escape HTML special characters to prevent XSS.
     * @param {string} str
     * @returns {string}
     */
    escapeHtml: function(str) {
      if (typeof str !== 'string') return String(str);

      return str
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;')
        .replace(/'/g,  '&#039;');
    },

    /**
     * Get element by ID (shorthand with null check).
     * @param {string} id
     * @returns {HTMLElement|null}
     */
    getEl: function(id) {
      return document.getElementById(id);
    },

    /**
     * Add a CSS class to an element if not already present.
     * @param {HTMLElement} el
     * @param {string} className
     */
    addClass: function(el, className) {
      if (el && className) el.classList.add(className);
    },

    /**
     * Remove a CSS class from an element.
     * @param {HTMLElement} el
     * @param {string} className
     */
    removeClass: function(el, className) {
      if (el && className) el.classList.remove(className);
    },

    /**
     * Toggle a CSS class on an element.
     * @param {HTMLElement} el
     * @param {string} className
     * @param {boolean} [force]
     */
    toggleClass: function(el, className, force) {
      if (el && className) {
        if (typeof force === 'boolean') {
          el.classList.toggle(className, force);
        } else {
          el.classList.toggle(className);
        }
      }
    },

    /**
     * Set the disabled state of a button/input.
     * @param {HTMLElement} el
     * @param {boolean} disabled
     */
    setDisabled: function(el, disabled) {
      if (!el) return;
      el.disabled = !!disabled;
      el.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    },

    /* ═══════════════════════════════════════════════════════════
       FUNCTION HELPERS
       ═══════════════════════════════════════════════════════════ */

    /**
     * Debounce a function — delays execution until after `wait` ms
     * have elapsed since the last time it was invoked.
     * @param {Function} fn
     * @param {number} wait - Milliseconds
     * @returns {Function}
     */
    debounce: function(fn, wait) {
      var timeoutId = null;

      return function() {
        var context = this;
        var args = arguments;

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(function() {
          fn.apply(context, args);
          timeoutId = null;
        }, wait);
      };
    },

    /**
     * Throttle a function — ensures it runs at most once every `limit` ms.
     * @param {Function} fn
     * @param {number} limit - Milliseconds
     * @returns {Function}
     */
    throttle: function(fn, limit) {
      var lastTime = 0;

      return function() {
        var now = Date.now();
        if (now - lastTime >= limit) {
          lastTime = now;
          fn.apply(this, arguments);
        }
      };
    },

    /**
     * No-operation function. Useful as a default callback.
     */
    noop: function() {},

    /* ═══════════════════════════════════════════════════════════
       ID / RANDOM
       ═══════════════════════════════════════════════════════════ */

    /**
     * Generate a unique-ish ID string.
     * @param {string} [prefix='id']
     * @returns {string} e.g. "id_abc123_1678901234"
     */
    generateId: function(prefix) {
      prefix = prefix || 'id';
      var random = Math.random().toString(36).substring(2, 8);
      var time   = Date.now().toString(36);
      return prefix + '_' + random + '_' + time;
    },

    /**
     * Get a random integer between min and max (inclusive).
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    randomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /* ══════════════════════════��════════════════════════════════
       CLAMP / RANGE
       ═══════════════════════════════════════════════════════════ */

    /**
     * Clamp a number between min and max.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    clamp: function(value, min, max) {
      return Math.max(min, Math.min(max, value));
    },

    /* ═══════════════════════════════════════════════════════════
       BROWSER / ENVIRONMENT
       ═══════════════════════════════════════════════════════════ */

    /**
     * Check if the device is likely mobile.
     * @returns {boolean}
     */
    isMobile: function() {
      return /Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
    },

    /**
     * Check if the browser supports localStorage.
     * @returns {boolean}
     */
    hasLocalStorage: function() {
      try {
        var test = '__test__';
        localStorage.setItem(test, '1');
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * Check if the browser is online.
     * @returns {boolean}
     */
    isOnline: function() {
      return navigator.onLine !== false;
    }
  };

})();

// Expose globally
window.Helpers = Helpers;
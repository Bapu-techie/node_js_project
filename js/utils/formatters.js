/* ============================================================
   FORMATTERS — Display Formatting Utilities
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Pure formatting functions — no side effects, no DOM access.
   Used across all renderers and engines for consistent display.

   Categories:
   - Time formatting (seconds → MM:SS, human-readable, duration)
   - Score formatting (with ± sign, decimal control)
   - Percentage formatting (with clamp, decimals)
   - Date formatting (relative, short, ISO)
   - Number formatting (ordinal, comma-separated)
   - Text formatting (truncate, capitalize, pluralize)

   Dependencies: None (self-contained)
   Used by: Every renderer, ScoringEngine, FormSubmitter
   ============================================================ */

'use strict';

var Formatters = (function() {

  /* ═══════════════════════════════════════════════════════════
     TIME FORMATTING
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Convert seconds to "MM:SS" format.
     * @param {number} totalSeconds
     * @returns {string} "05:30"
     */
    toMMSS: function(totalSeconds) {
      if (typeof totalSeconds !== 'number' || totalSeconds < 0) return '00:00';

      totalSeconds = Math.floor(totalSeconds);
      var m = Math.floor(totalSeconds / 60);
      var s = totalSeconds % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    },

    /**
     * Convert seconds to "HH:MM:SS" format.
     * @param {number} totalSeconds
     * @returns {string} "01:30:00"
     */
    toHHMMSS: function(totalSeconds) {
      if (typeof totalSeconds !== 'number' || totalSeconds < 0) return '00:00:00';

      totalSeconds = Math.floor(totalSeconds);
      var h = Math.floor(totalSeconds / 3600);
      var m = Math.floor((totalSeconds % 3600) / 60);
      var s = totalSeconds % 60;
      return (h < 10 ? '0' : '') + h + ':' +
             (m < 10 ? '0' : '') + m + ':' +
             (s < 10 ? '0' : '') + s;
    },

    /**
     * Convert seconds to human-readable string.
     * @param {number} totalSeconds
     * @returns {string} "2h 15m" or "45m 30s" or "30s"
     */
    toHumanTime: function(totalSeconds) {
      if (typeof totalSeconds !== 'number' || totalSeconds < 0) return '0s';

      totalSeconds = Math.floor(totalSeconds);

      if (totalSeconds === 0) return '0s';

      var h = Math.floor(totalSeconds / 3600);
      var m = Math.floor((totalSeconds % 3600) / 60);
      var s = totalSeconds % 60;

      if (h > 0) {
        return h + 'h' + (m > 0 ? ' ' + m + 'm' : '');
      }
      if (m > 0) {
        return m + 'm' + (s > 0 ? ' ' + s + 's' : '');
      }
      return s + 's';
    },

    /**
     * Convert minutes to duration display string.
     * @param {number} minutes
     * @returns {string} "1h 30m" or "45 min"
     */
    toMinutesDuration: function(minutes) {
      if (typeof minutes !== 'number' || minutes <= 0) return '0 min';

      minutes = Math.floor(minutes);

      if (minutes >= 60) {
        var h = Math.floor(minutes / 60);
        var m = minutes % 60;
        return h + 'h' + (m > 0 ? ' ' + m + 'm' : '');
      }

      return minutes + ' min';
    },

    /* ═══════════════════════════════════════════════════════════
       SCORE FORMATTING
       ═══════════════════════════════════════════════════════════ */

    /**
     * Format a score value with sign and decimal control.
     * @param {number} score
     * @param {number} [decimals=2]
     * @returns {string} "+45.33" or "-2.67" or "0"
     */
    formatScore: function(score, decimals) {
      if (typeof score !== 'number') return '0';
      decimals = typeof decimals === 'number' ? decimals : 2;

      var formatted = score.toFixed(decimals);

      // Remove trailing zeros after decimal point
      if (decimals > 0) {
        formatted = formatted.replace(/\.?0+$/, '');
      }

      // Add plus sign for positive non-zero
      if (score > 0 && formatted.charAt(0) !== '+') {
        formatted = '+' + formatted;
      }

      return formatted || '0';
    },

    /**
     * Format score as fraction string.
     * @param {number} score
     * @param {number} maxScore
     * @returns {string} "45/70"
     */
    formatScoreFraction: function(score, maxScore) {
      var s = typeof score === 'number' ? score.toFixed(1).replace(/\.0$/, '') : '0';
      var m = typeof maxScore === 'number' ? String(maxScore) : '0';
      return s + '/' + m;
    },

    /* ═══════════════════════════════════════════════════════════
       PERCENTAGE FORMATTING
       ═══════════════════════════════════════════════════════════ */

    /**
     * Format a percentage with optional decimals.
     * @param {number} value - The percentage (0–100)
     * @param {number} [decimals=1]
     * @returns {string} "78.5%"
     */
    formatPercent: function(value, decimals) {
      if (typeof value !== 'number' || isNaN(value)) return '0%';
      decimals = typeof decimals === 'number' ? decimals : 1;

      // Clamp to 0–100
      value = Math.max(0, Math.min(100, value));
      return value.toFixed(decimals) + '%';
    },

    /**
     * Calculate and format percentage from parts.
     * @param {number} part
     * @param {number} total
     * @param {number} [decimals=1]
     * @returns {string} "85.0%"
     */
    calcPercent: function(part, total, decimals) {
      if (!total || total === 0) return '0%';
      var pct = (part / total) * 100;
      return this.formatPercent(pct, decimals);
    },

    /* ═══════════════════════════════════════════════════════════
       DATE FORMATTING
       ═══════════════════════════════════════════════════════════ */

    /**
     * Convert ISO date string to relative date.
     * @param {string} isoDate
     * @returns {string} "2 hours ago", "Yesterday", "3 days ago", "Mar 5"
     */
    toRelativeDate: function(isoDate) {
      if (!isoDate) return '';

      var date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';

      var now     = new Date();
      var diffMs  = now.getTime() - date.getTime();
      var diffSec = Math.floor(diffMs / 1000);
      var diffMin = Math.floor(diffSec / 60);
      var diffHr  = Math.floor(diffMin / 60);
      var diffDay = Math.floor(diffHr / 24);

      if (diffSec < 60)  return 'Just now';
      if (diffMin < 60)  return diffMin + ' min ago';
      if (diffHr < 24)   return diffHr + ' hour' + (diffHr > 1 ? 's' : '') + ' ago';
      if (diffDay === 1)  return 'Yesterday';
      if (diffDay < 7)    return diffDay + ' days ago';
      if (diffDay < 30)   return Math.floor(diffDay / 7) + ' week' + (Math.floor(diffDay / 7) > 1 ? 's' : '') + ' ago';

      // Fallback to short date
      return this.toShortDate(isoDate);
    },

    /**
     * Convert ISO date string to short date (e.g., "Mar 11").
     * @param {string} isoDate
     * @returns {string} "Mar 11"
     */
    toShortDate: function(isoDate) {
      if (!isoDate) return '';

      var date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';

      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[date.getMonth()] + ' ' + date.getDate();
    },

    /**
     * Convert ISO date string to full date (e.g., "March 11, 2027").
     * @param {string} isoDate
     * @returns {string}
     */
    toFullDate: function(isoDate) {
      if (!isoDate) return '';

      var date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';

      var months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
      return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    },

    /**
     * Convert ISO date string to "DD/MM/YYYY HH:MM" format.
     * @param {string} isoDate
     * @returns {string}
     */
    toDateTime: function(isoDate) {
      if (!isoDate) return '';

      var date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';

      var d  = date.getDate();
      var mo = date.getMonth() + 1;
      var y  = date.getFullYear();
      var h  = date.getHours();
      var mi = date.getMinutes();

      return (d < 10 ? '0' : '') + d + '/' +
             (mo < 10 ? '0' : '') + mo + '/' + y + ' ' +
             (h < 10 ? '0' : '') + h + ':' +
             (mi < 10 ? '0' : '') + mi;
    },

    /* ═══════════════════════════════════════════════════════════
       NUMBER FORMATTING
       ═══════════════════════════════════════════════════════════ */

    /**
     * Add ordinal suffix to a number.
     * @param {number} n
     * @returns {string} "1st", "2nd", "3rd", "4th", ...
     */
    toOrdinal: function(n) {
      if (typeof n !== 'number') return String(n);

      var s = ['th', 'st', 'nd', 'rd'];
      var v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },

    /**
     * Format a number with comma separators.
     * @param {number} n
     * @returns {string} "1,234,567"
     */
    toCommaNumber: function(n) {
      if (typeof n !== 'number') return String(n);
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /* ═══════════════════════════════════════════════════════════
       TEXT FORMATTING
       ═══════════════════════════════════════════════════════════ */

    /**
     * Truncate text with ellipsis.
     * @param {string} text
     * @param {number} maxLen
     * @returns {string}
     */
    truncate: function(text, maxLen) {
      if (typeof text !== 'string') return '';
      maxLen = maxLen || 80;
      if (text.length <= maxLen) return text;
      return text.substring(0, maxLen).trim() + '…';
    },

    /**
     * Capitalize first letter of a string.
     * @param {string} str
     * @returns {string}
     */
    capitalize: function(str) {
      if (typeof str !== 'string' || str.length === 0) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Simple pluralize helper.
     * @param {number} count
     * @param {string} singular
     * @param {string} [plural]
     * @returns {string} "1 question" or "5 questions"
     */
    pluralize: function(count, singular, plural) {
      plural = plural || singular + 's';
      return count + ' ' + (count === 1 ? singular : plural);
    }
  };

})();

// Expose globally
window.Formatters = Formatters;
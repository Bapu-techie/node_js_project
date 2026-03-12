/* ============================================================
   FORM SUBMITTER — Formspree Result Submission Service
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Handles sending exam results to a Formspree endpoint with:
   - Async fetch-based submission
   - Exponential backoff retry (up to 3 attempts)
   - Offline queue with auto-flush on reconnect
   - Rate limiting (min 10s between submissions)
   - Queue persistence via StorageService

   Flow:
   1. ExamEngine calls FormSubmitter.submit(payload)
   2. If online → send immediately via fetch
   3. If offline → enqueue in StorageService
   4. On coming back online → flush queue
   5. On failure → retry with backoff, or enqueue

   Dependencies: UIConstants, StorageService
   Used by: ExamEngine.submitExam()
   ============================================================ */

'use strict';

var FormSubmitter = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _lastSubmitTime = 0;     // Timestamp of last successful submission
  var _isFlushing     = false; // Guard for queue flush


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ════════���══════════════════════════════════════════════════ */

  /**
   * Get the Formspree endpoint URL.
   * @returns {string}
   */
  function _getEndpoint() {
    return (window.UIConstants && UIConstants.FORMSPREE_ENDPOINT) || '';
  }

  /**
   * Get rate limit interval (ms).
   * @returns {number}
   */
  function _getRateLimit() {
    return (window.UIConstants && UIConstants.FORM_RATE_LIMIT) || 10000;
  }

  /**
   * Get max retry count.
   * @returns {number}
   */
  function _getMaxRetries() {
    return (window.UIConstants && UIConstants.FORM_MAX_RETRIES) || 3;
  }

  /**
   * Get base delay for exponential backoff (ms).
   * @returns {number}
   */
  function _getBaseDelay() {
    return (window.UIConstants && UIConstants.FORM_BASE_DELAY) || 1000;
  }

  /**
   * Check if browser is online.
   * @returns {boolean}
   */
  function _isOnline() {
    return navigator.onLine !== false;
  }

  /**
   * Check rate limit. Returns true if enough time has passed.
   * @returns {boolean}
   */
  function _checkRateLimit() {
    var now  = Date.now();
    var diff = now - _lastSubmitTime;
    return diff >= _getRateLimit();
  }

  /**
   * Send a payload to Formspree via fetch.
   *
   * @param {Object} payload
   * @param {number} [attempt=1] - Current retry attempt
   * @returns {Promise<boolean>} Resolves to true on success
   */
  function _send(payload, attempt) {
    attempt = attempt || 1;
    var endpoint = _getEndpoint();

    if (!endpoint) {
      console.warn('[FormSubmitter] No Formspree endpoint configured.');
      return Promise.resolve(false);
    }

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
      if (response.ok) {
        _lastSubmitTime = Date.now();
        console.log('[FormSubmitter] Submitted successfully (attempt ' + attempt + ').');
        return true;
      }

      // Server error — may be temporary
      console.warn('[FormSubmitter] Server responded with ' + response.status + ' (attempt ' + attempt + ').');

      // Retry if under max
      if (attempt < _getMaxRetries()) {
        var delay = _getBaseDelay() * Math.pow(2, attempt - 1); // Exponential backoff
        console.log('[FormSubmitter] Retrying in ' + delay + 'ms...');

        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve(_send(payload, attempt + 1));
          }, delay);
        });
      }

      console.error('[FormSubmitter] Max retries reached. Enqueueing for later.');
      return false;
    })
    .catch(function(error) {
      console.warn('[FormSubmitter] Network error (attempt ' + attempt + '):', error.message);

      // Retry if under max
      if (attempt < _getMaxRetries()) {
        var delay = _getBaseDelay() * Math.pow(2, attempt - 1);
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve(_send(payload, attempt + 1));
          }, delay);
        });
      }

      return false;
    });
  }

  /**
   * Enqueue a payload for later submission.
   * @param {Object} payload
   */
  function _enqueue(payload) {
    if (window.StorageService && typeof StorageService.enqueueSubmission === 'function') {
      StorageService.enqueueSubmission({
        payload:   payload,
        timestamp: Date.now()
      });
      console.log('[FormSubmitter] Payload enqueued for later submission.');
    }
  }

  /**
   * Flush the offline queue — attempt to send all pending items.
   */
  function _flushQueue() {
    if (_isFlushing) return;

    if (!window.StorageService || typeof StorageService.loadSubmitQueue !== 'function') return;

    var queue = StorageService.loadSubmitQueue();
    if (queue.length === 0) return;

    _isFlushing = true;
    console.log('[FormSubmitter] Flushing queue — ' + queue.length + ' item(s) pending.');

    _flushNext(queue, 0);
  }

  /**
   * Recursively flush queue items one by one.
   * @param {Array} queue
   * @param {number} index
   */
  function _flushNext(queue, index) {
    if (index >= queue.length) {
      _isFlushing = false;
      console.log('[FormSubmitter] Queue flush complete.');
      return;
    }

    if (!_isOnline()) {
      _isFlushing = false;
      console.log('[FormSubmitter] Offline — pausing flush at index ' + index);
      return;
    }

    var item = queue[index];
    var payload = item.payload || item;

    _send(payload)
      .then(function(success) {
        if (success) {
          // Remove from queue
          if (window.StorageService && typeof StorageService.dequeueSubmission === 'function') {
            StorageService.dequeueSubmission();
          }
        }

        // Continue with next item (with small delay for rate limiting)
        setTimeout(function() {
          _flushNext(queue, index + 1);
        }, 1500);
      })
      .catch(function() {
        _isFlushing = false;
        console.warn('[FormSubmitter] Flush error at index ' + index + '. Stopping.');
      });
  }

  /**
   * Handle coming back online — flush queue after delay.
   */
  function _onOnline() {
    var delay = (window.UIConstants && UIConstants.FORM_ONLINE_FLUSH_DELAY) || 3000;
    console.log('[FormSubmitter] Back online. Will flush queue in ' + delay + 'ms.');

    setTimeout(function() {
      if (_isOnline()) {
        _flushQueue();
      }
    }, delay);
  }


  /* ═══════════════════════════════════════════════════════════
     INIT — Set up online/offline listeners
     ═══════════════════════════════════════════════════════════ */

  // Listen for coming back online
  if (typeof window !== 'undefined') {
    window.addEventListener('online', _onOnline);
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Submit exam result payload to Formspree.
     * Handles online/offline, rate limiting, retries, and queueing.
     *
     * @param {Object} payload - From ScoringEngine.toFormPayload()
     */
    submit: function(payload) {
      if (!payload) {
        console.warn('[FormSubmitter] No payload provided.');
        return;
      }

      // ── Check if endpoint exists ──
      if (!_getEndpoint()) {
        console.warn('[FormSubmitter] No endpoint configured. Skipping submission.');
        return;
      }

      // ── If offline → enqueue ──
      if (!_isOnline()) {
        console.log('[FormSubmitter] Offline — enqueueing for later.');
        _enqueue(payload);

        if (window.ToastManager) {
          ToastManager.show('📤 Result saved. Will submit when online.', 'info');
        }
        return;
      }

      // ── Rate limit check ──
      if (!_checkRateLimit()) {
        console.log('[FormSubmitter] Rate limited — enqueueing.');
        _enqueue(payload);
        return;
      }

      // ── Send immediately ──
      _send(payload)
        .then(function(success) {
          if (!success) {
            _enqueue(payload);
            if (window.ToastManager) {
              ToastManager.show('📤 Result queued — will retry later.', 'warning');
            }
          }
        })
        .catch(function() {
          _enqueue(payload);
        });
    },

    /**
     * Manually trigger a queue flush.
     * Called from profile settings or debug.
     */
    flushQueue: function() {
      if (!_isOnline()) {
        if (window.ToastManager) {
          ToastManager.show('You\'re offline. Queue will flush when connected.', 'warning');
        }
        return;
      }
      _flushQueue();
    },

    /**
     * Get the number of items in the pending queue.
     * @returns {number}
     */
    getQueueLength: function() {
      if (window.StorageService && typeof StorageService.loadSubmitQueue === 'function') {
        return StorageService.loadSubmitQueue().length;
      }
      return 0;
    },

    /**
     * Clear the submission queue.
     */
    clearQueue: function() {
      if (window.StorageService && typeof StorageService.clearSubmitQueue === 'function') {
        StorageService.clearSubmitQueue();
      }
    },

    /**
     * Check if the submitter is currently flushing the queue.
     * @returns {boolean}
     */
    isFlushing: function() {
      return _isFlushing;
    }
  };

})();

// Expose globally
window.FormSubmitter = FormSubmitter;
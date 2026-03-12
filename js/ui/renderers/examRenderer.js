/* ============================================================
   EXAM RENDERER — Active Exam Interface Renderer
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Renders and manages the exam taking interface:
   - Exam header (title, timer, progress bar)
   - Question display (number, text, subject tag, difficulty badge)
   - Option buttons (A/B/C/D) with selection states
   - Navigation controls (Prev / Next / Clear / Mark Review)
   - Desktop sidebar palette
   - Mobile status strip + palette FAB
   - Submit confirmation modal

   HTML targets (inside #view-exam):
   - #exam-title           → Test title
   - #exam-timer           → Timer display (MM:SS)
   - #exam-progress-bar    → Progress bar fill
   - #exam-progress-text   → "Q 5 / 70"
   - #exam-q-number        → Question number
   - #exam-q-subject       → Subject badge
   - #exam-q-difficulty    → Difficulty badge
   - #exam-q-text          → Question text
   - #exam-options         → Options container
   - #exam-prev-btn        → Previous button
   - #exam-next-btn        → Next button
   - #exam-clear-btn       → Clear response button
   - #exam-review-btn      → Mark for review button
   - #exam-submit-btn      → Submit button
   - #exam-sidebar-palette → Desktop sidebar palette container
   - #exam-palette-fab     → Mobile palette floating button

   Dependencies: ExamState, ExamEngine, ExamConstants, Helpers,
                 Formatters, PaletteManager, TimerModule
   Used by: ExamEngine
   ============================================================ */

'use strict';

var ExamRenderer = (function() {

  /* ═══════════════════════════════════════════════════════════
     PRIVATE STATE
     ═══════════════════════════════════════════════════════════ */

  var _bound = false;


  /* ═══════════════════════════════════════════════════════════
     PRIVATE HELPERS
     ═══════════════════════════════════════════════════════════ */

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
     HEADER (title, timer, progress)
     ───────────────────────────────────────────────────────── */

  function _renderHeader() {
    if (!window.ExamState) return;

    var titleEl = _el('exam-title');
    if (titleEl) {
      titleEl.textContent = ExamState.getTestTitle();
    }

    _updateProgress();
    _updateTimer(ExamState.getTimeRemaining(), {
      isWarning:  ExamState.isTimerWarning(),
      isCritical: ExamState.isTimerCritical(),
      progress:   ExamState.getTimerProgress()
    });
  }

  function _updateProgress() {
    if (!window.ExamState) return;

    var current = ExamState.getCurrentIndex() + 1;
    var total   = ExamState.getTotalQuestions();

    var textEl = _el('exam-progress-text');
    if (textEl) {
      textEl.textContent = 'Q ' + current + ' / ' + total;
    }

    var barEl = _el('exam-progress-bar');
    if (barEl) {
      var pct = total > 0 ? (current / total) * 100 : 0;
      barEl.style.width = pct.toFixed(1) + '%';
    }
  }


  /* ─────────────────────────────────────────────────────────
     QUESTION DISPLAY
     ───────────────────────────────────────────────────────── */

  function _renderQuestionArea() {
    if (!window.ExamState) return;

    var q       = ExamState.getCurrentQuestion();
    var idx     = ExamState.getCurrentIndex();
    var EC      = window.ExamConstants;

    if (!q) return;

    // Question number
    var numEl = _el('exam-q-number');
    if (numEl) {
      numEl.textContent = 'Question ' + (idx + 1);
    }

    // Subject badge
    var subjEl = _el('exam-q-subject');
    if (subjEl) {
      var subjLabel = q.subjectName || q.subject || '';
      var subjIcon  = '';
      if (EC && typeof EC.getSubjectInfo === 'function') {
        var si = EC.getSubjectInfo(q.subject);
        subjLabel = si.label;
        subjIcon  = si.icon + ' ';
      }
      subjEl.textContent = subjIcon + subjLabel;
    }

    // Difficulty badge
    var diffEl = _el('exam-q-difficulty');
    if (diffEl) {
      var diffLabel = q.difficulty || 'medium';
      var diffClass = '';
      if (EC && typeof EC.getDifficultyInfo === 'function') {
        var di = EC.getDifficultyInfo(q.difficulty);
        diffLabel = di.label;
        diffClass = di.cssClass;
      }
      diffEl.textContent = diffLabel;
      diffEl.className = 'q-diff-badge ' + diffClass;
    }

    // Question text
    var textEl = _el('exam-q-text');
    if (textEl) {
      textEl.textContent = q.question;
    }

    // Options
    _renderOptions();

    // Review button state
    var isMarked = ExamState.isMarkedForReview(idx);
    _updateReviewButton(isMarked);
  }

  function _renderOptions() {
    var container = _el('exam-options');
    if (!container || !window.ExamState) return;

    var q      = ExamState.getCurrentQuestion();
    var answer = ExamState.getCurrentAnswer();
    var EC     = window.ExamConstants;
    var labels = (EC && EC.OPTION_LABELS) || ['A', 'B', 'C', 'D'];

    if (!q || !Array.isArray(q.options)) return;

    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      var isSelected = (answer === i);
      var selClass   = isSelected ? ' selected' : '';
      var label      = labels[i] || String.fromCharCode(65 + i);
      var ariaLabel  = 'Option ' + label + ': ' + q.options[i] + (isSelected ? ' (selected)' : '');

      html += '<button class="option-btn' + selClass + '" ' +
              'data-option-idx="' + i + '" ' +
              'role="radio" ' +
              'aria-checked="' + (isSelected ? 'true' : 'false') + '" ' +
              'aria-label="' + _esc(ariaLabel) + '">' +
                '<span class="opt-label">' + _esc(label) + '</span>' +
                '<span class="opt-text">' + _esc(q.options[i]) + '</span>' +
              '</button>';
    }

    container.innerHTML = html;
  }


  /* ─────────────────────────────────────────────────────────
     NAVIGATION CONTROLS
     ───────────────────────────────────────────────────────── */

  function _updateNavControls() {
    if (!window.ExamState) return;

    var prevBtn = _el('exam-prev-btn');
    var nextBtn = _el('exam-next-btn');

    if (prevBtn) {
      prevBtn.disabled = ExamState.isFirstQuestion();
    }

    if (nextBtn) {
      // Change text on last question
      if (ExamState.isLastQuestion()) {
        nextBtn.textContent = 'Submit →';
        nextBtn.classList.add('btn-submit-last');
      } else {
        nextBtn.textContent = 'Next →';
        nextBtn.classList.remove('btn-submit-last');
      }
    }
  }

  function _updateReviewButton(isMarked) {
    var btn = _el('exam-review-btn');
    if (!btn) return;

    if (isMarked) {
      btn.classList.add('active');
      btn.textContent = '🔖 Marked';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.textContent = '🔖 Review';
      btn.setAttribute('aria-pressed', 'false');
    }
  }


  /* ─────────────────────────────────────────────────────────
     TIMER UI
     ───────────────────────────────────────────────────────── */

  function _updateTimer(remaining, timerState) {
    var timerEl = _el('exam-timer');
    if (!timerEl) return;

    // Format time
    var timeStr = '00:00';
    if (window.Formatters && typeof Formatters.toMMSS === 'function') {
      timeStr = Formatters.toMMSS(remaining);
    } else {
      var m = Math.floor(remaining / 60);
      var s = remaining % 60;
      timeStr = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    timerEl.textContent = timeStr;

    // Timer state classes
    timerEl.classList.remove('warning', 'critical');
    if (timerState) {
      if (timerState.isCritical)    timerEl.classList.add('critical');
      else if (timerState.isWarning) timerEl.classList.add('warning');
    }
  }


  /* ─────────────────────────────────────────────────────────
     SUBMIT CONFIRMATION MODAL
     ───────────────────────────────────────────────────────── */

  function _showSubmitModal() {
    if (!window.ExamEngine) return;

    var summary = ExamEngine.getSubmitSummary();
    var counts  = summary.counts;

    // Remove any existing modal
    var existing = document.getElementById('submit-modal-overlay');
    if (existing) existing.parentNode.removeChild(existing);

    var overlay = document.createElement('div');
    overlay.id = 'submit-modal-overlay';
    overlay.className = 'modal-overlay modal-enter';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Submit Exam Confirmation');

    var unansweredWarning = counts.unanswered > 0
      ? '<p class="submit-warn">⚠️ <strong>' + counts.unanswered + ' question' + (counts.unanswered > 1 ? 's' : '') + '</strong> unanswered!</p>'
      : '';

    var reviewWarning = counts.review > 0
      ? '<p class="submit-warn">🔖 <strong>' + counts.review + ' question' + (counts.review > 1 ? 's' : '') + '</strong> marked for review.</p>'
      : '';

    overlay.innerHTML =
      '<div class="modal-sheet submit-modal">' +
        '<div class="modal-header">' +
          '<h3 class="modal-title">Submit Exam?</h3>' +
          '<button class="modal-close-btn" id="submit-modal-close" aria-label="Cancel">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
          '<h4>' + _esc(summary.testTitle) + '</h4>' +
          '<div class="submit-stats">' +
            '<div class="submit-stat">✅ Answered: <strong>' + counts.answered + '</strong></div>' +
            '<div class="submit-stat">❌ Unanswered: <strong>' + counts.unanswered + '</strong></div>' +
            '<div class="submit-stat">🔖 Review: <strong>' + counts.review + '</strong></div>' +
            '<div class="submit-stat">⏱️ Time left: <strong>' + _esc(summary.timeFormatted) + '</strong></div>' +
          '</div>' +
          unansweredWarning +
          reviewWarning +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn-secondary" id="submit-modal-cancel">Continue Exam</button>' +
          '<button class="btn-primary btn-danger" id="submit-modal-confirm">Submit Now</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    // Force reflow for animation
    overlay.offsetHeight;

    // ── Event handlers ──
    var closeBtn   = _el('submit-modal-close');
    var cancelBtn  = _el('submit-modal-cancel');
    var confirmBtn = _el('submit-modal-confirm');

    var closeModal = function() {
      overlay.classList.add('modal-exit');
      setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 300);
    };

    if (closeBtn)  closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    if (confirmBtn) {
      confirmBtn.addEventListener('click', function() {
        closeModal();
        ExamEngine.submitExam('manual');
      });
    }

    // Close on overlay click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });

    // Escape key
    var escHandler = function(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    // Focus confirm button
    if (confirmBtn) confirmBtn.focus();
  }


  /* ─────────────────────────────────────────────────────────
     EVENT BINDING
     ───────────────────────────────────────────────────────── */

  function _bindEvents() {
    if (_bound) return;
    _bound = true;

    // Options — event delegation
    var optionsEl = _el('exam-options');
    if (optionsEl) {
      optionsEl.addEventListener('click', function(e) {
        var btn = e.target.closest('.option-btn');
        if (!btn) return;

        var idx = parseInt(btn.getAttribute('data-option-idx'), 10);
        if (!isNaN(idx) && window.ExamEngine) {
          ExamEngine.selectAnswer(idx);
        }
      });
    }

    // Navigation buttons
    var prevBtn = _el('exam-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (window.ExamEngine) ExamEngine.goPrev();
      });
    }

    var nextBtn = _el('exam-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (window.ExamState && ExamState.isLastQuestion()) {
          _showSubmitModal();
        } else if (window.ExamEngine) {
          ExamEngine.goNext();
        }
      });
    }

    // Clear response
    var clearBtn = _el('exam-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (window.ExamEngine) ExamEngine.clearAnswer();
      });
    }

    // Mark for review
    var reviewBtn = _el('exam-review-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', function() {
        if (window.ExamEngine) ExamEngine.toggleReview();
      });
    }

    // Submit button (top bar or wherever placed)
    var submitBtn = _el('exam-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        _showSubmitModal();
      });
    }

    // Palette FAB (mobile)
    var palFab = _el('exam-palette-fab');
    if (palFab) {
      palFab.addEventListener('click', function() {
        if (window.PaletteManager) PaletteManager.toggle();
      });
    }

    // Keyboard handler
    document.addEventListener('keydown', function(e) {
      if (window.ExamEngine && typeof ExamEngine.handleKeyboard === 'function') {
        ExamEngine.handleKeyboard(e);
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════
     PUBLIC API — Called by ExamEngine
     ═══════════════════════════════════════════════════════════ */

  return {

    /**
     * Full exam render — called once when exam starts.
     */
    renderExam: function() {
      _renderHeader();
      _renderQuestionArea();
      _updateNavControls();

      // Initialize palette
      if (window.PaletteManager) {
        PaletteManager.init('exam-sidebar-palette');
      }

      _bindEvents();
    },

    /**
     * Re-render the current question + options.
     */
    renderQuestion: function() {
      _renderQuestionArea();
    },

    /**
     * Re-render only the option buttons.
     */
    renderOptions: function() {
      _renderOptions();
    },

    /**
     * Update the timer display.
     * @param {number} remaining
     * @param {Object} timerState
     */
    updateTimer: function(remaining, timerState) {
      _updateTimer(remaining, timerState);
    },

    /**
     * Set timer to warning visual state.
     */
    setTimerWarning: function() {
      var el = _el('exam-timer');
      if (el) el.classList.add('warning');
    },

    /**
     * Set timer to critical visual state.
     */
    setTimerCritical: function() {
      var el = _el('exam-timer');
      if (el) {
        el.classList.remove('warning');
        el.classList.add('critical');
      }
    },

    /**
     * Update navigation buttons (prev/next disabled states).
     */
    updateNavControls: function() {
      _updateNavControls();
    },

    /**
     * Update the review button state.
     * @param {boolean} isMarked
     */
    updateReviewButton: function(isMarked) {
      _updateReviewButton(isMarked);
    },

    /**
     * Update palette (delegates to PaletteManager).
     */
    updatePalette: function() {
      if (window.PaletteManager) PaletteManager.updatePalette();
    },

    /**
     * Update status strip (delegates to PaletteManager).
     */
    updateStatusStrip: function() {
      if (window.PaletteManager) PaletteManager.updateStatusStrip();
    },

    /**
     * Update progress bar and text.
     */
    updateProgress: function() {
      _updateProgress();
    },

    /**
     * Show the submit confirmation modal.
     */
    showSubmitModal: function() {
      _showSubmitModal();
    }
  };

})();

// Expose globally
window.ExamRenderer = ExamRenderer;
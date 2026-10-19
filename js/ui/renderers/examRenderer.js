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

    // Populate candidate identity
    var user = (window.AppState && typeof AppState.getUser === 'function') ? AppState.getUser() : null;
    var name = (user && user.name) ? user.name : 'Rohit';
    var initial = name.charAt(0).toUpperCase();

    var nameEl     = _el('exam-candidate-name');
    var avatarEl   = _el('exam-candidate-avatar');
    var scNameEl   = _el('sc-name');
    var scAvatarEl = _el('sc-avatar');

    if (nameEl)     nameEl.textContent = name;
    if (avatarEl)   avatarEl.textContent = initial;
    if (scNameEl)   scNameEl.textContent = name;
    if (scAvatarEl) scAvatarEl.textContent = initial;

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
      var subjLower = (q.subject || '').toLowerCase();
      if (subjLower.indexOf('bio') !== -1) subjIcon = '🧬 ';
      else if (subjLower.indexOf('chem') !== -1) subjIcon = '🧪 ';
      else if (subjLower.indexOf('phy') !== -1) subjIcon = '⚡ ';
      else if (subjLower.indexOf('gk') !== -1) subjIcon = '📰 ';
      else subjIcon = '📚 ';

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
      diffEl.textContent = diffLabel.toUpperCase();
      diffEl.className = 'q-diff-badge ' + (diffClass || ('diff-' + diffLabel.toLowerCase()));
    }

    // Question text
    var textEl = _el('exam-q-text');
    if (textEl) {
      if (window.StemFormatter && typeof StemFormatter.renderTo === 'function') {
        StemFormatter.renderTo(textEl, q);
      } else {
        textEl.textContent = q.question;
      }
    }

    // Options
    _renderOptions();

    // Reset scroll to top
    var cardEl = document.querySelector('.question-card');
    if (cardEl) cardEl.scrollTop = 0;

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

      var optContent = (window.StemFormatter && typeof StemFormatter.formatOption === 'function')
        ? StemFormatter.formatOption(q.options[i])
        : _esc(q.options[i]);

      html += '<button class="option-btn' + selClass + '" ' +
              'data-option-idx="' + i + '" ' +
              'role="radio" ' +
              'aria-checked="' + (isSelected ? 'true' : 'false') + '" ' +
              'aria-label="' + _esc(ariaLabel) + '">' +
                '<span class="opt-label">' + _esc(label) + '</span>' +
                '<span class="opt-text">' + optContent + '</span>' +
                '<span class="opt-key-hint" title="Press key ' + (i + 1) + '">' + (i + 1) + '</span>' +
                '<span class="opt-radio-dot" aria-hidden="true"></span>' +
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
        nextBtn.innerHTML = '<span>Submit Test</span> <span class="btn-arrow" aria-hidden="true">❯</span>';
        nextBtn.classList.add('btn-submit-last');
      } else {
        nextBtn.innerHTML = '<span>Next Question</span> <span class="btn-arrow" aria-hidden="true">❯</span>';
        nextBtn.classList.remove('btn-submit-last');
      }
    }
  }

  function _updateReviewButton(isMarked) {
    var btn = _el('exam-review-btn');
    if (!btn) return;

    if (isMarked) {
      btn.classList.add('active');
      btn.innerHTML = '<span class="btn-icon" aria-hidden="true">★</span> <span>Marked for Review</span>';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<span class="btn-icon" aria-hidden="true">★</span> <span>Mark for Review</span>';
      btn.setAttribute('aria-pressed', 'false');
    }
  }


  /* ─────────────────────────────────────────────────────────
     TIMER UI
     ───────────────────────────────────────────────────────── */

  function _updateTimer(remaining, timerState) {
    var timerEl = _el('exam-timer');
    if (!timerEl) return;

    // Format time: HH:MM:SS for >= 3600 seconds, MM:SS for < 3600
    var timeStr = '00:00';
    if (window.Formatters) {
      if (remaining >= 3600 && typeof Formatters.toHHMMSS === 'function') {
        timeStr = Formatters.toHHMMSS(remaining);
      } else if (typeof Formatters.toMMSS === 'function') {
        timeStr = Formatters.toMMSS(remaining);
      }
    } else {
      var h = Math.floor(remaining / 3600);
      var m = Math.floor((remaining % 3600) / 60);
      var s = remaining % 60;
      timeStr = (h > 0 ? (h < 10 ? '0' : '') + h + ':' : '') +
                (m < 10 ? '0' : '') + m + ':' +
                (s < 10 ? '0' : '') + s;
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

    overlay.innerHTML =
      '<div class="modal-sheet submit-modal">' +
        '<div class="modal-header">' +
          '<div class="submit-modal-title-wrap">' +
            '<span class="submit-modal-icon">📑</span>' +
            '<div>' +
              '<h3 class="modal-title">Final Exam Submission</h3>' +
              '<p class="submit-modal-sub">' + _esc(summary.testTitle) + '</p>' +
            '</div>' +
          '</div>' +
          '<button class="modal-close-btn" id="submit-modal-close" aria-label="Cancel">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
          '<div class="submit-stats-grid">' +
            '<div class="sub-stat-card sub-stat-ans">' +
              '<span class="sub-stat-num">' + counts.answered + '</span>' +
              '<span class="sub-stat-label">✅ Answered</span>' +
            '</div>' +
            '<div class="sub-stat-card sub-stat-unans">' +
              '<span class="sub-stat-num">' + counts.unanswered + '</span>' +
              '<span class="sub-stat-label">⬜ Unanswered</span>' +
            '</div>' +
            '<div class="sub-stat-card sub-stat-rev">' +
              '<span class="sub-stat-num">' + counts.review + '</span>' +
              '<span class="sub-stat-label">🔖 Marked Review</span>' +
            '</div>' +
            '<div class="sub-stat-card sub-stat-time">' +
              '<span class="sub-stat-num">' + _esc(summary.timeFormatted) + '</span>' +
              '<span class="sub-stat-label">⏱️ Time Left</span>' +
            '</div>' +
          '</div>' +
          (counts.unanswered > 0
            ? '<div class="submit-alert-box">' +
                '<span class="alert-icon">⚠️</span>' +
                '<span>You still have <strong>' + counts.unanswered + ' unanswered question' + (counts.unanswered > 1 ? 's' : '') + '</strong>. Are you sure you want to finish now?</span>' +
              '</div>'
            : '<div class="submit-alert-box alert-success">' +
                '<span class="alert-icon">🎉</span>' +
                '<span>All <strong>' + counts.answered + ' questions</strong> answered! Ready for evaluation.</span>' +
              '</div>'
          ) +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn-secondary" id="submit-modal-cancel">← Return to Exam</button>' +
          '<button class="btn-primary btn-submit-final" id="submit-modal-confirm">Confirm &amp; Submit Score 🚀</button>' +
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

    // Fullscreen toggle button
    var fsBtn = _el('exam-fullscreen-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(function() {});
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(function() {});
          }
        }
      });
    }

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
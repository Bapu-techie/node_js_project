/* ============================================================
   EXAM CONSTANTS — Exam-Related Configuration Values
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance

   Centralized constants for exam logic, scoring, and timing.
   
   AIIMS BSc Nursing Entrance Pattern:
   - 4 Subjects: Physics, Chemistry, Biology, General Knowledge
   - 70 questions total (AIIMS pattern)
   - Duration: 90 minutes
   - Marking: +1 correct, −1/3 wrong, 0 unanswered
   - 25 chapters across 4 subjects
   ============================================================ */

'use strict';

var ExamConstants = {

  /* ═══════════════════════════════════════════════════════════
     SCORING (AIIMS Pattern)
     ═══════════════════════════════════════════════════════════ */

  /** Points awarded for a correct answer */
  SCORE_CORRECT: 1,

  /** Points deducted for a wrong answer (as a fraction: 1/3) */
  SCORE_WRONG_FRACTION: 1 / 3,

  /** Points for an unanswered/skipped question */
  SCORE_UNANSWERED: 0,

  /** Maximum score per question */
  SCORE_PER_QUESTION: 1,

  /* ═══════════════════════════════════════════════════════════
     TIMER
     ═══════════════════════════════════════════════════════════ */

  TIMER_WARNING_THRESHOLD: 120,
  TIMER_CRITICAL_THRESHOLD: 30,
  TIMER_TICK_INTERVAL: 1000,
  AUTO_SUBMIT_DELAY: 2000,
  HIDDEN_TIME_MIN_CORRECTION: 2,

  /* ═══════════════════════════════════════════════════════════
     QUESTION RESOLUTION
     ═══════════════════════════════════════════════════════════ */

  MAX_QUESTIONS_PER_TEST: 500,
  DEFAULT_OPTIONS_COUNT: 4,
  DIFFICULTY_LEVELS: ['easy', 'medium', 'hard'],
  DEFAULT_DIFFICULTY: 'medium',

  /* ═══════════════════════════════════════════════════════════
     SUBJECTS — Matches QUESTION_BANK top-level keys
     ═══════════════════════════════════════════════════════════ */

  SUBJECTS: {
    PHYSICS:   'physics',
    CHEMISTRY: 'chemistry',
    BIOLOGY:   'biology',
    GK:        'gk'
  },

  SUBJECT_LABELS: {
    physics:   'Physics',
    chemistry: 'Chemistry',
    biology:   'Biology',
    gk:        'General Knowledge'
  },

  SUBJECT_ICONS: {
    physics:   '⚡',
    chemistry: '🧪',
    biology:   '🧬',
    gk:        '📰'
  },

  /* ═══════════════════════════════════════════════════════════
     CHAPTERS — All 25 topic keys from QUESTION_BANK
     ═══════════════════════════════════════════════════════════ */

  CHAPTERS: {
    // Physics (7 chapters)
    current_electricity:      { subject: 'physics',   label: 'Current Electricity',       icon: '🔌', questionCount: 10 },
    optics:                   { subject: 'physics',   label: 'Optics',                    icon: '🔬', questionCount: 10 },
    electrostatics:           { subject: 'physics',   label: 'Electrostatics',            icon: '⚡', questionCount: 10 },
    kinematics:               { subject: 'physics',   label: 'Kinematics',                icon: '🏃', questionCount: 10 },
    work_energy_power:        { subject: 'physics',   label: 'Work, Energy & Power',      icon: '💪', questionCount: 10 },
    modern_physics:           { subject: 'physics',   label: 'Modern Physics',            icon: '🔭', questionCount: 10 },
    oscillations_waves:       { subject: 'physics',   label: 'Oscillations & Waves',      icon: '🌊', questionCount: 10 },

    // Chemistry (7 chapters)
    chemical_bonding:         { subject: 'chemistry', label: 'Chemical Bonding',           icon: '🔗', questionCount: 10 },
    periodic_table:           { subject: 'chemistry', label: 'Periodic Table',             icon: '📊', questionCount: 10 },
    p_block_elements:         { subject: 'chemistry', label: 'p-Block Elements',           icon: '🧱', questionCount: 10 },
    organic_chemistry:        { subject: 'chemistry', label: 'Organic Chemistry',          icon: '⚗️', questionCount: 10 },
    equilibrium_ionic:        { subject: 'chemistry', label: 'Ionic Equilibrium',          icon: '⚖️', questionCount: 10 },
    coordination_compounds:   { subject: 'chemistry', label: 'Coordination Compounds',     icon: '🔩', questionCount: 10 },
    biomolecules_polymers:    { subject: 'chemistry', label: 'Biomolecules & Polymers',    icon: '🧫', questionCount: 10 },

    // Biology (7 chapters)
    human_physiology:         { subject: 'biology',   label: 'Human Physiology',           icon: '❤️', questionCount: 10 },
    genetics_molecular:       { subject: 'biology',   label: 'Genetics & Molecular Biology', icon: '🧬', questionCount: 10 },
    reproduction:             { subject: 'biology',   label: 'Reproduction',               icon: '🌱', questionCount: 10 },
    ecology_environment:      { subject: 'biology',   label: 'Ecology & Environment',      icon: '🌍', questionCount: 10 },
    cell_biology:             { subject: 'biology',   label: 'Cell Biology',               icon: '🔬', questionCount: 10 },
    biotechnology:            { subject: 'biology',   label: 'Biotechnology',              icon: '🧪', questionCount: 10 },
    biology_human_welfare:    { subject: 'biology',   label: 'Biology & Human Welfare',    icon: '🏥', questionCount: 10 },

    // General Knowledge (4 chapters)
    current_affairs:          { subject: 'gk',        label: 'Current Affairs',            icon: '📰', questionCount: 10 },
    indian_polity:            { subject: 'gk',        label: 'Indian Polity',              icon: '🏛️', questionCount: 10 },
    health_organizations:     { subject: 'gk',        label: 'Health Organizations',       icon: '🏥', questionCount: 10 },
    awards_important_dates:   { subject: 'gk',        label: 'Awards & Important Dates',   icon: '🏆', questionCount: 10 }
  },

  /* ═══════════════════════════════════════════════════════════
     TEST TYPES
     ═══════════════════════════════════════════════════════════ */

  TEST_TYPES: {
    TOPIC:       'topic',
    CHAPTER:     'chapter',
    SUBJECT:     'subject',
    MULTI:       'multi',
    MOCK:        'mock',
    QUICK:       'quick'
  },

  TEST_TYPE_LABELS: {
    topic:   'Topic-wise',
    chapter: 'Chapter-wise',
    subject: 'Subject-wise',
    multi:   'Multi-Subject',
    mock:    'Full Mock Test',
    quick:   'Quick Revision'
  },

  TEST_TYPE_ICONS: {
    topic:   '📝',
    chapter: '📖',
    subject: '📚',
    multi:   '🔗',
    mock:    '🎯',
    quick:   '⚡'
  },

  TEST_TYPE_BADGE: {
    topic:   'badge-teal',
    chapter: 'badge-blue',
    subject: 'badge-purple',
    multi:   'badge-amber',
    mock:    'badge-rose',
    quick:   'badge-green'
  },

  /* ═══════════════════════════════════════════════════════════
     QUESTION STATUS
     ═══════════════════════════════════════════════════════════ */

  QUESTION_STATUS: {
    CORRECT:  'correct',
    WRONG:    'wrong',
    SKIPPED:  'skipped'
  },

  /* ═══════════════════════════════════════════════════════════
     OPTION LABELS
     ═══════════════════════════════════════════════════════════ */

  OPTION_LABELS: ['A', 'B', 'C', 'D'],

  /* ═══════════════════════════════════════════════════════════
     KEYBOARD SHORTCUTS
     ═══════════════════════════════════════════════════════════ */

  KEY_OPTION_MAP: { '1': 0, '2': 1, '3': 2, '4': 3 },

  SHORTCUTS: {
    PREV:           ['ArrowLeft', 'ArrowUp'],
    NEXT:           ['ArrowRight', 'ArrowDown'],
    MARK_REVIEW:    ['r', 'R'],
    CLEAR_RESPONSE: ['c', 'C'],
    OPEN_PALETTE:   ['p', 'P'],
    SUBMIT:         ['s', 'S']
  },

  /* ═══════════════════════════════════════════════════════════
     PERFORMANCE THRESHOLDS
     ═══════════════════════════════════════════════════════════ */

  PERFORMANCE: {
    EXCELLENT: { min: 80, label: '🏆 Excellent! AIIMS Ready!',       class: 'perf-excellent' },
    GOOD:      { min: 60, label: '👍 Good! Keep Pushing!',           class: 'perf-good' },
    AVERAGE:   { min: 40, label: '📊 Average — Focus on Weak Areas', class: 'perf-average' },
    POOR:      { min: 0,  label: '📈 Keep Practicing! You\'ll Improve', class: 'perf-poor' }
  },

  SCORE_COLORS: {
    GOOD_MIN: 70,
    AVG_MIN:  40
  },

  DIFFICULTY_CLASS: {
    easy:   'diff-easy',
    medium: 'diff-medium',
    hard:   'diff-hard'
  },

  DIFFICULTY_LABEL: {
    easy:   'Easy',
    medium: 'Medium',
    hard:   'Hard'
  },

  /* ═══════════════════════════════════════════════════════════
     AIIMS EXAM PATTERN REFERENCE
     ═══════════════════════════════════════════════════════════ */

  AIIMS_PATTERN: {
    totalQuestions: 70,
    duration: 90,
    subjects: {
      physics:   { questions: 15, weight: '21.4%' },
      chemistry: { questions: 15, weight: '21.4%' },
      biology:   { questions: 30, weight: '42.9%' },
      gk:        { questions: 10, weight: '14.3%' }
    }
  },

  /* ═══════════════════════════════════════════════════════════
     HELPER METHODS
     ═══════════════════════════���═══════════════════════════════ */

  getPerformanceLevel: function(accuracy) {
    if (accuracy >= this.PERFORMANCE.EXCELLENT.min) return this.PERFORMANCE.EXCELLENT;
    if (accuracy >= this.PERFORMANCE.GOOD.min)      return this.PERFORMANCE.GOOD;
    if (accuracy >= this.PERFORMANCE.AVERAGE.min)    return this.PERFORMANCE.AVERAGE;
    return this.PERFORMANCE.POOR;
  },

  getScoreClass: function(pct) {
    if (pct >= this.SCORE_COLORS.GOOD_MIN) return 'sco-good';
    if (pct >= this.SCORE_COLORS.AVG_MIN)  return 'sco-avg';
    return 'sco-poor';
  },

  getTestTypeInfo: function(type) {
    return {
      label: this.TEST_TYPE_LABELS[type] || type,
      icon:  this.TEST_TYPE_ICONS[type]  || '📝',
      badge: this.TEST_TYPE_BADGE[type]  || 'badge-teal'
    };
  },

  getDifficultyInfo: function(diff) {
    return {
      label:    this.DIFFICULTY_LABEL[diff] || this.DIFFICULTY_LABEL[this.DEFAULT_DIFFICULTY],
      cssClass: this.DIFFICULTY_CLASS[diff]  || this.DIFFICULTY_CLASS[this.DEFAULT_DIFFICULTY]
    };
  },

  getSubjectInfo: function(subjectKey) {
    return {
      label: this.SUBJECT_LABELS[subjectKey] || subjectKey,
      icon:  this.SUBJECT_ICONS[subjectKey]  || '📋'
    };
  },

  getChapterInfo: function(chapterKey) {
    return this.CHAPTERS[chapterKey] || null;
  }
};

// Expose globally
window.ExamConstants = ExamConstants;
/* ============================================================
   STEM FORMATTER — Science, Technology, Engineering & Math Typesetting
   NursePrep Pro v3.0 — AIIMS Nursing & MP PNST 2027 Entrance

   Provides comprehensive, publication-grade examination typography:
   - High-Precision Mathematical & Physics Expressions
   - LaTeX Math parsing via KaTeX (with robust zero-latency offline fallback)
   - Chemical Formula Auto-Subscripting (e.g. C6H5CHO, BaSO4, CrO2Cl2)
   - Ionic Charges & Polyatomic Ions (e.g. H3O+, Fe3+, Ca2+, SO4^2-, NO3-)
   - Nuclear Physics Isotope Notation (e.g. 14_7 N -> ¹⁴₇N)
   - Physics Variables, Subscripts & Exponents (m_p, A1, R1, rho1, c^2)
   - Greek Alphabet Transcription (rho, lambda, alpha, beta, etc.)
   - Reaction Arrows & Chemical Equations (->, <=>, over Pd-BaSO4)
   - Structured "Given Parameters & Constants" Callout Extraction
   - Named Reaction formatting in Multiple Choice Options

   Dependencies: KaTeX (optional, CDN with graceful native fallback)
   Used by: ExamRenderer, ResultRenderer
   ============================================================ */

'use strict';

var StemFormatter = (function() {

  // Universal Greek alphabet mapping for science expressions
  var GREEK_MAP = {
    'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ', 'Delta': 'Δ',
    'epsilon': 'ε', 'zeta': 'ζ', 'eta': 'η', 'theta': 'θ', 'iota': 'ι',
    'kappa': 'κ', 'lambda': 'λ', 'Lambda': 'Λ', 'mu': 'μ', 'nu': 'ν',
    'xi': 'ξ', 'pi': 'π', 'rho': 'ρ', 'sigma': 'σ', 'tau': 'τ',
    'phi': 'φ', 'chi': 'χ', 'psi': 'ψ', 'omega': 'ω', 'Omega': 'Ω'
  };

  // Common metallic cations for charge differentiation
  var METAL_CATIONS = {
    'Fe': true, 'Ca': true, 'Mg': true, 'Al': true, 'Cu': true, 'Zn': true,
    'Na': true, 'K': true,  'Ag': true, 'Ba': true, 'Ni': true, 'Co': true,
    'Pb': true, 'Sn': true, 'Mn': true, 'Cr': true, 'Li': true, 'Sr': true
  };

  // Words, Roman numerals & medical acronyms that should NOT be parsed as chemical formulas
  var SKIP_WORDS = {
    'DNA': true, 'RNA': true, 'ATP': true, 'ADP': true, 'AMP': true,
    'CBT': true, 'AIIMS': true, 'PNST': true, 'NCERT': true,
    'I': true, 'II': true, 'III': true, 'IV': true, 'V': true, 'VI': true,
    'VII': true, 'VIII': true, 'IX': true, 'X': true, 'XI': true, 'XII': true,
    'IC': true, 'FRC': true, 'VC': true, 'TLC': true, 'ERV': true, 'RV': true, 'TV': true, 'IRV': true,
    'PE': true, 'KE': true, 'SHM': true, 'EMF': true, 'AC': true, 'DC': true,
    'ADH': true, 'ACTH': true, 'FSH': true, 'LH': true, 'TSH': true, 'GH': true, 'PRL': true, 'MSH': true,
    'AND': true, 'THE': true, 'FOR': true, 'WITH': true, 'FROM': true,
    'OVER': true, 'WHAT': true, 'WHICH': true, 'THAT': true, 'THIS': true,
    'THESE': true, 'THOSE': true, 'HAVE': true, 'HAS': true, 'HAD': true,
    'WHEN': true, 'WHERE': true, 'WHY': true, 'HOW': true, 'NOT': true,
    'NONE': true, 'ALL': true, 'BOTH': true, 'EACH': true, 'INTO': true,
    'ONLY': true, 'TRUE': true, 'FALSE': true, 'CORRECT': true, 'INCORRECT': true,
    'MEV': true, 'KEV': true, 'EV': true, 'MOL': true, 'CAL': true, 'KCAL': true,
    'ATM': true, 'TORR': true, 'BAR': true, 'PA': true, 'JOULE': true, 'RT': true
  };

  function _esc(str) {
    if (typeof window !== 'undefined' && window.Helpers && typeof Helpers.escapeHtml === 'function') {
      return Helpers.escapeHtml(str);
    }
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Internal helper to format a single chemical formula string into HTML
   */
  function _formatChemicalFormula(formula) {
    var f = formula;

    // 1. Explicit caret charge like PO4^3- or SO4^2- or CO3^2-
    f = f.replace(/\^([0-9]*[+-])/g, '<sup class="chem-charge">$1</sup>');

    // 2. Trailing charge with carets or minus/plus: e.g. HCO3- or OH- or H3O+
    f = f.replace(/([A-Za-z0-9\)])(\^[0-9]*[+-]|[0-9]?[+-])$/g, function(m, base, ch) {
      var clean = ch.replace('^', '');
      return base + '<sup class="chem-charge">' + clean + '</sup>';
    });

    // 3. Metal cations: Fe3+, Ca2+, Mg2+, Cu2+, etc.
    f = f.replace(/\b([A-Z][a-z]?)([1-9]?[+-])(?!\w)/g, function(m, metal, charge) {
      if (METAL_CATIONS[metal]) {
        return metal + '<sup class="chem-charge">' + charge + '</sup>';
      }
      return m;
    });

    // 4. Subscript numbers following element letters or closing parentheses
    f = f.replace(/([A-Za-z\)])(\d+)/g, '$1<sub class="chem-sub">$2</sub>');

    return '<span class="stem-chem">' + f + '</span>';
  }

  /**
   * Primary formatting function that processes text for math, physics,
   * chemistry, and scientific notation.
   *
   * @param {string} text - Raw input text
   * @returns {string} Safe HTML with formatted STEM elements
   */
  function format(text) {
    if (!text) return '';
    var str = String(text);
    var stash = [];

    // Helper to stash HTML fragments and prevent re-matching
    function stashToken(html) {
      var id = stash.length;
      stash.push(html);
      return '§STEM_' + id + '§';
    }

    // 0. LaTeX Math Blocks ($$...$$, $...$, \[...\], \(...\))
    str = str.replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]/g, function(match, tex1, tex2) {
      var tex = (tex1 || tex2 || '').trim();
      if (typeof window !== 'undefined' && window.katex && typeof window.katex.renderToString === 'function') {
        try {
          return stashToken(window.katex.renderToString(tex, { displayMode: true, throwOnError: false }));
        } catch (e) {}
      }
      return stashToken('<div class="stem-math-block stem-display-math">' + _esc(tex) + '</div>');
    });

    str = str.replace(/\$([^\$\n]+?)\$|\\\(([\s\S]+?)\\\)/g, function(match, tex1, tex2) {
      var tex = (tex1 || tex2 || '').trim();
      if (typeof window !== 'undefined' && window.katex && typeof window.katex.renderToString === 'function') {
        try {
          return stashToken(window.katex.renderToString(tex, { displayMode: false, throwOnError: false }));
        } catch (e) {}
      }
      return stashToken('<span class="stem-math-inline">' + _esc(tex) + '</span>');
    });

    // 1. Nuclear isotope notation: (14_7 N) or 14_7 N or ^14_7 N
    str = str.replace(/(?:\(?\b(\d+)_(\d+)\s*([A-Z][a-z]?)\b\)?)/g, function(match, mass, atomic, elem) {
      var html =
        '<span class="stem-isotope">' +
          '<span class="iso-stack">' +
            '<span class="iso-top">' + mass + '</span>' +
            '<span class="iso-bot">' + atomic + '</span>' +
          '</span>' +
          '<span class="iso-elem">' + elem + '</span>' +
        '</span>';
      return stashToken(html);
    });

    // 2. Physiology partial pressures: pO2, pCO2
    str = str.replace(/\b(p)(O2|CO2)\b/g, function(match, p, gas) {
      var subGas = gas.replace(/(\d+)/g, '<sub class="chem-sub">$1</sub>');
      return stashToken('<i>p</i><span class="stem-chem">' + subGas + '</span>');
    });

    // 3. Thermodynamic change variables: deltaH, delta_H, deltaG, delta_G, deltaS, delta_S, deltaT, delta_T, deltaV, delta_V, deltaP, delta_P, delta_m
    str = str.replace(/\b(?:delta|Delta)[_ ]?([HGSSTVPm])(°)?\b/g, function(m, sym, deg) {
      return stashToken('<span class="stem-var">Δ<i>' + sym + '</i>' + (deg ? '°' : '') + '</span>');
    });

    // 4. Equilibrium constants & electrode potentials: Kp, Kc, Qc, Ka, Kb, Kw, Ksp, E_cell, E0
    str = str.replace(/\b(K|Q)(p|c|a|b|w|sp|eq)\b/g, function(match, main, sub) {
      return stashToken('<span class="stem-var"><i>' + main + '</i><sub>' + sub + '</sub></span>');
    });
    str = str.replace(/\bE(?:_cell|cell)\b/g, function() {
      return stashToken('<span class="stem-var"><i>E</i><sub>cell</sub></span>');
    });
    str = str.replace(/\bE°(?:cell)?\b/g, function(match) {
      return stashToken('<span class="stem-var"><i>E</i>°' + (match.indexOf('cell') !== -1 ? '<sub>cell</sub>' : '') + '</span>');
    });

    // 5. Greek names with subscripts or ratios: rho1, rho2, rho_c, lambda1, theta
    str = str.replace(/\b(alpha|beta|gamma|delta|Delta|lambda|Lambda|mu|pi|rho|sigma|theta|omega|Omega)(?:_([0-9a-zA-Z]+)|([0-9]+))?\b/g, function(match, greek, sub1, sub2) {
      var symbol = GREEK_MAP[greek] || greek;
      var sub = sub1 || sub2;
      if (sub !== undefined && sub !== '') {
        return stashToken('<span class="stem-var">' + symbol + '<sub>' + sub + '</sub></span>');
      }
      return stashToken('<span class="stem-greek">' + symbol + '</span>');
    });

    // 6. Physics variables with subscripts: m_H, m_n, m_p, m_e, A1, A2, R1, R2, R0, C1, C2, L1, L2, V1, V2, I1, I2, f1, f2
    str = str.replace(/\b([mMRCLVIP Tfv])_([a-zA-Z0-9]+)\b/g, function(match, v, sub) {
      return stashToken('<span class="stem-var"><i>' + v + '</i><sub>' + sub + '</sub></span>');
    });
    str = str.replace(/\b([ARCLVIP Tfv])([120])\b(?=\s*[=:,<>]|\s*and|\s*,|\s*\)|\s*\/\s*[ARCLVIP Tfv][120])/g, function(match, v, sub) {
      return stashToken('<span class="stem-var"><i>' + v + '</i><sub>' + sub + '</sub></span>');
    });

    // 7. Organic group notation: R-COCl, R-CHO, R-COOH, R-OH, R-NH2
    str = str.replace(/\bR-([A-Z][a-zA-Z0-9]*)\b/g, function(m, group) {
      var formatted = group.replace(/(\d+)/g, '<sub class="chem-sub">$1</sub>');
      return stashToken('<span class="stem-chem">R–' + formatted + '</span>');
    });

    // 8. Diatomic gases with optional stoichiometric coefficient: N2, 3H2, 2O2, Cl2, etc.
    str = str.replace(/(?:^|(?<=\s|[+\-=(;,–—\/]))(\d+)?([HONClBrI])2(?!\w)/g, function(match, coef, elem) {
      var prefix = coef ? coef + ' ' : '';
      return stashToken(prefix + '<span class="stem-chem">' + elem + '<sub class="chem-sub">2</sub></span>');
    });

    // 9. Multi-character chemical formulas with numbers or charges and optional leading coefficient:
    // e.g. 2SO2, 2SO3, 2NH3, CH3CHO, BaSO4, CrO2Cl2, CS2, AlCl3, CuCl, H2SO4, H3O+, CO3^2-, SO4^2-
    str = str.replace(/(?:^|(?<=\s|[+\-=(;,–—\/]))(\d+)?([A-Z][a-z]?(?:\d+|[A-Z][a-z]?)+(?:\^[0-9]*[+-]|[1-9]?[+-])?)(?!\w)/g, function(match, coef, formula) {
      if (SKIP_WORDS[formula.toUpperCase()]) return match;
      var prefix = coef ? coef + ' ' : '';
      return stashToken(prefix + _formatChemicalFormula(formula));
    });

    // Common chemical species without numbers: NaOH, KOH, HCl, NaCl, HCHO, HCOONa, NH3, H2O
    str = str.replace(/\b(NaOH|KOH|HCl|NaCl|HCHO|HCOONa|NH3|H2O)\b/g, function(match) {
      return stashToken(_formatChemicalFormula(match));
    });

    // 10. Exponents / carets: c^2, MeV/c^2, kg/m^3, 10^17, A^(1/3), 10^-19
    str = str.replace(/\b([a-zA-Z0-9_\)]+)\^(\([^\)]+\)|[0-9\/\+\-]+)/g, function(match, base, exp) {
      var cleanExp = exp.replace(/^\(|\)$/g, '');
      return stashToken(base + '<sup>' + cleanExp + '</sup>');
    });

    // 11. Reaction arrows & math operators
    str = str.replace(/<=>|<->/g, ' ⇌ ');
    str = str.replace(/->|-->/g, ' → ');
    str = str.replace(/~=|~/g, ' ≈ ');
    str = str.replace(/\+\/-/g, ' ± ');

    // 12. Restore all stashed tokens
    for (var i = 0; i < stash.length; i++) {
      str = str.replace('§STEM_' + i + '§', stash[i]);
    }

    return str;
  }

  /**
   * Helper: Match the Column / List I & List II comparative tables
   */
  function _tryParseMatch(raw) {
    var matchRegex = /^(.*?)\n\s*(?:List\s*I|Column\s*I)[:\s]+([\s\S]+?)\n\s*(?:List\s*II|Column\s*II)[:\s]+([\s\S]+)$/i;
    var m = raw.match(matchRegex);
    if (!m) return null;

    var lead = m[1].trim();
    var list1Raw = m[2].trim();
    var list2Raw = m[3].trim();

    function parseItems(str, isLetter) {
      var regex = isLetter ? /(?:^|,|\s+)([PQRSTABCD])\.\s*/g : /(?:^|,|\s+)([123456])\.\s*/g;
      var indices = [];
      var match;
      while ((match = regex.exec(str)) !== null) {
        indices.push({ key: match[1], index: match.index, length: match[0].length });
      }
      var items = [];
      for (var i = 0; i < indices.length; i++) {
        var cur = indices[i];
        var next = indices[i + 1];
        var start = cur.index + cur.length;
        var end = next ? next.index : str.length;
        var val = str.substring(start, end).replace(/[,;]$/, '').trim();
        items.push({ key: cur.key, text: val });
      }
      return items;
    }

    var list1 = parseItems(list1Raw, true);
    var list2 = parseItems(list2Raw, false);

    var maxRows = Math.max(list1.length, list2.length);
    var rowsHtml = '';
    for (var r = 0; r < maxRows; r++) {
      var item1 = list1[r] || { key: '', text: '' };
      var item2 = list2[r] || { key: '', text: '' };
      rowsHtml +=
        '<tr>' +
          '<td class="cell-left">' + (item1.key ? '<span class="col-key">' + item1.key + '</span> ' : '') + format(item1.text) + '</td>' +
          '<td class="cell-right">' + (item2.key ? '<span class="col-key">' + item2.key + '</span> ' : '') + format(item2.text) + '</td>' +
        '</tr>';
    }

    return '<div class="stem-question-body">' +
             '<div class="q-match-card">' +
               '<div class="q-match-lead">' + format(lead) + '</div>' +
               '<div class="q-match-table-wrapper">' +
                 '<table class="q-match-table">' +
                   '<thead>' +
                     '<tr>' +
                       '<th class="col-left">LIST I / COLUMN I</th>' +
                       '<th class="col-right">LIST II / COLUMN II</th>' +
                     '</tr>' +
                   '</thead>' +
                   '<tbody>' + rowsHtml + '</tbody>' +
                 '</table>' +
               '</div>' +
             '</div>' +
           '</div>';
  }

  /**
   * Helper: Assertion (A) & Reason (R) dual cards
   */
  function _tryParseAssertionReason(raw) {
    var arRegex = /Assertion\s*(?:\([A-Za-z0-9]+\))?[:\s]+([\s\S]+?)\n\s*Reason\s*(?:\([A-Za-z0-9]+\))?[:\s]+([\s\S]+)$/i;
    var m = raw.match(arRegex);
    if (!m) return null;

    var assertion = m[1].trim();
    var reason = m[2].trim();

    return '<div class="stem-question-body">' +
             '<div class="q-ar-card">' +
               '<div class="q-ar-intro">Read both Assertion (A) and Reason (R) carefully, then select the appropriate option:</div>' +
               '<div class="q-ar-block ar-assertion">' +
                 '<div class="q-ar-badge"><span class="ar-icon">🔷</span> ASSERTION (A)</div>' +
                 '<p class="q-ar-text">' + format(assertion) + '</p>' +
               '</div>' +
               '<div class="q-ar-block ar-reason">' +
                 '<div class="q-ar-badge"><span class="ar-icon">🔶</span> REASON (R)</div>' +
                 '<p class="q-ar-text">' + format(reason) + '</p>' +
               '</div>' +
             '</div>' +
           '</div>';
  }

  /**
   * Helper: Statement I & Statement II dual cards
   */
  function _tryParseStatement(raw) {
    var stmtRegex = /^(?:([\s\S]*?)\n\s*)?Statement\s*(?:I|1)[:\s]+([\s\S]+?)\n\s*Statement\s*(?:II|2)[:\s]+([\s\S]+?)(?:\n\s*(In light of[\s\S]*|Choose the[\s\S]*))?$/i;
    var m = raw.match(stmtRegex);
    if (!m) return null;

    var lead = (m[1] || 'Given below are two statements:').trim();
    var s1 = m[2].trim();
    var s2 = m[3].trim();
    var tail = (m[4] || 'In light of the above statements, choose the most appropriate answer:').trim();

    return '<div class="stem-question-body">' +
             '<div class="q-stmt-card">' +
               '<div class="q-stmt-lead">' + format(lead) + '</div>' +
               '<div class="q-stmt-block stmt-one">' +
                 '<div class="q-stmt-badge"><span class="stmt-badge-icon">1️⃣</span> STATEMENT I</div>' +
                 '<div class="q-stmt-text">' + format(s1) + '</div>' +
               '</div>' +
               '<div class="q-stmt-block stmt-two">' +
                 '<div class="q-stmt-badge"><span class="stmt-badge-icon">2️⃣</span> STATEMENT II</div>' +
                 '<div class="q-stmt-text">' + format(s2) + '</div>' +
               '</div>' +
               '<div class="q-stmt-tail">' + format(tail) + '</div>' +
             '</div>' +
           '</div>';
  }

  /**
   * Formats a complete question body, automatically identifying and structuring:
   * - Scientific Vector Schematics & Anatomical Diagrams (if associated)
   * - Match the Column Tables (List I vs. List II)
   * - Assertion (A) & Reason (R) Dual-Block Cards
   * - Statement I & Statement II Evaluation Cards
   * - "Given Parameters & Constants" Card (if present)
   *
   * @param {string|Object} qInput - Raw question text or question object
   * @returns {string} Rich HTML container
   */
  function formatQuestion(qInput) {
    if (!qInput) return '';
    var raw = '';
    var qObj = null;
    if (typeof qInput === 'object') {
      qObj = qInput;
      raw = String(qInput.question || '');
    } else {
      raw = String(qInput);
    }

    // Resolve diagram if available
    var diagramHtml = '';
    var SD = (typeof window !== 'undefined' && window.StemDiagrams) || (typeof StemDiagrams !== 'undefined' ? StemDiagrams : null);
    if (SD && typeof SD.getDiagram === 'function') {
      diagramHtml = SD.getDiagram(qObj || raw) || '';
    }

    // 1. Try Match the Column
    var matchHtml = _tryParseMatch(raw);
    if (matchHtml) {
      if (diagramHtml) {
        return '<div class="stem-question-body">' + diagramHtml + '</div>' + matchHtml;
      }
      return matchHtml;
    }

    // 2. Try Assertion & Reason
    var arHtml = _tryParseAssertionReason(raw);
    if (arHtml) {
      if (diagramHtml) {
        return '<div class="stem-question-body">' + diagramHtml + '</div>' + arHtml;
      }
      return arHtml;
    }

    // 3. Try Statement I & Statement II
    var stmtHtml = _tryParseStatement(raw);
    if (stmtHtml) {
      if (diagramHtml) {
        return '<div class="stem-question-body">' + diagramHtml + '</div>' + stmtHtml;
      }
      return stmtHtml;
    }

    // 4. Try Given parameters clause: ", given:" or ". Given:" or "Given that:"
    var givenMatch = raw.match(/^(.*?)(?:,\s*|\.\s*)(?:[Gg]iven[:\s]+)(.+)$/);
    if (givenMatch) {
      var promptPart = givenMatch[1].trim();
      var givenPart  = givenMatch[2].trim();

      var formattedPrompt = format(promptPart);
      if (!formattedPrompt.endsWith(':') && !formattedPrompt.endsWith('?')) {
        formattedPrompt += ':';
      }

      // Extract optional parentheses note like "(Take 1 u = 931.5 MeV/c^2)"
      var parenNote = '';
      givenPart = givenPart.replace(/\((Take|where|assume|Given)\s+([^\)]+)\)/gi, function(m, p1, p2) {
        parenNote = p1 + ' ' + p2;
        return '';
      }).trim();

      var items = [];
      var parts = givenPart.split(/,\s*(?=[A-Z0-9])/);
      for (var i = 0; i < parts.length; i++) {
        var clean = parts[i].replace(/\.$/, '').trim();
        if (clean) items.push(clean);
      }
      if (parenNote) items.push(parenNote);

      var givenHtml =
        '<div class="stem-given-card">' +
          '<div class="stem-given-header">' +
            '<span class="given-badge-icon">📋</span>' +
            '<span class="given-badge-title">GIVEN PARAMETERS &amp; CONSTANTS</span>' +
          '</div>' +
          '<div class="stem-given-grid">';

      for (var j = 0; j < items.length; j++) {
        givenHtml += '<div class="given-chip"><span class="given-dot">▪</span> ' + format(items[j]) + '</div>';
      }
      givenHtml += '</div></div>';

      return '<div class="stem-question-body">' +
               '<div class="stem-prompt">' + formattedPrompt + '</div>' +
               diagramHtml +
               givenHtml +
             '</div>';
    }

    return '<div class="stem-question-body">' +
             '<div class="stem-prompt">' + format(raw) + '</div>' +
             diagramHtml +
           '</div>';
  }

  /**
   * Formats a multiple-choice option text, recognizing:
   * - Match Option pairs (e.g. "P-2, Q-1, R-4, S-3")
   * - Named reactions (e.g. "Rosenmund reduction: R-COCl + H2...")
   * - Paired ratios (e.g. "R1 : R2 = 3 : 5 and rho1 : rho2 = 1 : 1")
   * - Chemical formulas and mathematical terms
   *
   * @param {string} optText - Raw option string
   * @returns {string} Formatted HTML option
   */
  function formatOption(optText) {
    if (!optText) return '';
    var str = String(optText);

    // 1. Match Option pattern: "P-2, Q-1, R-4, S-3" or "A-1, B-2, C-3, D-4"
    if (/^[A-Za-z0-9]\s*[-:]\s*[A-Za-z0-9](?:,\s*[A-Za-z0-9]\s*[-:]\s*[A-Za-z0-9])+$/.test(str.trim())) {
      var pairs = str.split(/,\s*/);
      var matchHtml = '<div class="opt-match-row">';
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(/[-:]/);
        matchHtml += '<span class="match-chip"><span class="chip-k">' + parts[0].trim() + '</span><span class="chip-arr">→</span><span class="chip-v">' + parts[1].trim() + '</span></span>';
      }
      matchHtml += '</div>';
      return matchHtml;
    }

    // 2. Named Reaction pattern: "Name: Formula/Reagent"
    var colonMatch = str.match(/^([A-Za-z\s–-]+(?:reaction|reduction|test|process|effect|condensation|synthesis)):\s*(.+)$/i);
    if (colonMatch) {
      var reactionName = colonMatch[1].trim();
      var reactionBody = colonMatch[2].trim();
      return '<strong class="stem-named-reaction">' + _esc(reactionName) + ':</strong> ' + format(reactionBody);
    }

    // 3. Paired Ratio pattern: "R1 : R2 = X : Y and rho1 : rho2 = A : B"
    var andRatioMatch = str.match(/^(.*?)\s+and\s+(.*?)$/i);
    if (andRatioMatch && andRatioMatch[1].indexOf(':') !== -1 && andRatioMatch[2].indexOf(':') !== -1) {
      return '<span class="stem-ratio-pair">' +
               '<span class="ratio-part">' + format(andRatioMatch[1]) + '</span>' +
               '<span class="ratio-sep">·</span>' +
               '<span class="ratio-part">' + format(andRatioMatch[2]) + '</span>' +
             '</span>';
    }

    return format(str);
  }

  /**
   * Render directly into a container DOM element
   */
  function renderTo(containerEl, qText) {
    if (!containerEl) return;
    containerEl.innerHTML = formatQuestion(qText);
  }

  return {
    format: format,
    formatQuestion: formatQuestion,
    formatOption: formatOption,
    renderTo: renderTo
  };
})();

// Export globally
if (typeof window !== 'undefined') {
  window.StemFormatter = StemFormatter;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StemFormatter;
}

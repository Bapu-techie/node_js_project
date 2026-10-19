/* ============================================================
   STEM DIAGRAMS — Vector Scientific Schematics & Medical Illustrations
   NursePrep Pro v3.0 — AIIMS Nursing & MP PNST 2027 Entrance

   Renders crisp, responsive, high-precision SVG vector schematics:
   1. Oxygen–Haemoglobin Dissociation Sigmoid Curve (Bohr Effect)
   2. Nuclear Binding Energy per Nucleon (E_bn) vs Mass Number Curve
   3. Zener Diode DC Voltage Regulator Circuit Schematic
   4. Cannizzaro Disproportionation Reaction Mechanism Flowchart
   5. Counter-Current Multiplier Mechanism in Henle's Loop & Vasa Recta
   6. De Morgan's Logic Equivalent Circuit (Inverters + NOR = AND Gate)
   7. Electrical Conduction System of the Heart (SA Node, AV Node, Purkinje)
   8. Standard Lead II ECG Waveform (P, QRS, T Waves)
   9. Mitochondrion Ultrastructure & Cristae (Oxidative Phosphorylation)
   10. Eukaryotic Animal Cell & Lysosome (Suicide Bag, Acid Hydrolases)
   11. Agarose Gel Electrophoresis (Cathode to Anode DNA Migration)
   12. Recombinant DNA Cloning Vector & DNA Ligase Phosphodiester Ligation
   13. Kranz Anatomy in C4 Plants (Bundle Sheath Cells & Mesophyll)
   14. Wheatstone Bridge Resistor Network & Balance Null Condition

   Includes interactive click-to-enlarge lightbox modal with zoom controls.
   Dependencies: none (pure scalable SVG & standard CSS variables)
   Used by: StemFormatter, ExamRenderer, ResultRenderer
   ============================================================ */

'use strict';

var StemDiagrams = (function() {

  // 1. Oxygen–Haemoglobin Dissociation Curve (Biology Q3 / Breathing)
  function _getOxygenCurve() {
    return {
      caption: 'Figure: Oxygen–Haemoglobin Dissociation Sigmoid Curve & Factors Affecting Affinity',
      svg: '<svg class="stem-svg" viewBox="0 0 540 310" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
            '<path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/>' +
          '</marker>' +
        '</defs>' +
        '<rect x="10" y="10" width="520" height="290" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="var(--c-text, #1e293b)">OXYGEN–HAEMOGLOBIN DISSOCIATION CURVE (NCERT BIOLOGY)</text>' +
        '<line x1="70" y1="210" x2="480" y2="210" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="160" x2="480" y2="160" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="110" x2="480" y2="110" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="60" x2="480" y2="60" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="260" x2="70" y2="45" stroke="var(--c-text, #334155)" stroke-width="1.8" marker-end="url(#arrow)"/>' +
        '<line x1="70" y1="260" x2="495" y2="260" stroke="var(--c-text, #334155)" stroke-width="1.8" marker-end="url(#arrow)"/>' +
        '<text x="25" y="150" transform="rotate(-90 25 150)" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #334155)">Percentage Saturation of Hb (%)</text>' +
        '<text x="280" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #334155)">Partial Pressure of Oxygen (pO₂ in mm Hg)</text>' +
        '<text x="62" y="264" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">0</text>' +
        '<text x="62" y="214" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">25</text>' +
        '<text x="62" y="164" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">50</text>' +
        '<text x="62" y="114" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">75</text>' +
        '<text x="62" y="64" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">100</text>' +
        '<text x="70" y="275" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">0</text>' +
        '<text x="150" y="275" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">20</text>' +
        '<text x="230" y="275" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">40</text>' +
        '<text x="310" y="275" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">60</text>' +
        '<text x="390" y="275" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">80</text>' +
        '<text x="470" y="275" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">100</text>' +
        '<path d="M 70 260 C 130 255, 170 215, 230 110 C 260 75, 330 65, 470 62" fill="none" stroke="#00b89a" stroke-width="3"/>' +
        '<path d="M 70 260 C 150 258, 200 235, 260 145 C 290 105, 360 80, 470 72" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="5,4"/>' +
        '<path d="M 70 260 C 110 240, 140 170, 190 85 C 230 62, 300 58, 470 56" fill="none" stroke="#3b82f6" stroke-width="2.2" stroke-dasharray="5,4"/>' +
        '<line x1="230" y1="260" x2="230" y2="110" stroke="#00b89a" stroke-width="1.2" stroke-dasharray="2,2"/>' +
        '<circle cx="230" cy="110" r="4.5" fill="#00b89a"/>' +
        '<text x="238" y="125" font-size="9.5" font-weight="700" fill="#00b89a">Normal: 75% at 40 mmHg (Tissues)</text>' +
        '<g transform="translate(290, 155)">' +
          '<rect x="0" y="0" width="190" height="85" rx="6" fill="var(--c-surface, #fff)" stroke="var(--c-border, #cbd5e1)" stroke-width="1"/>' +
          '<line x1="12" y1="18" x2="35" y2="18" stroke="#00b89a" stroke-width="2.8"/>' +
          '<text x="42" y="22" font-size="10" font-weight="700" fill="var(--c-text, #1e293b)">Normal (pH 7.4, 37°C)</text>' +
          '<line x1="12" y1="42" x2="35" y2="42" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>' +
          '<text x="42" y="40" font-size="9.5" font-weight="700" fill="#dc2626">Shift to Right (Bohr Effect)</text>' +
          '<text x="42" y="52" font-size="8.5" font-weight="500" fill="#dc2626">↑ pCO₂, ↑ Temp, ↓ pH (↑ H⁺)</text>' +
          '<line x1="12" y1="68" x2="35" y2="68" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,3"/>' +
          '<text x="42" y="66" font-size="9.5" font-weight="700" fill="#2563eb">Shift to Left (Alveoli)</text>' +
          '<text x="42" y="78" font-size="8.5" font-weight="500" fill="#2563eb">↓ pCO₂, ↓ Temp, ↑ pH (↓ H⁺)</text>' +
        '</g>' +
      '</svg>'
    };
  }

  // 2. Nuclear Binding Energy per Nucleon Curve (Physics Q38 / Nuclei)
  function _getBindingEnergyCurve() {
    return {
      caption: 'Figure: Binding Energy per Nucleon (E_bn) vs Mass Number A (Nuclear Stability Curve)',
      svg: '<svg class="stem-svg" viewBox="0 0 540 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<marker id="beArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
            '<path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/>' +
          '</marker>' +
        '</defs>' +
        '<rect x="10" y="10" width="520" height="280" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="var(--c-text, #1e293b)">BINDING ENERGY PER NUCLEON (E_bn) vs MASS NUMBER A</text>' +
        '<rect x="70" y="45" width="85" height="205" fill="rgba(14,165,233,0.06)"/>' +
        '<text x="112" y="175" text-anchor="middle" font-size="9" font-weight="700" fill="#0284c7">FUSION ZONE</text>' +
        '<text x="112" y="187" text-anchor="middle" font-size="7.5" font-weight="500" fill="#0284c7">Light Nuclei (A &lt; 20)</text>' +
        '<rect x="410" y="45" width="85" height="205" fill="rgba(244,63,94,0.06)"/>' +
        '<text x="452" y="175" text-anchor="middle" font-size="9" font-weight="700" fill="#e11d48">FISSION ZONE</text>' +
        '<text x="452" y="187" text-anchor="middle" font-size="7.5" font-weight="500" fill="#e11d48">Heavy Nuclei (A &gt; 200)</text>' +
        '<line x1="70" y1="210" x2="495" y2="210" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="170" x2="495" y2="170" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="130" x2="495" y2="130" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="90" x2="495" y2="90" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="50" x2="495" y2="50" stroke="var(--c-border-subtle, #f1f5f9)" stroke-width="1" stroke-dasharray="3,3"/>' +
        '<line x1="70" y1="250" x2="70" y2="35" stroke="var(--c-text, #334155)" stroke-width="1.8" marker-end="url(#beArr)"/>' +
        '<line x1="70" y1="250" x2="505" y2="250" stroke="var(--c-text, #334155)" stroke-width="1.8" marker-end="url(#beArr)"/>' +
        '<text x="25" y="145" transform="rotate(-90 25 145)" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #334155)">Binding Energy per Nucleon (MeV)</text>' +
        '<text x="280" y="280" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #334155)">Mass Number A</text>' +
        '<text x="62" y="254" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">0</text>' +
        '<text x="62" y="214" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">2</text>' +
        '<text x="62" y="174" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">4</text>' +
        '<text x="62" y="134" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">6</text>' +
        '<text x="62" y="94" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">8</text>' +
        '<text x="62" y="54" text-anchor="end" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">10</text>' +
        '<text x="70" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">0</text>' +
        '<text x="140" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">30</text>' +
        '<text x="210" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">60</text>' +
        '<text x="280" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">90</text>' +
        '<text x="350" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">120</text>' +
        '<text x="420" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">180</text>' +
        '<text x="490" y="265" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c-text-muted, #64748b)">240</text>' +
        '<path d="M 70 240 L 76 226 L 82 110 L 88 170 L 96 112 L 102 145 L 115 105 L 130 94 L 200 75 L 210 74 L 270 78 L 380 95 L 485 108" fill="none" stroke="#2563eb" stroke-width="2.5"/>' +
        '<circle cx="200" cy="75" r="5" fill="#ef4444"/>' +
        '<text x="200" y="62" text-anchor="middle" font-size="10" font-weight="800" fill="#ef4444">⁵⁶Fe (8.75 MeV)</text>' +
        '<circle cx="115" cy="105" r="4" fill="#00b89a"/>' +
        '<text x="122" y="112" font-size="8.5" font-weight="700" fill="#0f766e">¹⁴N (7.5 MeV)</text>' +
        '<circle cx="485" cy="108" r="4.5" fill="#f59e0b"/>' +
        '<text x="480" y="125" text-anchor="end" font-size="9" font-weight="700" fill="#b45309">²³⁸U (7.6 MeV)</text>' +
        '<rect x="235" y="105" width="165" height="34" rx="4" fill="var(--c-surface, #fff)" stroke="var(--c-border, #cbd5e1)" stroke-width="1"/>' +
        '<text x="317" y="120" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--c-text, #1e293b)">Constancy of Nuclear Binding</text>' +
        '<text x="317" y="132" text-anchor="middle" font-size="7.5" font-weight="500" fill="var(--c-text-muted, #64748b)">E_bn ≈ 8.0-8.5 MeV for 30 &lt; A &lt; 170</text>' +
      '</svg>'
    };
  }

  // 3. Zener Diode DC Voltage Regulator Circuit (Physics Q47 / Semiconductor)
  function _getZenerCircuit() {
    return {
      caption: 'Figure: Zener Diode in Reverse Breakdown Mode Acting as a DC Voltage Regulator',
      svg: '<svg class="stem-svg" viewBox="0 0 540 250" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="230" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">ZENER DIODE VOLTAGE REGULATOR CIRCUIT (REVERSE BIAS)</text>' +
        '<line x1="60" y1="80" x2="160" y2="80" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<rect x="160" y="72" width="50" height="16" fill="var(--c-surface, #fff)" stroke="#3b82f6" stroke-width="2"/>' +
        '<text x="185" y="65" text-anchor="middle" font-size="10" font-weight="700" fill="#2563eb">Series Resistor (Rs)</text>' +
        '<line x1="210" y1="80" x2="310" y2="80" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<line x1="310" y1="80" x2="440" y2="80" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<line x1="60" y1="190" x2="440" y2="190" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<circle cx="60" cy="80" r="4.5" fill="var(--c-surface, #fff)" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<circle cx="60" cy="190" r="4.5" fill="var(--c-surface, #fff)" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<text x="45" y="130" text-anchor="middle" font-size="11" font-weight="800" fill="#ef4444">Unregulated</text>' +
        '<text x="45" y="145" text-anchor="middle" font-size="11" font-weight="800" fill="#ef4444">DC Input (Vi)</text>' +
        '<text x="75" y="90" font-size="12" font-weight="700" fill="#334155">+</text>' +
        '<text x="75" y="185" font-size="14" font-weight="700" fill="#334155">-</text>' +
        '<line x1="310" y1="80" x2="310" y2="115" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<line x1="310" y1="155" x2="310" y2="190" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<line x1="290" y1="115" x2="330" y2="115" stroke="#00b89a" stroke-width="3"/>' +
        '<line x1="290" y1="115" x2="290" y2="125" stroke="#00b89a" stroke-width="2.5"/>' +
        '<line x1="330" y1="115" x2="330" y2="105" stroke="#00b89a" stroke-width="2.5"/>' +
        '<polygon points="290,145 330,145 310,118" fill="rgba(0,184,154,0.15)" stroke="#00b89a" stroke-width="2"/>' +
        '<line x1="310" y1="145" x2="310" y2="155" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<text x="345" y="135" font-size="11" font-weight="800" fill="#00b89a">Zener Diode (Vz)</text>' +
        '<text x="345" y="148" font-size="8.5" font-weight="600" fill="#0f766e">(Heavily Doped P-N)</text>' +
        '<line x1="440" y1="80" x2="440" y2="110" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<rect x="432" y="110" width="16" height="50" fill="var(--c-surface, #fff)" stroke="#8b5cf6" stroke-width="2"/>' +
        '<text x="460" y="138" font-size="10" font-weight="700" fill="#7c3aed">Load (RL)</text>' +
        '<line x1="440" y1="160" x2="440" y2="190" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<circle cx="490" cy="80" r="4.5" fill="var(--c-surface, #fff)" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<circle cx="490" cy="190" r="4.5" fill="var(--c-surface, #fff)" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<line x1="440" y1="80" x2="490" y2="80" stroke="var(--c-text, #334155)" stroke-width="1.5" stroke-dasharray="3,3"/>' +
        '<line x1="440" y1="190" x2="490" y2="190" stroke="var(--c-text, #334155)" stroke-width="1.5" stroke-dasharray="3,3"/>' +
        '<text x="502" y="130" font-size="11" font-weight="800" fill="#00b89a">Regulated</text>' +
        '<text x="502" y="145" font-size="11" font-weight="800" fill="#00b89a">Output (Vo = Vz)</text>' +
      '</svg>'
    };
  }

  // 4. Cannizzaro Reaction Flowchart (Chemistry Q84 / Carbonyl Compounds)
  function _getCannizzaroFlow() {
    return {
      caption: 'Figure: Cannizzaro Redox Disproportionation of Aldehydes Lacking α-Hydrogen',
      svg: '<svg class="stem-svg" viewBox="0 0 540 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<marker id="carr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
            '<path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/>' +
          '</marker>' +
        '</defs>' +
        '<rect x="10" y="10" width="520" height="200" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">CANNIZZARO DISPROPORTIONATION REACTION (NO α-HYDROGEN)</text>' +
        '<g transform="translate(35, 70)">' +
          '<rect x="0" y="0" width="125" height="95" rx="6" fill="rgba(37,99,235,0.06)" stroke="#2563eb" stroke-width="1.5"/>' +
          '<text x="62" y="24" text-anchor="middle" font-size="13" font-weight="800" fill="#1e40af">2 C₆H₅CHO</text>' +
          '<text x="62" y="42" text-anchor="middle" font-size="9.5" font-weight="600" fill="#2563eb">Benzaldehyde</text>' +
          '<text x="62" y="62" text-anchor="middle" font-size="8.5" font-weight="700" fill="#e11d48">No α-Hydrogen Atom</text>' +
          '<text x="62" y="78" text-anchor="middle" font-size="7.5" font-weight="500" fill="var(--c-text-muted, #64748b)">Cannot form enolate</text>' +
        '</g>' +
        '<g transform="translate(170, 75)">' +
          '<line x1="0" y1="40" x2="60" y2="40" stroke="#00b89a" stroke-width="2.5" marker-end="url(#carr)"/>' +
          '<text x="30" y="22" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f766e">Conc. NaOH</text>' +
          '<text x="30" y="34" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0f766e">(50% / Δ)</text>' +
          '<text x="30" y="58" text-anchor="middle" font-size="7.5" font-weight="700" fill="#d97706">Hydride Transfer</text>' +
        '</g>' +
        '<g transform="translate(245, 45)">' +
          '<rect x="0" y="0" width="115" height="65" rx="6" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="1.5"/>' +
          '<text x="57" y="16" text-anchor="middle" font-size="8" font-weight="800" fill="#047857">REDUCED PRODUCT</text>' +
          '<text x="57" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="#065f46">C₆H₅CH₂OH</text>' +
          '<text x="57" y="52" text-anchor="middle" font-size="9" font-weight="600" fill="var(--c-text, #334155)">Benzyl Alcohol</text>' +
        '</g>' +
        '<g transform="translate(390, 115)">' +
          '<rect x="0" y="0" width="125" height="65" rx="6" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" stroke-width="1.5"/>' +
          '<text x="62" y="16" text-anchor="middle" font-size="8" font-weight="800" fill="#be123c">OXIDISED PRODUCT</text>' +
          '<text x="62" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="#9f1239">C₆H₅COONa</text>' +
          '<text x="62" y="52" text-anchor="middle" font-size="9" font-weight="600" fill="var(--c-text, #334155)">Sodium Benzoate</text>' +
        '</g>' +
      '</svg>'
    };
  }

  // 5. Counter-Current Multiplier in Nephron (Biology Q13 / Excretion)
  function _getCounterCurrentFlow() {
    return {
      caption: 'Figure: Counter-Current Mechanism & Medullary Osmolarity Gradient (300 to 1200 mOsmol/L)',
      svg: '<svg class="stem-svg" viewBox="0 0 540 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="240" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">COUNTER-CURRENT MULTIPLIER MECHANISM (LOOP OF HENLE)</text>' +
        '<rect x="40" y="50" width="460" height="40" fill="rgba(14,165,233,0.05)"/>' +
        '<text x="50" y="75" font-size="9.5" font-weight="800" fill="#0284c7">Cortex (300 mOsm/L)</text>' +
        '<rect x="40" y="90" width="460" height="50" fill="rgba(14,165,233,0.10)"/>' +
        '<text x="50" y="120" font-size="9.5" font-weight="800" fill="#0284c7">Outer Medulla (600 mOsm/L)</text>' +
        '<rect x="40" y="140" width="460" height="90" fill="rgba(14,165,233,0.18)"/>' +
        '<text x="50" y="185" font-size="9.5" font-weight="800" fill="#0369a1">Inner Medulla (900 - 1200 mOsm/L)</text>' +
        '<path d="M 210 50 L 210 200 C 210 225, 290 225, 290 200 L 290 50" fill="none" stroke="#00b89a" stroke-width="5"/>' +
        '<text x="180" y="110" text-anchor="end" font-size="9" font-weight="700" fill="#00b89a">Descending Limb</text>' +
        '<text x="180" y="122" text-anchor="end" font-size="8" font-weight="600" fill="#0369a1">Permeable to H₂O</text>' +
        '<text x="180" y="132" text-anchor="end" font-size="8" font-weight="600" fill="#e11d48">Impermeable to NaCl</text>' +
        '<text x="195" y="150" font-size="11" font-weight="800" fill="#0284c7">← H₂O</text>' +
        '<text x="195" y="180" font-size="11" font-weight="800" fill="#0284c7">← H₂O</text>' +
        '<text x="320" y="110" font-size="9" font-weight="700" fill="#00b89a">Ascending Limb</text>' +
        '<text x="320" y="122" font-size="8" font-weight="600" fill="#e11d48">Impermeable to H₂O</text>' +
        '<text x="320" y="132" font-size="8" font-weight="600" fill="#0369a1">Active NaCl Transport</text>' +
        '<text x="302" y="150" font-size="11" font-weight="800" fill="#d97706">NaCl →</text>' +
        '<text x="302" y="180" font-size="11" font-weight="800" fill="#d97706">NaCl →</text>' +
        '<circle cx="250" cy="216" r="4.5" fill="#e11d48"/>' +
        '<text x="250" y="238" text-anchor="middle" font-size="9.5" font-weight="800" fill="#e11d48">Peak 1200 mOsm/L (Hairpin Bend)</text>' +
      '</svg>'
    };
  }

  // 6. De Morgan's Equivalent Gate (Physics Q50 / Logic Gates)
  function _getLogicGateFlow() {
    return {
      caption: 'Figure: Logic Gate Circuit — De Morgan\'s Law Equivalence Y = (A\' + B\')\' ≡ A · B',
      svg: '<svg class="stem-svg" viewBox="0 0 520 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="500" height="180" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="260" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">DE MORGAN\'S EQUIVALENT CIRCUIT: Y = (A\' + B\')\' ≡ A · B (AND GATE)</text>' +
        '<text x="40" y="74" font-size="12" font-weight="700" fill="var(--c-text, #1e293b)">A</text>' +
        '<line x1="55" y1="70" x2="95" y2="70" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<polygon points="95,55 95,85 125,70" fill="rgba(0,184,154,0.12)" stroke="#00b89a" stroke-width="1.8"/>' +
        '<circle cx="129" cy="70" r="4" fill="var(--c-surface, #fff)" stroke="#00b89a" stroke-width="1.8"/>' +
        '<line x1="133" y1="70" x2="210" y2="70" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<text x="160" y="62" font-size="11" font-weight="700" fill="#0f766e">A\' (NOT A)</text>' +
        '<text x="40" y="134" font-size="12" font-weight="700" fill="var(--c-text, #1e293b)">B</text>' +
        '<line x1="55" y1="130" x2="95" y2="130" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<polygon points="95,115 95,145 125,130" fill="rgba(0,184,154,0.12)" stroke="#00b89a" stroke-width="1.8"/>' +
        '<circle cx="129" cy="130" r="4" fill="var(--c-surface, #fff)" stroke="#00b89a" stroke-width="1.8"/>' +
        '<line x1="133" y1="130" x2="210" y2="130" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<text x="160" y="148" font-size="11" font-weight="700" fill="#0f766e">B\' (NOT B)</text>' +
        '<line x1="210" y1="70" x2="245" y2="85" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<line x1="210" y1="130" x2="245" y2="115" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<path d="M 235 70 Q 255 100 235 130 Q 285 130 315 100 Q 285 70 235 70 Z" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-width="2"/>' +
        '<circle cx="319" cy="100" r="4.5" fill="var(--c-surface, #fff)" stroke="#2563eb" stroke-width="2"/>' +
        '<line x1="324" y1="100" x2="385" y2="100" stroke="var(--c-text, #334155)" stroke-width="2"/>' +
        '<text x="395" y="96" font-size="12" font-weight="800" fill="#2563eb">Y = (A\' + B\')\'</text>' +
        '<text x="395" y="112" font-size="12" font-weight="800" fill="#00b89a">= A · B (AND Gate)</text>' +
      '</svg>'
    };
  }

  // 7. Electrical Conduction System of the Heart (Biology Q6 / bio_hp_006)
  function _getCardiacConductionSystem() {
    return {
      caption: 'Figure: Intrinsic Cardiac Conduction System (SA Node Pacemaker, AV Node, Bundle Branches & Purkinje Network)',
      svg: '<svg class="stem-svg" viewBox="0 0 540 310" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="rgba(244,63,94,0.08)"/>' +
            '<stop offset="100%" stop-color="rgba(239,68,68,0.18)"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect x="10" y="10" width="520" height="290" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">CARDIAC CONDUCTION SYSTEM &amp; IMPULSE SEQUENCE</text>' +
        '<path d="M 270 85 C 270 60, 200 60, 175 95 C 150 135, 160 205, 270 275 C 380 205, 390 135, 365 95 C 340 60, 270 60, 270 85 Z" fill="url(#heartGrad)" stroke="#f43f5e" stroke-width="2"/>' +
        '<line x1="270" y1="85" x2="270" y2="272" stroke="#fda4af" stroke-width="1.8" stroke-dasharray="3,3"/>' +
        '<line x1="170" y1="160" x2="370" y2="160" stroke="#fda4af" stroke-width="1.8" stroke-dasharray="3,3"/>' +
        '<text x="220" y="125" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">Right Atrium</text>' +
        '<text x="320" y="125" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">Left Atrium</text>' +
        '<text x="220" y="205" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">Right Ventricle</text>' +
        '<text x="320" y="205" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">Left Ventricle</text>' +
        '<rect x="180" y="50" width="22" height="35" rx="3" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>' +
        '<text x="140" y="65" font-size="8.5" font-weight="700" fill="#0284c7">SVC</text>' +
        '<circle cx="202" cy="94" r="9" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>' +
        '<circle cx="202" cy="94" r="14" fill="none" stroke="#eab308" stroke-width="1.5" stroke-dasharray="2,2"/>' +
        '<text x="202" y="98" text-anchor="middle" font-size="11" font-weight="900" fill="#854d0e">X</text>' +
        '<line x1="202" y1="86" x2="115" y2="86" stroke="#ca8a04" stroke-width="1.5"/>' +
        '<rect x="25" y="72" width="90" height="32" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>' +
        '<text x="70" y="85" text-anchor="middle" font-size="9.5" font-weight="800" fill="#854d0e">[X] SA Node</text>' +
        '<text x="70" y="97" text-anchor="middle" font-size="7.5" font-weight="700" fill="#a16207">Pacemaker (70-80 bpm)</text>' +
        '<path d="M 202 103 Q 220 130 242 144" fill="none" stroke="#eab308" stroke-width="2" stroke-dasharray="3,2"/>' +
        '<circle cx="244" cy="148" r="7" fill="#f97316" stroke="#c2410c" stroke-width="1.8"/>' +
        '<text x="244" y="151" text-anchor="middle" font-size="8" font-weight="900" fill="#fff">AV</text>' +
        '<line x1="252" y1="148" x2="425" y2="148" stroke="#c2410c" stroke-width="1.2"/>' +
        '<rect x="425" y="136" width="95" height="26" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>' +
        '<text x="472" y="148" text-anchor="middle" font-size="9" font-weight="800" fill="#9a3412">AV Node</text>' +
        '<text x="472" y="158" text-anchor="middle" font-size="7.5" font-weight="600" fill="#c2410c">Delay (40-60 bpm)</text>' +
        '<line x1="248" y1="154" x2="270" y2="170" stroke="#eab308" stroke-width="2.5"/>' +
        '<text x="290" y="174" font-size="8.5" font-weight="700" fill="#ca8a04">Bundle of His</text>' +
        '<path d="M 270 170 L 255 228" fill="none" stroke="#eab308" stroke-width="2.2"/>' +
        '<path d="M 270 170 L 285 228" fill="none" stroke="#eab308" stroke-width="2.2"/>' +
        '<path d="M 255 228 Q 220 242 190 200 Q 185 175 180 160" fill="none" stroke="#eab308" stroke-width="1.8"/>' +
        '<path d="M 285 228 Q 320 242 350 200 Q 355 175 360 160" fill="none" stroke="#eab308" stroke-width="1.8"/>' +
        '<line x1="255" y1="228" x2="115" y2="228" stroke="#ca8a04" stroke-width="1.2"/>' +
        '<rect x="25" y="215" width="90" height="26" rx="4" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.2"/>' +
        '<text x="70" y="227" text-anchor="middle" font-size="8.5" font-weight="800" fill="#854d0e">Purkinje Fibres</text>' +
        '<text x="70" y="237" text-anchor="middle" font-size="7" font-weight="600" fill="#a16207">Rapid Conduction</text>' +
      '</svg>'
    };
  }

  // 8. Standard Lead II ECG Waveform (test100_q008 / bio_hp_001 / bio_hp_022)
  function _getEcgComplex() {
    return {
      caption: 'Figure: Standard Clinical Electrocardiogram (ECG Lead II) Tracing & Component Waves',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">STANDARD CLINICAL LEAD II ECG WAVEFORM</text>' +
        '<pattern id="ecgGrid" width="20" height="20" patternUnits="userSpaceOnUse">' +
          '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244,63,94,0.12)" stroke-width="0.8"/>' +
        '</pattern>' +
        '<rect x="25" y="40" width="490" height="185" fill="url(#ecgGrid)"/>' +
        '<line x1="25" y1="150" x2="515" y2="150" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="4,3"/>' +
        '<path d="M 35 150 L 80 150 C 95 150, 105 118, 120 118 C 135 118, 145 150, 160 150 L 195 150 L 205 168 L 225 55 L 245 185 L 255 150 L 320 150 C 340 150, 360 105, 385 105 C 410 105, 430 150, 450 150 L 505 150" fill="none" stroke="#ef4444" stroke-width="3"/>' +
        '<circle cx="120" cy="118" r="4.5" fill="#3b82f6"/>' +
        '<text x="120" y="98" text-anchor="middle" font-size="12" font-weight="900" fill="#2563eb">P</text>' +
        '<text x="120" y="110" text-anchor="middle" font-size="7.5" font-weight="700" fill="#1d4ed8">Atrial Depolarisation</text>' +
        '<circle cx="205" cy="168" r="3.5" fill="#f59e0b"/>' +
        '<text x="202" y="185" text-anchor="middle" font-size="10" font-weight="900" fill="#b45309">Q</text>' +
        '<circle cx="225" cy="55" r="5" fill="#10b981"/>' +
        '<text x="225" y="45" text-anchor="middle" font-size="14" font-weight="900" fill="#047857">R</text>' +
        '<circle cx="245" cy="185" r="3.5" fill="#f59e0b"/>' +
        '<text x="248" y="200" text-anchor="middle" font-size="10" font-weight="900" fill="#b45309">S</text>' +
        '<path d="M 195 208 L 225 215 L 255 208" fill="none" stroke="#047857" stroke-width="1.5"/>' +
        '<text x="225" y="226" text-anchor="middle" font-size="9" font-weight="800" fill="#047857">QRS Complex</text>' +
        '<text x="225" y="236" text-anchor="middle" font-size="7.5" font-weight="600" fill="#065f46">Ventricular Depolarisation (&lt; 0.12 s)</text>' +
        '<circle cx="385" cy="105" r="4.5" fill="#8b5cf6"/>' +
        '<text x="385" y="85" text-anchor="middle" font-size="13" font-weight="900" fill="#7c3aed">T</text>' +
        '<text x="385" y="97" text-anchor="middle" font-size="8" font-weight="700" fill="#6d28d9">Ventricular Repolarisation</text>' +
        '<rect x="25" y="242" width="490" height="20" rx="3" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="0.8"/>' +
        '<text x="270" y="255" text-anchor="middle" font-size="8" font-weight="700" fill="#047857">High-Yield: Number of QRS complexes determines Heart Rate · T wave = Ventricular Repolarisation</text>' +
      '</svg>'
    };
  }

  // 9. Mitochondrion Ultrastructure & Cristae (Biology Q23 / bio_cs_023)
  function _getMitochondrion() {
    return {
      caption: 'Figure: Ultrastructure of a Mitochondrion Showing Outer Membrane, Inner Folds (Cristae) & Matrix',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">MITOCHONDRION ULTRASTRUCTURE (NCERT BIOLOGY)</text>' +
        '<ellipse cx="270" cy="135" rx="200" ry="85" fill="rgba(245,158,11,0.06)" stroke="#f59e0b" stroke-width="3"/>' +
        '<text x="440" y="80" font-size="9" font-weight="700" fill="#d97706">Outer Membrane</text>' +
        '<line x1="435" y1="84" x2="385" y2="100" stroke="#d97706" stroke-width="1.2"/>' +
        '<path d="M 100 135 C 100 80, 170 70, 220 70 L 220 115 L 235 115 L 235 70 C 270 70, 290 70, 310 70 L 310 125 L 325 125 L 325 70 C 370 70, 440 85, 440 135 C 440 185, 370 200, 325 200 L 325 150 L 310 150 L 310 200 C 290 200, 270 200, 235 200 L 235 145 L 220 145 L 220 200 C 170 200, 100 185, 100 135 Z" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="2.5"/>' +
        '<rect x="235" y="110" width="70" height="28" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>' +
        '<text x="270" y="124" text-anchor="middle" font-size="11" font-weight="900" fill="#854d0e">[Y] Cristae</text>' +
        '<text x="270" y="134" text-anchor="middle" font-size="7.5" font-weight="700" fill="#a16207">Inner Folds</text>' +
        '<text x="170" y="155" font-size="9" font-weight="700" fill="#047857">Matrix</text>' +
        '<text x="170" y="165" font-size="7" font-weight="600" fill="#065f46">Krebs Cycle Enzymes</text>' +
        '<ellipse cx="370" cy="145" rx="14" ry="7" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="2,2"/>' +
        '<text x="370" y="163" text-anchor="middle" font-size="7.5" font-weight="700" fill="#4f46e5">Circular dsDNA &amp; 70S Ribosomes</text>' +
        '<rect x="25" y="235" width="490" height="20" rx="3" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="0.8"/>' +
        '<text x="270" y="248" text-anchor="middle" font-size="8" font-weight="700" fill="#b45309">Crucial Point: Folds (Cristae Y) increase surface area for ETC complexes &amp; ATP Synthase</text>' +
      '</svg>'
    };
  }

  // 10. Eukaryotic Animal Cell & Lysosome (Biology Q3 / bio_cs_003)
  function _getAnimalCellLysosome() {
    return {
      caption: 'Figure: Animal Cell Ultrastructure Highlighting Hydrolytic Organelle ([X] Lysosome)',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">ANIMAL CELL ULTRASTRUCTURE &amp; MEMBRANE ORGANELLES</text>' +
        '<ellipse cx="270" cy="135" rx="200" ry="80" fill="rgba(59,130,246,0.04)" stroke="#3b82f6" stroke-width="2.5"/>' +
        '<circle cx="230" cy="135" r="40" fill="rgba(99,102,241,0.12)" stroke="#4f46e5" stroke-width="2"/>' +
        '<circle cx="230" cy="135" r="14" fill="#6366f1"/>' +
        '<text x="230" y="160" text-anchor="middle" font-size="7.5" font-weight="700" fill="#3730a3">Nucleus</text>' +
        '<ellipse cx="130" cy="145" rx="24" ry="14" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1.8"/>' +
        '<text x="130" y="168" text-anchor="middle" font-size="7" font-weight="600" fill="#b45309">Mitochondria</text>' +
        '<path d="M 310 110 Q 320 120 310 130 M 318 107 Q 328 120 318 133 M 326 105 Q 336 120 326 135" stroke="#ec4899" stroke-width="3" fill="none"/>' +
        '<text x="345" y="122" font-size="7.5" font-weight="600" fill="#be185d">Golgi</text>' +
        '<circle cx="360" cy="165" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>' +
        '<circle cx="360" cy="165" r="12" fill="rgba(255,255,255,0.2)"/>' +
        '<text x="360" y="170" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">X</text>' +
        '<line x1="378" y1="165" x2="415" y2="165" stroke="#b91c1c" stroke-width="1.5"/>' +
        '<rect x="415" y="147" width="105" height="36" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.2"/>' +
        '<text x="467" y="160" text-anchor="middle" font-size="9" font-weight="800" fill="#991b1b">[X] Lysosome</text>' +
        '<text x="467" y="170" text-anchor="middle" font-size="7" font-weight="600" fill="#b91c1c">Single-membrane vesicle</text>' +
        '<text x="467" y="179" text-anchor="middle" font-size="7" font-weight="700" fill="#7f1d1d">Acid Hydrolases (pH ~ 5)</text>' +
        '<rect x="25" y="235" width="490" height="20" rx="3" fill="rgba(239,68,68,0.08)" stroke="#ef4444" stroke-width="0.8"/>' +
        '<text x="270" y="248" text-anchor="middle" font-size="8" font-weight="700" fill="#b91c1c">Organelle [X] is the Lysosome — originates from Golgi apparatus, functions in autolysis &amp; intracellular digestion</text>' +
      '</svg>'
    };
  }

  // 11. Agarose Gel Electrophoresis (Biotech Q2 / bio_bt_002)
  function _getAgaroseGel() {
    return {
      caption: 'Figure: Agarose Gel Electrophoresis Separation of DNA Fragments Under Electric Field',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">AGAROSE GEL ELECTROPHORESIS &amp; MOLECULAR SIEVING</text>' +
        '<rect x="50" y="45" width="440" height="24" rx="4" fill="#1e293b"/>' +
        '<text x="270" y="61" text-anchor="middle" font-size="10" font-weight="800" fill="#f87171">NEGATIVE ELECTRODE (CATHODE –) · WELLS / LOADING END</text>' +
        '<rect x="110" y="58" width="40" height="10" rx="2" fill="#475569"/>' +
        '<rect x="210" y="58" width="40" height="10" rx="2" fill="#475569"/>' +
        '<rect x="310" y="58" width="40" height="10" rx="2" fill="#475569"/>' +
        '<rect x="410" y="58" width="40" height="10" rx="2" fill="#475569"/>' +
        '<rect x="50" y="70" width="440" height="145" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="1.2"/>' +
        '<text x="130" y="83" text-anchor="middle" font-size="8" font-weight="700" fill="#0284c7">Lane 1 (Ladder)</text>' +
        '<line x1="115" y1="92" x2="145" y2="92" stroke="#f43f5e" stroke-width="3"/>' +
        '<text x="108" y="94" text-anchor="end" font-size="7" font-weight="700" fill="#64748b">10 kb</text>' +
        '<line x1="115" y1="115" x2="145" y2="115" stroke="#f43f5e" stroke-width="3"/>' +
        '<text x="108" y="117" text-anchor="end" font-size="7" font-weight="700" fill="#64748b">5 kb</text>' +
        '<line x1="115" y1="140" x2="145" y2="140" stroke="#f43f5e" stroke-width="3"/>' +
        '<text x="108" y="142" text-anchor="end" font-size="7" font-weight="700" fill="#64748b">2 kb</text>' +
        '<line x1="115" y1="170" x2="145" y2="170" stroke="#f43f5e" stroke-width="3"/>' +
        '<text x="108" y="172" text-anchor="end" font-size="7" font-weight="700" fill="#64748b">0.5 kb</text>' +
        '<text x="230" y="83" text-anchor="middle" font-size="8" font-weight="700" fill="#0284c7">Lane 2 (Sample)</text>' +
        '<line x1="215" y1="98" x2="245" y2="98" stroke="#10b981" stroke-width="4"/>' +
        '<text x="252" y="101" font-size="7.5" font-weight="700" fill="#dc2626">Largest Fragment (Slowest)</text>' +
        '<line x1="215" y1="185" x2="245" y2="185" stroke="#10b981" stroke-width="4"/>' +
        '<text x="252" y="188" font-size="8" font-weight="800" fill="#047857">Smallest Fragment (Farthest, Fastest)</text>' +
        '<line x1="475" y1="85" x2="475" y2="195" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#arrow)"/>' +
        '<text x="470" y="145" text-anchor="end" font-size="8" font-weight="700" fill="#0284c7" transform="rotate(-90 470 145)">Direction of Migration</text>' +
        '<rect x="50" y="215" width="440" height="24" rx="4" fill="#dc2626"/>' +
        '<text x="270" y="231" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">POSITIVE ELECTRODE (ANODE +)</text>' +
        '<text x="270" y="255" text-anchor="middle" font-size="8" font-weight="700" fill="#0284c7">Rule: DNA is negatively charged due to phosphate backbone → Migrates towards Anode (+); Distance ∝ 1 / size</text>' +
      '</svg>'
    };
  }

  // 12. Recombinant DNA Vector & DNA Ligase (Biotech Q9 & Q17 / bio_bt_009 / bio_bt_017)
  function _getRecombinantPlasmid() {
    return {
      caption: 'Figure: Recombinant DNA Technology — Vector (Z: Plasmid), Insert & Ligation (W: DNA Ligase)',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">RECOMBINANT DNA CLONING SCHEME &amp; ENZYMATIC STEPS</text>' +
        '<circle cx="120" cy="125" r="50" fill="rgba(59,130,246,0.08)" stroke="#2563eb" stroke-width="3"/>' +
        '<circle cx="120" cy="125" r="38" fill="var(--c-surface, #fff)" stroke="#2563eb" stroke-width="1.5"/>' +
        '<rect x="65" y="180" width="110" height="28" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.2"/>' +
        '<text x="120" y="194" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e40af">[Z] Vector (Plasmid)</text>' +
        '<text x="120" y="204" text-anchor="middle" font-size="7.5" font-weight="600" fill="#1d4ed8">Circular dsDNA carrier</text>' +
        '<text x="120" y="128" text-anchor="middle" font-size="8.5" font-weight="800" fill="#2563eb">ori · amp^R</text>' +
        '<path d="M 120 75 L 120 60" stroke="#ef4444" stroke-width="2"/>' +
        '<text x="120" y="55" text-anchor="middle" font-size="7.5" font-weight="700" fill="#dc2626">EcoRI Cut Site</text>' +
        '<line x1="180" y1="125" x2="230" y2="125" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>' +
        '<rect x="235" y="115" width="70" height="20" rx="3" fill="#10b981" stroke="#047857" stroke-width="1.5"/>' +
        '<text x="270" y="129" text-anchor="middle" font-size="8" font-weight="800" fill="#fff">Foreign Gene</text>' +
        '<rect x="220" y="65" width="100" height="32" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>' +
        '<text x="270" y="80" text-anchor="middle" font-size="9.5" font-weight="900" fill="#854d0e">[W] DNA Ligase</text>' +
        '<text x="270" y="92" text-anchor="middle" font-size="7.5" font-weight="700" fill="#a16207">Forms phosphodiester bond</text>' +
        '<path d="M 270 98 L 270 112" stroke="#ca8a04" stroke-width="1.8"/>' +
        '<line x1="310" y1="125" x2="355" y2="125" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>' +
        '<circle cx="420" cy="125" r="50" fill="rgba(16,185,129,0.08)" stroke="#2563eb" stroke-width="3"/>' +
        '<path d="M 420 75 A 50 50 0 0 1 470 125" fill="none" stroke="#10b981" stroke-width="5"/>' +
        '<circle cx="420" cy="125" r="38" fill="var(--c-surface, #fff)" stroke="#2563eb" stroke-width="1.5"/>' +
        '<rect x="360" y="180" width="120" height="28" rx="4" fill="#d1fae5" stroke="#059669" stroke-width="1.2"/>' +
        '<text x="420" y="194" text-anchor="middle" font-size="9" font-weight="800" fill="#065f46">Recombinant DNA</text>' +
        '<text x="420" y="204" text-anchor="middle" font-size="7.5" font-weight="600" fill="#047857">Chimeric Plasmid Molecule</text>' +
        '<rect x="25" y="238" width="490" height="20" rx="3" fill="rgba(59,130,246,0.08)" stroke="#2563eb" stroke-width="0.8"/>' +
        '<text x="270" y="251" text-anchor="middle" font-size="8" font-weight="700" fill="#1e40af">NCERT Core: Vector [Z] carries foreign DNA into host; Ligase [W] seals sticky ends by catalysing 3\'-5\' phosphodiester bonds</text>' +
      '</svg>'
    };
  }

  // 13. Kranz Anatomy in C4 Plants (Plant Phys Q15 / bio_pp_015)
  function _getKranzAnatomy() {
    return {
      caption: 'Figure: Kranz Anatomy of C4 Plant Leaf (Concentric Bundle Sheath & Mesophyll Organization)',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">KRANZ ANATOMY IN C4 PLANTS (MAIZE, SUGARCANE)</text>' +
        '<rect x="40" y="45" width="460" height="14" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>' +
        '<text x="50" y="56" font-size="8" font-weight="700" fill="#15803d">Upper Epidermis (Cuticle)</text>' +
        '<rect x="40" y="205" width="460" height="14" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>' +
        '<text x="50" y="216" font-size="8" font-weight="700" fill="#15803d">Lower Epidermis with Stomata</text>' +
        '<circle cx="270" cy="130" r="72" fill="rgba(34,197,94,0.08)" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>' +
        '<text x="140" y="100" text-anchor="end" font-size="9" font-weight="800" fill="#15803d">Mesophyll Cells</text>' +
        '<text x="140" y="112" text-anchor="end" font-size="7.5" font-weight="600" fill="#166534">PEP Carboxylase (Initial CO₂ Fixation)</text>' +
        '<text x="140" y="122" text-anchor="end" font-size="7.5" font-weight="600" fill="#166534">No photorespiration</text>' +
        '<line x1="145" y1="105" x2="200" y2="115" stroke="#16a34a" stroke-width="1.2"/>' +
        '<circle cx="270" cy="130" r="46" fill="rgba(234,179,8,0.18)" stroke="#eab308" stroke-width="3"/>' +
        '<text x="400" y="100" font-size="9.5" font-weight="800" fill="#854d0e">Bundle Sheath Cells</text>' +
        '<text x="400" y="112" font-size="7.5" font-weight="700" fill="#a16207">Tight wreath-like ring (\'Kranz\')</text>' +
        '<text x="400" y="122" font-size="7.5" font-weight="600" fill="#a16207">Thick walls · Impermeable to gases</text>' +
        '<text x="400" y="132" font-size="7.5" font-weight="600" fill="#a16207">Large agranal chloroplasts · RuBisCO</text>' +
        '<line x1="395" y1="105" x2="315" y2="120" stroke="#ca8a04" stroke-width="1.2"/>' +
        '<circle cx="270" cy="130" r="22" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2"/>' +
        '<text x="270" y="128" text-anchor="middle" font-size="8" font-weight="800" fill="#3730a3">VASCULAR</text>' +
        '<text x="270" y="138" text-anchor="middle" font-size="7" font-weight="700" fill="#4338ca">BUNDLE</text>' +
        '<rect x="25" y="235" width="490" height="20" rx="3" fill="rgba(234,179,8,0.1)" stroke="#ca8a04" stroke-width="0.8"/>' +
        '<text x="270" y="248" text-anchor="middle" font-size="8" font-weight="700" fill="#854d0e">NCERT High-Yield: Concentrates CO₂ at RuBisCO active site, suppressing oxygenase activity completely</text>' +
      '</svg>'
    };
  }

  // 14. Wheatstone Bridge Resistor Network (Physics Q8 & Q22 / phy_ce_008 / phy_ce_022)
  function _getWheatstoneBridge() {
    return {
      caption: 'Figure: Wheatstone Bridge Circuit Schematic & Null Current Balance Condition',
      svg: '<svg class="stem-svg" viewBox="0 0 540 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="10" width="520" height="260" rx="8" fill="var(--c-surface, #fff)" stroke="var(--c-border, #e2e8f0)" stroke-width="1"/>' +
        '<text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="var(--c-text, #1e293b)">WHEATSTONE BRIDGE CIRCUIT (NULL DEFLECTION)</text>' +
        '<line x1="120" y1="130" x2="180" y2="102" stroke="#334155" stroke-width="2"/>' +
        '<rect x="180" y="85" width="35" height="18" fill="#f8fafc" stroke="#2563eb" stroke-width="2" transform="rotate(-25 197 94)"/>' +
        '<text x="185" y="78" font-size="11" font-weight="800" fill="#2563eb">P</text>' +
        '<line x1="215" y1="85" x2="270" y2="60" stroke="#334155" stroke-width="2"/>' +
        '<line x1="270" y1="60" x2="325" y2="85" stroke="#334155" stroke-width="2"/>' +
        '<rect x="325" y="85" width="35" height="18" fill="#f8fafc" stroke="#2563eb" stroke-width="2" transform="rotate(25 342 94)"/>' +
        '<text x="350" y="78" font-size="11" font-weight="800" fill="#2563eb">Q</text>' +
        '<line x1="360" y1="102" x2="420" y2="130" stroke="#334155" stroke-width="2"/>' +
        '<line x1="120" y1="130" x2="180" y2="158" stroke="#334155" stroke-width="2"/>' +
        '<rect x="180" y="157" width="35" height="18" fill="#f8fafc" stroke="#059669" stroke-width="2" transform="rotate(25 197 166)"/>' +
        '<text x="185" y="192" font-size="11" font-weight="800" fill="#059669">R</text>' +
        '<line x1="215" y1="175" x2="270" y2="200" stroke="#334155" stroke-width="2"/>' +
        '<line x1="270" y1="200" x2="325" y2="175" stroke="#334155" stroke-width="2"/>' +
        '<rect x="325" y="157" width="35" height="18" fill="#f8fafc" stroke="#059669" stroke-width="2" transform="rotate(-25 342 166)"/>' +
        '<text x="350" y="192" font-size="11" font-weight="800" fill="#059669">S</text>' +
        '<line x1="360" y1="158" x2="420" y2="130" stroke="#334155" stroke-width="2"/>' +
        '<line x1="270" y1="60" x2="270" y2="105" stroke="#334155" stroke-width="2"/>' +
        '<circle cx="270" cy="130" r="18" fill="var(--c-surface, #fff)" stroke="#e11d48" stroke-width="2"/>' +
        '<text x="270" y="135" text-anchor="middle" font-size="13" font-weight="900" fill="#e11d48">G</text>' +
        '<line x1="270" y1="155" x2="270" y2="200" stroke="#334155" stroke-width="2"/>' +
        '<circle cx="120" cy="130" r="4.5" fill="#1e293b"/><text x="105" y="134" font-size="11" font-weight="900" fill="#1e293b">A</text>' +
        '<circle cx="270" cy="60" r="4.5" fill="#1e293b"/><text x="270" y="50" text-anchor="middle" font-size="11" font-weight="900" fill="#1e293b">B</text>' +
        '<circle cx="420" cy="130" r="4.5" fill="#1e293b"/><text x="430" y="134" font-size="11" font-weight="900" fill="#1e293b">C</text>' +
        '<circle cx="270" cy="200" r="4.5" fill="#1e293b"/><text x="270" y="218" text-anchor="middle" font-size="11" font-weight="900" fill="#1e293b">D</text>' +
        '<path d="M 120 130 L 120 235 L 250 235" fill="none" stroke="#334155" stroke-width="2"/>' +
        '<line x1="250" y1="225" x2="250" y2="245" stroke="#334155" stroke-width="2"/>' +
        '<line x1="257" y1="230" x2="257" y2="240" stroke="#334155" stroke-width="3"/>' +
        '<text x="254" y="220" text-anchor="middle" font-size="10" font-weight="700" fill="#334155">E (Battery)</text>' +
        '<path d="M 257 235 L 420 235 L 420 130" fill="none" stroke="#334155" stroke-width="2"/>' +
        '<rect x="145" y="115" width="95" height="30" rx="4" fill="rgba(37,99,235,0.08)" stroke="#2563eb" stroke-width="1"/>' +
        '<text x="192" y="128" text-anchor="middle" font-size="8.5" font-weight="800" fill="#1d4ed8">At Balance (Ig = 0):</text>' +
        '<text x="192" y="140" text-anchor="middle" font-size="10" font-weight="900" fill="#2563eb">P / Q = R / S</text>' +
      '</svg>'
    };
  }

  // Registry map
  var DIAGRAMS = {
    'oxygen_dissociation_curve': _getOxygenCurve,
    'binding_energy_curve': _getBindingEnergyCurve,
    'zener_diode_circuit': _getZenerCircuit,
    'cannizzaro_reaction_flow': _getCannizzaroFlow,
    'nephron_countercurrent': _getCounterCurrentFlow,
    'logic_gate_nor_demorgan': _getLogicGateFlow,
    'cardiac_conduction_system': _getCardiacConductionSystem,
    'ecg_complex_standard': _getEcgComplex,
    'mitochondrion_ultrastructure': _getMitochondrion,
    'animal_cell_lysosome': _getAnimalCellLysosome,
    'agarose_gel_electrophoresis': _getAgaroseGel,
    'recombinant_dna_plasmid': _getRecombinantPlasmid,
    'kranz_anatomy_c4': _getKranzAnatomy,
    'wheatstone_bridge_circuit': _getWheatstoneBridge
  };

  /**
   * Automatically resolve the appropriate diagram for a question object or text
   */
  function getDiagram(questionObjOrText) {
    if (!questionObjOrText) return null;

    var qId = '';
    var qText = '';
    var diagramKey = '';

    if (typeof questionObjOrText === 'object') {
      qId = questionObjOrText.id || '';
      qText = questionObjOrText.question || '';
      diagramKey = questionObjOrText.diagramKey || '';

      // Direct custom diagram object
      if (questionObjOrText.diagram) {
        if (typeof questionObjOrText.diagram === 'string') return questionObjOrText.diagram;
        if (questionObjOrText.diagram.svg) {
          return '<div class="stem-diagram-card" role="button" tabindex="0" title="Click to enlarge schematic">' +
                   '<div class="diagram-header">' +
                     '<span class="diagram-badge">🔬 OFFICIAL SCIENTIFIC SCHEMATIC</span>' +
                     (questionObjOrText.diagram.caption ? '<span class="diagram-caption">' + questionObjOrText.diagram.caption + '</span>' : '') +
                     '<span class="diagram-zoom-hint">🔍 Enlarge</span>' +
                   '</div>' +
                   '<div class="diagram-svg-wrap">' + questionObjOrText.diagram.svg + '</div>' +
                   '<div class="diagram-footer">' +
                     '<span>NCERT Benchmark Illustration · AIIMS &amp; MP PNST High-Yield Standard</span>' +
                   '</div>' +
                 '</div>';
        }
      }
    } else {
      qText = String(questionObjOrText);
    }

    // Direct key lookup
    if (diagramKey && DIAGRAMS[diagramKey]) {
      var d = DIAGRAMS[diagramKey]();
      return _renderCard(d);
    }

    // Question ID mapping for flagship tests & key chapters
    if (qId === 'test100_q003') return _renderCard(_getOxygenCurve());
    if (qId === 'test100_q008' || qId === 'bio_hp_001' || qId === 'bio_hp_022') return _renderCard(_getEcgComplex());
    if (qId === 'test100_q013') return _renderCard(_getCounterCurrentFlow());
    if (qId === 'test100_q038') return _renderCard(_getBindingEnergyCurve());
    if (qId === 'test100_q047') return _renderCard(_getZenerCircuit());
    if (qId === 'test100_q050') return _renderCard(_getLogicGateFlow());
    if (qId === 'test100_q084') return _renderCard(_getCannizzaroFlow());
    if (qId === 'bio_hp_006') return _renderCard(_getCardiacConductionSystem());
    if (qId === 'bio_cs_023') return _renderCard(_getMitochondrion());
    if (qId === 'bio_cs_003') return _renderCard(_getAnimalCellLysosome());
    if (qId === 'bio_bt_002') return _renderCard(_getAgaroseGel());
    if (qId === 'bio_bt_009' || qId === 'bio_bt_017') return _renderCard(_getRecombinantPlasmid());
    if (qId === 'bio_pp_015') return _renderCard(_getKranzAnatomy());
    if (qId === 'phy_ce_008' || qId === 'phy_ce_022') return _renderCard(_getWheatstoneBridge());

    // Intelligent keyword auto-matching
    var lower = qText.toLowerCase();
    if (lower.indexOf('dissociation curve') !== -1 && (lower.indexOf('oxyhaemoglobin') !== -1 || lower.indexOf('oxygen') !== -1)) {
      return _renderCard(_getOxygenCurve());
    }
    if (lower.indexOf('binding energy per nucleon') !== -1 && (lower.indexOf('14_7 n') !== -1 || lower.indexOf('nitrogen') !== -1)) {
      return _renderCard(_getBindingEnergyCurve());
    }
    if (lower.indexOf('zener diode') !== -1 && lower.indexOf('voltage regulator') !== -1) {
      return _renderCard(_getZenerCircuit());
    }
    if (lower.indexOf('cannizzaro reaction') !== -1 && (lower.indexOf('disproportionation') !== -1 || lower.indexOf('benzaldehyde') !== -1)) {
      return _renderCard(_getCannizzaroFlow());
    }
    if (lower.indexOf('counter-current mechanism') !== -1 && (lower.indexOf('henle') !== -1 || lower.indexOf('vasa recta') !== -1)) {
      return _renderCard(_getCounterCurrentFlow());
    }
    if (lower.indexOf('nor gate') !== -1 && lower.indexOf("de morgan's theorem") !== -1) {
      return _renderCard(_getLogicGateFlow());
    }
    if (lower.indexOf('conduction system') !== -1 && lower.indexOf('heart') !== -1) {
      return _renderCard(_getCardiacConductionSystem());
    }
    if ((lower.indexOf('electrocardiogram') !== -1 || lower.indexOf('ecg') !== -1) && (lower.indexOf('t wave') !== -1 || lower.indexOf('qrs') !== -1 || lower.indexOf('p wave') !== -1)) {
      return _renderCard(_getEcgComplex());
    }
    if (lower.indexOf('mitochondri') !== -1 && (lower.indexOf('cristae') !== -1 || lower.indexOf('labelled y') !== -1)) {
      return _renderCard(_getMitochondrion());
    }
    if (lower.indexOf('animal cell') !== -1 && (lower.indexOf('hydrolase') !== -1 || lower.indexOf('lysosome') !== -1 || lower.indexOf('labelled x') !== -1)) {
      return _renderCard(_getAnimalCellLysosome());
    }
    if (lower.indexOf('agarose gel electrophoresis') !== -1 || (lower.indexOf('gel electrophoresis') !== -1 && lower.indexOf('anode') !== -1)) {
      return _renderCard(_getAgaroseGel());
    }
    if (lower.indexOf('recombinant dna') !== -1 && (lower.indexOf('vector') !== -1 || lower.indexOf('ligase') !== -1 || lower.indexOf('plasmid') !== -1)) {
      return _renderCard(_getRecombinantPlasmid());
    }
    if (lower.indexOf('c4 plant') !== -1 && (lower.indexOf('bundle sheath') !== -1 || lower.indexOf('wreath') !== -1)) {
      return _renderCard(_getKranzAnatomy());
    }
    if (lower.indexOf('wheatstone bridge') !== -1) {
      return _renderCard(_getWheatstoneBridge());
    }

    return null;
  }

  function _renderCard(diagramData) {
    if (!diagramData || !diagramData.svg) return null;
    return '<div class="stem-diagram-card" role="button" tabindex="0" title="Click to enlarge schematic">' +
             '<div class="diagram-header">' +
               '<span class="diagram-badge">🔬 OFFICIAL SCIENTIFIC SCHEMATIC</span>' +
               '<span class="diagram-caption">' + diagramData.caption + '</span>' +
               '<span class="diagram-zoom-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg> Enlarge</span>' +
             '</div>' +
             '<div class="diagram-svg-wrap">' +
               diagramData.svg +
             '</div>' +
             '<div class="diagram-footer">' +
               '<span>NCERT Benchmark Illustration · AIIMS &amp; MP PNST High-Yield Standard · Click to Inspect</span>' +
             '</div>' +
           '</div>';
  }

  /**
   * Initializes diagram modal zoom/lightbox in the browser
   */
  function initModal() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('stem-diagram-modal-backdrop')) return;

    var modalHtml =
      '<div id="stem-diagram-modal-backdrop" class="stem-modal-backdrop" style="display:none;" aria-hidden="true">' +
        '<div class="stem-modal-container" role="dialog" aria-modal="true" aria-label="Diagram Inspection">' +
          '<div class="stem-modal-header">' +
            '<div class="stem-modal-title-wrap">' +
              '<span class="stem-modal-badge">🔬 HIGH-RESOLUTION SCIENTIFIC SCHEMATIC</span>' +
              '<h4 id="stem-modal-caption" class="stem-modal-caption"></h4>' +
            '</div>' +
            '<div class="stem-modal-actions">' +
              '<button type="button" class="stem-modal-btn" id="stem-zoom-out" title="Zoom Out" aria-label="Zoom out">－</button>' +
              '<button type="button" class="stem-modal-btn" id="stem-zoom-reset" title="Reset Zoom" aria-label="Reset zoom">100%</button>' +
              '<button type="button" class="stem-modal-btn" id="stem-zoom-in" title="Zoom In" aria-label="Zoom in">＋</button>' +
              '<button type="button" class="stem-modal-close" id="stem-modal-close" title="Close" aria-label="Close dialog">&times;</button>' +
            '</div>' +
          '</div>' +
          '<div class="stem-modal-body" id="stem-modal-svg-host">' +
          '</div>' +
          '<div class="stem-modal-footer">' +
            '<span>Use zoom controls to inspect cellular details · Press Esc or click outside to dismiss</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    var backdrop = document.getElementById('stem-diagram-modal-backdrop');
    var captionEl = document.getElementById('stem-modal-caption');
    var svgHost = document.getElementById('stem-modal-svg-host');
    var closeBtn = document.getElementById('stem-modal-close');
    var zoomInBtn = document.getElementById('stem-zoom-in');
    var zoomOutBtn = document.getElementById('stem-zoom-out');
    var zoomResetBtn = document.getElementById('stem-zoom-reset');

    var currentZoom = 1.0;

    function setZoom(val) {
      currentZoom = Math.max(0.6, Math.min(2.5, val));
      if (svgHost.firstElementChild) {
        svgHost.firstElementChild.style.transform = 'scale(' + currentZoom + ')';
        svgHost.firstElementChild.style.transformOrigin = 'center center';
        svgHost.firstElementChild.style.transition = 'transform 0.15s ease-out';
      }
      zoomResetBtn.textContent = Math.round(currentZoom * 100) + '%';
    }

    function closeModal() {
      backdrop.style.display = 'none';
      backdrop.setAttribute('aria-hidden', 'true');
      svgHost.innerHTML = '';
      currentZoom = 1.0;
    }

    function openModal(card) {
      var svgWrap = card.querySelector('.diagram-svg-wrap');
      var cap = card.querySelector('.diagram-caption');
      if (!svgWrap) return;

      captionEl.textContent = cap ? cap.textContent : 'Scientific Illustration';
      svgHost.innerHTML = svgWrap.innerHTML;
      currentZoom = 1.0;
      setZoom(1.0);

      backdrop.style.display = 'flex';
      backdrop.setAttribute('aria-hidden', 'false');
    }

    // Delegated click event
    document.addEventListener('click', function(e) {
      var card = e.target.closest('.stem-diagram-card');
      if (card) {
        openModal(card);
        return;
      }
      if (e.target === backdrop || e.target === closeBtn) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && backdrop.style.display !== 'none') {
        closeModal();
      }
      if (e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('stem-diagram-card')) {
        openModal(document.activeElement);
      }
    });

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        setZoom(currentZoom + 0.2);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        setZoom(currentZoom - 0.2);
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        setZoom(1.0);
      });
    }
  }

  // Auto-init modal in browser
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initModal);
    } else {
      setTimeout(initModal, 100);
    }
  }

  return {
    getDiagram: getDiagram,
    initModal: initModal
  };
})();

// Export globally
if (typeof window !== 'undefined') {
  window.StemDiagrams = StemDiagrams;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StemDiagrams;
}

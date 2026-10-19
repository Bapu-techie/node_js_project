'use strict';
// ============================================================
// TEST CONFIG — NursePrep Pro v3.0
// AIIMS BSc Nursing Entrance Exam
// Section 1: 30 Topic Tests Round 1 | Section 2: 30 Topic Tests Round 2
// Section 3: 10 Hard Mode Tests | Section 4: 4 Subject Tests
// Section 5: 6 Pair Tests | Section 6: 15 Multi Tests
// Section 7: 12 Quick Tests | Section 8: 9 Speed Drills
// Section 9: 12 Chapter Builders | Section 10: 12 AIIMS Mocks
// TOTAL: 140 Tests | Generated: Production-Ready
// ============================================================

var TEST_CONFIG = [
// ============================================================
// SECTION 1 — TOPIC TESTS ROUND 1 (30 tests) [KEPT AS-IS]
// One test per chapter: 10 Qs, 12 min each (GK: 10 min)
// ============================================================

  // ═══════════════════════════════════════════════════════════
  // 20-QUESTION HIGH-YIELD MINI SPEED MOCK TEST
  // ═══════════════════════════════════════════════════════════
  {
    id: 'mini_mock_20_test_1',
    title: 'AIIMS & MP PNST 2027 Mini Speed Mock (20 Questions)',
    type: 'multi',                     // Appears in 'All Tests' and 'Multi' tab
    subject: 'All Subjects',
    chapter: 'Biology, Chemistry, Physics & GK High-Yield',
    timeLimitMinutes: 25,             // 25 minutes
    negativeMarking: true,             // -1/3 negative marking
    totalQuestions: 20,               // 20 questions
    description: 'High-yield 20-question speed simulation covering Biology (5), Chemistry (5), Physics (5), and General Knowledge (5) with negative marking (-1/3), official vector schematics, and NCERT step-by-step explanations.',
    sections: [
      { subject: 'mini_test', topics: ['test_20_questions'] }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // 100-QUESTION FULL LENGTH TEST
  // ═══════════════════════════════════════════════════════════
  {
    id: 'full_mock_100_test_1',
    title: 'AIIMS & MP PNST 2027 Full Length Test 1 (100 Questions)',
    type: 'multi',                     // Appears in 'All Tests' and 'Multi' tab
    subject: 'All Subjects',
    chapter: 'Biology & Chemistry High-Yield Full Syllabus',
    timeLimitMinutes: 120,             // 120 minutes (2 Hours)
    negativeMarking: true,             // -1/3 negative marking
    totalQuestions: 100,               // 100 questions
    description: 'Comprehensive 100-question full-length simulation for AIIMS B.Sc. Nursing & MP PNST 2027 with negative marking (-1/3) and step-by-step NCERT explanations.',
    sections: [
      { subject: 'full_test', topics: ['test_100_questions'] }
    ]
  },
{
id: 'topic_phy_current_electricity',
title: 'Current Electricity',
type: 'topic',
subject: 'Physics',
chapter: 'Current Electricity',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Ohm\'s law, Kirchhoff\'s laws, series and parallel resistors, Wheatstone bridge, potentiometer',
sections: [
{ subject: 'physics', topics: ['current_electricity'] }
]
},
{
id: 'topic_phy_electrostatics',
title: 'Electrostatics',
type: 'topic',
subject: 'Physics',
chapter: 'Electrostatics',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Coulomb\'s law, electric field, electric potential, Gauss\'s law, capacitors',
sections: [
{ subject: 'physics', topics: ['electrostatics'] }
]
},
{
id: 'topic_phy_magnetic_effects_current',
title: 'Magnetic Effects of Current',
type: 'topic',
subject: 'Physics',
chapter: 'Magnetic Effects of Current',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Biot-Savart law, Ampere\'s law, force on moving charge, cyclotron, galvanometer',
sections: [
{ subject: 'physics', topics: ['magnetic_effects_current'] }
]
},
{
id: 'topic_phy_electromagnetic_induction_ac',
title: 'Electromagnetic Induction and AC',
type: 'topic',
subject: 'Physics',
chapter: 'Electromagnetic Induction and Alternating Current',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Faraday\'s law, Lenz\'s law, AC circuits, transformers, resonance',
sections: [
{ subject: 'physics', topics: ['electromagnetic_induction_ac'] }
]
},
{
id: 'topic_phy_ray_optics',
title: 'Ray Optics',
type: 'topic',
subject: 'Physics',
chapter: 'Ray Optics',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Reflection, refraction, lenses, mirrors, optical instruments, dispersion',
sections: [
{ subject: 'physics', topics: ['ray_optics'] }
]
},
{
id: 'topic_phy_wave_optics',
title: 'Wave Optics',
type: 'topic',
subject: 'Physics',
chapter: 'Wave Optics',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Huygens\' principle, interference, diffraction, polarisation, resolving power',
sections: [
{ subject: 'physics', topics: ['wave_optics'] }
]
},
{
id: 'topic_phy_modern_physics',
title: 'Modern Physics',
type: 'topic',
subject: 'Physics',
chapter: 'Modern Physics',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Photoelectric effect, de Broglie wavelength, Bohr model, radioactivity, nuclear physics',
sections: [
{ subject: 'physics', topics: ['modern_physics'] }
]
},
{
id: 'topic_phy_kinematics',
title: 'Kinematics',
type: 'topic',
subject: 'Physics',
chapter: 'Kinematics',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Motion in straight line, projectile motion, relative velocity, uniform circular motion',
sections: [
{ subject: 'physics', topics: ['kinematics'] }
]
},
{
id: 'topic_phy_work_energy_power',
title: 'Work, Energy and Power',
type: 'topic',
subject: 'Physics',
chapter: 'Work, Energy and Power',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Work-energy theorem, conservation of energy, collisions, power, potential energy',
sections: [
{ subject: 'physics', topics: ['work_energy_power'] }
]
},
{
id: 'topic_chem_general_organic_chemistry',
title: 'General Organic Chemistry',
type: 'topic',
subject: 'Chemistry',
chapter: 'General Organic Chemistry',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Hybridisation, isomerism, inductive effect, resonance, carbocations, nucleophiles',
sections: [
{ subject: 'chemistry', topics: ['general_organic_chemistry'] }
]
},
{
id: 'topic_chem_organic_reactions_mechanisms',
title: 'Organic Reactions and Mechanisms',
type: 'topic',
subject: 'Chemistry',
chapter: 'Organic Reactions and Mechanisms',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'SN1, SN2, E1, E2 reactions, Markovnikov rule, Friedel-Crafts, aldol condensation, Cannizzaro reaction',
sections: [
{ subject: 'chemistry', topics: ['organic_reactions_mechanisms'] }
]
},
{
id: 'topic_chem_alcohols_aldehydes_ketones_acids',
title: 'Alcohols, Aldehydes, Ketones, and Carboxylic Acids',
type: 'topic',
subject: 'Chemistry',
chapter: 'Alcohols, Aldehydes, Ketones, and Carboxylic Acids',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Classification of alcohols, oxidation reactions, Tollens test, Fehling test, iodoform test, esterification',
sections: [
{ subject: 'chemistry', topics: ['alcohols_aldehydes_ketones_acids'] }
]
},
{
id: 'topic_chem_chemical_bonding',
title: 'Chemical Bonding and Molecular Structure',
type: 'topic',
subject: 'Chemistry',
chapter: 'Chemical Bonding and Molecular Structure',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'VSEPR theory, hybridisation, molecular orbital theory, hydrogen bonding, Fajans rules, dipole moment',
sections: [
{ subject: 'chemistry', topics: ['chemical_bonding'] }
]
},
{
id: 'topic_chem_p_block_elements',
title: 'p-Block Elements',
type: 'topic',
subject: 'Chemistry',
chapter: 'p-Block Elements',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Group 13-18 elements, important compounds, industrial processes, noble gases, halogens',
sections: [
{ subject: 'chemistry', topics: ['p_block_elements'] }
]
},
{
id: 'topic_chem_coordination_compounds',
title: 'Coordination Compounds',
type: 'topic',
subject: 'Chemistry',
chapter: 'Coordination Compounds',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Werner theory, IUPAC nomenclature, isomerism, crystal field theory, biological coordination compounds',
sections: [
{ subject: 'chemistry', topics: ['coordination_compounds'] }
]
},
{
id: 'topic_chem_chemical_ionic_equilibrium',
title: 'Chemical and Ionic Equilibrium',
type: 'topic',
subject: 'Chemistry',
chapter: 'Chemical and Ionic Equilibrium',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Le Chatelier principle, pH calculations, buffer solutions, solubility product, common ion effect',
sections: [
{ subject: 'chemistry', topics: ['chemical_ionic_equilibrium'] }
]
},
{
id: 'topic_chem_thermodynamics_chem',
title: 'Thermodynamics',
type: 'topic',
subject: 'Chemistry',
chapter: 'Thermodynamics',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'First and second laws, enthalpy, entropy, Gibbs free energy, spontaneity, Hess law',
sections: [
{ subject: 'chemistry', topics: ['thermodynamics_chem'] }
]
},
{
id: 'topic_chem_electrochemistry',
title: 'Electrochemistry',
type: 'topic',
subject: 'Chemistry',
chapter: 'Electrochemistry',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Nernst equation, galvanic cells, electrolysis, Faraday laws, corrosion, conductivity',
sections: [
{ subject: 'chemistry', topics: ['electrochemistry'] }
]
},
{
id: 'topic_bio_human_physiology',
title: 'Human Physiology',
type: 'topic',
subject: 'Biology',
chapter: 'Human Physiology',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Cardiovascular system, respiratory system, nervous system, endocrine system, excretory system',
sections: [
{ subject: 'biology', topics: ['human_physiology'] }
]
},
{
id: 'topic_bio_cell_structure_function',
title: 'Cell Structure and Function',
type: 'topic',
subject: 'Biology',
chapter: 'Cell Structure and Function',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Cell organelles, plasma membrane, prokaryotic vs eukaryotic cells, cell theory, biomolecules',
sections: [
{ subject: 'biology', topics: ['cell_structure_function'] }
]
},
{
id: 'topic_bio_cell_division',
title: 'Cell Division — Mitosis and Meiosis',
type: 'topic',
subject: 'Biology',
chapter: 'Cell Division — Mitosis and Meiosis',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Phases of mitosis, meiosis I and II, crossing over, chromosome behaviour, significance of cell division',
sections: [
{ subject: 'biology', topics: ['cell_division'] }
]
},
{
id: 'topic_bio_genetics_molecular_biology',
title: 'Genetics and Molecular Biology',
type: 'topic',
subject: 'Biology',
chapter: 'Genetics and Molecular Biology',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Mendelian inheritance, DNA structure, replication, transcription, translation, genetic disorders, DNA fingerprinting',
sections: [
{ subject: 'biology', topics: ['genetics_molecular_biology'] }
]
},
{
id: 'topic_bio_reproduction_humans_plants',
title: 'Reproduction in Humans and Plants',
type: 'topic',
subject: 'Biology',
chapter: 'Reproduction in Humans and Plants',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Human reproductive system, menstrual cycle, fertilisation, embryonic development, plant reproduction, pollination',
sections: [
{ subject: 'biology', topics: ['reproduction_humans_plants'] }
]
},
{
id: 'topic_bio_biotechnology_applications',
title: 'Biotechnology and its Applications',
type: 'topic',
subject: 'Biology',
chapter: 'Biotechnology and its Applications',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Recombinant DNA technology, PCR, gene therapy, GMOs, Bt crops, DNA fingerprinting, ethical issues',
sections: [
{ subject: 'biology', topics: ['biotechnology_applications'] }
]
},
{
id: 'topic_bio_ecology_environment',
title: 'Ecology and Environment',
type: 'topic',
subject: 'Biology',
chapter: 'Ecology and Environment',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Ecosystems, energy flow, food chains, biodiversity, conservation, environmental issues, population ecology',
sections: [
{ subject: 'biology', topics: ['ecology_environment'] }
]
},
{
id: 'topic_bio_plant_physiology',
title: 'Plant Physiology',
type: 'topic',
subject: 'Biology',
chapter: 'Plant Physiology',
timeLimitMinutes: 12,
negativeMarking: true,
totalQuestions: 10,
description: 'Photosynthesis, respiration, plant hormones, mineral nutrition, transport in plants, growth and development',
sections: [
{ subject: 'biology', topics: ['plant_physiology'] }
]
},
{
id: 'topic_gk_current_affairs',
title: 'Current Affairs 2023-2027',
type: 'topic',
subject: 'General Knowledge',
chapter: 'Current Affairs 2023-2027',
timeLimitMinutes: 10,
negativeMarking: true,
totalQuestions: 10,
description: 'Recent national and international events, scientific achievements, awards, sports, government initiatives',
sections: [
{ subject: 'gk', topics: ['current_affairs'] }
]
},
{
id: 'topic_gk_health_organizations_schemes',
title: 'Health Organizations and Government Schemes',
type: 'topic',
subject: 'General Knowledge',
chapter: 'Health Organizations and Government Schemes',
timeLimitMinutes: 10,
negativeMarking: true,
totalQuestions: 10,
description: 'WHO, UNICEF, ICMR, INC, NHM, PM-JAY, Ayushman Bharat, ASHA, vaccination programmes, health policies',
sections: [
{ subject: 'gk', topics: ['health_organizations_schemes'] }
]
},
{
id: 'topic_gk_awards_important_days',
title: 'Awards and Important Days',
type: 'topic',
subject: 'General Knowledge',
chapter: 'Awards and Important Days',
timeLimitMinutes: 10,
negativeMarking: true,
totalQuestions: 10,
description: 'Nobel Prizes, Bharat Ratna, Padma Awards, Florence Nightingale Award, World Health Day, International Nurses Day',
sections: [
{ subject: 'gk', topics: ['awards_important_days'] }
]
},
{
id: 'topic_gk_indian_polity_articles',
title: 'Basic Indian Polity — Articles and Amendments',
type: 'topic',
subject: 'General Knowledge',
chapter: 'Basic Indian Polity — Articles and Amendments',
timeLimitMinutes: 10,
negativeMarking: true,
totalQuestions: 10,
description: 'Fundamental Rights, DPSP, Fundamental Duties, important constitutional articles, key amendments, writs',
sections: [
{ subject: 'gk', topics: ['indian_polity_articles'] }
]
},


// Continue TEST_CONFIG array from Part 1
// ============================================================
// SECTION 2 — TOPIC TESTS ROUND 2 (30 NEW tests)
// Second-round practice for every chapter with increased questions
// ============================================================
{
  id: 'topic2_phy_current_electricity',
  title: 'Current Electricity — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Current Electricity',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Ohm\'s law, Kirchhoff\'s laws, Wheatstone bridge, potentiometer, and circuit analysis — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['current_electricity'] }
  ]
  },
  {
  id: 'topic2_phy_electrostatics',
  title: 'Electrostatics — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Electrostatics',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Coulomb\'s law, electric field, Gauss\'s law, capacitors, and electric potential — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['electrostatics'] }
  ]
  },
  {
  id: 'topic2_phy_magnetic_effects_current',
  title: 'Magnetic Effects — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Magnetic Effects of Current',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Biot-Savart law, Ampere\'s law, cyclotron, galvanometer, and magnetic force — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['magnetic_effects_current'] }
  ]
  },
  {
  id: 'topic2_phy_electromagnetic_induction_ac',
  title: 'EM Induction & AC — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Electromagnetic Induction and Alternating Current',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Faraday\'s law, Lenz\'s law, AC circuits, transformers, and resonance — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['electromagnetic_induction_ac'] }
  ]
  },
  {
  id: 'topic2_phy_ray_optics',
  title: 'Ray Optics — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Ray Optics',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on reflection, refraction, lenses, mirrors, optical instruments, and dispersion — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['ray_optics'] }
  ]
  },
  {
  id: 'topic2_phy_wave_optics',
  title: 'Wave Optics — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Wave Optics',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on interference, diffraction, polarisation, resolving power, and Huygens\' principle — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['wave_optics'] }
  ]
  },
  {
  id: 'topic2_phy_modern_physics',
  title: 'Modern Physics — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Modern Physics',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on photoelectric effect, de Broglie wavelength, Bohr model, radioactivity, and nuclear physics — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['modern_physics'] }
  ]
  },
  {
  id: 'topic2_phy_kinematics',
  title: 'Kinematics — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Kinematics',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on projectile motion, relative velocity, uniform circular motion, and graphical analysis — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['kinematics'] }
  ]
  },
  {
  id: 'topic2_phy_work_energy_power',
  title: 'Work, Energy & Power — Round 2',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Work, Energy and Power',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on work-energy theorem, conservation of energy, collisions, power, and potential energy — 15 questions for deeper mastery',
  sections: [
  { subject: 'physics', topics: ['work_energy_power'] }
  ]
  },
  {
  id: 'topic2_chem_general_organic_chemistry',
  title: 'General Organic Chemistry — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'General Organic Chemistry',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on hybridisation, isomerism, inductive effect, resonance, carbocations, and nucleophiles — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['general_organic_chemistry'] }
  ]
  },
  {
  id: 'topic2_chem_organic_reactions_mechanisms',
  title: 'Organic Reactions — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Organic Reactions and Mechanisms',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on SN1, SN2, E1, E2, Markovnikov rule, Friedel-Crafts, aldol, and Cannizzaro reactions — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms'] }
  ]
  },
  {
  id: 'topic2_chem_alcohols_aldehydes_ketones_acids',
  title: 'Alcohols, Aldehydes & Ketones — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Alcohols, Aldehydes, Ketones, and Carboxylic Acids',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on alcohol classification, oxidation, Tollens test, Fehling test, iodoform test, and esterification — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['alcohols_aldehydes_ketones_acids'] }
  ]
  },
  {
  id: 'topic2_chem_chemical_bonding',
  title: 'Chemical Bonding — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Chemical Bonding and Molecular Structure',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on VSEPR theory, hybridisation, MOT, hydrogen bonding, Fajans rules, and dipole moment — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['chemical_bonding'] }
  ]
  },
  {
  id: 'topic2_chem_p_block_elements',
  title: 'p-Block Elements — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'p-Block Elements',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Group 13-18 elements, industrial processes, noble gases, halogens, and important compounds — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['p_block_elements'] }
  ]
  },
  {
  id: 'topic2_chem_coordination_compounds',
  title: 'Coordination Compounds — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Coordination Compounds',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Werner theory, IUPAC nomenclature, isomerism, crystal field theory, and biological coordination compounds — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['coordination_compounds'] }
  ]
  },
  {
  id: 'topic2_chem_chemical_ionic_equilibrium',
  title: 'Chemical Equilibrium — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Chemical and Ionic Equilibrium',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Le Chatelier principle, pH calculations, buffer solutions, solubility product, and common ion effect — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['chemical_ionic_equilibrium'] }
  ]
  },
  {
  id: 'topic2_chem_thermodynamics_chem',
  title: 'Thermodynamics — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Thermodynamics',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on first and second laws, enthalpy, entropy, Gibbs free energy, spontaneity, and Hess law — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['thermodynamics_chem'] }
  ]
  },
  {
  id: 'topic2_chem_electrochemistry',
  title: 'Electrochemistry — Round 2',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Electrochemistry',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Nernst equation, galvanic cells, electrolysis, Faraday laws, corrosion, and conductivity — 15 questions for deeper mastery',
  sections: [
  { subject: 'chemistry', topics: ['electrochemistry'] }
  ]
  },
  {
  id: 'topic2_bio_human_physiology',
  title: 'Human Physiology — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Human Physiology',
  timeLimitMinutes: 22,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Advanced practice on cardiovascular, respiratory, nervous, endocrine, and excretory systems — 20 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['human_physiology'] }
  ]
  },
  {
  id: 'topic2_bio_cell_structure_function',
  title: 'Cell Structure — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Cell Structure and Function',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on cell organelles, plasma membrane, prokaryotic vs eukaryotic cells, cell theory, and biomolecules — 15 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['cell_structure_function'] }
  ]
  },
  {
  id: 'topic2_bio_cell_division',
  title: 'Cell Division — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Cell Division — Mitosis and Meiosis',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on phases of mitosis, meiosis I and II, crossing over, chromosome behaviour, and significance of cell division — 15 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['cell_division'] }
  ]
  },
  {
  id: 'topic2_bio_genetics_molecular_biology',
  title: 'Genetics & Mol. Biology — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Genetics and Molecular Biology',
  timeLimitMinutes: 20,
  negativeMarking: true,
  totalQuestions: 18,
  description: 'Advanced practice on Mendelian inheritance, DNA structure, replication, transcription, translation, genetic disorders, and DNA fingerprinting — 18 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['genetics_molecular_biology'] }
  ]
  },
  {
  id: 'topic2_bio_reproduction_humans_plants',
  title: 'Reproduction — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Reproduction in Humans and Plants',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on human reproductive system, menstrual cycle, fertilisation, embryonic development, plant reproduction, and pollination — 15 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['reproduction_humans_plants'] }
  ]
  },
  {
  id: 'topic2_bio_biotechnology_applications',
  title: 'Biotechnology — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Biotechnology and its Applications',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on recombinant DNA technology, PCR, gene therapy, GMOs, Bt crops, DNA fingerprinting, and ethical issues — 15 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['biotechnology_applications'] }
  ]
  },
  {
  id: 'topic2_bio_ecology_environment',
  title: 'Ecology — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Ecology and Environment',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on ecosystems, energy flow, food chains, biodiversity, conservation, environmental issues, and population ecology — 15 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['ecology_environment'] }
  ]
  },
  {
  id: 'topic2_bio_plant_physiology',
  title: 'Plant Physiology — Round 2',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Plant Physiology',
  timeLimitMinutes: 18,
  negativeMarking: true,
  totalQuestions: 16,
  description: 'Advanced practice on photosynthesis, respiration, plant hormones, mineral nutrition, transport in plants, and growth and development — 16 questions for deeper mastery',
  sections: [
  { subject: 'biology', topics: ['plant_physiology'] }
  ]
  },
  {
  id: 'topic2_gk_current_affairs',
  title: 'Current Affairs — Round 2',
  type: 'topic',
  subject: 'General Knowledge',
  chapter: 'Current Affairs 2023-2027',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on recent national and international events, scientific achievements, awards, sports, and government initiatives — 15 questions for deeper mastery',
  sections: [
  { subject: 'gk', topics: ['current_affairs'] }
  ]
  },
  {
  id: 'topic2_gk_health_organizations_schemes',
  title: 'Health Organizations — Round 2',
  type: 'topic',
  subject: 'General Knowledge',
  chapter: 'Health Organizations and Government Schemes',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on WHO, UNICEF, ICMR, INC, NHM, PM-JAY, Ayushman Bharat, ASHA, vaccination programmes, and health policies — 15 questions for deeper mastery',
  sections: [
  { subject: 'gk', topics: ['health_organizations_schemes'] }
  ]
  },
  {
  id: 'topic2_gk_awards_important_days',
  title: 'Awards & Important Days — Round 2',
  type: 'topic',
  subject: 'General Knowledge',
  chapter: 'Awards and Important Days',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Nobel Prizes, Bharat Ratna, Padma Awards, Florence Nightingale Award, World Health Day, International Nurses Day — 15 questions for deeper mastery',
  sections: [
  { subject: 'gk', topics: ['awards_important_days'] }
  ]
  },
  {
  id: 'topic2_gk_indian_polity_articles',
  title: 'Indian Polity — Round 2',
  type: 'topic',
  subject: 'General Knowledge',
  chapter: 'Basic Indian Polity — Articles and Amendments',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Advanced practice on Fundamental Rights, DPSP, Fundamental Duties, important constitutional articles, key amendments, and writs — 15 questions for deeper mastery',
  sections: [
  { subject: 'gk', topics: ['indian_polity_articles'] }
  ]
},

// Continue TEST_CONFIG array from Part 2
// ============================================================
// SECTION 3 — TOPIC TESTS ROUND 3 — HARD ONLY (10 NEW tests)
// High-difficulty focused practice on most frequently tested chapters
// ============================================================
{
  id: 'topic3_hard_phy_modern_physics',
  title: 'Modern Physics — Hard Mode',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Modern Physics',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 8,
  description: 'Hard-mode practice on photoelectric effect, de Broglie wavelength, Bohr model, radioactivity, and nuclear physics — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'physics', topics: ['modern_physics'] }
  ]
  },
  {
  id: 'topic3_hard_phy_electrostatics',
  title: 'Electrostatics — Hard Mode',
  type: 'topic',
  subject: 'Physics',
  chapter: 'Electrostatics',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 8,
  description: 'Hard-mode practice on Coulomb\'s law, Gauss\'s law, electric potential, capacitors, and field calculations — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'physics', topics: ['electrostatics'] }
  ]
  },
  {
  id: 'topic3_hard_chem_organic_reactions',
  title: 'Organic Reactions — Hard Mode',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Organic Reactions and Mechanisms',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 8,
  description: 'Hard-mode practice on SN1/SN2/E1/E2 mechanisms, Markovnikov/anti-Markovnikov rules, and named reactions — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms'] }
  ]
  },
  {
  id: 'topic3_hard_chem_chemical_equilibrium',
  title: 'Chemical Equilibrium — Hard Mode',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Chemical and Ionic Equilibrium',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 8,
  description: 'Hard-mode practice on Le Chatelier principle, pH calculations, buffer capacity, and solubility product problems — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'chemistry', topics: ['chemical_ionic_equilibrium'] }
  ]
  },
  {
  id: 'topic3_hard_chem_electrochemistry',
  title: 'Electrochemistry — Hard Mode',
  type: 'topic',
  subject: 'Chemistry',
  chapter: 'Electrochemistry',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 8,
  description: 'Hard-mode practice on Nernst equation, cell potentials, Faraday laws, and conductivity calculations — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'chemistry', topics: ['electrochemistry'] }
  ]
  },
  {
  id: 'topic3_hard_bio_human_physiology',
  title: 'Human Physiology — Hard Mode',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Human Physiology',
  timeLimitMinutes: 14,
  negativeMarking: true,
  totalQuestions: 12,
  description: 'Hard-mode practice on cardiovascular, respiratory, nervous, endocrine, and excretory systems — emphasising most challenging question types for AIIMS nursing',
  sections: [
  { subject: 'biology', topics: ['human_physiology'] }
  ]
  },
  {
  id: 'topic3_hard_bio_genetics',
  title: 'Genetics & Molecular Biology — Hard Mode',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Genetics and Molecular Biology',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 10,
  description: 'Hard-mode practice on Mendelian inheritance, DNA replication, transcription, translation, and genetic disorders — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'biology', topics: ['genetics_molecular_biology'] }
  ]
  },
  {
  id: 'topic3_hard_bio_reproduction',
  title: 'Reproduction — Hard Mode',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Reproduction in Humans and Plants',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 10,
  description: 'Hard-mode practice on human reproductive system, menstrual cycle, fertilisation, plant reproduction, and contraception — emphasising most challenging question types for AIIMS nursing',
  sections: [
  { subject: 'biology', topics: ['reproduction_humans_plants'] }
  ]
  },
  {
  id: 'topic3_hard_bio_plant_physiology',
  title: 'Plant Physiology — Hard Mode',
  type: 'topic',
  subject: 'Biology',
  chapter: 'Plant Physiology',
  timeLimitMinutes: 12,
  negativeMarking: true,
  totalQuestions: 10,
  description: 'Hard-mode practice on photosynthesis, respiration, plant hormones, mineral nutrition, and transport in plants — emphasising most challenging question types for AIIMS',
  sections: [
  { subject: 'biology', topics: ['plant_physiology'] }
  ]
  },
  {
  id: 'topic3_hard_gk_health_schemes',
  title: 'Health Schemes & Polity — Hard Mode',
  type: 'topic',
  subject: 'General Knowledge',
  chapter: 'Health Organizations and Government Schemes',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 10,
  description: 'Hard-mode practice on WHO, UNICEF, ICMR, NHM, PM-JAY, Ayushman Bharat, ASHA, constitutional articles, and health policies — emphasising most challenging question types for AIIMS nursing',
  sections: [
  { subject: 'gk', topics: ['health_organizations_schemes', 'indian_polity_articles'] }
  ]
},


// Continue TEST_CONFIG array from Part 3
// ============================================================
// SECTION 4 — SUBJECT-WIDE TESTS (4 tests, type: 'subject')
// Full subject coverage with comprehensive question pools
// ============================================================
{
  id: 'subject_physics',
  title: 'Physics — Full Subject Test',
  type: 'subject',
  subject: 'Physics',
  chapter: 'All Physics Chapters',
  timeLimitMinutes: 75,
  negativeMarking: true,
  totalQuestions: 90,
  description: 'Comprehensive test covering all 9 Physics chapters: Current Electricity, Electrostatics, Magnetic Effects, EMI & AC, Ray Optics, Wave Optics, Modern Physics, Kinematics, Work Energy Power',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'magnetic_effects_current', 'electromagnetic_induction_ac', 'ray_optics', 'wave_optics', 'modern_physics', 'kinematics', 'work_energy_power'] }
  ]
  },
  {
  id: 'subject_chemistry',
  title: 'Chemistry — Full Subject Test',
  type: 'subject',
  subject: 'Chemistry',
  chapter: 'All Chemistry Chapters',
  timeLimitMinutes: 75,
  negativeMarking: true,
  totalQuestions: 90,
  description: 'Comprehensive test covering all 9 Chemistry chapters: GOC, Organic Reactions, Alcohols/Aldehydes/Ketones/Acids, Bonding, p-Block, Coordination, Equilibrium, Thermodynamics, Electrochemistry',
  sections: [
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'chemical_bonding', 'p_block_elements', 'coordination_compounds', 'chemical_ionic_equilibrium', 'thermodynamics_chem', 'electrochemistry'] }
  ]
  },
  {
  id: 'subject_biology',
  title: 'Biology — Full Subject Test',
  type: 'subject',
  subject: 'Biology',
  chapter: 'All Biology Chapters',
  timeLimitMinutes: 65,
  negativeMarking: true,
  totalQuestions: 80,
  description: 'Comprehensive test covering all 8 Biology chapters: Human Physiology, Cell Structure, Cell Division, Genetics, Reproduction, Biotechnology, Ecology, Plant Physiology',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'cell_structure_function', 'cell_division', 'genetics_molecular_biology', 'reproduction_humans_plants', 'biotechnology_applications', 'ecology_environment', 'plant_physiology'] }
  ]
  },
  {
  id: 'subject_gk',
  title: 'General Knowledge — Full Subject Test',
  type: 'subject',
  subject: 'General Knowledge',
  chapter: 'All GK Chapters',
  timeLimitMinutes: 35,
  negativeMarking: true,
  totalQuestions: 40,
  description: 'Comprehensive test covering all 4 GK chapters: Current Affairs, Health Organizations, Awards & Days, Indian Polity',
  sections: [
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
},

// Continue TEST_CONFIG array from Part 4
// ============================================================
// SECTION 5 — TWO-SUBJECT PAIR TESTS (6 NEW tests, type: 'pair')
// Focused cross-subject practice for integrated learning
// ============================================================
{
  id: 'pair_physics_chemistry',
  title: 'Physics + Chemistry Combined',
  type: 'pair',
  subject: 'Physics, Chemistry',
  chapter: 'Physical Sciences Integration',
  timeLimitMinutes: 40,
  negativeMarking: true,
  totalQuestions: 45,
  description: 'Integrated test covering core Physical Sciences: Physics (Current Electricity, Electrostatics, Modern Physics) and Chemistry (Bonding, Ionic Equilibrium, Electrochemistry). Ideal for students strengthening fundamental physical chemistry concepts.',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'modern_physics'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'chemical_ionic_equilibrium', 'electrochemistry'] }
  ]
  },
  {
  id: 'pair_physics_biology',
  title: 'Physics + Biology Combined',
  type: 'pair',
  subject: 'Physics, Biology',
  chapter: 'Biophysics Integration',
  timeLimitMinutes: 40,
  negativeMarking: true,
  totalQuestions: 45,
  description: 'Integrated test covering Biophysics topics: Physics (Ray Optics, Modern Physics, Kinematics) and Biology (Human Physiology, Cell Structure, Cell Division). Relevant for understanding medical instrumentation and cellular mechanics.',
  sections: [
  { subject: 'physics', topics: ['ray_optics', 'modern_physics', 'kinematics'] },
  { subject: 'biology', topics: ['human_physiology', 'cell_structure_function', 'cell_division'] }
  ]
  },
  {
  id: 'pair_chemistry_biology',
  title: 'Chemistry + Biology Combined',
  type: 'pair',
  subject: 'Chemistry, Biology',
  chapter: 'Biochemistry Integration',
  timeLimitMinutes: 42,
  negativeMarking: true,
  totalQuestions: 50,
  description: 'Integrated test covering Biochemistry foundations: Chemistry (Bonding, Organic Mechanisms, Ionic Equilibrium) and Biology (Human Physiology, Genetics, Reproduction). Critical for nursing students studying metabolic pathways and pharmacology.',
  sections: [
  { subject: 'chemistry', topics: ['chemical_bonding', 'organic_reactions_mechanisms', 'chemical_ionic_equilibrium'] },
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'reproduction_humans_plants'] }
  ]
  },
  {
  id: 'pair_physics_gk',
  title: 'Physics + General Knowledge',
  type: 'pair',
  subject: 'Physics, General Knowledge',
  chapter: 'Science and Current Affairs',
  timeLimitMinutes: 28,
  negativeMarking: true,
  totalQuestions: 35,
  description: 'Integrated test covering Physics (Modern Physics, Ray Optics, Kinematics) and GK (Current Affairs, Health Organizations, Awards). Useful for balancing technical knowledge with awareness of scientific developments.',
  sections: [
  { subject: 'physics', topics: ['modern_physics', 'ray_optics', 'kinematics'] },
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days'] }
  ]
  },
  {
  id: 'pair_chemistry_gk',
  title: 'Chemistry + General Knowledge',
  type: 'pair',
  subject: 'Chemistry, General Knowledge',
  chapter: 'Chemical Sciences and Polity',
  timeLimitMinutes: 32,
  negativeMarking: true,
  totalQuestions: 40,
  description: 'Integrated test covering Chemistry (Coordination Compounds, Ionic Equilibrium, Thermodynamics) and GK (Health Schemes, Awards, Indian Polity). Relevant for understanding pharmaceutical chemistry and health policy.',
  sections: [
  { subject: 'chemistry', topics: ['coordination_compounds', 'chemical_ionic_equilibrium', 'thermodynamics_chem'] },
  { subject: 'gk', topics: ['health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'pair_biology_gk',
  title: 'Biology + General Knowledge — Health Focus',
  type: 'pair',
  subject: 'Biology, General Knowledge',
  chapter: 'Health Sciences and Policy',
  timeLimitMinutes: 40,
  negativeMarking: true,
  totalQuestions: 50,
  description: 'Integrated test covering Biology (Human Physiology, Ecology, Biotechnology) and GK (Health Schemes, Current Affairs, Awards). Highly relevant for nursing aspirants focusing on public health and biological sciences.',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'ecology_environment', 'biotechnology_applications'] },
  { subject: 'gk', topics: ['health_organizations_schemes', 'current_affairs', 'awards_important_days'] }
  ]
},


// Continue TEST_CONFIG array from Part 5
// ============================================================
// SECTION 6 — MULTI-SUBJECT TESTS (15 tests, type: 'multi')
// 5 Existing + 10 New Integrated Tests
// ============================================================
{
  id: 'multi_pcb_core',
  title: 'PCB Core Integration Test',
  type: 'multi',
  subject: 'Physics, Chemistry, Biology',
  chapter: 'Core Chapters Integration',
  timeLimitMinutes: 75,
  negativeMarking: true,
  totalQuestions: 90,
  description: 'Integrated test covering core chapters from Physics (electrostatics, ray optics, modern physics), Chemistry (bonding, organic mechanisms, coordination), and Biology (human physiology, genetics, cell division)',
  sections: [
  { subject: 'physics', topics: ['electrostatics', 'ray_optics', 'modern_physics'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'organic_reactions_mechanisms', 'coordination_compounds'] },
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'cell_division'] }
  ]
  },
  {
  id: 'multi_bio_chem_nursing',
  title: 'Nursing Focus: Biology and Chemistry Integration',
  type: 'multi',
  subject: 'Biology, Chemistry',
  chapter: 'Nursing-Relevant Topics',
  timeLimitMinutes: 50,
  negativeMarking: true,
  totalQuestions: 60,
  description: 'Focused test for nursing aspirants covering human physiology, reproduction, biotechnology, cell structure, plus organic chemistry and ionic equilibrium',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'reproduction_humans_plants', 'biotechnology_applications', 'cell_structure_function'] },
  { subject: 'chemistry', topics: ['alcohols_aldehydes_ketones_acids', 'chemical_ionic_equilibrium'] }
  ]
  },
  {
  id: 'multi_gk_bio_health',
  title: 'Health Sciences: GK and Biology Integration',
  type: 'multi',
  subject: 'General Knowledge, Biology',
  chapter: 'Health and Environment Focus',
  timeLimitMinutes: 40,
  negativeMarking: true,
  totalQuestions: 50,
  description: 'Health-focused test combining current affairs, health organizations, awards, with ecology and biotechnology applications',
  sections: [
  { subject: 'gk', topics: ['health_organizations_schemes', 'awards_important_days', 'current_affairs'] },
  { subject: 'biology', topics: ['ecology_environment', 'biotechnology_applications'] }
  ]
  },
  {
  id: 'multi_physics_electricity_optics',
  title: 'Physics: Electricity and Optics Master Test',
  type: 'multi',
  subject: 'Physics',
  chapter: 'Electricity and Optics Chapters',
  timeLimitMinutes: 50,
  negativeMarking: true,
  totalQuestions: 60,
  description: 'Comprehensive physics test focusing on current electricity, electrostatics, magnetism, EMI, and both ray and wave optics',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'magnetic_effects_current', 'electromagnetic_induction_ac', 'ray_optics', 'wave_optics'] }
  ]
  },
  {
  id: 'multi_organic_chem_full',
  title: 'Organic Chemistry Complete Test',
  type: 'multi',
  subject: 'Chemistry',
  chapter: 'All Organic Chemistry Chapters',
  timeLimitMinutes: 25,
  negativeMarking: true,
  totalQuestions: 30,
  description: 'Complete organic chemistry coverage: GOC fundamentals, reaction mechanisms, and functional group chemistry (alcohols, aldehydes, ketones, acids)',
  sections: [
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids'] }
  ]
  },
  {
  id: 'multi_pcb_advanced',
  title: 'PCB Advanced Integration',
  type: 'multi',
  subject: 'Physics, Chemistry, Biology',
  chapter: 'Advanced PCB Topics',
  timeLimitMinutes: 52,
  negativeMarking: true,
  totalQuestions: 60,
  description: 'Advanced multi-subject test covering EMI & AC, wave optics, modern physics, organic mechanisms, electrochemistry, genetics, biotechnology, and plant physiology',
  sections: [
  { subject: 'physics', topics: ['electromagnetic_induction_ac', 'wave_optics', 'modern_physics'] },
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'electrochemistry'] },
  { subject: 'biology', topics: ['genetics_molecular_biology', 'biotechnology_applications', 'plant_physiology'] }
  ]
  },
  {
  id: 'multi_nursing_sciences',
  title: 'Nursing Sciences Core',
  type: 'multi',
  subject: 'Biology, Chemistry, GK',
  chapter: 'Core Nursing Sciences',
  timeLimitMinutes: 48,
  negativeMarking: true,
  totalQuestions: 55,
  description: 'Essential nursing sciences test covering human physiology, reproduction, cell structure, coordination compounds, thermodynamics, and health organizations',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'reproduction_humans_plants', 'cell_structure_function'] },
  { subject: 'chemistry', topics: ['coordination_compounds', 'thermodynamics_chem'] },
  { subject: 'gk', topics: ['health_organizations_schemes'] }
  ]
  },
  {
  id: 'multi_nursing_applied',
  title: 'Applied Nursing Sciences',
  type: 'multi',
  subject: 'Biology, General Knowledge',
  chapter: 'Applied Health Sciences',
  timeLimitMinutes: 48,
  negativeMarking: true,
  totalQuestions: 55,
  description: 'Applied sciences test covering genetics, biotechnology, ecology, health schemes, current affairs, and Indian polity relevant to healthcare',
  sections: [
  { subject: 'biology', topics: ['genetics_molecular_biology', 'biotechnology_applications', 'ecology_environment'] },
  { subject: 'gk', topics: ['health_organizations_schemes', 'current_affairs', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'multi_pcb_plant_chem',
  title: 'PCB: Plant Biology and Chemistry',
  type: 'multi',
  subject: 'Physics, Chemistry, Biology',
  chapter: 'Plant Physiology and Physical Chemistry',
  timeLimitMinutes: 42,
  negativeMarking: true,
  totalQuestions: 50,
  description: 'Integrated test focusing on plant physiology, ecology, cell division, organic chemistry, p-block elements, thermodynamics, and mechanics',
  sections: [
  { subject: 'biology', topics: ['plant_physiology', 'ecology_environment', 'cell_division'] },
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'p_block_elements', 'thermodynamics_chem'] },
  { subject: 'physics', topics: ['kinematics', 'work_energy_power'] }
  ]
  },
  {
  id: 'multi_phy_chem_inorganic',
  title: 'Physics and Inorganic Chemistry',
  type: 'multi',
  subject: 'Physics, Chemistry',
  chapter: 'Electricity, Magnetism and Inorganic Chemistry',
  timeLimitMinutes: 42,
  negativeMarking: true,
  totalQuestions: 50,
  description: 'Combined test covering current electricity, magnetic effects, EMI, chemical bonding, p-block elements, and coordination compounds',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'magnetic_effects_current', 'electromagnetic_induction_ac'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'p_block_elements', 'coordination_compounds'] }
  ]
  },
  {
  id: 'multi_modern_science',
  title: 'Modern Science Integration',
  type: 'multi',
  subject: 'Physics, Chemistry, Biology, GK',
  chapter: 'Modern Science Topics',
  timeLimitMinutes: 38,
  negativeMarking: true,
  totalQuestions: 45,
  description: 'Modern science test covering modern physics, wave optics, organic chemistry, biotechnology, genetics, and current scientific affairs',
  sections: [
  { subject: 'physics', topics: ['modern_physics', 'wave_optics'] },
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms'] },
  { subject: 'biology', topics: ['biotechnology_applications', 'genetics_molecular_biology'] },
  { subject: 'gk', topics: ['current_affairs'] }
  ]
  },
  {
  id: 'multi_clinical_sciences',
  title: 'Clinical Sciences Focus',
  type: 'multi',
  subject: 'Biology, Chemistry, GK',
  chapter: 'Clinical and Health Sciences',
  timeLimitMinutes: 52,
  negativeMarking: true,
  totalQuestions: 60,
  description: 'Clinical sciences test covering human physiology, cell structure, reproduction, ionic equilibrium, electrochemistry, coordination compounds, and health schemes',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'cell_structure_function', 'reproduction_humans_plants'] },
  { subject: 'chemistry', topics: ['chemical_ionic_equilibrium', 'electrochemistry', 'coordination_compounds'] },
  { subject: 'gk', topics: ['health_organizations_schemes'] }
  ]
  },
  {
  id: 'multi_ecology_chemistry_env',
  title: 'Ecology and Environmental Chemistry',
  type: 'multi',
  subject: 'Biology, Chemistry, GK',
  chapter: 'Ecology and Environmental Science',
  timeLimitMinutes: 38,
  negativeMarking: true,
  totalQuestions: 45,
  description: 'Environmental science test covering ecology, plant physiology, p-block elements, thermodynamics, electrochemistry, and environmental awards/current affairs',
  sections: [
  { subject: 'biology', topics: ['ecology_environment', 'plant_physiology'] },
  { subject: 'chemistry', topics: ['p_block_elements', 'thermodynamics_chem', 'electrochemistry'] },
  { subject: 'gk', topics: ['awards_important_days', 'current_affairs'] }
  ]
  },
  {
  id: 'multi_physics_biology_applied',
  title: 'Applied Physics and Biology',
  type: 'multi',
  subject: 'Physics, Biology',
  chapter: 'Biophysics and Applied Sciences',
  timeLimitMinutes: 46,
  negativeMarking: true,
  totalQuestions: 55,
  description: 'Biophysics test covering ray optics, EMI & AC, work energy power, human physiology, genetics, and biotechnology applications',
  sections: [
  { subject: 'physics', topics: ['ray_optics', 'electromagnetic_induction_ac', 'work_energy_power'] },
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'biotechnology_applications'] }
  ]
  },
  {
  id: 'multi_complete_organic_bio',
  title: 'Complete Organic Chemistry and Cell Biology',
  type: 'multi',
  subject: 'Chemistry, Biology',
  chapter: 'Organic Chemistry and Cell Biology',
  timeLimitMinutes: 42,
  negativeMarking: true,
  totalQuestions: 50,
  description: 'Integrated test covering all organic chemistry chapters (GOC, mechanisms, functional groups) plus cell structure and genetics',
  sections: [
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids'] },
  { subject: 'biology', topics: ['cell_structure_function', 'genetics_molecular_biology'] }
  ]
},


// Continue TEST_CONFIG array from Part 6
// ============================================================
// SECTION 7 — QUICK REVISION TESTS (12 tests, type: 'quick')
// 4 Existing + 8 New | 20 Qs each, 15 min each
// ============================================================
{
  id: 'quick_physics_essentials',
  title: 'Quick Revision: Physics Essentials',
  type: 'quick',
  subject: 'Physics',
  chapter: 'High-Yield Physics Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Rapid revision of high-yield physics topics: kinematics, ray optics, modern physics — ideal for last-minute review before AIIMS exam',
  sections: [
  { subject: 'physics', topics: ['kinematics', 'ray_optics', 'modern_physics'] }
  ]
  },
  {
  id: 'quick_chemistry_essentials',
  title: 'Quick Revision: Chemistry Essentials',
  type: 'quick',
  subject: 'Chemistry',
  chapter: 'High-Yield Chemistry Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Rapid revision of chemical bonding, organic mechanisms, and ionic equilibrium — key concepts for quick recall before exam',
  sections: [
  { subject: 'chemistry', topics: ['chemical_bonding', 'organic_reactions_mechanisms', 'chemical_ionic_equilibrium'] }
  ]
  },
  {
  id: 'quick_biology_essentials',
  title: 'Quick Revision: Biology Essentials',
  type: 'quick',
  subject: 'Biology',
  chapter: 'High-Yield Biology Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Rapid revision of human physiology, genetics, and cell division — nursing-relevant biology fundamentals for quick review',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'cell_division'] }
  ]
  },
  {
  id: 'quick_gk_essentials',
  title: 'Quick Revision: GK Essentials',
  type: 'quick',
  subject: 'General Knowledge',
  chapter: 'High-Yield GK Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Rapid revision of current affairs, health schemes, awards, and polity — essential GK for nursing entrance exam preparation',
  sections: [
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'quick_phy_electricity_magnetism',
  title: 'Quick: Electricity + Magnetism',
  type: 'quick',
  subject: 'Physics',
  chapter: 'Electricity and Magnetism Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Focused quick revision on current electricity, electrostatics, magnetic effects, and electromagnetic induction — essential physics for AIIMS',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'magnetic_effects_current', 'electromagnetic_induction_ac'] }
  ]
  },
  {
  id: 'quick_phy_optics_modern',
  title: 'Quick: Optics + Modern Physics',
  type: 'quick',
  subject: 'Physics',
  chapter: 'Optics and Modern Physics Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Focused quick revision on ray optics, wave optics, and modern physics including photoelectric effect and nuclear physics — high-yield topics',
  sections: [
  { subject: 'physics', topics: ['ray_optics', 'wave_optics', 'modern_physics'] }
  ]
  },
  {
  id: 'quick_chem_organic_all',
  title: 'Quick: All Organic Chemistry',
  type: 'quick',
  subject: 'Chemistry',
  chapter: 'Complete Organic Chemistry',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Comprehensive quick revision covering GOC, reaction mechanisms, and functional group chemistry — all organic chemistry in one test',
  sections: [
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids'] }
  ]
  },
  {
  id: 'quick_chem_inorganic_all',
  title: 'Quick: Inorganic Chemistry',
  type: 'quick',
  subject: 'Chemistry',
  chapter: 'Inorganic Chemistry Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Focused quick revision on chemical bonding, p-block elements, and coordination compounds — essential inorganic chemistry for AIIMS',
  sections: [
  { subject: 'chemistry', topics: ['chemical_bonding', 'p_block_elements', 'coordination_compounds'] }
  ]
  },
  {
  id: 'quick_chem_physical_all',
  title: 'Quick: Physical Chemistry',
  type: 'quick',
  subject: 'Chemistry',
  chapter: 'Physical Chemistry Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Comprehensive quick revision on ionic equilibrium, thermodynamics, and electrochemistry — all physical chemistry concepts in one test',
  sections: [
  { subject: 'chemistry', topics: ['chemical_ionic_equilibrium', 'thermodynamics_chem', 'electrochemistry'] }
  ]
  },
  {
  id: 'quick_bio_cell_genetics',
  title: 'Quick: Cell Biology + Genetics',
  type: 'quick',
  subject: 'Biology',
  chapter: 'Cell Biology and Genetics Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Focused quick revision on cell structure, cell division, and molecular genetics — fundamental biology for nursing entrance exam',
  sections: [
  { subject: 'biology', topics: ['cell_structure_function', 'cell_division', 'genetics_molecular_biology'] }
  ]
  },
  {
  id: 'quick_bio_physiology_repro',
  title: 'Quick: Physiology + Reproduction',
  type: 'quick',
  subject: 'Biology',
  chapter: 'Physiology and Reproduction Topics',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Comprehensive quick revision on human physiology and reproduction in humans and plants — high-yield biology for AIIMS nursing',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'reproduction_humans_plants'] }
  ]
  },
  {
  id: 'quick_bio_ecology_plants',
  title: 'Quick: Ecology, Plants & Biotech',
  type: 'quick',
  subject: 'Biology',
  chapter: 'Ecology, Plant Physiology and Biotechnology',
  timeLimitMinutes: 15,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Focused quick revision on ecology, plant physiology, and biotechnology applications — essential biology topics for nursing entrance',
  sections: [
  { subject: 'biology', topics: ['ecology_environment', 'plant_physiology', 'biotechnology_applications'] }
  ]
},

// Continue TEST_CONFIG array from Part 7
// ============================================================
// SECTION 8 — SPEED DRILL TESTS (9 NEW tests, type: 'drill')
// 15 Questions, 10 Minutes each — 40 seconds per question
// ============================================================
{
  id: 'drill_physics_fundamentals',
  title: 'Speed Drill: Physics Fundamentals',
  type: 'drill',
  subject: 'Physics',
  chapter: 'Kinematics, Work Energy, Current Electricity',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers kinematics, work energy power, and current electricity fundamentals.',
  sections: [
  { subject: 'physics', topics: ['kinematics', 'work_energy_power', 'current_electricity'] }
  ]
  },
  {
  id: 'drill_physics_advanced',
  title: 'Speed Drill: Physics Advanced',
  type: 'drill',
  subject: 'Physics',
  chapter: 'Electrostatics, EMI, Modern Physics',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers electrostatics, electromagnetic induction, and modern physics concepts.',
  sections: [
  { subject: 'physics', topics: ['electrostatics', 'electromagnetic_induction_ac', 'modern_physics'] }
  ]
  },
  {
  id: 'drill_chem_organic_speed',
  title: 'Speed Drill: Organic Chemistry',
  type: 'drill',
  subject: 'Chemistry',
  chapter: 'Organic Reactions and Functional Groups',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers organic reaction mechanisms and alcohols, aldehydes, ketones, acids.',
  sections: [
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids'] }
  ]
  },
  {
  id: 'drill_chem_bonding_speed',
  title: 'Speed Drill: Chemical Bonding',
  type: 'drill',
  subject: 'Chemistry',
  chapter: 'Bonding, Coordination, Equilibrium',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers chemical bonding, coordination compounds, and ionic equilibrium.',
  sections: [
  { subject: 'chemistry', topics: ['chemical_bonding', 'coordination_compounds', 'chemical_ionic_equilibrium'] }
  ]
  },
  {
  id: 'drill_bio_physiology_speed',
  title: 'Speed Drill: Human Physiology',
  type: 'drill',
  subject: 'Biology',
  chapter: 'Human Physiology — All Systems',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers comprehensive human physiology including cardiovascular, respiratory, and nervous systems.',
  sections: [
  { subject: 'biology', topics: ['human_physiology'] }
  ]
  },
  {
  id: 'drill_bio_genetics_speed',
  title: 'Speed Drill: Genetics and Cell Division',
  type: 'drill',
  subject: 'Biology',
  chapter: 'Genetics, Molecular Biology, Cell Division',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers genetics, molecular biology, and cell division mechanisms.',
  sections: [
  { subject: 'biology', topics: ['genetics_molecular_biology', 'cell_division'] }
  ]
  },
  {
  id: 'drill_bio_ecology_biotech',
  title: 'Speed Drill: Ecology and Biotechnology',
  type: 'drill',
  subject: 'Biology',
  chapter: 'Ecology, Environment, Biotechnology',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers ecology, environment, and biotechnology applications.',
  sections: [
  { subject: 'biology', topics: ['ecology_environment', 'biotechnology_applications'] }
  ]
  },
  {
  id: 'drill_gk_health_speed',
  title: 'Speed Drill: Health Schemes and Awards',
  type: 'drill',
  subject: 'General Knowledge',
  chapter: 'Health Organizations, Schemes, Awards',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers health organizations, government schemes, and important awards.',
  sections: [
  { subject: 'gk', topics: ['health_organizations_schemes', 'awards_important_days'] }
  ]
  },
  {
  id: 'drill_gk_polity_current',
  title: 'Speed Drill: Polity and Current Affairs',
  type: 'drill',
  subject: 'General Knowledge',
  chapter: 'Indian Polity and Current Affairs',
  timeLimitMinutes: 10,
  negativeMarking: true,
  totalQuestions: 15,
  description: 'Speed drill — 40 seconds per question. Build exam reflex. Covers Indian polity articles, amendments, and recent current affairs.',
  sections: [
  { subject: 'gk', topics: ['indian_polity_articles', 'current_affairs'] }
  ]
},

// Continue TEST_CONFIG array from Part 8
// ============================================================
// SECTION 9 — WEAKER CHAPTER BUILDER TESTS (12 NEW tests, type: 'multi')
// Targeted practice for chapters students typically find hardest
// ============================================================
{
  id: 'builder_phy_wave_modern',
  title: 'Builder: Wave Optics + Modern Physics',
  type: 'multi',
  subject: 'Physics',
  chapter: 'Wave Optics and Modern Physics',
  timeLimitMinutes: 20,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Targeted practice for two challenging Physics chapters: Wave Optics (interference, diffraction, polarisation) and Modern Physics (photoelectric effect, atoms, nuclei). Ideal for students needing extra focus on these high-yield topics.',
  sections: [
  { subject: 'physics', topics: ['wave_optics', 'modern_physics'] }
  ]
  },
  {
  id: 'builder_phy_em_induction',
  title: 'Builder: EM Induction + Magnetism',
  type: 'multi',
  subject: 'Physics',
  chapter: 'Electromagnetic Induction and Magnetic Effects',
  timeLimitMinutes: 20,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Targeted practice for electromagnetic induction, AC circuits, and magnetic effects of current. Focuses on conceptual understanding of Faraday\'s law, Lenz\'s law, and moving charges in magnetic fields.',
  sections: [
  { subject: 'physics', topics: ['electromagnetic_induction_ac', 'magnetic_effects_current'] }
  ]
  },
  {
  id: 'builder_chem_organic_mech',
  title: 'Builder: Organic Mechanisms Deep Dive',
  type: 'multi',
  subject: 'Chemistry',
  chapter: 'Organic Reactions and GOC',
  timeLimitMinutes: 22,
  negativeMarking: true,
  totalQuestions: 22,
  description: 'Intensive practice on General Organic Chemistry and Organic Reaction Mechanisms. Covers carbocation stability, reaction intermediates, SN1/SN2/E1/E2 mechanisms, and named reactions.',
  sections: [
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms', 'general_organic_chemistry'] }
  ]
  },
  {
  id: 'builder_chem_coord_equil',
  title: 'Builder: Coordination + Equilibrium',
  type: 'multi',
  subject: 'Chemistry',
  chapter: 'Coordination Compounds and Ionic Equilibrium',
  timeLimitMinutes: 22,
  negativeMarking: true,
  totalQuestions: 22,
  description: 'Targeted practice for Coordination Compounds (IUPAC, isomerism, CFT) and Chemical/Ionic Equilibrium (pH, buffers, solubility product). Two conceptually dense chapters combined for focused revision.',
  sections: [
  { subject: 'chemistry', topics: ['coordination_compounds', 'chemical_ionic_equilibrium'] }
  ]
  },
  {
  id: 'builder_chem_thermo_electro',
  title: 'Builder: Thermodynamics + Electrochemistry',
  type: 'multi',
  subject: 'Chemistry',
  chapter: 'Thermodynamics and Electrochemistry',
  timeLimitMinutes: 20,
  negativeMarking: true,
  totalQuestions: 20,
  description: 'Focused practice on Physical Chemistry fundamentals: Thermodynamics (laws, entropy, Gibbs energy) and Electrochemistry (Nernst equation, cells, conductivity, corrosion).',
  sections: [
  { subject: 'chemistry', topics: ['thermodynamics_chem', 'electrochemistry'] }
  ]
  },
  {
  id: 'builder_bio_genetics_deep',
  title: 'Builder: Genetics Deep Dive',
  type: 'multi',
  subject: 'Biology',
  chapter: 'Genetics and Cell Division',
  timeLimitMinutes: 28,
  negativeMarking: true,
  totalQuestions: 25,
  description: 'Comprehensive practice on Genetics and Molecular Biology plus Cell Division. Covers Mendelian inheritance, DNA replication, transcription, translation, mitosis, meiosis, and genetic disorders.',
  sections: [
  { subject: 'biology', topics: ['genetics_molecular_biology', 'cell_division'] }
  ]
  },
  {
  id: 'builder_bio_plant_physio',
  title: 'Builder: Plant Physiology + Ecology',
  type: 'multi',
  subject: 'Biology',
  chapter: 'Plant Physiology and Ecology',
  timeLimitMinutes: 24,
  negativeMarking: true,
  totalQuestions: 22,
  description: 'Targeted practice for Plant Physiology (photosynthesis, respiration, plant hormones) and Ecology (ecosystems, biodiversity, environmental issues). Often neglected but high-yield for AIIMS.',
  sections: [
  { subject: 'biology', topics: ['plant_physiology', 'ecology_environment'] }
  ]
  },
  {
  id: 'builder_bio_reproduction_biotech',
  title: 'Builder: Reproduction + Biotechnology',
  type: 'multi',
  subject: 'Biology',
  chapter: 'Reproduction and Biotechnology',
  timeLimitMinutes: 24,
  negativeMarking: true,
  totalQuestions: 22,
  description: 'Focused practice on Human and Plant Reproduction plus Biotechnology applications. Covers menstrual cycle, fertilisation, embryonic development, rDNA technology, and GMOs.',
  sections: [
  { subject: 'biology', topics: ['reproduction_humans_plants', 'biotechnology_applications'] }
  ]
  },
  {
  id: 'builder_bio_cell_physio',
  title: 'Builder: Cell Biology + Physiology',
  type: 'multi',
  subject: 'Biology',
  chapter: 'Cell Structure and Human Physiology',
  timeLimitMinutes: 22,
  negativeMarking: true,
  totalQuestions: 22,
  description: 'Foundational practice on Cell Structure and Function plus Human Physiology. Covers cell organelles, biomolecules, and all major human body systems (circulatory, respiratory, nervous, etc.).',
  sections: [
  { subject: 'biology', topics: ['cell_structure_function', 'human_physiology'] }
  ]
  },
  {
  id: 'builder_gk_health_schemes',
  title: 'Builder: Health Schemes Deep Dive',
  type: 'multi',
  subject: 'General Knowledge',
  chapter: 'Health Organizations and Awards',
  timeLimitMinutes: 20,
  negativeMarking: true,
  totalQuestions: 25,
  description: 'Intensive GK practice on Health Organizations (WHO, UNICEF, ICMR, INC) and Government Health Schemes (NHM, PM-JAY, Ayushman Bharat) plus important awards and days relevant to nursing.',
  sections: [
  { subject: 'gk', topics: ['health_organizations_schemes', 'awards_important_days'] }
  ]
  },
  {
  id: 'builder_gk_polity_deep',
  title: 'Builder: Polity + Current Affairs',
  type: 'multi',
  subject: 'General Knowledge',
  chapter: 'Indian Polity and Current Affairs',
  timeLimitMinutes: 16,
  negativeMarking: true,
  totalQuestions: 18,
  description: 'Focused GK practice on Indian Polity (Fundamental Rights, DPSP, Amendments, Articles) and recent Current Affairs. Essential for the GK section of AIIMS BSc Nursing.',
  sections: [
  { subject: 'gk', topics: ['indian_polity_articles', 'current_affairs'] }
  ]
  },
  {
  id: 'builder_pcb_weak_mix',
  title: 'Builder: Typically Hard Chapters Mix',
  type: 'multi',
  subject: 'Physics, Chemistry, Biology',
  chapter: 'Challenging Topics Across PCB',
  timeLimitMinutes: 28,
  negativeMarking: true,
  totalQuestions: 30,
  description: 'Mixed practice of commonly difficult chapters: Physics (Wave Optics, EM Induction), Chemistry (Thermodynamics, GOC), and Biology (Plant Physiology). Designed to strengthen weak areas across all three subjects.',
  sections: [
  { subject: 'physics', topics: ['wave_optics', 'electromagnetic_induction_ac'] },
  { subject: 'chemistry', topics: ['thermodynamics_chem', 'general_organic_chemistry'] },
  { subject: 'biology', topics: ['plant_physiology'] }
  ]
},

// Continue TEST_CONFIG array from Part 9
// ============================================================
// SECTION 10 — FULL AIIMS & MP PNST MOCK TESTS (12 tests, type: 'mock')
// 5 Existing + 7 New | 70 Qs, 90 min each (Mock 11: 80 min)
// AIIMS & MP PNST Pattern: Physics + Chemistry + Biology + GK
// ============================================================
{
  id: 'mock_aiims_1',
  title: 'AIIMS & MP PNST Mock Test 1 — Balanced All-Chapters',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Complete Syllabus',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'Full-length AIIMS & MP PNST pattern mock test with balanced coverage of all chapters across Physics, Chemistry, Biology, and General Knowledge',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'ray_optics', 'kinematics', 'work_energy_power', 'modern_physics', 'magnetic_effects_current'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'p_block_elements', 'organic_reactions_mechanisms', 'chemical_ionic_equilibrium', 'coordination_compounds', 'thermodynamics_chem', 'electrochemistry'] },
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'reproduction_humans_plants', 'ecology_environment', 'cell_structure_function', 'cell_division', 'biotechnology_applications', 'plant_physiology'] },
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'mock_aiims_2',
  title: 'AIIMS & MP PNST Mock Test 2 — Organic Chemistry and Genetics Focus',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Organic Chemistry and Genetics Emphasis',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'AIIMS & MP PNST mock with emphasis on organic chemistry mechanisms and molecular genetics — high-yield topics for nursing entrance',
  sections: [
  { subject: 'physics', topics: ['electromagnetic_induction_ac', 'wave_optics', 'modern_physics', 'kinematics', 'electrostatics'] },
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'chemical_ionic_equilibrium', 'electrochemistry'] },
  { subject: 'biology', topics: ['genetics_molecular_biology', 'cell_division', 'human_physiology', 'reproduction_humans_plants', 'ecology_environment', 'biotechnology_applications', 'plant_physiology'] },
  { subject: 'gk', topics: ['current_affairs', 'indian_polity_articles', 'health_organizations_schemes'] }
  ]
  },
  {
  id: 'mock_aiims_3',
  title: 'AIIMS & MP PNST Mock Test 3 — Plant Biology and Electrochemistry Focus',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Plant Physiology and Electrochemistry Emphasis',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'AIIMS & MP PNST mock emphasising plant physiology, electrochemistry, and related interdisciplinary concepts',
  sections: [
  { subject: 'physics', topics: ['ray_optics', 'wave_optics', 'work_energy_power', 'current_electricity', 'magnetic_effects_current'] },
  { subject: 'chemistry', topics: ['electrochemistry', 'thermodynamics_chem', 'coordination_compounds', 'chemical_bonding', 'p_block_elements'] },
  { subject: 'biology', topics: ['plant_physiology', 'cell_structure_function', 'human_physiology', 'genetics_molecular_biology', 'ecology_environment', 'reproduction_humans_plants', 'cell_division'] },
  { subject: 'gk', topics: ['awards_important_days', 'indian_polity_articles', 'health_organizations_schemes'] }
  ]
  },
  {
  id: 'mock_aiims_4',
  title: 'AIIMS & MP PNST Mock Test 4 — Maximum Difficulty Mix',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Challenging Topics Integration',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'High-difficulty AIIMS & MP PNST mock combining challenging topics from all subjects to test advanced problem-solving skills',
  sections: [
  { subject: 'physics', topics: ['electrostatics', 'electromagnetic_induction_ac', 'wave_optics', 'modern_physics', 'magnetic_effects_current'] },
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'thermodynamics_chem', 'electrochemistry'] },
  { subject: 'biology', topics: ['genetics_molecular_biology', 'biotechnology_applications', 'plant_physiology', 'human_physiology', 'cell_division', 'reproduction_humans_plants', 'ecology_environment'] },
  { subject: 'gk', topics: ['indian_polity_articles', 'current_affairs', 'awards_important_days', 'health_organizations_schemes'] }
  ]
  },
  {
  id: 'mock_aiims_5',
  title: 'AIIMS & MP PNST Mock Test 5 — Speed and Accuracy Drill',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Timed Practice for Speed and Accuracy',
  timeLimitMinutes: 85,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'Slightly reduced time limit to train speed and accuracy under pressure — essential for AIIMS & MP PNST exam strategy',
  sections: [
  { subject: 'physics', topics: ['kinematics', 'work_energy_power', 'current_electricity', 'ray_optics', 'electrostatics'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'chemical_ionic_equilibrium', 'coordination_compounds', 'p_block_elements', 'general_organic_chemistry'] },
  { subject: 'biology', topics: ['human_physiology', 'cell_structure_function', 'ecology_environment', 'biotechnology_applications', 'genetics_molecular_biology', 'plant_physiology', 'reproduction_humans_plants'] },
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'mock_aiims_6',
  title: 'AIIMS & MP PNST Mock Test 6 — Kinematics + Organic + Cell Biology + Health Polity',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Kinematics, Organic Chemistry, Cell Biology Focus',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'AIIMS & MP PNST mock focusing on kinematics, organic chemistry mechanisms, cell biology, and health-related polity topics',
  sections: [
  { subject: 'physics', topics: ['kinematics', 'work_energy_power', 'current_electricity', 'ray_optics', 'electrostatics'] },
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'general_organic_chemistry', 'chemical_bonding', 'p_block_elements'] },
  { subject: 'biology', topics: ['cell_structure_function', 'cell_division', 'human_physiology', 'genetics_molecular_biology', 'reproduction_humans_plants', 'ecology_environment', 'biotechnology_applications', 'plant_physiology'] },
  { subject: 'gk', topics: ['indian_polity_articles', 'health_organizations_schemes', 'current_affairs', 'awards_important_days'] }
  ]
  },
  {
  id: 'mock_aiims_7',
  title: 'AIIMS & MP PNST Mock Test 7 — Optics + Coordination + Plant Bio + GK Awards',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Optics, Coordination Chemistry, Plant Biology Focus',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'AIIMS & MP PNST mock emphasising optics, coordination compounds, plant biology, and GK awards/important days',
  sections: [
  { subject: 'physics', topics: ['ray_optics', 'wave_optics', 'magnetic_effects_current', 'modern_physics', 'kinematics'] },
  { subject: 'chemistry', topics: ['coordination_compounds', 'chemical_ionic_equilibrium', 'chemical_bonding', 'electrochemistry', 'general_organic_chemistry'] },
  { subject: 'biology', topics: ['plant_physiology', 'human_physiology', 'genetics_molecular_biology', 'biotechnology_applications', 'ecology_environment', 'cell_structure_function', 'reproduction_humans_plants'] },
  { subject: 'gk', topics: ['awards_important_days', 'health_organizations_schemes', 'current_affairs'] }
  ]
  },
  {
  id: 'mock_aiims_8',
  title: 'AIIMS & MP PNST Mock Test 8 — Electricity + Inorganic + Reproduction + Current Affairs',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Electricity, Inorganic Chemistry, Reproduction Focus',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'AIIMS & MP PNST mock focusing on electricity chapters, inorganic chemistry, human reproduction, and current affairs',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'magnetic_effects_current', 'electromagnetic_induction_ac', 'work_energy_power'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'p_block_elements', 'coordination_compounds', 'thermodynamics_chem', 'chemical_ionic_equilibrium'] },
  { subject: 'biology', topics: ['reproduction_humans_plants', 'human_physiology', 'genetics_molecular_biology', 'cell_division', 'ecology_environment', 'biotechnology_applications', 'plant_physiology'] },
  { subject: 'gk', topics: ['current_affairs', 'indian_polity_articles', 'health_organizations_schemes', 'awards_important_days'] }
  ]
  },
  {
  id: 'mock_aiims_9',
  title: 'AIIMS & MP PNST Mock Test 9 — Progressive Difficulty (Easy to Hard)',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Progressive Difficulty Structure',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'AIIMS & MP PNST mock structured with progressive difficulty from easy to hard questions to build confidence and stamina',
  sections: [
  { subject: 'physics', topics: ['kinematics', 'ray_optics', 'work_energy_power', 'electrostatics', 'modern_physics'] },
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'chemical_bonding', 'organic_reactions_mechanisms', 'chemical_ionic_equilibrium', 'thermodynamics_chem'] },
  { subject: 'biology', topics: ['cell_structure_function', 'cell_division', 'human_physiology', 'ecology_environment', 'reproduction_humans_plants', 'genetics_molecular_biology', 'plant_physiology'] },
  { subject: 'gk', topics: ['current_affairs', 'awards_important_days', 'health_organizations_schemes', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'mock_aiims_10',
  title: 'AIIMS & MP PNST Mock Test 10 — Complete All-Chapter Coverage',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Every Single Chapter Covered',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'The only mock that covers every single chapter across all four subjects — comprehensive syllabus coverage for final preparation',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'magnetic_effects_current', 'electromagnetic_induction_ac', 'ray_optics', 'wave_optics', 'modern_physics', 'kinematics', 'work_energy_power'] },
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'chemical_bonding', 'p_block_elements', 'coordination_compounds', 'chemical_ionic_equilibrium', 'thermodynamics_chem', 'electrochemistry'] },
  { subject: 'biology', topics: ['human_physiology', 'cell_structure_function', 'cell_division', 'genetics_molecular_biology', 'reproduction_humans_plants', 'biotechnology_applications', 'ecology_environment', 'plant_physiology'] },
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'mock_aiims_11',
  title: 'AIIMS & MP PNST Mock Test 11 — Timed Pressure Mock (80 min)',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Reduced Time for Speed Training',
  timeLimitMinutes: 80,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'Reduced to 80 min to build speed under pressure — same chapter mix as Mock 1 but with tighter time constraint for exam readiness',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'ray_optics', 'kinematics', 'work_energy_power', 'modern_physics', 'magnetic_effects_current'] },
  { subject: 'chemistry', topics: ['chemical_bonding', 'p_block_elements', 'organic_reactions_mechanisms', 'chemical_ionic_equilibrium', 'coordination_compounds', 'thermodynamics_chem', 'electrochemistry'] },
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'reproduction_humans_plants', 'ecology_environment', 'cell_structure_function', 'cell_division', 'biotechnology_applications', 'plant_physiology'] },
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  {
  id: 'mock_aiims_12',
  title: 'AIIMS & MP PNST Mock Test 12 — Final Revision Sweep',
  type: 'mock',
  subject: 'All Subjects',
  chapter: 'Final Full-Length Practice Before Exam',
  timeLimitMinutes: 90,
  negativeMarking: true,
  totalQuestions: 70,
  description: 'Your final full-length practice before the exam. High-yield chapters, full AIIMS & MP PNST pattern, 70 questions in 90 minutes',
  sections: [
  { subject: 'physics', topics: ['modern_physics', 'electromagnetic_induction_ac', 'ray_optics', 'kinematics', 'electrostatics'] },
  { subject: 'chemistry', topics: ['organic_reactions_mechanisms', 'coordination_compounds', 'chemical_ionic_equilibrium', 'electrochemistry', 'chemical_bonding'] },
  { subject: 'biology', topics: ['human_physiology', 'genetics_molecular_biology', 'plant_physiology', 'ecology_environment', 'cell_structure_function', 'reproduction_humans_plants', 'biotechnology_applications'] },
  { subject: 'gk', topics: ['health_organizations_schemes', 'awards_important_days', 'indian_polity_articles', 'current_affairs'] }
  ]
  },

  // ============================================================
// SECTION 4 — SUBJECT-WISE TESTS (4 tests, type: 'subject')
// Essential for Subject Filtering in the Dashboard
// ============================================================
{
  id: 'subject_physics',
  title: 'Physics — Full Subject Test',
  type: 'subject',
  subject: 'Physics',
  chapter: 'All Physics Chapters',
  timeLimitMinutes: 75,
  negativeMarking: true,
  totalQuestions: 90,
  description: 'Comprehensive test covering all 9 Physics chapters: Current Electricity, Electrostatics, Magnetic Effects, EMI & AC, Optics, Modern Physics, Kinematics, Work Energy Power',
  sections: [
  { subject: 'physics', topics: ['current_electricity', 'electrostatics', 'magnetic_effects_current', 'electromagnetic_induction_ac', 'ray_optics', 'wave_optics', 'modern_physics', 'kinematics', 'work_energy_power'] }
  ]
  },
  {
  id: 'subject_chemistry',
  title: 'Chemistry — Full Subject Test',
  type: 'subject',
  subject: 'Chemistry',
  chapter: 'All Chemistry Chapters',
  timeLimitMinutes: 75,
  negativeMarking: true,
  totalQuestions: 90,
  description: 'Comprehensive test covering all 9 Chemistry chapters: GOC, Organic Reactions, Alcohols/Aldehydes/Ketones/Acids, Bonding, p-Block, Coordination, Equilibrium, Thermodynamics, Electrochemistry',
  sections: [
  { subject: 'chemistry', topics: ['general_organic_chemistry', 'organic_reactions_mechanisms', 'alcohols_aldehydes_ketones_acids', 'chemical_bonding', 'p_block_elements', 'coordination_compounds', 'chemical_ionic_equilibrium', 'thermodynamics_chem', 'electrochemistry'] }
  ]
  },
  {
  id: 'subject_biology',
  title: 'Biology — Full Subject Test',
  type: 'subject',
  subject: 'Biology',
  chapter: 'All Biology Chapters',
  timeLimitMinutes: 65,
  negativeMarking: true,
  totalQuestions: 80,
  description: 'Comprehensive test covering all 8 Biology chapters: Human Physiology, Cell Structure, Cell Division, Genetics, Reproduction, Biotechnology, Ecology, Plant Physiology',
  sections: [
  { subject: 'biology', topics: ['human_physiology', 'cell_structure_function', 'cell_division', 'genetics_molecular_biology', 'reproduction_humans_plants', 'biotechnology_applications', 'ecology_environment', 'plant_physiology'] }
  ]
  },
  {
  id: 'subject_gk',
  title: 'General Knowledge — Full Subject Test',
  type: 'subject',
  subject: 'General Knowledge',
  chapter: 'All GK Chapters',
  timeLimitMinutes: 35,
  negativeMarking: true,
  totalQuestions: 40,
  description: 'Comprehensive test covering all 4 GK chapters: Current Affairs, Health Organizations, Awards & Days, Indian Polity',
  sections: [
  { subject: 'gk', topics: ['current_affairs', 'health_organizations_schemes', 'awards_important_days', 'indian_polity_articles'] }
  ]
  },
  ];
  
  // Expose globally and support Node.js module export
  if (typeof window !== 'undefined') {
    window.TEST_CONFIG = TEST_CONFIG;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEST_CONFIG;
  }
  // ============================================================
  // VERIFICATION — COMPLETE TEST SUITE SUMMARY
  // ============================================================
  // Section 1 — Topic Tests Round 1:     30 tests
  // Section 2 — Topic Tests Round 2:     30 tests
  // Section 3 — Topic Tests Round 3:     10 tests
  // Section 4 — Subject-Wide Tests:       4 tests
  // Section 5 — Subject Pair Tests:       6 tests
  // Section 6 — Multi-Subject Tests:     15 tests
  // Section 7 — Quick Revision Tests:    12 tests
  // Section 8 — Speed Drill Tests:        9 tests
  // Section 9 — Chapter Builder Tests:   12 tests
  // Section 10 — AIIMS Mock Tests:       12 tests
  // ─────────────────────────────────────────────
  // TOTAL:                              140 tests
  // ============================================================
  // QUESTION BANK SUMMARY:
  // Physics:    202 questions across 9 chapters
  // Chemistry:  202 questions across 9 chapters
  // Biology:    210 questions across 8 chapters
  // GK:         100 questions across 4 chapters
  // ─────────────────────────────────────────────
  // GRAND TOTAL: 714 questions across 30 chapters
  // ============================================================
  // NursePrep Pro v3.0 — Production Ready
  // AIIMS BSc Nursing Entrance Exam Preparation
  // Generated: Complete Test Configuration Suite
  // ============================================================
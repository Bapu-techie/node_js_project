/* ============================================================
   TEST CONFIG — Test Definitions for AIIMS Nursing Entrance
   NursePrep Pro v3.0

   Total: 40 test configurations organized as:
   ─────────────────────────────────────────────
   ✅  25 Topic-wise tests  (1 per chapter, 10 Qs each)
   ✅   4 Subject-wise tests (all chapters per subject)
   ✅   3 Multi-subject tests (cross-subject combos)
   ✅   4 Quick revision tests (mixed difficulty, shorter)
   ✅   4 Full Mock tests (AIIMS pattern: 70 Qs, 90 min)
   ─────────────────────────────────────────────
   Total: 40 tests

   AIIMS BSc Nursing Entrance Pattern:
   - Physics:   15 Qs (7 chapters × 10 = 70 available)
   - Chemistry: 15 Qs (7 chapters × 10 = 70 available)
   - Biology:   30 Qs (7 chapters × 10 = 70 available)
   - GK:        10 Qs (4 chapters × 10 = 40 available)
   - Total:     70 Qs in 90 minutes
   - Marking:   +1 correct, −1/3 wrong, 0 unanswered

   Each config object:
   {
     id:                Unique string identifier
     title:             Display title
     type:              'topic' | 'chapter' | 'subject' | 'multi' | 'mock' | 'quick'
     subject:           Primary subject display name
     chapter:           Chapter/topic group label
     timeLimitMinutes:  Duration in minutes
     negativeMarking:   boolean
     totalQuestions:     Expected question count (for display)
     description:       Short description shown on dashboard
     sections:          Array of { subject, topics[] } — question sources
   }

   QuestionResolver uses `sections` to pull from QUESTION_BANK:
     QUESTION_BANK[section.subject][topic] → question array
   ============================================================ */

'use strict';

window.TEST_CONFIG = [

  /* ╔═══════════════════════════════════════════════════════════╗
     ║  SECTION 1: TOPIC-WISE TESTS (25 tests)                  ║
     ║  One test per chapter. 10 questions each.                 ║
     ║  Perfect for focused daily practice.                      ║
     ╚═══════════════════════════════════════════════════════════╝ */

  /* ──────────── PHYSICS — 7 Topic Tests ──────────── */

  {
    id:               'topic_phy_current_electricity',
    title:            'Current Electricity',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Current Electricity',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Ohm\'s law, Kirchhoff\'s rules, resistors in series & parallel, Wheatstone bridge, potentiometer',
    sections: [
      { subject: 'physics', topics: ['current_electricity'] }
    ]
  },

  {
    id:               'topic_phy_optics',
    title:            'Optics',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Optics',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Reflection, refraction, total internal reflection, lenses, Young\'s double slit, polarization',
    sections: [
      { subject: 'physics', topics: ['optics'] }
    ]
  },

  {
    id:               'topic_phy_electrostatics',
    title:            'Electrostatics',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Electrostatics',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Coulomb\'s law, electric field, Gauss\'s law, capacitors, electric potential & dipoles',
    sections: [
      { subject: 'physics', topics: ['electrostatics'] }
    ]
  },

  {
    id:               'topic_phy_kinematics',
    title:            'Kinematics',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Kinematics',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Equations of motion, projectile motion, relative velocity, free fall, displacement-time graphs',
    sections: [
      { subject: 'physics', topics: ['kinematics'] }
    ]
  },

  {
    id:               'topic_phy_work_energy_power',
    title:            'Work, Energy & Power',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Work, Energy & Power',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Work-energy theorem, kinetic & potential energy, conservation laws, collisions, power',
    sections: [
      { subject: 'physics', topics: ['work_energy_power'] }
    ]
  },

  {
    id:               'topic_phy_modern_physics',
    title:            'Modern Physics',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Modern Physics',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Photoelectric effect, Bohr model, de Broglie wavelength, radioactivity, nuclear physics',
    sections: [
      { subject: 'physics', topics: ['modern_physics'] }
    ]
  },

  {
    id:               'topic_phy_oscillations_waves',
    title:            'Oscillations & Waves',
    type:             'topic',
    subject:          'Physics',
    chapter:          'Oscillations & Waves',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'SHM, pendulum, speed of sound, Doppler effect, standing waves, beats, resonance',
    sections: [
      { subject: 'physics', topics: ['oscillations_waves'] }
    ]
  },

  /* ──────────── CHEMISTRY — 7 Topic Tests ──────────── */

  {
    id:               'topic_chem_chemical_bonding',
    title:            'Chemical Bonding',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'Chemical Bonding',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Ionic, covalent & coordinate bonds, VSEPR, hybridization, hydrogen bonding, MOT',
    sections: [
      { subject: 'chemistry', topics: ['chemical_bonding'] }
    ]
  },

  {
    id:               'topic_chem_periodic_table',
    title:            'Periodic Table & Periodicity',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'Periodic Table',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Periodic trends, electronegativity, ionization energy, atomic radius, electron affinity',
    sections: [
      { subject: 'chemistry', topics: ['periodic_table'] }
    ]
  },

  {
    id:               'topic_chem_p_block',
    title:            'p-Block Elements',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'p-Block Elements',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Carbon allotropes, halogens, noble gases, nitrogen, phosphorus, sulphuric acid, ozone',
    sections: [
      { subject: 'chemistry', topics: ['p_block_elements'] }
    ]
  },

  {
    id:               'topic_chem_organic',
    title:            'Organic Chemistry',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'Organic Chemistry',
    timeLimitMinutes: 15,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'IUPAC naming, named reactions (Wurtz, Aldol, Cannizzaro, Friedel-Crafts), SN1/SN2 mechanisms',
    sections: [
      { subject: 'chemistry', topics: ['organic_chemistry'] }
    ]
  },

  {
    id:               'topic_chem_equilibrium',
    title:            'Ionic Equilibrium',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'Ionic Equilibrium',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'pH, buffers, Le Chatelier\'s principle, solubility product, Henderson-Hasselbalch equation',
    sections: [
      { subject: 'chemistry', topics: ['equilibrium_ionic'] }
    ]
  },

  {
    id:               'topic_chem_coordination',
    title:            'Coordination Compounds',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'Coordination Compounds',
    timeLimitMinutes: 15,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Werner\'s theory, EDTA, cisplatin, Crystal Field Theory, spectrochemical series, ligands',
    sections: [
      { subject: 'chemistry', topics: ['coordination_compounds'] }
    ]
  },

  {
    id:               'topic_chem_biomolecules',
    title:            'Biomolecules & Polymers',
    type:             'topic',
    subject:          'Chemistry',
    chapter:          'Biomolecules & Polymers',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Proteins, DNA, carbohydrates, vitamins, enzymes, rubber, nylon, Bakelite, detergents',
    sections: [
      { subject: 'chemistry', topics: ['biomolecules_polymers'] }
    ]
  },

  /* ──────────── BIOLOGY — 7 Topic Tests ──────────── */

  {
    id:               'topic_bio_human_physiology',
    title:            'Human Physiology',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Human Physiology',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Heart, kidneys (nephron), lungs (alveoli), digestion, nervous system, hormones, blood glucose',
    sections: [
      { subject: 'biology', topics: ['human_physiology'] }
    ]
  },

  {
    id:               'topic_bio_genetics',
    title:            'Genetics & Molecular Biology',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Genetics & Molecular Biology',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Central dogma, Mendel\'s laws, DNA replication, PCR, codons, genetic disorders, Human Genome',
    sections: [
      { subject: 'biology', topics: ['genetics_molecular'] }
    ]
  },

  {
    id:               'topic_bio_reproduction',
    title:            'Reproduction',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Reproduction',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Fertilization, double fertilization, menstrual cycle, placenta, IVF, contraception, pregnancy',
    sections: [
      { subject: 'biology', topics: ['reproduction'] }
    ]
  },

  {
    id:               'topic_bio_ecology',
    title:            'Ecology & Environment',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Ecology & Environment',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Ozone, food chains, greenhouse effect, eutrophication, biodiversity hotspots, biomagnification',
    sections: [
      { subject: 'biology', topics: ['ecology_environment'] }
    ]
  },

  {
    id:               'topic_bio_cell_biology',
    title:            'Cell Biology & Cell Division',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Cell Biology',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Mitochondria, mitosis, meiosis, ribosomes, lysosomes, cell cycle, prokaryotes vs eukaryotes',
    sections: [
      { subject: 'biology', topics: ['cell_biology'] }
    ]
  },

  {
    id:               'topic_bio_biotechnology',
    title:            'Biotechnology',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Biotechnology',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'DNA ligase, Bt cotton, gene therapy, CRISPR, gel electrophoresis, Golden Rice, Dolly, vectors',
    sections: [
      { subject: 'biology', topics: ['biotechnology'] }
    ]
  },

  {
    id:               'topic_bio_human_welfare',
    title:            'Biology & Human Welfare',
    type:             'topic',
    subject:          'Biology',
    chapter:          'Biology & Human Welfare',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Malaria, penicillin, BCG, HIV/AIDS, antibiotics, dengue, biofortification, vitamin deficiencies',
    sections: [
      { subject: 'biology', topics: ['biology_human_welfare'] }
    ]
  },

  /* ──────────── GK — 4 Topic Tests ──────────── */

  {
    id:               'topic_gk_current_affairs',
    title:            'Current Affairs',
    type:             'topic',
    subject:          'General Knowledge',
    chapter:          'Current Affairs',
    timeLimitMinutes: 10,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'G20, Chandrayaan-3, Aditya-L1, UPI, Ram Mandir, Micron, Women\'s Reservation Bill',
    sections: [
      { subject: 'gk', topics: ['current_affairs'] }
    ]
  },

  {
    id:               'topic_gk_polity',
    title:            'Indian Polity & Constitution',
    type:             'topic',
    subject:          'General Knowledge',
    chapter:          'Indian Polity',
    timeLimitMinutes: 10,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Preamble, Fundamental Rights, Art. 21, Art. 370, RTE, amendments, Anti-Defection Law',
    sections: [
      { subject: 'gk', topics: ['indian_polity'] }
    ]
  },

  {
    id:               'topic_gk_health_orgs',
    title:            'Health Organizations & Schemes',
    type:             'topic',
    subject:          'General Knowledge',
    chapter:          'Health Organizations',
    timeLimitMinutes: 10,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'WHO, UNICEF, Red Cross, ICMR, PM-JAY, ASHA workers, Swachh Bharat, POSHAN Abhiyaan',
    sections: [
      { subject: 'gk', topics: ['health_organizations'] }
    ]
  },

  {
    id:               'topic_gk_awards_dates',
    title:            'Awards & Important Dates',
    type:             'topic',
    subject:          'General Knowledge',
    chapter:          'Awards & Important Dates',
    timeLimitMinutes: 10,
    negativeMarking:  true,
    totalQuestions:    10,
    description:      'Nobel Prize, Bharat Ratna, Padma Awards, Nurses Day, World Health Day, World AIDS Day',
    sections: [
      { subject: 'gk', topics: ['awards_important_dates'] }
    ]
  },


  /* ╔═══════════════════════════════════════════════════════════╗
     ║  SECTION 2: SUBJECT-WISE TESTS (4 tests)                 ║
     ║  All chapters of one subject combined.                    ║
     ║  Great for comprehensive subject revision.                ║
     ╚═══════════════════════════════════════════════════════════╝ */

  {
    id:               'subject_physics',
    title:            'Complete Physics',
    type:             'subject',
    subject:          'Physics',
    chapter:          'All 7 Chapters',
    timeLimitMinutes: 60,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'All 70 Physics questions: Kinematics, Work-Energy, Electrostatics, Current Electricity, Optics, Modern Physics, Waves',
    sections: [
      {
        subject: 'physics',
        topics: [
          'current_electricity',
          'optics',
          'electrostatics',
          'kinematics',
          'work_energy_power',
          'modern_physics',
          'oscillations_waves'
        ]
      }
    ]
  },

  {
    id:               'subject_chemistry',
    title:            'Complete Chemistry',
    type:             'subject',
    subject:          'Chemistry',
    chapter:          'All 7 Chapters',
    timeLimitMinutes: 60,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'All 70 Chemistry questions: Bonding, Periodic Table, p-Block, Organic, Equilibrium, Coordination, Biomolecules',
    sections: [
      {
        subject: 'chemistry',
        topics: [
          'chemical_bonding',
          'periodic_table',
          'p_block_elements',
          'organic_chemistry',
          'equilibrium_ionic',
          'coordination_compounds',
          'biomolecules_polymers'
        ]
      }
    ]
  },

  {
    id:               'subject_biology',
    title:            'Complete Biology',
    type:             'subject',
    subject:          'Biology',
    chapter:          'All 7 Chapters',
    timeLimitMinutes: 60,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'All 70 Biology questions: Physiology, Genetics, Reproduction, Ecology, Cell Bio, Biotech, Human Welfare',
    sections: [
      {
        subject: 'biology',
        topics: [
          'human_physiology',
          'genetics_molecular',
          'reproduction',
          'ecology_environment',
          'cell_biology',
          'biotechnology',
          'biology_human_welfare'
        ]
      }
    ]
  },

  {
    id:               'subject_gk',
    title:            'Complete General Knowledge',
    type:             'subject',
    subject:          'General Knowledge',
    chapter:          'All 4 Chapters',
    timeLimitMinutes: 35,
    negativeMarking:  true,
    totalQuestions:    40,
    description:      'All 40 GK questions: Current Affairs, Indian Polity, Health Organizations, Awards & Dates',
    sections: [
      {
        subject: 'gk',
        topics: [
          'current_affairs',
          'indian_polity',
          'health_organizations',
          'awards_important_dates'
        ]
      }
    ]
  },


  /* ╔═══════════════════════════════════════════════════════════╗
     ║  SECTION 3: MULTI-SUBJECT COMBINED TESTS (3 tests)       ║
     ║  Cross-subject practice for integrated revision.          ║
     ╚═══════════════════════════════════════════════════════════╝ */

  {
    id:               'multi_pcb_core',
    title:            'Physics + Chemistry + Biology Core',
    type:             'multi',
    subject:          'Mixed — PCB',
    chapter:          'Core Topics from Each Subject',
    timeLimitMinutes: 45,
    negativeMarking:  true,
    totalQuestions:    50,
    description:      'Key chapters from all three science subjects: Electrostatics, Organic Chemistry, Human Physiology, Genetics & more',
    sections: [
      {
        subject: 'physics',
        topics: ['electrostatics', 'optics', 'modern_physics']
      },
      {
        subject: 'chemistry',
        topics: ['organic_chemistry', 'chemical_bonding', 'coordination_compounds']
      },
      {
        subject: 'biology',
        topics: ['human_physiology', 'genetics_molecular', 'cell_biology']
      }
    ]
  },

  {
    id:               'multi_bio_chem_health',
    title:            'Biology + Chemistry for Nursing',
    type:             'multi',
    subject:          'Mixed — Bio + Chem',
    chapter:          'Nursing-Relevant Topics',
    timeLimitMinutes: 40,
    negativeMarking:  true,
    totalQuestions:    50,
    description:      'Nursing-focused: Human Physiology, Biomolecules, Reproduction, Human Welfare, Biotechnology',
    sections: [
      {
        subject: 'biology',
        topics: ['human_physiology', 'reproduction', 'biology_human_welfare', 'biotechnology']
      },
      {
        subject: 'chemistry',
        topics: ['biomolecules_polymers']
      }
    ]
  },

  {
    id:               'multi_gk_bio_welfare',
    title:            'GK + Biology & Human Welfare',
    type:             'multi',
    subject:          'Mixed — GK + Bio',
    chapter:          'Health & Society Focus',
    timeLimitMinutes: 35,
    negativeMarking:  true,
    totalQuestions:    40,
    description:      'Health schemes, organizations, diseases, awards — perfect for the GK+Bio overlap in AIIMS',
    sections: [
      {
        subject: 'gk',
        topics: ['health_organizations', 'awards_important_dates', 'current_affairs']
      },
      {
        subject: 'biology',
        topics: ['biology_human_welfare']
      }
    ]
  },


  /* ╔═══════════════════════════════════════════════════════════╗
     ║  SECTION 4: QUICK REVISION TESTS (4 tests)               ║
     ║  20 questions in 15 min — rapid fire practice.            ║
     ║  Pulls from selected high-yield chapters.                 ║
     ╚═══════════════════════════════════════════════════════════╝ */

  {
    id:               'quick_physics_essentials',
    title:            'Quick Physics Revision',
    type:             'quick',
    subject:          'Physics',
    chapter:          'High-Yield Physics',
    timeLimitMinutes: 15,
    negativeMarking:  true,
    totalQuestions:    20,
    description:      'Rapid revision — 20 must-know Physics questions from Kinematics, Optics, and Modern Physics',
    sections: [
      {
        subject: 'physics',
        topics: ['kinematics', 'optics', 'modern_physics']
      }
    ]
  },

  {
    id:               'quick_chemistry_essentials',
    title:            'Quick Chemistry Revision',
    type:             'quick',
    subject:          'Chemistry',
    chapter:          'High-Yield Chemistry',
    timeLimitMinutes: 15,
    negativeMarking:  true,
    totalQuestions:    20,
    description:      'Rapid revision — 20 must-know Chemistry questions from Organic, Bonding, and Biomolecules',
    sections: [
      {
        subject: 'chemistry',
        topics: ['organic_chemistry', 'chemical_bonding', 'biomolecules_polymers']
      }
    ]
  },

  {
    id:               'quick_biology_essentials',
    title:            'Quick Biology Revision',
    type:             'quick',
    subject:          'Biology',
    chapter:          'High-Yield Biology',
    timeLimitMinutes: 15,
    negativeMarking:  true,
    totalQuestions:    20,
    description:      'Rapid revision — 20 must-know Biology questions from Physiology, Genetics, and Human Welfare',
    sections: [
      {
        subject: 'biology',
        topics: ['human_physiology', 'genetics_molecular', 'biology_human_welfare']
      }
    ]
  },

  {
    id:               'quick_gk_essentials',
    title:            'Quick GK Revision',
    type:             'quick',
    subject:          'General Knowledge',
    chapter:          'High-Yield GK',
    timeLimitMinutes: 12,
    negativeMarking:  true,
    totalQuestions:    20,
    description:      'Rapid revision — 20 must-know GK questions covering all 4 chapters',
    sections: [
      {
        subject: 'gk',
        topics: ['current_affairs', 'indian_polity', 'health_organizations', 'awards_important_dates']
      }
    ]
  },


  /* ╔═══════════════════════════════════════════════════════════╗
     ║  SECTION 5: FULL MOCK TESTS (4 tests)                    ║
     ║  AIIMS BSc Nursing pattern: 70 Qs, 90 min                ║
     ║  Physics: 15 | Chemistry: 15 | Biology: 30 | GK: 10      ║
     ║  −1/3 negative marking                                    ║
     ╚═══════════════════════════════════════════════════════════╝ */

  {
    id:               'mock_aiims_1',
    title:            'AIIMS Mock Test — Series 1',
    type:             'mock',
    subject:          'All Subjects',
    chapter:          'Full AIIMS Pattern',
    timeLimitMinutes: 90,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'Full-length AIIMS simulation (70 Qs, 90 min). Physics 15 + Chemistry 15 + Biology 30 + GK 10. Negative marking enabled.',
    sections: [
      {
        subject: 'physics',
        topics: [
          'current_electricity',
          'optics',
          'electrostatics',
          'kinematics',
          'work_energy_power',
          'modern_physics',
          'oscillations_waves'
        ]
      },
      {
        subject: 'chemistry',
        topics: [
          'chemical_bonding',
          'periodic_table',
          'p_block_elements',
          'organic_chemistry',
          'equilibrium_ionic',
          'coordination_compounds',
          'biomolecules_polymers'
        ]
      },
      {
        subject: 'biology',
        topics: [
          'human_physiology',
          'genetics_molecular',
          'reproduction',
          'ecology_environment',
          'cell_biology',
          'biotechnology',
          'biology_human_welfare'
        ]
      },
      {
        subject: 'gk',
        topics: [
          'current_affairs',
          'indian_polity',
          'health_organizations',
          'awards_important_dates'
        ]
      }
    ]
  },

  {
    id:               'mock_aiims_2',
    title:            'AIIMS Mock Test — Series 2',
    type:             'mock',
    subject:          'All Subjects',
    chapter:          'Full AIIMS Pattern',
    timeLimitMinutes: 90,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'Full-length AIIMS simulation (70 Qs, 90 min). Emphasis on Optics, Organic Chemistry, Genetics, and Current Affairs.',
    sections: [
      {
        subject: 'physics',
        topics: [
          'optics',
          'electrostatics',
          'kinematics',
          'modern_physics',
          'oscillations_waves'
        ]
      },
      {
        subject: 'chemistry',
        topics: [
          'organic_chemistry',
          'periodic_table',
          'p_block_elements',
          'equilibrium_ionic',
          'biomolecules_polymers'
        ]
      },
      {
        subject: 'biology',
        topics: [
          'genetics_molecular',
          'human_physiology',
          'reproduction',
          'ecology_environment',
          'cell_biology',
          'biotechnology',
          'biology_human_welfare'
        ]
      },
      {
        subject: 'gk',
        topics: [
          'current_affairs',
          'indian_polity',
          'health_organizations'
        ]
      }
    ]
  },

  {
    id:               'mock_aiims_3',
    title:            'AIIMS Mock Test — Series 3',
    type:             'mock',
    subject:          'All Subjects',
    chapter:          'Full AIIMS Pattern',
    timeLimitMinutes: 90,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'Full-length AIIMS simulation (70 Qs, 90 min). Emphasis on Work-Energy, Coordination Compounds, Cell Biology, and Polity.',
    sections: [
      {
        subject: 'physics',
        topics: [
          'work_energy_power',
          'current_electricity',
          'optics',
          'kinematics',
          'modern_physics'
        ]
      },
      {
        subject: 'chemistry',
        topics: [
          'coordination_compounds',
          'chemical_bonding',
          'organic_chemistry',
          'periodic_table',
          'biomolecules_polymers'
        ]
      },
      {
        subject: 'biology',
        topics: [
          'cell_biology',
          'human_physiology',
          'genetics_molecular',
          'reproduction',
          'ecology_environment',
          'biotechnology',
          'biology_human_welfare'
        ]
      },
      {
        subject: 'gk',
        topics: [
          'indian_polity',
          'awards_important_dates',
          'health_organizations'
        ]
      }
    ]
  },

  {
    id:               'mock_aiims_4',
    title:            'AIIMS Mock Test — Series 4 (Hardest)',
    type:             'mock',
    subject:          'All Subjects',
    chapter:          'Full AIIMS Pattern — Tough Mix',
    timeLimitMinutes: 90,
    negativeMarking:  true,
    totalQuestions:    70,
    description:      'Full-length AIIMS simulation — toughest chapter mix. Electrostatics, Coordination, Genetics, Biotechnology, and Polity.',
    sections: [
      {
        subject: 'physics',
        topics: [
          'electrostatics',
          'current_electricity',
          'oscillations_waves',
          'modern_physics',
          'optics'
        ]
      },
      {
        subject: 'chemistry',
        topics: [
          'coordination_compounds',
          'organic_chemistry',
          'equilibrium_ionic',
          'p_block_elements',
          'chemical_bonding'
        ]
      },
      {
        subject: 'biology',
        topics: [
          'genetics_molecular',
          'biotechnology',
          'human_physiology',
          'reproduction',
          'cell_biology',
          'ecology_environment',
          'biology_human_welfare'
        ]
      },
      {
        subject: 'gk',
        topics: [
          'indian_polity',
          'current_affairs',
          'awards_important_dates',
          'health_organizations'
        ]
      }
    ]
  }
];
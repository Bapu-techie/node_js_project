/* ============================================================
   QUESTION BANK — Complete Question Database
   NursePrep Pro v3.0 — AIIMS BSc Nursing Entrance Exam

   Subjects: Physics, Chemistry, Biology, General Knowledge
   Total: 250+ questions across 25 chapters

   Structure: QUESTION_BANK = {
     [subject]: {
       [chapterKey]: [
         { id, question, options[], correctAnswer, explanation, difficulty, subject, subjectName, topicKey }
       ]
     }
   }

   Each question has:
   - id            : Unique string (e.g. "phy_ce_001")
   - question      : The question text
   - options       : Array of 4 option strings
   - correctAnswer : 0-based index of the correct option
   - explanation   : Detailed explanation of the answer
   - difficulty    : 'easy' | 'medium' | 'hard'
   - subject       : Subject key (physics, chemistry, biology, gk)
   - subjectName   : Display label
   - topicKey      : Chapter key matching ExamConstants.CHAPTERS
   ============================================================ */

'use strict';

var QUESTION_BANK = {

  /* ╔═══════════════════════════════════════════════════════════╗
     ║  PHYSICS                                                  ║
     ╚═══════════════════════════════════════════════════════════╝ */

  physics: {

    /* ───────────────────────────────────────────────────────────
       CURRENT ELECTRICITY
       ─────────────────────────────────────────────────────────── */
    current_electricity: [
      {
        id: 'phy_ce_001',
        question: 'The SI unit of electric current is:',
        options: ['Volt', 'Ampere', 'Ohm', 'Coulomb'],
        correctAnswer: 1,
        explanation: 'The SI unit of electric current is the Ampere (A). One ampere is defined as one coulomb of charge passing through a point in one second.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_002',
        question: 'Ohm\'s law states that V = IR. What does R represent?',
        options: ['Reactance', 'Resistance', 'Reluctance', 'Resonance'],
        correctAnswer: 1,
        explanation: 'In Ohm\'s law (V = IR), R represents the electrical resistance of the conductor, measured in Ohms (Ω).',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_003',
        question: 'When resistors are connected in series, the total resistance is:',
        options: ['Sum of reciprocals', 'Product divided by sum', 'Sum of all resistances', 'Equal to the smallest resistance'],
        correctAnswer: 2,
        explanation: 'In series combination, R_total = R₁ + R₂ + R₃ + ... The total resistance is the arithmetic sum of all individual resistances.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_004',
        question: 'The equivalent resistance of two resistors of 6Ω and 3Ω connected in parallel is:',
        options: ['9Ω', '2Ω', '3Ω', '1Ω'],
        correctAnswer: 1,
        explanation: '1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Therefore R = 2Ω. In parallel, the equivalent resistance is always less than the smallest individual resistance.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_005',
        question: 'Kirchhoff\'s first law (junction rule) is based on conservation of:',
        options: ['Energy', 'Charge', 'Momentum', 'Mass'],
        correctAnswer: 1,
        explanation: 'Kirchhoff\'s junction rule states that the total current entering a junction equals the total current leaving it. This is based on the conservation of electric charge.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_006',
        question: 'The internal resistance of an ideal voltage source is:',
        options: ['Infinite', 'Zero', 'Equal to external resistance', 'Very high'],
        correctAnswer: 1,
        explanation: 'An ideal voltage source has zero internal resistance, meaning it can supply the same voltage regardless of the current drawn from it.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_007',
        question: 'A Wheatstone bridge is said to be balanced when the galvanometer shows:',
        options: ['Maximum deflection', 'Zero deflection', 'Infinite resistance', 'Negative deflection'],
        correctAnswer: 1,
        explanation: 'A Wheatstone bridge is balanced when the potential difference across the galvanometer is zero, resulting in zero current flow (zero deflection). This occurs when P/Q = R/S.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_008',
        question: 'The power dissipated in a resistor carrying current I and having resistance R is:',
        options: ['P = V/R', 'P = IR', 'P = I²R', 'P = I/R²'],
        correctAnswer: 2,
        explanation: 'Electrical power dissipated in a resistor is P = I²R. This can also be written as P = VI = V²/R using Ohm\'s law.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_009',
        question: 'The drift velocity of electrons in a conductor is proportional to:',
        options: ['Square of electric field', 'Electric field', 'Cube of electric field', 'Independent of electric field'],
        correctAnswer: 1,
        explanation: 'Drift velocity vd = (eE)τ/m, which shows drift velocity is directly proportional to the electric field E. Here τ is the relaxation time and m is the electron mass.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      },
      {
        id: 'phy_ce_010',
        question: 'A potentiometer is preferred over a voltmeter for measuring EMF because:',
        options: ['It is cheaper', 'It draws no current from the cell', 'It measures higher voltages', 'It is portable'],
        correctAnswer: 1,
        explanation: 'A potentiometer draws no current from the source at the null point (balanced condition). Therefore, it measures the true EMF without any drop across internal resistance, unlike a voltmeter which draws finite current.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'current_electricity'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       OPTICS
       ─────────────────────────────────────────────────────────── */
    optics: [
      {
        id: 'phy_op_001',
        question: 'The phenomenon of bending of light around sharp edges of an obstacle is called:',
        options: ['Reflection', 'Refraction', 'Diffraction', 'Polarization'],
        correctAnswer: 2,
        explanation: 'Diffraction is the bending of light waves around the edges of an obstacle or through a narrow opening. It is a characteristic wave phenomenon.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_002',
        question: 'Total internal reflection occurs when light travels from:',
        options: ['Rarer to denser medium', 'Denser to rarer medium at angle greater than critical angle', 'Any medium to vacuum', 'Vacuum to any medium'],
        correctAnswer: 1,
        explanation: 'Total internal reflection occurs when light passes from a denser medium to a rarer medium at an angle of incidence greater than the critical angle. At this point, all light is reflected back into the denser medium.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_003',
        question: 'The power of a convex lens of focal length 25 cm is:',
        options: ['+2D', '+4D', '+0.25D', '−4D'],
        correctAnswer: 1,
        explanation: 'Power P = 1/f (in metres). f = 25 cm = 0.25 m. P = 1/0.25 = +4 dioptres. The positive sign indicates a converging (convex) lens.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_004',
        question: 'In Young\'s double slit experiment, the fringe width β is given by:',
        options: ['β = dλ/D', 'β = Dλ/d', 'β = λ/dD', 'β = dD/λ'],
        correctAnswer: 1,
        explanation: 'Fringe width β = Dλ/d, where D is the distance from slits to screen, λ is wavelength, and d is the distance between slits. Fringe width increases with wavelength and screen distance.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_005',
        question: 'The refractive index of a medium is defined as:',
        options: ['Speed of light in medium / Speed of light in vacuum', 'Speed of light in vacuum / Speed of light in medium', 'Wavelength in vacuum / Wavelength in medium', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Refractive index μ = c/v (speed of light in vacuum / speed in medium). Since frequency doesn\'t change, μ also equals λ_vacuum/λ_medium. Both B and C are correct definitions.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_006',
        question: 'Optical fibres work on the principle of:',
        options: ['Refraction', 'Diffraction', 'Total internal reflection', 'Scattering'],
        correctAnswer: 2,
        explanation: 'Optical fibres use the principle of total internal reflection (TIR). Light enters the fibre at one end and undergoes repeated total internal reflection, transmitting signals with minimal loss.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_007',
        question: 'A myopic eye can be corrected using a:',
        options: ['Convex lens', 'Concave lens', 'Cylindrical lens', 'Bifocal lens'],
        correctAnswer: 1,
        explanation: 'Myopia (short-sightedness) occurs when the image forms before the retina. A concave (diverging) lens is used to shift the image back onto the retina.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_008',
        question: 'The resolving power of a microscope increases with:',
        options: ['Decrease in wavelength of light', 'Increase in wavelength', 'Decrease in aperture', 'Increase in focal length'],
        correctAnswer: 0,
        explanation: 'Resolving power of a microscope is inversely proportional to the wavelength of light used. Shorter wavelengths (like UV) give higher resolving power, allowing finer details to be distinguished.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_009',
        question: 'Polarization of light proves that light is:',
        options: ['A longitudinal wave', 'A transverse wave', 'A mechanical wave', 'A sound wave'],
        correctAnswer: 1,
        explanation: 'Polarization is possible only for transverse waves. Since light can be polarized, it proves that light is a transverse electromagnetic wave.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      },
      {
        id: 'phy_op_010',
        question: 'Chromatic aberration in a lens is caused by:',
        options: ['Different focal lengths for different colours', 'Spherical shape of lens', 'Impurities in the glass', 'Thickness of the lens'],
        correctAnswer: 0,
        explanation: 'Chromatic aberration occurs because the refractive index of glass varies with wavelength (dispersion). Different colours focus at different points, creating coloured fringes around the image.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'optics'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       ELECTROSTATICS
       ─────────────────────────────────────────────────────────── */
    electrostatics: [
      {
        id: 'phy_es_001',
        question: 'Coulomb\'s law is analogous to which law in gravitation?',
        options: ['Kepler\'s law', 'Newton\'s law of gravitation', 'Gauss\'s law', 'Faraday\'s law'],
        correctAnswer: 1,
        explanation: 'Coulomb\'s law (F = kq₁q₂/r²) has the same inverse-square form as Newton\'s law of gravitation (F = Gm₁m₂/r²). Both forces vary inversely with the square of distance.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_002',
        question: 'The electric field inside a charged hollow conducting sphere is:',
        options: ['Maximum at the centre', 'Minimum at the centre', 'Zero everywhere', 'Uniform and non-zero'],
        correctAnswer: 2,
        explanation: 'By Gauss\'s law, the electric field inside a hollow conducting sphere is zero. All the charge resides on the outer surface, and a Gaussian surface inside encloses no charge.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_003',
        question: 'The SI unit of electric flux is:',
        options: ['N/C', 'Nm²/C', 'C/m²', 'V/m'],
        correctAnswer: 1,
        explanation: 'Electric flux Φ = E·A, with E in N/C and area A in m². So the unit is Nm²/C, which is also equivalent to Vm (volt-metres).',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_004',
        question: 'If the distance between two point charges is doubled, the electrostatic force becomes:',
        options: ['Half', 'Double', 'One-fourth', 'Four times'],
        correctAnswer: 2,
        explanation: 'By Coulomb\'s law F ∝ 1/r². If r is doubled, F becomes (1/2²) = 1/4 of the original force. The inverse-square relationship is fundamental to electrostatics.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_005',
        question: 'Electric potential at a point is defined as:',
        options: ['Force per unit charge', 'Work done per unit charge in bringing a test charge from infinity', 'Charge per unit area', 'Energy per unit volume'],
        correctAnswer: 1,
        explanation: 'Electric potential at a point is the work done per unit positive test charge in bringing it from infinity to that point against the electric field. V = W/q₀.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_006',
        question: 'The capacitance of a parallel plate capacitor increases when:',
        options: ['Distance between plates increases', 'Area of plates decreases', 'A dielectric is inserted between plates', 'Charge on plates decreases'],
        correctAnswer: 2,
        explanation: 'C = κε₀A/d. Inserting a dielectric of constant κ > 1 increases capacitance by a factor of κ. Capacitance also increases with area and decreases with distance.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_007',
        question: 'Gauss\'s law relates the electric flux through a closed surface to:',
        options: ['Total charge outside the surface', 'Total charge enclosed by the surface', 'Electric potential at the surface', 'Magnetic field through the surface'],
        correctAnswer: 1,
        explanation: 'Gauss\'s law: ∮E·dA = q_enclosed/ε₀. The net electric flux through any closed surface is proportional to the total charge enclosed within that surface.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_008',
        question: 'Equipotential surfaces are always:',
        options: ['Parallel to the electric field', 'Perpendicular to the electric field lines', 'At 45° to the field', 'Randomly oriented'],
        correctAnswer: 1,
        explanation: 'Equipotential surfaces are always perpendicular to electric field lines. No work is done in moving a charge along an equipotential surface since the potential difference is zero.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_009',
        question: 'The energy stored in a capacitor of capacitance C charged to voltage V is:',
        options: ['CV', 'CV²', '½CV²', '2CV²'],
        correctAnswer: 2,
        explanation: 'Energy stored = ½CV² = ½QV = Q²/2C. This energy is stored in the electric field between the plates of the capacitor.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      },
      {
        id: 'phy_es_010',
        question: 'An electric dipole placed in a non-uniform electric field experiences:',
        options: ['Only a torque', 'Only a net force', 'Both torque and net force', 'Neither torque nor force'],
        correctAnswer: 2,
        explanation: 'In a non-uniform field, the forces on the two charges of the dipole are unequal in both magnitude and direction, resulting in both a net force AND a torque. In a uniform field, only torque acts.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'electrostatics'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       KINEMATICS
       ─────────────────────────────────────────────────────────── */
    kinematics: [
      {
        id: 'phy_km_001',
        question: 'A body is thrown vertically upward. At the highest point, it has:',
        options: ['Maximum velocity and maximum acceleration', 'Zero velocity and zero acceleration', 'Zero velocity and maximum acceleration', 'Maximum velocity and zero acceleration'],
        correctAnswer: 2,
        explanation: 'At the highest point, velocity becomes zero (instantaneously at rest). However, acceleration due to gravity (g = 9.8 m/s²) still acts downward throughout the motion. Acceleration is constant and maximum.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_002',
        question: 'The displacement-time graph of a body moving with uniform velocity is:',
        options: ['A parabola', 'A straight line with positive slope', 'A circle', 'A horizontal line'],
        correctAnswer: 1,
        explanation: 'With uniform velocity, displacement increases linearly with time (s = vt + s₀). The graph is a straight line whose slope equals the velocity.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_003',
        question: 'A projectile is launched at 60° to the horizontal. The angle of the velocity vector with horizontal at the highest point is:',
        options: ['60°', '30°', '0°', '90°'],
        correctAnswer: 2,
        explanation: 'At the highest point, the vertical component of velocity is zero while the horizontal component remains unchanged (ucosθ). So the velocity vector is purely horizontal, making 0° with the horizontal.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_004',
        question: 'Two balls are dropped from heights h and 4h simultaneously. The ratio of time taken to reach the ground is:',
        options: ['1:4', '1:2', '4:1', '2:1'],
        correctAnswer: 1,
        explanation: 'For free fall, h = ½gt², so t = √(2h/g). Time ratio = √h : √(4h) = √h : 2√h = 1:2.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_005',
        question: 'The range of a projectile is maximum when the angle of projection is:',
        options: ['30°', '45°', '60°', '90°'],
        correctAnswer: 1,
        explanation: 'Range R = u²sin2θ/g. R is maximum when sin2θ = 1, i.e., 2θ = 90°, giving θ = 45°. At this angle, the horizontal and vertical components of velocity are equal.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_006',
        question: 'A car starts from rest and attains a velocity of 20 m/s in 10 seconds. Its acceleration is:',
        options: ['0.5 m/s²', '2 m/s²', '10 m/s²', '200 m/s²'],
        correctAnswer: 1,
        explanation: 'Using v = u + at: 20 = 0 + a(10). So a = 20/10 = 2 m/s². The car accelerates uniformly at 2 metres per second squared.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_007',
        question: 'The velocity-time graph of a body moving with uniform acceleration is:',
        options: ['A curve', 'A horizontal line', 'A straight line with slope = acceleration', 'A vertical line'],
        correctAnswer: 2,
        explanation: 'With uniform acceleration, v = u + at. This is a linear equation in t, so the v-t graph is a straight line. The slope (dv/dt) equals the acceleration.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_008',
        question: 'A stone is dropped from a tower. In the last second of its fall, it covers 9/25 of the total height. The height of the tower is:',
        options: ['25 m', '45 m', '125 m', '625 m'],
        correctAnswer: 2,
        explanation: 'Let total time = n seconds. Distance in last second = ½g(2n−1). Total distance = ½gn². Given: ½g(2n−1)/½gn² = 9/25. So (2n−1)/n² = 9/25. Solving: 25(2n−1) = 9n², giving 9n²−50n+25=0. n=5. Height = ½×10×25 = 125 m.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_009',
        question: 'Relative velocity of body A with respect to body B when both move in the same direction with velocities vₐ and v_b is:',
        options: ['vₐ + v_b', 'vₐ − v_b', 'vₐ × v_b', '√(vₐ² + v_b²)'],
        correctAnswer: 1,
        explanation: 'When two bodies move in the same direction, relative velocity = vₐ − v_b. If they move in opposite directions, it would be vₐ + v_b.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      },
      {
        id: 'phy_km_010',
        question: 'A ball is thrown vertically upward with velocity u. The maximum height reached is:',
        options: ['u/2g', 'u²/2g', 'u²/g', '2u²/g'],
        correctAnswer: 1,
        explanation: 'Using v² = u² − 2gh. At maximum height, v = 0. So 0 = u² − 2gh, giving h = u²/2g.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'kinematics'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       WORK, ENERGY & POWER
       ─────────────────────────────────────────────────────────── */
    work_energy_power: [
      {
        id: 'phy_wep_001',
        question: 'Work done by a force is zero when the angle between force and displacement is:',
        options: ['0°', '45°', '60°', '90°'],
        correctAnswer: 3,
        explanation: 'Work W = Fd cosθ. When θ = 90°, cos90° = 0, so W = 0. No work is done when force is perpendicular to displacement (e.g., centripetal force in circular motion).',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_002',
        question: 'The kinetic energy of an object of mass m moving with velocity v is:',
        options: ['mv', 'mv²', '½mv²', '2mv²'],
        correctAnswer: 2,
        explanation: 'Kinetic energy KE = ½mv². If velocity doubles, KE becomes 4 times. KE is always positive and is a scalar quantity.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_003',
        question: 'If the momentum of a body is doubled, its kinetic energy becomes:',
        options: ['Double', 'Four times', 'Half', 'Eight times'],
        correctAnswer: 1,
        explanation: 'KE = p²/2m. If p is doubled, KE = (2p)²/2m = 4p²/2m = 4 × original KE. Kinetic energy is proportional to the square of momentum.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_004',
        question: 'Power is defined as:',
        options: ['Force × displacement', 'Work done per unit time', 'Energy per unit volume', 'Force per unit area'],
        correctAnswer: 1,
        explanation: 'Power P = W/t (work done per unit time). The SI unit is Watt (W). 1 Watt = 1 Joule/second. Power can also be expressed as P = F·v.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_005',
        question: 'A spring of force constant k is compressed by x. The potential energy stored is:',
        options: ['kx', '½kx', 'kx²', '½kx²'],
        correctAnswer: 3,
        explanation: 'The elastic potential energy stored in a spring = ½kx², where k is the spring constant and x is the compression/extension from natural length.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_006',
        question: 'In a perfectly inelastic collision:',
        options: ['Both KE and momentum are conserved', 'Only momentum is conserved', 'Only KE is conserved', 'Neither is conserved'],
        correctAnswer: 1,
        explanation: 'In a perfectly inelastic collision, the bodies stick together. Momentum is always conserved (no external force), but kinetic energy is NOT conserved — some is converted to heat, sound, deformation.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_007',
        question: 'The work-energy theorem states that:',
        options: ['Net work = Change in potential energy', 'Net work = Change in kinetic energy', 'Net work = Change in total energy', 'Net work = Force × time'],
        correctAnswer: 1,
        explanation: 'The work-energy theorem: W_net = ΔKE = ½mv² − ½mu². The net work done by all forces equals the change in kinetic energy of the body.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_008',
        question: 'An engine of power 10 kW can pull a car at a constant velocity of 20 m/s. The force exerted by the engine is:',
        options: ['200 N', '500 N', '2000 N', '5000 N'],
        correctAnswer: 1,
        explanation: 'P = Fv. So F = P/v = 10000/20 = 500 N. At constant velocity, the engine force equals the total resistive force.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_009',
        question: 'A body of mass 2 kg falls from a height of 20 m. Its kinetic energy just before hitting the ground is (g = 10 m/s²):',
        options: ['200 J', '400 J', '100 J', '40 J'],
        correctAnswer: 1,
        explanation: 'By conservation of energy: KE at bottom = PE at top = mgh = 2 × 10 × 20 = 400 J (assuming no air resistance).',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      },
      {
        id: 'phy_wep_010',
        question: 'The coefficient of restitution for a perfectly elastic collision is:',
        options: ['0', '0.5', '1', 'Infinity'],
        correctAnswer: 2,
        explanation: 'Coefficient of restitution e = (relative velocity of separation)/(relative velocity of approach). For perfectly elastic collision e = 1, for perfectly inelastic e = 0.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'work_energy_power'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       MODERN PHYSICS
       ─────────────────────────────────────────────────────────── */
    modern_physics: [
      {
        id: 'phy_mp_001',
        question: 'The photoelectric effect demonstrates:',
        options: ['Wave nature of light', 'Particle nature of light', 'Wave nature of electrons', 'Particle nature of matter'],
        correctAnswer: 1,
        explanation: 'The photoelectric effect — where light ejects electrons from a metal surface — can only be explained by treating light as particles (photons). Einstein\'s equation: KE = hν − φ.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_002',
        question: 'The de Broglie wavelength of a particle of mass m and velocity v is:',
        options: ['h/mv', 'mv/h', 'hmv', 'h²/mv'],
        correctAnswer: 0,
        explanation: 'De Broglie wavelength λ = h/p = h/mv, where h is Planck\'s constant. This shows that all matter has wave properties, though only significant for microscopic particles.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_003',
        question: 'In Bohr\'s model, the radius of the nth orbit is proportional to:',
        options: ['n', 'n²', '1/n', '1/n²'],
        correctAnswer: 1,
        explanation: 'In Bohr\'s model, rₙ = r₁ × n² (where r₁ = 0.53 Å for hydrogen). The radius increases as the square of the principal quantum number.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_004',
        question: 'The work function of a metal is the:',
        options: ['Maximum kinetic energy of emitted electrons', 'Minimum energy needed to eject an electron', 'Energy of the incident photon', 'Binding energy of the nucleus'],
        correctAnswer: 1,
        explanation: 'Work function (φ) is the minimum energy required to remove an electron from the metal surface. If photon energy hν > φ, the excess becomes kinetic energy of the emitted electron.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_005',
        question: 'The half-life of a radioactive substance is 30 minutes. What fraction remains after 2 hours?',
        options: ['1/4', '1/8', '1/16', '1/32'],
        correctAnswer: 2,
        explanation: '2 hours = 120 minutes. Number of half-lives n = 120/30 = 4. Fraction remaining = (1/2)⁴ = 1/16.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_006',
        question: 'In alpha decay, the atomic number decreases by:',
        options: ['1', '2', '4', '0'],
        correctAnswer: 1,
        explanation: 'An alpha particle is a helium nucleus (²⁴He). In alpha decay, atomic number Z decreases by 2 and mass number A decreases by 4.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_007',
        question: 'Einstein\'s mass-energy equivalence is given by:',
        options: ['E = mc', 'E = mc²', 'E = m²c', 'E = m/c²'],
        correctAnswer: 1,
        explanation: 'E = mc² is the famous mass-energy equivalence. A small mass m can yield enormous energy because c² (speed of light squared) ≈ 9 × 10¹⁶ m²/s².',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_008',
        question: 'The binding energy per nucleon is maximum for:',
        options: ['Hydrogen', 'Helium', 'Iron (Fe-56)', 'Uranium'],
        correctAnswer: 2,
        explanation: 'Iron-56 has the highest binding energy per nucleon (~8.8 MeV). This is why fusion of lighter nuclei (up to Fe) and fission of heavier nuclei (beyond Fe) both release energy.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_009',
        question: 'X-rays are produced when fast-moving electrons strike a:',
        options: ['Low atomic number target', 'High atomic number target', 'Semiconductor', 'Plastic material'],
        correctAnswer: 1,
        explanation: 'X-rays are efficiently produced when high-energy electrons decelerate upon striking a high-Z (heavy) target like tungsten or molybdenum. Higher Z gives more intense X-ray production.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      },
      {
        id: 'phy_mp_010',
        question: 'The threshold frequency in the photoelectric effect depends on:',
        options: ['Intensity of light', 'Nature of the metal surface', 'Kinetic energy of electrons', 'Wavelength of electrons'],
        correctAnswer: 1,
        explanation: 'The threshold frequency ν₀ = φ/h depends solely on the work function φ of the metal, which is a property of the metal surface. It does not depend on light intensity.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'modern_physics'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       OSCILLATIONS & WAVES
       ─────────────────────────────────────────────────────────── */
    oscillations_waves: [
      {
        id: 'phy_ow_001',
        question: 'The time period of a simple pendulum depends on:',
        options: ['Mass of the bob', 'Amplitude of oscillation', 'Length and acceleration due to gravity', 'Material of the bob'],
        correctAnswer: 2,
        explanation: 'T = 2π√(l/g). The time period depends only on length l and acceleration due to gravity g. It is independent of mass, amplitude (for small oscillations), and material.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_002',
        question: 'The speed of sound in air increases with:',
        options: ['Decrease in temperature', 'Increase in temperature', 'Decrease in pressure', 'Increase in wavelength'],
        correctAnswer: 1,
        explanation: 'Speed of sound v ∝ √T (absolute temperature). At 0°C, v ≈ 331 m/s. It increases by about 0.6 m/s for each 1°C rise in temperature.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_003',
        question: 'In simple harmonic motion, the acceleration is:',
        options: ['Constant', 'Proportional to velocity', 'Proportional to displacement and directed towards mean position', 'Zero at extreme position'],
        correctAnswer: 2,
        explanation: 'In SHM, a = −ω²x. Acceleration is directly proportional to displacement and always directed towards the mean position (restoring nature). It is maximum at extremes and zero at mean.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_004',
        question: 'The Doppler effect is observed when there is relative motion between:',
        options: ['Source and medium', 'Observer and medium', 'Source and observer', 'Two observers'],
        correctAnswer: 2,
        explanation: 'The Doppler effect (apparent change in frequency) occurs due to relative motion between the source of waves and the observer. The observed frequency changes based on whether they approach or recede.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_005',
        question: 'Standing waves are formed by the superposition of two waves travelling in:',
        options: ['Same direction with same amplitude', 'Opposite directions with same frequency and amplitude', 'Same direction with different frequencies', 'Perpendicular directions'],
        correctAnswer: 1,
        explanation: 'Standing (stationary) waves form when two waves of equal frequency and amplitude travel in opposite directions and superimpose. The result has fixed nodes and antinodes.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_006',
        question: 'The phenomenon of beats occurs due to:',
        options: ['Two waves of same frequency', 'Two waves of slightly different frequencies', 'Two waves of very different frequencies', 'Reflection of waves'],
        correctAnswer: 1,
        explanation: 'Beats occur when two sound waves of slightly different frequencies (f₁ and f₂) superimpose. Beat frequency = |f₁ − f₂|. The sound alternates between loud and soft.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_007',
        question: 'Resonance occurs when the frequency of an external force equals:',
        options: ['Half the natural frequency', 'Double the natural frequency', 'The natural frequency of the system', 'Any random frequency'],
        correctAnswer: 2,
        explanation: 'Resonance occurs when the driving frequency matches the natural frequency of the system. At resonance, the amplitude of oscillation becomes maximum as energy transfer is most efficient.',
        difficulty: 'medium',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_008',
        question: 'The fundamental frequency of a closed organ pipe of length L is:',
        options: ['v/4L', 'v/2L', 'v/L', '2v/L'],
        correctAnswer: 0,
        explanation: 'A closed pipe has a node at the closed end and antinode at the open end. The fundamental wavelength = 4L, so f = v/4L. Closed pipes produce only odd harmonics.',
        difficulty: 'hard',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_009',
        question: 'In SHM, kinetic energy is maximum at:',
        options: ['Extreme position', 'Mean position', 'Between mean and extreme', 'All positions'],
        correctAnswer: 1,
        explanation: 'At the mean position, displacement x = 0, so potential energy is zero and all energy is kinetic. KE = ½mω²(A²−x²). At x = 0, KE is maximum = ½mω²A².',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      },
      {
        id: 'phy_ow_010',
        question: 'Ultrasonic waves are sound waves with frequency:',
        options: ['Below 20 Hz', 'Between 20 Hz and 20 kHz', 'Above 20 kHz', 'Exactly 20 kHz'],
        correctAnswer: 2,
        explanation: 'Ultrasonic waves have frequencies above 20 kHz (beyond human hearing range). They are used in medical imaging (ultrasonography), cleaning, and sonar. Infrasonic waves are below 20 Hz.',
        difficulty: 'easy',
        subject: 'physics',
        subjectName: 'Physics',
        topicKey: 'oscillations_waves'
      }
    ]
  },

  /* ╔═══════════════════════════════════════════════════════════╗
     ║  CHEMISTRY                                                ║
     ╚═══════════════════════════════════════════════════════════╝ */

  chemistry: {

    /* ───────────────────────────────────────────────────────────
       CHEMICAL BONDING
       ─────────────────────────────────────────────────────────── */
    chemical_bonding: [
      {
        id: 'chem_cb_001',
        question: 'The bond formed by the complete transfer of electrons from one atom to another is called:',
        options: ['Covalent bond', 'Ionic bond', 'Metallic bond', 'Hydrogen bond'],
        correctAnswer: 1,
        explanation: 'An ionic bond is formed by the complete transfer of one or more electrons from a metal to a non-metal, creating oppositely charged ions that attract each other (e.g., NaCl).',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_002',
        question: 'According to VSEPR theory, the shape of methane (CH₄) is:',
        options: ['Square planar', 'Trigonal pyramidal', 'Tetrahedral', 'Linear'],
        correctAnswer: 2,
        explanation: 'CH₄ has 4 bonding pairs and 0 lone pairs around carbon. VSEPR theory predicts a tetrahedral shape with bond angles of 109.5°.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_003',
        question: 'The hybridization of carbon in ethylene (C₂H₄) is:',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        correctAnswer: 1,
        explanation: 'In ethylene, each carbon forms a double bond (one σ + one π). Carbon is sp² hybridized with 3 sigma bonds and one unhybridized p orbital for the π bond. Geometry is trigonal planar.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_004',
        question: 'Hydrogen bonding is strongest in:',
        options: ['HI', 'HBr', 'HCl', 'HF'],
        correctAnswer: 3,
        explanation: 'HF has the strongest hydrogen bonding due to fluorine\'s very high electronegativity (3.98) and small size, creating a very polar H-F bond. This explains HF\'s unusually high boiling point.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_005',
        question: 'The bond order of O₂ molecule according to Molecular Orbital Theory is:',
        options: ['1', '2', '3', '1.5'],
        correctAnswer: 1,
        explanation: 'O₂ has electronic configuration: σ1s² σ*1s² σ2s² σ*2s² σ2p² π2p⁴ π*2p². Bond order = (10-6)/2 = 2. O₂ has a double bond and is paramagnetic due to two unpaired electrons.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_006',
        question: 'A coordinate (dative) bond is formed when:',
        options: ['Both atoms share electrons equally', 'Both electrons in the shared pair come from one atom', 'Electrons are transferred completely', 'Metallic ions share electron clouds'],
        correctAnswer: 1,
        explanation: 'In a coordinate bond, both electrons of the shared pair are donated by one atom (the donor) to another (the acceptor). Example: NH₄⁺ formation where NH₃ donates its lone pair to H⁺.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_007',
        question: 'The shape of SF₆ is:',
        options: ['Tetrahedral', 'Trigonal bipyramidal', 'Octahedral', 'Square planar'],
        correctAnswer: 2,
        explanation: 'SF₆ has 6 bonding pairs and no lone pairs on the central S atom. S uses sp³d² hybridization, resulting in an octahedral geometry with 90° bond angles.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_008',
        question: 'Van der Waals forces are:',
        options: ['Strongest intermolecular forces', 'Present only in polar molecules', 'Weak intermolecular forces present in all molecules', 'Intramolecular forces'],
        correctAnswer: 2,
        explanation: 'Van der Waals forces are weak intermolecular forces present in ALL molecules (polar and non-polar). They include London dispersion forces (in all), dipole-dipole (in polar), and dipole-induced dipole interactions.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'phy_cb_009',
        question: 'The shape of water molecule (H₂O) is:',
        options: ['Linear', 'Trigonal planar', 'Bent / V-shaped', 'Tetrahedral'],
        correctAnswer: 2,
        explanation: 'Water has 2 bonding pairs and 2 lone pairs on oxygen. The electron geometry is tetrahedral but the molecular shape is bent/V-shaped with a bond angle of approximately 104.5° (reduced from 109.5° due to lone pair repulsion).',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      },
      {
        id: 'chem_cb_010',
        question: 'Which of the following has the highest lattice energy?',
        options: ['NaCl', 'NaBr', 'NaI', 'NaF'],
        correctAnswer: 3,
        explanation: 'Lattice energy increases with smaller ionic radii and higher charges. F⁻ is the smallest halide ion, so NaF has the strongest ionic bond and highest lattice energy among sodium halides.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'chemical_bonding'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       PERIODIC TABLE & PERIODICITY
       ─────────────────────────────────────────────────────────── */
    periodic_table: [
      {
        id: 'chem_pt_001',
        question: 'The modern periodic table is based on:',
        options: ['Atomic mass', 'Atomic number', 'Number of neutrons', 'Electronegativity'],
        correctAnswer: 1,
        explanation: 'The modern periodic law (Moseley, 1913) states that properties of elements are a periodic function of their atomic numbers. Elements are arranged in increasing atomic number.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_002',
        question: 'Electronegativity generally increases:',
        options: ['Down a group and across a period', 'Down a group only', 'Across a period (left to right) and up a group', 'Neither across nor down'],
        correctAnswer: 2,
        explanation: 'Electronegativity increases left→right across a period (higher nuclear charge) and decreases down a group (larger atomic size, more shielding). Fluorine is the most electronegative element.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_003',
        question: 'The element with electronic configuration [Ar] 3d¹⁰ 4s² 4p³ belongs to:',
        options: ['Group 13, Period 4', 'Group 15, Period 4', 'Group 13, Period 3', 'Group 15, Period 3'],
        correctAnswer: 1,
        explanation: 'Total electrons = 18 + 10 + 2 + 3 = 33 (Arsenic). Outermost shell is 4 (Period 4). Valence electrons in s + p = 2 + 3 = 5, so it\'s in Group 15 (VA).',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_004',
        question: 'The first ionization energy is highest for:',
        options: ['Sodium', 'Magnesium', 'Aluminium', 'Noble gases'],
        correctAnswer: 3,
        explanation: 'Noble gases have the highest ionization energy in their respective periods due to completely filled stable electronic configurations. Among choices, noble gases require the most energy to remove an electron.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_005',
        question: 'Atomic radius generally decreases across a period because:',
        options: ['Number of shells increases', 'Nuclear charge increases with same number of shells', 'Electrons are added to inner shells', 'Shielding effect increases'],
        correctAnswer: 1,
        explanation: 'Across a period, electrons are added to the same shell while nuclear charge (protons) increases. The greater nuclear pull draws electrons closer, decreasing atomic radius.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_006',
        question: 'Which of the following is the most electropositive element?',
        options: ['Fluorine', 'Caesium', 'Sodium', 'Lithium'],
        correctAnswer: 1,
        explanation: 'Caesium (Cs) is the most electropositive (least electronegative) element, found at the bottom-left of the periodic table. It readily loses its valence electron.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_007',
        question: 'Electron affinity is most negative (most exothermic) for:',
        options: ['Fluorine', 'Chlorine', 'Bromine', 'Iodine'],
        correctAnswer: 1,
        explanation: 'Chlorine has the most negative (most exothermic) electron affinity among halogens (−349 kJ/mol). Fluorine\'s small size causes electron-electron repulsion, making its EA less negative than Cl.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_008',
        question: 'The d-block elements are called:',
        options: ['Alkali metals', 'Alkaline earth metals', 'Transition metals', 'Lanthanides'],
        correctAnswer: 2,
        explanation: 'The d-block elements (Groups 3–12) are called transition metals because they bridge the gap between highly electropositive s-block and electronegative p-block elements.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_009',
        question: 'The diagonal relationship exists between:',
        options: ['Li and Na', 'Li and Mg', 'Na and Mg', 'K and Ca'],
        correctAnswer: 1,
        explanation: 'Diagonal relationships exist between elements diagonally adjacent in the periodic table: Li-Mg, Be-Al, B-Si. They show similar properties because the effects of size and charge balance out.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      },
      {
        id: 'chem_pt_010',
        question: 'The total number of periods in the modern periodic table is:',
        options: ['5', '6', '7', '8'],
        correctAnswer: 2,
        explanation: 'The modern periodic table has 7 periods (horizontal rows) and 18 groups (vertical columns). Elements in the same period have the same number of electron shells.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'periodic_table'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       p-BLOCK ELEMENTS
       ─────────────────────────────────────────────────────────── */
    p_block_elements: [
      {
        id: 'chem_pb_001',
        question: 'Which allotrope of carbon is the hardest natural substance?',
        options: ['Graphite', 'Fullerene', 'Diamond', 'Carbon nanotube'],
        correctAnswer: 2,
        explanation: 'Diamond is the hardest natural substance. Each carbon is sp³ hybridized and bonded to 4 others in a rigid 3D tetrahedral network, creating an extremely hard crystal structure.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_002',
        question: 'Ozone (O₃) is:',
        options: ['A triatomic molecule that protects Earth from UV radiation', 'A diatomic molecule', 'An inert gas', 'A monatomic species'],
        correctAnswer: 0,
        explanation: 'Ozone is a triatomic allotrope of oxygen (O₃) found in the stratosphere. It absorbs harmful UV-B and UV-C radiation, protecting life on Earth. It has a bent shape with ~117° bond angle.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_003',
        question: 'The most electronegative element in the periodic table is:',
        options: ['Oxygen', 'Chlorine', 'Fluorine', 'Nitrogen'],
        correctAnswer: 2,
        explanation: 'Fluorine (EN = 3.98 on Pauling scale) is the most electronegative element. Its small size and high nuclear charge give it the greatest tendency to attract shared electrons.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_004',
        question: 'Which noble gas is used in fluorescent lighting?',
        options: ['Helium', 'Neon', 'Argon', 'Krypton'],
        correctAnswer: 2,
        explanation: 'Argon is commonly used in fluorescent tubes and light bulbs as an inert filling gas. Neon is used in neon signs (producing red-orange glow).',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_005',
        question: 'The bleaching action of chlorine is due to:',
        options: ['Reduction', 'Oxidation', 'Decomposition', 'Neutralization'],
        correctAnswer: 1,
        explanation: 'Chlorine bleaches by oxidation. Cl₂ + H₂O → HCl + HOCl. The nascent oxygen [O] released from HOCl oxidizes the coloured compound, removing its colour.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_006',
        question: 'Concentrated H₂SO₄ is a:',
        options: ['Strong oxidizing agent and dehydrating agent', 'Reducing agent', 'Neutral compound', 'Weak acid'],
        correctAnswer: 0,
        explanation: 'Concentrated sulphuric acid is both a powerful dehydrating agent (removes water from organic compounds) and a strong oxidizing agent. It chars sugar and dissolves metals when hot.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_007',
        question: 'The inert pair effect is shown by:',
        options: ['s-block elements', 'p-block elements of higher periods', 'Transition metals', 'Lanthanides'],
        correctAnswer: 1,
        explanation: 'The inert pair effect is the reluctance of the s-electrons of the outermost shell to participate in bonding in heavier p-block elements (e.g., Tl⁺, Pb²⁺, Bi³⁺ prefer lower oxidation states).',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_008',
        question: 'Which of the following oxides is amphoteric?',
        options: ['Na₂O', 'MgO', 'Al₂O₃', 'SO₃'],
        correctAnswer: 2,
        explanation: 'Al₂O₃ (aluminium oxide) is amphoteric — it reacts with both acids and bases. It dissolves in HCl (acting as a base) and in NaOH (acting as an acid).',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_009',
        question: 'Nitrogen is relatively unreactive at room temperature because:',
        options: ['It has high atomic radius', 'It has a very strong triple bond (N≡N)', 'It is a noble gas', 'It has low electronegativity'],
        correctAnswer: 1,
        explanation: 'The N₂ molecule has a very strong triple bond (bond energy = 946 kJ/mol), making it very stable and unreactive at room temperature. High energy is needed to break this bond.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      },
      {
        id: 'chem_pb_010',
        question: 'Phosphorus exists as P₄ molecules. The structure of P₄ is:',
        options: ['Square planar', 'Tetrahedral', 'Linear', 'Octahedral'],
        correctAnswer: 1,
        explanation: 'White phosphorus exists as P₄ molecules with a tetrahedral structure. Each P atom is at a corner of the tetrahedron, bonded to the other three. Bond angle is 60° (strained).',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'p_block_elements'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       ORGANIC CHEMISTRY (Reactions + Named Reactions)
       ─────────────────────────────────────────────────────────── */
    organic_chemistry: [
      {
        id: 'chem_oc_001',
        question: 'The IUPAC name of CH₃-CH=CH₂ is:',
        options: ['Ethylene', 'Propene', 'Propane', 'Butene'],
        correctAnswer: 1,
        explanation: 'CH₃-CH=CH₂ has 3 carbons (prop-) with one double bond (-ene). IUPAC name: propene (commonly called propylene).',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_002',
        question: 'Markownikoff\'s rule applies to:',
        options: ['Addition reactions of unsymmetrical alkenes with HX', 'Substitution reactions', 'Elimination reactions', 'Oxidation reactions'],
        correctAnswer: 0,
        explanation: 'Markownikoff\'s rule: When HX adds to an unsymmetrical alkene, H attaches to the carbon with more H atoms, and X to the carbon with fewer H atoms. E.g., propene + HBr → 2-bromopropane.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_003',
        question: 'The Wurtz reaction is used to prepare:',
        options: ['Alkenes', 'Higher alkanes', 'Alcohols', 'Aldehydes'],
        correctAnswer: 1,
        explanation: 'Wurtz reaction: 2RX + 2Na → R-R + 2NaX. Two alkyl halides react with sodium in dry ether to form a higher alkane with double the carbon chain length.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_004',
        question: 'Which of the following is a nucleophilic substitution reaction?',
        options: ['Halogenation of alkanes', 'Hydrolysis of alkyl halides with NaOH', 'Addition of HBr to alkenes', 'Combustion of methane'],
        correctAnswer: 1,
        explanation: 'The reaction RX + NaOH → ROH + NaX is a nucleophilic substitution. The nucleophile OH⁻ replaces the halide X⁻. It can proceed via SN1 or SN2 mechanism.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_005',
        question: 'Aldol condensation is a reaction between:',
        options: ['Two different acids', 'Two molecules of aldehyde (or ketone) with α-hydrogen', 'An acid and a base', 'An ester and an amine'],
        correctAnswer: 1,
        explanation: 'Aldol condensation: Two molecules of an aldehyde (or ketone) with α-hydrogen react in the presence of a base to form a β-hydroxy aldehyde (aldol), which may dehydrate to an α,β-unsaturated carbonyl compound.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_006',
        question: 'The Friedel-Crafts alkylation uses which catalyst?',
        options: ['Pt/Pd', 'KMnO₄', 'Anhydrous AlCl₃', 'H₂SO₄ only'],
        correctAnswer: 2,
        explanation: 'Friedel-Crafts alkylation introduces an alkyl group onto a benzene ring using an alkyl halide and anhydrous AlCl₃ (Lewis acid catalyst). AlCl₃ generates the electrophilic carbocation.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_007',
        question: 'The functional group present in carboxylic acids is:',
        options: ['-OH', '-CHO', '-COOH', '-CO-'],
        correctAnswer: 2,
        explanation: 'Carboxylic acids contain the -COOH (carboxyl) group, which is a combination of carbonyl (C=O) and hydroxyl (-OH) groups. They are weak acids that donate H⁺ from the -OH.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_008',
        question: 'The Cannizzaro reaction is given by aldehydes that:',
        options: ['Have α-hydrogen', 'Do not have α-hydrogen', 'Are aromatic only', 'Have -OH group'],
        correctAnswer: 1,
        explanation: 'Cannizzaro reaction: Aldehydes WITHOUT α-hydrogen (like HCHO, C₆H₅CHO) undergo self-oxidation and reduction in concentrated NaOH. One molecule is oxidized to acid, another reduced to alcohol.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_009',
        question: 'Benzene undergoes which type of reactions predominantly?',
        options: ['Addition reactions', 'Electrophilic substitution reactions', 'Nucleophilic addition', 'Free radical reactions'],
        correctAnswer: 1,
        explanation: 'Benzene predominantly undergoes electrophilic aromatic substitution (EAS) to preserve its aromatic stability. Examples: halogenation, nitration, sulfonation, Friedel-Crafts reactions.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      },
      {
        id: 'chem_oc_010',
        question: 'In SN2 reactions, the rate depends on:',
        options: ['Concentration of substrate only', 'Concentration of nucleophile only', 'Concentrations of both substrate and nucleophile', 'Temperature only'],
        correctAnswer: 2,
        explanation: 'SN2 (bimolecular nucleophilic substitution) has a rate = k[substrate][nucleophile]. Both species are involved in the rate-determining step, which is a one-step concerted mechanism with inversion.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'organic_chemistry'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       EQUILIBRIUM (IONIC)
       ─────────────────────────────────────────────────────────── */
    equilibrium_ionic: [
      {
        id: 'chem_eq_001',
        question: 'The pH of a neutral solution at 25°C is:',
        options: ['0', '1', '7', '14'],
        correctAnswer: 2,
        explanation: 'At 25°C, Kw = [H⁺][OH⁻] = 10⁻¹⁴. In a neutral solution, [H⁺] = [OH⁻] = 10⁻⁷ M. pH = −log[H⁺] = −log(10⁻⁷) = 7.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_002',
        question: 'According to Le Chatelier\'s principle, increasing pressure shifts equilibrium towards:',
        options: ['The side with more moles of gas', 'The side with fewer moles of gas', 'No effect on equilibrium', 'The exothermic direction'],
        correctAnswer: 1,
        explanation: 'Le Chatelier\'s principle: When pressure increases, the system shifts to reduce pressure by moving towards the side with fewer moles of gas molecules.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_003',
        question: 'The Henderson-Hasselbalch equation relates:',
        options: ['pH, pKa, and ratio of salt to acid', 'Temperature and pressure', 'Volume and concentration', 'Enthalpy and entropy'],
        correctAnswer: 0,
        explanation: 'Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). It\'s used to calculate the pH of buffer solutions knowing the pKa and the ratio of conjugate base to weak acid concentrations.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_004',
        question: 'A buffer solution resists changes in:',
        options: ['Volume', 'Temperature', 'pH', 'Pressure'],
        correctAnswer: 2,
        explanation: 'A buffer solution resists changes in pH when small amounts of acid or base are added. It contains a weak acid and its conjugate base (e.g., CH₃COOH/CH₃COONa) or a weak base and its salt.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_005',
        question: 'The common ion effect suppresses the:',
        options: ['Dissociation of a strong electrolyte', 'Dissociation of a weak electrolyte', 'Solubility of insoluble salts only', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'The common ion effect suppresses the dissociation of weak electrolytes and also reduces the solubility of sparingly soluble salts by adding a common ion, shifting equilibrium per Le Chatelier\'s principle.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_006',
        question: 'The solubility product (Ksp) of AgCl is expressed as:',
        options: ['[Ag⁺] + [Cl⁻]', '[Ag⁺][Cl⁻]', '[Ag⁺]²[Cl⁻]', '[AgCl]'],
        correctAnswer: 1,
        explanation: 'AgCl ⇌ Ag⁺ + Cl⁻. Ksp = [Ag⁺][Cl⁻]. The solubility product is the product of ionic concentrations raised to their stoichiometric coefficients. Pure solid AgCl is not included.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_007',
        question: 'Strong acids have:',
        options: ['High Ka and low pH', 'Low Ka and high pH', 'High Ka and high pH', 'Low Ka and low pH'],
        correctAnswer: 0,
        explanation: 'Strong acids (like HCl, H₂SO₄) dissociate completely, giving very high Ka values and very low pH (high [H⁺] concentration).',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_008',
        question: 'The ionic product of water (Kw) at 25°C is:',
        options: ['10⁻⁷', '10⁻¹⁴', '10⁻¹⁰', '10⁻⁷'],
        correctAnswer: 1,
        explanation: 'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C. This is the autoionization constant of water: H₂O ⇌ H⁺ + OH⁻.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_009',
        question: 'Hydrolysis of salt of a strong acid and weak base produces:',
        options: ['Acidic solution', 'Basic solution', 'Neutral solution', 'Buffer solution'],
        correctAnswer: 0,
        explanation: 'A salt of strong acid + weak base (e.g., NH₄Cl) undergoes hydrolysis: the weak base cation reacts with water producing H⁺ ions. NH₄⁺ + H₂O → NH�� + H₃O⁺. The solution is acidic (pH < 7).',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      },
      {
        id: 'chem_eq_010',
        question: 'At equilibrium, the value of the equilibrium constant K:',
        options: ['Changes with concentration', 'Changes with pressure', 'Changes only with temperature', 'Never changes'],
        correctAnswer: 2,
        explanation: 'The equilibrium constant K depends only on temperature. Changing concentration, pressure, or adding catalysts does NOT change K — only the position of equilibrium shifts (Le Chatelier\'s).',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'equilibrium_ionic'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       COORDINATION COMPOUNDS
       ─────────────────────────────────────────────────────────── */
    coordination_compounds: [
      {
        id: 'chem_cc_001',
        question: 'The coordination number of Pt in [PtCl₆]²⁻ is:',
        options: ['2', '4', '6', '8'],
        correctAnswer: 2,
        explanation: 'Coordination number is the number of ligand donor atoms directly bonded to the central metal. In [PtCl₆]²⁻, six Cl⁻ ions are bonded to Pt, so CN = 6.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_002',
        question: 'EDTA is an example of a:',
        options: ['Monodentate ligand', 'Bidentate ligand', 'Hexadentate ligand', 'Tridentate ligand'],
        correctAnswer: 2,
        explanation: 'EDTA (ethylenediaminetetraacetic acid) has 6 donor atoms (4 oxygen + 2 nitrogen) and can form 6 coordinate bonds with one metal ion, making it a hexadentate (sexadentate) ligand.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_003',
        question: 'Cisplatin [Pt(NH₃)₂Cl₂] is used as:',
        options: ['An antiseptic', 'An anticancer drug', 'A painkiller', 'An antacid'],
        correctAnswer: 1,
        explanation: 'cis-[Pt(NH₃)₂Cl₂] (cisplatin) is an important anticancer drug used in chemotherapy. It works by crosslinking DNA strands, preventing cancer cell division. The trans isomer is inactive.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_004',
        question: 'The oxidation state of Fe in [Fe(CN)₆]⁴⁻ is:',
        options: ['+2', '+3', '+4', '+6'],
        correctAnswer: 0,
        explanation: 'Let Fe = x. CN⁻ has charge −1. x + 6(−1) = −4. So x = −4 + 6 = +2. Iron is in the +2 oxidation state in ferrocyanide ion.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_005',
        question: 'Crystal Field Theory (CFT) explains:',
        options: ['Nuclear reactions', 'Bonding in organic compounds', 'Colour and magnetic properties of coordination compounds', 'Acid-base reactions'],
        correctAnswer: 2,
        explanation: 'CFT explains the colour (due to d-d transitions between split energy levels) and magnetic properties (based on number of unpaired electrons) of transition metal complexes.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_006',
        question: 'The geometry of [Ni(CN)₄]²⁻ is:',
        options: ['Tetrahedral', 'Octahedral', 'Square planar', 'Linear'],
        correctAnswer: 2,
        explanation: '[Ni(CN)₄]²⁻ has Ni²⁺ (d⁸) with CN⁻ as a strong field ligand causing pairing. It is dsp² hybridized with a square planar geometry and is diamagnetic.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_007',
        question: 'Ligands that can bind through two different donor atoms are called:',
        options: ['Bidentate ligands', 'Ambidentate ligands', 'Polydentate ligands', 'Bridging ligands'],
        correctAnswer: 1,
        explanation: 'Ambidentate ligands have two potential donor atoms but bind through only one at a time. Examples: NO₂⁻ (binds via N as nitro or via O as nitrito), SCN⁻ (via S or N).',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_008',
        question: 'Haemoglobin contains which metal ion at its centre?',
        options: ['Cu²⁺', 'Mg²⁺', 'Fe²⁺', 'Zn²⁺'],
        correctAnswer: 2,
        explanation: 'Haemoglobin is a coordination compound with Fe²⁺ at the centre of a porphyrin ring (heme group). Fe²⁺ binds to O₂ for transport in blood. Carbon monoxide poisoning occurs because CO binds more strongly to Fe²⁺.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_009',
        question: 'Werner\'s theory proposed that metal ions have:',
        options: ['Only primary valence', 'Only secondary valence', 'Both primary and secondary valences', 'No valence'],
        correctAnswer: 2,
        explanation: 'Werner (1893) proposed that metals have two types of valence: primary (ionizable, now oxidation state) and secondary (non-ionizable, now coordination number). This was revolutionary for understanding complex compounds.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      },
      {
        id: 'chem_cc_010',
        question: 'The spectrochemical series orders ligands by their:',
        options: ['Size', 'Charge', 'Field splitting strength', 'Electronegativity'],
        correctAnswer: 2,
        explanation: 'The spectrochemical series ranks ligands by their crystal field splitting strength (Δ): I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO. Stronger field ligands cause larger splitting.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'coordination_compounds'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       BIOMOLECULES + POLYMERS + EVERYDAY CHEMISTRY
       ─────────────────────────────────────────────────────────── */
    biomolecules_polymers: [
      {
        id: 'chem_bp_001',
        question: 'The monomer of natural rubber is:',
        options: ['Ethylene', 'Styrene', 'Isoprene (2-methyl-1,3-butadiene)', 'Vinyl chloride'],
        correctAnswer: 2,
        explanation: 'Natural rubber is a polymer of isoprene (2-methyl-1,3-butadiene). It has cis-1,4 configuration. Vulcanization (adding sulphur) improves its elasticity and durability.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_002',
        question: 'Glucose and fructose are:',
        options: ['Structural isomers', 'Geometric isomers', 'Optical isomers', 'Tautomers'],
        correctAnswer: 0,
        explanation: 'Glucose (aldohexose, C₆H₁₂O₆) and fructose (ketohexose, C₆H₁₂O₆) have the same molecular formula but different structural arrangements. Glucose has an aldehyde group, fructose has a ketone group.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_003',
        question: 'Proteins are polymers of:',
        options: ['Nucleotides', 'Monosaccharides', 'Amino acids', 'Fatty acids'],
        correctAnswer: 2,
        explanation: 'Proteins are polymers of amino acids linked by peptide bonds (−CO−NH−). There are 20 standard amino acids. The sequence determines the protein\'s structure and function.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_004',
        question: 'DNA contains which sugar?',
        options: ['Ribose', 'Deoxyribose', 'Glucose', 'Fructose'],
        correctAnswer: 1,
        explanation: 'DNA (Deoxyribonucleic acid) contains deoxyribose sugar (missing -OH at 2\' position). RNA contains ribose sugar (has -OH at 2\' position). This difference affects stability and function.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_005',
        question: 'Nylon-6,6 is a:',
        options: ['Addition polymer', 'Condensation polymer', 'Natural polymer', 'Homopolymer'],
        correctAnswer: 1,
        explanation: 'Nylon-6,6 is a condensation polymer formed by hexamethylenediamine and adipic acid. The "6,6" indicates both monomers have 6 carbons. Water is released during polymerization.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_006',
        question: 'Enzymes are:',
        options: ['Inorganic catalysts', 'Biological catalysts (proteins)', 'Lipids', 'Carbohydrates'],
        correctAnswer: 1,
        explanation: 'Enzymes are biological catalysts made of proteins. They speed up biochemical reactions by lowering activation energy. They are highly specific (lock-and-key model) and work under mild conditions.',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_007',
        question: 'Which vitamin is also known as ascorbic acid?',
        options: ['Vitamin A', 'Vitamin B₁₂', 'Vitamin C', 'Vitamin D'],
        correctAnswer: 2,
        explanation: 'Vitamin C (ascorbic acid) is a water-soluble vitamin essential for collagen synthesis and immune function. Its deficiency causes scurvy (bleeding gums, weakness).',
        difficulty: 'easy',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_008',
        question: 'Bakelite is an example of a:',
        options: ['Thermoplastic polymer', 'Thermosetting polymer', 'Elastomer', 'Natural polymer'],
        correctAnswer: 1,
        explanation: 'Bakelite (phenol-formaldehyde resin) is a thermosetting polymer. Once hardened, it cannot be remoulded or resoftened by heating due to extensive cross-linking. Used in electrical insulation.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_009',
        question: 'Detergents are preferred over soaps because they:',
        options: ['Are cheaper', 'Work in hard water', 'Are biodegradable', 'Have pleasant smell'],
        correctAnswer: 1,
        explanation: 'Unlike soaps (sodium salts of fatty acids), synthetic detergents (sodium salts of long-chain sulfonates) work effectively in hard water because they don\'t form insoluble calcium/magnesium salts.',
        difficulty: 'medium',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      },
      {
        id: 'chem_bp_010',
        question: 'The secondary structure of a protein (α-helix and β-sheet) is stabilized by:',
        options: ['Ionic bonds', 'Covalent bonds', 'Hydrogen bonds', 'Van der Waals forces'],
        correctAnswer: 2,
        explanation: 'The secondary structure (α-helix and β-pleated sheet) is stabilized by hydrogen bonds between the C=O of one peptide bond and the N-H of another. These are regular, repeating patterns.',
        difficulty: 'hard',
        subject: 'chemistry',
        subjectName: 'Chemistry',
        topicKey: 'biomolecules_polymers'
      }
    ]
  },

  /* ╔═══════════════════════════════════════════════════════════╗
     ║  BIOLOGY                                                  ║
     ╚═══════════════════════════════════════════════════════════╝ */

  biology: {

    /* ───────────────────────────────────────────────────────────
       HUMAN PHYSIOLOGY
       ─────────────────────────────────────────────────────────── */
    human_physiology: [
      {
        id: 'bio_hp_001',
        question: 'The normal resting heart rate in adults is:',
        options: ['40-50 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
        correctAnswer: 1,
        explanation: 'Normal adult resting heart rate is 60–100 beats per minute. Athletes may have lower rates (40–60 bpm) due to cardiac efficiency. Rate above 100 is tachycardia, below 60 is bradycardia.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_002',
        question: 'The pacemaker of the heart is:',
        options: ['AV node', 'SA node', 'Bundle of His', 'Purkinje fibres'],
        correctAnswer: 1,
        explanation: 'The sinoatrial (SA) node, located in the right atrium, is the natural pacemaker. It generates electrical impulses at 70-80/min that initiate each heartbeat. If SA node fails, AV node takes over at a slower rate.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_003',
        question: 'The functional unit of the kidney is:',
        options: ['Nephron', 'Neuron', 'Alveolus', 'Villi'],
        correctAnswer: 0,
        explanation: 'The nephron is the structural and functional unit of the kidney. Each kidney has about 1 million nephrons. It performs filtration (glomerulus), reabsorption, and secretion to form urine.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_004',
        question: 'Insulin is secreted by:',
        options: ['Alpha cells of islets of Langerhans', 'Beta cells of islets of Langerhans', 'Delta cells', 'Acinar cells'],
        correctAnswer: 1,
        explanation: 'Insulin is secreted by beta (β) cells of the islets of Langerhans in the pancreas. It lowers blood glucose by promoting glucose uptake into cells. Alpha cells secrete glucagon (raises glucose).',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_005',
        question: 'The exchange of gases (O₂ and CO₂) in the lungs occurs at the:',
        options: ['Bronchi', 'Bronchioles', 'Alveoli', 'Trachea'],
        correctAnswer: 2,
        explanation: 'Gas exchange occurs at the alveoli — tiny, thin-walled air sacs surrounded by capillaries. O₂ diffuses from alveoli into blood, CO₂ diffuses from blood into alveoli. Total surface area ≈ 70 m².',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_006',
        question: 'The enzyme pepsin works in:',
        options: ['Alkaline pH', 'Neutral pH', 'Acidic pH (1.5-2.5)', 'Very alkaline pH'],
        correctAnswer: 2,
        explanation: 'Pepsin is a protease enzyme in the stomach that works optimally at very acidic pH (1.5-2.5) provided by HCl. It breaks down proteins into smaller peptides. It is secreted as inactive pepsinogen.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_007',
        question: 'The neurotransmitter released at neuromuscular junction is:',
        options: ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'],
        correctAnswer: 2,
        explanation: 'Acetylcholine (ACh) is the neurotransmitter at the neuromuscular junction. When a nerve impulse arrives, ACh is released, crosses the synaptic cleft, and binds to receptors on the muscle fiber, causing contraction.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_008',
        question: 'Normal blood glucose level (fasting) is approximately:',
        options: ['40-60 mg/dL', '70-100 mg/dL', '140-180 mg/dL', '200-250 mg/dL'],
        correctAnswer: 1,
        explanation: 'Normal fasting blood glucose is 70–100 mg/dL. Fasting level ≥126 mg/dL indicates diabetes mellitus. 100–125 mg/dL is classified as pre-diabetic. Insulin and glucagon maintain this homeostasis.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_009',
        question: 'The longest bone in the human body is:',
        options: ['Humerus', 'Tibia', 'Femur', 'Fibula'],
        correctAnswer: 2,
        explanation: 'The femur (thigh bone) is the longest and strongest bone in the human body. It is approximately one-quarter of a person\'s height.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      },
      {
        id: 'bio_hp_010',
        question: 'ADH (Antidiuretic Hormone) regulates:',
        options: ['Blood pressure only', 'Water reabsorption in kidneys', 'Glucose metabolism', 'Thyroid function'],
        correctAnswer: 1,
        explanation: 'ADH (vasopressin), secreted by the posterior pituitary, increases water reabsorption in the collecting ducts of kidneys. Deficiency causes diabetes insipidus (excessive dilute urine).',
        difficulty: 'hard',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'human_physiology'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       GENETICS & MOLECULAR BIOLOGY
       ─────────────────────────────────────────────────────────── */
    genetics_molecular: [
      {
        id: 'bio_gm_001',
        question: 'The central dogma of molecular biology is:',
        options: ['DNA → Protein → RNA', 'RNA → DNA → Protein', 'DNA → RNA → Protein', 'Protein → RNA → DNA'],
        correctAnswer: 2,
        explanation: 'The central dogma: DNA → (transcription) → RNA → (translation) → Protein. DNA is transcribed to mRNA, which is then translated into protein at ribosomes.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_002',
        question: 'If a DNA strand reads 3\'-ATGCCG-5\', the complementary mRNA strand is:',
        options: ['5\'-UACGGC-3\'', '5\'-TACGGC-3\'', '3\'-UACGGC-5\'', '5\'-ATGCCG-3\''],
        correctAnswer: 0,
        explanation: 'mRNA is synthesized 5\'→3\' from the template DNA strand (3\'→5\'). A pairs with U (in RNA), T with A, G with C, C with G. So 3\'-ATGCCG-5\' → 5\'-UACGGC-3\'.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_003',
        question: 'Mendel\'s law of segregation states that:',
        options: ['Genes blend in offspring', 'Alleles separate during gamete formation', 'Dominant genes always appear', 'Genes on different chromosomes assort independently'],
        correctAnswer: 1,
        explanation: 'The Law of Segregation: During gamete formation, the two alleles for each gene separate so that each gamete carries only one allele. This is Mendel\'s first law, explained by meiosis.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_004',
        question: 'A codon is a sequence of:',
        options: ['2 nucleotides on DNA', '3 nucleotides on mRNA', '4 nucleotides on tRNA', '3 amino acids'],
        correctAnswer: 1,
        explanation: 'A codon is a triplet of 3 consecutive nucleotides on mRNA that codes for a specific amino acid. There are 64 possible codons (4³), including 3 stop codons and 1 start codon (AUG).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_005',
        question: 'Sickle cell anaemia is caused by mutation in the gene encoding:',
        options: ['Alpha-globin', 'Beta-globin', 'Myoglobin', 'Albumin'],
        correctAnswer: 1,
        explanation: 'Sickle cell anaemia results from a point mutation in the β-globin gene (GAG→GTG), causing glutamic acid to be replaced by valine at position 6. This causes abnormal haemoglobin (HbS) that polymerizes.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_006',
        question: 'PCR (Polymerase Chain Reaction) is used to:',
        options: ['Synthesize proteins', 'Amplify specific DNA sequences', 'Separate proteins', 'Culture bacteria'],
        correctAnswer: 1,
        explanation: 'PCR amplifies specific DNA sequences exponentially through repeated cycles of denaturation (95°C), annealing (50-65°C), and extension (72°C) using Taq polymerase. Invented by Kary Mullis.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_007',
        question: 'The human genome contains approximately:',
        options: ['3,000 genes', '20,000-25,000 genes', '100,000 genes', '1 million genes'],
        correctAnswer: 1,
        explanation: 'The Human Genome Project revealed approximately 20,000–25,000 protein-coding genes in the human genome, far fewer than expected. The total genome is ~3.2 billion base pairs.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_008',
        question: 'Colour blindness is a:',
        options: ['Autosomal dominant trait', 'Autosomal recessive trait', 'X-linked recessive trait', 'Y-linked trait'],
        correctAnswer: 2,
        explanation: 'Red-green colour blindness is an X-linked recessive trait. The gene is on the X chromosome. Males (XY) are more commonly affected because they have only one X. Carrier females (XX) are usually unaffected.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_009',
        question: 'Restriction enzymes are used in genetic engineering to:',
        options: ['Join DNA fragments', 'Cut DNA at specific sequences', 'Copy DNA', 'Translate mRNA'],
        correctAnswer: 1,
        explanation: 'Restriction endonucleases (molecular scissors) recognize and cut DNA at specific palindromic sequences. EcoRI cuts at GAATTC. They are essential tools in recombinant DNA technology.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      },
      {
        id: 'bio_gm_010',
        question: 'Down syndrome is caused by:',
        options: ['Monosomy of chromosome 21', 'Trisomy of chromosome 21', 'Deletion in chromosome 5', 'Translocation of chromosome 14'],
        correctAnswer: 1,
        explanation: 'Down syndrome (Trisomy 21) is caused by the presence of an extra copy of chromosome 21 (47 chromosomes total). It results from non-disjunction during meiosis. Incidence increases with maternal age.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'genetics_molecular'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       REPRODUCTION (Human + Plants)
       ─────────────────────────────────────────────────────────── */
    reproduction: [
      {
        id: 'bio_rp_001',
        question: 'The process of fusion of male and female gametes is called:',
        options: ['Pollination', 'Fertilization', 'Germination', 'Implantation'],
        correctAnswer: 1,
        explanation: 'Fertilization is the fusion of a male gamete (sperm/pollen) with a female gamete (ovum/egg cell) to form a zygote. In humans, it typically occurs in the fallopian tube.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_002',
        question: 'Double fertilization is unique to:',
        options: ['Gymnosperms', 'Angiosperms', 'Bryophytes', 'Pteridophytes'],
        correctAnswer: 1,
        explanation: 'Double fertilization is unique to angiosperms (flowering plants). One sperm fuses with the egg (forming zygote/embryo), another fuses with two polar nuclei (forming triploid endosperm, 3n).',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_003',
        question: 'The hormone responsible for ovulation is:',
        options: ['FSH', 'LH (Luteinizing Hormone)', 'Estrogen', 'Progesterone'],
        correctAnswer: 1,
        explanation: 'The LH surge (a sharp rise in Luteinizing Hormone) triggers ovulation — the release of a mature ovum from the ovarian follicle. This occurs around day 14 of a 28-day menstrual cycle.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_004',
        question: 'The placenta is formed from:',
        options: ['Maternal tissue only', 'Foetal tissue only', 'Both maternal and foetal tissue', 'Amniotic fluid'],
        correctAnswer: 2,
        explanation: 'The placenta develops from both foetal tissue (chorionic villi from trophoblast) and maternal tissue (uterine endometrium/decidua). It provides nutrients, oxygen, and removes waste from the foetus.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_005',
        question: 'In plants, pollen grains are produced in the:',
        options: ['Stigma', 'Ovule', 'Anther', 'Style'],
        correctAnswer: 2,
        explanation: 'Pollen grains (male gametophytes) are produced in the anther through microsporogenesis. Each pollen grain has two cells — a tube cell and a generative cell (which later divides into two sperm cells).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_006',
        question: 'The normal duration of human pregnancy is approximately:',
        options: ['32 weeks', '36 weeks', '40 weeks (280 days)', '44 weeks'],
        correctAnswer: 2,
        explanation: 'Normal human pregnancy (gestation) lasts approximately 40 weeks (280 days or 9 months) from the last menstrual period. It is divided into three trimesters of roughly 13 weeks each.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_007',
        question: 'Which contraceptive method involves blocking the fallopian tubes?',
        options: ['Vasectomy', 'Tubectomy', 'IUD insertion', 'Oral pills'],
        correctAnswer: 1,
        explanation: 'Tubectomy (tubal ligation) is a surgical sterilization method in females where the fallopian tubes are cut, tied, or blocked, preventing the egg from reaching the uterus. Vasectomy is the male equivalent (vas deferens).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_008',
        question: 'Embryo sac in angiosperms is:',
        options: ['Male gametophyte', 'Female gametophyte', 'Sporophyte', 'Endosperm'],
        correctAnswer: 1,
        explanation: 'The embryo sac (7 cells, 8 nuclei) is the mature female gametophyte in angiosperms. It contains the egg cell, two synergids, three antipodal cells, and a central cell with two polar nuclei.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_009',
        question: 'IVF (In Vitro Fertilization) involves:',
        options: ['Fertilization inside the body', 'Fertilization outside the body in a lab', 'Artificial insemination', 'Cloning'],
        correctAnswer: 1,
        explanation: 'IVF involves collecting eggs and sperm, fertilizing them in a laboratory dish, and then transferring the resulting embryo(s) into the uterus. It is commonly called "test tube baby" technique.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      },
      {
        id: 'bio_rp_010',
        question: 'Progesterone during pregnancy is mainly produced by:',
        options: ['Anterior pituitary', 'Corpus luteum and later placenta', 'Hypothalamus', 'Adrenal gland'],
        correctAnswer: 1,
        explanation: 'Progesterone is initially produced by the corpus luteum in the ovary. After 8-12 weeks, the placenta takes over as the major source. Progesterone maintains the uterine lining and prevents contractions.',
        difficulty: 'hard',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'reproduction'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       ECOLOGY & ENVIRONMENT
       ─────────────────────────────────────────────────────────── */
    ecology_environment: [
      {
        id: 'bio_ee_001',
        question: 'The ozone layer is found in which layer of the atmosphere?',
        options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
        correctAnswer: 1,
        explanation: 'The ozone layer is concentrated in the stratosphere (15–35 km altitude). It absorbs 97–99% of UV radiation from the sun, protecting life on Earth. CFCs deplete this layer.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_002',
        question: 'The pyramid of energy in an ecosystem is always:',
        options: ['Inverted', 'Spindle-shaped', 'Upright', 'Variable'],
        correctAnswer: 2,
        explanation: 'The pyramid of energy is always upright because energy decreases at each successive trophic level (only 10% is transferred — Lindeman\'s 10% law). Energy cannot be recycled; it flows in one direction.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_003',
        question: 'Eutrophication is caused by:',
        options: ['Excess oxygen', 'Excess nutrients (nitrogen, phosphorus) in water bodies', 'Deforestation', 'Ozone depletion'],
        correctAnswer: 1,
        explanation: 'Eutrophication is excessive nutrient enrichment (mainly N and P) of water bodies from fertilizer runoff, sewage, etc. It causes algal blooms, oxygen depletion, and fish kills.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_004',
        question: 'Biodiversity hotspots are regions with:',
        options: ['Low species diversity', 'High endemism and significant habitat loss', 'No endangered species', 'Only marine life'],
        correctAnswer: 1,
        explanation: 'Biodiversity hotspots have exceptionally high species richness, high endemism (≥1,500 endemic vascular plants), and have lost ≥70% of their original habitat. India has 4 hotspots including Western Ghats.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_005',
        question: 'The greenhouse effect is caused mainly by:',
        options: ['O₂ and N₂', 'CO₂, CH₄, and water vapour', 'Ozone only', 'Noble gases'],
        correctAnswer: 1,
        explanation: 'Greenhouse gases (CO₂, CH₄, N₂O, water vapour, CFCs) trap heat radiated from Earth\'s surface, warming the atmosphere. CO₂ is the primary contributor from human activities (fossil fuels, deforestation).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_006',
        question: 'Which of the following is a primary consumer?',
        options: ['Tiger', 'Grasshopper', 'Eagle', 'Mushroom'],
        correctAnswer: 1,
        explanation: 'Primary consumers (herbivores) feed directly on producers (plants). Grasshoppers eat plants, making them primary consumers. Tiger and eagle are secondary/tertiary consumers. Mushrooms are decomposers.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_007',
        question: 'The Red Data Book contains information about:',
        options: ['All known species', 'Endangered and threatened species', 'Extinct species only', 'Invasive species'],
        correctAnswer: 1,
        explanation: 'The Red Data Book (IUCN Red List) documents endangered and threatened species worldwide. Species are classified as Extinct, Critically Endangered, Endangered, Vulnerable, Near Threatened, or Least Concern.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_008',
        question: 'Ecological succession that begins on bare rock is called:',
        options: ['Secondary succession', 'Primary succession', 'Seral succession', 'Retrogressive succession'],
        correctAnswer: 1,
        explanation: 'Primary succession occurs on bare, previously uninhabited surfaces (bare rock, new lava, sand dunes). It begins with pioneer species like lichens and takes hundreds of years to reach climax community.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_009',
        question: 'Biomagnification refers to:',
        options: ['Decrease in pollutant concentration up the food chain', 'Increase in pollutant concentration at each trophic level', 'Decomposition of pollutants', 'Release of pollutants into air'],
        correctAnswer: 1,
        explanation: 'Biomagnification is the progressive increase in concentration of non-biodegradable toxins (DDT, mercury, lead) at each successive trophic level in a food chain. Top predators are most affected.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      },
      {
        id: 'bio_ee_010',
        question: 'The Chipko movement was related to:',
        options: ['Water conservation', 'Forest conservation', 'Air pollution', 'Wildlife protection'],
        correctAnswer: 1,
        explanation: 'The Chipko movement (1973, Uttarakhand) was a forest conservation movement where villagers, led by Sunderlal Bahuguna, hugged trees to prevent commercial logging. "Chipko" means "to cling/embrace".',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'ecology_environment'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       CELL BIOLOGY (Cell Division)
       ─────────────────────────────────────────────────────────── */
    cell_biology: [
      {
        id: 'bio_cb_001',
        question: 'The powerhouse of the cell is:',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswer: 2,
        explanation: 'Mitochondria are called the powerhouse because they produce ATP (energy currency) through oxidative phosphorylation and the Krebs cycle. They have their own circular DNA and double membrane.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_002',
        question: 'Mitosis results in:',
        options: ['4 haploid daughter cells', '2 diploid daughter cells identical to the parent', '2 haploid daughter cells', '4 diploid daughter cells'],
        correctAnswer: 1,
        explanation: 'Mitosis produces 2 genetically identical diploid (2n) daughter cells from one parent cell. It is used for growth, repair, and asexual reproduction. The chromosome number is maintained.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_003',
        question: 'Crossing over occurs during which phase of meiosis?',
        options: ['Prophase I', 'Metaphase I', 'Anaphase II', 'Telophase II'],
        correctAnswer: 0,
        explanation: 'Crossing over (exchange of genetic material between homologous chromosomes) occurs during Prophase I of meiosis, specifically in the pachytene substage. This generates genetic diversity.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_004',
        question: 'The cell organelle responsible for protein synthesis is:',
        options: ['Mitochondria', 'Ribosome', 'Lysosome', 'Golgi apparatus'],
        correctAnswer: 1,
        explanation: 'Ribosomes are the site of protein synthesis (translation). They read mRNA codons and assemble amino acids into polypeptides. Found free in cytoplasm or attached to rough ER. Made of rRNA + proteins.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_005',
        question: 'Meiosis produces:',
        options: ['2 diploid cells', '4 diploid cells', '2 haploid cells', '4 haploid cells'],
        correctAnswer: 3,
        explanation: 'Meiosis is reduction division: one diploid (2n) cell → four haploid (n) daughter cells. Meiosis I separates homologous chromosomes, Meiosis II separates sister chromatids. Essential for sexual reproduction.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_006',
        question: 'Lysosomes are called "suicide bags" because:',
        options: ['They produce energy', 'They contain digestive enzymes that can destroy the cell', 'They replicate DNA', 'They synthesize proteins'],
        correctAnswer: 1,
        explanation: 'Lysosomes contain hydrolytic enzymes that can digest cellular components. During cell damage or apoptosis, the lysosome membrane ruptures, releasing enzymes that destroy the cell (autolysis).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_007',
        question: 'The spindle fibres during cell division are made of:',
        options: ['Actin', 'Myosin', 'Tubulin', 'Keratin'],
        correctAnswer: 2,
        explanation: 'Spindle fibres (microtubules) are made of the protein tubulin (α and β subunits). They attach to kinetochores on chromosomes and pull them apart during anaphase. They originate from centrioles.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_008',
        question: 'The cell cycle phase where DNA replication occurs is:',
        options: ['G1 phase', 'S phase', 'G2 phase', 'M phase'],
        correctAnswer: 1,
        explanation: 'DNA replication occurs during the S (synthesis) phase of interphase. After S phase, each chromosome has two sister chromatids joined at the centromere. G1 is before S, G2 is after S, M is mitosis.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_009',
        question: 'Which cell organelle is absent in prokaryotic cells?',
        options: ['Ribosome', 'Cell membrane', 'Nucleus', 'DNA'],
        correctAnswer: 2,
        explanation: 'Prokaryotic cells (bacteria, archaea) lack a membrane-bound nucleus. Their DNA is in a nucleoid region. They also lack other membrane-bound organelles (mitochondria, ER, Golgi), but have ribosomes (70S).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      },
      {
        id: 'bio_cb_010',
        question: 'Cytokinesis in plant cells occurs by:',
        options: ['Cleavage furrow formation', 'Cell plate formation', 'Budding', 'Binary fission'],
        correctAnswer: 1,
        explanation: 'In plant cells, cytokinesis occurs by cell plate formation — Golgi vesicles fuse at the centre of the cell, growing outward to form a new cell wall. In animal cells, a cleavage furrow forms and pinches inward.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'cell_biology'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       BIOTECHNOLOGY
       ─────────────────────────���───────────────────────────────── */
    biotechnology: [
      {
        id: 'bio_bt_001',
        question: 'The enzyme used to join two DNA fragments is:',
        options: ['DNA polymerase', 'RNA polymerase', 'DNA ligase', 'Restriction endonuclease'],
        correctAnswer: 2,
        explanation: 'DNA ligase joins (ligates) two DNA fragments by forming phosphodiester bonds between them. It is called "molecular glue" and is essential in recombinant DNA technology and DNA repair.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_002',
        question: 'Bt cotton is resistant to:',
        options: ['Drought', 'Bollworm (insect pest)', 'Herbicides', 'Fungal infections'],
        correctAnswer: 1,
        explanation: 'Bt cotton contains the cry gene from Bacillus thuringiensis. The Cry protein (Bt toxin) is toxic to bollworm larvae when ingested, killing the pest. It is harmless to humans and other animals.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_003',
        question: 'Gene therapy involves:',
        options: ['Removing all genes', 'Replacing or supplementing a faulty gene with a functional copy', 'Changing protein structure', 'Removing chromosomes'],
        correctAnswer: 1,
        explanation: 'Gene therapy is the insertion of a normal functional gene into cells to replace or supplement a defective gene, treating genetic disorders. It can be somatic (non-heritable) or germline (heritable).',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_004',
        question: 'The first genetically engineered product approved for human use was:',
        options: ['Insulin', 'Interferon', 'Growth hormone', 'Erythropoietin'],
        correctAnswer: 0,
        explanation: 'Recombinant human insulin (Humulin), produced by inserting the human insulin gene into E. coli bacteria, was the first genetically engineered product approved for human use (1982, by Eli Lilly).',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_005',
        question: 'Gel electrophoresis is used to separate:',
        options: ['Cells', 'DNA fragments by size', 'Organs', 'Tissues'],
        correctAnswer: 1,
        explanation: 'Gel electrophoresis separates DNA (or protein) fragments based on size. Smaller fragments migrate faster through the agarose/polyacrylamide gel under electric field. DNA is negatively charged (moves to +).',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_006',
        question: 'Golden Rice has been genetically modified to produce:',
        options: ['Extra protein', 'Beta-carotene (provitamin A)', 'Vitamin C', 'Iron'],
        correctAnswer: 1,
        explanation: 'Golden Rice is engineered to produce beta-carotene (precursor of vitamin A) in the grain. It was developed to address vitamin A deficiency, which causes blindness in millions of children worldwide.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_007',
        question: 'Dolly, the first cloned mammal, was a:',
        options: ['Dog', 'Sheep', 'Cat', 'Monkey'],
        correctAnswer: 1,
        explanation: 'Dolly the sheep (1996, Roslin Institute, Scotland) was the first mammal cloned from an adult somatic cell using somatic cell nuclear transfer (SCNT). She proved differentiated cells retain full genetic potential.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_008',
        question: 'CRISPR-Cas9 is a technology used for:',
        options: ['Protein folding', 'Gene editing', 'Cell culture', 'Chromosome counting'],
        correctAnswer: 1,
        explanation: 'CRISPR-Cas9 is a revolutionary gene-editing tool that allows precise, targeted modification of DNA sequences. Cas9 is a molecular scissor guided by a guide RNA to cut specific DNA locations.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_009',
        question: 'Vectors commonly used in genetic engineering include:',
        options: ['Viruses only', 'Plasmids and bacteriophages', 'Ribosomes', 'Mitochondria'],
        correctAnswer: 1,
        explanation: 'Vectors (vehicles for carrying foreign DNA into host cells) include plasmids (circular DNA in bacteria), bacteriophages, cosmids, BACs, and YACs. Plasmids are the most commonly used.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      },
      {
        id: 'bio_bt_010',
        question: 'DNA fingerprinting is based on:',
        options: ['Coding sequences of DNA', 'Repetitive DNA sequences (VNTRs/STRs)', 'Ribosomal RNA', 'Transfer RNA'],
        correctAnswer: 1,
        explanation: 'DNA fingerprinting (developed by Alec Jeffreys) uses variable number tandem repeats (VNTRs) or short tandem repeats (STRs) — highly variable non-coding DNA regions unique to each individual.',
        difficulty: 'hard',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biotechnology'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       BIOLOGY & HUMAN WELFARE
       ─────────────────────────────────────────────────────────── */
    biology_human_welfare: [
      {
        id: 'bio_hw_001',
        question: 'The causative agent of malaria is:',
        options: ['Virus', 'Bacteria', 'Plasmodium (protozoan)', 'Fungus'],
        correctAnswer: 2,
        explanation: 'Malaria is caused by Plasmodium parasites (P. vivax, P. falciparum, P. malariae, P. ovale) transmitted by the bite of infected female Anopheles mosquitoes. P. falciparum causes the most severe form.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_002',
        question: 'Penicillin was discovered by:',
        options: ['Louis Pasteur', 'Robert Koch', 'Alexander Fleming', 'Edward Jenner'],
        correctAnswer: 2,
        explanation: 'Alexander Fleming discovered penicillin in 1928 from the mould Penicillium notatum. It was the first widely used antibiotic, saving millions of lives. Fleming shared the 1945 Nobel Prize.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_003',
        question: 'BCG vaccine is given for prevention of:',
        options: ['Polio', 'Tuberculosis', 'Hepatitis', 'Measles'],
        correctAnswer: 1,
        explanation: 'BCG (Bacillus Calmette-Guérin) vaccine provides protection against tuberculosis (TB) caused by Mycobacterium tuberculosis. It is given at birth or soon after in India as part of the immunization schedule.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_004',
        question: 'HIV attacks which cells in the human body?',
        options: ['Red blood cells', 'Platelets', 'Helper T-cells (CD4+)', 'B-lymphocytes only'],
        correctAnswer: 2,
        explanation: 'HIV (Human Immunodeficiency Virus) specifically attacks and destroys CD4+ Helper T-cells, which are crucial for coordinating immune responses. As CD4 count drops below 200/μL, AIDS develops.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_005',
        question: 'Biofortification is the process of:',
        options: ['Adding chemicals to food', 'Breeding crops to increase nutritional value', 'Using pesticides', 'Genetic removal of traits'],
        correctAnswer: 1,
        explanation: 'Biofortification improves the nutritional quality of food crops through conventional breeding, agronomic practices, or biotechnology. Examples: iron-rich rice, vitamin A-rich sweet potato, zinc-rich wheat.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_006',
        question: 'Dengue fever is transmitted by:',
        options: ['Anopheles mosquito', 'Aedes aegypti mosquito', 'House fly', 'Tsetse fly'],
        correctAnswer: 1,
        explanation: 'Dengue fever is caused by the Dengue virus and transmitted by the bite of infected Aedes aegypti mosquito. Symptoms include high fever, severe headache, joint pain, and in severe cases, dengue hemorrhagic fever.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_007',
        question: 'Antibiotics are effective against:',
        options: ['Viruses', 'Bacteria', 'Prions', 'All microorganisms'],
        correctAnswer: 1,
        explanation: 'Antibiotics are effective against bacteria, not viruses. They work by inhibiting cell wall synthesis (penicillin), protein synthesis (tetracycline), or nucleic acid synthesis (rifampicin). Antibiotic resistance is a growing concern.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_008',
        question: 'The full form of AIDS is:',
        options: ['Acute Immune Deficiency Syndrome', 'Acquired Immuno Deficiency Syndrome', 'Auto Immune Disease Syndrome', 'Acquired Infectious Disease Syndrome'],
        correctAnswer: 1,
        explanation: 'AIDS = Acquired Immuno Deficiency Syndrome. It is caused by HIV and leads to progressive failure of the immune system, making the person susceptible to opportunistic infections and cancers.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_009',
        question: 'Microbes used in the production of antibiotics include:',
        options: ['Lactobacillus', 'Penicillium and Streptomyces', 'Saccharomyces', 'Rhizobium'],
        correctAnswer: 1,
        explanation: 'Penicillium notatum/chrysogenum produces penicillin. Streptomyces species produce streptomycin, erythromycin, and many other antibiotics. These soil microbes are the primary source of natural antibiotics.',
        difficulty: 'medium',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      },
      {
        id: 'bio_hw_010',
        question: 'The disease caused by deficiency of Vitamin D is:',
        options: ['Scurvy', 'Rickets', 'Beri-beri', 'Pellagra'],
        correctAnswer: 1,
        explanation: 'Vitamin D deficiency causes rickets in children (soft, deformed bones) and osteomalacia in adults. Vitamin D is essential for calcium and phosphorus absorption. Sources: sunlight, fish oil, fortified foods.',
        difficulty: 'easy',
        subject: 'biology',
        subjectName: 'Biology',
        topicKey: 'biology_human_welfare'
      }
    ]
  },

  /* ╔═══════════════════════════════════════════════════════════╗
     ║  GENERAL KNOWLEDGE                                        ║
     ╚═══════════════════════════════════════════════════════════╝ */

  gk: {

    /* ───────────────────────────────────────────────────────────
       CURRENT AFFAIRS (Last 6 Months)
       ─────────────────────────────────────────────────────────── */
    current_affairs: [
      {
        id: 'gk_ca_001',
        question: 'The Union Budget of India 2025-26 was presented by:',
        options: ['Narendra Modi', 'Nirmala Sitharaman', 'Amit Shah', 'Rajnath Singh'],
        correctAnswer: 1,
        explanation: 'The Union Budget of India is presented by the Finance Minister. Nirmala Sitharaman has been the Finance Minister presenting consecutive Union Budgets.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_002',
        question: 'Which country hosted the G20 Summit in 2023?',
        options: ['Indonesia', 'India', 'Brazil', 'South Africa'],
        correctAnswer: 1,
        explanation: 'India hosted the G20 Summit in September 2023 in New Delhi under PM Modi\'s presidency. The theme was "One Earth, One Family, One Future" (Vasudhaiva Kutumbakam). African Union was admitted as a permanent member.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_003',
        question: 'Chandrayaan-3 successfully landed on the Moon\'s south pole in:',
        options: ['July 2023', 'August 2023', 'September 2023', 'October 2023'],
        correctAnswer: 1,
        explanation: 'ISRO\'s Chandrayaan-3 successfully soft-landed on the Moon\'s south polar region on August 23, 2023, making India the 4th country to land on the Moon and 1st to land near the south pole.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_004',
        question: 'India\'s first indigenous aircraft carrier, commissioned in 2022, is:',
        options: ['INS Vikrant', 'INS Vikramaditya', 'INS Vishal', 'INS Arihant'],
        correctAnswer: 0,
        explanation: 'INS Vikrant (IAC-1), India\'s first indigenously built aircraft carrier, was commissioned on September 2, 2022, by PM Modi at Cochin Shipyard. India became the 6th nation to design and build its own carrier.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_005',
        question: 'The Ayodhya Ram Mandir was inaugurated in January 2024 by:',
        options: ['President of India', 'Prime Minister Narendra Modi', 'Chief Justice of India', 'Governor of UP'],
        correctAnswer: 1,
        explanation: 'The Ram Mandir in Ayodhya was inaugurated on January 22, 2024 (Ram Lalla Pran Pratishtha ceremony) by Prime Minister Narendra Modi. The temple was built at the site of the disputed Babri Masjid.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_006',
        question: 'India\'s Aditya-L1 mission is related to:',
        options: ['Mars exploration', 'Study of the Sun', 'Asteroid mining', 'Deep space communication'],
        correctAnswer: 1,
        explanation: 'Aditya-L1 is India\'s first space mission dedicated to studying the Sun. Launched on September 2, 2023, it reached the L1 Lagrange point in January 2024 to observe solar corona, flares, and solar winds.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_007',
        question: 'The UPI (Unified Payments Interface) was developed by:',
        options: ['RBI', 'NPCI (National Payments Corporation of India)', 'SBI', 'NITI Aayog'],
        correctAnswer: 1,
        explanation: 'UPI was developed by NPCI (National Payments Corporation of India) and launched in 2016. India processes over 10 billion UPI transactions monthly, making it the world\'s most successful real-time payment system.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_008',
        question: 'Which Indian city was declared a UNESCO World Heritage Site most recently (as of 2025)?',
        options: ['Varanasi', 'Santiniketan', 'Jaipur', 'Ahmedabad'],
        correctAnswer: 1,
        explanation: 'Santiniketan in West Bengal, founded by Rabindranath Tagore, was inscribed as a UNESCO World Heritage Site in September 2023, making it India\'s 41st World Heritage Site.',
        difficulty: 'hard',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_009',
        question: 'The Women\'s Reservation Bill (Nari Shakti Vandan Adhiniyam) reserves what percentage of seats for women in Lok Sabha and State Assemblies?',
        options: ['25%', '33%', '40%', '50%'],
        correctAnswer: 1,
        explanation: 'The Women\'s Reservation Bill (128th Constitutional Amendment), passed in September 2023, reserves 33% of seats in Lok Sabha and State Legislative Assemblies for women. Implementation is pending delimitation.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      },
      {
        id: 'gk_ca_010',
        question: 'Semiconductor manufacturing in India received a major boost with the announcement of a fab plant by which company?',
        options: ['Intel', 'Micron Technology', 'Samsung', 'TSMC'],
        correctAnswer: 1,
        explanation: 'Micron Technology announced setting up a semiconductor assembly and test facility in Sanand, Gujarat (2023), with an investment of $2.75 billion. This is a landmark in India\'s semiconductor manufacturing ambitions.',
        difficulty: 'hard',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'current_affairs'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       INDIAN POLITY (Articles, Amendments)
       ─────────────────────────────────────────────────────────── */
    indian_polity: [
      {
        id: 'gk_ip_001',
        question: 'The Preamble of the Indian Constitution declares India as:',
        options: ['Sovereign Democratic Republic', 'Sovereign Socialist Secular Democratic Republic', 'Federal Democratic Republic', 'Unitary Secular Republic'],
        correctAnswer: 1,
        explanation: 'The Preamble declares India as a "Sovereign Socialist Secular Democratic Republic." "Socialist" and "Secular" were added by the 42nd Amendment (1976). "Sovereign" means supreme authority.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_002',
        question: 'Article 21 of the Indian Constitution deals with:',
        options: ['Right to Equality', 'Right to Freedom of Religion', 'Right to Life and Personal Liberty', 'Right against Exploitation'],
        correctAnswer: 2,
        explanation: 'Article 21: "No person shall be deprived of his life or personal liberty except according to procedure established by law." It has been expanded to include right to education, health, clean environment, privacy, and dignity.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_003',
        question: 'The Right to Education Act (RTE) was enacted under which Article?',
        options: ['Article 14', 'Article 19', 'Article 21A', 'Article 32'],
        correctAnswer: 2,
        explanation: 'Article 21A (inserted by the 86th Amendment, 2002) provides free and compulsory education to all children aged 6–14 years as a Fundamental Right. The RTE Act, 2009 implements this right.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_004',
        question: 'The 73rd Constitutional Amendment deals with:',
        options: ['Scheduled Tribes', 'Panchayati Raj Institutions', 'Municipalities', 'Anti-Defection Law'],
        correctAnswer: 1,
        explanation: 'The 73rd Amendment (1992) gave constitutional status to Panchayati Raj Institutions (village self-governance). It mandated elections, reservation for SC/ST/women, and created a three-tier system.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_005',
        question: 'Article 370 of the Constitution, which granted special status to Jammu & Kashmir, was abrogated in:',
        options: ['2017', '2018', '2019', '2020'],
        correctAnswer: 2,
        explanation: 'Article 370 was effectively abrogated on August 5, 2019, by a Presidential Order. J&K was bifurcated into two Union Territories: Jammu & Kashmir (with legislature) and Ladakh (without). Upheld by SC in Dec 2023.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_006',
        question: 'The Election Commission of India is established under which Article?',
        options: ['Article 280', 'Article 315', 'Article 324', 'Article 352'],
        correctAnswer: 2,
        explanation: 'Article 324 vests the superintendence, direction, and control of elections (Parliament, State Legislatures, President, VP) in the Election Commission of India. It ensures free and fair elections.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_007',
        question: 'Fundamental Duties are enshrined in which Part of the Indian Constitution?',
        options: ['Part III', 'Part IV', 'Part IVA', 'Part V'],
        correctAnswer: 2,
        explanation: 'Fundamental Duties are in Part IVA, Article 51A, added by the 42nd Amendment (1976) based on the Swaran Singh Committee\'s recommendation. Originally 10 duties, the 86th Amendment (2002) added the 11th duty.',
        difficulty: 'hard',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_008',
        question: 'The President of India is elected by:',
        options: ['Direct election by citizens', 'Members of Parliament only', 'Electoral college of elected members of Parliament and State Legislatures', 'Prime Minister\'s recommendation'],
        correctAnswer: 2,
        explanation: 'The President is elected by an electoral college consisting of elected members of both Houses of Parliament and elected members of State Legislative Assemblies (Art. 54), through proportional representation with single transferable vote.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_009',
        question: 'The Anti-Defection Law was added by which Constitutional Amendment?',
        options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '61st Amendment'],
        correctAnswer: 2,
        explanation: 'The 52nd Constitutional Amendment Act (1985) added the Tenth Schedule (Anti-Defection Law) to prevent legislators from changing parties after election. It was modified by the 91st Amendment (2003).',
        difficulty: 'hard',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      },
      {
        id: 'gk_ip_010',
        question: 'Article 32 of the Constitution gives the right to move the Supreme Court for enforcement of:',
        options: ['Directive Principles', 'Fundamental Rights', 'Fundamental Duties', 'International Treaties'],
        correctAnswer: 1,
        explanation: 'Article 32 is the "Right to Constitutional Remedies" — the right to move the Supreme Court for enforcement of Fundamental Rights. Dr. B.R. Ambedkar called it "the heart and soul of the Constitution."',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'indian_polity'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       HEALTH ORGANIZATIONS & SCHEMES
       ─────────────────────────────────────────────────────────── */
    health_organizations: [
      {
        id: 'gk_ho_001',
        question: 'The headquarters of the World Health Organization (WHO) is in:',
        options: ['New York', 'Geneva', 'Paris', 'London'],
        correctAnswer: 1,
        explanation: 'WHO headquarters is in Geneva, Switzerland. Established on April 7, 1948 (celebrated as World Health Day), it is a specialized agency of the United Nations responsible for international public health.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_002',
        question: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides health coverage of:',
        options: ['₹1 lakh per family', '₹3 lakh per family', '₹5 lakh per family per year', '₹10 lakh per family'],
        correctAnswer: 2,
        explanation: 'PM-JAY (launched September 2018) provides health insurance of ₹5 lakh per family per year for secondary and tertiary hospitalization. It covers ~50 crore beneficiaries (10.74 crore families), making it the world\'s largest health insurance scheme.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_003',
        question: 'The Indian Council of Medical Research (ICMR) is the apex body for:',
        options: ['Agricultural research', 'Biomedical research in India', 'Space research', 'Nuclear research'],
        correctAnswer: 1,
        explanation: 'ICMR, established in 1911 (as IRFA, renamed ICMR in 1949), is the apex body in India for biomedical research. It formulates, coordinates, and promotes biomedical research through its institutes and centres.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_004',
        question: 'The National Health Mission (NHM) includes which sub-missions?',
        options: ['NRHM and NUHM', 'MNREGA and PMAY', 'Swachh Bharat and Jal Jeevan', 'Digital India and Skill India'],
        correctAnswer: 0,
        explanation: 'The National Health Mission encompasses the National Rural Health Mission (NRHM) and the National Urban Health Mission (NUHM). It aims to provide accessible, affordable, and quality healthcare to all.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_005',
        question: 'UNICEF primarily works for:',
        options: ['Adult education', 'Children\'s rights and welfare', 'Agricultural development', 'Military cooperation'],
        correctAnswer: 1,
        explanation: 'UNICEF (United Nations Children\'s Fund) works in over 190 countries for children\'s rights, survival, development, and protection. It provides immunization, nutrition, education, and emergency assistance.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_006',
        question: 'Poshan Abhiyaan (National Nutrition Mission) aims to reduce:',
        options: ['Unemployment', 'Malnutrition in children and women', 'Illiteracy', 'Air pollution'],
        correctAnswer: 1,
        explanation: 'POSHAN Abhiyaan (PM\'s Overarching Scheme for Holistic Nutrition), launched in 2018, aims to reduce stunting, undernutrition, anaemia, and low birth weight among children, pregnant women, and lactating mothers.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_007',
        question: 'The Red Cross was founded by:',
        options: ['Florence Nightingale', 'Henry Dunant', 'Louis Pasteur', 'Albert Schweitzer'],
        correctAnswer: 1,
        explanation: 'Henry Dunant, a Swiss businessman, founded the Red Cross in 1863 after witnessing the Battle of Solferino (1859). He received the first Nobel Peace Prize in 1901. The Red Cross provides humanitarian aid worldwide.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_008',
        question: 'Swachh Bharat Mission was launched on which day?',
        options: ['15th August 2014', '26th January 2015', '2nd October 2014', '5th June 2014'],
        correctAnswer: 2,
        explanation: 'Swachh Bharat Mission was launched on October 2, 2014 (Gandhi Jayanti) by PM Modi. It aimed to eliminate open defecation and achieve universal sanitation by October 2, 2019 (Gandhi\'s 150th birth anniversary).',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_009',
        question: 'ASHA workers under NRHM stands for:',
        options: ['Accredited Social Health Advocate', 'Accredited Social Health Activist', 'Association of Social Health Advisors', 'Advanced Social Healthcare Assistant'],
        correctAnswer: 1,
        explanation: 'ASHA (Accredited Social Health Activist) is a community health worker under NRHM. One ASHA per 1,000 population in rural areas acts as a bridge between the community and the public health system.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      },
      {
        id: 'gk_ho_010',
        question: 'India was declared free from which disease by WHO in 2014?',
        options: ['Malaria', 'Polio', 'Tuberculosis', 'Dengue'],
        correctAnswer: 1,
        explanation: 'India was certified polio-free by WHO on March 27, 2014. The last case of polio in India was reported on January 13, 2011. This was achieved through massive Pulse Polio immunization campaigns.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'health_organizations'
      }
    ],

    /* ───────────────────────────────────────────────────────────
       AWARDS & IMPORTANT DATES
       ─────────────────────────────────────────────────────────── */
    awards_important_dates: [
      {
        id: 'gk_ad_001',
        question: 'The Nobel Prize in Physiology or Medicine 2023 was awarded for:',
        options: ['Discovery of CRISPR', 'mRNA vaccine technology (Karikó and Weissman)', 'Cancer immunotherapy', 'Genome sequencing'],
        correctAnswer: 1,
        explanation: 'Katalin Karikó and Drew Weissman received the 2023 Nobel Prize in Physiology or Medicine for their discoveries concerning nucleoside base modifications that enabled the development of effective mRNA vaccines against COVID-19.',
        difficulty: 'hard',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_002',
        question: 'International Nurses Day is celebrated on:',
        options: ['May 1', 'May 12', 'June 5', 'October 24'],
        correctAnswer: 1,
        explanation: 'International Nurses Day is celebrated on May 12, the birth anniversary of Florence Nightingale, the founder of modern nursing. The Florence Nightingale Medal is the highest international distinction a nurse can receive.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_003',
        question: 'The Bharat Ratna is India\'s:',
        options: ['Highest military honour', 'Highest civilian award', 'Sports award', 'Literary award'],
        correctAnswer: 1,
        explanation: 'Bharat Ratna is India\'s highest civilian award, given for exceptional service to the nation. Established in 1954, it is awarded by the President. Recipients include Dr. B.R. Ambedkar, Mother Teresa, and Sachin Tendulkar.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_004',
        question: 'World Health Day is observed on:',
        options: ['March 22', 'April 7', 'June 5', 'December 1'],
        correctAnswer: 1,
        explanation: 'World Health Day is observed on April 7 each year, marking the founding of WHO in 1948. Each year has a specific theme to draw attention to a global health issue.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_005',
        question: 'The Florence Nightingale Award in India is given by:',
        options: ['Indian Nursing Council', 'President of India', 'WHO', 'ICMR'],
        correctAnswer: 1,
        explanation: 'The National Florence Nightingale Award is India\'s highest nursing honour, given by the President of India to outstanding nurses on May 12 (International Nurses Day) each year.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_006',
        question: 'World AIDS Day is observed on:',
        options: ['October 24', 'November 14', 'December 1', 'January 30'],
        correctAnswer: 2,
        explanation: 'World AIDS Day is observed on December 1 every year since 1988. It raises awareness about HIV/AIDS, remembers those who have died, and supports those living with HIV. The Red Ribbon is its symbol.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_007',
        question: 'The Padma awards are given in how many categories?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 1,
        explanation: 'Padma Awards have 3 categories: Padma Vibhushan (exceptional and distinguished service), Padma Bhushan (distinguished service of high order), and Padma Shri (distinguished service). Announced on Republic Day eve.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_008',
        question: 'World Environment Day is celebrated on:',
        options: ['March 22', 'April 22', 'June 5', 'September 16'],
        correctAnswer: 2,
        explanation: 'World Environment Day (June 5) was established by the UN General Assembly in 1972 at the Stockholm Conference. It is the largest global platform for environmental public outreach.',
        difficulty: 'easy',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_009',
        question: 'The Rajiv Gandhi Khel Ratna Award (now Major Dhyan Chand Khel Ratna) is given for:',
        options: ['Literary achievement', 'Scientific research', 'Outstanding performance in sports', 'Social service'],
        correctAnswer: 2,
        explanation: 'The Major Dhyan Chand Khel Ratna Award (renamed in 2021 from Rajiv Gandhi Khel Ratna) is India\'s highest sporting honour. Recipients include Sachin Tendulkar, PV Sindhu, Neeraj Chopra.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      },
      {
        id: 'gk_ad_010',
        question: 'World Tuberculosis Day is observed on:',
        options: ['February 4', 'March 24', 'May 31', 'July 28'],
        correctAnswer: 1,
        explanation: 'World TB Day is observed on March 24 (the day in 1882 when Dr. Robert Koch announced discovery of Mycobacterium tuberculosis). India aims to eliminate TB by 2025, five years ahead of the global 2030 target.',
        difficulty: 'medium',
        subject: 'gk',
        subjectName: 'General Knowledge',
        topicKey: 'awards_important_dates'
      }
    ]
  }
};

// Expose globally
window.QUESTION_BANK = QUESTION_BANK;
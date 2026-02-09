/* ================================================================
   LESSON: Circle Angles
   Covers: Angle at Centre, Semicircle, Same Segment
   ================================================================ */
const LESSON_CIRCLE_ANGLES = {
    id: 'circle-angles',
    title: 'Circle Angles',
    subtitle: 'Centre angle, semicircle, and same segment theorems',
    folder: 'geometry',
    screens: [
        // 1. Concept — Intro to circle theorems
        {
            type: 'concept',
            title: 'Circle Theorem Vocabulary',
            html: '<p>Before we dive into the theorems, let\'s nail down some key terms:</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Arc</strong> — a section of the circumference.</p>' +
                '<p><strong>Chord</strong> — a straight line joining two points on the circle.</p>' +
                '<p><strong>Segment</strong> — the region between a chord and the arc it cuts off.</p>' +
                '<p><strong>Subtended</strong> — an angle is <em>subtended</em> by an arc when its two arms pass through the endpoints of that arc.</p>' +
                '</div>' +
                '<p>Circle theorems describe special angle relationships that always hold true in any circle.</p>'
        },

        // 2. Example — Angle at centre
        {
            type: 'example',
            title: 'Angle at the Centre',
            problem: 'The angle at the circumference is 40\\degree. Find the angle at the centre.',
            steps: [
                { text: '<strong>Theorem:</strong> The angle at the centre is <strong>twice</strong> the angle at the circumference, when both are subtended by the same arc.' },
                { text: 'Angle at centre \\(= 2 \\times 40\\degree\\)' },
                { text: '\\(= 80\\degree\\)' }
            ]
        },

        // 3. Practice — Centre angle
        {
            type: 'practice',
            intro: 'Find the angle at the centre:',
            generate: () => CT.qCentreAngle()
        },

        // 4. Concept — Semicircle
        {
            type: 'concept',
            title: 'Angle in a Semicircle',
            html: '<div class="lesson-box">The angle inscribed in a semicircle is always <strong>90\u00B0</strong>.</div>' +
                '<p>When a triangle is drawn inside a circle with one side as the diameter, the angle opposite the diameter is a right angle.</p>' +
                '<p>This is actually a special case of the centre-angle theorem: the diameter subtends 180\u00B0 at the centre, so the circumference angle is \\(180\\degree \\div 2 = 90\\degree\\).</p>'
        },

        // 5. Example — Semicircle
        {
            type: 'example',
            title: 'Using the Semicircle Theorem',
            problem: 'AB is a diameter. \\angle CAB = 35\\degree. Find \\angle CBA.',
            steps: [
                { text: 'Since AB is a diameter, angle ACB (opposite the diameter) = <strong>90\u00B0</strong>.' },
                { text: 'Angles in a triangle sum to 180\u00B0.' },
                { text: '\\(\\angle CBA = 180\\degree - 90\\degree - 35\\degree = 55\\degree\\)' }
            ]
        },

        // 6. Practice — Semicircle
        {
            type: 'practice',
            intro: 'Find the missing angle:',
            generate: () => CT.qSemicircle()
        },

        // 7. Concept — Same segment
        {
            type: 'concept',
            title: 'Angles in the Same Segment',
            html: '<div class="lesson-box">Angles subtended by the same chord and lying in the same segment are <strong>equal</strong>.</div>' +
                '<p>If two points C and D are on the same arc (same side of chord AB), then \\(\\angle ACB = \\angle ADB\\).</p>' +
                '<p>This follows from the centre-angle theorem: both angles are half the same centre angle.</p>'
        },

        // 8. Example — Same segment
        {
            type: 'example',
            title: 'Same Segment Theorem',
            problem: '\\angle ACB = 50\\degree. C and D are on the same arc. Find \\angle ADB.',
            steps: [
                { text: 'Both angles stand on the same chord AB and are in the same segment.' },
                { text: 'By the same-segment theorem, they are <strong>equal</strong>.' },
                { text: '\\(\\angle ADB = 50\\degree\\)' }
            ]
        },

        // 9. Practice — Same segment
        {
            type: 'practice',
            intro: 'Find the missing angle:',
            generate: () => CT.qSameSegment()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Circle Angles Summary',
            html: '<div class="lesson-box">' +
                '<p><strong>Angle at the Centre:</strong> The centre angle is twice the circumference angle on the same arc.</p>' +
                '<p><strong>Semicircle:</strong> The angle in a semicircle is 90\u00B0.</p>' +
                '<p><strong>Same Segment:</strong> Angles in the same segment are equal.</p>' +
                '</div>' +
                '<p>These three theorems are the foundation of circle geometry. Head to the practice trainer to sharpen your skills!</p>',
            nextActivity: 'geo-circle'
        }
    ]
};

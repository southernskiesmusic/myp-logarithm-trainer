/* ================================================================
   LESSON: Chords & Alternate Segment
   Covers: Alternate Segment Theorem, Chord Bisector
   ================================================================ */
const LESSON_CIRCLE_CHORDS = {
    id: 'circle-chords',
    title: 'Chords & Alternate Segment',
    subtitle: 'Chord bisector and alternate segment theorems',
    folder: 'geometry',
    screens: [
        // 1. Concept — Alternate segment theorem
        {
            type: 'concept',
            title: 'The Alternate Segment Theorem',
            html: '<p>This theorem connects tangents and chords:</p>' +
                '<div class="lesson-box">The angle between a <strong>tangent</strong> and a <strong>chord</strong> at the point of contact equals the <strong>inscribed angle</strong> subtended by the chord in the <em>alternate</em> (opposite) segment.</div>' +
                '<p>In other words, if a tangent at T meets chord TC, the angle between them equals the angle \u2220TDC where D is any point on the arc on the other side of the chord.</p>'
        },

        // 2. Example — Alternate segment
        {
            type: 'example',
            title: 'Alternate Segment Theorem',
            problem: 'The angle between the tangent at T and chord TC is 55\\degree. Find \\angle TDC.',
            steps: [
                { text: 'By the alternate segment theorem, the tangent-chord angle equals the inscribed angle in the other segment.' },
                { text: '\\(\\angle TDC\\) is in the alternate segment.' },
                { text: '\\(\\angle TDC = 55\\degree\\)' }
            ]
        },

        // 3. Practice — Alternate segment
        {
            type: 'practice',
            intro: 'Find the angle in the alternate segment:',
            generate: () => CT.qAlternateSegment()
        },

        // 4. Concept — Perpendicular from centre bisects chord
        {
            type: 'concept',
            title: 'Perpendicular from Centre Bisects a Chord',
            html: '<div class="lesson-box">A line drawn from the centre of a circle <strong>perpendicular</strong> to a chord <strong>bisects</strong> (cuts in half) that chord.</div>' +
                '<p>If O is the centre, M is the foot of the perpendicular on chord AB, and OA = \\(r\\):</p>' +
                '<ul>' +
                '<li>\\(AM = MB\\) (chord is bisected)</li>' +
                '<li>Triangle OMA is right-angled at M</li>' +
                '<li>Use Pythagoras: \\(AM^2 = r^2 - OM^2\\)</li>' +
                '</ul>'
        },

        // 5. Example — Chord bisector
        {
            type: 'example',
            title: 'Finding Half the Chord Length',
            problem: 'Radius = 13, perpendicular distance OM = 5. Find AM.',
            steps: [
                { text: 'Triangle OMA is right-angled at M with hypotenuse OA = 13.' },
                { text: '\\(AM^2 = OA^2 - OM^2 = 13^2 - 5^2 = 169 - 25 = 144\\)' },
                { text: '\\(AM = \\sqrt{144} = 12\\)' }
            ]
        },

        // 6. Practice — Chord bisector
        {
            type: 'practice',
            intro: 'Find the half-chord length:',
            generate: () => CT.qChordBisect()
        },

        // 7. Summary
        {
            type: 'summary',
            title: 'All 8 Circle Theorems',
            html: '<div class="lesson-box">' +
                '<p><strong>1. Angle at Centre:</strong> Centre angle = 2 \u00D7 circumference angle.</p>' +
                '<p><strong>2. Semicircle:</strong> Angle in a semicircle = 90\u00B0.</p>' +
                '<p><strong>3. Same Segment:</strong> Angles in the same segment are equal.</p>' +
                '<p><strong>4. Cyclic Quadrilateral:</strong> Opposite angles sum to 180\u00B0.</p>' +
                '<p><strong>5. Tangent \u22A5 Radius:</strong> Tangent meets radius at 90\u00B0.</p>' +
                '<p><strong>6. Two Tangents:</strong> Tangents from an external point are equal.</p>' +
                '<p><strong>7. Alternate Segment:</strong> Tangent-chord angle = inscribed angle in alternate segment.</p>' +
                '<p><strong>8. Chord Bisector:</strong> Perpendicular from centre bisects the chord.</p>' +
                '</div>' +
                '<p>You now know all 8 circle theorems. Practise applying them in the trainer!</p>',
            nextActivity: 'geo-circle'
        }
    ]
};

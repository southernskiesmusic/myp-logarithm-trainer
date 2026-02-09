/* ================================================================
   LESSON: Tangents & Cyclic Quadrilaterals
   Covers: Cyclic Quadrilateral, Tangent-Radius, Two Tangents
   ================================================================ */
const LESSON_CIRCLE_TANGENTS = {
    id: 'circle-tangents',
    title: 'Tangents & Cyclic Quads',
    subtitle: 'Tangent properties, two tangents, and cyclic quadrilaterals',
    folder: 'geometry',
    screens: [
        // 1. Concept — Cyclic quadrilateral
        {
            type: 'concept',
            title: 'Cyclic Quadrilaterals',
            html: '<p>A <strong>cyclic quadrilateral</strong> has all four vertices on the circumference of a circle.</p>' +
                '<div class="lesson-box"><strong>Opposite angles</strong> of a cyclic quadrilateral sum to <strong>180\u00B0</strong>.<br>' +
                '\\(\\angle A + \\angle C = 180\\degree\\) and \\(\\angle B + \\angle D = 180\\degree\\)</div>' +
                '<p>This works because each pair of opposite angles subtends arcs that together make the full circle (360\u00B0).</p>'
        },

        // 2. Example — Cyclic quad
        {
            type: 'example',
            title: 'Cyclic Quadrilateral',
            problem: 'ABCD is cyclic. \\angle A = 110\\degree. Find \\angle C.',
            steps: [
                { text: 'Opposite angles of a cyclic quadrilateral sum to 180\u00B0.' },
                { text: '\\(\\angle C = 180\\degree - \\angle A\\)' },
                { text: '\\(= 180\\degree - 110\\degree = 70\\degree\\)' }
            ]
        },

        // 3. Practice — Cyclic quad
        {
            type: 'practice',
            intro: 'Find the missing angle:',
            generate: () => CT.qCyclicQuad()
        },

        // 4. Concept — Tangent perpendicular to radius
        {
            type: 'concept',
            title: 'Tangent Meets Radius at 90\u00B0',
            html: '<p>A <strong>tangent</strong> is a line that touches the circle at exactly one point.</p>' +
                '<div class="lesson-box">A tangent to a circle is <strong>perpendicular</strong> to the radius at the point of contact.<br>' +
                'That is, the angle between the tangent and the radius is always <strong>90\u00B0</strong>.</div>' +
                '<p>This gives us a right angle to work with whenever a tangent and radius meet.</p>'
        },

        // 5. Example — Tangent-radius
        {
            type: 'example',
            title: 'Tangent-Radius Right Angle',
            problem: 'PT is a tangent at T. The angle between OT extended and line OP is 35\\degree. Find the angle between the tangent and OP.',
            steps: [
                { text: 'The tangent PT is perpendicular to radius OT, so \\(\\angle OTP = 90\\degree\\).' },
                { text: 'The angle between the tangent and OP = \\(90\\degree - 35\\degree\\).' },
                { text: '\\(= 55\\degree\\)' }
            ]
        },

        // 6. Practice — Tangent-radius
        {
            type: 'practice',
            intro: 'Find the missing angle:',
            generate: () => CT.qTangentRadius()
        },

        // 7. Concept — Two tangents
        {
            type: 'concept',
            title: 'Two Tangents from an External Point',
            html: '<div class="lesson-box">Tangents drawn to a circle from the same external point are <strong>equal in length</strong>.</div>' +
                '<p>If P is outside the circle with centre O and radius \\(r\\), and tangents PT\u2081 and PT\u2082 touch the circle:</p>' +
                '<ul>' +
                '<li>\\(PT_1 = PT_2\\)</li>' +
                '<li>Each tangent makes a right angle with the radius: \\(\\angle OT_1P = \\angle OT_2P = 90\\degree\\)</li>' +
                '<li>Use Pythagoras: \\(PT^2 = OP^2 - r^2\\)</li>' +
                '</ul>'
        },

        // 8. Example — Two tangents Pythagoras
        {
            type: 'example',
            title: 'Two Tangents with Pythagoras',
            problem: 'Radius = 5, OP = 13. Find the tangent length PT.',
            steps: [
                { text: 'The tangent is perpendicular to the radius, forming a right triangle OTP.' },
                { text: '\\(PT^2 = OP^2 - OT^2 = 13^2 - 5^2 = 169 - 25 = 144\\)' },
                { text: '\\(PT = \\sqrt{144} = 12\\)' }
            ]
        },

        // 9. Practice — Two tangents
        {
            type: 'practice',
            intro: 'Find the tangent length:',
            generate: () => CT.qTwoTangents()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Tangents & Cyclic Quads Summary',
            html: '<div class="lesson-box">' +
                '<p><strong>Cyclic Quadrilateral:</strong> Opposite angles sum to 180\u00B0.</p>' +
                '<p><strong>Tangent \u22A5 Radius:</strong> A tangent meets the radius at 90\u00B0.</p>' +
                '<p><strong>Two Tangents:</strong> Tangents from an external point are equal. Use Pythagoras with the right triangle.</p>' +
                '</div>' +
                '<p>These theorems appear frequently in exam questions. Practise spotting right angles and equal lengths!</p>',
            nextActivity: 'geo-circle'
        }
    ]
};

/* ================================================================
   LESSON: Quadratic Functions
   ================================================================ */
const LESSON_QUADRATIC_FUNC = {
    id: 'quadratic-func',
    title: 'Quadratic Functions',
    subtitle: 'Parabolas, vertex, and discriminant',
    folder: 'functions',
    screens: [
        // 1. Concept: The parabola
        {
            type: 'concept',
            title: 'The Parabola',
            html: '<p>A <strong>quadratic function</strong> has the general form:</p>' +
                '<div class="lesson-box">\\(y = ax^2 + bx + c\\)</div>' +
                '<p>Its graph is called a <strong>parabola</strong> — a smooth, symmetric U-shaped curve.</p>' +
                '<p>The coefficient \\(a\\) controls the direction:</p>' +
                '<ul>' +
                '<li>If \\(a > 0\\), the parabola opens <strong>upward</strong> (a "valley" shape).</li>' +
                '<li>If \\(a < 0\\), the parabola opens <strong>downward</strong> (a "hill" shape).</li>' +
                '</ul>' +
                '<p>The larger \\(|a|\\) is, the narrower the parabola. The smaller \\(|a|\\) is, the wider it becomes.</p>'
        },

        // 2. Example: Determine direction
        {
            type: 'example',
            title: 'Which Way Does It Open?',
            problem: 'y = -2x^2 + 3x - 1',
            steps: [
                { text: 'Identify the coefficient of \\(x^2\\): here \\(a = -2\\).' },
                { text: 'Since \\(a = -2 < 0\\), the parabola opens <strong>downward</strong>.' },
                { text: 'The graph has a maximum turning point (a "hill" shape).' },
                { text: 'Because \\(|a| = 2 > 1\\), the parabola is narrower than \\(y = x^2\\).' }
            ]
        },

        // 3. Practice: Direction of parabola
        {
            type: 'practice',
            intro: 'Determine which direction the parabola opens:',
            generate: () => QUADF.qDirection()
        },

        // 4. Concept: Vertex and axis of symmetry
        {
            type: 'concept',
            title: 'Vertex and Axis of Symmetry',
            html: '<p>The <strong>vertex</strong> is the turning point of the parabola — the highest or lowest point.</p>' +
                '<p>The <strong>axis of symmetry</strong> is the vertical line through the vertex. Its equation is:</p>' +
                '<div class="lesson-box">\\(x = -\\dfrac{b}{2a}\\)</div>' +
                '<p>To find the full vertex \\((h, k)\\):</p>' +
                '<ol>' +
                '<li>Calculate \\(h = -\\dfrac{b}{2a}\\)</li>' +
                '<li>Substitute \\(h\\) back into the equation to find \\(k = a h^2 + b h + c\\)</li>' +
                '</ol>' +
                '<p>The vertex is \\((h,\\, k)\\).</p>'
        },

        // 5. Example: Find the vertex
        {
            type: 'example',
            title: 'Finding the Vertex',
            problem: 'y = x^2 - 6x + 5',
            steps: [
                { text: 'Identify \\(a = 1\\), \\(b = -6\\), \\(c = 5\\).' },
                { text: 'Axis of symmetry: \\(x = -\\dfrac{-6}{2(1)} = \\dfrac{6}{2} = 3\\).' },
                { text: 'Substitute \\(x = 3\\): \\(y = (3)^2 - 6(3) + 5 = 9 - 18 + 5 = -4\\).' },
                { text: 'The vertex is \\((3,\\, -4)\\). Since \\(a = 1 > 0\\), this is a minimum point.' }
            ]
        },

        // 6. Practice: Axis of symmetry
        {
            type: 'practice',
            intro: 'Find the axis of symmetry for the given quadratic:',
            generate: () => QUADF.qAxisSymmetry()
        },

        // 7. Concept: The discriminant
        {
            type: 'concept',
            title: 'The Discriminant',
            html: '<p>The <strong>discriminant</strong> tells you how many real roots (x-intercepts) a quadratic has:</p>' +
                '<div class="lesson-box">\\(\\Delta = b^2 - 4ac\\)</div>' +
                '<ul>' +
                '<li>If \\(\\Delta > 0\\): <strong>two distinct</strong> real roots (the parabola crosses the x-axis twice).</li>' +
                '<li>If \\(\\Delta = 0\\): <strong>one repeated</strong> real root (the parabola touches the x-axis at the vertex).</li>' +
                '<li>If \\(\\Delta < 0\\): <strong>no real roots</strong> (the parabola does not cross the x-axis).</li>' +
                '</ul>' +
                '<p>The discriminant comes from the quadratic formula: \\(x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}\\). When \\(\\Delta < 0\\), the square root is undefined in the reals.</p>'
        },

        // 8. Example: Evaluate the discriminant
        {
            type: 'example',
            title: 'How Many Real Roots?',
            problem: 'x^2 + 2x + 5',
            steps: [
                { text: 'Identify \\(a = 1\\), \\(b = 2\\), \\(c = 5\\).' },
                { text: 'Calculate \\(\\Delta = b^2 - 4ac = (2)^2 - 4(1)(5) = 4 - 20 = -16\\).' },
                { text: 'Since \\(\\Delta = -16 < 0\\), there are <strong>no real roots</strong>.' },
                { text: 'The parabola opens upward (\\(a > 0\\)) and sits entirely above the x-axis.' }
            ]
        },

        // 9. Practice: Discriminant
        {
            type: 'practice',
            intro: 'Calculate the discriminant and determine the number of real roots:',
            generate: () => QUADF.qDiscriminant()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Quadratic Functions — Key Formulas',
            html: '<div class="lesson-box">' +
                '<p><strong>Standard form:</strong> \\(y = ax^2 + bx + c\\)</p>' +
                '<p><strong>Direction:</strong> \\(a > 0\\) opens up, \\(a < 0\\) opens down</p>' +
                '<p><strong>Axis of symmetry:</strong> \\(x = -\\dfrac{b}{2a}\\)</p>' +
                '<p><strong>Discriminant:</strong> \\(\\Delta = b^2 - 4ac\\)</p>' +
                '<p style="margin-left:1em;">\\(\\Delta > 0\\): 2 roots &emsp; \\(\\Delta = 0\\): 1 root &emsp; \\(\\Delta < 0\\): 0 roots</p>' +
                '</div>' +
                '<p>You can now analyse parabolas — their direction, vertex, and number of roots. Head to the Quadratic Functions trainer to practise!</p>',
            nextActivity: 'func-quadratic'
        }
    ]
};

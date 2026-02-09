/* ================================================================
   LESSON: Graph Transformations
   ================================================================ */
const LESSON_TRANSFORMATIONS = {
    id: 'transformations',
    title: 'Graph Transformations',
    subtitle: 'Shifts, reflections, and stretches',
    folder: 'functions',
    screens: [
        // 1. Concept: Vertical translations
        {
            type: 'concept',
            title: 'Vertical Translations',
            html: '<p>Adding or subtracting a constant <strong>outside</strong> the function shifts the graph <strong>vertically</strong>:</p>' +
                '<div class="lesson-box">\\(f(x) + a\\) &nbsp; shifts the graph <strong>up</strong> by \\(a\\) units<br>' +
                '\\(f(x) - a\\) &nbsp; shifts the graph <strong>down</strong> by \\(a\\) units</div>' +
                '<p>This is intuitive — you are adding to every \\(y\\)-value, so every point moves up (or down).</p>' +
                '<p>The shape of the graph stays exactly the same; only its vertical position changes.</p>'
        },

        // 2. Example: Vertical shift
        {
            type: 'example',
            title: 'Shifting a Parabola Up',
            problem: 'f(x) = x^2 \\quad \\longrightarrow \\quad f(x) + 3 = x^2 + 3',
            steps: [
                { text: 'The original graph is \\(y = x^2\\), a parabola with vertex at \\((0,\\, 0)\\).' },
                { text: 'We add \\(3\\) outside the function: \\(y = x^2 + 3\\).' },
                { text: 'Every point moves <strong>up 3 units</strong>. The vertex is now at \\((0,\\, 3)\\).' },
                { text: 'The shape and width of the parabola are unchanged.' }
            ]
        },

        // 3. Practice: Vertical shift
        {
            type: 'practice',
            intro: 'Describe the vertical translation applied to the function:',
            generate: () => TRANS.qVerticalShift()
        },

        // 4. Concept: Horizontal translations
        {
            type: 'concept',
            title: 'Horizontal Translations',
            html: '<p>Adding or subtracting a constant <strong>inside</strong> the function shifts the graph <strong>horizontally</strong>:</p>' +
                '<div class="lesson-box">\\(f(x + a)\\) &nbsp; shifts the graph <strong>left</strong> by \\(a\\) units<br>' +
                '\\(f(x - a)\\) &nbsp; shifts the graph <strong>right</strong> by \\(a\\) units</div>' +
                '<p><strong>Watch out!</strong> The direction is the <em>opposite</em> of what you might expect:</p>' +
                '<ul>' +
                '<li>\\(f(x - 2)\\): the "\\(-2\\)" inside means shift <strong>right</strong> 2.</li>' +
                '<li>\\(f(x + 4)\\): the "\\(+4\\)" inside means shift <strong>left</strong> 4.</li>' +
                '</ul>' +
                '<p>Think of it this way: \\(f(x - 2) = 0\\) when \\(x = 2\\), so the "action" happens 2 units to the right of where it used to.</p>'
        },

        // 5. Example: Horizontal shift
        {
            type: 'example',
            title: 'Shifting a Parabola Right',
            problem: 'f(x) = x^2 \\quad \\longrightarrow \\quad f(x - 2) = (x - 2)^2',
            steps: [
                { text: 'The original graph is \\(y = x^2\\), with vertex at \\((0,\\, 0)\\).' },
                { text: 'We replace \\(x\\) with \\((x - 2)\\) inside the function: \\(y = (x-2)^2\\).' },
                { text: 'The "\\(-2\\)" inside the brackets means shift <strong>right 2 units</strong>.' },
                { text: 'The vertex moves from \\((0,\\, 0)\\) to \\((2,\\, 0)\\). Shape is unchanged.' }
            ]
        },

        // 6. Practice: Horizontal shift
        {
            type: 'practice',
            intro: 'Describe the horizontal translation applied to the function:',
            generate: () => TRANS.qHorizontalShift()
        },

        // 7. Concept: Reflections
        {
            type: 'concept',
            title: 'Reflections',
            html: '<p>There are two basic reflections to know:</p>' +
                '<div class="lesson-box">\\(-f(x)\\) &nbsp; reflects the graph in the <strong>x-axis</strong> (flip vertically)<br>' +
                '\\(f(-x)\\) &nbsp; reflects the graph in the <strong>y-axis</strong> (flip horizontally)</div>' +
                '<p><strong>Reflection in the x-axis</strong> \\(-f(x)\\): every \\(y\\)-value is negated. Points above the x-axis go below, and vice versa.</p>' +
                '<p><strong>Reflection in the y-axis</strong> \\(f(-x)\\): every \\(x\\)-value is negated. The left and right sides of the graph swap.</p>' +
                '<p>Remember: the negative sign <em>outside</em> flips over the x-axis; the negative sign <em>inside</em> flips over the y-axis.</p>'
        },

        // 8. Example: Reflection in x-axis
        {
            type: 'example',
            title: 'Reflecting in the x-Axis',
            problem: 'f(x) = x^2 \\quad \\longrightarrow \\quad -f(x) = -x^2',
            steps: [
                { text: 'The original graph is \\(y = x^2\\), opening upward with vertex at \\((0,\\, 0)\\).' },
                { text: 'Applying \\(-f(x)\\) negates every output: \\(y = -x^2\\).' },
                { text: 'The parabola is <strong>flipped upside down</strong> — it now opens downward.' },
                { text: 'The vertex stays at \\((0,\\, 0)\\) since \\(-0 = 0\\). Points like \\((2,\\, 4)\\) become \\((2,\\, -4)\\).' }
            ]
        },

        // 9. Practice: Reflections
        {
            type: 'practice',
            intro: 'Identify the type of reflection applied to the function:',
            generate: () => TRANS.qReflectX()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Graph Transformations — Summary',
            html: '<div class="lesson-box">' +
                '<table style="width:100%; text-align:left; border-collapse:collapse;">' +
                '<tr><th style="padding:4px 8px;">Transformation</th><th style="padding:4px 8px;">Notation</th><th style="padding:4px 8px;">Effect</th></tr>' +
                '<tr><td style="padding:4px 8px;">Shift up</td><td style="padding:4px 8px;">\\(f(x) + a\\)</td><td style="padding:4px 8px;">Up \\(a\\) units</td></tr>' +
                '<tr><td style="padding:4px 8px;">Shift down</td><td style="padding:4px 8px;">\\(f(x) - a\\)</td><td style="padding:4px 8px;">Down \\(a\\) units</td></tr>' +
                '<tr><td style="padding:4px 8px;">Shift left</td><td style="padding:4px 8px;">\\(f(x + a)\\)</td><td style="padding:4px 8px;">Left \\(a\\) units</td></tr>' +
                '<tr><td style="padding:4px 8px;">Shift right</td><td style="padding:4px 8px;">\\(f(x - a)\\)</td><td style="padding:4px 8px;">Right \\(a\\) units</td></tr>' +
                '<tr><td style="padding:4px 8px;">Reflect in x-axis</td><td style="padding:4px 8px;">\\(-f(x)\\)</td><td style="padding:4px 8px;">Flip vertically</td></tr>' +
                '<tr><td style="padding:4px 8px;">Reflect in y-axis</td><td style="padding:4px 8px;">\\(f(-x)\\)</td><td style="padding:4px 8px;">Flip horizontally</td></tr>' +
                '</table>' +
                '</div>' +
                '<p>You now know how vertical shifts, horizontal shifts, and reflections transform a graph. Head to the Transformations trainer to practise!</p>',
            nextActivity: 'func-transform'
        }
    ]
};

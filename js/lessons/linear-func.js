/* ================================================================
   LESSON: Linear Functions
   ================================================================ */
const LESSON_LINEAR_FUNC = {
    id: 'linear-func',
    title: 'Linear Functions',
    subtitle: 'Gradient, y-intercept, and equation of a line',
    folder: 'functions',
    screens: [
        // 1. Concept: y = mx + c
        {
            type: 'concept',
            title: 'The Equation of a Straight Line',
            html: '<p>Every straight line can be written in <strong>gradient-intercept form</strong>:</p>' +
                '<div class="lesson-box">\\(y = mx + c\\)</div>' +
                '<p>Here, \\(m\\) is the <strong>gradient</strong> (slope) of the line — it tells you how steep it is and whether it rises or falls.</p>' +
                '<p>\\(c\\) is the <strong>y-intercept</strong> — the point where the line crosses the y-axis (i.e. when \\(x = 0\\)).</p>' +
                '<p>If \\(m > 0\\) the line slopes upward (left to right). If \\(m < 0\\) it slopes downward.</p>'
        },

        // 2. Example: Identify m and c
        {
            type: 'example',
            title: 'Reading Gradient and y-Intercept',
            problem: 'y = 3x - 2',
            steps: [
                { text: 'Compare with \\(y = mx + c\\).' },
                { text: 'The coefficient of \\(x\\) is \\(3\\), so the gradient is \\(m = 3\\).' },
                { text: 'The constant term is \\(-2\\), so the y-intercept is \\(c = -2\\).' },
                { text: 'The line rises steeply (3 units up for every 1 unit right) and crosses the y-axis at \\((0,\\,-2)\\).' }
            ]
        },

        // 3. Practice: Gradient from equation
        {
            type: 'practice',
            intro: 'Identify the gradient from the equation of the line:',
            generate: () => LINF.qGradientFromEq()
        },

        // 4. Concept: Gradient from two points
        {
            type: 'concept',
            title: 'Gradient from Two Points',
            html: '<p>If you know two points on a line, you can calculate the gradient using:</p>' +
                '<div class="lesson-box">\\(m = \\dfrac{y_2 - y_1}{x_2 - x_1} = \\dfrac{\\text{rise}}{\\text{run}}\\)</div>' +
                '<p>The <strong>rise</strong> is the vertical change (difference in \\(y\\)-values) and the <strong>run</strong> is the horizontal change (difference in \\(x\\)-values).</p>' +
                '<p>It doesn\'t matter which point you call \\((x_1, y_1)\\) and which you call \\((x_2, y_2)\\), as long as you are consistent in the numerator and denominator.</p>'
        },

        // 5. Example: Gradient from two points
        {
            type: 'example',
            title: 'Finding the Gradient Between Two Points',
            problem: '\\text{Points } (1,\\, 3) \\text{ and } (4,\\, 12)',
            steps: [
                { text: 'Use the formula \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1}\\).' },
                { text: 'Substitute: \\(m = \\dfrac{12 - 3}{4 - 1}\\).' },
                { text: 'Simplify: \\(m = \\dfrac{9}{3} = 3\\).' },
                { text: 'The gradient is \\(3\\), so the line rises 3 units for every 1 unit to the right.' }
            ]
        },

        // 6. Practice: Gradient from two points
        {
            type: 'practice',
            intro: 'Calculate the gradient between the two given points:',
            generate: () => LINF.qGradientTwoPoints()
        },

        // 7. Concept: Parallel and perpendicular lines
        {
            type: 'concept',
            title: 'Parallel and Perpendicular Lines',
            html: '<p><strong>Parallel lines</strong> have the <em>same</em> gradient:</p>' +
                '<div class="lesson-box">\\(\\text{Parallel:} \\quad m_1 = m_2\\)</div>' +
                '<p>For example, \\(y = 2x + 1\\) and \\(y = 2x - 5\\) are parallel because both have gradient \\(2\\).</p>' +
                '<p><strong>Perpendicular lines</strong> have gradients that multiply to \\(-1\\):</p>' +
                '<div class="lesson-box">\\(\\text{Perpendicular:} \\quad m_1 \\times m_2 = -1\\)</div>' +
                '<p>Equivalently, the perpendicular gradient is the <strong>negative reciprocal</strong>: if \\(m_1 = \\dfrac{a}{b}\\) then \\(m_2 = -\\dfrac{b}{a}\\).</p>'
        },

        // 8. Example: Perpendicular gradient
        {
            type: 'example',
            title: 'Finding a Perpendicular Gradient',
            problem: 'y = 2x + 1',
            steps: [
                { text: 'The gradient of the given line is \\(m_1 = 2\\).' },
                { text: 'For a perpendicular line, \\(m_1 \\times m_2 = -1\\), so \\(m_2 = \\dfrac{-1}{m_1}\\).' },
                { text: 'Substitute: \\(m_2 = \\dfrac{-1}{2} = -\\dfrac{1}{2}\\).' },
                { text: 'Any line with gradient \\(-\\dfrac{1}{2}\\) is perpendicular to \\(y = 2x + 1\\).' }
            ]
        },

        // 9. Practice: Parallel / perpendicular
        {
            type: 'practice',
            intro: 'Find the gradient of a line parallel or perpendicular to the given line:',
            generate: () => LINF.qParallel()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Linear Functions — Key Formulas',
            html: '<div class="lesson-box">' +
                '<p><strong>Equation of a line:</strong> \\(y = mx + c\\)</p>' +
                '<p><strong>Gradient from two points:</strong> \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1}\\)</p>' +
                '<p><strong>Parallel lines:</strong> \\(m_1 = m_2\\)</p>' +
                '<p><strong>Perpendicular lines:</strong> \\(m_1 \\times m_2 = -1\\)</p>' +
                '</div>' +
                '<p>You can now identify gradients and y-intercepts, calculate gradients from coordinates, and determine parallel and perpendicular relationships. Head to the Linear Functions trainer to practise!</p>',
            nextActivity: 'func-linear'
        }
    ]
};

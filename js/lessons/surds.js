/* ================================================================
   LESSON: Surds
   ================================================================ */
const LESSON_SURDS = {
    id: 'surds',
    title: 'Surds',
    subtitle: 'Simplifying, operations, and rationalising',
    folder: 'number',
    screens: [
        // 1. What is a surd?
        {
            type: 'concept',
            title: 'What is a Surd?',
            html: '<p>A <strong>surd</strong> is a root that cannot be simplified to a whole number. For example:</p>' +
                '<p>\\(\\sqrt{4} = 2\\) — <em>not</em> a surd (simplifies to a whole number)</p>' +
                '<p>\\(\\sqrt{2} = 1.4142\\ldots\\) — <strong>is</strong> a surd (irrational, never terminates)</p>' +
                '<div class="lesson-box">Surds are <strong>exact</strong> values. Writing \\(\\sqrt{2}\\) is more precise than writing \\(1.414\\).</div>' +
                '<p>Common surds: \\(\\sqrt{2}\\), \\(\\sqrt{3}\\), \\(\\sqrt{5}\\), \\(\\sqrt{7}\\), \\(\\sqrt{11}\\), etc.</p>'
        },

        // 2. Worked example: Simplify √72
        {
            type: 'example',
            title: 'Simplifying Surds',
            problem: '\\sqrt{72}',
            steps: [
                { text: 'Find the largest square number that divides into 72.' },
                { text: '\\(72 = 36 \\times 2\\), and \\(36 = 6^2\\) is a perfect square.' },
                { text: '\\(\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}\\)' }
            ]
        },

        // 3. Practice: Simplify a surd
        {
            type: 'practice',
            intro: 'Simplify the surd — give the number outside the root:',
            generate: () => SURD.qSimplify()
        },

        // 4. Adding and subtracting surds
        {
            type: 'concept',
            title: 'Adding and Subtracting Surds',
            html: '<p>You can only add or subtract surds with the <strong>same</strong> number under the root (like collecting like terms):</p>' +
                '<div class="lesson-box">\\(a\\sqrt{n} + b\\sqrt{n} = (a+b)\\sqrt{n}\\)</div>' +
                '<p><strong>Example:</strong> \\(3\\sqrt{5} + 7\\sqrt{5} = 10\\sqrt{5}\\)</p>' +
                '<p><strong>Cannot simplify:</strong> \\(2\\sqrt{3} + 4\\sqrt{7}\\) — different surds, leave as is.</p>'
        },

        // 5. Worked example: 3√5 + 2√5
        {
            type: 'example',
            title: 'Adding Like Surds',
            problem: '3\\sqrt{5} + 2\\sqrt{5}',
            steps: [
                { text: 'Both terms have \\(\\sqrt{5}\\), so they are <strong>like surds</strong>.' },
                { text: 'Add the coefficients: \\(3 + 2 = 5\\)' },
                { text: '\\(3\\sqrt{5} + 2\\sqrt{5} = 5\\sqrt{5}\\)' }
            ]
        },

        // 6. Practice: Add/subtract surds
        {
            type: 'practice',
            intro: 'Simplify — give the coefficient:',
            generate: () => SURD.qAdd()
        },

        // 7. Multiplying surds and rationalising
        {
            type: 'concept',
            title: 'Rationalising the Denominator',
            html: '<p>When a surd appears in a denominator, we <strong>rationalise</strong> — multiply top and bottom to remove it:</p>' +
                '<div class="lesson-box">\\(\\dfrac{a}{\\sqrt{b}} = \\dfrac{a}{\\sqrt{b}} \\times \\dfrac{\\sqrt{b}}{\\sqrt{b}} = \\dfrac{a\\sqrt{b}}{b}\\)</div>' +
                '<p><strong>Example:</strong> \\(\\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}\\)</p>' +
                '<p>For expressions like \\(\\dfrac{1}{a + \\sqrt{b}}\\), multiply by the <strong>conjugate</strong> \\(a - \\sqrt{b}\\).</p>'
        },

        // 8. Worked example: Rationalise 1/√3
        {
            type: 'example',
            title: 'Rationalising a Simple Denominator',
            problem: '\\frac{1}{\\sqrt{3}}',
            steps: [
                { text: 'Multiply top and bottom by \\(\\sqrt{3}\\):' },
                { text: '\\(\\dfrac{1}{\\sqrt{3}} \\times \\dfrac{\\sqrt{3}}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{\\sqrt{3} \\times \\sqrt{3}}\\)' },
                { text: '\\(= \\dfrac{\\sqrt{3}}{3}\\). The denominator is now rational.' }
            ]
        },

        // 9. Practice: Rationalise
        {
            type: 'practice',
            intro: 'Rationalise the denominator:',
            generate: () => SURD.qRationalise()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Key Rules for Surds',
            html: '<div class="lesson-box">' +
                '<p><strong>Simplify:</strong> \\(\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}\\)</p>' +
                '<p><strong>Add/Subtract:</strong> \\(a\\sqrt{n} \\pm b\\sqrt{n} = (a \\pm b)\\sqrt{n}\\)</p>' +
                '<p><strong>Multiply:</strong> \\(\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}\\)</p>' +
                '<p><strong>Rationalise:</strong> \\(\\dfrac{a}{\\sqrt{b}} = \\dfrac{a\\sqrt{b}}{b}\\)</p>' +
                '</div>' +
                '<p>Surds keep your answers exact. Master these rules and you\'ll handle them with ease!</p>',
            nextActivity: 'num-surds'
        }
    ]
};

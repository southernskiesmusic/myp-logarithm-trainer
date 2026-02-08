/* ================================================================
   LESSON: Expanding & Condensing Log Expressions
   ================================================================ */
const LESSON_LOG_EXPAND = {
    id: 'log-expand',
    title: 'Expanding & Condensing',
    subtitle: 'Using log rules to rewrite expressions',
    folder: 'logarithms',
    screens: [
        // 1. Expanding — what and why
        {
            type: 'concept',
            title: 'Expanding Logarithmic Expressions',
            html: '<p><strong>Expanding</strong> means breaking a single log into a sum/difference of simpler logs using the three rules:</p>' +
                '<div class="lesson-box">' +
                '<p>\\(\\log(mn) = \\log(m) + \\log(n)\\) &nbsp; (Product)</p>' +
                '<p>\\(\\log\\!\\left(\\dfrac{m}{n}\\right) = \\log(m) - \\log(n)\\) &nbsp; (Quotient)</p>' +
                '<p>\\(\\log(m^k) = k\\log(m)\\) &nbsp; (Power)</p>' +
                '</div>' +
                '<p>Apply them in order: split products/quotients first, then bring down powers.</p>'
        },

        // 2. Worked example: Expand
        {
            type: 'example',
            title: 'Expanding a Complex Expression',
            problem: '\\log_2\\!\\left(\\dfrac{x^3 \\cdot y}{z^2}\\right)',
            steps: [
                { text: 'Split the fraction using the Quotient Rule: \\(\\log_2(x^3 \\cdot y) - \\log_2(z^2)\\)' },
                { text: 'Split the product using the Product Rule: \\(\\log_2(x^3) + \\log_2(y) - \\log_2(z^2)\\)' },
                { text: 'Bring down exponents using the Power Rule: \\(3\\log_2(x) + \\log_2(y) - 2\\log_2(z)\\)' }
            ]
        },

        // 3. Practice: Expand
        {
            type: 'practice',
            intro: 'Expand fully:',
            generate: () => pick([LA.qExpandTwo, LA.qExpandThree, LA.qExpandComplex])()
        },

        // 4. Condensing — the reverse
        {
            type: 'concept',
            title: 'Condensing Logarithmic Expressions',
            html: '<p><strong>Condensing</strong> is the reverse of expanding — combine multiple logs into one:</p>' +
                '<div class="lesson-box">' +
                '<p>\\(\\log(m) + \\log(n) = \\log(mn)\\)</p>' +
                '<p>\\(\\log(m) - \\log(n) = \\log\\!\\left(\\dfrac{m}{n}\\right)\\)</p>' +
                '<p>\\(k\\log(m) = \\log(m^k)\\)</p>' +
                '</div>' +
                '<p>Apply them in reverse order: move coefficients up as exponents first, then combine products/quotients.</p>'
        },

        // 5. Worked example: Condense
        {
            type: 'example',
            title: 'Condensing an Expression',
            problem: '2\\log_3(x) + \\log_3(y) - 3\\log_3(z)',
            steps: [
                { text: 'Move coefficients up as exponents: \\(\\log_3(x^2) + \\log_3(y) - \\log_3(z^3)\\)' },
                { text: 'Combine the sum using the Product Rule: \\(\\log_3(x^2 \\cdot y) - \\log_3(z^3)\\)' },
                { text: 'Combine the difference using the Quotient Rule: \\(\\log_3\\!\\left(\\dfrac{x^2 \\cdot y}{z^3}\\right)\\)' }
            ]
        },

        // 6. Practice: Condense
        {
            type: 'practice',
            intro: 'Write as a single logarithm:',
            generate: () => pick([LA.qCondenseTwo, LA.qCondenseThree, LA.qCondenseComplex])()
        },

        // 7. Combining rules with numbers
        {
            type: 'concept',
            title: 'Combining Multiple Rules',
            html: '<p>When an expression mixes <strong>numbers</strong> with log rules, evaluate what you can:</p>' +
                '<div class="lesson-box">\\(\\log_2(8) + \\log_2(4) = 3 + 2 = 5\\)</div>' +
                '<p>Or use the rules first: \\(\\log_2(8) + \\log_2(4) = \\log_2(32) = 5\\). Same answer!</p>' +
                '<p>Choose whichever approach is simpler for the given problem.</p>'
        },

        // 8. Worked example: Multi-step
        {
            type: 'example',
            title: 'Multi-Step Evaluation',
            problem: '3 \\cdot \\log_2(4) - \\log_2(8)',
            steps: [
                { text: 'Evaluate each log: \\(\\log_2(4) = 2\\) and \\(\\log_2(8) = 3\\).' },
                { text: 'Substitute: \\(3 \\times 2 - 3 = 6 - 3\\).' },
                { text: '\\(= 3\\).' }
            ]
        },

        // 9. Practice: Multi-step
        {
            type: 'practice',
            intro: 'Evaluate:',
            generate: () => pick([LA.qMultiStep2, LA.qMultiStep3])()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Expanding & Condensing Summary',
            html: '<div class="lesson-box">' +
                '<p><strong>Expand:</strong> Split products/quotients, bring down powers.</p>' +
                '<p><strong>Condense:</strong> Move coefficients up, combine sums/differences.</p>' +
                '<p><strong>Evaluate:</strong> Compute individual logs when possible.</p>' +
                '</div>' +
                '<p>These skills are essential for solving logarithmic equations, which you\'ll learn next!</p>',
            nextActivity: 'log-mastery'
        }
    ]
};

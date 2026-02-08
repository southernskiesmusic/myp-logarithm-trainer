/* ================================================================
   LESSON: Log Rules (Product, Quotient, Power)
   ================================================================ */
const LESSON_LOG_RULES = {
    id: 'log-rules-lesson',
    title: 'Log Rules',
    subtitle: 'Product, quotient, and power rules',
    folder: 'logarithms',
    screens: [
        // 1. Product Rule
        {
            type: 'concept',
            title: 'The Product Rule',
            html: '<p>When you <strong>add</strong> two logarithms with the same base, you can combine them into one:</p>' +
                '<div class="lesson-box">\\(\\log_b(m) + \\log_b(n) = \\log_b(m \\times n)\\)</div>' +
                '<p><strong>Example:</strong> \\(\\log_2(3) + \\log_2(5) = \\log_2(15)\\)</p>' +
                '<p>Think of it as: <em>adding logs = multiplying arguments</em>.</p>'
        },

        // 2. Worked example: Product Rule
        {
            type: 'example',
            title: 'Product Rule Example',
            problem: '\\log_3(4) + \\log_3(9)',
            steps: [
                { text: 'Both logs have base 3, so we can use the Product Rule.' },
                { text: 'Multiply the arguments: \\(4 \\times 9 = 36\\)' },
                { text: '\\(\\log_3(4) + \\log_3(9) = \\log_3(36)\\)' }
            ]
        },

        // 3. Practice: Product Rule
        {
            type: 'practice',
            intro: 'Simplify using the Product Rule:',
            generate: () => LA.qProductForward()
        },

        // 4. Quotient Rule
        {
            type: 'concept',
            title: 'The Quotient Rule',
            html: '<p>When you <strong>subtract</strong> two logarithms with the same base, you divide the arguments:</p>' +
                '<div class="lesson-box">\\(\\log_b(m) - \\log_b(n) = \\log_b\\!\\left(\\dfrac{m}{n}\\right)\\)</div>' +
                '<p><strong>Example:</strong> \\(\\log_5(20) - \\log_5(4) = \\log_5(5) = 1\\)</p>' +
                '<p>Think of it as: <em>subtracting logs = dividing arguments</em>.</p>'
        },

        // 5. Worked example: Quotient Rule
        {
            type: 'example',
            title: 'Quotient Rule Example',
            problem: '\\log_2(24) - \\log_2(3)',
            steps: [
                { text: 'Both logs have base 2, so we can use the Quotient Rule.' },
                { text: 'Divide the arguments: \\(24 \\div 3 = 8\\)' },
                { text: '\\(\\log_2(24) - \\log_2(3) = \\log_2(8) = 3\\)' }
            ]
        },

        // 6. Practice: Quotient Rule
        {
            type: 'practice',
            intro: 'Simplify using the Quotient Rule:',
            generate: () => LA.qQuotientForward()
        },

        // 7. Power Rule
        {
            type: 'concept',
            title: 'The Power Rule',
            html: '<p>A coefficient in front of a log can be moved <strong>inside</strong> as an exponent:</p>' +
                '<div class="lesson-box">\\(k \\cdot \\log_b(m) = \\log_b(m^k)\\)</div>' +
                '<p><strong>Example:</strong> \\(3\\log_2(4) = \\log_2(4^3) = \\log_2(64) = 6\\)</p>' +
                '<p>This works in reverse too: an exponent inside a log can come out as a coefficient.</p>'
        },

        // 8. Worked example: Power Rule
        {
            type: 'example',
            title: 'Power Rule Example',
            problem: '2 \\cdot \\log_5(3)',
            steps: [
                { text: 'The coefficient 2 can move inside as an exponent.' },
                { text: '\\(2 \\cdot \\log_5(3) = \\log_5(3^2)\\)' },
                { text: '\\(= \\log_5(9)\\)' }
            ]
        },

        // 9. Practice: Power Rule
        {
            type: 'practice',
            intro: 'Simplify using the Power Rule:',
            generate: () => LA.qPowerForward()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'The Three Log Rules',
            html: '<div class="lesson-box">' +
                '<p><strong>Product:</strong> \\(\\log_b(m) + \\log_b(n) = \\log_b(mn)\\)</p>' +
                '<p><strong>Quotient:</strong> \\(\\log_b(m) - \\log_b(n) = \\log_b\\!\\left(\\dfrac{m}{n}\\right)\\)</p>' +
                '<p><strong>Power:</strong> \\(k \\cdot \\log_b(m) = \\log_b(m^k)\\)</p>' +
                '</div>' +
                '<p>These three rules let you combine, split, and simplify any logarithmic expression. They are the foundation for everything that follows!</p>',
            nextActivity: 'log-rules'
        }
    ]
};

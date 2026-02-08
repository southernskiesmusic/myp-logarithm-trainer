/* ================================================================
   LESSON: Solving Log & Exponential Equations
   ================================================================ */
const LESSON_LOG_EQUATIONS = {
    id: 'log-equations',
    title: 'Solving Log Equations',
    subtitle: 'Logarithmic and exponential equations',
    folder: 'logarithms',
    screens: [
        // 1. Solving basic log equations
        {
            type: 'concept',
            title: 'Solving Logarithmic Equations',
            html: '<p>To solve an equation with a log, <strong>convert to exponential form</strong>:</p>' +
                '<div class="lesson-box">If \\(\\log_b(x) = n\\), then \\(x = b^n\\)</div>' +
                '<p><strong>Example:</strong> \\(\\log_3(x) = 4\\) means \\(x = 3^4 = 81\\).</p>' +
                '<p>For more complex arguments, convert first, then solve the resulting equation.</p>'
        },

        // 2. Worked example: Simple log equation
        {
            type: 'example',
            title: 'Simple Log Equation',
            problem: '\\log_2(x) = 5',
            steps: [
                { text: 'Convert to exponential form: \\(x = 2^5\\).' },
                { text: 'Calculate: \\(2^5 = 32\\).' },
                { text: 'Therefore \\(x = 32\\).' }
            ]
        },

        // 3. Practice: Simple log equation
        {
            type: 'practice',
            intro: 'Solve for \\(x\\):',
            generate: () => LA.qSolveLogSimple()
        },

        // 4. Log equations with expressions
        {
            type: 'concept',
            title: 'Equations with Expressions Inside',
            html: '<p>When the argument of the log contains an expression, convert first, then solve algebraically:</p>' +
                '<div class="lesson-box">\\(\\log_b(\\text{expression}) = n \\implies \\text{expression} = b^n\\)</div>' +
                '<p><strong>Example:</strong> \\(\\log_5(2x+1) = 2\\)</p>' +
                '<p>Convert: \\(2x+1 = 5^2 = 25\\), so \\(2x = 24\\), giving \\(x = 12\\).</p>' +
                '<p><strong>Important:</strong> Always check your answer makes the argument positive!</p>'
        },

        // 5. Worked example: Linear inside log
        {
            type: 'example',
            title: 'Solving with a Linear Expression',
            problem: '\\log_3(2x - 1) = 3',
            steps: [
                { text: 'Convert to exponential form: \\(2x - 1 = 3^3 = 27\\).' },
                { text: 'Solve: \\(2x = 28\\), so \\(x = 14\\).' },
                { text: 'Check: \\(2(14) - 1 = 27 > 0\\). Valid.' }
            ]
        },

        // 6. Practice: Linear log equation
        {
            type: 'practice',
            intro: 'Solve for \\(x\\):',
            generate: () => LA.qSolveLogLinear()
        },

        // 7. Exponential equations
        {
            type: 'concept',
            title: 'Solving Exponential Equations',
            html: '<p>When the unknown is in the <strong>exponent</strong>, use logarithms to bring it down:</p>' +
                '<div class="lesson-box">\\(b^x = v\\)</div>' +
                '<p><strong>If \\(v\\) is a power of \\(b\\):</strong> recognise it directly. E.g. \\(2^x = 16 \\implies x = 4\\).</p>' +
                '<p><strong>If not:</strong> take \\(\\ln\\) of both sides:</p>' +
                '<div class="lesson-box">\\(b^x = v \\implies x \\cdot \\ln(b) = \\ln(v) \\implies x = \\dfrac{\\ln(v)}{\\ln(b)}\\)</div>'
        },

        // 8. Worked example: Exponential equation
        {
            type: 'example',
            title: 'Solving an Exponential Equation',
            problem: '5^x = 125',
            steps: [
                { text: 'Recognise: is 125 a power of 5?' },
                { text: '\\(5^1 = 5,\\; 5^2 = 25,\\; 5^3 = 125\\). Yes!' },
                { text: 'Therefore \\(x = 3\\).' }
            ]
        },

        // 9. Practice: Exponential equations
        {
            type: 'practice',
            intro: 'Solve for \\(x\\):',
            generate: () => pick([LA.qSolveExpExact, LA.qSolveExpDecimal])()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Solving Equations Summary',
            html: '<div class="lesson-box">' +
                '<p><strong>Log equation:</strong> Convert \\(\\log_b(\\text{expr}) = n\\) to \\(\\text{expr} = b^n\\), then solve.</p>' +
                '<p><strong>Exponential equation:</strong> If the value is a power of the base, match directly. Otherwise, take \\(\\ln\\) of both sides.</p>' +
                '<p><strong>Always check</strong> that solutions keep log arguments positive.</p>' +
                '</div>' +
                '<p>You\'ve now covered all the major logarithm topics. Keep practising with the Mastery Agent to solidify your skills!</p>',
            nextActivity: 'log-mastery'
        }
    ]
};

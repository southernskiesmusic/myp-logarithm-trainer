/* ================================================================
   LESSON: Indices (Index Laws)
   ================================================================ */
const LESSON_INDICES = {
    id: 'indices',
    title: 'Indices',
    subtitle: 'Laws of indices and fractional powers',
    folder: 'number',
    screens: [
        // 1. What are indices?
        {
            type: 'concept',
            title: 'What are Indices?',
            html: '<p>An <strong>index</strong> (plural: <em>indices</em>) tells you how many times to multiply a number by itself:</p>' +
                '<div class="lesson-box">\\(a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ times}}\\)</div>' +
                '<p>For example, \\(2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32\\).</p>' +
                '<p>The number \\(a\\) is the <strong>base</strong>, and \\(n\\) is the <strong>index</strong> (or exponent/power).</p>'
        },

        // 2. Worked example: Simplify 2^3 × 2^4
        {
            type: 'example',
            title: 'Multiplication Law',
            problem: '2^3 \\times 2^4',
            steps: [
                { text: 'When multiplying with the same base, <strong>add</strong> the powers.' },
                { text: '\\(2^3 \\times 2^4 = 2^{3+4}\\)' },
                { text: '\\(= 2^7 = 128\\)' }
            ]
        },

        // 3. Practice: Multiplication law
        {
            type: 'practice',
            intro: 'Simplify — give the power:',
            generate: () => IDX.qMultiply()
        },

        // 4. Division and power-of-power laws
        {
            type: 'concept',
            title: 'Division and Power of a Power',
            html: '<div class="lesson-box">\\(a^m \\div a^n = a^{m-n}\\) &nbsp;—&nbsp; <strong>subtract</strong> the powers</div>' +
                '<p>Example: \\(5^7 \\div 5^3 = 5^{7-3} = 5^4 = 625\\)</p>' +
                '<div class="lesson-box">\\((a^m)^n = a^{mn}\\) &nbsp;—&nbsp; <strong>multiply</strong> the powers</div>' +
                '<p>Example: \\((3^2)^4 = 3^{2 \\times 4} = 3^8 = 6561\\)</p>'
        },

        // 5. Worked example: Simplify (3^2)^4
        {
            type: 'example',
            title: 'Power of a Power',
            problem: '(3^2)^4',
            steps: [
                { text: 'When raising a power to another power, <strong>multiply</strong> the exponents.' },
                { text: '\\((3^2)^4 = 3^{2 \\times 4}\\)' },
                { text: '\\(= 3^8 = 6561\\)' }
            ]
        },

        // 6. Practice: Power law
        {
            type: 'practice',
            intro: 'Simplify — give the power:',
            generate: () => IDX.qPower()
        },

        // 7. Zero, negative, and fractional indices
        {
            type: 'concept',
            title: 'Zero, Negative, and Fractional Indices',
            html: '<div class="lesson-box">\\(a^0 = 1\\) &nbsp;—&nbsp; anything to the power 0 is 1 (except \\(0^0\\))</div>' +
                '<div class="lesson-box">\\(a^{-n} = \\dfrac{1}{a^n}\\) &nbsp;—&nbsp; negative power means <strong>reciprocal</strong></div>' +
                '<div class="lesson-box">\\(a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m\\) &nbsp;—&nbsp; denominator is the <strong>root</strong>, numerator is the <strong>power</strong></div>' +
                '<p>Example: \\(8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4\\)</p>'
        },

        // 8. Worked example: Evaluate 8^(2/3)
        {
            type: 'example',
            title: 'Fractional Indices',
            problem: '8^{\\frac{2}{3}}',
            steps: [
                { text: 'The denominator (3) means cube root. The numerator (2) means square.' },
                { text: 'First find the cube root: \\(\\sqrt[3]{8} = 2\\)' },
                { text: 'Then square it: \\(2^2 = 4\\). So \\(8^{2/3} = 4\\).' }
            ]
        },

        // 9. Practice: Fractional indices
        {
            type: 'practice',
            intro: 'Evaluate:',
            generate: () => pick([IDX.qFractionalHalf, IDX.qFractionalThird, IDX.qFractionalMN])()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'All Index Laws',
            html: '<div class="lesson-box">' +
                '<p>\\(a^m \\times a^n = a^{m+n}\\)</p>' +
                '<p>\\(a^m \\div a^n = a^{m-n}\\)</p>' +
                '<p>\\((a^m)^n = a^{mn}\\)</p>' +
                '<p>\\(a^0 = 1\\)</p>' +
                '<p>\\(a^{-n} = \\dfrac{1}{a^n}\\)</p>' +
                '<p>\\(a^{m/n} = (\\sqrt[n]{a})^m\\)</p>' +
                '</div>' +
                '<p>These six laws are the foundation of indices. Keep practising until they become automatic!</p>',
            nextActivity: 'num-indices'
        }
    ]
};

/* ================================================================
   LESSON: Common & Natural Logs + Change of Base
   ================================================================ */
const LESSON_LOG_NATURAL = {
    id: 'log-natural',
    title: 'Common & Natural Logs',
    subtitle: 'log, ln, and the change of base formula',
    folder: 'logarithms',
    screens: [
        // 1. Common Logarithm
        {
            type: 'concept',
            title: 'The Common Logarithm',
            html: '<p>When no base is written, the base is <strong>10</strong>:</p>' +
                '<div class="lesson-box">\\(\\log(x) = \\log_{10}(x)\\)</div>' +
                '<p>This is called the <strong>common logarithm</strong>. It appears on every scientific calculator.</p>' +
                '<p><strong>Examples:</strong> \\(\\log(100) = 2\\), \\(\\log(1000) = 3\\), \\(\\log(1) = 0\\)</p>'
        },

        // 2. Worked example: Common log
        {
            type: 'example',
            title: 'Evaluating Common Logs',
            problem: '\\log(10000)',
            steps: [
                { text: '\\(\\log\\) means base 10, so ask: "10 to what power gives 10000?"' },
                { text: '\\(10^1=10,\\; 10^2=100,\\; 10^3=1000,\\; 10^4=10000\\)' },
                { text: 'Therefore \\(\\log(10000) = 4\\).' }
            ]
        },

        // 3. Practice: Common log
        {
            type: 'practice',
            intro: 'Evaluate the common logarithm:',
            generate: () => LA.qCommonLog()
        },

        // 4. Natural Logarithm
        {
            type: 'concept',
            title: 'The Natural Logarithm',
            html: '<p>The <strong>natural logarithm</strong> uses the special base \\(e \\approx 2.718\\ldots\\):</p>' +
                '<div class="lesson-box">\\(\\ln(x) = \\log_e(x)\\)</div>' +
                '<p>The number \\(e\\) is irrational (like \\(\\pi\\)) and appears everywhere in mathematics, science, and finance.</p>' +
                '<p><strong>Key identities:</strong></p>' +
                '<div class="lesson-box">' +
                '<p>\\(\\ln(1) = 0\\) &nbsp;&nbsp; \\(\\ln(e) = 1\\) &nbsp;&nbsp; \\(\\ln(e^n) = n\\) &nbsp;&nbsp; \\(e^{\\ln(x)} = x\\)</p>' +
                '</div>'
        },

        // 5. Worked example: Natural log
        {
            type: 'example',
            title: 'Using ln Identities',
            problem: '\\ln(e^5)',
            steps: [
                { text: '\\(\\ln\\) means log base \\(e\\).' },
                { text: 'By the identity \\(\\ln(e^n) = n\\), the exponent comes straight out.' },
                { text: 'Therefore \\(\\ln(e^5) = 5\\).' }
            ]
        },

        // 6. Practice: Natural log
        {
            type: 'practice',
            intro: 'Evaluate:',
            generate: () => pick([LA.qNaturalLog, LA.qNaturalIdentity])()
        },

        // 7. Change of Base
        {
            type: 'concept',
            title: 'Change of Base Formula',
            html: '<p>To evaluate a log in a base your calculator doesn\'t have, <strong>change the base</strong>:</p>' +
                '<div class="lesson-box">\\(\\log_a(b) = \\dfrac{\\log_c(b)}{\\log_c(a)}\\) &nbsp; for any base \\(c\\)</div>' +
                '<p>Usually we change to base 10 or base \\(e\\):</p>' +
                '<p>\\(\\log_3(7) = \\dfrac{\\log(7)}{\\log(3)} = \\dfrac{\\ln(7)}{\\ln(3)}\\)</p>' +
                '<p>A useful consequence: \\(\\dfrac{\\log_a(x)}{\\log_a(y)} = \\log_y(x)\\)</p>'
        },

        // 8. Worked example: Change of base
        {
            type: 'example',
            title: 'Change of Base Example',
            problem: '\\dfrac{\\log_5(8)}{\\log_5(2)}',
            steps: [
                { text: 'Both logs have the same base (5), so we can use the change of base consequence.' },
                { text: '\\(\\dfrac{\\log_5(8)}{\\log_5(2)} = \\log_2(8)\\)' },
                { text: '\\(\\log_2(8) = 3\\) since \\(2^3 = 8\\).' }
            ]
        },

        // 9. Practice: Change of base
        {
            type: 'practice',
            intro: 'Evaluate using change of base:',
            generate: () => LA.qChangeOfBase()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Key Takeaways',
            html: '<div class="lesson-box">' +
                '<p><strong>Common log:</strong> \\(\\log(x) = \\log_{10}(x)\\)</p>' +
                '<p><strong>Natural log:</strong> \\(\\ln(x) = \\log_e(x)\\)</p>' +
                '<p><strong>Change of base:</strong> \\(\\log_a(b) = \\dfrac{\\log(b)}{\\log(a)} = \\dfrac{\\ln(b)}{\\ln(a)}\\)</p>' +
                '</div>' +
                '<p>With these tools you can evaluate any logarithm using your calculator!</p>',
            nextActivity: 'log-mastery'
        }
    ]
};

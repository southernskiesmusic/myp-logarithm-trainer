/* ================================================================
   LESSON: Introduction to Logarithms
   ================================================================ */
const LESSON_LOG_INTRO = {
    id: 'log-intro',
    title: 'Introduction to Logarithms',
    subtitle: 'Definition, evaluation, and special values',
    folder: 'logarithms',
    screens: [
        // 1. What is a logarithm?
        {
            type: 'concept',
            title: 'What is a Logarithm?',
            html: '<p>A <strong>logarithm</strong> answers the question: <em>"What power do I raise the base to, in order to get this number?"</em></p>' +
                '<div class="lesson-box">\\(\\log_b(x) = n\\) &nbsp; means &nbsp; \\(b^n = x\\)</div>' +
                '<p>For example, \\(\\log_2(8) = 3\\) because \\(2^3 = 8\\).</p>' +
                '<p>The <strong>base</strong> is the small number (subscript). The <strong>argument</strong> is what\'s inside the brackets. The <strong>answer</strong> is the exponent.</p>'
        },

        // 2. Worked example: Evaluate log_2(32)
        {
            type: 'example',
            title: 'Worked Example',
            problem: '\\log_2(32)',
            steps: [
                { text: 'Ask: "2 to what power gives 32?"' },
                { text: 'Count up the powers: \\(2^1=2,\\; 2^2=4,\\; 2^3=8,\\; 2^4=16,\\; 2^5=32\\)' },
                { text: 'Therefore \\(\\log_2(32) = 5\\).' }
            ]
        },

        // 3. Practice: Evaluate a log
        {
            type: 'practice',
            intro: 'Now try one yourself — evaluate the logarithm:',
            generate: () => LA.qEvalInteger()
        },

        // 4. Converting between forms
        {
            type: 'concept',
            title: 'Converting Between Forms',
            html: '<p>Every logarithm statement has an equivalent exponential statement, and vice versa:</p>' +
                '<div class="lesson-box">\\(\\log_b(x) = n \\quad \\Longleftrightarrow \\quad b^n = x\\)</div>' +
                '<p><strong>Example:</strong> \\(5^3 = 125\\) can be written as \\(\\log_5(125) = 3\\).</p>' +
                '<p><strong>Example:</strong> \\(\\log_3(81) = 4\\) can be written as \\(3^4 = 81\\).</p>' +
                '<p>Practice converting in both directions — it\'s the most fundamental log skill!</p>'
        },

        // 5. Worked example: Convert exponential to log form
        {
            type: 'example',
            title: 'Converting Exponential to Log Form',
            problem: '10^4 = 10000',
            steps: [
                { text: 'Identify: base = \\(10\\), exponent = \\(4\\), result = \\(10000\\)' },
                { text: 'In log form: \\(\\log_{\\text{base}}(\\text{result}) = \\text{exponent}\\)' },
                { text: 'Therefore \\(\\log_{10}(10000) = 4\\).' }
            ]
        },

        // 6. Practice: Convert forms
        {
            type: 'practice',
            intro: 'Convert this exponential statement to logarithmic form:',
            generate: () => LA.qExpToLog()
        },

        // 7. Special values
        {
            type: 'concept',
            title: 'Special Values',
            html: '<p>Two special values appear constantly and are worth memorising:</p>' +
                '<div class="lesson-box">\\(\\log_a(1) = 0\\) &nbsp; because &nbsp; \\(a^0 = 1\\) for any base \\(a\\)</div>' +
                '<div class="lesson-box">\\(\\log_a(a) = 1\\) &nbsp; because &nbsp; \\(a^1 = a\\) for any base \\(a\\)</div>' +
                '<p>These work for <em>every</em> base: \\(\\log_7(1) = 0\\), \\(\\log_{100}(100) = 1\\), etc.</p>'
        },

        // 8. Worked example: Why log_7(1) = 0
        {
            type: 'example',
            title: 'Why is log of 1 Always Zero?',
            problem: '\\log_7(1)',
            steps: [
                { text: 'Ask: "7 to what power gives 1?"' },
                { text: 'Any number to the power 0 gives 1: \\(7^0 = 1\\)' },
                { text: 'Therefore \\(\\log_7(1) = 0\\).' }
            ]
        },

        // 9. Practice: Special values
        {
            type: 'practice',
            intro: 'Use the special value rules:',
            generate: () => pick([LA.qSpecialZero, LA.qSpecialOne])()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Key Takeaways',
            html: '<div class="lesson-box">' +
                '<p><strong>Definition:</strong> \\(\\log_b(x) = n\\) means \\(b^n = x\\)</p>' +
                '<p><strong>Special values:</strong> \\(\\log_a(1) = 0\\) and \\(\\log_a(a) = 1\\)</p>' +
                '</div>' +
                '<p>You now know how to evaluate logarithms and convert between exponential and logarithmic form. Next, try practising these skills with the Log Rules trainer!</p>',
            nextActivity: 'log-rules'
        }
    ]
};

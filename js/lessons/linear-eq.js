/* ================================================================
   LESSON: Linear Equations
   ================================================================ */
const LESSON_LINEAR_EQ = {
    id: 'linear-eq',
    title: 'Linear Equations',
    subtitle: 'Solving one-step, two-step, and bracket equations',
    folder: 'algebra',
    screens: [
        // 1. What is an equation?
        {
            type: 'concept',
            title: 'What is an Equation?',
            html: '<p>An <strong>equation</strong> says that two things are equal. It always has an \\(=\\) sign:</p>' +
                '<p style="text-align:center; font-size:1.2em;">\\(x + 5 = 12\\)</p>' +
                '<p><strong>Solving</strong> means finding the value of the unknown (usually \\(x\\)) that makes the equation true.</p>' +
                '<div class="lesson-box">To solve an equation, use <strong>inverse operations</strong> to isolate \\(x\\):<br>' +
                '\\(+\\) and \\(-\\) are inverses &nbsp; | &nbsp; \\(\\times\\) and \\(\\div\\) are inverses</div>' +
                '<p>The golden rule: <strong>whatever you do to one side, you must do to the other side.</strong></p>' +
                '<p>Think of it like a balance scale — both sides must always stay equal.</p>'
        },

        // 2. Worked example: One-step equation
        {
            type: 'example',
            title: 'Solving a One-Step Equation',
            problem: 'x + 5 = 12',
            steps: [
                { text: 'We need to get \\(x\\) on its own. The \\(+5\\) is in the way.' },
                { text: 'The inverse of \\(+5\\) is \\(-5\\). Subtract 5 from both sides:' },
                { text: '\\(x + 5 - 5 = 12 - 5\\)' },
                { text: '\\(x = 7\\)' }
            ]
        },

        // 3. Practice: One-step equations
        {
            type: 'practice',
            intro: 'Solve the equation — find the value of \\(x\\):',
            generate: () => LINEAR.qOneStepAdd()
        },

        // 4. Two-step equations
        {
            type: 'concept',
            title: 'Two-Step Equations',
            html: '<p>Some equations need <strong>two steps</strong> to solve, such as \\(3x + 2 = 11\\).</p>' +
                '<div class="lesson-box"><strong>Strategy:</strong> Undo in reverse order.<br>' +
                '1. Deal with the \\(+\\) or \\(-\\) first (undo addition/subtraction)<br>' +
                '2. Then deal with the \\(\\times\\) or \\(\\div\\) (undo multiplication/division)</div>' +
                '<p>Think of it like getting dressed — you put on socks then shoes, but to undo it you take off shoes first, then socks.</p>' +
                '<p><strong>Example:</strong> \\(2x - 3 = 7\\)</p>' +
                '<ul><li>Step 1: Add 3 to both sides → \\(2x = 10\\)</li>' +
                '<li>Step 2: Divide both sides by 2 → \\(x = 5\\)</li></ul>'
        },

        // 5. Worked example: Two-step equation
        {
            type: 'example',
            title: 'Solving a Two-Step Equation',
            problem: '3x + 2 = 11',
            steps: [
                { text: 'Step 1: Subtract 2 from both sides to remove the constant.' },
                { text: '\\(3x + 2 - 2 = 11 - 2\\)' },
                { text: '\\(3x = 9\\)' },
                { text: 'Step 2: Divide both sides by 3 to isolate \\(x\\).' },
                { text: '\\(\\dfrac{3x}{3} = \\dfrac{9}{3}\\)' },
                { text: '\\(x = 3\\)' }
            ]
        },

        // 6. Practice: Two-step equations
        {
            type: 'practice',
            intro: 'Solve the two-step equation — find the value of \\(x\\):',
            generate: () => LINEAR.qTwoStep()
        },

        // 7. Equations with brackets
        {
            type: 'concept',
            title: 'Equations with Brackets',
            html: '<p>When an equation has brackets, <strong>expand first</strong>, then solve as normal:</p>' +
                '<div class="lesson-box"><strong>Strategy:</strong><br>' +
                '1. <strong>Expand</strong> the brackets<br>' +
                '2. <strong>Simplify</strong> if needed (collect like terms)<br>' +
                '3. <strong>Solve</strong> using inverse operations</div>' +
                '<p><strong>Example:</strong> \\(4(x - 1) = 20\\)</p>' +
                '<ul><li>Expand: \\(4x - 4 = 20\\)</li>' +
                '<li>Add 4: \\(4x = 24\\)</li>' +
                '<li>Divide by 4: \\(x = 6\\)</li></ul>' +
                '<p><strong>Tip:</strong> You can also divide both sides by the number outside the bracket first, if it divides evenly. For \\(4(x - 1) = 20\\), dividing by 4 gives \\(x - 1 = 5\\), so \\(x = 6\\).</p>'
        },

        // 8. Worked example: Brackets equation
        {
            type: 'example',
            title: 'Solving an Equation with Brackets',
            problem: '2(x + 3) = 14',
            steps: [
                { text: 'Expand the bracket: \\(2 \\times x + 2 \\times 3 = 14\\)' },
                { text: '\\(2x + 6 = 14\\)' },
                { text: 'Subtract 6 from both sides: \\(2x = 14 - 6 = 8\\)' },
                { text: 'Divide both sides by 2: \\(x = \\dfrac{8}{2} = 4\\)' }
            ]
        },

        // 9. Practice: Equations with brackets
        {
            type: 'practice',
            intro: 'Solve the equation with brackets — find the value of \\(x\\):',
            generate: () => LINEAR.qBrackets()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Solving Linear Equations — Strategy',
            html: '<div class="lesson-box">' +
                '<p><strong>One-step:</strong> Use a single inverse operation to isolate \\(x\\).</p>' +
                '<p><strong>Two-step:</strong> Undo \\(+\\) or \\(-\\) first, then undo \\(\\times\\) or \\(\\div\\).</p>' +
                '<p><strong>Brackets:</strong> Expand first, then solve step by step.</p>' +
                '<p><strong>Golden rule:</strong> Whatever you do to one side, do to the other!</p>' +
                '</div>' +
                '<p>Always check your answer by substituting it back into the original equation. If both sides are equal, you know it\'s correct.</p>',
            nextActivity: 'alg-linear'
        }
    ]
};

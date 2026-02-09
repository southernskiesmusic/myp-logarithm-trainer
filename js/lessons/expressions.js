/* ================================================================
   LESSON: Algebraic Expressions
   ================================================================ */
const LESSON_EXPRESSIONS = {
    id: 'expressions',
    title: 'Algebraic Expressions',
    subtitle: 'Collecting terms, expanding, and factorising',
    folder: 'algebra',
    screens: [
        // 1. What are algebraic expressions?
        {
            type: 'concept',
            title: 'What is an Algebraic Expression?',
            html: '<p>An <strong>algebraic expression</strong> is a combination of numbers, variables (letters), and operations like \\(+\\), \\(-\\), \\(\\times\\), \\(\\div\\).</p>' +
                '<p>Each part separated by \\(+\\) or \\(-\\) is called a <strong>term</strong>. For example, in \\(3x + 5y - 2\\):</p>' +
                '<ul><li>\\(3x\\) is a term — the <strong>coefficient</strong> of \\(x\\) is 3</li>' +
                '<li>\\(5y\\) is a term — the coefficient of \\(y\\) is 5</li>' +
                '<li>\\(-2\\) is a <strong>constant term</strong></li></ul>' +
                '<div class="lesson-box"><strong>Like terms</strong> have the same variable and power. You can combine them:<br>' +
                '\\(3x + 2x = 5x\\) &nbsp; but &nbsp; \\(3x + 2y\\) cannot be simplified.</div>' +
                '<p>Collecting like terms is the first step in simplifying expressions.</p>'
        },

        // 2. Worked example: Collect like terms
        {
            type: 'example',
            title: 'Collecting Like Terms',
            problem: '3x + 5 + 2x - 1',
            steps: [
                { text: 'Identify the like terms: \\(3x\\) and \\(2x\\) are both \\(x\\)-terms; \\(+5\\) and \\(-1\\) are both constants.' },
                { text: 'Combine the \\(x\\)-terms: \\(3x + 2x = 5x\\)' },
                { text: 'Combine the constants: \\(5 - 1 = 4\\)' },
                { text: '\\(3x + 5 + 2x - 1 = 5x + 4\\)' }
            ]
        },

        // 3. Practice: Collect like terms
        {
            type: 'practice',
            intro: 'Collect like terms and simplify the expression:',
            generate: () => EXPR.qCollectSimple()
        },

        // 4. Expanding single brackets
        {
            type: 'concept',
            title: 'Expanding Brackets',
            html: '<p><strong>Expanding</strong> (or distributing) means multiplying each term inside the bracket by the term outside:</p>' +
                '<div class="lesson-box">\\(a(b + c) = ab + ac\\)</div>' +
                '<p>Every term inside the bracket gets multiplied. Watch the signs carefully!</p>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul><li>\\(2(x + 3) = 2x + 6\\)</li>' +
                '<li>\\(5(2y - 1) = 10y - 5\\)</li>' +
                '<li>\\(-3(x + 4) = -3x - 12\\) &nbsp; (negative outside flips the signs)</li></ul>' +
                '<p>After expanding, always check if you can simplify by collecting like terms.</p>'
        },

        // 5. Worked example: Expand single bracket
        {
            type: 'example',
            title: 'Expanding a Single Bracket',
            problem: '3(2x + 4)',
            steps: [
                { text: 'Multiply the first term inside: \\(3 \\times 2x = 6x\\)' },
                { text: 'Multiply the second term inside: \\(3 \\times 4 = 12\\)' },
                { text: '\\(3(2x + 4) = 6x + 12\\)' }
            ]
        },

        // 6. Practice: Expand single bracket
        {
            type: 'practice',
            intro: 'Expand the brackets and simplify:',
            generate: () => EXPR.qExpandSingle()
        },

        // 7. Factorising quadratics
        {
            type: 'concept',
            title: 'Factorising Quadratics',
            html: '<p><strong>Factorising</strong> is the reverse of expanding — you write an expression as a product of factors.</p>' +
                '<p>For a quadratic \\(x^2 + bx + c\\), you need two numbers that:</p>' +
                '<div class="lesson-box"><strong>Multiply</strong> to give \\(c\\) &nbsp; and &nbsp; <strong>Add</strong> to give \\(b\\)</div>' +
                '<p>Then the factorised form is \\((x + p)(x + q)\\) where \\(p\\) and \\(q\\) are those two numbers.</p>' +
                '<p><strong>Example:</strong> \\(x^2 + 5x + 6\\)</p>' +
                '<ul><li>Need two numbers that multiply to \\(6\\) and add to \\(5\\)</li>' +
                '<li>\\(2 \\times 3 = 6\\) and \\(2 + 3 = 5\\) &#10004;</li>' +
                '<li>So \\(x^2 + 5x + 6 = (x + 2)(x + 3)\\)</li></ul>' +
                '<p>Always check your answer by expanding back out.</p>'
        },

        // 8. Worked example: Factorise a quadratic
        {
            type: 'example',
            title: 'Factorising a Quadratic',
            problem: 'x^2 + 7x + 12',
            steps: [
                { text: 'Find two numbers that multiply to \\(12\\) and add to \\(7\\).' },
                { text: 'Try factor pairs of 12: \\(1 \\times 12\\), \\(2 \\times 6\\), \\(3 \\times 4\\).' },
                { text: '\\(3 + 4 = 7\\) &#10004; — these are the numbers we need.' },
                { text: '\\(x^2 + 7x + 12 = (x + 3)(x + 4)\\)' }
            ]
        },

        // 9. Practice: Factorise a quadratic
        {
            type: 'practice',
            intro: 'Factorise the quadratic expression:',
            generate: () => EXPR.qFactorQuad()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Algebraic Expressions — Key Rules',
            html: '<div class="lesson-box">' +
                '<p><strong>Collect like terms:</strong> Combine terms with the same variable and power.</p>' +
                '<p><strong>Expand brackets:</strong> \\(a(b + c) = ab + ac\\)</p>' +
                '<p><strong>Factorise quadratics:</strong> \\(x^2 + bx + c = (x + p)(x + q)\\)<br>' +
                'where \\(p \\times q = c\\) and \\(p + q = b\\)</p>' +
                '</div>' +
                '<p>These skills are the foundation of algebra — they appear in almost every topic you will study. Practice until they feel automatic!</p>',
            nextActivity: 'alg-expr'
        }
    ]
};

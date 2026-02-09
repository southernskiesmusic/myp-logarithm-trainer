/* ================================================================
   LESSON: Factorising Quadratics
   ================================================================ */
const LESSON_FACTORISING_QUAD = {
    id: 'factorising-quad',
    title: 'Factorising Quadratics',
    subtitle: 'Factor pairs, trinomials, and difference of squares',
    folder: 'quadratics',
    screens: [
        // 1. What is factorising?
        {
            type: 'concept',
            title: 'What is Factorising?',
            html: '<p><strong>Factorising</strong> is the reverse of expanding. We write an expression as a product of simpler factors.</p>' +
                '<div class="lesson-box">\\(x^2 + 5x + 6 = (x + 2)(x + 3)\\)</div>' +
                '<p>If expanding turns brackets into a sum, factorising turns a sum back into brackets.</p>' +
                '<p>This is essential for solving quadratic equations and simplifying expressions.</p>'
        },

        // 2. Worked example: factor pairs
        {
            type: 'example',
            title: 'Finding Factor Pairs',
            problem: 'x^2 + 7x + 12',
            steps: [
                { text: 'We need two numbers that <strong>multiply</strong> to 12 and <strong>add</strong> to 7.' },
                { text: 'Factor pairs of 12: \\(1 \\times 12\\), \\(2 \\times 6\\), \\(3 \\times 4\\).' },
                { text: '\\(3 + 4 = 7\\) \u2714. So \\(x^2 + 7x + 12 = (x + 3)(x + 4)\\).' }
            ]
        },

        // 3. Practice: simple factorising
        {
            type: 'practice',
            intro: 'Factorise this quadratic:',
            generate() {
                let p = randInt(1, 9), q = randInt(1, 9);
                if (p === q) q = p + 1;
                const sum = p + q, prod = p * q;
                const c = '\\((x + ' + p + ')(x + ' + q + ')\\)';
                const d1 = '\\((x + ' + prod + ')(x + 1)\\)';
                const d2 = '\\((x + ' + p + ')(x - ' + q + ')\\)';
                const d3 = '\\((x + ' + (p + 1) + ')(x + ' + (q - 1) + ')\\)';
                const opts = [c]; [d1, d2, d3].forEach(d => { if (!opts.includes(d)) opts.push(d); });
                while (opts.length < 4) opts.push('\\((x + ' + (p + 2) + ')(x + ' + (q + 2) + ')\\)');
                return {
                    type: 'mc', latex: quadTex(1, sum, prod),
                    answer: c, options: shuffle(opts),
                    explain: '\\(' + quadTex(1, sum, prod) + ' = (x + ' + p + ')(x + ' + q + ')\\) since \\(' + p + ' + ' + q + ' = ' + sum + '\\) and \\(' + p + ' \\times ' + q + ' = ' + prod + '\\).'
                };
            }
        },

        // 4. Factorising with negatives
        {
            type: 'concept',
            title: 'When Constants are Negative',
            html: '<p>When the constant term is <strong>negative</strong>, one factor is positive and one is negative:</p>' +
                '<div class="lesson-box">\\(x^2 + 2x - 15 = (x + 5)(x - 3)\\)</div>' +
                '<p>\\(5 \\times (-3) = -15\\) and \\(5 + (-3) = 2\\). \u2714</p>' +
                '<p>When the coefficient of \\(x\\) is also negative:</p>' +
                '<div class="lesson-box">\\(x^2 - 5x + 6 = (x - 2)(x - 3)\\)</div>' +
                '<p>\\((-2) \\times (-3) = 6\\) and \\((-2) + (-3) = -5\\). \u2714</p>'
        },

        // 5. Worked example: negative constant
        {
            type: 'example',
            title: 'Factorising with a Negative Constant',
            problem: 'x^2 + 2x - 8',
            steps: [
                { text: 'We need two numbers that multiply to \\(-8\\) and add to \\(2\\).' },
                { text: 'Factor pairs of \\(-8\\): \\(4 \\times (-2)\\), \\((-4) \\times 2\\), \\(8 \\times (-1)\\), \\((-8) \\times 1\\).' },
                { text: '\\(4 + (-2) = 2\\) \u2714. So \\(x^2 + 2x - 8 = (x + 4)(x - 2)\\).' }
            ]
        },

        // 6. Practice: with negatives
        {
            type: 'practice',
            intro: 'Factorise:',
            generate() {
                let p = randInt(2, 9), q = -randInt(1, p - 1);
                const sum = p + q, prod = p * q;
                const c = '\\((x + ' + p + ')(x - ' + Math.abs(q) + ')\\)';
                const d1 = '\\((x - ' + p + ')(x + ' + Math.abs(q) + ')\\)';
                const d2 = '\\((x + ' + Math.abs(q) + ')(x + ' + p + ')\\)';
                const d3 = '\\((x + ' + (p + 1) + ')(x - ' + (Math.abs(q) + 1) + ')\\)';
                const opts = [c]; [d1, d2, d3].forEach(d => { if (!opts.includes(d)) opts.push(d); });
                while (opts.length < 4) opts.push('\\((x + ' + (p - 1) + ')(x - ' + (Math.abs(q) - 1) + ')\\)');
                return {
                    type: 'mc', latex: quadTex(1, sum, prod),
                    answer: c, options: shuffle(opts),
                    explain: '\\(' + quadTex(1, sum, prod) + ' = (x + ' + p + ')(x ' + q + ')\\) since \\(' + p + ' + (' + q + ') = ' + sum + '\\) and \\(' + p + ' \\times (' + q + ') = ' + prod + '\\).'
                };
            }
        },

        // 7. Difference of two squares
        {
            type: 'concept',
            title: 'Difference of Two Squares',
            html: '<p>A special pattern occurs when we subtract two perfect squares:</p>' +
                '<div class="lesson-box">\\(a^2 - b^2 = (a + b)(a - b)\\)</div>' +
                '<p>For example:</p>' +
                '<ul style="margin:12px 0 12px 24px;line-height:2;">' +
                '<li>\\(x^2 - 9 = x^2 - 3^2 = (x + 3)(x - 3)\\)</li>' +
                '<li>\\(x^2 - 25 = (x + 5)(x - 5)\\)</li>' +
                '<li>\\(4x^2 - 1 = (2x + 1)(2x - 1)\\)</li>' +
                '</ul>' +
                '<p>Look for this whenever the expression has <strong>no middle term</strong> and a <strong>negative constant</strong>.</p>'
        },

        // 8. Worked example: difference of squares
        {
            type: 'example',
            title: 'Difference of Two Squares',
            problem: 'x^2 - 49',
            steps: [
                { text: 'Recognise the pattern: \\(x^2 - 49 = x^2 - 7^2\\).' },
                { text: 'Apply \\(a^2 - b^2 = (a+b)(a-b)\\) with \\(a = x\\) and \\(b = 7\\).' },
                { text: '\\(x^2 - 49 = (x + 7)(x - 7)\\).' }
            ]
        },

        // 9. Practice: mixed factorising
        {
            type: 'practice',
            intro: 'Factorise:',
            generate() {
                // Randomly pick between standard and difference of squares
                if (Math.random() < 0.5) {
                    // Difference of squares
                    const a = randInt(2, 10);
                    const aa = a * a;
                    const c = '\\((x + ' + a + ')(x - ' + a + ')\\)';
                    const d1 = '\\((x + ' + a + ')(x + ' + a + ')\\)';
                    const d2 = '\\((x - ' + a + ')(x - ' + a + ')\\)';
                    const d3 = '\\((x + ' + aa + ')(x - 1)\\)';
                    const opts = [c]; [d1, d2, d3].forEach(d => { if (!opts.includes(d)) opts.push(d); });
                    while (opts.length < 4) opts.push('\\((x + ' + (a + 1) + ')(x - ' + (a - 1) + ')\\)');
                    return {
                        type: 'mc', latex: 'x^2 - ' + aa,
                        answer: c, options: shuffle(opts),
                        explain: '\\(x^2 - ' + aa + ' = x^2 - ' + a + '^2 = (x + ' + a + ')(x - ' + a + ')\\).'
                    };
                } else {
                    // Standard trinomial with both negative factors
                    let p = -randInt(1, 8), q = -randInt(1, 8);
                    if (p === q) q = p - 1;
                    const sum = p + q, prod = p * q;
                    const fac1 = p < 0 ? '(x - ' + Math.abs(p) + ')' : '(x + ' + p + ')';
                    const fac2 = q < 0 ? '(x - ' + Math.abs(q) + ')' : '(x + ' + q + ')';
                    const c = '\\(' + fac1 + fac2 + '\\)';
                    const d1 = '\\((x + ' + Math.abs(p) + ')(x + ' + Math.abs(q) + ')\\)';
                    const d2 = '\\((x - ' + Math.abs(p) + ')(x + ' + Math.abs(q) + ')\\)';
                    const d3 = '\\((x + ' + Math.abs(p) + ')(x - ' + Math.abs(q) + ')\\)';
                    const opts = [c]; [d1, d2, d3].forEach(d => { if (!opts.includes(d)) opts.push(d); });
                    while (opts.length < 4) opts.push('\\((x - ' + (Math.abs(p) + 1) + ')(x - ' + (Math.abs(q) + 1) + ')\\)');
                    return {
                        type: 'mc', latex: quadTex(1, sum, prod),
                        answer: c, options: shuffle(opts),
                        explain: '\\(' + quadTex(1, sum, prod) + ' = ' + fac1 + fac2 + '\\) since \\(' + p + ' + (' + q + ') = ' + sum + '\\) and \\((' + p + ') \\times (' + q + ') = ' + prod + '\\).'
                    };
                }
            }
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Factorising Summary',
            html: '<div class="lesson-box">' +
                '<p><strong>Standard Trinomial:</strong> \\(x^2 + bx + c = (x + p)(x + q)\\) where \\(p + q = b\\) and \\(pq = c\\)</p>' +
                '<p><strong>Difference of Squares:</strong> \\(a^2 - b^2 = (a + b)(a - b)\\)</p>' +
                '</div>' +
                '<p><strong>Steps:</strong></p>' +
                '<ol style="margin:8px 0 8px 24px;line-height:2;">' +
                '<li>Check for a common factor first</li>' +
                '<li>If no middle term, try difference of squares</li>' +
                '<li>Otherwise, find two numbers that multiply to \\(c\\) and add to \\(b\\)</li>' +
                '</ol>' +
                '<p>Now try the Expressions & Areas activity for more practice!</p>',
            nextActivity: 'quad-areas'
        }
    ]
};

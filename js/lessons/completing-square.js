/* ================================================================
   LESSON: Completing the Square
   ================================================================ */
const LESSON_COMPLETING_SQUARE = {
    id: 'completing-square',
    title: 'Completing the Square',
    subtitle: 'Vertex form and solving quadratics',
    folder: 'quadratics',
    screens: [
        // 1. Why complete the square?
        {
            type: 'concept',
            title: 'Why Complete the Square?',
            html: '<p>Standard form \\(y = x^2 + bx + c\\) doesn\'t directly show us the <strong>vertex</strong> (turning point) of a parabola.</p>' +
                '<p><strong>Completing the square</strong> rewrites the quadratic in <strong>vertex form</strong>:</p>' +
                '<div class="lesson-box">\\(y = (x - h)^2 + k\\)</div>' +
                '<p>where \\((h, k)\\) is the vertex. This tells us:</p>' +
                '<ul style="margin:8px 0 8px 24px;line-height:2;">' +
                '<li>The minimum (or maximum) value is \\(k\\)</li>' +
                '<li>The axis of symmetry is \\(x = h\\)</li>' +
                '</ul>'
        },

        // 2. Worked example: the method
        {
            type: 'example',
            title: 'Completing the Square',
            problem: 'x^2 + 6x + 1',
            steps: [
                { text: '<strong>Step 1:</strong> Take half the coefficient of \\(x\\): \\(\\frac{6}{2} = 3\\).' },
                { text: '<strong>Step 2:</strong> Write the perfect square: \\((x + 3)^2 = x^2 + 6x + 9\\).' },
                { text: '<strong>Step 3:</strong> Adjust: \\(x^2 + 6x + 1 = (x + 3)^2 - 9 + 1 = (x + 3)^2 - 8\\).' }
            ]
        },

        // 3. Practice: find q
        {
            type: 'practice',
            intro: 'Complete the square: find q in \\((x + p)^2 + q\\)',
            generate() {
                const h = randInt(1, 7) * pick([-1, 1]);
                const k = randInt(-9, 9);
                const b = -2 * h, c = h * h + k;
                const half = -h; // half of b
                return {
                    type: 'free', latex: quadTex(1, b, c),
                    answer: k,
                    explain: 'Half of \\(' + b + '\\) is \\(' + half + '\\). ' +
                        '\\((x ' + (half >= 0 ? '+ ' + half : '- ' + Math.abs(half)) + ')^2 = x^2 ' +
                        (b >= 0 ? '+ ' : '- ') + Math.abs(b) + 'x + ' + (half * half) + '\\). ' +
                        'Adjust: \\(' + c + ' - ' + (half * half) + ' = ' + k + '\\). ' +
                        'So \\(q = ' + k + '\\).'
                };
            }
        },

        // 4. Vertex from completed square
        {
            type: 'concept',
            title: 'Reading the Vertex',
            html: '<p>Once in vertex form \\((x - h)^2 + k\\), the vertex is at \\((h, k)\\).</p>' +
                '<p><strong>Be careful with signs!</strong></p>' +
                '<div class="lesson-box">' +
                '<p>\\((x + 3)^2 - 8 = (x - (-3))^2 + (-8)\\) \u2192 vertex at \\((-3, -8)\\)</p>' +
                '<p>\\((x - 5)^2 + 2\\) \u2192 vertex at \\((5, 2)\\)</p>' +
                '</div>' +
                '<p>The formula shortcut: for \\(x^2 + bx + c\\), the vertex x-coordinate is \\(h = -\\frac{b}{2}\\).</p>'
        },

        // 5. Worked example: finding vertex
        {
            type: 'example',
            title: 'Finding the Vertex',
            problem: 'x^2 - 8x + 20',
            steps: [
                { text: 'Half of \\(-8\\) is \\(-4\\). Write \\((x - 4)^2 = x^2 - 8x + 16\\).' },
                { text: 'Adjust: \\(x^2 - 8x + 20 = (x - 4)^2 + 20 - 16 = (x - 4)^2 + 4\\).' },
                { text: 'Vertex is at \\((4, 4)\\). The minimum value of the quadratic is \\(4\\).' }
            ]
        },

        // 6. Practice: vertex x-coordinate
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the vertex:',
            generate() {
                const h = randInt(-8, 8);
                if (h === 0) return LESSON_COMPLETING_SQUARE.screens[5].generate();
                const k = randInt(-9, 9);
                const b = -2 * h, c = h * h + k;
                return {
                    type: 'free', latex: 'y = ' + quadTex(1, b, c),
                    answer: h,
                    explain: 'The vertex x-coordinate is \\(h = -\\frac{b}{2} = -\\frac{' + b + '}{2} = ' + h + '\\).'
                };
            }
        },

        // 7. Solving by completing the square
        {
            type: 'concept',
            title: 'Solving Equations',
            html: '<p>Completing the square can solve quadratics that don\'t factorise nicely:</p>' +
                '<div class="lesson-box">' +
                '<p>\\(x^2 + 4x - 1 = 0\\)</p>' +
                '<p>\\((x + 2)^2 - 5 = 0\\)</p>' +
                '<p>\\((x + 2)^2 = 5\\)</p>' +
                '<p>\\(x + 2 = \\pm\\sqrt{5}\\)</p>' +
                '<p>\\(x = -2 \\pm \\sqrt{5}\\)</p>' +
                '</div>' +
                '<p>This method always works, even when the discriminant isn\'t a perfect square.</p>'
        },

        // 8. Worked example: solving
        {
            type: 'example',
            title: 'Solving by Completing the Square',
            problem: 'x^2 - 6x + 2 = 0',
            steps: [
                { text: 'Complete the square: \\(x^2 - 6x + 2 = (x - 3)^2 - 9 + 2 = (x - 3)^2 - 7\\).' },
                { text: 'Set equal to zero: \\((x - 3)^2 = 7\\).' },
                { text: 'Square root: \\(x - 3 = \\pm\\sqrt{7}\\), so \\(x = 3 \\pm \\sqrt{7}\\).' }
            ]
        },

        // 9. Practice: completing the square MC
        {
            type: 'practice',
            intro: 'Complete the square:',
            generate() {
                const h = randInt(1, 6) * pick([-1, 1]);
                const k = randInt(-8, 8);
                const b = -2 * h, c = h * h + k;
                const hSign = h > 0 ? ' - ' + h : ' + ' + Math.abs(h);
                const kSign = k >= 0 ? ' + ' + k : ' - ' + Math.abs(k);
                const correct = '\\((x' + hSign + ')^2' + kSign + '\\)';
                const d1 = '\\((x' + (h > 0 ? ' + ' + h : ' - ' + Math.abs(h)) + ')^2' + kSign + '\\)';
                const d2 = '\\((x' + hSign + ')^2' + (k >= 0 ? ' - ' + k : ' + ' + Math.abs(k)) + '\\)';
                const k2 = k + 2;
                const d3 = '\\((x' + hSign + ')^2' + (k2 >= 0 ? ' + ' + k2 : ' - ' + Math.abs(k2)) + '\\)';
                const opts = [correct]; [d1, d2, d3].forEach(d => { if (!opts.includes(d)) opts.push(d); });
                while (opts.length < 4) opts.push('\\((x' + hSign + ')^2' + (k >= 0 ? ' + ' + (k + 3) : ' - ' + (Math.abs(k) + 3)) + '\\)');
                return {
                    type: 'mc', latex: quadTex(1, b, c),
                    answer: correct, options: shuffle(opts),
                    explain: '\\(' + quadTex(1, b, c) + ' = (x' + hSign + ')^2' + kSign + '\\).'
                };
            }
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Completing the Square Summary',
            html: '<div class="lesson-box">' +
                '<p><strong>Method:</strong> \\(x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 + c - \\frac{b^2}{4}\\)</p>' +
                '<p><strong>Vertex:</strong> \\((h, k)\\) where \\(h = -\\frac{b}{2}\\) and \\(k = c - \\frac{b^2}{4}\\)</p>' +
                '</div>' +
                '<p><strong>Key uses:</strong></p>' +
                '<ol style="margin:8px 0 8px 24px;line-height:2;">' +
                '<li>Finding the vertex (turning point) of a parabola</li>' +
                '<li>Solving quadratic equations</li>' +
                '<li>Deriving the quadratic formula</li>' +
                '</ol>' +
                '<p>Practice more with the Expressions & Areas activity!</p>',
            nextActivity: 'quad-areas'
        }
    ]
};

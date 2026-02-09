/* ================================================================
   LESSON: Sequences
   ================================================================ */
const LESSON_SEQUENCES = {
    id: 'sequences',
    title: 'Sequences',
    subtitle: 'Arithmetic, geometric, and nth term formulas',
    folder: 'algebra',
    screens: [
        // 1. What is a sequence?
        {
            type: 'concept',
            title: 'What is a Sequence?',
            html: '<p>A <strong>sequence</strong> is an ordered list of numbers that follow a pattern. Each number is called a <strong>term</strong>.</p>' +
                '<p><strong>Example:</strong> \\(3, 7, 11, 15, 19, \\ldots\\)</p>' +
                '<p>In an <strong>arithmetic sequence</strong>, you add the same number each time. This number is called the <strong>common difference</strong>, \\(d\\).</p>' +
                '<div class="lesson-box">Common difference: \\(d = \\text{any term} - \\text{previous term}\\)</div>' +
                '<p>For the sequence above: \\(d = 7 - 3 = 4\\). Each term is 4 more than the last.</p>' +
                '<p>To find the next term, simply add \\(d\\) to the last known term.</p>'
        },

        // 2. Worked example: Common difference and next term
        {
            type: 'example',
            title: 'Finding the Next Term',
            problem: '3,\\; 7,\\; 11,\\; 15,\\; \\ldots',
            steps: [
                { text: 'Find the common difference: \\(d = 7 - 3 = 4\\).' },
                { text: 'Check: \\(11 - 7 = 4\\) and \\(15 - 11 = 4\\) &#10004; — the difference is constant.' },
                { text: 'Next term: \\(15 + 4 = 19\\).' }
            ]
        },

        // 3. Practice: Find the next term in an arithmetic sequence
        {
            type: 'practice',
            intro: 'Find the next term in the arithmetic sequence:',
            generate: () => SEQ.qArithNext()
        },

        // 4. The nth term formula
        {
            type: 'concept',
            title: 'The nth Term Formula',
            html: '<p>Instead of listing every term, we can use a formula to find <strong>any</strong> term directly.</p>' +
                '<p>For an arithmetic sequence with first term \\(a\\) and common difference \\(d\\):</p>' +
                '<div class="lesson-box">\\(a_n = a + (n - 1)d\\)</div>' +
                '<p>Where \\(a_n\\) is the \\(n\\)th term, \\(a\\) is the first term, and \\(n\\) is the position.</p>' +
                '<p><strong>Example:</strong> For the sequence \\(5, 8, 11, 14, \\ldots\\)</p>' +
                '<ul><li>\\(a = 5\\), \\(d = 3\\)</li>' +
                '<li>The 10th term: \\(a_{10} = 5 + (10 - 1) \\times 3 = 5 + 27 = 32\\)</li></ul>' +
                '<p>This formula lets you jump straight to any term without working out all the terms in between.</p>'
        },

        // 5. Worked example: Find the 20th term
        {
            type: 'example',
            title: 'Using the nth Term Formula',
            problem: '\\text{Find the 20th term of } 5,\\; 8,\\; 11,\\; 14,\\; \\ldots',
            steps: [
                { text: 'Identify: first term \\(a = 5\\), common difference \\(d = 8 - 5 = 3\\).' },
                { text: 'Use the formula: \\(a_n = a + (n - 1)d\\)' },
                { text: 'Substitute \\(n = 20\\): \\(a_{20} = 5 + (20 - 1) \\times 3\\)' },
                { text: '\\(a_{20} = 5 + 19 \\times 3 = 5 + 57 = 62\\)' }
            ]
        },

        // 6. Practice: Find the nth term of an arithmetic sequence
        {
            type: 'practice',
            intro: 'Use the nth term formula to find the required term:',
            generate: () => SEQ.qArithTerm()
        },

        // 7. Geometric sequences
        {
            type: 'concept',
            title: 'Geometric Sequences',
            html: '<p>In a <strong>geometric sequence</strong>, you <strong>multiply</strong> by the same number each time. This is called the <strong>common ratio</strong>, \\(r\\).</p>' +
                '<div class="lesson-box">Common ratio: \\(r = \\dfrac{\\text{any term}}{\\text{previous term}}\\)</div>' +
                '<p><strong>Example:</strong> \\(2, 6, 18, 54, \\ldots\\)</p>' +
                '<ul><li>\\(r = \\dfrac{6}{2} = 3\\). Each term is 3 times the previous one.</li></ul>' +
                '<p><strong>Arithmetic vs Geometric:</strong></p>' +
                '<ul><li>Arithmetic: \\(+d\\) each time (constant <em>difference</em>)</li>' +
                '<li>Geometric: \\(\\times r\\) each time (constant <em>ratio</em>)</li></ul>' +
                '<p>The nth term of a geometric sequence is:</p>' +
                '<div class="lesson-box">\\(a_n = a \\times r^{\\,n-1}\\)</div>'
        },

        // 8. Worked example: Geometric sequence next term
        {
            type: 'example',
            title: 'Finding the Next Term of a Geometric Sequence',
            problem: '2,\\; 6,\\; 18,\\; 54,\\; \\ldots',
            steps: [
                { text: 'Find the common ratio: \\(r = \\dfrac{6}{2} = 3\\).' },
                { text: 'Check: \\(\\dfrac{18}{6} = 3\\) and \\(\\dfrac{54}{18} = 3\\) &#10004; — the ratio is constant.' },
                { text: 'Next term: \\(54 \\times 3 = 162\\).' }
            ]
        },

        // 9. Practice: Find the next term of a geometric sequence
        {
            type: 'practice',
            intro: 'Find the next term in the geometric sequence:',
            generate: () => SEQ.qGeomNext()
        },

        // 10. Summary
        {
            type: 'summary',
            title: 'Sequences — Key Formulas',
            html: '<div class="lesson-box">' +
                '<p><strong>Arithmetic Sequence</strong> (add \\(d\\) each time):</p>' +
                '<p style="margin-left:1em;">nth term: \\(a_n = a + (n - 1)d\\)</p>' +
                '<p><strong>Geometric Sequence</strong> (multiply by \\(r\\) each time):</p>' +
                '<p style="margin-left:1em;">nth term: \\(a_n = a \\times r^{\\,n-1}\\)</p>' +
                '</div>' +
                '<p><strong>How to tell them apart:</strong> If the <em>difference</em> between terms is constant, it\'s arithmetic. If the <em>ratio</em> between terms is constant, it\'s geometric.</p>' +
                '<p>These patterns appear everywhere — from stacking chairs to compound interest!</p>',
            nextActivity: 'alg-seq'
        }
    ]
};

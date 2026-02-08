const MATCH = {
    step: 0, correct: 0,
    questions: [
        { text: 'A row of triangles is made from matchsticks. 1 triangle uses 3 matchsticks. 2 triangles (sharing a side) use 5 matchsticks. How many matchsticks for 3 triangles?',
          svg: `<svg width="300" height="80" style="display:block;margin:16px auto"><polygon points="30,60 60,10 90,60" fill="none" stroke="#333" stroke-width="2"/><polygon points="90,60 120,10 150,60" fill="none" stroke="#333" stroke-width="2"/><text x="60" y="75" text-anchor="middle" font-size="12">n=1: 3</text><text x="120" y="75" text-anchor="middle" font-size="12">n=2: 5</text></svg>`,
          answer: 7, hint: 'Each new triangle adds 2 matchsticks (shares one side).' },
        { text: 'How many matchsticks for 4 triangles?', answer: 9, hint: 'Continue the pattern: 3, 5, 7, ...' },
        { text: 'How many matchsticks for 5 triangles?', answer: 11, hint: 'What is being added each time?' },
        { text: 'What is the common difference in this sequence?', answer: 2, hint: 'How many matchsticks are added for each new triangle?' },
        { text: 'The formula is M = an + b. What is the value of a (the coefficient of n)?', answer: 2, hint: 'The coefficient equals the common difference.' },
        { text: 'Using M = 2n + b, find b by substituting n=1, M=3.', answer: 1, hint: '3 = 2(1) + b, so b = ?' },
    ],
    reset() { this.step = 0; this.correct = 0; },
    load() {
        if (this.step >= this.questions.length) {
            document.getElementById('match-card').innerHTML = `<div class="question-text" style="text-align:center;padding:32px 16px;"><h2 style="color:var(--success);margin-bottom:16px;">Investigation Complete!</h2><p>You got <strong>${this.correct}</strong> out of <strong>${this.questions.length}</strong> correct.</p><p style="margin-top:16px;">The general formula is: <strong>M = 2n + 1</strong></p><p style="margin-top:8px;color:var(--text-light);">This can be verified: when n=1, M=3 \u2713 when n=10, M=21 \u2713</p><button class="btn btn-primary" style="margin-top:24px;" onclick="MATCH.reset();MATCH.load();">Start Again</button></div>`;
            document.getElementById('match-fb').classList.remove('show');
            document.getElementById('match-next').classList.remove('show');
            renderMath(); return;
        }
        const q = this.questions[this.step];
        let h = `<div class="question-text" style="margin-bottom:16px;"><span class="rule-tag">Step ${this.step + 1}/${this.questions.length}</span></div>`;
        h += `<div class="question-text">${q.text}</div>`;
        if (q.svg) h += q.svg;
        h += `<div class="input-area"><math-field class="lr-math-field" id="match-mf" placeholder="?"></math-field><button class="btn btn-primary" id="match-check">Check</button></div>`;
        document.getElementById('match-card').innerHTML = h;
        document.getElementById('match-fb').classList.remove('show','correct','incorrect');
        document.getElementById('match-next').classList.remove('show');
        document.getElementById('match-progress').textContent = `${this.step} / ${this.questions.length}`;
        document.getElementById('match-correct').textContent = this.correct;
        resetHint('match-hint', 'match-hint-btn');
        document.getElementById('match-workout').innerHTML = '';
        renderMath();
        setTimeout(() => {
            const mf = document.getElementById('match-mf');
            if (mf) { mf.focus(); mf.addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();MATCH.check();} }); }
            document.getElementById('match-check')?.addEventListener('click', () => MATCH.check());
        }, 200);
    },
    check() {
        const mf = document.getElementById('match-mf'); if (!mf || !mf.value.trim()) return;
        const q = this.questions[this.step];
        const ans = parseLatex(mf.value), ok = Math.abs(ans - q.answer) < 0.01;
        mf.disabled = true; document.getElementById('match-check').disabled = true;
        if (ok) this.correct++;
        const fb = document.getElementById('match-fb');
        fb.classList.remove('correct','incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('match-fb-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('match-fb-expl').innerHTML = ok ? 'Well done!' : `The answer is ${q.answer}.`;
        document.getElementById('match-next').classList.add('show');
        document.getElementById('match-progress').textContent = `${this.step + 1} / ${this.questions.length}`;
        document.getElementById('match-correct').textContent = this.correct;
        this.step++;
        if (window.markAnswered) window.markAnswered();
    },
    getHint() { return this.questions[this.step]?.hint || 'Think about the pattern.'; }
};
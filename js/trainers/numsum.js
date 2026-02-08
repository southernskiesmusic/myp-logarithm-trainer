const NUMSUM = {
    step: 0, correct: 0,
    questions: [
        { text: 'Find the sum: 1 + 2 + 3 = ?', answer: 6, hint: 'Add them up!' },
        { text: 'Find the sum: 1 + 2 + 3 + 4 = ?', answer: 10, hint: 'Continue adding.' },
        { text: 'Find the sum: 1 + 2 + 3 + 4 + 5 = ?', answer: 15, hint: 'What is the pattern in the sums: 6, 10, ...?' },
        { text: 'The sums form a sequence: 1, 3, 6, 10, 15, ... These are triangular numbers. What is the 6th triangular number (sum of 1 to 6)?', answer: 21, hint: 'The differences are 2, 3, 4, 5, ... so add 6 to 15.' },
        { text: 'There is a formula: Sum = n(n+1)/2. Using this, find the sum of 1 to 10.', answer: 55, hint: 'Substitute n = 10: 10 \u00d7 11 / 2 = ?' },
        { text: 'Using the formula, find the sum of the first 100 natural numbers.', answer: 5050, hint: '100 \u00d7 101 / 2 = ?' },
    ],
    reset() { this.step = 0; this.correct = 0; },
    load() {
        if (this.step >= this.questions.length) {
            document.getElementById('numsum-card').innerHTML = `<div class="question-text" style="text-align:center;padding:32px 16px;"><h2 style="color:var(--success);margin-bottom:16px;">Investigation Complete!</h2><p>You got <strong>${this.correct}</strong> out of <strong>${this.questions.length}</strong> correct.</p><p style="margin-top:16px;">The general formula is: <strong>S = n(n+1)/2</strong></p><p style="margin-top:8px;color:var(--text-light);">This is attributed to Gauss, who allegedly discovered it as a child!</p><button class="btn btn-primary" style="margin-top:24px;" onclick="NUMSUM.reset();NUMSUM.load();">Start Again</button></div>`;
            document.getElementById('numsum-fb').classList.remove('show');
            document.getElementById('numsum-next').classList.remove('show');
            renderMath(); return;
        }
        const q = this.questions[this.step];
        let h = `<div class="question-text" style="margin-bottom:16px;"><span class="rule-tag">Step ${this.step + 1}/${this.questions.length}</span></div>`;
        h += `<div class="question-text">${q.text}</div>`;
        h += `<div class="input-area"><math-field class="lr-math-field" id="numsum-mf" placeholder="?"></math-field><button class="btn btn-primary" id="numsum-check">Check</button></div>`;
        document.getElementById('numsum-card').innerHTML = h;
        document.getElementById('numsum-fb').classList.remove('show','correct','incorrect');
        document.getElementById('numsum-next').classList.remove('show');
        document.getElementById('numsum-progress').textContent = `${this.step} / ${this.questions.length}`;
        document.getElementById('numsum-correct').textContent = this.correct;
        resetHint('numsum-hint', 'numsum-hint-btn');
        document.getElementById('numsum-workout').innerHTML = '';
        renderMath();
        setTimeout(() => {
            const mf = document.getElementById('numsum-mf');
            if (mf) { mf.focus(); mf.addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();NUMSUM.check();} }); }
            document.getElementById('numsum-check')?.addEventListener('click', () => NUMSUM.check());
        }, 200);
    },
    check() {
        const mf = document.getElementById('numsum-mf'); if (!mf || !mf.value.trim()) return;
        const q = this.questions[this.step];
        const ans = parseLatex(mf.value), ok = Math.abs(ans - q.answer) < 0.01;
        mf.disabled = true; document.getElementById('numsum-check').disabled = true;
        if (ok) this.correct++;
        const fb = document.getElementById('numsum-fb');
        fb.classList.remove('correct','incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('numsum-fb-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('numsum-fb-expl').innerHTML = ok ? 'Well done!' : `The answer is ${q.answer}.`;
        document.getElementById('numsum-next').classList.add('show');
        document.getElementById('numsum-progress').textContent = `${this.step + 1} / ${this.questions.length}`;
        document.getElementById('numsum-correct').textContent = this.correct;
        this.step++;
        if (window.markAnswered) window.markAnswered();
    },
    getHint() { return this.questions[this.step]?.hint || 'Think about the pattern.'; }
};
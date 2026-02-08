const DOTS = {
    step: 0, correct: 0,
    questions: [
        { text: 'Square numbers: 1, 4, 9, 16, ... How many dots in a 5\u00d75 square?',
          svg: `<svg width="200" height="60" style="display:block;margin:16px auto"><circle cx="20" cy="30" r="5" fill="#333"/><circle cx="60" cy="20" r="4" fill="#333"/><circle cx="75" cy="20" r="4" fill="#333"/><circle cx="60" cy="35" r="4" fill="#333"/><circle cx="75" cy="35" r="4" fill="#333"/><circle cx="110" cy="15" r="3" fill="#333"/><circle cx="125" cy="15" r="3" fill="#333"/><circle cx="140" cy="15" r="3" fill="#333"/><circle cx="110" cy="30" r="3" fill="#333"/><circle cx="125" cy="30" r="3" fill="#333"/><circle cx="140" cy="30" r="3" fill="#333"/><circle cx="110" cy="45" r="3" fill="#333"/><circle cx="125" cy="45" r="3" fill="#333"/><circle cx="140" cy="45" r="3" fill="#333"/><text x="20" y="55" text-anchor="middle" font-size="10">1</text><text x="67" y="55" text-anchor="middle" font-size="10">4</text><text x="125" y="55" text-anchor="middle" font-size="10">9</text></svg>`,
          answer: 25, hint: '5 \u00d7 5 = ?' },
        { text: 'What is the 10th square number?', answer: 100, hint: '10 \u00d7 10 = ?' },
        { text: 'Triangular numbers: 1, 3, 6, 10, ... What is the 7th triangular number?',
          svg: `<svg width="220" height="70" style="display:block;margin:16px auto"><circle cx="20" cy="30" r="5" fill="#9b59b6"/><circle cx="55" cy="20" r="4" fill="#9b59b6"/><circle cx="45" cy="35" r="4" fill="#9b59b6"/><circle cx="65" cy="35" r="4" fill="#9b59b6"/><circle cx="110" cy="10" r="3" fill="#9b59b6"/><circle cx="100" cy="25" r="3" fill="#9b59b6"/><circle cx="120" cy="25" r="3" fill="#9b59b6"/><circle cx="90" cy="40" r="3" fill="#9b59b6"/><circle cx="110" cy="40" r="3" fill="#9b59b6"/><circle cx="130" cy="40" r="3" fill="#9b59b6"/><text x="20" y="55" text-anchor="middle" font-size="10">1</text><text x="55" y="55" text-anchor="middle" font-size="10">3</text><text x="110" y="55" text-anchor="middle" font-size="10">6</text></svg>`,
          answer: 28, hint: '1+2+3+4+5+6+7 = ? or use n(n+1)/2' },
        { text: 'The difference between consecutive square numbers: 4-1=3, 9-4=5, 16-9=7. What is 25-16?', answer: 9, hint: 'The differences are odd numbers: 3, 5, 7, ...' },
        { text: 'The differences between square numbers are: 3, 5, 7, 9, ... These are odd numbers! The nth odd number is 2n-1. What is the 10th odd number?', answer: 19, hint: '2(10) - 1 = ?' },
        { text: 'A formula connects square and triangular numbers: The nth square = sum of first n odd numbers. Verify: 1+3+5+7 = ?', answer: 16, hint: 'This should equal 4\u00b2 = 16' },
    ],
    reset() { this.step = 0; this.correct = 0; },
    load() {
        if (this.step >= this.questions.length) {
            document.getElementById('dots-card').innerHTML = `<div class="question-text" style="text-align:center;padding:32px 16px;"><h2 style="color:var(--success);margin-bottom:16px;">Investigation Complete!</h2><p>You got <strong>${this.correct}</strong> out of <strong>${this.questions.length}</strong> correct.</p><p style="margin-top:16px;">Key formulas discovered:</p><p><strong>Square numbers: n\u00b2</strong></p><p><strong>Triangular numbers: n(n+1)/2</strong></p><p style="margin-top:8px;color:var(--text-light);">Square numbers = sum of first n odd numbers!</p><button class="btn btn-primary" style="margin-top:24px;" onclick="DOTS.reset();DOTS.load();">Start Again</button></div>`;
            document.getElementById('dots-fb').classList.remove('show');
            document.getElementById('dots-next').classList.remove('show');
            renderMath(); return;
        }
        const q = this.questions[this.step];
        let h = `<div class="question-text" style="margin-bottom:16px;"><span class="rule-tag">Step ${this.step + 1}/${this.questions.length}</span></div>`;
        h += `<div class="question-text">${q.text}</div>`;
        if (q.svg) h += q.svg;
        h += `<div class="input-area"><math-field class="lr-math-field" id="dots-mf" placeholder="?"></math-field><button class="btn btn-primary" id="dots-check">Check</button></div>`;
        document.getElementById('dots-card').innerHTML = h;
        document.getElementById('dots-fb').classList.remove('show','correct','incorrect');
        document.getElementById('dots-next').classList.remove('show');
        document.getElementById('dots-progress').textContent = `${this.step} / ${this.questions.length}`;
        document.getElementById('dots-correct').textContent = this.correct;
        resetHint('dots-hint', 'dots-hint-btn');
        document.getElementById('dots-workout').innerHTML = '';
        renderMath();
        setTimeout(() => {
            const mf = document.getElementById('dots-mf');
            if (mf) { mf.focus(); mf.addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();DOTS.check();} }); }
            document.getElementById('dots-check')?.addEventListener('click', () => DOTS.check());
        }, 200);
    },
    check() {
        const mf = document.getElementById('dots-mf'); if (!mf || !mf.value.trim()) return;
        const q = this.questions[this.step];
        const ans = parseLatex(mf.value), ok = Math.abs(ans - q.answer) < 0.01;
        mf.disabled = true; document.getElementById('dots-check').disabled = true;
        if (ok) this.correct++;
        const fb = document.getElementById('dots-fb');
        fb.classList.remove('correct','incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('dots-fb-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('dots-fb-expl').innerHTML = ok ? 'Well done!' : `The answer is ${q.answer}.`;
        document.getElementById('dots-next').classList.add('show');
        document.getElementById('dots-progress').textContent = `${this.step + 1} / ${this.questions.length}`;
        document.getElementById('dots-correct').textContent = this.correct;
        this.step++;
        if (window.markAnswered) window.markAnswered();
    },
    getHint() { return this.questions[this.step]?.hint || 'Think about the pattern.'; }
};
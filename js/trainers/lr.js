const LR = {
    score: 0, total: 0, streak: 0, currentQ: null, answered: false, hintIdx: 0,

    qEvaluate() {
        const b = pick(BASES), n = randInt(1,5), v = Math.pow(b,n);
        if (v > 100000) return LR.qEvaluate();
        return { type:'free', rule:'Evaluate', text:'Evaluate:', latex: logTex(b,v),
            answer:n, answerTex:String(n),
            hintTex:[`Use the definition: \\(${logTex(b,'x')} = n\\) means \\(${b}^n = x\\).`,`Think: \\(${b}\\) to the power of what gives \\(${v}\\)?`],
            explain:`Since \\(${b}^{${n}}=${v}\\), we get \\(${logTex(b,v)}=${n}\\).` };
    },
    qIdZero() {
        const b = pick(BASES);
        return { type:'free', rule:'Identity', text:'Evaluate:', latex: logTex(b,1),
            answer:0, answerTex:'0',
            hintTex:['Any number raised to what power gives 1?','Remember: \\(a^0 = 1\\) for any base \\(a\\).'],
            explain:`\\(${logTex(b,1)}=0\\) because \\(${b}^{0}=1\\).` };
    },
    qIdOne() {
        const b = pick(BASES);
        return { type:'free', rule:'Identity', text:'Evaluate:', latex: logTex(b,b),
            answer:1, answerTex:'1',
            hintTex:[`What power of \\(${b}\\) gives \\(${b}\\)?`,`Remember: \\(a^1 = a\\) for any base.`],
            explain:`\\(${logTex(b,b)}=1\\) because \\(${b}^{1}=${b}\\).` };
    },
    qProduct() {
        const b=pick(BASES), m=randInt(2,9), n=randInt(2,9), mn=m*n;
        const c = `\\(${logTex(b,mn)}\\)`;
        return { type:'mc', rule:'Product Rule', text:'Simplify:',
            latex:`${logTex(b,m)} + ${logTex(b,n)}`, answer:c,
            hintTex:['Adding logs means multiplying the arguments.',`Product Rule: \\(\\log(a) + \\log(b) = \\log(a \\cdot b)\\).`,`Calculate \\(${m} \\times ${n} = ${mn}\\).`],
            options:shuffle([c, `\\(${logTex(b,m+n)}\\)`,
                `\\(${logTex(b,m)} \\cdot ${logTex(b,n)}\\)`, `\\(${logTex(b*b,mn)}\\)`]),
            explain:`Product Rule: \\(${logTex(b,m)}+${logTex(b,n)} = ${logTex(b,m+'\\cdot '+n)} = ${logTex(b,mn)}\\).` };
    },
    qQuotient() {
        const b=pick(BASES), n=randInt(2,6), k=randInt(2,5), m=n*k;
        const c = `\\(${logTex(b,k)}\\)`;
        return { type:'mc', rule:'Quotient Rule', text:'Simplify:',
            latex:`${logTex(b,m)} - ${logTex(b,n)}`, answer:c,
            hintTex:['Subtracting logs means dividing the arguments.',`Quotient Rule: \\(\\log(a) - \\log(b) = \\log\\!\\left(\\frac{a}{b}\\right)\\).`,`Calculate \\(${m} \\div ${n} = ${k}\\).`],
            options:shuffle([c, `\\(${logTex(b,m-n)}\\)`,
                `\\(\\dfrac{${logTex(b,m)}}{${logTex(b,n)}}\\)`, `\\(${logTex(b,n)}\\)`]),
            explain:`Quotient Rule: \\(${logTex(b,m)}-${logTex(b,n)} = ${logTex(b,'\\tfrac{'+m+'}{'+n+'}')} = ${logTex(b,k)}\\).` };
    },
    qPower() {
        const b=pick(BASES), m=randInt(2,7), k=randInt(2,4), mk=Math.pow(m,k);
        const c = `\\(${logTex(b,mk)}\\)`;
        return { type:'mc', rule:'Power Rule', text:'Simplify:',
            latex:`${k}\\cdot ${logTex(b,m)}`, answer:c,
            hintTex:['A coefficient in front of a log becomes an exponent inside.',`Power Rule: \\(k \\cdot \\log(m) = \\log(m^k)\\).`,`Calculate \\(${m}^{${k}} = ${mk}\\).`],
            options:shuffle([c, `\\(${logTex(b,k*m)}\\)`,
                `\\(${logTex(Math.pow(b,k),m)}\\)`, `\\(${k}+${logTex(b,m)}\\)`]),
            explain:`Power Rule: \\(${k}\\cdot ${logTex(b,m)} = ${logTex(b,m+'^{'+k+'}')} = ${logTex(b,mk)}\\).` };
    },
    qChangeOfBase() {
        const c=pick([2,3,5]), n=randInt(2,4), v=Math.pow(c,n);
        let a; do{a=pick(BASES);}while(a===c);
        return { type:'free', rule:'Change of Base', text:'Evaluate:',
            latex:`\\dfrac{${logTex(a,v)}}{${logTex(a,c)}}`, answer:n, answerTex:String(n),
            hintTex:[`When you divide two logs with the same base, you can change the base.`,`\\(\\frac{\\log_a(b)}{\\log_a(c)} = \\log_c(b)\\).`,`So this equals \\(${logTex(c,v)}\\). Now evaluate.`],
            explain:`Change of Base: \\(\\dfrac{${logTex(a,v)}}{${logTex(a,c)}} = ${logTex(c,v)} = ${n}\\) since \\(${c}^{${n}}=${v}\\).` };
    },
    qChangeOfBaseFrac() {
        const c=pick([2,3,5]); let p=randInt(2,4), q=randInt(2,4);
        if(p===q) return LR.qChangeOfBaseFrac();
        const vp=Math.pow(c,p), vq=Math.pow(c,q);
        let a; do{a=pick(BASES);}while(a===c);
        const g=gcd(p,q), sp=p/g, sq=q/g, ans=p/q;
        return { type:'free', rule:'Change of Base', text:'Evaluate:',
            latex:`\\dfrac{${logTex(a,vp)}}{${logTex(a,vq)}}`, answer:ans,
            answerTex: Number.isInteger(ans)?String(ans):`\\dfrac{${sp}}{${sq}}`,
            hintTex:['Use change of base to simplify the fraction.',`This equals \\(\\frac{${logTex(c,vp)}}{${logTex(c,vq)}}\\).`,`Evaluate each: \\(${logTex(c,vp)}=${p}\\) and \\(${logTex(c,vq)}=${q}\\). Now divide.`],
            explain:`\\(\\dfrac{${logTex(a,vp)}}{${logTex(a,vq)}} = \\dfrac{${logTex(c,vp)}}{${logTex(c,vq)}} = \\dfrac{${p}}{${q}}`+(g>1?` = \\dfrac{${sp}}{${sq}}`:'')+'\\).' };
    },
    qExpandProduct() {
        const b=pick(BASES), m=randInt(2,9), n=randInt(2,9), mn=m*n;
        const c = `\\(${logTex(b,m)} + ${logTex(b,n)}\\)`;
        return { type:'mc', rule:'Product Rule', text:'Express as a sum of two logs:',
            latex:logTex(b,mn), hint:`(${mn} = ${m} \\times ${n})`, answer:c,
            hintTex:['Use the Product Rule in reverse: \\(\\log(mn) = \\log(m) + \\log(n)\\).',`Factor \\(${mn}\\) into two numbers.`,`\\(${mn} = ${m} \\times ${n}\\).`],
            options:shuffle([c, `\\(${logTex(b,m)} \\cdot ${logTex(b,n)}\\)`,
                `\\(${logTex(b,m)} - ${logTex(b,n)}\\)`, `\\(${logTex(b+b,mn)}\\)`]),
            explain:`Product Rule: \\(${logTex(b,mn)} = ${logTex(b,m)}+${logTex(b,n)}\\) since \\(${m}\\times${n}=${mn}\\).` };
    },
    qExpandPower() {
        const b=pick(BASES), m=randInt(2,7), k=randInt(2,4);
        const c = `\\(${k}\\cdot ${logTex(b,m)}\\)`;
        return { type:'mc', rule:'Power Rule', text:'Rewrite using the Power Rule:',
            latex:logTex(b,m+'^{'+k+'}'), answer:c,
            hintTex:['The Power Rule lets you move the exponent.',`\\(\\log(m^k) = k \\cdot \\log(m)\\). Bring the \\(${k}\\) down as a coefficient.`],
            options:shuffle([c, `\\(${logTex(b,m)}^{${k}}\\)`,
                `\\(${logTex(Math.pow(b,k),m)}\\)`, `\\(${logTex(b,k+'\\cdot'+m)}\\)`]),
            explain:`Power Rule: \\(${logTex(b,m+'^{'+k+'}')} = ${k}\\cdot ${logTex(b,m)}\\).` };
    },

    pool: null,
    init() {
        this.pool = [
            this.qEvaluate, this.qEvaluate,
            this.qIdZero, this.qIdOne,
            this.qProduct, this.qProduct,
            this.qQuotient, this.qQuotient,
            this.qPower, this.qPower,
            this.qChangeOfBase, this.qChangeOfBaseFrac,
            this.qExpandProduct, this.qExpandPower
        ];
        loadTrainerStats('lr',this);
    },
    next() { return pick(this.pool)(); },

    load() {
        this.answered = false;
        this.currentQ = this.next();
        const q = this.currentQ;
        let h = `<div class="rule-tag">${q.rule}</div>`;
        h += `<div class="question-text">${q.text}</div>`;
        h += `<div class="question-prompt">\\(${q.latex}\\)</div>`;
        if (q.hint) h += `<div class="question-hint">\\(${q.hint}\\)</div>`;

        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o,i) => { h += `<button class="option-btn" data-i="${i}">${o}</button>`; });
            h += '</div>';
        } else {
            h += `<div class="input-area">
                    <math-field class="lr-math-field" id="lr-mf" placeholder="Type your answer"></math-field>
                    <button class="btn btn-primary" id="lr-check">Check</button>
                  </div>`;
        }

        document.getElementById('lr-card').innerHTML = h;
        const fb = document.getElementById('lr-fb');
        fb.classList.remove('show','correct','incorrect');
        document.getElementById('lr-next').classList.remove('show');
        this.hintIdx = 0;
        resetHint('lr-hint', 'lr-hint-btn');
        document.getElementById('lr-workout').innerHTML = '';
        renderMath();

        if (q.type === 'mc') {
            document.getElementById('lr-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => LR.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(() => {
                const mf = document.getElementById('lr-mf');
                if (mf) { mf.focus(); mf.addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();LR.handleFree();} }); }
                const cb = document.getElementById('lr-check');
                if (cb) cb.addEventListener('click', () => LR.handleFree());
            }, 200);
        }
    },

    handleMC(idx) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ, chosen = q.options[idx], ok = chosen === q.answer;
        document.getElementById('lr-card').querySelectorAll('.option-btn').forEach((btn,i) => {
            btn.disabled = true;
            if (q.options[i] === q.answer) btn.classList.add('correct');
            if (i === idx && !ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        this.showFb(ok, q.explain);
    },

    handleFree() {
        if (this.answered) return;
        const mf = document.getElementById('lr-mf');
        if (!mf) return;
        const latex = mf.value;
        if (!latex || !latex.trim()) return;
        this.answered = true;
        const ok = Math.abs(parseLatex(latex) - this.currentQ.answer) < 0.0001;
        mf.disabled = true;
        const cb = document.getElementById('lr-check');
        if (cb) cb.disabled = true;
        let extra = '';
        if (!ok) extra = `<br>The correct answer is \\(${this.currentQ.answerTex}\\).`;
        this.record(ok);
        this.showFb(ok, this.currentQ.explain + extra);
    },

    record(ok) {
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        document.getElementById('lr-score').textContent = `${this.score} / ${this.total}`;
        document.getElementById('lr-pct').textContent = this.total ? Math.round(this.score/this.total*100)+'%' : '\u2014';
        document.getElementById('lr-streak').textContent = this.streak;
        saveTrainerStats('lr',this);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('lr-fb');
        fb.classList.remove('correct','incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        fb.style.textAlign = 'center';
        document.getElementById('lr-fb-title').textContent = ok ? 'Correct!' : 'Not quite\u2026';
        document.getElementById('lr-fb-expl').innerHTML = html;
        document.getElementById('lr-next').classList.add('show');
        renderMath();
        fb.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }
};
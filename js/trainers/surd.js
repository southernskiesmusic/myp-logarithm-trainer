const SURD = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    qSimplify() {
        const k=randInt(2,6), n=pick([2,3,5,6,7,10,11]), val=k*k*n;
        return { type:'free', rule:'Simplify', difficulty:'easy', text:`Simplify \\(\\sqrt{${val}}\\). Give the number outside the root:`,
            latex:`\\sqrt{${val}}`, answer:k, answerTex:`${k}\\sqrt{${n}}`,
            hintTex:[`Find a square factor of ${val}.`,`\\(${val} = ${k*k} \\times ${n} = ${k}^2 \\times ${n}\\)`],
            explain:`\\(\\sqrt{${val}} = \\sqrt{${k}^2 \\times ${n}} = ${k}\\sqrt{${n}}\\)` };
    },
    qMultiply() {
        // Avoid perfect squares (4, 9, etc.) so answer stays as √n
        const primes = [2,3,5,7,11];
        const a=pick(primes), b=pick(primes), ans=a*b;
        return { type:'free', rule:'Multiply', difficulty:'easy', text:'Simplify. Give the number under the root:',
            latex:`\\sqrt{${a}} \\times \\sqrt{${b}}`, answer:ans, answerTex:String(ans),
            hintTex:['Multiply surds: multiply the numbers under the roots.',`\\(\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}\\)`],
            explain:`\\(\\sqrt{${a}} \\times \\sqrt{${b}} = \\sqrt{${a} \\times ${b}} = \\sqrt{${ans}}\\)` };
    },
    qAdd() {
        const k=randInt(2,5), a=randInt(2,5), b=randInt(1,4), ans=a+b;
        return { type:'free', rule:'Add', difficulty:'medium', text:`Simplify. Give the coefficient of \\(\\sqrt{${k}}\\):`,
            latex:`${a}\\sqrt{${k}} + ${b}\\sqrt{${k}}`, answer:ans, answerTex:`${ans}\\sqrt{${k}}`,
            hintTex:['Add like surds by adding coefficients.',`\\(${a} + ${b} = ${ans}\\)`],
            explain:`\\(${a}\\sqrt{${k}} + ${b}\\sqrt{${k}} = ${ans}\\sqrt{${k}}\\)` };
    },
    qExpand() {
        const a=randInt(1,4), b=randInt(2,5);
        const intPart=a*a+b, coeff=2*a;
        const correct = `${intPart} + ${coeff}\\sqrt{${b}}`;
        // Generate wrong answers
        const wrongs = [
            `${a*a} + ${coeff}\\sqrt{${b}}`,       // forgot to add b
            `${intPart} + ${a}\\sqrt{${b}}`,       // forgot to double coefficient
            `${intPart+1} + ${coeff}\\sqrt{${b}}`  // arithmetic error
        ];
        const opts = shuffle([correct, ...wrongs]);
        return { type:'mc', rule:'Expand', difficulty:'medium', text:'Expand and simplify:',
            latex:`(${a}+\\sqrt{${b}})^2`, answer:correct, options:opts,
            hintTex:['Use \\((a+b)^2 = a^2 + 2ab + b^2\\).',`\\(${a}^2 + 2(${a})(\\sqrt{${b}}) + (\\sqrt{${b}})^2\\)`],
            explain:`\\(${a}^2 + 2(${a})\\sqrt{${b}} + ${b} = ${a*a} + ${coeff}\\sqrt{${b}} + ${b} = ${correct}\\)` };
    },
    qRationalise() {
        const a=randInt(2,5);
        return { type:'free', rule:'Rationalise', difficulty:'hard', text:`Rationalise \\(\\frac{1}{\\sqrt{${a}}}\\). Give the number under the root in your answer:`,
            latex:`\\frac{1}{\\sqrt{${a}}}`, answer:a, answerTex:String(a),
            hintTex:['Multiply top and bottom by \\(\\sqrt{'+a+'}\\).',`\\(\\frac{1}{\\sqrt{${a}}} \\times \\frac{\\sqrt{${a}}}{\\sqrt{${a}}}\\)`],
            explain:`\\(\\frac{1}{\\sqrt{${a}}} = \\frac{\\sqrt{${a}}}{${a}}\\). The number under the root is \\(${a}\\).` };
    },
    qRationaliseConj() {
        const a=randInt(1,3), b=randInt(2,5);
        const denom=a*a-b;
        return { type:'free', rule:'Rationalise', difficulty:'hard', text:`Rationalise \\(\\frac{1}{${a}+\\sqrt{${b}}}\\). Give the denominator of your answer:`,
            latex:`\\frac{1}{${a}+\\sqrt{${b}}}`, answer:Math.abs(denom), answerTex:String(Math.abs(denom)),
            hintTex:['Multiply by conjugate: \\('+a+'-\\sqrt{'+b+'}\\).',`Denominator: \\((${a})^2 - (\\sqrt{${b}})^2 = ${a*a} - ${b} = ${denom}\\)`],
            explain:`\\(\\frac{1}{${a}+\\sqrt{${b}}} \\times \\frac{${a}-\\sqrt{${b}}}{${a}-\\sqrt{${b}}} = \\frac{${a}-\\sqrt{${b}}}{${denom}}\\). The denominator is \\(${Math.abs(denom)}\\).` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qSimplify,this.qMultiply], medium:[this.qAdd,this.qExpand], hard:[this.qRationalise,this.qRationaliseConj] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
        loadTrainerStats('surd',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('surd-score').textContent='0 / 0'; document.getElementById('surd-pct').textContent='\u2014'; document.getElementById('surd-streak').textContent='0'; saveTrainerStats('surd',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o,i) => { h += `<button class="option-btn" data-i="${i}">\\(${o}\\)</button>`; });
            h += '</div>';
        } else {
            h+=`<div class="input-area"><math-field class="lr-math-field" id="surd-mf" placeholder="?"></math-field><button class="btn btn-primary" id="surd-check">Check</button></div>`;
        }
        document.getElementById('surd-card').innerHTML=h;
        document.getElementById('surd-fb').classList.remove('show','correct','incorrect');
        document.getElementById('surd-next').classList.remove('show');
        resetHint('surd-hint','surd-hint-btn');
        document.getElementById('surd-workout').innerHTML='';
        renderMath();
        if (q.type === 'mc') {
            document.getElementById('surd-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => SURD.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(()=>{const mf=document.getElementById('surd-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();SURD.check();}});}document.getElementById('surd-check')?.addEventListener('click',()=>SURD.check());},200);
        }
    },
    handleMC(idx) {
        if(this.answered) return;
        this.answered=true;
        const q=this.currentQ, chosen=q.options[idx], ok=chosen===q.answer;
        document.getElementById('surd-card').querySelectorAll('.option-btn').forEach((btn,i) => {
            btn.disabled=true;
            if(q.options[i]===q.answer) btn.classList.add('correct');
            if(i===idx&&!ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        let ex=q.explain; if(!ok)ex=`The answer is \\(${q.answer}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('surd-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('surd-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('surd-score').textContent=`${this.score} / ${this.total}`; document.getElementById('surd-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('surd-streak').textContent=this.streak; saveTrainerStats('surd',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('surd-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('surd-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('surd-fb-expl').innerHTML=html; document.getElementById('surd-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

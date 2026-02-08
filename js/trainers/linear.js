const LINEAR = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: One-step (x + a = b)
    qOneStepAdd() {
        const x=randInt(-10,10), a=randInt(1,10), b=x+a;
        return { type:'free', rule:'One-step', difficulty:'easy', text:'Solve for x:',
            latex:`x + ${a} = ${b}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Subtract '+a+' from both sides.',`x = ${b} - ${a}`],
            explain:`\\(x + ${a} = ${b}\\) so \\(x = ${b} - ${a} = ${x}\\)` };
    },

    // Easy: One-step (ax = b)
    qOneStepMult() {
        const x=randInt(1,10), a=randInt(2,6), b=a*x;
        return { type:'free', rule:'One-step', difficulty:'easy', text:'Solve for x:',
            latex:`${a}x = ${b}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Divide both sides by '+a+'.',`x = ${b} \\div ${a}`],
            explain:`\\(${a}x = ${b}\\) so \\(x = ${b} \\div ${a} = ${x}\\)` };
    },

    // Easy: One-step (x - a = b)
    qOneStepSub() {
        const x=randInt(1,15), a=randInt(1,10), b=x-a;
        return { type:'free', rule:'One-step', difficulty:'easy', text:'Solve for x:',
            latex:`x - ${a} = ${b}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Add '+a+' to both sides.',`x = ${b} + ${a}`],
            explain:`\\(x - ${a} = ${b}\\) so \\(x = ${b} + ${a} = ${x}\\)` };
    },

    // Medium: Two-step (ax + b = c)
    qTwoStep() {
        const x=randInt(1,10), a=randInt(2,5), b=randInt(1,10), c=a*x+b;
        return { type:'free', rule:'Two-step', difficulty:'medium', text:'Solve for x:',
            latex:`${a}x + ${b} = ${c}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['First subtract '+b+' from both sides.',`${a}x = ${c-b}. Now divide by ${a}.`],
            explain:`\\(${a}x + ${b} = ${c}\\). Subtract ${b}: \\(${a}x = ${c-b}\\). Divide by ${a}: \\(x = ${x}\\)` };
    },

    // Medium: x on both sides (ax + b = cx + d)
    qBothSides() {
        const x=randInt(1,8), a=randInt(3,6), c=randInt(1,a-1), b=randInt(1,10), d=a*x+b-c*x;
        return { type:'free', rule:'Both sides', difficulty:'medium', text:'Solve for x:',
            latex:`${a}x + ${b} = ${c}x + ${d}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Get all x terms on one side.',`${a}x - ${c}x = ${d} - ${b}`,`${a-c}x = ${d-b}`],
            explain:`\\(${a}x - ${c}x = ${d} - ${b}\\), so \\(${a-c}x = ${d-b}\\), hence \\(x = ${x}\\)` };
    },

    // Medium: Fraction (x/a = b)
    qFraction() {
        const x=randInt(2,10)*randInt(2,5), a=randInt(2,5), b=x/a;
        if(!Number.isInteger(b)) return LINEAR.qFraction();
        return { type:'free', rule:'Fractions', difficulty:'medium', text:'Solve for x:',
            latex:`\\frac{x}{${a}} = ${b}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Multiply both sides by '+a+'.',`x = ${b} \\times ${a}`],
            explain:`\\(\\frac{x}{${a}} = ${b}\\) so \\(x = ${b} \\times ${a} = ${x}\\)` };
    },

    // Hard: Brackets a(x + b) = c
    qBrackets() {
        const x=randInt(1,8), a=randInt(2,5), b=randInt(1,6), c=a*(x+b);
        return { type:'free', rule:'Brackets', difficulty:'hard', text:'Solve for x:',
            latex:`${a}(x + ${b}) = ${c}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Expand the bracket first, or divide both sides by '+a+'.',`x + ${b} = ${c/a}`,`x = ${c/a} - ${b}`],
            explain:`\\(${a}(x + ${b}) = ${c}\\). Divide by ${a}: \\(x + ${b} = ${c/a}\\). So \\(x = ${x}\\)` };
    },

    // Hard: Brackets on both sides
    qBracketsBoth() {
        const x=randInt(1,6), a=randInt(2,4), b=randInt(1,5), c=randInt(2,4), d=randInt(1,5);
        const lhs = a*(x+b), rhs = c*(x+d);
        if(a===c) return LINEAR.qBracketsBoth();
        const diff = lhs - rhs;
        return { type:'free', rule:'Brackets', difficulty:'hard', text:'Solve for x:',
            latex:`${a}(x + ${b}) = ${c}(x + ${d}) + ${diff}`, answer:x, answerTex:`x = ${x}`,
            hintTex:['Expand both brackets.',`${a}x + ${a*b} = ${c}x + ${c*d} + ${diff}`,`Collect x terms: ${a-c}x = ${c*d + diff - a*b}`],
            explain:`Expand: \\(${a}x + ${a*b} = ${c}x + ${c*d + diff}\\). Solve: \\(x = ${x}\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qOneStepAdd,this.qOneStepMult,this.qOneStepSub], medium:[this.qTwoStep,this.qBothSides,this.qFraction], hard:[this.qBrackets,this.qBracketsBoth] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('linear-score').textContent='0 / 0'; document.getElementById('linear-pct').textContent='\u2014'; document.getElementById('linear-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="linear-mf" placeholder="?"></math-field><button class="btn btn-primary" id="linear-check">Check</button></div>`;
        document.getElementById('linear-card').innerHTML=h;
        document.getElementById('linear-fb').classList.remove('show','correct','incorrect');
        document.getElementById('linear-next').classList.remove('show');
        resetHint('linear-hint','linear-hint-btn');
        document.getElementById('linear-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('linear-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();LINEAR.check();}});}document.getElementById('linear-check')?.addEventListener('click',()=>LINEAR.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('linear-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('linear-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('linear-score').textContent=`${this.score} / ${this.total}`; document.getElementById('linear-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('linear-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('linear-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('linear-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('linear-fb-expl').innerHTML=html; document.getElementById('linear-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

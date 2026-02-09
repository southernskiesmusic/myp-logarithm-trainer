const INEQ = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: One-step x + a > b
    qOneStepAdd() {
        const x=randInt(1,10), a=randInt(1,10), b=x+a-randInt(1,5);
        const ans = b-a;
        const op = pick(['>', '<', '\\geq', '\\leq']);
        return { type:'free', rule:'One-step', difficulty:'easy', text:`Solve for x. Give the boundary value:`,
            latex:`x + ${a} ${op} ${b}`, answer:ans, answerTex:`x ${op} ${ans}`,
            hintTex:['Subtract '+a+' from both sides.',`x ${op} ${b} - ${a}`],
            explain:`\\(x + ${a} ${op} ${b}\\) so \\(x ${op} ${b} - ${a} = ${ans}\\)` };
    },

    // Easy: One-step ax > b
    qOneStepMult() {
        const x=randInt(2,8), a=randInt(2,5), b=a*x;
        const op = pick(['>', '<', '\\geq', '\\leq']);
        return { type:'free', rule:'One-step', difficulty:'easy', text:`Solve for x. Give the boundary value:`,
            latex:`${a}x ${op} ${b}`, answer:x, answerTex:`x ${op} ${x}`,
            hintTex:['Divide both sides by '+a+'.',`x ${op} ${b} \\div ${a}`],
            explain:`\\(${a}x ${op} ${b}\\) so \\(x ${op} ${b} \\div ${a} = ${x}\\)` };
    },

    // Medium: Two-step ax + b > c
    qTwoStep() {
        const x=randInt(1,8), a=randInt(2,5), b=randInt(1,10), c=a*x+b;
        const op = pick(['>', '<']);
        return { type:'free', rule:'Two-step', difficulty:'medium', text:`Solve for x. Give the boundary value:`,
            latex:`${a}x + ${b} ${op} ${c}`, answer:x, answerTex:`x ${op} ${x}`,
            hintTex:['First subtract '+b+' from both sides.',`${a}x ${op} ${c-b}. Now divide by ${a}.`],
            explain:`\\(${a}x + ${b} ${op} ${c}\\). Subtract ${b}: \\(${a}x ${op} ${c-b}\\). Divide: \\(x ${op} ${x}\\)` };
    },

    // Medium: Negative coefficient (flip sign)
    qNegative() {
        const x=randInt(1,8), a=randInt(-5,-2), b=a*x;
        return { type:'free', rule:'Negative', difficulty:'medium', text:`Solve for x. Give the boundary value (inequality flips when dividing by negative):`,
            latex:`${a}x > ${b}`, answer:x, answerTex:`x < ${x}`,
            hintTex:['When dividing by a negative, flip the inequality sign!',`x < ${b} \\div (${a})`],
            explain:`\\(${a}x > ${b}\\). Divide by ${a} and flip: \\(x < ${x}\\)` };
    },

    // Hard: Double inequality a < x + b < c
    qDouble() {
        const x1=randInt(1,5), x2=x1+randInt(2,5), b=randInt(1,5);
        const a=x1+b, c=x2+b;
        return { type:'free', rule:'Double', difficulty:'hard', text:`Solve the double inequality. Give the lower bound:`,
            latex:`${a} < x + ${b} < ${c}`, answer:x1, answerTex:`${x1} < x < ${x2}`,
            hintTex:['Subtract '+b+' from all three parts.',`${a} - ${b} < x < ${c} - ${b}`],
            explain:`Subtract ${b}: \\(${a-b} < x < ${c-b}\\), so \\(${x1} < x < ${x2}\\)` };
    },

    // Hard: Brackets a(x + b) > c
    qBrackets() {
        const x=randInt(2,8), a=randInt(2,4), b=randInt(1,5), c=a*(x+b);
        const op = pick(['>', '<']);
        return { type:'free', rule:'Brackets', difficulty:'hard', text:`Solve for x. Give the boundary value:`,
            latex:`${a}(x + ${b}) ${op} ${c}`, answer:x, answerTex:`x ${op} ${x}`,
            hintTex:['Expand or divide both sides by '+a+' first.',`x + ${b} ${op} ${c/a}`,`x ${op} ${c/a} - ${b}`],
            explain:`\\(${a}(x + ${b}) ${op} ${c}\\). Divide by ${a}: \\(x + ${b} ${op} ${c/a}\\). So \\(x ${op} ${x}\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qOneStepAdd,this.qOneStepMult], medium:[this.qTwoStep,this.qNegative], hard:[this.qDouble,this.qBrackets] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
loadTrainerStats('ineq',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('ineq-score').textContent='0 / 0'; document.getElementById('ineq-pct').textContent='\u2014'; document.getElementById('ineq-streak').textContent='0'; saveTrainerStats('ineq',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="ineq-mf" placeholder="?"></math-field><button class="btn btn-primary" id="ineq-check">Check</button></div>`;
        document.getElementById('ineq-card').innerHTML=h;
        document.getElementById('ineq-fb').classList.remove('show','correct','incorrect');
        document.getElementById('ineq-next').classList.remove('show');
        resetHint('ineq-hint','ineq-hint-btn');
        document.getElementById('ineq-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('ineq-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();INEQ.check();}});}document.getElementById('ineq-check')?.addEventListener('click',()=>INEQ.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('ineq-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('ineq-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('ineq-score').textContent=`${this.score} / ${this.total}`; document.getElementById('ineq-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('ineq-streak').textContent=this.streak; saveTrainerStats('ineq',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('ineq-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('ineq-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('ineq-fb-expl').innerHTML=html; document.getElementById('ineq-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};
const LINF = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: Find gradient from y = mx + c
    qGradientFromEq() {
        const m = randInt(-5, 5), c = randInt(-10, 10);
        if (m === 0) return LINF.qGradientFromEq();
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        return { type:'free', rule:'Gradient', difficulty:'easy', text:'What is the gradient of this line?',
            latex:`y = ${m}x ${cStr}`, answer:m, answerTex:String(m),
            hintTex:['In y = mx + c, the gradient is m.',`Compare with y = mx + c`],
            explain:`In \\(y = mx + c\\), the gradient is \\(m = ${m}\\)` };
    },

    // Easy: Find y-intercept from y = mx + c
    qYIntercept() {
        const m = randInt(-5, 5), c = randInt(-10, 10);
        if (m === 0) return LINF.qYIntercept();
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        return { type:'free', rule:'Y-intercept', difficulty:'easy', text:'What is the y-intercept of this line?',
            latex:`y = ${m}x ${cStr}`, answer:c, answerTex:String(c),
            hintTex:['In y = mx + c, the y-intercept is c.',`The line crosses the y-axis at (0, c)`],
            explain:`In \\(y = mx + c\\), the y-intercept is \\(c = ${c}\\)` };
    },

    // Easy: Find gradient from two points
    qGradientTwoPoints() {
        const x1 = randInt(0, 5), y1 = randInt(-5, 5);
        const x2 = x1 + randInt(1, 4), m = randInt(-3, 3);
        if (m === 0) return LINF.qGradientTwoPoints();
        const y2 = y1 + m * (x2 - x1);
        return { type:'free', rule:'Gradient', difficulty:'easy', text:'Find the gradient of the line through these points:',
            latex:`(${x1}, ${y1}) \\text{ and } (${x2}, ${y2})`, answer:m, answerTex:String(m),
            hintTex:['Gradient = rise / run = (y\u2082 - y\u2081) / (x\u2082 - x\u2081)',`m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2-y1}}{${x2-x1}}`],
            explain:`\\(m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2-y1}}{${x2-x1}} = ${m}\\)` };
    },

    // Medium: Rearrange to y = mx + c, find gradient
    qRearrangeGradient() {
        const m = randInt(1, 4), c = randInt(-8, 8);
        const a = randInt(2, 4);
        // ax + by = c form where b divides evenly
        const rhs = a * c + m * a;
        return { type:'free', rule:'Rearrange', difficulty:'medium', text:'Rearrange to y = mx + c. What is the gradient?',
            latex:`${a}x + ${a}y = ${rhs}`, answer:-1, answerTex:'-1',
            hintTex:['Rearrange to make y the subject.',`${a}y = ${rhs} - ${a}x`],
            explain:`\\(${a}y = -${a}x + ${rhs}\\), so \\(y = -x + ${rhs/a}\\). Gradient = \\(-1\\)` };
    },

    // Medium: Find equation given point and gradient
    qEqFromPointGradient() {
        const m = randInt(-3, 3), x1 = randInt(1, 5), y1 = randInt(-5, 5);
        if (m === 0) return LINF.qEqFromPointGradient();
        const c = y1 - m * x1;
        return { type:'free', rule:'Equation', difficulty:'medium', text:`Find the y-intercept of a line with gradient ${m} passing through (${x1}, ${y1}):`,
            latex:`m = ${m}, \\text{ point } (${x1}, ${y1})`, answer:c, answerTex:String(c),
            hintTex:['Use y = mx + c, substitute the point to find c.',`${y1} = ${m} \\times ${x1} + c`],
            explain:`\\(${y1} = ${m}(${x1}) + c\\), so \\(c = ${y1} - ${m*x1} = ${c}\\)` };
    },

    // Medium: Parallel line gradient
    qParallel() {
        const m = randInt(-5, 5), c = randInt(-10, 10);
        if (m === 0) return LINF.qParallel();
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        return { type:'free', rule:'Parallel', difficulty:'medium', text:'What is the gradient of a line parallel to this?',
            latex:`y = ${m}x ${cStr}`, answer:m, answerTex:String(m),
            hintTex:['Parallel lines have the same gradient.',`If y = mx + c, parallel lines also have gradient m`],
            explain:`Parallel lines have equal gradients. Gradient = \\(${m}\\)` };
    },

    // Hard: Perpendicular line gradient
    qPerpendicular() {
        const m = pick([2, 3, 4, -2, -3, -4]);
        const c = randInt(-5, 5);
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        const perpM = -1 / m;
        return { type:'free', rule:'Perpendicular', difficulty:'hard', text:'What is the gradient of a line perpendicular to this? (Give as a fraction if needed)',
            latex:`y = ${m}x ${cStr}`, answer:perpM, answerTex:`-\\frac{1}{${m}}`,
            hintTex:['Perpendicular gradients multiply to -1.',`m_1 \\times m_2 = -1`],
            explain:`Perpendicular gradient = \\(-\\frac{1}{${m}} = ${perpM}\\)` };
    },

    // Hard: Find equation from two points (give gradient)
    qEqTwoPoints() {
        const x1 = randInt(0, 3), y1 = randInt(-3, 3);
        const m = randInt(-2, 2);
        if (m === 0) return LINF.qEqTwoPoints();
        const x2 = x1 + randInt(2, 4), y2 = y1 + m * (x2 - x1);
        const c = y1 - m * x1;
        return { type:'free', rule:'Equation', difficulty:'hard', text:'Find the equation of the line through these points. Give the y-intercept:',
            latex:`(${x1}, ${y1}) \\text{ and } (${x2}, ${y2})`, answer:c, answerTex:String(c),
            hintTex:['First find gradient, then use y = mx + c with one point.',`m = \\frac{${y2-y1}}{${x2-x1}} = ${m}`],
            explain:`Gradient = ${m}. Using point (${x1}, ${y1}): \\(${y1} = ${m}(${x1}) + c\\), so \\(c = ${c}\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qGradientFromEq,this.qYIntercept,this.qGradientTwoPoints], medium:[this.qRearrangeGradient,this.qEqFromPointGradient,this.qParallel], hard:[this.qPerpendicular,this.qEqTwoPoints] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('linf-score').textContent='0 / 0'; document.getElementById('linf-pct').textContent='\u2014'; document.getElementById('linf-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="linf-mf" placeholder="?"></math-field><button class="btn btn-primary" id="linf-check">Check</button></div>`;
        document.getElementById('linf-card').innerHTML=h;
        document.getElementById('linf-fb').classList.remove('show','correct','incorrect');
        document.getElementById('linf-next').classList.remove('show');
        resetHint('linf-hint','linf-hint-btn');
        document.getElementById('linf-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('linf-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();LINF.check();}});}document.getElementById('linf-check')?.addEventListener('click',()=>LINF.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('linf-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('linf-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('linf-score').textContent=`${this.score} / ${this.total}`; document.getElementById('linf-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('linf-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('linf-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('linf-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('linf-fb-expl').innerHTML=html; document.getElementById('linf-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};
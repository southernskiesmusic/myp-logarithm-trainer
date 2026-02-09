const FDP = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: fraction to decimal
    qFracToDec() {
        const denoms = [2,4,5,8,10,20,25,50,100];
        const d = pick(denoms);
        const n = randInt(1, d-1);
        const g = gcd(n, d);
        const ans = n / d;
        return { type:'free', rule:'Conversion', difficulty:'easy',
            text:'Convert this fraction to a decimal:',
            latex:`\\frac{${n}}{${d}}`, answer:ans, answerTex:String(ans),
            hintTex:[`Divide the numerator by the denominator.`,`\\(${n} \\div ${d} = ?\\)`],
            explain:`\\(\\frac{${n}}{${d}} = ${n} \\div ${d} = ${ans}\\)` };
    },

    // Easy: decimal to percentage
    qDecToPct() {
        const dec = randInt(1,99) / 100;
        const pct = dec * 100;
        return { type:'free', rule:'Conversion', difficulty:'easy',
            text:'Convert this decimal to a percentage:',
            latex:String(dec), answer:pct, answerTex:pct + '\\%',
            hintTex:['Multiply by 100 to convert decimal to percentage.',`\\(${dec} \\times 100 = ?\\)`],
            explain:`\\(${dec} \\times 100 = ${pct}\\%\\)` };
    },

    // Easy: percentage to decimal
    qPctToDec() {
        const pct = randInt(1,150);
        const dec = pct / 100;
        return { type:'free', rule:'Conversion', difficulty:'easy',
            text:`Convert ${pct}% to a decimal:`,
            latex:`${pct}\\%`, answer:dec, answerTex:String(dec),
            hintTex:['Divide by 100 to convert percentage to decimal.',`\\(${pct} \\div 100 = ?\\)`],
            explain:`\\(${pct}\\% = ${pct} \\div 100 = ${dec}\\)` };
    },

    // Medium: percentage of amount
    qPctOfAmount() {
        const pct = pick([10,15,20,25,30,40,50,60,75]);
        const amt = randInt(2,20) * 10;
        const ans = pct * amt / 100;
        return { type:'free', rule:'Percentage', difficulty:'medium',
            text:`Find ${pct}% of ${amt}:`,
            latex:`${pct}\\% \\text{ of } ${amt}`, answer:ans, answerTex:String(ans),
            hintTex:[`Convert ${pct}% to a decimal first.`,`\\(${pct/100} \\times ${amt} = ?\\)`],
            explain:`\\(${pct}\\% \\text{ of } ${amt} = ${pct/100} \\times ${amt} = ${ans}\\)` };
    },

    // Medium: percentage increase
    qPctIncrease() {
        const orig = randInt(2,20) * 10;
        const pct = pick([10,20,25,50]);
        const inc = orig * pct / 100;
        const ans = orig + inc;
        return { type:'free', rule:'Percentage', difficulty:'medium',
            text:`Increase ${orig} by ${pct}%:`,
            latex:`${orig} + ${pct}\\%`, answer:ans, answerTex:String(ans),
            hintTex:[`Find ${pct}% of ${orig}, then add it.`,`${pct}% of ${orig} = ${inc}. Now add to ${orig}.`],
            explain:`\\(${pct}\\%\\text{ of }${orig} = ${inc}\\). So \\(${orig} + ${inc} = ${ans}\\).` };
    },

    // Medium: percentage decrease
    qPctDecrease() {
        const orig = randInt(2,20) * 10;
        const pct = pick([10,20,25,50]);
        const dec = orig * pct / 100;
        const ans = orig - dec;
        return { type:'free', rule:'Percentage', difficulty:'medium',
            text:`Decrease ${orig} by ${pct}%:`,
            latex:`${orig} - ${pct}\\%`, answer:ans, answerTex:String(ans),
            hintTex:[`Find ${pct}% of ${orig}, then subtract it.`,`${pct}% of ${orig} = ${dec}. Now subtract from ${orig}.`],
            explain:`\\(${pct}\\%\\text{ of }${orig} = ${dec}\\). So \\(${orig} - ${dec} = ${ans}\\).` };
    },

    // Hard: reverse percentage
    qReversePct() {
        const pct = pick([10,20,25]);
        const orig = randInt(4,20) * 10;
        const after = orig * (100 + pct) / 100;
        return { type:'free', rule:'Reverse %', difficulty:'hard',
            text:`After a ${pct}% increase, a price is \u00a3${after}. What was the original price?`,
            latex:`? \\times ${1 + pct/100} = ${after}`, answer:orig, answerTex:'\u00a3' + orig,
            hintTex:[`The new price is ${100+pct}% of the original.`,`Divide ${after} by ${1 + pct/100}.`],
            explain:`\\(${after} \\div ${1 + pct/100} = ${orig}\\). Original price was \u00a3${orig}.` };
    },

    // Hard: express as percentage
    qExpressAsPct() {
        const a = randInt(1,9), b = randInt(a+1, 20);
        const pct = Math.round(a/b * 1000) / 10;
        return { type:'free', rule:'Percentage', difficulty:'hard',
            text:`Express \\(\\frac{${a}}{${b}}\\) as a percentage (1 d.p.):`,
            latex:`\\frac{${a}}{${b}}`, answer:pct, answerTex:pct + '\\%',
            hintTex:[`Divide ${a} by ${b}, then multiply by 100.`,`\\(${a} \\div ${b} \\times 100 = ?\\)`],
            explain:`\\(\\frac{${a}}{${b}} = ${(a/b).toFixed(3)}... \\times 100 = ${pct}\\%\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = {
            easy: [this.qFracToDec, this.qDecToPct, this.qPctToDec],
            medium: [this.qPctOfAmount, this.qPctIncrease, this.qPctDecrease],
            hard: [this.qReversePct, this.qExpressAsPct]
        };
        this.allPool = [...this.pools.easy, ...this.pools.easy, ...this.pools.medium, ...this.pools.medium, ...this.pools.hard];
        loadTrainerStats('fdp',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('fdp-score').textContent='0 / 0'; document.getElementById('fdp-pct').textContent='\u2014'; document.getElementById('fdp-streak').textContent='0'; saveTrainerStats('fdp',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="fdp-mf" placeholder="?"></math-field><button class="btn btn-primary" id="fdp-check">Check</button></div>`;
        document.getElementById('fdp-card').innerHTML=h;
        document.getElementById('fdp-fb').classList.remove('show','correct','incorrect');
        document.getElementById('fdp-next').classList.remove('show');
        resetHint('fdp-hint','fdp-hint-btn');
        document.getElementById('fdp-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('fdp-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();FDP.check();}});}document.getElementById('fdp-check')?.addEventListener('click',()=>FDP.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('fdp-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('fdp-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('fdp-score').textContent=`${this.score} / ${this.total}`; document.getElementById('fdp-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('fdp-streak').textContent=this.streak; saveTrainerStats('fdp',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('fdp-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('fdp-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('fdp-fb-expl').innerHTML=html; document.getElementById('fdp-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};
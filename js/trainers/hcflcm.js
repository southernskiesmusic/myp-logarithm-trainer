const HCFLCM = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    qHCFEasy() {
        const f = randInt(2,6), a = f*randInt(2,5), b = f*randInt(2,5);
        if(a===b) return HCFLCM.qHCFEasy();
        const ans = gcd(a,b);
        return { type:'free', rule:'HCF', difficulty:'easy', text:`Find the HCF of ${a} and ${b}:`,
            latex:`\\text{HCF}(${a}, ${b})`, answer:ans, answerTex:String(ans),
            hintTex:['List factors of each number.',`Factors of ${a}: ${[...Array(a)].map((_,i)=>i+1).filter(x=>a%x===0).join(', ')}`],
            explain:`HCF(${a}, ${b}) = ${ans}` };
    },
    qLCMEasy() {
        const a = randInt(2,9), b = randInt(2,9);
        if(a===b) return HCFLCM.qLCMEasy();
        const ans = a*b/gcd(a,b);
        return { type:'free', rule:'LCM', difficulty:'easy', text:`Find the LCM of ${a} and ${b}:`,
            latex:`\\text{LCM}(${a}, ${b})`, answer:ans, answerTex:String(ans),
            hintTex:['List multiples of each until you find a common one.',`Multiples of ${a}: ${a}, ${2*a}, ${3*a}...`],
            explain:`LCM(${a}, ${b}) = ${ans}` };
    },
    qHCFMedium() {
        const f = randInt(3,8), a = f*randInt(3,7), b = f*randInt(3,7);
        if(a===b) return HCFLCM.qHCFMedium();
        const ans = gcd(a,b);
        return { type:'free', rule:'HCF', difficulty:'medium', text:`Find the HCF of ${a} and ${b}:`,
            latex:`\\text{HCF}(${a}, ${b})`, answer:ans, answerTex:String(ans),
            hintTex:['Use prime factorisation.',`${a} = ${primeFactors(a)}`,`${b} = ${primeFactors(b)}. Common factors?`],
            explain:`${a} = ${primeFactors(a)}, ${b} = ${primeFactors(b)}. HCF = ${ans}` };
    },
    qLCMMedium() {
        const a = randInt(4,12), b = randInt(4,12);
        if(a===b||gcd(a,b)===1) return HCFLCM.qLCMMedium();
        const ans = a*b/gcd(a,b);
        return { type:'free', rule:'LCM', difficulty:'medium', text:`Find the LCM of ${a} and ${b}:`,
            latex:`\\text{LCM}(${a}, ${b})`, answer:ans, answerTex:String(ans),
            hintTex:['LCM = (a \u00d7 b) \u00f7 HCF(a,b).',`HCF(${a}, ${b}) = ${gcd(a,b)}. Now calculate.`],
            explain:`LCM = \\frac{${a} \\times ${b}}{${gcd(a,b)}} = ${ans}` };
    },
    qHCFThree() {
        const f = randInt(2,5), a = f*randInt(2,4), b = f*randInt(2,4), c = f*randInt(2,4);
        const ans = gcd(gcd(a,b),c);
        return { type:'free', rule:'HCF', difficulty:'hard', text:`Find the HCF of ${a}, ${b} and ${c}:`,
            latex:`\\text{HCF}(${a}, ${b}, ${c})`, answer:ans, answerTex:String(ans),
            hintTex:['Find HCF of first two, then HCF of that with the third.',`HCF(${a}, ${b}) = ${gcd(a,b)}`],
            explain:`HCF(${a}, ${b}) = ${gcd(a,b)}, then HCF(${gcd(a,b)}, ${c}) = ${ans}` };
    },
    qLCMThree() {
        const a = randInt(2,6), b = randInt(2,6), c = randInt(2,6);
        const lcmAB = a*b/gcd(a,b), ans = lcmAB*c/gcd(lcmAB,c);
        return { type:'free', rule:'LCM', difficulty:'hard', text:`Find the LCM of ${a}, ${b} and ${c}:`,
            latex:`\\text{LCM}(${a}, ${b}, ${c})`, answer:ans, answerTex:String(ans),
            hintTex:['Find LCM of first two, then LCM of that with the third.',`LCM(${a}, ${b}) = ${lcmAB}`],
            explain:`LCM(${a}, ${b}) = ${lcmAB}, then LCM(${lcmAB}, ${c}) = ${ans}` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qHCFEasy,this.qLCMEasy], medium:[this.qHCFMedium,this.qLCMMedium], hard:[this.qHCFThree,this.qLCMThree] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
        loadTrainerStats('hcflcm',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('hcflcm-score').textContent='0 / 0'; document.getElementById('hcflcm-pct').textContent='\u2014'; document.getElementById('hcflcm-streak').textContent='0'; saveTrainerStats('hcflcm',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="hcflcm-mf" placeholder="?"></math-field><button class="btn btn-primary" id="hcflcm-check">Check</button></div>`;
        document.getElementById('hcflcm-card').innerHTML=h;
        document.getElementById('hcflcm-fb').classList.remove('show','correct','incorrect');
        document.getElementById('hcflcm-next').classList.remove('show');
        resetHint('hcflcm-hint','hcflcm-hint-btn');
        document.getElementById('hcflcm-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('hcflcm-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();HCFLCM.check();}});}document.getElementById('hcflcm-check')?.addEventListener('click',()=>HCFLCM.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('hcflcm-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('hcflcm-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('hcflcm-score').textContent=`${this.score} / ${this.total}`; document.getElementById('hcflcm-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('hcflcm-streak').textContent=this.streak; saveTrainerStats('hcflcm',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('hcflcm-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('hcflcm-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('hcflcm-fb-expl').innerHTML=html; document.getElementById('hcflcm-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

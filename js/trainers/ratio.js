const RATIO = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    qSimplify() {
        const f=randInt(2,6), a=f*randInt(2,6), b=f*randInt(2,6);
        if(a===b) return RATIO.qSimplify();
        const g=gcd(a,b);
        return { type:'free', rule:'Simplify', difficulty:'easy', text:`Simplify ${a}:${b}. Give the first number:`,
            latex:`${a}:${b}`, answer:a/g, answerTex:`${a/g}:${b/g}`,
            hintTex:[`Find the HCF of ${a} and ${b}.`,`HCF = ${g}. Divide both by ${g}.`],
            explain:`\\(${a}:${b} = ${a/g}:${b/g}\\)` };
    },
    qShareTwo() {
        const a=randInt(2,5), b=randInt(2,5), total=randInt(5,15)*(a+b);
        const ans1=total*a/(a+b);
        return { type:'free', rule:'Share', difficulty:'easy', text:`Share \u00a3${total} in the ratio ${a}:${b}. What is the larger share?`,
            latex:`${a}:${b}`, answer:Math.max(ans1,total-ans1), answerTex:`\u00a3${Math.max(ans1,total-ans1)}`,
            hintTex:[`Total parts = ${a}+${b} = ${a+b}.`,`One part = \u00a3${total/(a+b)}.`],
            explain:`Total parts = ${a+b}. One part = \u00a3${total/(a+b)}. Shares: \u00a3${ans1} and \u00a3${total-ans1}.` };
    },
    qShareThree() {
        const a=randInt(1,3), b=randInt(1,3), c=randInt(1,3), total=randInt(3,10)*(a+b+c);
        const part=total/(a+b+c);
        return { type:'free', rule:'Share', difficulty:'medium', text:`Share \u00a3${total} in ratio ${a}:${b}:${c}. What is the middle share?`,
            latex:`${a}:${b}:${c}`, answer:b*part, answerTex:`\u00a3${b*part}`,
            hintTex:[`Total parts = ${a+b+c}.`,`One part = \u00a3${part}. Middle share = ${b} parts.`],
            explain:`One part = \u00a3${part}. Middle share = ${b} \u00d7 ${part} = \u00a3${b*part}.` };
    },
    qDirect() {
        const k=randInt(2,5), x1=randInt(2,6), y1=k*x1, x2=randInt(2,6), y2=k*x2;
        return { type:'free', rule:'Direct', difficulty:'medium', text:`y is directly proportional to x. If y=${y1} when x=${x1}, find y when x=${x2}:`,
            latex:`y \\propto x`, answer:y2, answerTex:String(y2),
            hintTex:[`Find k: y = kx, so k = ${y1}/${x1} = ${k}.`,`Then y = ${k} \u00d7 ${x2}.`],
            explain:`\\(k = ${y1}/${x1} = ${k}\\). When \\(x=${x2}\\), \\(y = ${k} \\times ${x2} = ${y2}\\).` };
    },
    qInverse() {
        const k=randInt(12,48), x1=randInt(2,6), y1=k/x1, x2=randInt(2,6), y2=k/x2;
        if(!Number.isInteger(y1)||!Number.isInteger(y2)) return RATIO.qInverse();
        return { type:'free', rule:'Inverse', difficulty:'hard', text:`y is inversely proportional to x. If y=${y1} when x=${x1}, find y when x=${x2}:`,
            latex:`y \\propto \\frac{1}{x}`, answer:y2, answerTex:String(y2),
            hintTex:[`Find k: y = k/x, so k = y\u00d7x = ${y1}\u00d7${x1} = ${k}.`,`Then y = ${k}/${x2}.`],
            explain:`\\(k = ${y1} \\times ${x1} = ${k}\\). When \\(x=${x2}\\), \\(y = ${k}/${x2} = ${y2}\\).` };
    },
    qDirectSquare() {
        const k=randInt(1,4), x1=randInt(2,4), y1=k*x1*x1, x2=randInt(2,4), y2=k*x2*x2;
        return { type:'free', rule:'Direct (squared)', difficulty:'hard', text:`y is directly proportional to x\u00b2. If y=${y1} when x=${x1}, find y when x=${x2}:`,
            latex:`y \\propto x^2`, answer:y2, answerTex:String(y2),
            hintTex:[`Find k: y = kx\u00b2, so k = ${y1}/${x1}\u00b2 = ${k}.`,`Then y = ${k} \u00d7 ${x2}\u00b2 = ${k} \u00d7 ${x2*x2}.`],
            explain:`\\(k = ${y1}/${x1*x1} = ${k}\\). When \\(x=${x2}\\), \\(y = ${k} \\times ${x2*x2} = ${y2}\\).` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qSimplify,this.qShareTwo], medium:[this.qShareThree,this.qDirect], hard:[this.qInverse,this.qDirectSquare] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
        loadTrainerStats('ratio',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('ratio-score').textContent='0 / 0'; document.getElementById('ratio-pct').textContent='\u2014'; document.getElementById('ratio-streak').textContent='0'; saveTrainerStats('ratio',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="ratio-mf" placeholder="?"></math-field><button class="btn btn-primary" id="ratio-check">Check</button></div>`;
        document.getElementById('ratio-card').innerHTML=h;
        document.getElementById('ratio-fb').classList.remove('show','correct','incorrect');
        document.getElementById('ratio-next').classList.remove('show');
        resetHint('ratio-hint','ratio-hint-btn');
        document.getElementById('ratio-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('ratio-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();RATIO.check();}});}document.getElementById('ratio-check')?.addEventListener('click',()=>RATIO.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('ratio-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('ratio-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('ratio-score').textContent=`${this.score} / ${this.total}`; document.getElementById('ratio-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('ratio-streak').textContent=this.streak; saveTrainerStats('ratio',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('ratio-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('ratio-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('ratio-fb-expl').innerHTML=html; document.getElementById('ratio-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

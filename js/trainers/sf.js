const SF = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    qToSFLarge() {
        const m=randInt(1,9)+randInt(1,9)/10, p=randInt(2,6), n=m*Math.pow(10,p);
        return { type:'free', rule:'Convert', difficulty:'easy', text:'Write in standard form (give the power of 10):',
            latex:n.toLocaleString('en-US'), answer:p, answerTex:`${m} \\times 10^{${p}}`,
            hintTex:['Move the decimal point until you have a number between 1 and 10.',`Count how many places you moved.`],
            explain:`\\(${n.toLocaleString('en-US')} = ${m} \\times 10^{${p}}\\)` };
    },
    qToSFSmall() {
        const m=randInt(1,9)+randInt(1,9)/10, p=randInt(2,5), n=m/Math.pow(10,p);
        return { type:'free', rule:'Convert', difficulty:'easy', text:'Write in standard form (give the power of 10):',
            latex:n.toFixed(p+1), answer:-p, answerTex:`${m} \\times 10^{-${p}}`,
            hintTex:['Move decimal right to get a number between 1 and 10.',`Small numbers have negative powers.`],
            explain:`\\(${n.toFixed(p+1)} = ${m} \\times 10^{-${p}}\\)` };
    },
    qFromSF() {
        const m=randInt(1,9)+randInt(1,9)/10, p=randInt(2,5), ans=m*Math.pow(10,p);
        return { type:'free', rule:'Convert', difficulty:'easy', text:'Write as an ordinary number:',
            latex:`${m} \\times 10^{${p}}`, answer:ans, answerTex:ans.toLocaleString('en-US'),
            hintTex:['Move the decimal point right by the power.',`\\(10^{${p}} = ${Math.pow(10,p)}\\)`],
            explain:`\\(${m} \\times 10^{${p}} = ${ans.toLocaleString('en-US')}\\)` };
    },
    qMultiplySF() {
        const m1=randInt(2,9), p1=randInt(2,5), m2=randInt(2,9), p2=randInt(2,5);
        let mAns=m1*m2, pAns=p1+p2;
        while(mAns>=10){mAns/=10;pAns++;}
        return { type:'free', rule:'Multiply', difficulty:'medium', text:'Multiply and give in standard form (give the power):',
            latex:`(${m1} \\times 10^{${p1}}) \\times (${m2} \\times 10^{${p2}})`, answer:pAns, answerTex:`${mAns} \\times 10^{${pAns}}`,
            hintTex:['Multiply the numbers, add the powers.',`\\(${m1} \\times ${m2} = ${m1*m2}\\), adjust if needed.`],
            explain:`\\(${m1} \\times ${m2} = ${m1*m2}\\). Powers: \\(${p1}+${p2}=${p1+p2}\\). Final: \\(${mAns} \\times 10^{${pAns}}\\)` };
    },
    qDivideSF() {
        const m1=randInt(4,9), p1=randInt(4,8), m2=randInt(2,4), p2=randInt(1,3);
        let mAns=m1/m2, pAns=p1-p2;
        while(mAns<1){mAns*=10;pAns--;}
        while(mAns>=10){mAns/=10;pAns++;}
        mAns=Math.round(mAns*10)/10;
        return { type:'free', rule:'Divide', difficulty:'medium', text:'Divide and give in standard form (give the power):',
            latex:`(${m1} \\times 10^{${p1}}) \\div (${m2} \\times 10^{${p2}})`, answer:pAns, answerTex:`${mAns} \\times 10^{${pAns}}`,
            hintTex:['Divide the numbers, subtract the powers.',`\\(${m1} \\div ${m2} = ${(m1/m2).toFixed(1)}\\), adjust if needed.`],
            explain:`\\(${m1} \\div ${m2} = ${(m1/m2).toFixed(1)}\\). Powers: \\(${p1}-${p2}=${p1-p2}\\). Final: \\(${mAns} \\times 10^{${pAns}}\\)` };
    },
    qAddSF() {
        const m1=randInt(2,5), m2=randInt(2,5), p=randInt(3,6);
        const sum=m1+m2; let mAns=sum, pAns=p;
        while(mAns>=10){mAns/=10;pAns++;}
        return { type:'free', rule:'Add', difficulty:'hard', text:'Add and give in standard form (give the power):',
            latex:`(${m1} \\times 10^{${p}}) + (${m2} \\times 10^{${p}})`, answer:pAns, answerTex:`${mAns} \\times 10^{${pAns}}`,
            hintTex:['Same powers: add the numbers directly.',`\\(${m1} + ${m2} = ${sum}\\), then adjust.`],
            explain:`\\(${m1} + ${m2} = ${sum}\\). So \\(${sum} \\times 10^{${p}} = ${mAns} \\times 10^{${pAns}}\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qToSFLarge,this.qToSFSmall,this.qFromSF], medium:[this.qMultiplySF,this.qDivideSF], hard:[this.qAddSF] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('sf-score').textContent='0 / 0'; document.getElementById('sf-pct').textContent='\u2014'; document.getElementById('sf-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="sf-mf" placeholder="?"></math-field><button class="btn btn-primary" id="sf-check">Check</button></div>`;
        document.getElementById('sf-card').innerHTML=h;
        document.getElementById('sf-fb').classList.remove('show','correct','incorrect');
        document.getElementById('sf-next').classList.remove('show');
        resetHint('sf-hint','sf-hint-btn');
        document.getElementById('sf-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('sf-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();SF.check();}});}document.getElementById('sf-check')?.addEventListener('click',()=>SF.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('sf-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('sf-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('sf-score').textContent=`${this.score} / ${this.total}`; document.getElementById('sf-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('sf-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('sf-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('sf-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('sf-fb-expl').innerHTML=html; document.getElementById('sf-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

const IDX = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    qMultiply() {
        const b=randInt(2,5), m=randInt(2,5), n=randInt(2,5), ans=m+n;
        return { type:'free', rule:'Multiply', difficulty:'easy', text:`Simplify (give power of ${b}):`,
            latex:`${b}^{${m}} \\times ${b}^{${n}}`, answer:ans, answerTex:String(ans),
            hintTex:['When multiplying same base, add the powers.',`\\(a^m \\times a^n = a^{m+n}\\)`],
            explain:`\\(${b}^{${m}} \\times ${b}^{${n}} = ${b}^{${m}+${n}} = ${b}^{${ans}}\\)` };
    },
    qDivide() {
        const b=randInt(2,5), m=randInt(4,8), n=randInt(1,m-1), ans=m-n;
        return { type:'free', rule:'Divide', difficulty:'easy', text:`Simplify (give power of ${b}):`,
            latex:`${b}^{${m}} \\div ${b}^{${n}}`, answer:ans, answerTex:String(ans),
            hintTex:['When dividing same base, subtract the powers.',`\\(a^m \\div a^n = a^{m-n}\\)`],
            explain:`\\(${b}^{${m}} \\div ${b}^{${n}} = ${b}^{${m}-${n}} = ${b}^{${ans}}\\)` };
    },
    qPower() {
        const b=randInt(2,4), m=randInt(2,3), n=randInt(2,3), ans=m*n;
        return { type:'free', rule:'Power of Power', difficulty:'easy', text:`Simplify (give power of ${b}):`,
            latex:`(${b}^{${m}})^{${n}}`, answer:ans, answerTex:String(ans),
            hintTex:['Power of a power: multiply the exponents.',`\\((a^m)^n = a^{mn}\\)`],
            explain:`\\((${b}^{${m}})^{${n}} = ${b}^{${m} \\times ${n}} = ${b}^{${ans}}\\)` };
    },
    qZero() {
        const b=randInt(2,20);
        return { type:'free', rule:'Zero Power', difficulty:'easy', text:'Evaluate:',
            latex:`${b}^{0}`, answer:1, answerTex:'1',
            hintTex:['Any non-zero number to the power 0 equals 1.',`\\(a^0 = 1\\)`],
            explain:`\\(${b}^{0} = 1\\)` };
    },
    qNegative() {
        const b=randInt(2,5), n=randInt(1,3), ans=1/Math.pow(b,n);
        return { type:'free', rule:'Negative Index', difficulty:'medium', text:'Evaluate:',
            latex:`${b}^{-${n}}`, answer:ans, answerTex:`\\frac{1}{${Math.pow(b,n)}}`,
            hintTex:['Negative power means reciprocal.',`\\(a^{-n} = \\frac{1}{a^n}\\)`],
            explain:`\\(${b}^{-${n}} = \\frac{1}{${b}^{${n}}} = \\frac{1}{${Math.pow(b,n)}}\\)` };
    },
    qFractionalHalf() {
        const squares = [4,9,16,25,36,49,64,81,100];
        const n = pick(squares), ans = Math.sqrt(n);
        return { type:'free', rule:'Fractional Index', difficulty:'medium', text:'Evaluate:',
            latex:`${n}^{\\frac{1}{2}}`, answer:ans, answerTex:String(ans),
            hintTex:['Power of 1/2 means square root.',`\\(a^{1/2} = \\sqrt{a}\\)`],
            explain:`\\(${n}^{1/2} = \\sqrt{${n}} = ${ans}\\)` };
    },
    qFractionalThird() {
        const cubes = [8,27,64,125];
        const n = pick(cubes), ans = Math.round(Math.pow(n, 1/3));
        return { type:'free', rule:'Fractional Index', difficulty:'medium', text:'Evaluate:',
            latex:`${n}^{\\frac{1}{3}}`, answer:ans, answerTex:String(ans),
            hintTex:['Power of 1/3 means cube root.',`\\(a^{1/3} = \\sqrt[3]{a}\\)`],
            explain:`\\(${n}^{1/3} = \\sqrt[3]{${n}} = ${ans}\\)` };
    },
    qFractionalMN() {
        const n = pick([2,3]);
        // n=2: perfect squares; n=3: perfect cubes
        const bases = n===2 ? [4,9,16,25,36,49,64,81,100] : [8,27,64,125];
        const b = pick(bases), m = randInt(2,3);
        const root = Math.round(Math.pow(b, 1/n)), ans = Math.pow(root, m);
        return { type:'free', rule:'Fractional Index', difficulty:'hard', text:'Evaluate:',
            latex:`${b}^{\\frac{${m}}{${n}}}`, answer:ans, answerTex:String(ans),
            hintTex:[`\\(a^{m/n} = (\\sqrt[n]{a})^m\\)`,`First find \\(\\sqrt[${n}]{${b}} = ${root}\\)`,`Then raise to power ${m}.`],
            explain:`\\(${b}^{${m}/${n}} = (\\sqrt[${n}]{${b}})^{${m}} = ${root}^{${m}} = ${ans}\\)` };
    },
    qCombined() {
        const b=randInt(2,4), m=randInt(2,4), n=randInt(2,3), p=randInt(1,2), ans=m*n-p;
        return { type:'free', rule:'Combined', difficulty:'hard', text:'Simplify (give power of '+b+'):',
            latex:`\\frac{(${b}^{${m}})^{${n}}}{${b}^{${p}}}`, answer:ans, answerTex:String(ans),
            hintTex:['First simplify the numerator.',`\\((${b}^{${m}})^{${n}} = ${b}^{${m*n}}\\)`,`Then divide: \\(${b}^{${m*n}} \\div ${b}^{${p}} = ${b}^{${ans}}\\)`],
            explain:`\\(\\frac{(${b}^{${m}})^{${n}}}{${b}^{${p}}} = \\frac{${b}^{${m*n}}}{${b}^{${p}}} = ${b}^{${ans}}\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qMultiply,this.qDivide,this.qPower,this.qZero], medium:[this.qNegative,this.qFractionalHalf,this.qFractionalThird], hard:[this.qFractionalMN,this.qCombined] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('idx-score').textContent='0 / 0'; document.getElementById('idx-pct').textContent='\u2014'; document.getElementById('idx-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="idx-mf" placeholder="?"></math-field><button class="btn btn-primary" id="idx-check">Check</button></div>`;
        document.getElementById('idx-card').innerHTML=h;
        document.getElementById('idx-fb').classList.remove('show','correct','incorrect');
        document.getElementById('idx-next').classList.remove('show');
        resetHint('idx-hint','idx-hint-btn');
        document.getElementById('idx-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('idx-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();IDX.check();}});}document.getElementById('idx-check')?.addEventListener('click',()=>IDX.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('idx-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('idx-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('idx-score').textContent=`${this.score} / ${this.total}`; document.getElementById('idx-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('idx-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('idx-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('idx-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('idx-fb-expl').innerHTML=html; document.getElementById('idx-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

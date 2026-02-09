const EXPR = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: Collect like terms (simple)
    qCollectSimple() {
        const a=randInt(2,6), b=randInt(1,5), c=randInt(1,5);
        const sum=a+c;
        return { type:'free', rule:'Simplify', difficulty:'easy', text:'Simplify:',
            latex:`${a}x + ${b} + ${c}x`, answer:sum, answerTex:`${sum}x + ${b}`,
            hintTex:['Collect the x terms together.',`${a}x + ${c}x = ${sum}x`],
            explain:`Collect like terms: \\(${a}x + ${c}x = ${sum}x\\). Answer: \\(${sum}x + ${b}\\)` };
    },

    // Easy: Collect with subtraction
    qCollectSub() {
        const a=randInt(5,9), b=randInt(2,4), c=randInt(1,4);
        const diff=a-c;
        return { type:'free', rule:'Simplify', difficulty:'easy', text:'Simplify (give the coefficient of x):',
            latex:`${a}x - ${c}x + ${b}`, answer:diff, answerTex:`${diff}x + ${b}`,
            hintTex:['Subtract the x terms.',`${a}x - ${c}x = ${diff}x`],
            explain:`\\(${a}x - ${c}x = ${diff}x\\). Answer: \\(${diff}x + ${b}\\)` };
    },

    // Easy: Expand single bracket
    qExpandSingle() {
        const a=randInt(2,5), b=randInt(1,6), c=randInt(1,5);
        const ab=a*b, ac=a*c;
        return { type:'free', rule:'Expand', difficulty:'easy', text:'Expand (give the coefficient of x):',
            latex:`${a}(${b}x + ${c})`, answer:ab, answerTex:`${ab}x + ${ac}`,
            hintTex:['Multiply each term inside by the number outside.',`${a} \\times ${b}x = ${ab}x`],
            explain:`\\(${a}(${b}x + ${c}) = ${ab}x + ${ac}\\)` };
    },

    // Medium: Expand and simplify two brackets
    qExpandTwo() {
        const a=randInt(2,4), b=randInt(1,4), c=randInt(2,4), d=randInt(1,4);
        const xCoeff = a*b + c*d;
        return { type:'free', rule:'Expand', difficulty:'medium', text:'Expand and simplify (give the coefficient of x):',
            latex:`${a}(${b}x + 1) + ${c}(${d}x + 2)`, answer:xCoeff, answerTex:`${xCoeff}x + ${a + 2*c}`,
            hintTex:['Expand each bracket separately first.',`${a}(${b}x + 1) = ${a*b}x + ${a}`,`${c}(${d}x + 2) = ${c*d}x + ${2*c}`],
            explain:`\\(${a*b}x + ${a} + ${c*d}x + ${2*c} = ${xCoeff}x + ${a + 2*c}\\)` };
    },

    // Medium: Expand (x+a)(x+b)
    qExpandBinomial() {
        const a=randInt(1,6), b=randInt(1,6);
        const xCoeff = a+b, const_ = a*b;
        return { type:'free', rule:'Expand', difficulty:'medium', text:'Expand. Give the coefficient of x:',
            latex:`(x + ${a})(x + ${b})`, answer:xCoeff, answerTex:`x^2 + ${xCoeff}x + ${const_}`,
            hintTex:['Use FOIL: First, Outside, Inside, Last.',`x \\cdot x = x^2, \\quad x \\cdot ${b} = ${b}x, \\quad ${a} \\cdot x = ${a}x, \\quad ${a} \\cdot ${b} = ${a*b}`],
            explain:`\\((x + ${a})(x + ${b}) = x^2 + ${a}x + ${b}x + ${a*b} = x^2 + ${xCoeff}x + ${const_}\\)` };
    },

    // Medium: Factorise with common factor
    qFactorCommon() {
        const f=randInt(2,5), a=randInt(1,4), b=randInt(1,4);
        return { type:'factorCommon', rule:'Factorise', difficulty:'medium', text:'Factorise fully:',
            latex:`${f*a}x + ${f*b}`, commonFactor:f, coeffA:a, coeffB:b, answerTex:`${f}(${a}x + ${b})`,
            hintTex:['Find the highest common factor of the coefficients.',`HCF(${f*a}, ${f*b}) = ${f}`],
            explain:`\\(${f*a}x + ${f*b} = ${f}(${a}x + ${b})\\)` };
    },

    // Hard: Factorise quadratic x^2+bx+c
    qFactorQuad() {
        const p=randInt(1,6), q=randInt(1,6);
        const b=p+q, c=p*q;
        return { type:'factor', rule:'Factorise', difficulty:'hard', text:'Factorise fully:',
            latex:`x^2 + ${b}x + ${c}`, factors:[p,q], answerTex:`(x + ${p})(x + ${q})`,
            hintTex:['Find two numbers that multiply to '+c+' and add to '+b+'.',`${p} \\times ${q} = ${c} \\text{ and } ${p} + ${q} = ${b}`],
            explain:`\\(x^2 + ${b}x + ${c} = (x + ${p})(x + ${q})\\)` };
    },

    // Hard: Factorise difference of squares
    qFactorDiffSq() {
        const a=randInt(2,9);
        return { type:'factorDiff', rule:'Factorise', difficulty:'hard', text:'Factorise fully:',
            latex:`x^2 - ${a*a}`, factorNum:a, answerTex:`(x + ${a})(x - ${a})`,
            hintTex:['This is a difference of two squares: a\u00b2 - b\u00b2 = (a+b)(a-b).',`\\sqrt{${a*a}} = ${a}`],
            explain:`\\(x^2 - ${a*a} = x^2 - ${a}^2 = (x + ${a})(x - ${a})\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qCollectSimple,this.qCollectSub,this.qExpandSingle], medium:[this.qExpandTwo,this.qExpandBinomial,this.qFactorCommon], hard:[this.qFactorQuad,this.qFactorDiffSq] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
loadTrainerStats('expr',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('expr-score').textContent='0 / 0'; document.getElementById('expr-pct').textContent='\u2014'; document.getElementById('expr-streak').textContent='0'; saveTrainerStats('expr',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="expr-mf" placeholder="?"></math-field><button class="btn btn-primary" id="expr-check">Check</button></div>`;
        document.getElementById('expr-card').innerHTML=h;
        document.getElementById('expr-fb').classList.remove('show','correct','incorrect');
        document.getElementById('expr-next').classList.remove('show');
        resetHint('expr-hint','expr-hint-btn');
        document.getElementById('expr-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('expr-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();EXPR.handleFree();}});}document.getElementById('expr-check')?.addEventListener('click',()=>EXPR.handleFree());},200);
    },
    handleFree() {
        if(this.answered)return; const mf=document.getElementById('expr-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true;
        const q=this.currentQ;
        let ok = false;

        if (q.type === 'factor') {
            ok = this.checkFactorisation(mf.value, q.factors);
        } else if (q.type === 'factorDiff') {
            ok = this.checkDiffSquares(mf.value, q.factorNum);
        } else if (q.type === 'factorCommon') {
            ok = this.checkCommonFactor(mf.value, q.commonFactor, q.coeffA, q.coeffB);
        } else {
            const ans=parseLatex(mf.value);
            ok=Math.abs(ans-q.answer)<0.01;
        }

        mf.disabled=true; document.getElementById('expr-check').disabled=true;
        this.record(ok); let ex=q.explain; if(!ok)ex=`The answer is \\(${q.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    checkFactorisation(input, factors) {
        let s = input.replace(/\\left|\\right|\\cdot|\\times|\s+/g, '').replace(/\u2212/g, '-');
        const match = s.match(/\(x([+-]\d+)\)\(x([+-]\d+)\)/i);
        if (!match) return false;
        const n1 = parseInt(match[1]), n2 = parseInt(match[2]);
        const [p, q] = factors;
        return (n1===p && n2===q) || (n1===q && n2===p);
    },
    checkDiffSquares(input, a) {
        let s = input.replace(/\\left|\\right|\\cdot|\\times|\s+/g, '').replace(/\u2212/g, '-');
        const match = s.match(/\(x([+-]\d+)\)\(x([+-]\d+)\)/i);
        if (!match) return false;
        const n1 = parseInt(match[1]), n2 = parseInt(match[2]);
        return (n1===a && n2===-a) || (n1===-a && n2===a);
    },
    checkCommonFactor(input, f, a, b) {
        // Match patterns like 3(2x+1) or 3*(2x+1)
        let s = input.replace(/\\left|\\right|\\cdot|\\times|\s+/g, '').replace(/\u2212/g, '-');
        const match = s.match(/^(\d+)\((\d*)x([+-]\d+)\)$/i);
        if (!match) return false;
        const factor = parseInt(match[1]);
        const coeffX = match[2] ? parseInt(match[2]) : 1;
        const constant = parseInt(match[3]);
        return factor===f && coeffX===a && constant===b;
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('expr-score').textContent=`${this.score} / ${this.total}`; document.getElementById('expr-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('expr-streak').textContent=this.streak; saveTrainerStats('expr',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('expr-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('expr-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('expr-fb-expl').innerHTML=html; document.getElementById('expr-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

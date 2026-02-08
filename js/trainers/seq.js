const SEQ = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: Find next term (arithmetic)
    qArithNext() {
        const a=randInt(1,10), d=randInt(1,6);
        const seq = [a, a+d, a+2*d, a+3*d];
        const ans = a+4*d;
        return { type:'free', rule:'Arithmetic', difficulty:'easy', text:'Find the next term:',
            latex:seq.join(', ') + ', \\ldots', answer:ans, answerTex:String(ans),
            hintTex:['Find the common difference between terms.',`d = ${seq[1]} - ${seq[0]} = ${d}`],
            explain:`Common difference = ${d}. Next term = ${seq[3]} + ${d} = ${ans}` };
    },

    // Easy: Find common difference
    qArithDiff() {
        const a=randInt(1,10), d=randInt(2,8);
        const seq = [a, a+d, a+2*d, a+3*d];
        return { type:'free', rule:'Arithmetic', difficulty:'easy', text:'Find the common difference:',
            latex:seq.join(', ') + ', \\ldots', answer:d, answerTex:`d = ${d}`,
            hintTex:['Subtract the first term from the second.',`d = ${seq[1]} - ${seq[0]}`],
            explain:`d = ${seq[1]} - ${seq[0]} = ${d}` };
    },

    // Medium: Find nth term formula coefficient
    qArithNth() {
        const a=randInt(1,10), d=randInt(2,6);
        const seq = [a, a+d, a+2*d];
        return { type:'free', rule:'Arithmetic', difficulty:'medium', text:'Find the nth term. Give the coefficient of n:',
            latex:seq.join(', ') + ', \\ldots', answer:d, answerTex:`${d}n + ${a-d}`,
            hintTex:['The nth term is an + b where a = common difference.',`a_n = ${d}n + (${a} - ${d})`],
            explain:`d = ${d}, first term = ${a}. Formula: \\(a_n = ${d}n + ${a-d}\\)` };
    },

    // Medium: Find a specific term
    qArithTerm() {
        const a=randInt(1,10), d=randInt(2,5), n=randInt(5,10);
        const ans = a + (n-1)*d;
        const seq = [a, a+d, a+2*d];
        return { type:'free', rule:'Arithmetic', difficulty:'medium', text:`Find the ${n}th term:`,
            latex:seq.join(', ') + ', \\ldots', answer:ans, answerTex:`a_{${n}} = ${ans}`,
            hintTex:[`a_n = a + (n-1)d where a=${a}, d=${d}`,`a_{${n}} = ${a} + ${n-1} \\times ${d}`],
            explain:`\\(a_{${n}} = ${a} + (${n}-1) \\times ${d} = ${a} + ${(n-1)*d} = ${ans}\\)` };
    },

    // Medium: Geometric next term
    qGeomNext() {
        const a=randInt(1,4), r=randInt(2,4);
        const seq = [a, a*r, a*r*r];
        const ans = a*r*r*r;
        return { type:'free', rule:'Geometric', difficulty:'medium', text:'Find the next term:',
            latex:seq.join(', ') + ', \\ldots', answer:ans, answerTex:String(ans),
            hintTex:['Find the common ratio by dividing consecutive terms.',`r = ${seq[1]} \\div ${seq[0]} = ${r}`],
            explain:`Common ratio = ${r}. Next term = ${seq[2]} \\times ${r} = ${ans}` };
    },

    // Hard: Find common ratio
    qGeomRatio() {
        const a=randInt(2,5), r=randInt(2,4);
        const seq = [a, a*r, a*r*r, a*r*r*r];
        return { type:'free', rule:'Geometric', difficulty:'hard', text:'Find the common ratio:',
            latex:seq.join(', ') + ', \\ldots', answer:r, answerTex:`r = ${r}`,
            hintTex:['Divide the second term by the first.',`r = ${seq[1]} \\div ${seq[0]}`],
            explain:`r = ${seq[1]} \\div ${seq[0]} = ${r}` };
    },

    // Hard: Find specific geometric term
    qGeomTerm() {
        const a=randInt(1,3), r=randInt(2,3), n=randInt(4,6);
        const ans = a * Math.pow(r, n-1);
        const seq = [a, a*r, a*r*r];
        return { type:'free', rule:'Geometric', difficulty:'hard', text:`Find the ${n}th term:`,
            latex:seq.join(', ') + ', \\ldots', answer:ans, answerTex:`a_{${n}} = ${ans}`,
            hintTex:[`a_n = a \\times r^{n-1} where a=${a}, r=${r}`,`a_{${n}} = ${a} \\times ${r}^{${n-1}}`],
            explain:`\\(a_{${n}} = ${a} \\times ${r}^{${n-1}} = ${a} \\times ${Math.pow(r,n-1)} = ${ans}\\)` };
    },

    // Hard: Quadratic sequence - find next term
    qQuadNext() {
        const a=randInt(1,3), b=randInt(1,4), c=randInt(0,5);
        // Sequence: an² + bn + c for n = 1,2,3,4,5
        const term = n => a*n*n + b*n + c;
        const seq = [term(1), term(2), term(3), term(4)];
        const ans = term(5);
        const d1 = [seq[1]-seq[0], seq[2]-seq[1], seq[3]-seq[2]];
        const d2 = d1[1]-d1[0];
        return { type:'free', rule:'Quadratic', difficulty:'hard', text:'Find the next term:',
            latex:seq.join(', ') + ', \\ldots', answer:ans, answerTex:String(ans),
            hintTex:['Find the first differences, then the second differences.',`First differences: ${d1.join(', ')}. Second difference: ${d2}`],
            explain:`First differences: ${d1.join(', ')}. Second difference = ${d2}. Next first diff = ${d1[2]+d2}. Next term = ${seq[3]} + ${d1[2]+d2} = ${ans}` };
    },

    // Hard: Quadratic sequence - find second difference
    qQuadSecondDiff() {
        const a=randInt(1,4), b=randInt(1,5), c=randInt(0,5);
        const term = n => a*n*n + b*n + c;
        const seq = [term(1), term(2), term(3), term(4), term(5)];
        const d2 = 2*a; // Second difference of an² + bn + c is always 2a
        return { type:'free', rule:'Quadratic', difficulty:'hard', text:'Find the second difference:',
            latex:seq.join(', ') + ', \\ldots', answer:d2, answerTex:String(d2),
            hintTex:['Find first differences, then find the difference of those.',`First differences: ${seq[1]-seq[0]}, ${seq[2]-seq[1]}, ${seq[3]-seq[2]}, ...`],
            explain:`First differences: ${seq[1]-seq[0]}, ${seq[2]-seq[1]}, ${seq[3]-seq[2]}, ${seq[4]-seq[3]}. Second difference = ${d2}` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qArithNext,this.qArithDiff], medium:[this.qArithNth,this.qArithTerm,this.qGeomNext], hard:[this.qGeomRatio,this.qGeomTerm,this.qQuadNext,this.qQuadSecondDiff] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('seq-score').textContent='0 / 0'; document.getElementById('seq-pct').textContent='\u2014'; document.getElementById('seq-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        h+=`<div class="input-area"><math-field class="lr-math-field" id="seq-mf" placeholder="?"></math-field><button class="btn btn-primary" id="seq-check">Check</button></div>`;
        document.getElementById('seq-card').innerHTML=h;
        document.getElementById('seq-fb').classList.remove('show','correct','incorrect');
        document.getElementById('seq-next').classList.remove('show');
        resetHint('seq-hint','seq-hint-btn');
        document.getElementById('seq-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('seq-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();SEQ.check();}});}document.getElementById('seq-check')?.addEventListener('click',()=>SEQ.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('seq-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('seq-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('seq-score').textContent=`${this.score} / ${this.total}`; document.getElementById('seq-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('seq-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('seq-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('seq-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('seq-fb-expl').innerHTML=html; document.getElementById('seq-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};
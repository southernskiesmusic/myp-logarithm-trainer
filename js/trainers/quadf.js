const QUADF = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: Find y-intercept of y = ax² + bx + c
    qYIntercept() {
        const a = randInt(1, 3), b = randInt(-5, 5), c = randInt(-10, 10);
        return { type:'free', rule:'Y-intercept', difficulty:'easy', text:'What is the y-intercept of this parabola?',
            latex:`y = ${a}x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`, answer:c, answerTex:String(c),
            hintTex:['The y-intercept is where x = 0.',`When x = 0, y = c`],
            explain:`When \\(x = 0\\), \\(y = ${c}\\). The y-intercept is \\(${c}\\).` };
    },

    // Easy: Find roots from factored form
    qRootsFactored() {
        const p = randInt(-6, 6), q = randInt(-6, 6);
        if (p === q) return QUADF.qRootsFactored();
        const smaller = Math.min(-p, -q);
        return { type:'free', rule:'Roots', difficulty:'easy', text:'Find the smaller root of this quadratic:',
            latex:`y = (x ${p>=0?'+':'-'} ${Math.abs(p)})(x ${q>=0?'+':'-'} ${Math.abs(q)})`, answer:smaller, answerTex:`x = ${smaller}`,
            hintTex:['Set each bracket equal to zero.',`x ${p>=0?'+':'-'} ${Math.abs(p)} = 0 \\text{ or } x ${q>=0?'+':'-'} ${Math.abs(q)} = 0`],
            explain:`Roots are \\(x = ${-p}\\) and \\(x = ${-q}\\). Smaller root = \\(${smaller}\\)` };
    },

    // Easy: Identify if parabola opens up or down
    qDirection() {
        const a = pick([-3, -2, -1, 1, 2, 3]), b = randInt(-5, 5), c = randInt(-5, 5);
        const opens = a > 0 ? 1 : -1;
        return { type:'mc', rule:'Shape', difficulty:'easy', text:'Does this parabola open upward or downward?',
            latex:`y = ${a}x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`,
            options:['Upward (U-shape)', 'Downward (n-shape)'], answer: a > 0 ? 'Upward (U-shape)' : 'Downward (n-shape)',
            hintTex:['Look at the coefficient of x\u00b2.',`If a > 0, opens up. If a < 0, opens down.`],
            explain:`The coefficient of \\(x^2\\) is \\(${a}\\), which is ${a>0?'positive':'negative'}, so it opens ${a>0?'upward':'downward'}.` };
    },

    // Medium: Find axis of symmetry
    qAxisSymmetry() {
        const a = randInt(1, 2), b = randInt(-6, 6);
        if (b % (2*a) !== 0) return QUADF.qAxisSymmetry();
        const c = randInt(-5, 5);
        const axis = -b / (2 * a);
        return { type:'free', rule:'Axis of Symmetry', difficulty:'medium', text:'Find the axis of symmetry (x = ?):',
            latex:`y = ${a}x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`, answer:axis, answerTex:`x = ${axis}`,
            hintTex:['Axis of symmetry: x = -b/(2a)',`x = \\frac{-${b}}{2 \\times ${a}}`],
            explain:`\\(x = \\frac{-b}{2a} = \\frac{${-b}}{${2*a}} = ${axis}\\)` };
    },

    // Medium: Find vertex y-coordinate
    qVertexY() {
        const p = randInt(-4, 4), q = randInt(-4, 4);
        const a = 1, h = -(p + q) / 2, k = -(p - h) * (q - h);
        // y = (x-p)(x-q) has vertex at x = (p+q)/2
        const vertexX = ((-p) + (-q)) / 2;
        const vertexY = (vertexX + p) * (vertexX + q);
        return { type:'free', rule:'Vertex', difficulty:'medium', text:'Find the y-coordinate of the vertex:',
            latex:`y = (x ${p>=0?'+':'-'} ${Math.abs(p)})(x ${q>=0?'+':'-'} ${Math.abs(q)})`, answer:vertexY, answerTex:String(vertexY),
            hintTex:['First find x-coordinate of vertex (midpoint of roots).',`x = \\frac{${-p} + ${-q}}{2} = ${vertexX}`],
            explain:`Vertex x = \\(\\frac{${-p} + ${-q}}{2} = ${vertexX}\\). Then \\(y = (${vertexX} ${p>=0?'+':'-'} ${Math.abs(p)})(${vertexX} ${q>=0?'+':'-'} ${Math.abs(q)}) = ${vertexY}\\)` };
    },

    // Medium: Number of roots from discriminant
    qDiscriminant() {
        const a = 1, b = randInt(-6, 6), c = randInt(-8, 8);
        const disc = b*b - 4*a*c;
        const numRoots = disc > 0 ? 2 : (disc === 0 ? 1 : 0);
        return { type:'free', rule:'Discriminant', difficulty:'medium', text:'How many real roots does this quadratic have?',
            latex:`y = x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`, answer:numRoots, answerTex:String(numRoots),
            hintTex:['Calculate discriminant: \u0394 = b\u00b2 - 4ac',`\\Delta = ${b}^2 - 4(1)(${c}) = ${b*b} - ${4*c} = ${disc}`],
            explain:`\\(\\Delta = ${b}^2 - 4(1)(${c}) = ${disc}\\). Since \\(\\Delta ${disc>0?'>':disc===0?'=':'<'} 0\\), there are \\(${numRoots}\\) real roots.` };
    },

    // Hard: Find roots using quadratic formula
    qQuadFormula() {
        // Generate nice roots
        const r1 = randInt(-5, 5), r2 = randInt(-5, 5);
        const a = 1, b = -(r1 + r2), c = r1 * r2;
        const smaller = Math.min(r1, r2);
        return { type:'free', rule:'Quadratic Formula', difficulty:'hard', text:'Find the smaller root:',
            latex:`x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)} = 0`, answer:smaller, answerTex:`x = ${smaller}`,
            hintTex:['Use the quadratic formula: x = (-b \u00b1 \u221a(b\u00b2-4ac)) / 2a',`b^2 - 4ac = ${b*b} - ${4*c} = ${b*b - 4*c}`],
            explain:`Using quadratic formula: roots are \\(x = ${r1}\\) and \\(x = ${r2}\\). Smaller = \\(${smaller}\\)` };
    },

    // Hard: Complete the square - find vertex form constant
    qCompleteSquare() {
        const h = randInt(-4, 4), k = randInt(-5, 5);
        // y = (x - h)² + k = x² - 2hx + h² + k
        const b = -2 * h, c = h * h + k;
        return { type:'free', rule:'Complete Square', difficulty:'hard', text:'Write in vertex form y = (x - h)\u00b2 + k. What is k?',
            latex:`y = x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`, answer:k, answerTex:`k = ${k}`,
            hintTex:['Complete the square: take half of b, square it.',`\\left(\\frac{${b}}{2}\\right)^2 = ${h*h}`],
            explain:`\\(y = (x ${-h>=0?'+':'-'} ${Math.abs(h)})^2 + ${k}\\). So \\(k = ${k}\\)` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qYIntercept,this.qRootsFactored,this.qDirection], medium:[this.qAxisSymmetry,this.qVertexY,this.qDiscriminant], hard:[this.qQuadFormula,this.qCompleteSquare] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('quadf-score').textContent='0 / 0'; document.getElementById('quadf-pct').textContent='\u2014'; document.getElementById('quadf-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o,i) => { h += `<button class="option-btn" data-i="${i}">${o}</button>`; });
            h += '</div>';
        } else {
            h+=`<div class="input-area"><math-field class="lr-math-field" id="quadf-mf" placeholder="?"></math-field><button class="btn btn-primary" id="quadf-check">Check</button></div>`;
        }
        document.getElementById('quadf-card').innerHTML=h;
        document.getElementById('quadf-fb').classList.remove('show','correct','incorrect');
        document.getElementById('quadf-next').classList.remove('show');
        resetHint('quadf-hint','quadf-hint-btn');
        document.getElementById('quadf-workout').innerHTML='';
        renderMath();
        if (q.type === 'mc') {
            document.getElementById('quadf-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => QUADF.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(()=>{const mf=document.getElementById('quadf-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();QUADF.check();}});}document.getElementById('quadf-check')?.addEventListener('click',()=>QUADF.check());},200);
        }
    },
    handleMC(idx) {
        if(this.answered) return;
        this.answered=true;
        const q=this.currentQ, chosen=q.options[idx], ok=chosen===q.answer;
        document.getElementById('quadf-card').querySelectorAll('.option-btn').forEach((btn,i) => {
            btn.disabled=true;
            if(q.options[i]===q.answer) btn.classList.add('correct');
            if(i===idx&&!ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        this.showFb(ok, q.explain);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('quadf-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('quadf-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('quadf-score').textContent=`${this.score} / ${this.total}`; document.getElementById('quadf-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('quadf-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('quadf-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('quadf-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('quadf-fb-expl').innerHTML=html; document.getElementById('quadf-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};
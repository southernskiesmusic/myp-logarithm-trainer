const QA = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0,

    // Easy MC: expand (x+a)(x+b)
    qExpandRect() {
        let a=randInt(1,10), b=randInt(-9,9);
        if(b===0) b=randInt(1,9);
        const sum=a+b, prod=a*b;
        const expr=`(${binTex(1,a)})(${binTex(1,b)})`;
        const c=`\\(${quadTex(1,sum,prod)}\\)`;
        const d1=`\\(${quadTex(1,prod,sum)}\\)`;
        const d2=`\\(${quadTex(1,sum,-prod)}\\)`;
        const d3=`\\(${quadTex(1,-sum,prod)}\\)`;
        const opts=[c]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\(${quadTex(1,sum+1,prod-1)}\\)`);
        return { type:'mc', rule:'Expanding', difficulty:'easy', text:'Find the area of this rectangle:',
            svg:rectSVG(binTex(1,a),binTex(1,b),'Area = ?'),
            latex:expr, answer:c, options:shuffle(opts),
            hintTex:['Use FOIL: multiply First, Outer, Inner, Last terms.',`First: \\(x \\cdot x = x^2\\). Last: \\(${a} \\times ${b<0?'('+b+')':b} = ${a*b}\\).`,`Middle: \\(${a}x + ${b}x = ${a+b}x\\). Combine all three parts.`],
            explain:`\\(${expr} = ${quadTex(1,sum,prod)}\\)` };
    },

    // Easy MC: expand (x+a)²
    qExpandSquare() {
        const a=randInt(1,9)*pick([-1,1]);
        const a2=2*a, aa=a*a;
        const expr=`(${binTex(1,a)})^2`;
        const c=`\\(${quadTex(1,a2,aa)}\\)`;
        const d1=`\\(${quadTex(1,0,aa)}\\)`;
        const d2=`\\(${quadTex(1,a,aa)}\\)`;
        const d3=`\\(${quadTex(1,a2,Math.abs(a))}\\)`;
        const opts=[c]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\(${quadTex(1,a2,-aa)}\\)`);
        return { type:'mc', rule:'Perfect Square', difficulty:'easy', text:'Find the area of this square:',
            svg:rectSVG(binTex(1,a),binTex(1,a),'Area = ?',true),
            latex:expr, answer:c, options:shuffle(opts),
            hintTex:[`\\((x+a)^2\\) means \\((x+a)(x+a)\\), not \\(x^2 + a^2\\).`,`Double the constant for the middle term: \\(2 \\times ${a<0?'('+a+')':a} = ${2*a}\\).`,`Square the constant for the last term: \\(${a<0?'('+a+')':a}^2 = ${a*a}\\).`],
            explain:`\\(${expr} = (${binTex(1,a)})(${binTex(1,a)}) = ${quadTex(1,a2,aa)}\\)` };
    },

    // Easy free: constant term
    qConstantTerm() {
        let a=randInt(1,10), b=randInt(-9,9);
        if(b===0) b=randInt(1,9);
        const prod=a*b;
        const expr=`(${binTex(1,a)})(${binTex(1,b)})`;
        return { type:'free', rule:'Expanding', difficulty:'easy', text:'What is the constant term in the area of this rectangle?',
            svg:rectSVG(binTex(1,a),binTex(1,b),'Area = ?'),
            latex:expr, answer:prod, answerTex:String(prod),
            hintTex:['The constant term comes from multiplying the two number terms.',`Multiply: \\(${a} \\times ${b<0?'('+b+')':b}\\).`],
            explain:`\\(${expr} = ${quadTex(1,a+b,prod)}\\). The constant term is \\(${prod}\\).` };
    },

    // Medium free: coefficient of x
    qCoeffX() {
        let a=randInt(1,10), b=randInt(-9,9);
        if(b===0) b=randInt(1,9);
        const sum=a+b;
        const expr=`(${binTex(1,a)})(${binTex(1,b)})`;
        return { type:'free', rule:'Expanding', difficulty:'easy', text:'What is the coefficient of \\(x\\) in the area of this rectangle?',
            svg:rectSVG(binTex(1,a),binTex(1,b),'Area = ?'),
            latex:expr, answer:sum, answerTex:String(sum),
            hintTex:['The \\(x\\) coefficient comes from the outer + inner products in FOIL.',`Add the two constants: \\(${a} + ${b<0?'('+b+')':b}\\).`],
            explain:`\\(${expr} = ${quadTex(1,sum,a*b)}\\). The coefficient of \\(x\\) is \\(${sum}\\).` };
    },

    // Medium MC: expand (ax+b)(cx+d)
    qExpandCoeff() {
        const a=randInt(2,3), c2=randInt(2,3);
        let b=randInt(-6,6), d=randInt(-6,6);
        if(b===0) b=randInt(1,6); if(d===0) d=randInt(1,6);
        const ac=a*c2, mid=a*d+b*c2, bd=b*d;
        const expr=`(${binTex(a,b)})(${binTex(c2,d)})`;
        const c=`\\(${quadTex(ac,mid,bd)}\\)`;
        const d1=`\\(${quadTex(ac,a*d-b*c2,bd)}\\)`;
        const d2=`\\(${quadTex(a+c2,mid,bd)}\\)`;
        const d3=`\\(${quadTex(ac,mid,b+d)}\\)`;
        const opts=[c]; [d1,d2,d3].forEach(dd=>{if(!opts.includes(dd))opts.push(dd);});
        while(opts.length<4) opts.push(`\\(${quadTex(ac,mid+2,bd)}\\)`);
        return { type:'mc', rule:'Expanding', difficulty:'medium', text:'Find the area of this rectangle:',
            svg:rectSVG(binTex(a,b),binTex(c2,d),'Area = ?'),
            latex:expr, answer:c, options:shuffle(opts),
            hintTex:['Multiply each term in the first bracket by each term in the second.',`Leading term: \\(${a}x \\cdot ${c2}x = ${ac}x^2\\). Constant: \\(${b<0?'('+b+')':b} \\times ${d<0?'('+d+')':d} = ${bd}\\).`,`Middle: \\(${a} \\cdot ${d<0?'('+d+')':d} + ${b<0?'('+b+')':b} \\cdot ${c2} = ${mid}\\).`],
            explain:`\\(${expr} = ${quadTex(ac,mid,bd)}\\)` };
    },

    // Medium MC: factorise x²+bx+c
    qFactorSimple() {
        let p=randInt(1,9)*pick([-1,1]), q=randInt(1,9)*pick([-1,1]);
        if(p===q) q=-q; if(q===0) q=randInt(1,9);
        const sum=p+q, prod=p*q;
        const quad=quadTex(1,sum,prod);
        const c=`\\((${binTex(1,p)})(${binTex(1,q)})\\)`;
        const d1=`\\((${binTex(1,-p)})(${binTex(1,q)})\\)`;
        const d2=`\\((${binTex(1,p)})(${binTex(1,-q)})\\)`;
        const d3=`\\((${binTex(1,-p)})(${binTex(1,-q)})\\)`;
        const opts=[c]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\((${binTex(1,p+1)})(${binTex(1,q-1)})\\)`);
        return { type:'mc', rule:'Factorising', difficulty:'medium', text:'Factorise to find the sides of this rectangle:',
            svg:rectSVG('?','?',quadLabel(1,sum,prod)),
            latex:quad, answer:c, options:shuffle(opts),
            hintTex:['Find two numbers that multiply to the constant and add to the coefficient of \\(x\\).',`The numbers must multiply to \\(${prod}\\).`,`They must also add to \\(${sum}\\).`],
            explain:`\\(${quad} = (${binTex(1,p)})(${binTex(1,q)})\\) since \\(${p}+${q===p?q:('('+q+')')}=${sum}\\) and \\(${p}\\times${q<0?'('+q+')':q}=${prod}\\).` };
    },

    // Hard MC: given area and one side, find the other
    qFindSide() {
        let p=randInt(1,9), q=randInt(1,9)*pick([-1,1]);
        if(p===q||p===-q) q=q+1;
        const sum=p+q, prod=p*q;
        const quad=quadTex(1,sum,prod);
        const given=binTex(1,p), other=binTex(1,q);
        const c=`\\(${other}\\)`;
        const d1=`\\(${binTex(1,-q)}\\)`;
        const d2=`\\(${binTex(1,prod)}\\)`;
        const d3=`\\(${binTex(1,sum)}\\)`;
        const opts=[c]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\(${binTex(1,q+2)}\\)`);
        return { type:'mc', rule:'Factorising', difficulty:'medium', text:'Find the missing side of this rectangle:',
            svg:rectSVG(given,'?',quadLabel(1,sum,prod)),
            latex:`\\dfrac{${quad}}{${given}}`, answer:c, options:shuffle(opts),
            hintTex:['Start by factorising the quadratic into two brackets.',`One bracket is \\((${given})\\). What goes in the other?`,`Find what multiplies with \\(${p}\\) to give \\(${prod}\\).`],
            explain:`\\(${quad} = (${given})(${other})\\), so the other side is \\(${other}\\).` };
    },

    // Medium MC: difference of squares via area
    qDiffSquares() {
        const a=randInt(2,9);
        const aa=a*a;
        const quad=quadTex(1,0,-aa);
        const c=`\\((${binTex(1,a)})(${binTex(1,-a)})\\)`;
        const d1=`\\((${binTex(1,a)})(${binTex(1,a)})\\)`;
        const d2=`\\((${binTex(1,aa)})(${binTex(1,-1)})\\)`;
        const d3=`\\((${binTex(1,-aa)})(${binTex(1,1)})\\)`;
        const opts=[c]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\((${binTex(1,a+1)})(${binTex(1,-a+1)})\\)`);
        return { type:'mc', rule:'Difference of Squares', difficulty:'medium', text:'Factorise to find the sides of this rectangle:',
            svg:rectSVG('?','?',quadLabel(1,0,-aa)),
            latex:quad, answer:c, options:shuffle(opts),
            hintTex:['This is a difference of two squares.',`Rewrite as \\(x^2 - ${a}^2\\). What squared gives \\(${aa}\\)?`,`Use \\(a^2 - b^2 = (a+b)(a-b)\\) with \\(b = ${a}\\).`],
            explain:`\\(${quad} = x^2 - ${a}^2 = (${binTex(1,a)})(${binTex(1,-a)})\\)` };
    },

    // Hard MC: factorise ax²+bx+c where a≠1
    qFactorHard() {
        const a1=randInt(2,3), a2=randInt(2,3);
        let b1=randInt(-6,6), b2=randInt(-6,6);
        if(b1===0) b1=randInt(1,6); if(b2===0) b2=randInt(1,6);
        const A=a1*a2, B=a1*b2+a2*b1, C=b1*b2;
        const quad=quadTex(A,B,C);
        const f1=binTex(a1,b1), f2=binTex(a2,b2);
        const c=`\\((${f1})(${f2})\\)`;
        const d1=`\\((${binTex(a1,-b1)})(${f2})\\)`;
        const d2=`\\((${f1})(${binTex(a2,-b2)})\\)`;
        const d3=`\\((${binTex(1,b1)})(${binTex(A,b2)})\\)`;
        const opts=[c]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\((${binTex(a1,b1+1)})(${binTex(a2,b2-1)})\\)`);
        return { type:'mc', rule:'Factorising (a\u22601)', difficulty:'hard', text:'Factorise:',
            latex:quad, answer:c, options:shuffle(opts),
            hintTex:[`The leading coefficient \\(${A}\\) factors as \\(${a1} \\times ${a2}\\).`,`Find factors of \\(${C}\\) that combine to give middle term \\(${B}x\\).`,`Check: \\(${a1}\\times${b2<0?'('+b2+')':b2} + ${a2}\\times${b1<0?'('+b1+')':b1} = ${B}\\).`],
            explain:`\\(${quad} = (${f1})(${f2})\\)` };
    },

    // Hard free: completing the square
    qCompleteSquare() {
        const h=randInt(-6,6), k=randInt(-9,9);
        if(h===0) return QA.qCompleteSquare();
        const b=-2*h, c=h*h+k;
        const quad=quadTex(1,b,c);
        const vf=k>=0?`(x ${h>0?'-':'+'} ${Math.abs(h)})^2 + ${k}`:`(x ${h>0?'-':'+'} ${Math.abs(h)})^2 - ${Math.abs(k)}`;
        return { type:'free', rule:'Completing the Square', difficulty:'hard',
            text:`Complete the square: \\(${quad} = (x + p)^2 + q\\). What is \\(q\\)?`,
            latex:quad, answer:k, answerTex:String(k),
            hintTex:[`To complete the square: half the coefficient of \\(x\\), then square it.`,`Half of \\(${b}\\) is \\(${-h}\\). So we write \\((x ${h>0?'-':'+'} ${Math.abs(h)})^2\\).`,`Expanding gives \\(x^2 ${b>=0?'+':''} ${b}x + ${h*h}\\). Adjust by \\(${c} - ${h*h} = ${k}\\).`],
            explain:`\\(${quad} = (x ${h>0?'-':'+'} ${Math.abs(h)})^2 + ${k}\\). So \\(q = ${k}\\).` };
    },

    // Hard free: find vertex x-coordinate
    qVertexX() {
        const h=randInt(-8,8), k=randInt(-9,9);
        if(h===0) return QA.qVertexX();
        const b=-2*h, c=h*h+k;
        const quad=quadTex(1,b,c);
        return { type:'free', rule:'Vertex Form', difficulty:'hard',
            text:`The parabola \\(y = ${quad}\\) has vertex \\((h, k)\\). What is \\(h\\)?`,
            latex:quad, answer:h, answerTex:String(h),
            hintTex:[`The vertex x-coordinate is \\(h = -\\frac{b}{2a}\\).`,`Here \\(a = 1\\) and \\(b = ${b}\\).`,`So \\(h = -\\frac{${b}}{2} = ${h}\\).`],
            explain:`\\(h = -\\frac{b}{2a} = -\\frac{${b}}{2} = ${h}\\). Vertex is at \\((${h}, ${k})\\).` };
    },

    // Hard MC: solve quadratic (nice roots)
    qSolveQuad() {
        let r1=randInt(-8,8), r2=randInt(-8,8);
        if(r1===r2) r2=r1+randInt(1,4)*pick([-1,1]);
        if(r1>r2) [r1,r2]=[r2,r1];
        const b=-(r1+r2), c=r1*r2;
        const quad=quadTex(1,b,c);
        const solStr=`x = ${r1} \\text{ or } x = ${r2}`;
        const c_=`\\(x = ${r1}\\) or \\(x = ${r2}\\)`;
        const d1=`\\(x = ${-r1}\\) or \\(x = ${-r2}\\)`;
        const d2=`\\(x = ${r1}\\) or \\(x = ${-r2}\\)`;
        const d3=`\\(x = ${r1+1}\\) or \\(x = ${r2-1}\\)`;
        const opts=[c_]; [d1,d2,d3].forEach(d=>{if(!opts.includes(d))opts.push(d);});
        while(opts.length<4) opts.push(`\\(x = ${r1-1}\\) or \\(x = ${r2+1}\\)`);
        return { type:'mc', rule:'Solving Quadratics', difficulty:'hard',
            text:`Solve \\(${quad} = 0\\):`,
            latex:`${quad} = 0`, answer:c_, options:shuffle(opts),
            hintTex:['Factorise the quadratic first.',`Find two numbers that multiply to \\(${c}\\) and add to \\(${b}\\).`,`Set each factor equal to zero.`],
            explain:`\\(${quad} = (x ${r1<=0?'+':'-'} ${Math.abs(r1)})(x ${r2<=0?'+':'-'} ${Math.abs(r2)}) = 0\\), so \\(${solStr}\\).` };
    },

    // Hard free: discriminant
    qDiscriminant() {
        const a=1, b=randInt(-10,10), c=randInt(-10,10);
        const disc=b*b-4*a*c;
        const quad=quadTex(a,b,c);
        return { type:'free', rule:'Discriminant', difficulty:'hard',
            text:`Find the discriminant of \\(${quad} = 0\\):`,
            latex:`b^2 - 4ac`, answer:disc, answerTex:String(disc),
            hintTex:['The discriminant is \\(\\Delta = b^2 - 4ac\\).',`Here \\(a = ${a}\\), \\(b = ${b}\\), \\(c = ${c}\\).`,`\\(\\Delta = ${b}^2 - 4(${a})(${c}) = ${b*b} ${-4*a*c>=0?'+':''} ${-4*a*c}\\).`],
            explain:`\\(\\Delta = b^2 - 4ac = ${b}^2 - 4(${a})(${c}) = ${b*b} - ${4*a*c} = ${disc}\\).` };
    },

    pools:null, allPool:null, level:'all',
    init() {
        this.pools = {
            easy: [this.qExpandRect, this.qExpandSquare, this.qConstantTerm, this.qCoeffX],
            medium: [this.qExpandCoeff, this.qFactorSimple, this.qFindSide, this.qDiffSquares],
            hard: [this.qFactorHard, this.qCompleteSquare, this.qVertexX, this.qSolveQuad, this.qDiscriminant]
        };
        this.allPool = [
            this.qExpandRect, this.qExpandRect,
            this.qExpandSquare, this.qExpandSquare,
            this.qConstantTerm, this.qCoeffX,
            this.qExpandCoeff, this.qExpandCoeff,
            this.qFactorSimple, this.qFactorSimple,
            this.qFindSide,
            this.qDiffSquares,
            this.qFactorHard, this.qFactorHard,
            this.qCompleteSquare, this.qVertexX,
            this.qSolveQuad, this.qSolveQuad,
            this.qDiscriminant
        ];
        loadTrainerStats('qa',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },

    resetScore() {
        this.score=0; this.total=0; this.streak=0;
        document.getElementById('qa-score').textContent='0 / 0';
        document.getElementById('qa-pct').textContent='\u2014';
        document.getElementById('qa-streak').textContent='0';
        saveTrainerStats('qa',this);
    },

    load() {
        this.answered = false;
        this.currentQ = this.next();
        const q = this.currentQ;
        const dl = {easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h = `<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div>`;
        h += `<div class="rule-tag">${q.rule}</div>`;
        h += `<div class="question-text">${q.text}</div>`;
        if (q.svg) h += q.svg;
        h += `<div class="question-prompt">\\(${q.latex}\\)</div>`;

        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o,i) => { h += `<button class="option-btn" data-i="${i}">${o}</button>`; });
            h += '</div>';
        } else {
            h += `<div class="input-area">
                    <math-field class="lr-math-field" id="qa-mf" placeholder="Type your answer"></math-field>
                    <button class="btn btn-primary" id="qa-check">Check</button>
                  </div>`;
        }

        document.getElementById('qa-card').innerHTML = h;
        const fb = document.getElementById('qa-fb');
        fb.classList.remove('show','correct','incorrect');
        document.getElementById('qa-next').classList.remove('show');
        this.hintIdx = 0;
        resetHint('qa-hint', 'qa-hint-btn');
        document.getElementById('qa-workout').innerHTML = '';
        renderMath();

        if (q.type === 'mc') {
            document.getElementById('qa-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => QA.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(() => {
                const mf = document.getElementById('qa-mf');
                if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();QA.handleFree();}});}
                const cb = document.getElementById('qa-check');
                if(cb) cb.addEventListener('click', () => QA.handleFree());
            }, 200);
        }
    },

    handleMC(idx) {
        if(this.answered) return;
        this.answered = true;
        const q=this.currentQ, chosen=q.options[idx], ok=chosen===q.answer;
        document.getElementById('qa-card').querySelectorAll('.option-btn').forEach((btn,i) => {
            btn.disabled=true;
            if(q.options[i]===q.answer) btn.classList.add('correct');
            if(i===idx&&!ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        this.showFb(ok, q.explain);
    },

    handleFree() {
        if(this.answered) return;
        const mf=document.getElementById('qa-mf');
        if(!mf) return;
        const latex=mf.value;
        if(!latex||!latex.trim()) return;
        this.answered=true;
        const ok=Math.abs(parseLatex(latex)-this.currentQ.answer)<0.0001;
        mf.disabled=true;
        const cb=document.getElementById('qa-check');
        if(cb) cb.disabled=true;
        let extra='';
        if(!ok) extra=`<br>The correct answer is \\(${this.currentQ.answerTex}\\).`;
        this.record(ok);
        this.showFb(ok, this.currentQ.explain+extra);
    },

    record(ok) {
        this.total++;
        if(ok){this.score++;this.streak++;}else{this.streak=0;}
        document.getElementById('qa-score').textContent=`${this.score} / ${this.total}`;
        document.getElementById('qa-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014';
        document.getElementById('qa-streak').textContent=this.streak;
        saveTrainerStats('qa',this);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb=document.getElementById('qa-fb');
        fb.classList.remove('correct','incorrect');
        fb.classList.add('show', ok?'correct':'incorrect');
        fb.style.textAlign='center';
        document.getElementById('qa-fb-title').textContent=ok?'Correct!':'Not quite\u2026';
        document.getElementById('qa-fb-expl').innerHTML=html;
        document.getElementById('qa-next').classList.add('show');
        renderMath();
        fb.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
};
const TRANS = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    // Easy: Vertical translation f(x) + a
    qVerticalShift() {
        const a = randInt(1, 6) * pick([-1, 1]);
        const dir = a > 0 ? 'up' : 'down';
        return { type:'mc', rule:'Translation', difficulty:'easy', text:`The graph of y = f(x) is transformed to y = f(x) ${a>=0?'+':'-'} ${Math.abs(a)}. What happens?`,
            latex:`y = f(x) ${a>=0?'+':'\u2212'} ${Math.abs(a)}`,
            options:[`Shifts ${Math.abs(a)} up`, `Shifts ${Math.abs(a)} down`, `Shifts ${Math.abs(a)} left`, `Shifts ${Math.abs(a)} right`],
            answer:`Shifts ${Math.abs(a)} ${dir}`,
            hintTex:['f(x) + a shifts vertically.',`Adding to y shifts up, subtracting shifts down`],
            explain:`\\(f(x) ${a>=0?'+':'-'} ${Math.abs(a)}\\) shifts the graph ${Math.abs(a)} units ${dir}.` };
    },

    // Easy: Horizontal translation f(x + a)
    qHorizontalShift() {
        const a = randInt(1, 6) * pick([-1, 1]);
        const dir = a > 0 ? 'left' : 'right';
        return { type:'mc', rule:'Translation', difficulty:'easy', text:`The graph of y = f(x) is transformed to y = f(x ${a>=0?'+':'-'} ${Math.abs(a)}). What happens?`,
            latex:`y = f(x ${a>=0?'+':'\u2212'} ${Math.abs(a)})`,
            options:[`Shifts ${Math.abs(a)} up`, `Shifts ${Math.abs(a)} down`, `Shifts ${Math.abs(a)} left`, `Shifts ${Math.abs(a)} right`],
            answer:`Shifts ${Math.abs(a)} ${dir}`,
            hintTex:['f(x + a) shifts horizontally (opposite direction!).',`f(x + a) shifts LEFT, f(x - a) shifts RIGHT`],
            explain:`\\(f(x ${a>=0?'+':'-'} ${Math.abs(a)})\\) shifts the graph ${Math.abs(a)} units ${dir}.` };
    },

    // Easy: Reflection in x-axis
    qReflectX() {
        return { type:'mc', rule:'Reflection', difficulty:'easy', text:'The graph of y = f(x) is transformed to y = -f(x). What happens?',
            latex:`y = -f(x)`,
            options:['Reflects in the x-axis', 'Reflects in the y-axis', 'Shifts up', 'Shifts down'],
            answer:'Reflects in the x-axis',
            hintTex:['The negative is outside the function.',`-f(x) flips all y-values`],
            explain:`\\(-f(x)\\) reflects the graph in the x-axis (flips vertically).` };
    },

    // Medium: Reflection in y-axis
    qReflectY() {
        return { type:'mc', rule:'Reflection', difficulty:'medium', text:'The graph of y = f(x) is transformed to y = f(-x). What happens?',
            latex:`y = f(-x)`,
            options:['Reflects in the x-axis', 'Reflects in the y-axis', 'Shifts left', 'Shifts right'],
            answer:'Reflects in the y-axis',
            hintTex:['The negative is inside the function.',`f(-x) flips all x-values`],
            explain:`\\(f(-x)\\) reflects the graph in the y-axis (flips horizontally).` };
    },

    // Medium: Vertical stretch
    qVerticalStretch() {
        const a = randInt(2, 4);
        return { type:'mc', rule:'Stretch', difficulty:'medium', text:`The graph of y = f(x) is transformed to y = ${a}f(x). What happens?`,
            latex:`y = ${a}f(x)`,
            options:[`Vertical stretch by factor ${a}`, `Horizontal stretch by factor ${a}`, `Vertical compression by factor ${a}`, `Shifts up by ${a}`],
            answer:`Vertical stretch by factor ${a}`,
            hintTex:['Multiplying f(x) by a number affects the y-values.',`af(x) stretches vertically by factor a`],
            explain:`\\(${a}f(x)\\) stretches the graph vertically by factor ${a}.` };
    },

    // Medium: Horizontal stretch
    qHorizontalStretch() {
        const a = randInt(2, 4);
        return { type:'mc', rule:'Stretch', difficulty:'medium', text:`The graph of y = f(x) is transformed to y = f(${a}x). What happens?`,
            latex:`y = f(${a}x)`,
            options:[`Vertical stretch by factor ${a}`, `Horizontal compression by factor ${a}`, `Horizontal stretch by factor ${a}`, `Shifts right by ${a}`],
            answer:`Horizontal compression by factor ${a}`,
            hintTex:['Multiplying x inside the function affects width.',`f(ax) compresses horizontally by factor a`],
            explain:`\\(f(${a}x)\\) compresses the graph horizontally by factor ${a}.` };
    },

    // Hard: Combined transformation - describe
    qCombinedDescribe() {
        const h = randInt(1, 4) * pick([-1, 1]), k = randInt(1, 4) * pick([-1, 1]);
        const hDir = h > 0 ? 'left' : 'right', kDir = k > 0 ? 'up' : 'down';
        return { type:'free', rule:'Combined', difficulty:'hard', text:`y = f(x ${h>=0?'+':'-'} ${Math.abs(h)}) ${k>=0?'+':'-'} ${Math.abs(k)}. How many units does it shift horizontally?`,
            latex:`y = f(x ${h>=0?'+':'\u2212'} ${Math.abs(h)}) ${k>=0?'+':'\u2212'} ${Math.abs(k)}`, answer:Math.abs(h), answerTex:`${Math.abs(h)} \\text{ units ${hDir}}`,
            hintTex:['Identify each transformation separately.',`f(x ${h>=0?'+':'-'} ${Math.abs(h)}) shifts ${Math.abs(h)} ${hDir}`],
            explain:`Horizontal shift: ${Math.abs(h)} units ${hDir}. Vertical shift: ${Math.abs(k)} units ${kDir}.` };
    },

    // Hard: New coordinates after transformation
    qNewCoords() {
        const px = randInt(1, 5), py = randInt(1, 5);
        const k = randInt(1, 4) * pick([-1, 1]);
        const newY = py + k;
        return { type:'free', rule:'Coordinates', difficulty:'hard', text:`Point (${px}, ${py}) is on y = f(x). After transforming to y = f(x) ${k>=0?'+':'-'} ${Math.abs(k)}, what is the new y-coordinate?`,
            latex:`(${px}, ${py}) \\to (${px}, ?)`, answer:newY, answerTex:String(newY),
            hintTex:[`f(x) ${k>=0?'+':'-'} ${Math.abs(k)} adds ${k} to every y-value.`,`New y = ${py} ${k>=0?'+':'-'} ${Math.abs(k)}`],
            explain:`Adding ${k} to y: new point is \\((${px}, ${py + k})\\). New y-coordinate = ${newY}.` };
    },

    pools:null, allPool:null,
    init() {
        this.pools = { easy:[this.qVerticalShift,this.qHorizontalShift,this.qReflectX], medium:[this.qReflectY,this.qVerticalStretch,this.qHorizontalStretch], hard:[this.qCombinedDescribe,this.qNewCoords] };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('trans-score').textContent='0 / 0'; document.getElementById('trans-pct').textContent='\u2014'; document.getElementById('trans-streak').textContent='0'; },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h=`<div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div><div class="rule-tag">${q.rule}</div><div class="question-text">${q.text}</div><div class="question-prompt">\\(${q.latex}\\)</div>`;
        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o,i) => { h += `<button class="option-btn" data-i="${i}">${o}</button>`; });
            h += '</div>';
        } else {
            h+=`<div class="input-area"><math-field class="lr-math-field" id="trans-mf" placeholder="?"></math-field><button class="btn btn-primary" id="trans-check">Check</button></div>`;
        }
        document.getElementById('trans-card').innerHTML=h;
        document.getElementById('trans-fb').classList.remove('show','correct','incorrect');
        document.getElementById('trans-next').classList.remove('show');
        resetHint('trans-hint','trans-hint-btn');
        document.getElementById('trans-workout').innerHTML='';
        renderMath();
        if (q.type === 'mc') {
            document.getElementById('trans-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => TRANS.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(()=>{const mf=document.getElementById('trans-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();TRANS.check();}});}document.getElementById('trans-check')?.addEventListener('click',()=>TRANS.check());},200);
        }
    },
    handleMC(idx) {
        if(this.answered) return;
        this.answered=true;
        const q=this.currentQ, chosen=q.options[idx], ok=chosen===q.answer;
        document.getElementById('trans-card').querySelectorAll('.option-btn').forEach((btn,i) => {
            btn.disabled=true;
            if(q.options[i]===q.answer) btn.classList.add('correct');
            if(i===idx&&!ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        this.showFb(ok, q.explain);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('trans-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('trans-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex=`The answer is \\(${this.currentQ.answerTex}\\).<br>`+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('trans-score').textContent=`${this.score} / ${this.total}`; document.getElementById('trans-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('trans-streak').textContent=this.streak; if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('trans-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('trans-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('trans-fb-expl').innerHTML=html; document.getElementById('trans-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};
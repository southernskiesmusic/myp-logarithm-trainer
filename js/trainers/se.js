const SE = {
    score: 0, total: 0, streak: 0, currentQ: null, answered: false, hintIdx: 0,
    level: 'all',

    qDirect() {
        const b=pick(BASES), u=randInt(1,4), v=randInt(1,4);
        if(u===v) return SE.qDirect();
        const x=Math.pow(b,u), y=Math.pow(b,v);
        if(x>10000||y>10000) return SE.qDirect();
        return { difficulty:'easy', x, y,
            eq1:`${logTex(b,'x')} = ${u}`, eq2:`${logTex(b,'y')} = ${v}`,
            hintTex:[`Use the definition of logarithms: \\(${logTex(b,'x')} = n\\) means \\(x = ${b}^n\\).`,`For Eq1: \\(x = ${b}^{${u}}\\). For Eq2: \\(y = ${b}^{${v}}\\). Now compute.`],
            solution:[
                `\\text{From Eq1: } ${logTex(b,'x')} = ${u} \\implies x = ${b}^{${u}} = ${x}`,
                `\\text{From Eq2: } ${logTex(b,'y')} = ${v} \\implies y = ${b}^{${v}} = ${y}`,
                `\\boxed{x = ${x},\\quad y = ${y}}`
            ]};
    },
    qSumDiff() {
        const b=pick(BASES), u=randInt(1,4), v=randInt(1,4);
        if(u===v) return SE.qSumDiff();
        const x=Math.pow(b,u), y=Math.pow(b,v);
        if(x>10000||y>10000) return SE.qSumDiff();
        const p=u+v, q=u-v;
        return { difficulty:'medium', x, y,
            eq1:`${logTex(b,'x')} + ${logTex(b,'y')} = ${p}`,
            eq2:`${logTex(b,'x')} - ${logTex(b,'y')} = ${q}`,
            hintTex:[`Let \\(u = ${logTex(b,'x')}\\) and \\(v = ${logTex(b,'y')}\\) to get a linear system.`,`Add the two equations to eliminate \\(v\\): \\(2u = ${p+q}\\).`,`So \\(u = ${u}\\), then back-substitute to find \\(v = ${v}\\). Convert with \\(x = ${b}^u\\).`],
            solution:[
                `\\text{Let } u = ${logTex(b,'x')},\\; v = ${logTex(b,'y')}`,
                `u + v = ${p},\\quad u - v = ${q}`,
                `\\text{Add: } 2u = ${p+q} \\implies u = ${u}`,
                `\\text{Substitute: } ${u} + v = ${p} \\implies v = ${v}`,
                `x = ${b}^{${u}} = ${x},\\quad y = ${b}^{${v}} = ${y}`,
                `\\boxed{x = ${x},\\quad y = ${y}}`
            ]};
    },
    qProdQuot() {
        const b=pick(BASES), u=randInt(1,4), v=randInt(1,4);
        if(u===v) return SE.qProdQuot();
        const x=Math.pow(b,u), y=Math.pow(b,v);
        if(x>10000||y>10000) return SE.qProdQuot();
        const p=u+v, q=u-v;
        return { difficulty:'medium', x, y,
            eq1:`${logTex(b,'xy')} = ${p}`,
            eq2:`${logTex(b,'\\tfrac{x}{y}')} = ${q}`,
            hintTex:['Use log rules to split each equation into separate logs.',`Product Rule on Eq1: \\(${logTex(b,'x')} + ${logTex(b,'y')} = ${p}\\). Quotient Rule on Eq2: \\(${logTex(b,'x')} - ${logTex(b,'y')} = ${q}\\).`,`Now add the equations: \\(2u = ${p+q}\\), so \\(u = ${u}\\).`],
            solution:[
                `\\text{Product Rule on Eq1: } ${logTex(b,'x')} + ${logTex(b,'y')} = ${p}`,
                `\\text{Quotient Rule on Eq2: } ${logTex(b,'x')} - ${logTex(b,'y')} = ${q}`,
                `\\text{Let } u = ${logTex(b,'x')},\\; v = ${logTex(b,'y')}`,
                `\\text{Add: } 2u = ${p+q} \\implies u = ${u}`,
                `v = ${p} - ${u} = ${v}`,
                `x = ${b}^{${u}} = ${x},\\quad y = ${b}^{${v}} = ${y}`,
                `\\boxed{x = ${x},\\quad y = ${y}}`
            ]};
    },
    qCoefficients() {
        const b=pick(BASES), u=randInt(1,3), v=randInt(1,3);
        const x=Math.pow(b,u), y=Math.pow(b,v);
        if(x>10000||y>10000) return SE.qCoefficients();
        const a1=randInt(1,3), b1=randInt(1,3), a2=randInt(1,3), b2=randInt(1,3);
        const det=a1*b2-a2*b1;
        if(det===0||(a1===a2&&b1===b2)) return SE.qCoefficients();
        const p=a1*u+b1*v, q=a2*u+b2*v;

        function ct(c,vr,f){
            if(c===1) return f?vr:' + '+vr;
            if(c>0) return f?c+vr:' + '+c+vr;
            return ' - '+Math.abs(c)+vr;
        }
        const m1=a2, m2=a1;
        const nb1=b1*m1, nc1=p*m1, nb2=b2*m2, nc2=q*m2;
        const dB=nb1-nb2, dC=nc1-nc2;

        const steps=[`\\text{Let } u = ${logTex(b,'x')},\\; v = ${logTex(b,'y')}`];
        steps.push(`\\text{Eq1: }${ct(a1,'u',true)}${ct(b1,'v',false)} = ${p}`);
        steps.push(`\\text{Eq2: }${ct(a2,'u',true)}${ct(b2,'v',false)} = ${q}`);
        if(m1!==1) steps.push(`\\text{Eq1}\\times${m1}: ${ct(a1*m1,'u',true)}${ct(nb1,'v',false)} = ${nc1}`);
        if(m2!==1) steps.push(`\\text{Eq2}\\times${m2}: ${ct(a2*m2,'u',true)}${ct(nb2,'v',false)} = ${nc2}`);
        steps.push(`\\text{Subtract: }${ct(dB,'v',true)} = ${dC} \\implies v = ${v}`);
        steps.push(`u = \\frac{${p} - ${b1===1?'':b1+'\\cdot'}${v}}{${a1}} = ${u}`);
        steps.push(`x = ${b}^{${u}} = ${x},\\quad y = ${b}^{${v}} = ${y}`);
        steps.push(`\\boxed{x = ${x},\\quad y = ${y}}`);

        function leq(ca,cb,rhs){
            let s = ca===1?logTex(b,'x'):ca+'\\,'+logTex(b,'x');
            if(cb===1) s+=' + '+logTex(b,'y');
            else if(cb>0) s+=' + '+cb+'\\,'+logTex(b,'y');
            else s+=' - '+Math.abs(cb)+'\\,'+logTex(b,'y');
            return s+' = '+rhs;
        }
        return { difficulty:'hard', x, y, eq1:leq(a1,b1,p), eq2:leq(a2,b2,q),
            hintTex:[`Let \\(u = ${logTex(b,'x')}\\) and \\(v = ${logTex(b,'y')}\\) to get a linear system.`,`Use elimination: multiply equations to match one variable's coefficient, then subtract.`,`Once you find \\(u\\) and \\(v\\), convert back: \\(x = ${b}^u\\), \\(y = ${b}^v\\).`],
            solution:steps };
    },
    qPowerForm() {
        const b=pick(BASES), u=randInt(1,3), v=randInt(1,3);
        const x=Math.pow(b,u), y=Math.pow(b,v);
        if(x>10000||y>10000) return SE.qPowerForm();
        const a1=randInt(2,3), b1=1, a2=1, b2=randInt(2,3);
        const det=a1*b2-a2*b1;
        if(det===0) return SE.qPowerForm();
        const p=a1*u+b1*v, q=a2*u+b2*v;
        function ins(ca,cb){let s=ca>1?`x^{${ca}}`:'x'; s+=cb>1?`y^{${cb}}`:'y'; return s;}
        const vC=a1*b2-b1, vR=a1*q-p;
        const steps=[
            `\\text{Apply Product \\& Power Rules:}`,
            `\\text{Eq1: }${a1>1?a1+'\\,':''}${logTex(b,'x')} + ${b1>1?b1+'\\,':''}${logTex(b,'y')} = ${p}`,
            `\\text{Eq2: }${a2>1?a2+'\\,':''}${logTex(b,'x')} + ${b2>1?b2+'\\,':''}${logTex(b,'y')} = ${q}`,
            `\\text{Eq2}\\times${a1}: ${a1}u + ${a1*b2}v = ${a1*q}`,
            `\\text{Subtract Eq1: }${vC}v = ${vR} \\implies v = ${v}`,
            `u = ${q} - ${b2>1?b2+'\\cdot':''}${v} = ${u}`,
            `x = ${b}^{${u}} = ${x},\\quad y = ${b}^{${v}} = ${y}`,
            `\\boxed{x = ${x},\\quad y = ${y}}`
        ];
        return { difficulty:'hard', x, y,
            eq1:`${logTex(b,ins(a1,b1))} = ${p}`, eq2:`${logTex(b,ins(a2,b2))} = ${q}`,
            hintTex:['Use the Product Rule to split, then the Power Rule to bring exponents down.',`You get a system like \\(au + bv = \\text{value}\\) where \\(u = ${logTex(b,'x')}\\), \\(v = ${logTex(b,'y')}\\).`,'Solve the linear system using elimination, then convert back with \\(x = b^u\\), \\(y = b^v\\).'],
            solution:steps };
    },

    pools: null, allPool: null,
    init() {
        this.pools = { easy:[this.qDirect], medium:[this.qSumDiff,this.qProdQuot], hard:[this.qCoefficients,this.qPowerForm] };
        this.allPool = [this.qDirect,this.qDirect,this.qSumDiff,this.qSumDiff,this.qSumDiff,this.qProdQuot,this.qProdQuot,this.qCoefficients,this.qPowerForm];
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },

    load() {
        this.answered = false;
        this.currentQ = this.next();
        const q = this.currentQ;
        const dl = {easy:'Easy',medium:'Medium',hard:'Challenging'};
        document.getElementById('se-card').innerHTML = `
            <div class="difficulty-tag ${q.difficulty}">${dl[q.difficulty]}</div>
            <div style="font-size:1.1rem;margin-bottom:8px;">Find \\(x\\) and \\(y\\):</div>
            <div class="equation-system">\\(${q.eq1}\\)<br>\\(${q.eq2}\\)</div>`;
        document.getElementById('se-workout').innerHTML = '';
        const mx=document.getElementById('se-mf-x'), my=document.getElementById('se-mf-y');
        if(mx){mx.value='';mx.disabled=false;} if(my){my.value='';my.disabled=false;}
        document.getElementById('se-check').disabled = false;
        const fb=document.getElementById('se-fb');
        fb.classList.remove('show','correct','incorrect');
        document.getElementById('se-next').classList.remove('show');
        this.hintIdx = 0;
        resetHint('se-hint', 'se-hint-btn');
        renderMath();
    },

    check() {
        if(this.answered) return;
        const mx=document.getElementById('se-mf-x'), my=document.getElementById('se-mf-y');
        if(!mx||!my) return;
        const lx=mx.value, ly=my.value;
        if((!lx||!lx.trim())&&(!ly||!ly.trim())) return;
        this.answered = true;
        mx.disabled=true; my.disabled=true;
        document.getElementById('se-check').disabled=true;
        const q=this.currentQ;
        const ux=parseLatex(lx), uy=parseLatex(ly);
        const ok = !isNaN(ux)&&!isNaN(uy)&&Math.abs(ux-q.x)<0.001&&Math.abs(uy-q.y)<0.001;
        this.record(ok);
        let html='';
        if(!ok) html+=`<p style="margin-bottom:12px;text-align:center;">The correct answer is \\(x = ${q.x}\\), \\(y = ${q.y}\\).</p>`;
        html+='<strong>Worked solution:</strong><br>';
        q.solution.forEach(s=>{html+=`<div class="solution-step">\\(${s}\\)</div>`;});
        this.showFb(ok, html);
    },

    record(ok) {
        this.total++;
        if(ok){this.score++;this.streak++;}else{this.streak=0;}
        document.getElementById('se-score').textContent=`${this.score} / ${this.total}`;
        document.getElementById('se-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014';
        document.getElementById('se-streak').textContent=this.streak;
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb=document.getElementById('se-fb');
        fb.classList.remove('correct','incorrect');
        fb.classList.add('show', ok?'correct':'incorrect');
        document.getElementById('se-fb-title').textContent=ok?'Correct!':'Not quite\u2026';
        document.getElementById('se-fb-expl').innerHTML=html;
        document.getElementById('se-next').classList.add('show');
        renderMath();
        fb.scrollIntoView({behavior:'smooth',block:'nearest'});
    },

    resetScore() {
        this.score=0; this.total=0; this.streak=0;
        document.getElementById('se-score').textContent='0 / 0';
        document.getElementById('se-pct').textContent='\u2014';
        document.getElementById('se-streak').textContent='0';
    }
};
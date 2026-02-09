const SKILL_DEFS = [
    { id:'S01', name:'Definition & Converting Forms', tier:1, prereqs:[] },
    { id:'S02', name:'Evaluating Logarithms',         tier:1, prereqs:[] },
    { id:'S03', name:'Special Values',                 tier:1, prereqs:[] },
    { id:'S04', name:'Common & Natural Logs',          tier:2, prereqs:['S01','S02','S03'] },
    { id:'S05', name:'Product Rule',                   tier:2, prereqs:['S02','S03'] },
    { id:'S06', name:'Quotient Rule',                  tier:2, prereqs:['S02','S03'] },
    { id:'S07', name:'Power Rule',                     tier:2, prereqs:['S02','S03'] },
    { id:'S08', name:'Change of Base',                 tier:3, prereqs:['S02','S05','S06','S07'] },
    { id:'S09', name:'Expanding Expressions',          tier:3, prereqs:['S05','S06','S07'] },
    { id:'S10', name:'Condensing Expressions',         tier:3, prereqs:['S05','S06','S07'] },
    { id:'S11', name:'Combining Multiple Rules',       tier:4, prereqs:['S09','S10'] },
    { id:'S12', name:'Solving Log Equations',          tier:4, prereqs:['S01','S02','S08'] },
    { id:'S13', name:'Solving Exponential Equations',  tier:4, prereqs:['S01','S04','S07'] },
];
const SKILL_IDS = SKILL_DEFS.map(s => s.id);
const UNLOCK_THR = 0.6;
const MIN_ATT = 10;
const MASTERED_THR = 0.8;
const DECAY = 0.85;
const MAX_ATT = 50;
const STORAGE_KEY = 'logMasteryData';
const TIER_NAMES = { 1:'Foundations', 2:'Core Rules', 3:'Applications', 4:'Advanced' };

const LA = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0,
    focusSkill:null, data:null,

    // ── Persistence ──────────────────────────────────────────────
    loadData() {
        try { const r=localStorage.getItem(STORAGE_KEY); if(r) { this.data=JSON.parse(r); return; } } catch(e){}
        this.initData();
    },
    initData() {
        this.data = { version:1, totalQuestions:0, totalCorrect:0,
            skills: Object.fromEntries(SKILL_IDS.map(id=>[id,{attempts:[]}])) };
    },
    saveData() {
        for(const sid of SKILL_IDS) {
            const a=this.data.skills[sid].attempts;
            if(a.length>MAX_ATT) this.data.skills[sid].attempts=a.slice(0,MAX_ATT);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
    },
    resetData() { this.initData(); localStorage.removeItem(STORAGE_KEY); },

    // ── Mastery Computation ──────────────────────────────────────
    computeMastery(sid) {
        const atts = this.data.skills[sid].attempts;
        if(!atts.length) return 0;
        let wc=0, wt=0;
        for(let i=0;i<atts.length;i++) { const w=Math.pow(DECAY,i); wt+=w; if(atts[i].ok) wc+=w; }
        return wc/wt;
    },
    isUnlocked(sid) {
        const def=SKILL_DEFS.find(s=>s.id===sid);
        return def.prereqs.every(p=>this.data.skills[p].attempts.length>=MIN_ATT && this.computeMastery(p)>=UNLOCK_THR);
    },
    getOverallMastery() {
        let sum=0;
        for(const sid of SKILL_IDS) sum+=this.computeMastery(sid);
        return sum/SKILL_IDS.length;
    },
    getMasteryClass(m) {
        if(m>=MASTERED_THR) return 'mastered';
        if(m>=UNLOCK_THR) return 'proficient';
        if(m>=0.4) return 'developing';
        return 'weak';
    },

    // ── Adaptive Selection ───────────────────────────────────────
    selectSkill() {
        const unlocked = SKILL_IDS.filter(s=>this.isUnlocked(s));
        const weights = unlocked.map(sid => {
            const m=this.computeMastery(sid);
            const a=this.data.skills[sid].attempts;
            let w=Math.pow(1-m,2);
            if(!a.length) w+=0.5;
            else if(a.length<5) w+=0.2;
            if(a.length && Date.now()-a[0].ts > 300000) w+=0.15;
            return Math.max(w,0.05);
        });
        const tot=weights.reduce((a,b)=>a+b,0);
        let r=Math.random()*tot;
        for(let i=0;i<unlocked.length;i++) { r-=weights[i]; if(r<=0) return unlocked[i]; }
        return unlocked[unlocked.length-1];
    },

    // ── Question Generators ──────────────────────────────────────

    // — S01: Definition & Converting Forms —
    qExpToLog() {
        const b=pick(BASES), n=randInt(1,5), v=Math.pow(b,n);
        if(v>100000) return LA.qExpToLog();
        const correct=`\\(${logTex(b,v)} = ${n}\\)`;
        const d1=`\\(${logTex(v,b)} = ${n}\\)`;
        const d2=`\\(${logTex(n,v)} = ${b}\\)`;
        const d3=`\\(${logTex(b,n)} = ${v}\\)`;
        return { type:'mc', skill:'S01', rule:'Definition', text:'Convert to logarithmic form:',
            latex:`${b}^{${n}} = ${v}`, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['The base of the exponent becomes the base of the log.',
                `\\(b^n = v\\) becomes \\(\\log_b(v) = n\\).`],
            explain:`\\(${b}^{${n}} = ${v}\\) is equivalent to \\(${logTex(b,v)} = ${n}\\).` };
    },
    qLogToExp() {
        const b=pick(BASES), n=randInt(1,5), v=Math.pow(b,n);
        if(v>100000) return LA.qLogToExp();
        const correct=`\\(${b}^{${n}} = ${v}\\)`;
        const d1=`\\(${n}^{${b}} = ${v}\\)`;
        const d2=`\\(${v}^{${b}} = ${n}\\)`;
        const d3=`\\(${b}^{${v}} = ${n}\\)`;
        return { type:'mc', skill:'S01', rule:'Definition', text:'Convert to exponential form:',
            latex:`${logTex(b,v)} = ${n}`, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['The base of the log becomes the base of the exponent.',
                `\\(\\log_b(v) = n\\) becomes \\(b^n = v\\).`],
            explain:`\\(${logTex(b,v)} = ${n}\\) means \\(${b}^{${n}} = ${v}\\).` };
    },
    qExpToLogFrac() {
        const b=pick([4,8,9,16,25,27]);
        const roots={4:[2,2],8:[2,3],9:[3,2],16:[2,4],25:[5,2],27:[3,3]};
        const [r,p]=roots[b]; // b = r^p
        const n=randInt(1,3), v=Math.pow(r,n);
        // b^(n/p) = v, so log_b(v) = n/p
        const g=gcd(n,p), sn=n/g, sp=p/g, ans=n/p;
        return { type:'free', skill:'S01', rule:'Definition', text:'Evaluate:',
            latex:logTex(b,v), answer:ans,
            answerTex: Number.isInteger(ans)?String(ans):`\\dfrac{${sn}}{${sp}}`,
            hintTex:[`Think: \\(${b}\\) to what power gives \\(${v}\\)?`,
                `Note that \\(${b} = ${r}^{${p}}\\) and \\(${v} = ${r}^{${n}}\\).`,
                `So \\(${b}^{${sn===1&&sp!==1?'':sn}${sp!==1?'/'+sp:''}} = ${v}\\).`],
            explain:`\\(${b} = ${r}^{${p}}\\), \\(${v} = ${r}^{${n}}\\), so \\(${logTex(b,v)} = \\dfrac{${n}}{${p}}`+(g>1?` = \\dfrac{${sn}}{${sp}}`:'')+'\\).' };
    },

    // — S02: Evaluating Logarithms —
    qEvalInteger() {
        const b=pick(BASES), n=randInt(1,5), v=Math.pow(b,n);
        if(v>100000) return LA.qEvalInteger();
        return { type:'free', skill:'S02', rule:'Evaluate', text:'Evaluate:',
            latex:logTex(b,v), answer:n, answerTex:String(n),
            hintTex:[`Use the definition: \\(${logTex(b,'x')} = n\\) means \\(${b}^n = x\\).`,
                `Think: \\(${b}\\) to the power of what gives \\(${v}\\)?`],
            explain:`Since \\(${b}^{${n}}=${v}\\), we get \\(${logTex(b,v)}=${n}\\).` };
    },
    qEvalNegative() {
        const b=pick(BASES), n=randInt(1,3), v=Math.pow(b,n);
        // log_b(1/v) = -n
        return { type:'free', skill:'S02', rule:'Evaluate', text:'Evaluate:',
            latex:logTex(b,'\\tfrac{1}{'+v+'}'), answer:-n, answerTex:String(-n),
            hintTex:[`Rewrite \\(\\frac{1}{${v}}\\) as a power of \\(${b}\\).`,
                `\\(\\frac{1}{${v}} = \\frac{1}{${b}^{${n}}} = ${b}^{-${n}}\\).`],
            explain:`\\(\\frac{1}{${v}} = ${b}^{-${n}}\\), so \\(${logTex(b,'\\frac{1}{'+v+'}')} = -${n}\\).` };
    },

    // — S03: Special Values —
    qSpecialZero() {
        const b=pick(BASES);
        return { type:'free', skill:'S03', rule:'Identity', text:'Evaluate:',
            latex:logTex(b,1), answer:0, answerTex:'0',
            hintTex:['Any number raised to what power gives 1?','Remember: \\(a^0 = 1\\) for any base \\(a\\).'],
            explain:`\\(${logTex(b,1)}=0\\) because \\(${b}^{0}=1\\).` };
    },
    qSpecialOne() {
        const b=pick(BASES);
        return { type:'free', skill:'S03', rule:'Identity', text:'Evaluate:',
            latex:logTex(b,b), answer:1, answerTex:'1',
            hintTex:[`What power of \\(${b}\\) gives \\(${b}\\)?`,`Remember: \\(a^1 = a\\).`],
            explain:`\\(${logTex(b,b)}=1\\) because \\(${b}^{1}=${b}\\).` };
    },
    qSpecialPower() {
        const b=pick(BASES), n=randInt(2,6), v=Math.pow(b,n);
        if(v>100000) return LA.qSpecialPower();
        return { type:'free', skill:'S03', rule:'Identity', text:'Evaluate:',
            latex:logTex(b,b+'^{'+n+'}'), answer:n, answerTex:String(n),
            hintTex:[`Recall that \\(\\log_a(a^n) = n\\).`,`The base and the argument share the same base \\(${b}\\).`],
            explain:`\\(${logTex(b,b+'^{'+n+'}')} = ${n}\\) by the identity \\(\\log_a(a^n)=n\\).` };
    },

    // — S04: Common & Natural Logs —
    qCommonLog() {
        const n=randInt(1,5), v=Math.pow(10,n);
        return { type:'free', skill:'S04', rule:'Common Log', text:'Evaluate:',
            latex:`\\log(${v})`, answer:n, answerTex:String(n),
            hintTex:[`\\(\\log\\) without a base means base 10.`,`\\(10^{${n}} = ${v}\\).`],
            explain:`\\(\\log(${v}) = ${n}\\) since \\(10^{${n}} = ${v}\\).` };
    },
    qNaturalLog() {
        const n=randInt(1,4);
        return { type:'free', skill:'S04', rule:'Natural Log', text:'Evaluate:',
            latex:`\\ln(e^{${n}})`, answer:n, answerTex:String(n),
            hintTex:[`\\(\\ln\\) means \\(\\log_e\\), i.e. log base \\(e\\).`,`\\(\\ln(e^n) = n\\) for any \\(n\\).`],
            explain:`\\(\\ln(e^{${n}}) = ${n}\\) by the identity \\(\\ln(e^n) = n\\).` };
    },
    qNaturalIdentity() {
        const opts = [
            { expr:'\\ln(1) = 0', ok:true },
            { expr:'\\ln(e) = 1', ok:true },
            { expr:'e^{\\ln(x)} = x', ok:true },
            { expr:'\\ln(0) = 1', ok:false },
            { expr:'\\ln(e) = e', ok:false },
            { expr:'\\ln(10) = 1', ok:false },
            { expr:'e^{\\ln(x)} = e', ok:false },
        ];
        const corrects = opts.filter(o=>o.ok);
        const incorrects = opts.filter(o=>!o.ok);
        const chosen = pick(corrects);
        const wrong = shuffle(incorrects).slice(0,3);
        const correct = `\\(${chosen.expr}\\)`;
        return { type:'mc', skill:'S04', rule:'Natural Log', text:'Which identity is correct?',
            latex:'', answer:correct,
            options:shuffle([correct, ...wrong.map(w=>`\\(${w.expr}\\)`)]),
            hintTex:['\\(\\ln\\) means \\(\\log_e\\). Think about what \\(e^0\\), \\(e^1\\) equal.',
                '\\(\\ln(1)=0\\) because \\(e^0=1\\). \\(\\ln(e)=1\\) because \\(e^1=e\\). \\(e^{\\ln x}=x\\) and \\(\\ln(e^x)=x\\).'],
            explain:`The correct identities are: \\(\\ln(1)=0\\), \\(\\ln(e)=1\\), \\(e^{\\ln x}=x\\), and \\(\\ln(e^x)=x\\).` };
    },

    // — S05: Product Rule —
    qProductForward() {
        const b=pick(BASES), m=randInt(2,9), n=randInt(2,9), mn=m*n;
        const c=`\\(${logTex(b,mn)}\\)`;
        return { type:'mc', skill:'S05', rule:'Product Rule', text:'Simplify:',
            latex:`${logTex(b,m)} + ${logTex(b,n)}`, answer:c,
            hintTex:['Adding logs means multiplying the arguments.',`Product Rule: \\(\\log(a)+\\log(b)=\\log(a \\cdot b)\\).`,`\\(${m} \\times ${n} = ${mn}\\).`],
            options:shuffle([c,`\\(${logTex(b,m+n)}\\)`,`\\(${logTex(b,m)}\\cdot ${logTex(b,n)}\\)`,`\\(${logTex(b*b,mn)}\\)`]),
            explain:`Product Rule: \\(${logTex(b,m)}+${logTex(b,n)} = ${logTex(b,m+'\\cdot '+n)} = ${logTex(b,mn)}\\).` };
    },
    qProductBackward() {
        const b=pick(BASES), m=randInt(2,9), n=randInt(2,9), mn=m*n;
        const c=`\\(${logTex(b,m)} + ${logTex(b,n)}\\)`;
        return { type:'mc', skill:'S05', rule:'Product Rule', text:'Express as a sum of two logs:',
            latex:logTex(b,mn), hint:`(${mn} = ${m} \\times ${n})`, answer:c,
            hintTex:['Use the Product Rule in reverse: \\(\\log(mn) = \\log(m)+\\log(n)\\).',`Factor \\(${mn}\\) into \\(${m} \\times ${n}\\).`],
            options:shuffle([c,`\\(${logTex(b,m)}\\cdot ${logTex(b,n)}\\)`,`\\(${logTex(b,m)} - ${logTex(b,n)}\\)`,`\\(${logTex(b+b,mn)}\\)`]),
            explain:`Product Rule: \\(${logTex(b,mn)} = ${logTex(b,m)}+${logTex(b,n)}\\) since \\(${m}\\times${n}=${mn}\\).` };
    },

    // — S06: Quotient Rule —
    qQuotientForward() {
        const b=pick(BASES), n=randInt(2,6), k=randInt(2,5), m=n*k;
        const c=`\\(${logTex(b,k)}\\)`;
        return { type:'mc', skill:'S06', rule:'Quotient Rule', text:'Simplify:',
            latex:`${logTex(b,m)} - ${logTex(b,n)}`, answer:c,
            hintTex:['Subtracting logs means dividing the arguments.',`Quotient Rule: \\(\\log(a)-\\log(b)=\\log(a/b)\\).`,`\\(${m} \\div ${n} = ${k}\\).`],
            options:shuffle([c,`\\(${logTex(b,m-n)}\\)`,`\\(\\dfrac{${logTex(b,m)}}{${logTex(b,n)}}\\)`,`\\(${logTex(b,n)}\\)`]),
            explain:`Quotient Rule: \\(${logTex(b,m)}-${logTex(b,n)} = ${logTex(b,'\\tfrac{'+m+'}{'+n+'}')} = ${logTex(b,k)}\\).` };
    },
    qQuotientBackward() {
        const b=pick(BASES), n=randInt(2,6), k=randInt(2,5), m=n*k;
        const c=`\\(${logTex(b,m)} - ${logTex(b,n)}\\)`;
        return { type:'mc', skill:'S06', rule:'Quotient Rule', text:'Express as a difference of two logs:',
            latex:logTex(b,k), hint:`(${k} = ${m} \\div ${n})`, answer:c,
            hintTex:['Use the Quotient Rule in reverse: \\(\\log(a/b) = \\log(a)-\\log(b)\\).',`Write \\(${k}\\) as a fraction: \\(${m}/${n}\\).`],
            options:shuffle([c,`\\(${logTex(b,m)} + ${logTex(b,n)}\\)`,`\\(\\dfrac{${logTex(b,m)}}{${logTex(b,n)}}\\)`,`\\(${logTex(b,m+n)}\\)`]),
            explain:`Quotient Rule: \\(${logTex(b,k)} = ${logTex(b,'\\tfrac{'+m+'}{'+n+'}')} = ${logTex(b,m)}-${logTex(b,n)}\\).` };
    },

    // — S07: Power Rule —
    qPowerForward() {
        const b=pick(BASES), m=randInt(2,7), k=randInt(2,4), mk=Math.pow(m,k);
        const c=`\\(${logTex(b,mk)}\\)`;
        return { type:'mc', skill:'S07', rule:'Power Rule', text:'Simplify:',
            latex:`${k}\\cdot ${logTex(b,m)}`, answer:c,
            hintTex:['A coefficient in front of a log becomes an exponent inside.',`Power Rule: \\(k\\cdot\\log(m)=\\log(m^k)\\).`,`\\(${m}^{${k}} = ${mk}\\).`],
            options:shuffle([c,`\\(${logTex(b,k*m)}\\)`,`\\(${logTex(Math.pow(b,k),m)}\\)`,`\\(${k}+${logTex(b,m)}\\)`]),
            explain:`Power Rule: \\(${k}\\cdot ${logTex(b,m)} = ${logTex(b,m+'^{'+k+'}')} = ${logTex(b,mk)}\\).` };
    },
    qPowerBackward() {
        const b=pick(BASES), m=randInt(2,7), k=randInt(2,4);
        const c=`\\(${k}\\cdot ${logTex(b,m)}\\)`;
        return { type:'mc', skill:'S07', rule:'Power Rule', text:'Rewrite using the Power Rule:',
            latex:logTex(b,m+'^{'+k+'}'), answer:c,
            hintTex:['The Power Rule lets you move the exponent down.',`\\(\\log(m^k) = k\\cdot\\log(m)\\). Bring the \\(${k}\\) down.`],
            options:shuffle([c,`\\(${logTex(b,m)}^{${k}}\\)`,`\\(${logTex(Math.pow(b,k),m)}\\)`,`\\(${logTex(b,k+'\\cdot'+m)}\\)`]),
            explain:`Power Rule: \\(${logTex(b,m+'^{'+k+'}')} = ${k}\\cdot ${logTex(b,m)}\\).` };
    },

    // — S08: Change of Base —
    qChangeOfBase() {
        const c=pick([2,3,5]), n=randInt(2,4), v=Math.pow(c,n);
        let a; do{a=pick(BASES);}while(a===c);
        return { type:'free', skill:'S08', rule:'Change of Base', text:'Evaluate:',
            latex:`\\dfrac{${logTex(a,v)}}{${logTex(a,c)}}`, answer:n, answerTex:String(n),
            hintTex:[`When you divide two logs with the same base, you can change the base.`,
                `\\(\\frac{\\log_a(b)}{\\log_a(c)} = \\log_c(b)\\).`,`So this equals \\(${logTex(c,v)}\\). Now evaluate.`],
            explain:`Change of Base: \\(\\dfrac{${logTex(a,v)}}{${logTex(a,c)}} = ${logTex(c,v)} = ${n}\\).` };
    },
    qChangeOfBaseFrac() {
        const c=pick([2,3,5]); let p=randInt(2,4), q=randInt(2,4);
        if(p===q) return LA.qChangeOfBaseFrac();
        const vp=Math.pow(c,p), vq=Math.pow(c,q);
        let a; do{a=pick(BASES);}while(a===c);
        const g=gcd(p,q), sp=p/g, sq=q/g, ans=p/q;
        return { type:'free', skill:'S08', rule:'Change of Base', text:'Evaluate:',
            latex:`\\dfrac{${logTex(a,vp)}}{${logTex(a,vq)}}`, answer:ans,
            answerTex: Number.isInteger(ans)?String(ans):`\\dfrac{${sp}}{${sq}}`,
            hintTex:['Use change of base to simplify the fraction.',
                `This equals \\(\\frac{${logTex(c,vp)}}{${logTex(c,vq)}}\\).`,
                `Evaluate each: \\(${logTex(c,vp)}=${p}\\) and \\(${logTex(c,vq)}=${q}\\). Now divide.`],
            explain:`\\(\\dfrac{${logTex(a,vp)}}{${logTex(a,vq)}} = \\dfrac{${p}}{${q}}`+(g>1?` = \\dfrac{${sp}}{${sq}}`:'')+'\\).' };
    },

    // — S09: Expanding Expressions —
    qExpandTwo() {
        const b=pick(BASES), x=pick(['x','m','a','p']), y=pick(['y','n','b','q'].filter(v=>v!==x));
        const op=pick(['product','quotient']);
        let expr, correct, d1, d2, d3;
        if(op==='product') {
            expr=logTex(b,x+y);
            correct=`\\(${logTex(b,x)} + ${logTex(b,y)}\\)`;
            d1=`\\(${logTex(b,x)} \\cdot ${logTex(b,y)}\\)`;
            d2=`\\(${logTex(b,x)} - ${logTex(b,y)}\\)`;
            d3=`\\(${logTex(b,x+'+'+y)}\\)`;
        } else {
            expr=logTex(b,'\\tfrac{'+x+'}{'+y+'}');
            correct=`\\(${logTex(b,x)} - ${logTex(b,y)}\\)`;
            d1=`\\(\\dfrac{${logTex(b,x)}}{${logTex(b,y)}}\\)`;
            d2=`\\(${logTex(b,x)} + ${logTex(b,y)}\\)`;
            d3=`\\(${logTex(b,x+'-'+y)}\\)`;
        }
        return { type:'mc', skill:'S09', rule:'Expanding', text:'Expand:',
            latex:expr, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:[op==='product'?'Product Rule: \\(\\log(ab) = \\log a + \\log b\\).':'Quotient Rule: \\(\\log(a/b) = \\log a - \\log b\\).'],
            explain:op==='product'
                ?`\\(${expr} = ${logTex(b,x)}+${logTex(b,y)}\\) by the Product Rule.`
                :`\\(${expr} = ${logTex(b,x)}-${logTex(b,y)}\\) by the Quotient Rule.` };
    },
    qExpandThree() {
        const b=pick(BASES), x='x', y='y', k=randInt(2,4);
        // log_b(x^k * y) → k log_b(x) + log_b(y)
        const expr=logTex(b, x+'^{'+k+'} \\cdot '+y);
        const correct=`\\(${k}${logTex(b,x)} + ${logTex(b,y)}\\)`;
        const d1=`\\(${logTex(b,k+x)} + ${logTex(b,y)}\\)`;
        const d2=`\\(${logTex(b,x)}^{${k}} + ${logTex(b,y)}\\)`;
        const d3=`\\(${k} + ${logTex(b,x)} + ${logTex(b,y)}\\)`;
        return { type:'mc', skill:'S09', rule:'Expanding', text:'Expand fully:',
            latex:expr, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['First use the Product Rule to split, then use the Power Rule on the exponent.',
                `\\(${expr} = ${logTex(b,x+'^{'+k+'}')} + ${logTex(b,y)} = ${k}${logTex(b,x)} + ${logTex(b,y)}\\).`],
            explain:`Product then Power: \\(${expr} = ${k}${logTex(b,x)} + ${logTex(b,y)}\\).` };
    },
    qExpandComplex() {
        const b=pick(BASES), a=randInt(2,3), c=randInt(2,3);
        // log_b(x^a * y / z^c)
        const expr=logTex(b,'\\dfrac{x^{'+a+'} \\cdot y}{z^{'+c+'}}');
        const correct=`\\(${a}${logTex(b,'x')} + ${logTex(b,'y')} - ${c}${logTex(b,'z')}\\)`;
        const d1=`\\(${a}${logTex(b,'x')} \\cdot ${logTex(b,'y')} - ${c}${logTex(b,'z')}\\)`;
        const d2=`\\(${logTex(b,'x')}^{${a}} + ${logTex(b,'y')} - ${logTex(b,'z')}^{${c}}\\)`;
        const d3=`\\(${a}${logTex(b,'x')} + ${logTex(b,'y')} + ${c}${logTex(b,'z')}\\)`;
        return { type:'mc', skill:'S09', rule:'Expanding', text:'Expand fully:',
            latex:expr, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['Use Product, Quotient, and Power Rules together.',
                `Numerator: \\(${logTex(b,'x^{'+a+'}')} + ${logTex(b,'y')} = ${a}${logTex(b,'x')} + ${logTex(b,'y')}\\). Denominator subtracts: \\(- ${c}${logTex(b,'z')}\\).`],
            explain:`\\(${expr} = ${a}${logTex(b,'x')} + ${logTex(b,'y')} - ${c}${logTex(b,'z')}\\).` };
    },

    // — S10: Condensing Expressions —
    qCondenseTwo() {
        const b=pick(BASES), x=pick(['x','m','a','p']), y=pick(['y','n','b','q'].filter(v=>v!==x));
        const op=pick(['sum','diff']);
        let expr, correct, d1, d2, d3;
        if(op==='sum') {
            expr=`${logTex(b,x)} + ${logTex(b,y)}`;
            correct=`\\(${logTex(b,x+y)}\\)`;
            d1=`\\(${logTex(b,x+'+'+y)}\\)`;
            d2=`\\(${logTex(b,x)} \\cdot ${logTex(b,y)}\\)`;
            d3=`\\(${logTex(b,'\\tfrac{'+x+'}{'+y+'}')}\\)`;
        } else {
            expr=`${logTex(b,x)} - ${logTex(b,y)}`;
            correct=`\\(${logTex(b,'\\tfrac{'+x+'}{'+y+'}')}\\)`;
            d1=`\\(${logTex(b,x+'-'+y)}\\)`;
            d2=`\\(\\dfrac{${logTex(b,x)}}{${logTex(b,y)}}\\)`;
            d3=`\\(${logTex(b,x+y)}\\)`;
        }
        return { type:'mc', skill:'S10', rule:'Condensing', text:'Write as a single logarithm:',
            latex:expr, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:[op==='sum'?'Product Rule: \\(\\log a + \\log b = \\log(ab)\\).':'Quotient Rule: \\(\\log a - \\log b = \\log(a/b)\\).'],
            explain:op==='sum'
                ?`\\(${expr} = ${logTex(b,x+'\\cdot '+y)}\\) by the Product Rule.`
                :`\\(${expr} = ${logTex(b,'\\tfrac{'+x+'}{'+y+'}')}\\) by the Quotient Rule.` };
    },
    qCondenseThree() {
        const b=pick(BASES), k=randInt(2,4);
        // k*log_b(x) + log_b(y) → log_b(x^k * y)
        const expr=`${k}${logTex(b,'x')} + ${logTex(b,'y')}`;
        const correct=`\\(${logTex(b,'x^{'+k+'} \\cdot y')}\\)`;
        const d1=`\\(${logTex(b, k+'x \\cdot y')}\\)`;
        const d2=`\\(${logTex(b,'(xy)^{'+k+'}')}\\)`;
        const d3=`\\(${logTex(b,'x^{'+k+'}')} + ${logTex(b,'y')}\\)`;
        return { type:'mc', skill:'S10', rule:'Condensing', text:'Write as a single logarithm:',
            latex:expr, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['First use the Power Rule on the coefficient, then the Product Rule.',
                `\\(${k}${logTex(b,'x')} = ${logTex(b,'x^{'+k+'}')}\\), then add: \\(${logTex(b,'x^{'+k+'}')} + ${logTex(b,'y')} = ${logTex(b,'x^{'+k+'} \\cdot y')}\\).`],
            explain:`Power then Product: \\(${expr} = ${logTex(b,'x^{'+k+'} \\cdot y')}\\).` };
    },
    qCondenseComplex() {
        const b=pick(BASES), a=randInt(2,3), c=randInt(2,3);
        // a*log(x) + log(y) - c*log(z) → log(x^a * y / z^c)
        const expr=`${a}${logTex(b,'x')} + ${logTex(b,'y')} - ${c}${logTex(b,'z')}`;
        const correct=`\\(${logTex(b,'\\dfrac{x^{'+a+'} \\cdot y}{z^{'+c+'}}')}\\)`;
        const d1=`\\(${logTex(b,'\\dfrac{x^{'+a+'} \\cdot y}{z}^{'+c+'}')}\\)`;
        const d2=`\\(${logTex(b,'(x^{'+a+'} + y - z^{'+c+'})')}\\)`;
        const d3=`\\(${logTex(b,'\\dfrac{x^{'+a+'}}{y \\cdot z^{'+c+'}}')}\\)`;
        return { type:'mc', skill:'S10', rule:'Condensing', text:'Write as a single logarithm:',
            latex:expr, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['Apply Power Rule to coefficients, then combine with Product and Quotient Rules.',
                `\\(${a}${logTex(b,'x')} = ${logTex(b,'x^{'+a+'}')}\\), \\(${c}${logTex(b,'z')} = ${logTex(b,'z^{'+c+'}')}\\). Combine: add for product, subtract for quotient.`],
            explain:`\\(${expr} = ${logTex(b,'\\dfrac{x^{'+a+'} \\cdot y}{z^{'+c+'}}')}\\).` };
    },

    // — S11: Combining Multiple Rules —
    qMultiStep2() {
        const b=pick(BASES);
        const n1=randInt(1,4), n2=randInt(1,4);
        const v1=Math.pow(b,n1), v2=Math.pow(b,n2);
        const ans=n1+n2;
        return { type:'free', skill:'S11', rule:'Combined Rules', text:'Evaluate:',
            latex:`${logTex(b,v1)} + ${logTex(b,v2)}`, answer:ans, answerTex:String(ans),
            hintTex:[`Evaluate each log separately, then add.`,
                `\\(${logTex(b,v1)}=${n1}\\) and \\(${logTex(b,v2)}=${n2}\\).`],
            explain:`\\(${logTex(b,v1)}+${logTex(b,v2)} = ${n1}+${n2} = ${ans}\\).` };
    },
    qMultiStep3() {
        const b=pick(BASES);
        const k=randInt(2,3), n1=randInt(1,3), n2=randInt(1,3);
        const v1=Math.pow(b,n1), v2=Math.pow(b,n2);
        // k*log_b(v1) - log_b(v2) = k*n1 - n2
        const ans=k*n1-n2;
        return { type:'free', skill:'S11', rule:'Combined Rules', text:'Evaluate:',
            latex:`${k}\\cdot ${logTex(b,v1)} - ${logTex(b,v2)}`, answer:ans, answerTex:String(ans),
            hintTex:[`Evaluate each log first, then apply the coefficient and subtract.`,
                `\\(${logTex(b,v1)}=${n1}\\) so \\(${k}\\cdot ${n1} = ${k*n1}\\). Then \\(${logTex(b,v2)}=${n2}\\).`,
                `\\(${k*n1} - ${n2} = ${ans}\\).`],
            explain:`\\(${k}\\cdot ${logTex(b,v1)} - ${logTex(b,v2)} = ${k}\\cdot ${n1} - ${n2} = ${ans}\\).` };
    },

    // — S12: Solving Log Equations —
    qSolveLogSimple() {
        const b=pick(BASES), n=randInt(1,4), x=Math.pow(b,n);
        if(x>100000) return LA.qSolveLogSimple();
        return { type:'free', skill:'S12', rule:'Log Equations', text:'Solve for \\(x\\):',
            latex:`${logTex(b,'x')} = ${n}`, answer:x, answerTex:String(x),
            hintTex:['Convert to exponential form using the definition.',
                `If \\(${logTex(b,'x')} = ${n}\\), then \\(x = ${b}^{${n}}\\).`],
            explain:`\\(${logTex(b,'x')} = ${n}\\) means \\(x = ${b}^{${n}} = ${x}\\).` };
    },
    qSolveLogLinear() {
        const b=pick(BASES), n=randInt(1,3), v=Math.pow(b,n);
        const a=pick([2,3]), c=pick([1,-1,3,-3]);
        const x=(v-c)/a;
        if(!Number.isInteger(x)||x<=0) return LA.qSolveLogLinear();
        const cStr=c>=0?'+'+c:String(c);
        return { type:'free', skill:'S12', rule:'Log Equations', text:'Solve for \\(x\\):',
            latex:`${logTex(b,a+'x'+cStr)} = ${n}`, answer:x, answerTex:String(x),
            hintTex:['Convert to exponential form first.',
                `\\(${a}x${cStr} = ${b}^{${n}} = ${v}\\).`,
                `Solve: \\(${a}x = ${v-c}\\), so \\(x = ${x}\\).`],
            explain:`\\(${logTex(b,a+'x'+cStr)} = ${n}\\) means \\(${a}x${cStr} = ${v}\\), so \\(x = ${x}\\).` };
    },
    qSolveLogQuadratic() {
        const b=pick([2,3,5]), n=randInt(2,4), v=Math.pow(b,n);
        // log_b(x^2) = n → x^2 = b^n = v → x = ±sqrt(v)
        const sv=Math.sqrt(v);
        if(!Number.isInteger(sv)) return LA.qSolveLogQuadratic();
        const correct=`\\(x = ${sv}\\)`;
        const d1=`\\(x = \\pm ${sv}\\)`;
        const d2=`\\(x = ${v}\\)`;
        const d3=`\\(x = ${sv/2}\\)`;
        return { type:'mc', skill:'S12', rule:'Log Equations', text:'Solve for \\(x\\) (\\(x > 0\\)):',
            latex:`${logTex(b,'x^2')} = ${n}`, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['Convert to exponential form: \\(x^2 = b^n\\).',
                `\\(x^2 = ${v}\\), so \\(x = \\pm${sv}\\). But the domain of \\(\\log\\) requires \\(x > 0\\).`],
            explain:`\\(x^2 = ${b}^{${n}} = ${v}\\), so \\(x = \\pm${sv}\\). Since \\(x > 0\\), \\(x = ${sv}\\).` };
    },

    // — S13: Solving Exponential Equations —
    qSolveExpExact() {
        const b=pick(BASES), n=randInt(1,5), v=Math.pow(b,n);
        if(v>100000) return LA.qSolveExpExact();
        return { type:'free', skill:'S13', rule:'Exponential Equations', text:'Solve for \\(x\\):',
            latex:`${b}^x = ${v}`, answer:n, answerTex:String(n),
            hintTex:['Take the logarithm of both sides, or recognise the power.',
                `\\(${v}\\) is a power of \\(${b}\\): \\(${b}^{${n}} = ${v}\\).`],
            explain:`\\(${b}^x = ${v}\\). Since \\(${b}^{${n}} = ${v}\\), we get \\(x = ${n}\\).` };
    },
    qSolveExpDecimal() {
        const b=pick([2,3,5,7]), v=pick([10,15,20,50,100].filter(n=>!Number.isInteger(Math.log(n)/Math.log(b))));
        const correct=`\\(x = \\dfrac{\\ln(${v})}{\\ln(${b})}\\)`;
        const d1=`\\(x = \\dfrac{\\ln(${b})}{\\ln(${v})}\\)`;
        const d2=`\\(x = \\ln\\!\\left(\\dfrac{${v}}{${b}}\\right)\\)`;
        const d3=`\\(x = ${b} \\cdot \\ln(${v})\\)`;
        return { type:'mc', skill:'S13', rule:'Exponential Equations',
            text:'Which expression gives the exact value of \\(x\\)?',
            latex:`${b}^x = ${v}`, answer:correct, options:shuffle([correct,d1,d2,d3]),
            hintTex:['Take the natural log of both sides.',
                `\\(\\ln(${b}^x) = \\ln(${v})\\), so \\(x\\cdot\\ln(${b}) = \\ln(${v})\\).`],
            explain:`Taking \\(\\ln\\) of both sides: \\(x\\ln(${b}) = \\ln(${v})\\), so \\(x = \\dfrac{\\ln(${v})}{\\ln(${b})}\\).` };
    },

    // ── Generator Pools ──────────────────────────────────────────
    generators: null,
    init() {
        this.loadData();
        this.generators = {
            S01: [this.qExpToLog, this.qLogToExp, this.qExpToLogFrac],
            S02: [this.qEvalInteger, this.qEvalNegative],
            S03: [this.qSpecialZero, this.qSpecialOne, this.qSpecialPower],
            S04: [this.qCommonLog, this.qNaturalLog, this.qNaturalIdentity],
            S05: [this.qProductForward, this.qProductBackward],
            S06: [this.qQuotientForward, this.qQuotientBackward],
            S07: [this.qPowerForward, this.qPowerBackward],
            S08: [this.qChangeOfBase, this.qChangeOfBaseFrac],
            S09: [this.qExpandTwo, this.qExpandThree, this.qExpandComplex],
            S10: [this.qCondenseTwo, this.qCondenseThree, this.qCondenseComplex],
            S11: [this.qMultiStep2, this.qMultiStep3],
            S12: [this.qSolveLogSimple, this.qSolveLogLinear, this.qSolveLogQuadratic],
            S13: [this.qSolveExpExact, this.qSolveExpDecimal],
        };
    },

    next() {
        const sid = this.focusSkill || this.selectSkill();
        const q = pick(this.generators[sid])();
        q.skill = q.skill || sid;
        return q;
    },

    // ── Dashboard ────────────────────────────────────────────────
    renderDashboard() {
        const grid = document.getElementById('la-skills-grid');
        let html = '';
        let currentTier = 0;
        for (const def of SKILL_DEFS) {
            if (def.tier !== currentTier) {
                currentTier = def.tier;
                html += `<div class="la-tier-header">Tier ${currentTier}: ${TIER_NAMES[currentTier]}</div>`;
            }
            const mastery = this.computeMastery(def.id);
            const unlocked = this.isUnlocked(def.id);
            const atts = this.data.skills[def.id].attempts;
            const pct = Math.round(mastery * 100);
            const cls = this.getMasteryClass(mastery);

            if (!unlocked) {
                const missing = def.prereqs.filter(p => this.data.skills[p].attempts.length < MIN_ATT || this.computeMastery(p) < UNLOCK_THR);
                const details = missing.map(p => {
                    const name = SKILL_DEFS.find(s => s.id === p).name;
                    const att = this.data.skills[p].attempts.length;
                    const m = Math.round(this.computeMastery(p) * 100);
                    return `${name} (${att}/${MIN_ATT} attempts, ${m}%)`;
                });
                html += `<div class="la-skill-tile locked">
                    <div class="la-skill-name"><span style="font-size:0.85rem">&#128274;</span> ${def.name}</div>
                    <div class="la-skill-stats"><span>Unlocks after ${MIN_ATT}+ attempts and 60% mastery on ${details.join('; ')}</span></div></div>`;
            } else {
                html += `<div class="la-skill-tile" data-skill="${def.id}">
                    <div class="la-skill-name">${def.name} <span style="margin-left:auto;font-weight:700;">${pct}%</span></div>
                    <div class="la-skill-bar"><div class="la-skill-fill ${cls}" style="width:${pct}%"></div></div>
                    <div class="la-skill-stats"><span>${atts.length} attempt${atts.length!==1?'s':''}</span>
                        <span>${pct>=80?'Mastered':''}</span></div></div>`;
            }
        }
        grid.innerHTML = html;

        grid.querySelectorAll('.la-skill-tile:not(.locked)').forEach(tile => {
            tile.addEventListener('click', () => LA.startPractice(tile.dataset.skill));
        });

        const overall = this.getOverallMastery();
        const oPct = Math.round(overall * 100);
        document.getElementById('la-overall-pct').textContent = oPct + '%';
        const fill = document.getElementById('la-overall-fill');
        fill.style.width = oPct + '%';
        fill.className = 'la-overall-fill ' + this.getMasteryClass(overall);
    },

    // ── Practice Mode ────────────────────────────────────────────
    startPractice(skillId) {
        this.focusSkill = skillId || null;
        this.resetScore();
        if (skillId) {
            const def = SKILL_DEFS.find(s => s.id === skillId);
            document.getElementById('la-practice-title').textContent = def.name;
            document.getElementById('la-practice-subtitle').textContent = 'Focused practice';
        } else {
            document.getElementById('la-practice-title').textContent = 'Adaptive Practice';
            document.getElementById('la-practice-subtitle').textContent = 'Practising your weakest skills';
        }
        showView('log-mastery-practice');
        this.load();
    },

    resetScore() {
        this.score = 0; this.total = 0; this.streak = 0;
        document.getElementById('la-score').textContent = '0 / 0';
        document.getElementById('la-pct').textContent = '\u2014';
        document.getElementById('la-streak').textContent = '0';
    },

    load() {
        this.answered = false;
        this.currentQ = this.next();
        const q = this.currentQ;
        const skillDef = SKILL_DEFS.find(s => s.id === q.skill);
        let h = `<div class="rule-tag">${q.rule}</div>`;
        if (skillDef) h += `<div style="font-size:0.78rem;color:var(--text-light);margin-bottom:8px;">${skillDef.name}</div>`;
        h += `<div class="question-text">${q.text}</div>`;
        if (q.latex) h += `<div class="question-prompt">\\(${q.latex}\\)</div>`;
        if (q.hint) h += `<div class="question-hint">\\(${q.hint}\\)</div>`;

        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o, i) => { h += `<button class="option-btn" data-i="${i}">${o}</button>`; });
            h += '</div>';
        } else {
            h += `<div class="input-area">
                    <math-field class="lr-math-field" id="la-mf" placeholder="Type your answer"></math-field>
                    <button class="btn btn-primary" id="la-check">Check</button>
                  </div>`;
        }

        document.getElementById('la-card').innerHTML = h;
        const fb = document.getElementById('la-fb');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('la-next').classList.remove('show');
        this.hintIdx = 0;
        resetHint('la-hint', 'la-hint-btn');
        document.getElementById('la-workout').innerHTML = '';
        renderMath();

        if (q.type === 'mc') {
            document.getElementById('la-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => LA.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(() => {
                const mf = document.getElementById('la-mf');
                if (mf) { mf.focus(); mf.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); LA.handleFree(); } }); }
                const cb = document.getElementById('la-check');
                if (cb) cb.addEventListener('click', () => LA.handleFree());
            }, 200);
        }
    },

    handleMC(idx) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ, chosen = q.options[idx], ok = chosen === q.answer;
        document.getElementById('la-card').querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.disabled = true;
            if (q.options[i] === q.answer) btn.classList.add('correct');
            if (i === idx && !ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        this.showFb(ok, q.explain);
    },

    handleFree() {
        if (this.answered) return;
        const mf = document.getElementById('la-mf');
        if (!mf) return;
        const latex = mf.value;
        if (!latex || !latex.trim()) return;
        this.answered = true;
        const ok = Math.abs(parseLatex(latex) - this.currentQ.answer) < 0.0001;
        mf.disabled = true;
        const cb = document.getElementById('la-check');
        if (cb) cb.disabled = true;
        let extra = '';
        if (!ok) extra = `<br>The correct answer is \\(${this.currentQ.answerTex}\\).`;
        this.record(ok);
        this.showFb(ok, this.currentQ.explain + extra);
    },

    record(ok) {
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        document.getElementById('la-score').textContent = `${this.score} / ${this.total}`;
        document.getElementById('la-pct').textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '\u2014';
        document.getElementById('la-streak').textContent = this.streak;

        // Persist to mastery data
        const sid = this.currentQ.skill;
        this.data.skills[sid].attempts.unshift({ ok, ts: Date.now() });
        this.data.totalQuestions++;
        if (ok) this.data.totalCorrect++;
        this.saveData();

        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('la-fb');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        fb.style.textAlign = 'center';
        document.getElementById('la-fb-title').textContent = ok ? 'Correct!' : 'Not quite\u2026';
        document.getElementById('la-fb-expl').innerHTML = html;
        document.getElementById('la-next').classList.add('show');
        renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};
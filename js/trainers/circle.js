/* ================================================================
   CIRCLE THEOREMS TRAINER (CT)
   ================================================================ */

// SVG helpers (file-local)
function _ctPt(deg, cx, cy, r) {
    cx = cx || 150; cy = cy || 150; r = r || 100;
    const rad = deg * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}
function _ctSvgOpen() { return '<svg viewBox="0 0 300 300" width="280" height="280" style="display:block;margin:12px auto;" xmlns="http://www.w3.org/2000/svg">'; }
function _ctSvgCircle(cx, cy, r) { cx=cx||150;cy=cy||150;r=r||100; return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#4361ee" stroke-width="2"/>'; }
function _ctLine(x1,y1,x2,y2,col,dash) { col=col||'#2b2d42';dash=dash?'stroke-dasharray="6,4"':''; return '<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+col+'" stroke-width="1.8" '+dash+'/>'; }
function _ctDot(x,y,col) { col=col||'#2b2d42'; return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="'+col+'"/>'; }
function _ctLabel(x,y,txt,col,sz) { col=col||'#2b2d42';sz=sz||'13px'; return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" fill="'+col+'" font-size="'+sz+'" font-weight="600" text-anchor="middle" dominant-baseline="middle">'+txt+'</text>'; }
function _ctArc(cx,cy,r,startDeg,endDeg,col) {
    col=col||'#06d6a0'; r=r||15;
    const s=_ctPt(startDeg,cx,cy,r), e=_ctPt(endDeg,cx,cy,r);
    let sweep = endDeg - startDeg;
    if (sweep < 0) sweep += 360;
    const largeArc = sweep > 180 ? 1 : 0;
    return '<path d="M'+s.x.toFixed(1)+','+s.y.toFixed(1)+' A'+r+','+r+' 0 '+largeArc+',0 '+e.x.toFixed(1)+','+e.y.toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="1.5"/>';
}
function _ctRightAngle(vx,vy,p1x,p1y,p2x,p2y,sz) {
    sz = sz || 12;
    // Unit vectors from vertex to p1 and p2
    let d1x=p1x-vx, d1y=p1y-vy, d2x=p2x-vx, d2y=p2y-vy;
    const len1=Math.sqrt(d1x*d1x+d1y*d1y), len2=Math.sqrt(d2x*d2x+d2y*d2y);
    d1x/=len1;d1y/=len1;d2x/=len2;d2y/=len2;
    const ax=vx+d1x*sz, ay=vy+d1y*sz;
    const bx=ax+d2x*sz, by=ay+d2y*sz;
    const cx2=vx+d2x*sz, cy2=vy+d2y*sz;
    return '<path d="M'+ax.toFixed(1)+','+ay.toFixed(1)+' L'+bx.toFixed(1)+','+by.toFixed(1)+' L'+cx2.toFixed(1)+','+cy2.toFixed(1)+'" fill="none" stroke="#2b2d42" stroke-width="1.2"/>';
}

// Offset a label position outward from the circle centre
function _ctOuter(p, cx, cy, dist) {
    cx=cx||150;cy=cy||150;dist=dist||18;
    const dx=p.x-cx, dy=p.y-cy;
    const len=Math.sqrt(dx*dx+dy*dy)||1;
    return {x:p.x+dx/len*dist, y:p.y+dy/len*dist};
}

const CT = {
    score:0, total:0, streak:0, currentQ:null, answered:false, hintIdx:0, level:'all',

    /* ---- 8 Question Generators ---- */

    // 1. Angle at centre = 2 * angle at circumference
    qCentreAngle() {
        const circAngle = randInt(20, 80);
        const centreAngle = circAngle * 2;
        // Place arc endpoints and circumference point
        const offset = randInt(0, 60);
        const aD = 200 + offset, bD = 200 + offset - centreAngle;
        const cD = 90 + randInt(-15, 15); // circumference point in upper half
        const a = _ctPt(aD), b = _ctPt(bD), c = _ctPt(cD);
        const O = {x:150,y:150};
        const aL=_ctOuter(a), bL=_ctOuter(b), cL=_ctOuter(c);
        let svg = _ctSvgOpen() + _ctSvgCircle();
        svg += _ctLine(O.x,O.y,a.x,a.y,'#4361ee') + _ctLine(O.x,O.y,b.x,b.y,'#4361ee');
        svg += _ctLine(c.x,c.y,a.x,a.y,'#ef476f') + _ctLine(c.x,c.y,b.x,b.y,'#ef476f');
        svg += _ctDot(a.x,a.y) + _ctDot(b.x,b.y) + _ctDot(c.x,c.y) + _ctDot(O.x,O.y,'#4361ee');
        svg += _ctLabel(aL.x,aL.y,'A') + _ctLabel(bL.x,bL.y,'B') + _ctLabel(cL.x,cL.y,'C') + _ctLabel(140,140,'O','#4361ee');
        svg += _ctLabel((c.x+a.x+b.x)/3, Math.min(c.y,a.y,b.y)-2, circAngle+'°','#ef476f','12px');
        svg += _ctLabel(O.x,(a.y+b.y)/2+16,'?°','#4361ee','14px');
        svg += '</svg>';
        return { type:'free', rule:'Centre Angle', difficulty:'easy',
            text:'The angle at the circumference is '+circAngle+'°. Find the angle at the centre (angle AOB).',
            latex: svg, answer: centreAngle, answerTex: centreAngle+'°',
            hintTex:['The angle at the centre is always twice the angle at the circumference standing on the same arc.',
                     'Angle at centre = 2 × '+circAngle+'° = ?'],
            explain:'The angle at the centre is twice the angle at the circumference.<br>\\('+centreAngle+'° = 2 \\times '+circAngle+'°\\)'
        };
    },

    // 2. Angle in semicircle = 90°
    qSemicircle() {
        const offset = randInt(-20, 20);
        const aD = 0 + offset, bD = 180 + offset;
        const cD = 50 + randInt(10, 70); // point on circle (upper half)
        const a = _ctPt(aD), b = _ctPt(bD), c = _ctPt(cD);
        const O = {x:150,y:150};
        const alpha = randInt(25, 65);
        const beta = 90 - alpha;
        const aL=_ctOuter(a), bL=_ctOuter(b), cL=_ctOuter(c);
        let svg = _ctSvgOpen() + _ctSvgCircle();
        svg += _ctLine(a.x,a.y,b.x,b.y,'#4361ee',true); // diameter dashed
        svg += _ctLine(c.x,c.y,a.x,a.y,'#ef476f') + _ctLine(c.x,c.y,b.x,b.y,'#ef476f');
        svg += _ctRightAngle(c.x,c.y,a.x,a.y,b.x,b.y);
        svg += _ctDot(a.x,a.y) + _ctDot(b.x,b.y) + _ctDot(c.x,c.y) + _ctDot(O.x,O.y,'#4361ee');
        svg += _ctLabel(aL.x,aL.y,'A') + _ctLabel(bL.x,bL.y,'B') + _ctLabel(cL.x,cL.y,'C');
        // show alpha at A, ask for beta at B
        const mAC = {x:(a.x+c.x)/2+8, y:(a.y+c.y)/2};
        svg += _ctLabel(mAC.x, mAC.y, alpha+'°', '#ef476f', '12px');
        const mBC = {x:(b.x+c.x)/2-8, y:(b.y+c.y)/2};
        svg += _ctLabel(mBC.x, mBC.y, '?°', '#06d6a0', '14px');
        svg += '</svg>';
        return { type:'free', rule:'Semicircle', difficulty:'easy',
            text:'AB is a diameter. Angle CAB = '+alpha+'°. Find angle CBA.',
            latex: svg, answer: beta, answerTex: beta+'°',
            hintTex:['The angle in a semicircle is always 90°. So angle ACB = 90°.',
                     'Angles in a triangle sum to 180°. So angle CBA = 180° − 90° − '+alpha+'°.'],
            explain:'Angle in a semicircle = 90°. Angles in triangle: \\('+beta+'° = 180° - 90° - '+alpha+'°\\)'
        };
    },

    // 3. Angles in same segment are equal
    qSameSegment() {
        const angle = randInt(25, 75);
        const offset = randInt(0, 40);
        const aD = 230 + offset, bD = 310 + offset;
        const cD = 70 + randInt(-10, 10), dD = 120 + randInt(-10, 10);
        const a=_ctPt(aD), b=_ctPt(bD), c=_ctPt(cD), d=_ctPt(dD);
        const aL=_ctOuter(a), bL=_ctOuter(b), cL=_ctOuter(c), dL=_ctOuter(d);
        let svg = _ctSvgOpen() + _ctSvgCircle();
        svg += _ctLine(c.x,c.y,a.x,a.y,'#ef476f') + _ctLine(c.x,c.y,b.x,b.y,'#ef476f');
        svg += _ctLine(d.x,d.y,a.x,a.y,'#06d6a0') + _ctLine(d.x,d.y,b.x,b.y,'#06d6a0');
        svg += _ctDot(a.x,a.y) + _ctDot(b.x,b.y) + _ctDot(c.x,c.y) + _ctDot(d.x,d.y);
        svg += _ctLabel(aL.x,aL.y,'A') + _ctLabel(bL.x,bL.y,'B') + _ctLabel(cL.x,cL.y,'C') + _ctLabel(dL.x,dL.y,'D');
        svg += _ctLabel(c.x, c.y+16, angle+'°','#ef476f','12px');
        svg += _ctLabel(d.x, d.y+16, '?°','#06d6a0','14px');
        svg += '</svg>';
        return { type:'free', rule:'Same Segment', difficulty:'easy',
            text:'C and D are on the same arc. Angle ACB = '+angle+'°. Find angle ADB.',
            latex: svg, answer: angle, answerTex: angle+'°',
            hintTex:['Angles in the same segment are equal.',
                     'Both angles stand on the same chord AB, so angle ADB = angle ACB.'],
            explain:'Angles in the same segment are equal.<br>Angle ADB = '+angle+'°'
        };
    },

    // 4. Cyclic quadrilateral: opposite angles sum to 180°
    qCyclicQuad() {
        const alpha = randInt(60, 130);
        const beta = 180 - alpha;
        const aD = randInt(30,60), bD = randInt(110,150), cD = randInt(210,250), dD = randInt(300,340);
        const a=_ctPt(aD), b=_ctPt(bD), c=_ctPt(cD), d=_ctPt(dD);
        const aL=_ctOuter(a), bL=_ctOuter(b), cL=_ctOuter(c), dL=_ctOuter(d);
        let svg = _ctSvgOpen() + _ctSvgCircle();
        svg += _ctLine(a.x,a.y,b.x,b.y,'#2b2d42') + _ctLine(b.x,b.y,c.x,c.y,'#2b2d42');
        svg += _ctLine(c.x,c.y,d.x,d.y,'#2b2d42') + _ctLine(d.x,d.y,a.x,a.y,'#2b2d42');
        svg += _ctDot(a.x,a.y) + _ctDot(b.x,b.y) + _ctDot(c.x,c.y) + _ctDot(d.x,d.y);
        svg += _ctLabel(aL.x,aL.y,'A') + _ctLabel(bL.x,bL.y,'B') + _ctLabel(cL.x,cL.y,'C') + _ctLabel(dL.x,dL.y,'D');
        svg += _ctLabel(a.x-8,a.y+4,alpha+'°','#ef476f','12px');
        svg += _ctLabel(c.x+8,c.y+4,'?°','#06d6a0','14px');
        svg += '</svg>';
        return { type:'free', rule:'Cyclic Quadrilateral', difficulty:'medium',
            text:'ABCD is a cyclic quadrilateral. Angle A = '+alpha+'°. Find angle C.',
            latex: svg, answer: beta, answerTex: beta+'°',
            hintTex:['Opposite angles of a cyclic quadrilateral sum to 180°.',
                     'Angle C = 180° − '+alpha+'° = ?'],
            explain:'Opposite angles in a cyclic quadrilateral sum to 180°.<br>\\('+beta+'° = 180° - '+alpha+'°\\)'
        };
    },

    // 5. Tangent perpendicular to radius
    qTangentRadius() {
        const alpha = randInt(20, 70);
        const beta = 90 - alpha;
        const tD = randInt(30, 150);
        const T = _ctPt(tD);
        const O = {x:150,y:150};
        // Tangent direction is perpendicular to OT
        const rad = tD * Math.PI / 180;
        const dx = -Math.sin(rad), dy = -Math.cos(rad); // perpendicular direction (note y is flipped)
        const t1 = {x:T.x+dx*80, y:T.y+dy*80};
        const t2 = {x:T.x-dx*80, y:T.y-dy*80};
        // Point P along tangent
        const P = t1;
        const TL=_ctOuter(T), PL={x:P.x+(P.x>150?12:-12), y:P.y-10};
        let svg = _ctSvgOpen() + _ctSvgCircle();
        svg += _ctLine(O.x,O.y,T.x,T.y,'#4361ee'); // radius
        svg += _ctLine(t1.x,t1.y,t2.x,t2.y,'#ef476f'); // tangent
        svg += _ctRightAngle(T.x,T.y,O.x,O.y,P.x,P.y);
        svg += _ctDot(T.x,T.y) + _ctDot(O.x,O.y,'#4361ee') + _ctDot(P.x,P.y,'#ef476f');
        svg += _ctLabel(TL.x,TL.y,'T') + _ctLabel(140,140,'O','#4361ee') + _ctLabel(PL.x,PL.y,'P','#ef476f');
        // Show angle OTP = 90, ask for angle given alpha
        svg += _ctLabel((O.x+T.x)/2-12,(O.y+T.y)/2, alpha+'°','#4361ee','12px');
        svg += _ctLabel((T.x+P.x)/2+10,(T.y+P.y)/2, '?°','#06d6a0','14px');
        svg += '</svg>';
        return { type:'free', rule:'Tangent-Radius', difficulty:'medium',
            text:'PT is a tangent. Angle OTP = 90°. If the angle between OT and the line from O (shown) is '+alpha+'°, find the remaining angle at T between the radius extension and the tangent.',
            latex: svg, answer: beta, answerTex: beta+'°',
            hintTex:['A tangent to a circle is perpendicular to the radius at the point of contact.',
                     'The angle between the tangent and the radius is 90°, so the missing angle = 90° − '+alpha+'°.'],
            explain:'Tangent ⊥ radius, so the angle is 90°.<br>\\('+beta+'° = 90° - '+alpha+'°\\)'
        };
    },

    // 6. Two tangents from external point — equal lengths + Pythagoras
    qTwoTangents() {
        const triples = [[3,4,5],[5,12,13],[6,8,10],[8,15,17]];
        const tri = pick(triples);
        const r = tri[0], tangentLen = tri[1], dist = tri[2]; // r, tangent, hypotenuse
        // External point P is at distance `dist` * scale from centre
        const scale = Math.floor(90 / dist);
        const rScaled = r * scale, tScaled = tangentLen * scale, dScaled = dist * scale;
        const dir = randInt(0, 359);
        const P = _ctPt(dir, 150, 150, dScaled);
        const O = {x:150,y:150};
        // Tangent touch points — approximate positions
        const ang = Math.acos(rScaled / dScaled) * 180 / Math.PI;
        const T1 = _ctPt(dir + ang, 150, 150, rScaled);
        const T2 = _ctPt(dir - ang, 150, 150, rScaled);
        const PL = _ctOuter(P,150,150,16);
        let svg = _ctSvgOpen() + _ctSvgCircle(150,150,rScaled);
        svg += _ctLine(O.x,O.y,T1.x,T1.y,'#4361ee') + _ctLine(O.x,O.y,T2.x,T2.y,'#4361ee');
        svg += _ctLine(P.x,P.y,T1.x,T1.y,'#ef476f') + _ctLine(P.x,P.y,T2.x,T2.y,'#ef476f');
        svg += _ctDot(T1.x,T1.y) + _ctDot(T2.x,T2.y) + _ctDot(P.x,P.y,'#ef476f') + _ctDot(O.x,O.y,'#4361ee');
        svg += _ctLabel(PL.x,PL.y,'P','#ef476f');
        svg += _ctLabel(140,140,'O','#4361ee');
        svg += _ctLabel((O.x+T1.x)/2-6,(O.y+T1.y)/2-6,r+'','#4361ee','12px');
        svg += _ctLabel((P.x+O.x)/2+10,(P.y+O.y)/2,dist+'','#2b2d42','12px');
        svg += _ctLabel((P.x+T1.x)/2+10,(P.y+T1.y)/2,'?','#06d6a0','14px');
        svg += '</svg>';
        return { type:'free', rule:'Two Tangents', difficulty:'medium',
            text:'Two tangents are drawn from P to the circle (radius '+r+'). OP = '+dist+'. Find the tangent length PT.',
            latex: svg, answer: tangentLen, answerTex: String(tangentLen),
            hintTex:['The tangent is perpendicular to the radius at the point of contact, forming a right triangle OTP.',
                     'By Pythagoras: PT² = OP² − OT² = '+dist+'² − '+r+'² = '+(dist*dist)+' − '+(r*r)+' = '+(tangentLen*tangentLen)],
            explain:'PT² = OP² − r² = '+(dist*dist)+' − '+(r*r)+' = '+(tangentLen*tangentLen)+'<br>PT = '+tangentLen
        };
    },

    // 7. Alternate segment theorem
    qAlternateSegment() {
        const angle = randInt(25, 75);
        const tD = randInt(240, 300);
        const T = _ctPt(tD);
        // Chord from T to a point C on the circle
        const cD = tD + randInt(80, 160);
        const C = _ctPt(cD);
        // The tangent at T
        const rad = tD * Math.PI / 180;
        const dx = -Math.sin(rad), dy = -Math.cos(rad);
        const t1 = {x:T.x+dx*80, y:T.y+dy*80};
        const t2 = {x:T.x-dx*80, y:T.y-dy*80};
        const TL=_ctOuter(T), CL=_ctOuter(C);
        // Another point D on the major arc for the inscribed angle
        const dD = tD + randInt(10, 60);
        const D = _ctPt(dD);
        const DL = _ctOuter(D);
        let svg = _ctSvgOpen() + _ctSvgCircle();
        svg += _ctLine(t1.x,t1.y,t2.x,t2.y,'#ef476f'); // tangent
        svg += _ctLine(T.x,T.y,C.x,C.y,'#2b2d42'); // chord TC
        svg += _ctLine(D.x,D.y,T.x,T.y,'#06d6a0',true) + _ctLine(D.x,D.y,C.x,C.y,'#06d6a0',true);
        svg += _ctDot(T.x,T.y) + _ctDot(C.x,C.y) + _ctDot(D.x,D.y);
        svg += _ctLabel(TL.x,TL.y,'T') + _ctLabel(CL.x,CL.y,'C') + _ctLabel(DL.x,DL.y,'D');
        // Label the angle between tangent and chord at T
        svg += _ctLabel(T.x-20, T.y-14, angle+'°', '#ef476f', '12px');
        svg += _ctLabel(D.x, D.y+16, '?°', '#06d6a0', '14px');
        svg += '</svg>';
        return { type:'free', rule:'Alternate Segment', difficulty:'hard',
            text:'The angle between the tangent at T and chord TC is '+angle+'°. Find angle TDC (in the alternate segment).',
            latex: svg, answer: angle, answerTex: angle+'°',
            hintTex:['The alternate segment theorem says the angle between a tangent and a chord equals the angle in the alternate segment.',
                     'Angle TDC = angle between tangent and chord TC = '+angle+'°.'],
            explain:'By the alternate segment theorem, the angle between the tangent and chord equals the inscribed angle in the other segment.<br>Angle TDC = '+angle+'°'
        };
    },

    // 8. Perpendicular from centre bisects chord
    qChordBisect() {
        const triples = [[3,4,5],[5,12,13],[6,8,10],[8,15,17]];
        const tri = pick(triples);
        // half-chord = tri[0], perp dist = tri[1], radius = tri[2] OR
        // half-chord = tri[1], perp dist = tri[0], radius = tri[2]
        const useFirst = pick([true, false]);
        const halfChord = useFirst ? tri[0] : tri[1];
        const perpDist = useFirst ? tri[1] : tri[0];
        const radius = tri[2];
        const fullChord = halfChord * 2;
        // Draw chord horizontally with M at midpoint
        const O = {x:150,y:150};
        const M = {x:150, y:150+perpDist*5}; // below centre
        const A = {x:150-halfChord*5, y:M.y};
        const B = {x:150+halfChord*5, y:M.y};
        const rScaled = radius * 5;
        let svg = _ctSvgOpen() + _ctSvgCircle(150,150,rScaled);
        svg += _ctLine(A.x,A.y,B.x,B.y,'#ef476f'); // chord
        svg += _ctLine(O.x,O.y,M.x,M.y,'#4361ee',true); // perp from centre
        svg += _ctLine(O.x,O.y,A.x,A.y,'#2b2d42',true); // radius to A
        svg += _ctRightAngle(M.x,M.y,O.x,O.y,B.x,B.y);
        svg += _ctDot(A.x,A.y) + _ctDot(B.x,B.y) + _ctDot(M.x,M.y,'#4361ee') + _ctDot(O.x,O.y,'#4361ee');
        svg += _ctLabel(A.x-14,A.y,'A') + _ctLabel(B.x+14,B.y,'B') + _ctLabel(M.x+14,M.y+4,'M','#4361ee');
        svg += _ctLabel(140,140,'O','#4361ee');
        svg += _ctLabel((O.x+M.x)/2-14,(O.y+M.y)/2,perpDist+'','#4361ee','12px');
        svg += _ctLabel(O.x+20,O.y-10,radius+'','#2b2d42','12px');
        svg += _ctLabel((A.x+M.x)/2,A.y+16,'?','#06d6a0','14px');
        svg += '</svg>';
        return { type:'free', rule:'Chord Bisector', difficulty:'hard',
            text:'OM is perpendicular to chord AB. Radius = '+radius+', OM = '+perpDist+'. Find AM (half the chord length).',
            latex: svg, answer: halfChord, answerTex: String(halfChord),
            hintTex:['The perpendicular from the centre to a chord bisects the chord. Triangle OMA is right-angled at M.',
                     'AM² = OA² − OM² = '+radius+'² − '+perpDist+'² = '+(radius*radius)+' − '+(perpDist*perpDist)+' = '+(halfChord*halfChord)],
            explain:'AM² = r² − OM² = '+(radius*radius)+' − '+(perpDist*perpDist)+' = '+(halfChord*halfChord)+'<br>AM = '+halfChord
        };
    },

    /* ---- Standard trainer methods ---- */
    pools:null, allPool:null,
    init() {
        this.pools = {
            easy: [this.qCentreAngle, this.qSemicircle, this.qSameSegment],
            medium: [this.qCyclicQuad, this.qTangentRadius, this.qTwoTangents],
            hard: [this.qAlternateSegment, this.qChordBisect]
        };
        this.allPool = [...this.pools.easy,...this.pools.easy,...this.pools.medium,...this.pools.medium,...this.pools.hard];
        loadTrainerStats('ct',this);
    },
    next() { const p = this.level==='all' ? this.allPool : this.pools[this.level]; return pick(p)(); },
    resetScore() { this.score=0;this.total=0;this.streak=0; document.getElementById('ct-score').textContent='0 / 0'; document.getElementById('ct-pct').textContent='\u2014'; document.getElementById('ct-streak').textContent='0'; saveTrainerStats('ct',this); },
    load() {
        this.answered=false; this.currentQ=this.next(); this.hintIdx=0;
        const q=this.currentQ, dl={easy:'Easy',medium:'Medium',hard:'Challenging'};
        let h='<div class="difficulty-tag '+q.difficulty+'">'+dl[q.difficulty]+'</div><div class="rule-tag">'+q.rule+'</div><div class="question-text">'+q.text+'</div><div class="question-prompt">'+q.latex+'</div>';
        h+='<div class="input-area"><math-field class="lr-math-field" id="ct-mf" placeholder="?"></math-field><button class="btn btn-primary" id="ct-check">Check</button></div>';
        document.getElementById('ct-card').innerHTML=h;
        document.getElementById('ct-fb').classList.remove('show','correct','incorrect');
        document.getElementById('ct-next').classList.remove('show');
        resetHint('ct-hint','ct-hint-btn');
        document.getElementById('ct-workout').innerHTML='';
        renderMath();
        setTimeout(()=>{const mf=document.getElementById('ct-mf');if(mf){mf.focus();mf.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();CT.check();}});}document.getElementById('ct-check')?.addEventListener('click',()=>CT.check());},200);
    },
    check() {
        if(this.answered)return; const mf=document.getElementById('ct-mf'); if(!mf||!mf.value.trim())return;
        this.answered=true; const ans=parseLatex(mf.value), ok=Math.abs(ans-this.currentQ.answer)<0.01;
        mf.disabled=true; document.getElementById('ct-check').disabled=true;
        this.record(ok); let ex=this.currentQ.explain; if(!ok)ex='The answer is \\('+this.currentQ.answerTex+'\\).<br>'+ex;
        this.showFb(ok,ex);
    },
    record(ok) { this.total++; if(ok){this.score++;this.streak++;}else{this.streak=0;} document.getElementById('ct-score').textContent=this.score+' / '+this.total; document.getElementById('ct-pct').textContent=this.total?Math.round(this.score/this.total*100)+'%':'\u2014'; document.getElementById('ct-streak').textContent=this.streak; saveTrainerStats('ct',this); if(window.markAnswered)window.markAnswered(); },
    showFb(ok,html) { const fb=document.getElementById('ct-fb'); fb.classList.remove('correct','incorrect'); fb.classList.add('show',ok?'correct':'incorrect'); fb.style.textAlign='center'; document.getElementById('ct-fb-title').textContent=ok?'Correct!':'Not quite\u2026'; document.getElementById('ct-fb-expl').innerHTML=html; document.getElementById('ct-next').classList.add('show'); renderMath(); fb.scrollIntoView({behavior:'smooth',block:'nearest'}); }
};

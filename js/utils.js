/* Shared Utilities */
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function renderMath() {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '\\(', right: '\\)', display: false },
                { left: '$$',  right: '$$',  display: true  }
            ],
            throwOnError: false
        });
    }
}

function parseLatex(raw) {
    // Strip MathLive formatting, spacing/display commands
    let s = raw.replace(/\\left|\\right|\\,|\\:|\\;|\\!|\\displaystyle|\\textstyle|\\placeholder\{[^}]*\}/g, '').replace(/\s+/g, '');
    s = s.replace(/−/g, '-');
    // Strip wrapping braces if they surround the entire expression
    if (/^\{.+\}$/.test(s)) {
        let depth = 0, outerOnly = true;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '{') depth++;
            else if (s[i] === '}') depth--;
            if (depth === 0 && i < s.length - 1) { outerOnly = false; break; }
        }
        if (outerOnly) s = s.slice(1, -1);
    }
    // \frac, \dfrac, \tfrac, \cfrac (with optional leading negative)
    const fm = s.match(/(-?)\\[cdt]?frac\{(-?[\d.]+)\}\{(-?[\d.]+)\}/);
    if (fm) {
        const sign = fm[1] === '-' ? -1 : 1;
        return sign * parseFloat(fm[2]) / parseFloat(fm[3]);
    }
    // \over style: 1\over 3
    const ov = s.match(/^(-?[\d.]+)\\over(-?[\d.]+)$/);
    if (ov) return parseFloat(ov[1]) / parseFloat(ov[2]);
    // Slash division: 1/3
    const dv = s.match(/^(-?[\d.]+)\/(-?[\d.]+)$/);
    if (dv) return parseFloat(dv[1]) / parseFloat(dv[2]);
    return parseFloat(s);
}

// Parse exponent from base^{exp} input (for IDX-style questions)
function parseLatexPower(raw) {
    let s = raw.replace(/\\left|\\right|\\,|\\:|\\;|\\!/g, '').replace(/\s+/g, '').replace(/−/g, '-');
    const m = s.match(/^(-?\d+)\^\{?(-?[\d.]+)\}?$/);
    if (m) return { base: parseInt(m[1]), exp: parseFloat(m[2]) };
    return null;
}

// -- Copy Calculator to Workings -----------------------------------------
function latexToReadable(latex) {
    return latex
        .replace(/\\cdot/g, '\u00B7')
        .replace(/\\times/g, '\u00D7')
        .replace(/\\div/g, '\u00F7')
        .replace(/\\sqrt\{([^}]+)\}/g, '\u221A($1)')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
        .replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
        .replace(/\\left\[/g, '[').replace(/\\right\]/g, ']')
        .replace(/\{/g, '(').replace(/\}/g, ')')
        .replace(/\^/g, '^');
}
function copyCalcToWorkout(workoutId) {
    if (!window.desmosCalc) { alert('Open the calculator first!'); return; }
    const workout = document.getElementById(workoutId);
    if (!workout) { alert('Workout area not found'); return; }

    // Get expressions and render with KaTeX
    try {
        const state = window.desmosCalc.getState();
        const exprs = state.expressions?.list || [];
        const validExprs = exprs.filter(e => e.latex && e.latex.trim());

        if (validExprs.length === 0) {
            alert('No expressions in calculator. Type something first!');
            return;
        }

        // Get expression analysis for evaluated values
        const analysis = window.desmosCalc.expressionAnalysis || {};

        // Create a styled box with KaTeX-rendered expressions
        const box = document.createElement('div');
        box.style.cssText = 'background:#f8f9fa;border:1px solid #e0e0e0;border-radius:8px;padding:12px;margin:8px 0;';

        validExprs.forEach(e => {
            const line = document.createElement('div');
            line.style.cssText = 'margin:6px 0;font-size:1.1em;display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

            // Render the expression
            const exprSpan = document.createElement('span');
            exprSpan.innerHTML = katex.renderToString(e.latex, { throwOnError: false, displayMode: false });
            line.appendChild(exprSpan);

            // Try to get evaluated value using helper expression
            try {
                const helper = window.desmosCalc.HelperExpression({ latex: e.latex });
                helper.observe('numericValue', () => {
                    const val = helper.numericValue;
                    if (val !== undefined && !isNaN(val)) {
                        const valSpan = document.createElement('span');
                        valSpan.style.cssText = 'color:#666;margin-left:8px;';
                        const formatted = Number.isInteger(val) ? String(val) : val.toFixed(6).replace(/\.?0+$/, '');
                        valSpan.innerHTML = katex.renderToString('= ' + formatted, { throwOnError: false });
                        line.appendChild(valSpan);
                    }
                    helper.unobserve('numericValue');
                });
            } catch(evalErr) { /* ignore */ }

            box.appendChild(line);
        });

        workout.appendChild(box);
        workout.focus();
    } catch(err) {
        console.error('Copy error:', err);
        alert('Error copying: ' + err.message);
    }
}

// -- Progressive Hint System ---------------------------------------------
function handleHint(trainer, boxId, btnId) {
    const box = document.getElementById(boxId);
    const btn = document.getElementById(btnId);
    const q = trainer.currentQ;
    if (!q) return;
    let hints = q.hintTex;
    if (!hints) return;
    if (typeof hints === 'string') hints = [hints];

    if (trainer.hintIdx >= hints.length) {
        box.classList.toggle('show');
        return;
    }

    if (trainer.hintIdx === 0) box.innerHTML = '';
    const div = document.createElement('div');
    div.style.margin = '6px 0';
    div.innerHTML = hints.length > 1
        ? `<strong>Hint ${trainer.hintIdx + 1}:</strong> ${hints[trainer.hintIdx]}`
        : hints[trainer.hintIdx];
    box.appendChild(div);
    box.classList.add('show');
    trainer.hintIdx++;

    if (trainer.hintIdx < hints.length) {
        btn.textContent = `Next Hint (${trainer.hintIdx}/${hints.length})`;
    } else {
        btn.textContent = hints.length > 1 ? 'All Hints Shown' : 'Hint';
    }
    renderMath();
}

function resetHint(boxId, btnId) {
    document.getElementById(boxId).classList.remove('show');
    document.getElementById(boxId).innerHTML = '';
    document.getElementById(btnId).textContent = 'Hint';
}

const BASES = [2, 3, 5, 10];
function logTex(b, x) { return `\\log_{${b}}(${x})`; }

// -- View Navigation -----------------------------------------------------
function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    renderMath();
}

// -- QA Helper Functions -------------------------------------------------
function quadTex(a, b, c) {
    let s = '';
    if (a===1) s='x^2'; else if (a===-1) s='-x^2'; else s=a+'x^2';
    if (b===1) s+=' + x'; else if (b===-1) s+=' - x';
    else if (b>0) s+=' + '+b+'x'; else if (b<0) s+=' - '+Math.abs(b)+'x';
    if (c>0) s+=' + '+c; else if (c<0) s+=' - '+Math.abs(c);
    return s;
}
function binTex(a, b) {
    let s = '';
    if (a===1) s='x'; else if (a===-1) s='-x'; else s=a+'x';
    if (b>0) s+=' + '+b; else if (b<0) s+=' - '+Math.abs(b);
    return s;
}

function quadLabel(a, b, c) {
    let s = '';
    if(a===1) s='x\u00B2'; else if(a===-1) s='\u2212x\u00B2'; else s=a+'x\u00B2';
    if(b===1) s+=' + x'; else if(b===-1) s+=' \u2212 x';
    else if(b>0) s+=' + '+b+'x'; else if(b<0) s+=' \u2212 '+Math.abs(b)+'x';
    if(c>0) s+=' + '+c; else if(c<0) s+=' \u2212 '+Math.abs(c);
    return s;
}

function rectSVG(top, right, center, sq) {
    const w = sq ? 100 : 140, h = sq ? 100 : 90;
    const ox = 30, oy = 28;
    const svgW = ox + w + (right ? Math.max(right.length * 8.5 + 16, 60) : 16);
    let s = `<svg viewBox="0 0 ${svgW} ${oy+h+8}" style="display:block;margin:10px auto;max-width:280px;">`;
    s += `<rect x="${ox}" y="${oy}" width="${w}" height="${h}" fill="#eef0ff" stroke="#4361ee" stroke-width="2.5" rx="4"/>`;
    if (top) {
        const c = top === '?' ? '#ef476f' : '#2b2d42';
        s += `<text x="${ox+w/2}" y="${oy-9}" text-anchor="middle" font-size="14" font-weight="600" fill="${c}">${top}</text>`;
    }
    if (right) {
        const c = right === '?' ? '#ef476f' : '#2b2d42';
        s += `<text x="${ox+w+10}" y="${oy+h/2+5}" text-anchor="start" font-size="14" font-weight="600" fill="${c}">${right}</text>`;
    }
    if (center) {
        s += `<text x="${ox+w/2}" y="${oy+h/2+5}" text-anchor="middle" font-size="11" fill="#6c757d">${center}</text>`;
    }
    if (sq) {
        const mx = ox+w/2, my = oy+h/2;
        s += `<line x1="${mx-5}" y1="${oy-1}" x2="${mx+5}" y2="${oy+3}" stroke="#4361ee" stroke-width="1.5"/>`;
        s += `<line x1="${ox+w+1}" y1="${my-5}" x2="${ox+w+5}" y2="${my+5}" stroke="#4361ee" stroke-width="1.5"/>`;
    }
    s += '</svg>';
    return s;
}

function primeFactors(n) {
    let f=[], d=2;
    while(n>1){ while(n%d===0){f.push(d);n/=d;} d++; }
    return f.join(' \\times ');
}

// -- Trainer Score Persistence --------------------------------------------
function saveTrainerStats(prefix, trainer) {
    try {
        const all = JSON.parse(localStorage.getItem('trainerStats') || '{}');
        all[prefix] = {
            score: trainer.score, total: trainer.total, streak: trainer.streak,
            bestStreak: Math.max(trainer.streak, (all[prefix]?.bestStreak || 0)),
            lastTs: Date.now()
        };
        localStorage.setItem('trainerStats', JSON.stringify(all));
        updateDailyStreak();
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
    } catch (e) {}
}
function loadTrainerStats(prefix, trainer) {
    try {
        const all = JSON.parse(localStorage.getItem('trainerStats') || '{}');
        const s = all[prefix];
        if (s) { trainer.score = s.score || 0; trainer.total = s.total || 0; trainer.streak = s.streak || 0; }
    } catch (e) {}
}
function getAllTrainerStats() {
    try { return JSON.parse(localStorage.getItem('trainerStats') || '{}'); } catch (e) { return {}; }
}

// -- Daily Streak -------------------------------------------------------------
function updateDailyStreak() {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const ds = JSON.parse(localStorage.getItem('dailyStreak') || '{}');
        if (ds.lastDate === today) return; // already counted today
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (ds.lastDate === yesterday) {
            ds.current = (ds.current || 0) + 1;
        } else {
            ds.current = 1;
        }
        ds.lastDate = today;
        ds.best = Math.max(ds.current, ds.best || 0);
        localStorage.setItem('dailyStreak', JSON.stringify(ds));
        updateDailyStreakUI();
    } catch (e) {}
}
function getDailyStreak() {
    try {
        const ds = JSON.parse(localStorage.getItem('dailyStreak') || '{}');
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (ds.lastDate === today || ds.lastDate === yesterday) return ds;
        return { current: 0, best: ds.best || 0, lastDate: ds.lastDate };
    } catch (e) { return { current: 0, best: 0 }; }
}
function updateDailyStreakUI() {
    const el = document.getElementById('daily-streak');
    if (!el) return;
    const ds = getDailyStreak();
    el.textContent = ds.current || 0;
    const bestEl = document.getElementById('daily-streak-best');
    if (bestEl) bestEl.textContent = ds.best || 0;
}

// Number keys 1-4 highlight MC option, Enter confirms
let _selectedMC = null;
document.addEventListener('keydown', e => {
    if (document.activeElement && (document.activeElement.tagName === 'MATH-FIELD' ||
        document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.isContentEditable)) return;
    const k = parseInt(e.key);
    if (k >= 1 && k <= 4) {
        const btn = document.querySelector('.option-btn[data-i="' + (k - 1) + '"]:not(:disabled)');
        if (btn) {
            e.preventDefault();
            document.querySelectorAll('.option-btn.selected').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            _selectedMC = btn;
        }
    } else if (e.key === 'Enter' && _selectedMC && document.body.contains(_selectedMC) && !_selectedMC.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
        _selectedMC.click();
        _selectedMC = null;
    }
});

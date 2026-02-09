/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
    LR.init(); SE.init(); LA.init(); QA.init();
    FDP.init(); HCFLCM.init(); IDX.init(); SF.init(); SURD.init(); RATIO.init();
    EXPR.init(); LINEAR.init(); SEQ.init(); INEQ.init();
    LINF.init(); QUADF.init(); TRANS.init();

    // Topic cards (hub + folder) — skip lesson cards
    document.querySelectorAll('.topic-card[data-topic]').forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.dataset.topic;
            if (topic === 'logarithms') { showView('logarithms'); }
            else if (topic === 'log-rules') { showView('log-rules'); LR.load(); }
            else if (topic === 'log-simul') { showView('log-simul'); SE.load(); }
            else if (topic === 'log-mastery') { showView('log-mastery'); LA.renderDashboard(); }
            else if (topic === 'quadratics') { showView('quadratics'); }
            else if (topic === 'quad-areas') { showView('quad-areas'); QA.load(); }
            else if (topic === 'number') { showView('number'); }
            else if (topic === 'num-fdp') { showView('num-fdp'); FDP.load(); }
            else if (topic === 'num-hcflcm') { showView('num-hcflcm'); HCFLCM.load(); }
            else if (topic === 'num-indices') { showView('num-indices'); IDX.load(); }
            else if (topic === 'num-stdform') { showView('num-stdform'); SF.load(); }
            else if (topic === 'num-surds') { showView('num-surds'); SURD.load(); }
            else if (topic === 'num-ratio') { showView('num-ratio'); RATIO.load(); }
            else if (topic === 'algebra') { showView('algebra'); }
            else if (topic === 'alg-expr') { showView('alg-expr'); EXPR.load(); }
            else if (topic === 'alg-linear') { showView('alg-linear'); LINEAR.load(); }
            else if (topic === 'alg-seq') { showView('alg-seq'); SEQ.load(); }
            else if (topic === 'alg-ineq') { showView('alg-ineq'); INEQ.load(); }
            else if (topic === 'functions') { showView('functions'); }
            else if (topic === 'func-linear') { showView('func-linear'); LINF.load(); }
            else if (topic === 'func-quadratic') { showView('func-quadratic'); QUADF.load(); }
            else if (topic === 'func-transform') { showView('func-transform'); TRANS.load(); }
            else if (topic === 'criterion-b') { showView('criterion-b'); }
            else if (topic === 'crit-matchstick') { showView('crit-matchstick'); MATCH.reset(); MATCH.load(); }
            else if (topic === 'crit-number') { showView('crit-number'); NUMSUM.reset(); NUMSUM.load(); }
            else if (topic === 'crit-dots') { showView('crit-dots'); DOTS.reset(); DOTS.load(); }
            else if (topic === 'dashboard') { showView('dashboard'); DASHBOARD.render(); }
        });
    });

    // Lesson cards
    const LESSONS = {
        'log-intro': LESSON_LOG_INTRO,
        'log-rules-lesson': LESSON_LOG_RULES,
        'log-natural': LESSON_LOG_NATURAL,
        'log-expand': LESSON_LOG_EXPAND,
        'log-equations': LESSON_LOG_EQUATIONS,
        'indices': LESSON_INDICES,
        'surds': LESSON_SURDS,
        'expressions': LESSON_EXPRESSIONS,
        'linear-eq': LESSON_LINEAR_EQ,
        'sequences': LESSON_SEQUENCES,
        'linear-func': LESSON_LINEAR_FUNC,
        'quadratic-func': LESSON_QUADRATIC_FUNC,
        'transformations': LESSON_TRANSFORMATIONS
    };
    document.querySelectorAll('[data-lesson]').forEach(card => {
        card.addEventListener('click', () => {
            const lesson = LESSONS[card.dataset.lesson];
            if (lesson) LessonEngine.start(lesson);
        });
    });

    // Update lesson card checkmarks
    function updateLessonBadges() {
        document.querySelectorAll('[data-lesson]').forEach(card => {
            const id = card.dataset.lesson;
            const lessonObj = LESSONS[id];
            if (lessonObj && LessonEngine.isComplete(lessonObj.id)) {
                if (!card.querySelector('.lesson-done')) {
                    const badge = document.createElement('span');
                    badge.className = 'topic-tag lesson-done';
                    badge.textContent = 'Done';
                    card.appendChild(badge);
                }
            }
        });
    }

    // Back buttons
    document.querySelectorAll('[data-back]').forEach(btn => {
        btn.addEventListener('click', () => {
            showView(btn.dataset.back || 'hub');
            updateLessonBadges();
        });
    });

    // Initial badge check
    updateLessonBadges();

    // Lesson back button
    document.getElementById('lesson-back-btn').addEventListener('click', () => {
        if (LessonEngine.folder) showView(LessonEngine.folder);
        else showView('hub');
    });

    // Log Rules hint
    document.getElementById('lr-hint-btn').addEventListener('click', () => handleHint(LR, 'lr-hint', 'lr-hint-btn'));

    // Log Rules next
    document.getElementById('lr-next').addEventListener('click', () => LR.load());

    // Log Rules reference
    document.getElementById('lr-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Product Rule</span>\\(\\log_a(m \\cdot n) = \\log_a(m) + \\log_a(n)\\)</div>
        <div class="rule-item"><span class="rule-name">Quotient Rule</span>\\(\\log_a\\!\\left(\\dfrac{m}{n}\\right) = \\log_a(m) - \\log_a(n)\\)</div>
        <div class="rule-item"><span class="rule-name">Power Rule</span>\\(\\log_a(m^k) = k \\cdot \\log_a(m)\\)</div>
        <div class="rule-item"><span class="rule-name">Change of Base</span>\\(\\log_a(b) = \\dfrac{\\log_c(b)}{\\log_c(a)}\\)</div>
        <div class="rule-item"><span class="rule-name">Identity Rules</span>\\(\\log_a(1) = 0\\) &nbsp;and&nbsp; \\(\\log_a(a) = 1\\)</div>
        <div class="rule-item"><span class="rule-name">Definition</span>\\(\\log_a(x) = n \\iff a^n = x\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-intro/v/logarithms" target="_blank">Intro to Logs</a>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-prop/v/introduction-to-logarithm-properties" target="_blank">Log Properties</a>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:change-of-base/v/change-of-base-formula" target="_blank">Change of Base</a>
        </div>`;

    // Simultaneous hint
    document.getElementById('se-hint-btn').addEventListener('click', () => handleHint(SE, 'se-hint', 'se-hint-btn'));

    // Simultaneous next + check
    document.getElementById('se-next').addEventListener('click', () => SE.load());
    document.getElementById('se-check').addEventListener('click', () => SE.check());

    // Simultaneous level selector
    document.querySelectorAll('#se-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#se-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            SE.level = btn.dataset.level;
            SE.resetScore();
            SE.load();
        });
    });

    // Enter on SE math fields
    setTimeout(() => {
        ['se-mf-x','se-mf-y'].forEach(id => {
            const el=document.getElementById(id);
            if(el) el.addEventListener('keydown', e=>{if(e.key==='Enter'){e.preventDefault();SE.check();}});
        });
    }, 300);

    // Simultaneous reference
    document.getElementById('se-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Product Rule</span>\\(\\log_a(mn) = \\log_a(m) + \\log_a(n)\\)</div>
        <div class="rule-item"><span class="rule-name">Quotient Rule</span>\\(\\log_a\\!\\left(\\frac{m}{n}\\right) = \\log_a(m) - \\log_a(n)\\)</div>
        <div class="rule-item"><span class="rule-name">Power Rule</span>\\(\\log_a(m^k) = k \\cdot \\log_a(m)\\)</div>
        <div class="rule-item"><span class="rule-name">Definition</span>\\(\\log_a(x) = n \\iff a^n = x\\)</div>
        <div class="rule-item"><span class="rule-name">Strategy</span>Let \\(u = \\log_b(x)\\), \\(v = \\log_b(y)\\), rewrite as a linear system, solve, then \\(x = b^u,\\; y = b^v\\).</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-prop/v/introduction-to-logarithm-properties" target="_blank">Log Properties</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations/x2f8bb11595b61c86:solving-systems-elimination/v/simple-elimination-practice" target="_blank">Elimination Method</a>
        </div>`;

    // Log Mastery Agent
    document.getElementById('la-hint-btn').addEventListener('click', () => handleHint(LA, 'la-hint', 'la-hint-btn'));
    document.getElementById('la-next').addEventListener('click', () => LA.load());
    document.getElementById('la-start').addEventListener('click', () => LA.startPractice(null));
    document.getElementById('la-reset').addEventListener('click', () => {
        if (confirm('Reset all mastery progress? This cannot be undone.')) {
            LA.resetData();
            LA.renderDashboard();
        }
    });
    document.getElementById('la-back-btn').addEventListener('click', () => {
        showView('log-mastery');
        LA.renderDashboard();
    });

    const laRefHTML = `
        <div class="rule-item"><span class="rule-name">Definition</span>\\(\\log_a(x) = n \\iff a^n = x\\)</div>
        <div class="rule-item"><span class="rule-name">Product Rule</span>\\(\\log_a(m \\cdot n) = \\log_a(m) + \\log_a(n)\\)</div>
        <div class="rule-item"><span class="rule-name">Quotient Rule</span>\\(\\log_a\\!\\left(\\dfrac{m}{n}\\right) = \\log_a(m) - \\log_a(n)\\)</div>
        <div class="rule-item"><span class="rule-name">Power Rule</span>\\(\\log_a(m^k) = k \\cdot \\log_a(m)\\)</div>
        <div class="rule-item"><span class="rule-name">Change of Base</span>\\(\\log_a(b) = \\dfrac{\\log_c(b)}{\\log_c(a)}\\)</div>
        <div class="rule-item"><span class="rule-name">Identities</span>\\(\\log_a(1) = 0\\), \\(\\log_a(a) = 1\\), \\(\\log_a(a^n) = n\\)</div>
        <div class="rule-item"><span class="rule-name">Natural Log</span>\\(\\ln = \\log_e\\). \\(\\ln(1)=0\\), \\(\\ln(e)=1\\), \\(e^{\\ln x}=x\\)</div>
        <div class="rule-item"><span class="rule-name">Common Log</span>\\(\\log = \\log_{10}\\). \\(\\log(10^n) = n\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-intro/v/logarithms" target="_blank">Intro to Logs</a>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-prop/v/introduction-to-logarithm-properties" target="_blank">Log Properties</a>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:change-of-base/v/change-of-base-formula" target="_blank">Change of Base</a>
        </div>`;
    document.getElementById('la-ref').innerHTML = laRefHTML;
    document.getElementById('la-ref2').innerHTML = laRefHTML;

    // Quadratic Areas hint
    document.getElementById('qa-hint-btn').addEventListener('click', () => handleHint(QA, 'qa-hint', 'qa-hint-btn'));

    // Quadratic Areas next
    document.getElementById('qa-next').addEventListener('click', () => QA.load());

    // Quadratic Areas level selector
    document.querySelectorAll('#qa-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#qa-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            QA.level = btn.dataset.level;
            QA.resetScore();
            QA.load();
        });
    });

    // Quadratic Areas reference
    document.getElementById('qa-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Expanding (FOIL)</span>\\((x+a)(x+b) = x^2 + (a+b)x + ab\\)</div>
        <div class="rule-item"><span class="rule-name">Perfect Square</span>\\((x+a)^2 = x^2 + 2ax + a^2\\)</div>
        <div class="rule-item"><span class="rule-name">Difference of Squares</span>\\(x^2 - a^2 = (x+a)(x-a)\\)</div>
        <div class="rule-item"><span class="rule-name">Factorising</span>To factorise \\(x^2 + bx + c\\), find two numbers that multiply to \\(c\\) and add to \\(b\\).</div>
        <div class="rule-item"><span class="rule-name">Completing the Square</span>\\(x^2 + bx + c = (x + \\tfrac{b}{2})^2 + (c - \\tfrac{b^2}{4})\\)</div>
        <div class="rule-item"><span class="rule-name">Vertex</span>For \\(y = ax^2 + bx + c\\), vertex x-coordinate is \\(h = -\\tfrac{b}{2a}\\)</div>
        <div class="rule-item"><span class="rule-name">Discriminant</span>\\(\\Delta = b^2 - 4ac\\). If \\(\\Delta > 0\\): 2 roots. If \\(\\Delta = 0\\): 1 root. If \\(\\Delta < 0\\): no real roots.</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring/x2f8bb11595b61c86:multiply-binomial/v/multiplying-binomials" target="_blank">Multiplying Binomials</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring/x2f8bb11595b61c86:factor-quadratics-intro/v/factoring-quadratic-expressions" target="_blank">Factoring Quadratics</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring/x2f8bb11595b61c86:factor-difference-squares/v/difference-of-squares-intro" target="_blank">Difference of Squares</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:completing-square-vertex-form/v/completing-the-square" target="_blank">Completing the Square</a>
        </div>`;

    // ==================== NUMBER FOLDER TRAINERS ====================

    // FDP (Fractions, Decimals, Percentages)
    document.getElementById('fdp-hint-btn').addEventListener('click', () => handleHint(FDP, 'fdp-hint', 'fdp-hint-btn'));
    document.getElementById('fdp-next').addEventListener('click', () => FDP.load());
    document.querySelectorAll('#fdp-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#fdp-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            FDP.level = btn.dataset.level;
            FDP.resetScore();
            FDP.load();
        });
    });
    document.getElementById('fdp-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Fraction to Decimal</span>Divide numerator by denominator: \\(\\frac{3}{4} = 3 \\div 4 = 0.75\\)</div>
        <div class="rule-item"><span class="rule-name">Decimal to Percent</span>Multiply by 100: \\(0.75 \\times 100 = 75\\%\\)</div>
        <div class="rule-item"><span class="rule-name">Percent to Decimal</span>Divide by 100: \\(75\\% \\div 100 = 0.75\\)</div>
        <div class="rule-item"><span class="rule-name">Percent of Amount</span>\\(x\\% \\text{ of } A = \\frac{x}{100} \\times A\\)</div>
        <div class="rule-item"><span class="rule-name">Percentage Increase</span>New = Original \\(\\times (1 + \\frac{\\%}{100})\\)</div>
        <div class="rule-item"><span class="rule-name">Percentage Decrease</span>New = Original \\(\\times (1 - \\frac{\\%}{100})\\)</div>
        <div class="rule-item"><span class="rule-name">Reverse Percentage</span>Original = New \\(\\div\\) multiplier. E.g., after 20% increase: Original = New \\(\\div 1.2\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic/cc-6th-percent-problems/v/finding-a-percent" target="_blank">Finding Percentages</a>
            <a href="https://www.khanacademy.org/math/pre-algebra/xb4832e56:percentages/xb4832e56:percent-word-problems/v/percent-word-problem-example-1" target="_blank">Percent Problems</a>
        </div>`;

    // HCFLCM (HCF & LCM)
    document.getElementById('hcflcm-hint-btn').addEventListener('click', () => handleHint(HCFLCM, 'hcflcm-hint', 'hcflcm-hint-btn'));
    document.getElementById('hcflcm-next').addEventListener('click', () => HCFLCM.load());
    document.querySelectorAll('#hcflcm-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#hcflcm-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            HCFLCM.level = btn.dataset.level;
            HCFLCM.resetScore();
            HCFLCM.load();
        });
    });
    document.getElementById('hcflcm-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">HCF (Highest Common Factor)</span>The largest number that divides into all given numbers exactly.</div>
        <div class="rule-item"><span class="rule-name">LCM (Lowest Common Multiple)</span>The smallest number that all given numbers divide into exactly.</div>
        <div class="rule-item"><span class="rule-name">Prime Factorisation Method</span>Write each number as product of primes. HCF = product of common primes (lowest powers). LCM = product of all primes (highest powers).</div>
        <div class="rule-item"><span class="rule-name">HCF × LCM Formula</span>For two numbers: \\(\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples/cc-6th-gcf/v/greatest-common-divisor" target="_blank">Greatest Common Divisor</a>
            <a href="https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples/cc-6th-lcm/v/least-common-multiple-lcm" target="_blank">Least Common Multiple</a>
        </div>`;

    // IDX (Indices)
    document.getElementById('idx-hint-btn').addEventListener('click', () => handleHint(IDX, 'idx-hint', 'idx-hint-btn'));
    document.getElementById('idx-next').addEventListener('click', () => IDX.load());
    document.querySelectorAll('#idx-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#idx-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            IDX.level = btn.dataset.level;
            IDX.resetScore();
            IDX.load();
        });
    });
    document.getElementById('idx-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Multiplication</span>\\(a^m \\times a^n = a^{m+n}\\)</div>
        <div class="rule-item"><span class="rule-name">Division</span>\\(a^m \\div a^n = a^{m-n}\\)</div>
        <div class="rule-item"><span class="rule-name">Power of Power</span>\\((a^m)^n = a^{mn}\\)</div>
        <div class="rule-item"><span class="rule-name">Zero Index</span>\\(a^0 = 1\\) (for \\(a \\neq 0\\))</div>
        <div class="rule-item"><span class="rule-name">Negative Index</span>\\(a^{-n} = \\frac{1}{a^n}\\)</div>
        <div class="rule-item"><span class="rule-name">Fractional Index</span>\\(a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-operations/cc-8th-exponent-properties/v/exponent-properties-involving-products" target="_blank">Exponent Properties</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:rational-exponents-radicals/x2f8bb11595b61c86:rational-exponents/v/basic-fractional-exponents" target="_blank">Fractional Exponents</a>
        </div>`;

    // SF (Standard Form)
    document.getElementById('sf-hint-btn').addEventListener('click', () => handleHint(SF, 'sf-hint', 'sf-hint-btn'));
    document.getElementById('sf-next').addEventListener('click', () => SF.load());
    document.querySelectorAll('#sf-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#sf-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            SF.level = btn.dataset.level;
            SF.resetScore();
            SF.load();
        });
    });
    document.getElementById('sf-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Standard Form</span>\\(A \\times 10^n\\) where \\(1 \\leq A < 10\\) and \\(n\\) is an integer.</div>
        <div class="rule-item"><span class="rule-name">Large Numbers</span>Move decimal left, positive power. E.g., \\(45000 = 4.5 \\times 10^4\\)</div>
        <div class="rule-item"><span class="rule-name">Small Numbers</span>Move decimal right, negative power. E.g., \\(0.0032 = 3.2 \\times 10^{-3}\\)</div>
        <div class="rule-item"><span class="rule-name">Multiplication</span>Multiply coefficients, add powers: \\((a \\times 10^m)(b \\times 10^n) = ab \\times 10^{m+n}\\)</div>
        <div class="rule-item"><span class="rule-name">Division</span>Divide coefficients, subtract powers: \\(\\frac{a \\times 10^m}{b \\times 10^n} = \\frac{a}{b} \\times 10^{m-n}\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-operations/cc-8th-scientific-notation-intro/v/scientific-notation" target="_blank">Scientific Notation</a>
            <a href="https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-operations/cc-8th-scientific-notation-compu/v/multiplying-in-scientific-notation" target="_blank">Operations in Scientific Notation</a>
        </div>`;

    // SURD (Surds)
    document.getElementById('surd-hint-btn').addEventListener('click', () => handleHint(SURD, 'surd-hint', 'surd-hint-btn'));
    document.getElementById('surd-next').addEventListener('click', () => SURD.load());
    document.querySelectorAll('#surd-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#surd-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            SURD.level = btn.dataset.level;
            SURD.resetScore();
            SURD.load();
        });
    });
    document.getElementById('surd-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">What is a Surd?</span>An irrational root that cannot be simplified to a whole number, e.g., \\(\\sqrt{2}\\), \\(\\sqrt{5}\\).</div>
        <div class="rule-item"><span class="rule-name">Simplifying</span>\\(\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}\\). Find largest square factor: \\(\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}\\)</div>
        <div class="rule-item"><span class="rule-name">Multiplying</span>\\(\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}\\) and \\(a\\sqrt{b} \\times c\\sqrt{d} = ac\\sqrt{bd}\\)</div>
        <div class="rule-item"><span class="rule-name">Adding/Subtracting</span>Combine like surds: \\(3\\sqrt{2} + 5\\sqrt{2} = 8\\sqrt{2}\\) but \\(\\sqrt{2} + \\sqrt{3}\\) cannot be simplified.</div>
        <div class="rule-item"><span class="rule-name">Rationalising (simple)</span>\\(\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}\\) — multiply top and bottom by \\(\\sqrt{b}\\).</div>
        <div class="rule-item"><span class="rule-name">Rationalising (conjugate)</span>\\(\\frac{a}{b + \\sqrt{c}} = \\frac{a(b - \\sqrt{c})}{b^2 - c}\\) — multiply by conjugate.</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:rational-exponents-radicals/x2f8bb11595b61c86:simplify-square-roots/v/simplifying-square-roots-1" target="_blank">Simplifying Square Roots</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:rational-exponents-radicals/x2f8bb11595b61c86:rationalize-denominators/v/rationalizing-denominators-of-expressions" target="_blank">Rationalizing Denominators</a>
        </div>`;

    // RATIO (Ratios & Proportion)
    document.getElementById('ratio-hint-btn').addEventListener('click', () => handleHint(RATIO, 'ratio-hint', 'ratio-hint-btn'));
    document.getElementById('ratio-next').addEventListener('click', () => RATIO.load());
    document.querySelectorAll('#ratio-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#ratio-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            RATIO.level = btn.dataset.level;
            RATIO.resetScore();
            RATIO.load();
        });
    });
    document.getElementById('ratio-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Simplifying Ratios</span>Divide all parts by their HCF. E.g., \\(12:18 = 2:3\\)</div>
        <div class="rule-item"><span class="rule-name">Sharing in Ratio</span>Add ratio parts, divide total by sum, multiply by each part. E.g., £100 in ratio 2:3 → parts = 100÷5 = 20, so 40 and 60.</div>
        <div class="rule-item"><span class="rule-name">Direct Proportion</span>\\(y = kx\\). As \\(x\\) increases, \\(y\\) increases at same rate. Find \\(k = \\frac{y}{x}\\).</div>
        <div class="rule-item"><span class="rule-name">Inverse Proportion</span>\\(y = \\frac{k}{x}\\). As \\(x\\) increases, \\(y\\) decreases. Find \\(k = xy\\).</div>
        <div class="rule-item"><span class="rule-name">Direct Square Proportion</span>\\(y = kx^2\\). Find \\(k = \\frac{y}{x^2}\\).</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/pre-algebra/xb4832e56:rates-and-proportional-relationships/xb4832e56:writing-and-solving-proportions/v/find-an-unknown-in-a-proportion" target="_blank">Solving Proportions</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:direct-inverse-variation/x2f8bb11595b61c86:direct-variation/v/direct-variation-1" target="_blank">Direct Variation</a>
        </div>`;

    // ==================== ALGEBRA FOLDER TRAINERS ====================

    // EXPR (Algebraic Expressions)
    document.getElementById('expr-hint-btn').addEventListener('click', () => handleHint(EXPR, 'expr-hint', 'expr-hint-btn'));
    document.getElementById('expr-next').addEventListener('click', () => EXPR.load());
    document.querySelectorAll('#expr-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#expr-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            EXPR.level = btn.dataset.level;
            EXPR.resetScore();
            EXPR.load();
        });
    });
    document.getElementById('expr-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Collecting Like Terms</span>Add or subtract terms with the same variable: \\(3x + 5x = 8x\\), \\(2x + 3y\\) cannot be simplified.</div>
        <div class="rule-item"><span class="rule-name">Expanding Single Brackets</span>Multiply each term inside by the term outside: \\(a(b + c) = ab + ac\\)</div>
        <div class="rule-item"><span class="rule-name">Expanding Double Brackets (FOIL)</span>\\((x + a)(x + b) = x^2 + (a+b)x + ab\\). First, Outside, Inside, Last.</div>
        <div class="rule-item"><span class="rule-name">Factorising (Common Factor)</span>Take out the highest common factor: \\(6x + 9 = 3(2x + 3)\\)</div>
        <div class="rule-item"><span class="rule-name">Factorising Quadratics</span>\\(x^2 + bx + c = (x + p)(x + q)\\) where \\(p + q = b\\) and \\(pq = c\\)</div>
        <div class="rule-item"><span class="rule-name">Difference of Squares</span>\\(a^2 - b^2 = (a + b)(a - b)\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:combine-like-terms/v/combining-like-terms" target="_blank">Combining Like Terms</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring/x2f8bb11595b61c86:multiply-binomial/v/multiplying-binomials" target="_blank">Multiplying Binomials</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring/x2f8bb11595b61c86:factor-quadratics-intro/v/factoring-quadratic-expressions" target="_blank">Factoring Quadratics</a>
        </div>`;

    // LINEAR (Linear Equations)
    document.getElementById('linear-hint-btn').addEventListener('click', () => handleHint(LINEAR, 'linear-hint', 'linear-hint-btn'));
    document.getElementById('linear-next').addEventListener('click', () => LINEAR.load());
    document.querySelectorAll('#linear-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#linear-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            LINEAR.level = btn.dataset.level;
            LINEAR.resetScore();
            LINEAR.load();
        });
    });
    document.getElementById('linear-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">One-Step Equations</span>Perform the inverse operation. E.g., \\(x + 5 = 12 \\Rightarrow x = 12 - 5 = 7\\)</div>
        <div class="rule-item"><span class="rule-name">Two-Step Equations</span>Deal with addition/subtraction first, then multiplication/division. E.g., \\(3x + 2 = 11\\)</div>
        <div class="rule-item"><span class="rule-name">Variables on Both Sides</span>Collect variable terms on one side, constants on the other: \\(5x + 3 = 2x + 12\\)</div>
        <div class="rule-item"><span class="rule-name">Equations with Brackets</span>Expand brackets first, or divide both sides by the coefficient: \\(2(x + 3) = 10\\)</div>
        <div class="rule-item"><span class="rule-name">Equations with Fractions</span>Multiply both sides by the denominator: \\(\\frac{x}{4} = 5 \\Rightarrow x = 20\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities/x2f8bb11595b61c86:one-step-add-sub-equations/v/one-step-addition-equation" target="_blank">One-Step Equations</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities/x2f8bb11595b61c86:linear-equations-2-steps/v/solving-two-step-equations" target="_blank">Two-Step Equations</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities/x2f8bb11595b61c86:linear-equations-variables-both-sides/v/solving-linear-equations-variables-on-both-sides" target="_blank">Variables on Both Sides</a>
        </div>`;

    // SEQ (Sequences)
    document.getElementById('seq-hint-btn').addEventListener('click', () => handleHint(SEQ, 'seq-hint', 'seq-hint-btn'));
    document.getElementById('seq-next').addEventListener('click', () => SEQ.load());
    document.querySelectorAll('#seq-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#seq-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            SEQ.level = btn.dataset.level;
            SEQ.resetScore();
            SEQ.load();
        });
    });
    document.getElementById('seq-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Arithmetic Sequence</span>Add a constant (common difference \\(d\\)) each time: \\(2, 5, 8, 11, \\ldots\\) has \\(d = 3\\)</div>
        <div class="rule-item"><span class="rule-name">Arithmetic nth Term</span>\\(a_n = a + (n-1)d\\) where \\(a\\) = first term, \\(d\\) = common difference</div>
        <div class="rule-item"><span class="rule-name">Geometric Sequence</span>Multiply by a constant (common ratio \\(r\\)) each time: \\(2, 6, 18, 54, \\ldots\\) has \\(r = 3\\)</div>
        <div class="rule-item"><span class="rule-name">Geometric nth Term</span>\\(a_n = a \\cdot r^{n-1}\\) where \\(a\\) = first term, \\(r\\) = common ratio</div>
        <div class="rule-item"><span class="rule-name">Quadratic Sequence</span>Second differences are constant. E.g., \\(1, 4, 9, 16, \\ldots\\) has 2nd diff = 2</div>
        <div class="rule-item"><span class="rule-name">Finding Differences</span>1st diff = \\(a_2 - a_1\\). 2nd diff = diff of 1st diffs. Constant 2nd diff means quadratic.</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/v/arithmetic-sequences" target="_blank">Arithmetic Sequences</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-geometric-sequences/v/geometric-sequences-introduction" target="_blank">Geometric Sequences</a>
        </div>`;

    // INEQ (Inequalities)
    document.getElementById('ineq-hint-btn').addEventListener('click', () => handleHint(INEQ, 'ineq-hint', 'ineq-hint-btn'));
    document.getElementById('ineq-next').addEventListener('click', () => INEQ.load());
    document.querySelectorAll('#ineq-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#ineq-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            INEQ.level = btn.dataset.level;
            INEQ.resetScore();
            INEQ.load();
        });
    });
    document.getElementById('ineq-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Inequality Symbols</span>\\(>\\) greater than, \\(<\\) less than, \\(\\geq\\) greater or equal, \\(\\leq\\) less or equal</div>
        <div class="rule-item"><span class="rule-name">Solving Inequalities</span>Same as equations, but flip the sign when multiplying/dividing by a negative!</div>
        <div class="rule-item"><span class="rule-name">Negative Multiplication</span>\\(-2x > 6 \\Rightarrow x < -3\\) (sign flips)</div>
        <div class="rule-item"><span class="rule-name">Double Inequalities</span>\\(a < x + b < c\\) means do the same operation to all three parts.</div>
        <div class="rule-item"><span class="rule-name">Number Line</span>Open circle \\(\\circ\\) for \\(<\\) or \\(>\\). Filled circle \\(\\bullet\\) for \\(\\leq\\) or \\(\\geq\\).</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities/x2f8bb11595b61c86:one-step-inequalities/v/one-step-inequalities" target="_blank">One-Step Inequalities</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities/x2f8bb11595b61c86:two-step-inequalities/v/two-step-inequalities" target="_blank">Two-Step Inequalities</a>
        </div>`;

    // ==================== FUNCTIONS FOLDER TRAINERS ====================

    // LINF (Linear Functions)
    document.getElementById('linf-hint-btn').addEventListener('click', () => handleHint(LINF, 'linf-hint', 'linf-hint-btn'));
    document.getElementById('linf-next').addEventListener('click', () => LINF.load());
    document.querySelectorAll('#linf-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#linf-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            LINF.level = btn.dataset.level;
            LINF.resetScore();
            LINF.load();
        });
    });
    document.getElementById('linf-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Gradient-Intercept Form</span>\\(y = mx + c\\) where \\(m\\) = gradient, \\(c\\) = y-intercept</div>
        <div class="rule-item"><span class="rule-name">Gradient Formula</span>\\(m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}\\)</div>
        <div class="rule-item"><span class="rule-name">Parallel Lines</span>Same gradient: \\(m_1 = m_2\\)</div>
        <div class="rule-item"><span class="rule-name">Perpendicular Lines</span>Gradients multiply to -1: \\(m_1 \\times m_2 = -1\\)</div>
        <div class="rule-item"><span class="rule-name">Finding Equation</span>Use \\(y - y_1 = m(x - x_1)\\) with a point and gradient</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:slope/v/slope-of-a-line" target="_blank">Slope of a Line</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs/x2f8bb11595b61c86:slope-intercept-form/v/slope-intercept-form" target="_blank">Slope-Intercept Form</a>
        </div>`;

    // QUADF (Quadratic Functions)
    document.getElementById('quadf-hint-btn').addEventListener('click', () => handleHint(QUADF, 'quadf-hint', 'quadf-hint-btn'));
    document.getElementById('quadf-next').addEventListener('click', () => QUADF.load());
    document.querySelectorAll('#quadf-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#quadf-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            QUADF.level = btn.dataset.level;
            QUADF.resetScore();
            QUADF.load();
        });
    });
    document.getElementById('quadf-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Standard Form</span>\\(y = ax^2 + bx + c\\). Opens up if \\(a > 0\\), down if \\(a < 0\\)</div>
        <div class="rule-item"><span class="rule-name">Vertex Form</span>\\(y = a(x - h)^2 + k\\) where \\((h, k)\\) is the vertex</div>
        <div class="rule-item"><span class="rule-name">Factored Form</span>\\(y = a(x - p)(x - q)\\) where \\(p, q\\) are the roots</div>
        <div class="rule-item"><span class="rule-name">Axis of Symmetry</span>\\(x = -\\frac{b}{2a}\\) or \\(x = \\frac{p + q}{2}\\)</div>
        <div class="rule-item"><span class="rule-name">Discriminant</span>\\(\\Delta = b^2 - 4ac\\). If \\(\\Delta > 0\\): 2 roots, \\(\\Delta = 0\\): 1 root, \\(\\Delta < 0\\): no real roots</div>
        <div class="rule-item"><span class="rule-name">Quadratic Formula</span>\\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:quadratic-formula/v/using-the-quadratic-formula" target="_blank">Quadratic Formula</a>
            <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:vertex-form/v/graphing-a-parabola-in-vertex-form" target="_blank">Vertex Form</a>
        </div>`;

    // TRANS (Graph Transformations)
    document.getElementById('trans-hint-btn').addEventListener('click', () => handleHint(TRANS, 'trans-hint', 'trans-hint-btn'));
    document.getElementById('trans-next').addEventListener('click', () => TRANS.load());
    document.querySelectorAll('#trans-levels .level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#trans-levels .level-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            TRANS.level = btn.dataset.level;
            TRANS.resetScore();
            TRANS.load();
        });
    });
    document.getElementById('trans-ref').innerHTML = `
        <div class="rule-item"><span class="rule-name">Vertical Translation</span>\\(f(x) + a\\): shifts UP by \\(a\\). \\(f(x) - a\\): shifts DOWN by \\(a\\)</div>
        <div class="rule-item"><span class="rule-name">Horizontal Translation</span>\\(f(x + a)\\): shifts LEFT by \\(a\\). \\(f(x - a)\\): shifts RIGHT by \\(a\\)</div>
        <div class="rule-item"><span class="rule-name">Reflection in x-axis</span>\\(-f(x)\\): flips the graph vertically</div>
        <div class="rule-item"><span class="rule-name">Reflection in y-axis</span>\\(f(-x)\\): flips the graph horizontally</div>
        <div class="rule-item"><span class="rule-name">Vertical Stretch</span>\\(af(x)\\): stretches vertically by factor \\(a\\)</div>
        <div class="rule-item"><span class="rule-name">Horizontal Stretch</span>\\(f(ax)\\): compresses horizontally by factor \\(a\\)</div>
        <div class="ka-links"><strong>Khan Academy:</strong>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:transformations/x2ec2f6f830c9fb89:trans-func/v/shifting-and-reflecting-functions" target="_blank">Shifting Functions</a>
            <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:transformations/x2ec2f6f830c9fb89:trans-func/v/scaling-functions-intro" target="_blank">Scaling Functions</a>
        </div>`;

    // ==================== CRITERION B INVESTIGATIONS ====================

    // MATCH (Matchstick Patterns)
    document.getElementById('match-hint-btn').addEventListener('click', () => {
        const hint = MATCH.getHint();
        document.getElementById('match-hint').innerHTML = hint;
        document.getElementById('match-hint').classList.add('show');
        document.getElementById('match-hint-btn').disabled = true;
        document.getElementById('match-hint-btn').textContent = 'Hint Shown';
    });
    document.getElementById('match-next').addEventListener('click', () => MATCH.load());

    // NUMSUM (Number Sums)
    document.getElementById('numsum-hint-btn').addEventListener('click', () => {
        const hint = NUMSUM.getHint();
        document.getElementById('numsum-hint').innerHTML = hint;
        document.getElementById('numsum-hint').classList.add('show');
        document.getElementById('numsum-hint-btn').disabled = true;
        document.getElementById('numsum-hint-btn').textContent = 'Hint Shown';
    });
    document.getElementById('numsum-next').addEventListener('click', () => NUMSUM.load());

    // DOTS (Dot Patterns)
    document.getElementById('dots-hint-btn').addEventListener('click', () => {
        const hint = DOTS.getHint();
        document.getElementById('dots-hint').innerHTML = hint;
        document.getElementById('dots-hint').classList.add('show');
        document.getElementById('dots-hint-btn').disabled = true;
        document.getElementById('dots-hint-btn').textContent = 'Hint Shown';
    });
    document.getElementById('dots-next').addEventListener('click', () => DOTS.load());

    // Floating feedback widget
    const fbBtn = document.getElementById('fb-float-btn');
    const fbPanel = document.getElementById('fb-float-panel');
    fbBtn.addEventListener('click', () => { fbPanel.classList.toggle('show'); fbBtn.classList.toggle('hidden'); });
    document.getElementById('fb-float-close').addEventListener('click', () => { fbPanel.classList.remove('show'); fbBtn.classList.remove('hidden'); });
    document.getElementById('fb-submit').addEventListener('click', () => FEEDBACK.submit());

    // ==================== SETTINGS (custom background) ====================
    const settingsBtn = document.getElementById('settings-btn');
    const settingsDrop = document.getElementById('settings-dropdown');
    const bgOverlay = document.getElementById('bg-overlay');
    const bgUpload = document.getElementById('bg-upload');
    const bgChoose = document.getElementById('bg-choose');
    const bgClear = document.getElementById('bg-clear');
    const bgOpacity = document.getElementById('bg-opacity');
    const bgOpacityVal = document.getElementById('bg-opacity-val');

    settingsBtn.addEventListener('click', () => settingsDrop.classList.toggle('show'));

    // Extract dominant colour from image data URL
    function extractColor(dataUrl, cb) {
        const img = new Image();
        img.onload = () => {
            const c = document.createElement('canvas');
            const size = 50; // sample at tiny size for speed
            c.width = size; c.height = Math.round(size * img.height / img.width);
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, c.width, c.height);
            const d = ctx.getImageData(0, 0, c.width, c.height).data;
            // Bucket colours (ignoring very dark/light pixels)
            const buckets = {};
            for (let i = 0; i < d.length; i += 4) {
                const r = d[i], g = d[i+1], b = d[i+2];
                const lum = 0.299*r + 0.587*g + 0.114*b;
                if (lum < 30 || lum > 225) continue; // skip near-black/white
                const sat = Math.max(r,g,b) - Math.min(r,g,b);
                if (sat < 20) continue; // skip greys
                // Quantise to 8-level buckets
                const kr = (r >> 5) << 5, kg = (g >> 5) << 5, kb = (b >> 5) << 5;
                const key = kr + ',' + kg + ',' + kb;
                if (!buckets[key]) buckets[key] = { r: 0, g: 0, b: 0, count: 0 };
                buckets[key].r += r; buckets[key].g += g; buckets[key].b += b;
                buckets[key].count++;
            }
            let best = null, bestCount = 0;
            for (const k in buckets) {
                if (buckets[k].count > bestCount) { best = buckets[k]; bestCount = buckets[k].count; }
            }
            if (best) {
                const r = Math.round(best.r / best.count);
                const g = Math.round(best.g / best.count);
                const b = Math.round(best.b / best.count);
                // Boost saturation slightly for a vibrant accent
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                const mid = (max + min) / 2;
                const boost = (v) => Math.round(Math.min(255, Math.max(0, mid + (v - mid) * 1.3)));
                cb('rgb(' + boost(r) + ',' + boost(g) + ',' + boost(b) + ')');
            }
        };
        img.src = dataUrl;
    }

    window.applyAccentColor = function() {
        const color = localStorage.getItem('customBgColor');
        if (color) {
            document.documentElement.style.setProperty('--primary', color);
            // Derive a light version
            const m = color.match(/\d+/g);
            if (m) document.documentElement.style.setProperty('--primary-light', 'rgba(' + m[0] + ',' + m[1] + ',' + m[2] + ',0.12)');
        } else {
            document.documentElement.style.removeProperty('--primary');
            document.documentElement.style.removeProperty('--primary-light');
        }
    }

    // Apply saved background on load
    window.applyBg = function() {
        const data = localStorage.getItem('customBg');
        const opacity = parseInt(localStorage.getItem('customBgOpacity') || '15') / 100;
        if (data) {
            bgOverlay.style.backgroundImage = 'url(' + data + ')';
            bgOverlay.style.opacity = opacity;
            bgClear.style.display = '';
            document.body.classList.add('has-bg');
            applyAccentColor();
            updateCardStyle(Math.round(opacity * 100));
        } else {
            bgOverlay.style.backgroundImage = '';
            bgClear.style.display = 'none';
            document.body.classList.remove('has-bg');
            applyAccentColor();
        }
        bgOpacity.value = Math.round(opacity * 100);
        bgOpacityVal.textContent = Math.round(opacity * 100) + '%';
    }
    applyBg();

    bgChoose.addEventListener('click', () => bgUpload.click());
    bgUpload.addEventListener('change', () => {
        const file = bgUpload.files[0];
        if (!file) return;
        const img = new Image();
        img.onload = () => {
            // Resize to max 1920px wide for localStorage friendliness
            const maxW = 1920;
            let w = img.width, h = img.height;
            if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            try {
                localStorage.setItem('customBg', dataUrl);
                extractColor(dataUrl, (color) => {
                    localStorage.setItem('customBgColor', color);
                    applyAccentColor();
                    if (typeof Auth !== 'undefined') Auth.saveAndSync();
                });
                applyBg();
            } catch (e) {
                alert('Image too large for localStorage. Try a smaller image.');
            }
        };
        img.src = URL.createObjectURL(file);
        bgUpload.value = '';
    });

    bgClear.addEventListener('click', () => {
        localStorage.removeItem('customBg');
        localStorage.removeItem('customBgColor');
        applyBg();
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
    });

    function updateCardStyle(v) {
        const t = v / 100; // 0–1
        // Cards get more opaque as bg gets more visible
        const cardAlpha = 0.65 + 0.3 * t; // 0.65 → 0.95
        const blurPx = 8 + 12 * t; // 8px → 20px
        document.documentElement.style.setProperty('--bg-card-alpha', cardAlpha);
        document.documentElement.style.setProperty('--bg-blur', blurPx + 'px');
        // Text gets darker/bolder at high opacity
        const textDark = Math.round(20 - 10 * t); // rgb ~20 → ~10
        document.documentElement.style.setProperty('--bg-text', 'rgb(' + textDark + ',' + textDark + ',' + (textDark + 8) + ')');
        document.documentElement.style.setProperty('--bg-text-weight', t > 0.4 ? '700' : '600');
    }

    bgOpacity.addEventListener('input', () => {
        const v = bgOpacity.value;
        bgOpacityVal.textContent = v + '%';
        bgOverlay.style.opacity = v / 100;
        localStorage.setItem('customBgOpacity', v);
        updateCardStyle(parseInt(v));
    });

    // Calculator setup with Desmos Graphing Calculator API (supports getExpressions)
    window.desmosCalc = null;
    document.getElementById('calc-btn').addEventListener('click', () => {
        const modal = document.getElementById('calc-modal');
        const btn = document.getElementById('calc-btn');
        modal.classList.toggle('show');
        btn.classList.toggle('active');
        // Initialize Desmos on first open
        if (!window.desmosCalc && modal.classList.contains('show')) {
            const container = document.getElementById('calc-container');
            window.desmosCalc = Desmos.GraphingCalculator(container, {
                keypad: true,
                expressions: true,
                settingsMenu: false,
                zoomButtons: false,
                expressionsTopbar: false,
                pointsOfInterest: false,
                trace: false,
                border: false,
                lockViewport: true,
                xAxisNumbers: false,
                yAxisNumbers: false,
                showGrid: false
            });
        }
    });

    // Enter key for next question after answering
    let lastAnswerTime = 0;
    document.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        // Don't trigger if typing in textarea or math-field
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === 'textarea' || tag === 'math-field') return;
        // Debounce: ignore if less than 300ms since answer was submitted
        if (Date.now() - lastAnswerTime < 300) return;

        // Check which trainer is active and answered
        if (document.getElementById('view-log-rules').classList.contains('active') && LR.answered) {
            e.preventDefault(); LR.load();
        } else if (document.getElementById('view-log-simul').classList.contains('active') && SE.answered) {
            e.preventDefault(); SE.load();
        } else if (document.getElementById('view-log-mastery-practice').classList.contains('active') && LA.answered) {
            e.preventDefault(); LA.load();
        } else if (document.getElementById('view-quad-areas').classList.contains('active') && QA.answered) {
            e.preventDefault(); QA.load();
        } else if (document.getElementById('view-num-fdp').classList.contains('active') && FDP.answered) {
            e.preventDefault(); FDP.load();
        } else if (document.getElementById('view-num-hcflcm').classList.contains('active') && HCFLCM.answered) {
            e.preventDefault(); HCFLCM.load();
        } else if (document.getElementById('view-num-indices').classList.contains('active') && IDX.answered) {
            e.preventDefault(); IDX.load();
        } else if (document.getElementById('view-num-stdform').classList.contains('active') && SF.answered) {
            e.preventDefault(); SF.load();
        } else if (document.getElementById('view-num-surds').classList.contains('active') && SURD.answered) {
            e.preventDefault(); SURD.load();
        } else if (document.getElementById('view-num-ratio').classList.contains('active') && RATIO.answered) {
            e.preventDefault(); RATIO.load();
        } else if (document.getElementById('view-alg-expr').classList.contains('active') && EXPR.answered) {
            e.preventDefault(); EXPR.load();
        } else if (document.getElementById('view-alg-linear').classList.contains('active') && LINEAR.answered) {
            e.preventDefault(); LINEAR.load();
        } else if (document.getElementById('view-alg-seq').classList.contains('active') && SEQ.answered) {
            e.preventDefault(); SEQ.load();
        } else if (document.getElementById('view-alg-ineq').classList.contains('active') && INEQ.answered) {
            e.preventDefault(); INEQ.load();
        } else if (document.getElementById('view-func-linear').classList.contains('active') && LINF.answered) {
            e.preventDefault(); LINF.load();
        } else if (document.getElementById('view-func-quadratic').classList.contains('active') && QUADF.answered) {
            e.preventDefault(); QUADF.load();
        } else if (document.getElementById('view-func-transform').classList.contains('active') && TRANS.answered) {
            e.preventDefault(); TRANS.load();
        } else if (document.getElementById('view-crit-matchstick').classList.contains('active') && document.getElementById('match-next').classList.contains('show')) {
            e.preventDefault(); MATCH.load();
        } else if (document.getElementById('view-crit-number').classList.contains('active') && document.getElementById('numsum-next').classList.contains('show')) {
            e.preventDefault(); NUMSUM.load();
        } else if (document.getElementById('view-crit-dots').classList.contains('active') && document.getElementById('dots-next').classList.contains('show')) {
            e.preventDefault(); DOTS.load();
        }
    });
    // Track when answers are submitted
    window.markAnswered = () => { lastAnswerTime = Date.now(); };

    // Fetch last commit date from GitHub API
    fetch('https://api.github.com/repos/southernskiesmusic/myp-extended-maths-trainer/commits?per_page=1')
        .then(r => r.json())
        .then(data => {
            if (data[0]?.commit?.author?.date) {
                const d = new Date(data[0].commit.author.date);
                const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
                document.getElementById('last-updated').textContent = 'Last updated: ' + d.toLocaleDateString('en-AU', options);
            }
        })
        .catch(() => {
            document.getElementById('last-updated').textContent = 'Last updated: recently';
        });

    renderMath();
});

/* ================================================================
   LESSON ENGINE — Reusable framework for guided lessons
   ================================================================ */
const LessonEngine = {
    lesson: null,
    screenIdx: 0,
    folder: null,
    practiceQ: null,
    practiceAnswered: false,
    practiceCorrect: 0,
    practiceTotal: 0,
    exampleStepIdx: 0,

    start(lesson) {
        this.lesson = lesson;
        this.screenIdx = 0;
        this.folder = lesson.folder;
        this.practiceCorrect = 0;
        this.practiceTotal = 0;
        showView('lesson');
        this.renderScreen();
    },

    renderScreen() {
        const screen = this.lesson.screens[this.screenIdx];
        const total = this.lesson.screens.length;

        // Update progress bar
        document.getElementById('lesson-progress-fill').style.width =
            ((this.screenIdx + 1) / total * 100) + '%';

        // Update title
        document.getElementById('lesson-title').textContent = this.lesson.title;
        document.getElementById('lesson-subtitle').textContent =
            this.lesson.subtitle + '  —  ' + (this.screenIdx + 1) + ' / ' + total;

        const content = document.getElementById('lesson-content');
        const nav = document.getElementById('lesson-nav');

        if (screen.type === 'concept') this.renderConcept(screen, content, nav);
        else if (screen.type === 'example') this.renderExample(screen, content, nav);
        else if (screen.type === 'practice') this.renderPractice(screen, content, nav);
        else if (screen.type === 'summary') this.renderSummary(screen, content, nav);

        renderMath();
    },

    renderConcept(screen, content, nav) {
        content.innerHTML =
            '<h3>' + screen.title + '</h3>' + screen.html;
        nav.innerHTML =
            '<button class="btn btn-primary" onclick="LessonEngine.advance()">Continue</button>';
    },

    renderExample(screen, content, nav) {
        this.exampleStepIdx = 0;
        let h = '<h3>' + screen.title + '</h3>' +
            '<p class="question-prompt" style="font-size:1.15rem;margin-bottom:16px;">\\(' + screen.problem + '\\)</p>';
        screen.steps.forEach((step, i) => {
            h += '<div class="lesson-step" id="lesson-step-' + i + '">' + step.text + '</div>';
        });
        content.innerHTML = h;
        nav.innerHTML =
            '<button class="btn btn-primary" id="lesson-reveal-btn" onclick="LessonEngine.revealStep()">Reveal Next Step</button>' +
            '<button class="btn btn-primary" id="lesson-continue-btn" onclick="LessonEngine.advance()" style="display:none;">Continue</button>';
    },

    revealStep() {
        const screen = this.lesson.screens[this.screenIdx];
        const stepEl = document.getElementById('lesson-step-' + this.exampleStepIdx);
        if (stepEl) {
            stepEl.classList.add('revealed');
            renderMath();
        }
        this.exampleStepIdx++;
        if (this.exampleStepIdx >= screen.steps.length) {
            document.getElementById('lesson-reveal-btn').style.display = 'none';
            document.getElementById('lesson-continue-btn').style.display = '';
        }
    },

    renderPractice(screen, content, nav) {
        this.practiceAnswered = false;
        this.practiceQ = screen.generate();
        const q = this.practiceQ;

        let h = '<h3>' + (screen.intro || 'Try this one:') + '</h3>' +
            '<div class="question-prompt" style="font-size:1.15rem;margin:16px 0;">\\(' + q.latex + '\\)</div>';

        if (q.text) h = '<h3>' + (screen.intro || 'Try this one:') + '</h3>' +
            '<div class="question-text">' + q.text + '</div>' +
            '<div class="question-prompt" style="font-size:1.15rem;margin:16px 0;">\\(' + q.latex + '\\)</div>';

        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o, i) => {
                h += '<button class="option-btn" data-i="' + i + '" onclick="LessonEngine.checkMC(this)">' +
                    '\\(' + o + '\\)</button>';
            });
            h += '</div>';
        } else {
            h += '<div class="input-area">' +
                '<math-field class="lr-math-field" id="lesson-mf" placeholder="?"></math-field>' +
                '<button class="btn btn-primary" id="lesson-check-btn" onclick="LessonEngine.checkFree()">Check</button>' +
                '</div>';
        }

        h += '<div class="feedback" id="lesson-fb"><div class="feedback-title" id="lesson-fb-title"></div>' +
            '<div class="feedback-explanation" id="lesson-fb-expl"></div></div>';

        content.innerHTML = h;
        nav.innerHTML = '';

        // Set up Enter key on math field after render
        setTimeout(() => {
            const mf = document.getElementById('lesson-mf');
            if (mf) mf.addEventListener('keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); LessonEngine.checkFree(); }
            });
        }, 200);
    },

    checkMC(btn) {
        if (this.practiceAnswered) return;
        this.practiceAnswered = true;
        this.practiceTotal++;
        const q = this.practiceQ;
        const chosen = q.options[parseInt(btn.dataset.i)];
        const correct = chosen === q.answer;
        if (correct) this.practiceCorrect++;

        // Highlight buttons
        document.querySelectorAll('#lesson-content .option-btn').forEach(b => {
            const val = q.options[parseInt(b.dataset.i)];
            if (val === q.answer) b.classList.add('correct');
            else if (b === btn) b.classList.add('incorrect');
            b.disabled = true;
        });

        this.showPracticeFeedback(correct, q);
    },

    checkFree() {
        if (this.practiceAnswered) return;
        const mf = document.getElementById('lesson-mf');
        if (!mf) return;
        const raw = mf.value || '';
        const parsed = parseLatex(raw);
        if (parsed === null || raw.trim() === '') return;

        this.practiceAnswered = true;
        this.practiceTotal++;
        const q = this.practiceQ;
        const correct = (Math.abs(parsed - q.answer) < 0.01);
        if (correct) this.practiceCorrect++;

        this.showPracticeFeedback(correct, q);
    },

    showPracticeFeedback(correct, q) {
        const fb = document.getElementById('lesson-fb');
        const title = document.getElementById('lesson-fb-title');
        const expl = document.getElementById('lesson-fb-expl');
        fb.classList.add('show', correct ? 'correct' : 'incorrect');
        title.textContent = correct ? 'Correct!' : 'Not quite';
        expl.innerHTML = q.explain || '';
        renderMath();

        document.getElementById('lesson-nav').innerHTML =
            '<button class="btn btn-primary" onclick="LessonEngine.advance()">Continue</button>';
    },

    renderSummary(screen, content, nav) {
        let h = '<h3>' + screen.title + '</h3>';
        if (this.practiceTotal > 0) {
            h += '<div class="lesson-score">Practice score: <strong>' +
                this.practiceCorrect + ' / ' + this.practiceTotal + '</strong></div>';
        }
        h += screen.html;
        content.innerHTML = h;

        let navH = '';
        if (screen.nextActivity) {
            navH += '<button class="btn btn-primary" onclick="LessonEngine.goToActivity(\'' +
                screen.nextActivity + '\')">Start Practising</button>';
        }
        navH += '<button class="btn btn-hint" onclick="showView(\'' + this.folder + '\')">Back to Topics</button>';
        nav.innerHTML = navH;
    },

    goToActivity(topic) {
        // Trigger the topic card click handler
        const card = document.querySelector('[data-topic="' + topic + '"]');
        if (card) card.click();
    },

    advance() {
        this.screenIdx++;
        if (this.screenIdx >= this.lesson.screens.length) {
            showView(this.folder);
            return;
        }
        this.renderScreen();
        // Scroll to top
        window.scrollTo(0, 0);
    }
};

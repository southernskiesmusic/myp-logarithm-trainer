/* ================================================================
   ACHIEVEMENTS SYSTEM
   ================================================================ */
const ACHIEVEMENTS = {
    _key: 'achievements',

    defs: [
        { id: 'first-10',     name: 'First Steps',   icon: '\u2B50', desc: 'Answer 10 questions',         check: s => s.totalQ >= 10 },
        { id: 'century',       name: 'Century',        icon: '\uD83D\uDCAF', desc: '100 questions answered',      check: s => s.totalQ >= 100 },
        { id: 'streak-5',     name: 'On Fire',        icon: '\uD83D\uDD25', desc: '5 correct in a row',          check: s => s.bestStreak >= 5 },
        { id: 'streak-20',    name: 'Unstoppable',    icon: '\u26A1',  desc: '20 correct in a row',         check: s => s.bestStreak >= 20 },
        { id: 'perfect-10',   name: 'Perfectionist',  icon: '\uD83D\uDC8E', desc: '10/10 in one session',        check: s => s.perfectSession },
        { id: 'daily-3',      name: 'Consistent',     icon: '\uD83D\uDCC5', desc: '3-day streak',                 check: s => s.dayStreak >= 3 },
        { id: 'daily-7',      name: 'Weekly Warrior',  icon: '\uD83D\uDCAA', desc: '7-day streak',                 check: s => s.dayStreak >= 7 },
        { id: 'daily-30',     name: 'Monthly Master',  icon: '\uD83D\uDC51', desc: '30-day streak',                check: s => s.dayStreak >= 30 },
        { id: 'lesson-1',     name: 'Student',        icon: '\uD83D\uDCD6', desc: 'Complete 1 lesson',            check: s => s.lessonsComplete >= 1 },
        { id: 'lesson-5',     name: 'Scholar',        icon: '\uD83C\uDF93', desc: 'Complete 5 lessons',           check: s => s.lessonsComplete >= 5 },
        { id: 'lesson-all',   name: 'Graduate',       icon: '\uD83C\uDFC6', desc: 'Complete all lessons',         check: s => s.allLessons },
        { id: 'topic-all',    name: 'Explorer',       icon: '\uD83E\uDDED', desc: 'Answer in all 5 topic areas',  check: s => s.topicsCovered >= 5 },
        { id: 'speed-1',      name: 'Speed Demon',    icon: '\u23F1\uFE0F', desc: 'Complete a timed challenge',   check: s => s.timedDone >= 1 },
        { id: 'speed-perfect', name: 'Lightning',     icon: '\uD83C\uDF29\uFE0F', desc: '100% on a timed challenge',   check: s => s.timedPerfect },
        { id: 'feedback-1',   name: 'Voice Heard',    icon: '\uD83D\uDCAC', desc: 'Send feedback',                check: s => s.feedbackSent }
    ],

    // Gather stats from localStorage and check all achievements
    check() {
        try {
            const stats = this._gatherStats();
            const unlocked = this._load();
            this.defs.forEach(d => {
                if (!unlocked[d.id] && d.check(stats)) this.unlock(d.id);
            });
        } catch (e) { console.error('Achievement check error:', e); }
    },

    _gatherStats() {
        const ts = JSON.parse(localStorage.getItem('trainerStats') || '{}');
        const ds = JSON.parse(localStorage.getItem('dailyStreak') || '{}');
        const lp = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
        const tc = JSON.parse(localStorage.getItem('timedChallenges') || '{}');

        let totalQ = 0, bestStreak = 0, perfectSession = false;
        const topicPrefixes = {
            logarithms: ['lr', 'se'],
            number: ['fdp', 'hcflcm', 'idx', 'sf', 'surd', 'ratio'],
            algebra: ['expr', 'linear', 'seq', 'ineq'],
            functions: ['linf', 'quadf', 'trans'],
            quadratics: ['qa']
        };
        let topicsCovered = 0;

        for (const topic in topicPrefixes) {
            let covered = false;
            topicPrefixes[topic].forEach(p => {
                const s = ts[p];
                if (s) {
                    totalQ += s.total || 0;
                    const bs = Math.max(s.bestStreak || 0, s.streak || 0);
                    if (bs > bestStreak) bestStreak = bs;
                    if ((s.total || 0) >= 10 && (s.score || 0) === (s.total || 0)) perfectSession = true;
                    if ((s.total || 0) > 0) covered = true;
                }
            });
            if (covered) topicsCovered++;
        }

        const allLessonIds = [
            'log-intro','log-rules','log-natural','log-expand','log-equations',
            'indices','surds','expressions','linear-eq','sequences',
            'linear-func','quadratic-func','transformations',
            'factorising-quad','completing-square'
        ];
        const lessonsComplete = allLessonIds.filter(id => lp[id] && lp[id].completed).length;
        const allLessons = lessonsComplete >= allLessonIds.length;

        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        let dayStreak = 0;
        if (ds.lastDate === today || ds.lastDate === yesterday) dayStreak = ds.current || 0;

        let timedDone = 0, timedPerfect = false;
        for (const k in tc) {
            if (tc[k].total > 0) { timedDone++; }
            if (tc[k].total > 0 && tc[k].score === tc[k].total) timedPerfect = true;
        }

        const feedbackSent = !!(localStorage.getItem('pendingFeedback') && JSON.parse(localStorage.getItem('pendingFeedback')).length > 0)
            || !!localStorage.getItem('feedbackSent');

        return { totalQ, bestStreak, perfectSession, dayStreak, lessonsComplete, allLessons, topicsCovered, timedDone, timedPerfect, feedbackSent };
    },

    // Unlock an achievement
    unlock(id) {
        const unlocked = this._load();
        if (unlocked[id]) return;
        unlocked[id] = Date.now();
        localStorage.setItem(this._key, JSON.stringify(unlocked));
        const def = this.defs.find(d => d.id === id);
        if (def) this.showToast(def);
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
    },

    // Animated toast notification
    showToast(def) {
        const el = document.createElement('div');
        el.className = 'ach-toast';
        el.innerHTML = '<span class="ach-toast-icon">' + def.icon + '</span>' +
            '<div class="ach-toast-text"><strong>Achievement Unlocked!</strong><br>' + def.name + '</div>';
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 400);
        }, 3000);
    },

    // Get all achievements with unlock status
    getAll() {
        const unlocked = this._load();
        return this.defs.map(d => ({
            ...d,
            unlocked: !!unlocked[d.id],
            ts: unlocked[d.id] || null
        }));
    },

    // Render achievement gallery HTML for dashboard
    renderGallery() {
        const all = this.getAll();
        const count = all.filter(a => a.unlocked).length;
        let h = '<div class="dash-topic" style="margin-top:8px;">';
        h += '<div class="dash-topic-header">Achievements <span class="dash-lesson-count">' + count + ' / ' + all.length + ' unlocked</span></div>';
        h += '<div class="ach-grid">';
        all.forEach(a => {
            const cls = a.unlocked ? 'ach-card' : 'ach-card locked';
            h += '<div class="' + cls + '">';
            h += '<div class="ach-icon">' + (a.unlocked ? a.icon : '\uD83D\uDD12') + '</div>';
            h += '<div class="ach-name">' + (a.unlocked ? a.name : '???') + '</div>';
            h += '<div class="ach-desc">' + (a.unlocked ? a.desc : 'Keep playing to unlock') + '</div>';
            h += '</div>';
        });
        h += '</div></div>';
        return h;
    },

    _load() {
        try { return JSON.parse(localStorage.getItem(this._key) || '{}'); } catch (e) { return {}; }
    }
};

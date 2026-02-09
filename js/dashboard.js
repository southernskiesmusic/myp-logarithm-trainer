/* ================================================================
   PROGRESS DASHBOARD
   ================================================================ */
const DASHBOARD = {
    topics: [
        { name: 'Logarithms', trainers: [
            { prefix: 'lr', label: 'Log Rules' },
            { prefix: 'se', label: 'Simultaneous Equations' }
        ], lessonIds: ['log-intro','log-rules','log-natural','log-expand','log-equations'] },
        { name: 'Number', trainers: [
            { prefix: 'fdp', label: 'FDP' },
            { prefix: 'hcflcm', label: 'HCF & LCM' },
            { prefix: 'idx', label: 'Indices' },
            { prefix: 'sf', label: 'Standard Form' },
            { prefix: 'surd', label: 'Surds' },
            { prefix: 'ratio', label: 'Ratios' }
        ], lessonIds: ['indices','surds'] },
        { name: 'Algebra', trainers: [
            { prefix: 'expr', label: 'Expressions' },
            { prefix: 'linear', label: 'Linear Equations' },
            { prefix: 'seq', label: 'Sequences' },
            { prefix: 'ineq', label: 'Inequalities' }
        ], lessonIds: ['expressions','linear-eq','sequences'] },
        { name: 'Functions & Graphs', trainers: [
            { prefix: 'linf', label: 'Linear Functions' },
            { prefix: 'quadf', label: 'Quadratic Functions' },
            { prefix: 'trans', label: 'Transformations' }
        ], lessonIds: ['linear-func','quadratic-func','transformations'] },
        { name: 'Quadratics', trainers: [
            { prefix: 'qa', label: 'Expressions & Areas' }
        ], lessonIds: ['factorising-quad','completing-square'] }
    ],

    render() {
        const stats = getAllTrainerStats();
        const lp = JSON.parse(localStorage.getItem('lessonProgress') || '{}');

        let totalQ = 0, totalCorrect = 0, bestStreak = 0, lessonsComplete = 0;
        const allLessonIds = [];

        this.topics.forEach(t => {
            t.trainers.forEach(tr => {
                const s = stats[tr.prefix];
                if (s) {
                    totalQ += s.total || 0;
                    totalCorrect += s.score || 0;
                    if ((s.bestStreak || 0) > bestStreak) bestStreak = s.bestStreak;
                    if ((s.streak || 0) > bestStreak) bestStreak = s.streak;
                }
            });
            t.lessonIds.forEach(id => {
                allLessonIds.push(id);
                if (lp[id]) lessonsComplete++;
            });
        });

        const accuracy = totalQ > 0 ? Math.round(totalCorrect / totalQ * 100) : 0;
        const ds = getDailyStreak();

        let h = '<div class="dash-overview">';
        h += this._statCard('Day Streak', ds.current || 0, '#ffc107');
        h += this._statCard('Questions', totalQ, 'var(--primary)');
        h += this._statCard('Accuracy', totalQ > 0 ? accuracy + '%' : '\u2014', 'var(--success)');
        h += this._statCard('Lessons', lessonsComplete + ' / ' + allLessonIds.length, 'var(--primary)');
        h += '</div>';

        this.topics.forEach(t => {
            const lessonsDone = t.lessonIds.filter(id => lp[id]).length;
            h += '<div class="dash-topic">';
            h += '<div class="dash-topic-header">' + t.name;
            if (t.lessonIds.length > 0) {
                h += ' <span class="dash-lesson-count">' + lessonsDone + '/' + t.lessonIds.length + ' lessons</span>';
            }
            h += '</div>';

            t.trainers.forEach(tr => {
                const s = stats[tr.prefix];
                const total = s?.total || 0;
                const score = s?.score || 0;
                const streak = s?.streak || 0;
                const pct = total > 0 ? Math.round(score / total * 100) : 0;

                h += '<div class="dash-row">';
                h += '<span class="dash-row-label">' + tr.label + '</span>';
                h += '<div class="dash-row-bar"><div class="dash-row-fill" style="width:' + pct + '%;background:' + this._barColor(pct) + '"></div></div>';
                h += '<span class="dash-row-stat">' + score + '/' + total + '</span>';
                if (total > 0) h += '<span class="dash-row-pct">' + pct + '%</span>';
                else h += '<span class="dash-row-pct">\u2014</span>';
                h += '</div>';
            });

            h += '</div>';
        });

        // Achievements gallery
        if (typeof ACHIEVEMENTS !== 'undefined') h += ACHIEVEMENTS.renderGallery();

        document.getElementById('dash-content').innerHTML = h;
    },

    _statCard(label, value, color) {
        return '<div class="dash-stat"><div class="dash-stat-value" style="color:' + color + '">' + value + '</div><div class="dash-stat-label">' + label + '</div></div>';
    },

    _barColor(pct) {
        if (pct >= 80) return 'var(--success)';
        if (pct >= 50) return 'var(--primary)';
        if (pct >= 25) return '#ffc107';
        return 'var(--error)';
    }
};

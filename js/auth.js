/* ================================================================
   AUTH + CLOUD SYNC
   Uses Firebase Auth (Google) + Firestore
   Falls back to localStorage when not signed in
   ================================================================ */
const Auth = {
    user: null,
    db: null,
    _ready: false,

    init() {
        // Skip if config not set
        if (!FIREBASE_CONFIG || FIREBASE_CONFIG.apiKey === 'PASTE_YOUR_API_KEY') {
            console.log('Firebase not configured — using localStorage only');
            this._ready = true;
            return;
        }

        // Initialize Firebase
        firebase.initializeApp(FIREBASE_CONFIG);
        this.db = firebase.firestore();

        // Listen for auth state
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            this._ready = true;
            this.updateUI();
            if (user) this.pullFromCloud();
        });
    },

    // ── Sign in / out ──────────────────────────────────────────
    signIn() {
        if (!this.db) return;
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(e => {
            console.error('Sign-in failed:', e.message);
        });
    },

    signOut() {
        if (!this.db) return;
        // Clear personal bg before reload
        localStorage.removeItem('customBg');
        localStorage.removeItem('customBgColor');
        localStorage.removeItem('customBgOpacity');
        firebase.auth().signOut().then(() => location.reload());
    },

    // ── UI ──────────────────────────────────────────────────────
    updateUI() {
        const btn = document.getElementById('auth-btn');
        const info = document.getElementById('auth-info');
        if (!btn) return;

        if (this.user) {
            const name = this.user.displayName || this.user.email || 'User';
            const photo = this.user.photoURL;
            info.innerHTML = (photo ? '<img src="' + photo + '" class="auth-avatar" alt="">' : '') +
                '<span class="auth-name">' + name.split(' ')[0] + '</span>';
            btn.textContent = 'Sign out';
            btn.onclick = () => Auth.signOut();
        } else {
            info.innerHTML = '';
            btn.textContent = 'Sign in';
            btn.onclick = () => Auth.signIn();
        }
    },

    // ── Cloud sync ─────────────────────────────────────────────
    _docRef() {
        if (!this.db || !this.user) return null;
        return this.db.collection('users').doc(this.user.uid);
    },

    // Pull cloud data → merge into localStorage
    async pullFromCloud() {
        const ref = this._docRef();
        if (!ref) return;
        try {
            const doc = await ref.get();
            if (doc.exists) {
                const cloud = doc.data();
                // LA mastery data — cloud wins if it exists
                if (cloud.logMastery) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloud.logMastery));
                    LA.loadData();
                }
                // Lesson completion
                if (cloud.lessons) {
                    localStorage.setItem('lessonProgress', JSON.stringify(cloud.lessons));
                }
                // Trainer stats
                if (cloud.trainerStats) {
                    localStorage.setItem('trainerStats', JSON.stringify(cloud.trainerStats));
                }
                // Custom background
                if (cloud.customBg) {
                    localStorage.setItem('customBg', cloud.customBg);
                    if (cloud.customBgColor) localStorage.setItem('customBgColor', cloud.customBgColor);
                    if (cloud.customBgOpacity) localStorage.setItem('customBgOpacity', cloud.customBgOpacity);
                    // Re-apply background after restoring
                    if (typeof applyBg === 'function') applyBg();
                    else location.reload();
                }
                console.log('Synced from cloud');
            } else {
                // First sign-in: push local data up
                this.pushToCloud();
            }
        } catch (e) {
            console.error('Cloud pull failed:', e.message);
        }
    },

    // Push localStorage → cloud
    async pushToCloud() {
        const ref = this._docRef();
        if (!ref) return;
        try {
            const data = {};
            // LA mastery
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) data.logMastery = JSON.parse(raw);
            // Lesson progress
            const lp = localStorage.getItem('lessonProgress');
            if (lp) data.lessons = JSON.parse(lp);
            // Trainer stats
            const ts = localStorage.getItem('trainerStats');
            if (ts) data.trainerStats = JSON.parse(ts);
            // Custom background
            const bg = localStorage.getItem('customBg');
            if (bg) {
                data.customBg = bg;
                const bgc = localStorage.getItem('customBgColor');
                if (bgc) data.customBgColor = bgc;
                const bgo = localStorage.getItem('customBgOpacity');
                if (bgo) data.customBgOpacity = bgo;
            } else {
                // Clear from cloud if removed locally
                data.customBg = firebase.firestore.FieldValue.delete();
                data.customBgColor = firebase.firestore.FieldValue.delete();
                data.customBgOpacity = firebase.firestore.FieldValue.delete();
            }

            data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            await ref.set(data, { merge: true });
        } catch (e) {
            console.error('Cloud push failed:', e.message);
        }
    },

    // Called after any data change (LA answer, lesson complete, etc.)
    saveAndSync() {
        // Debounce cloud writes
        clearTimeout(this._syncTimer);
        this._syncTimer = setTimeout(() => this.pushToCloud(), 2000);
    }
};

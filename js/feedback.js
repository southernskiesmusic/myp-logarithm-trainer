/* ================================================================
   FEEDBACK — save to Firestore 'feedback' collection
   ================================================================ */
const FEEDBACK = {
    submit() {
        const msg = document.getElementById('fb-message').value.trim();
        const type = document.getElementById('fb-type').value;
        if (!msg) { alert('Please enter a message.'); return; }

        const btn = document.getElementById('fb-submit');
        btn.disabled = true;
        btn.textContent = 'Sending\u2026';

        // Try Firestore first, fall back to localStorage
        if (Auth.db) {
            Auth.db.collection('feedback').add({
                type: type,
                message: msg,
                user: Auth.user ? Auth.user.email : 'anonymous',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                this._success();
            }).catch(e => {
                console.error('Feedback error:', e.message);
                this._saveFallback(type, msg);
                this._success();
            });
        } else {
            this._saveFallback(type, msg);
            this._success();
        }
    },

    _saveFallback(type, msg) {
        try {
            const all = JSON.parse(localStorage.getItem('pendingFeedback') || '[]');
            all.push({ type, message: msg, ts: Date.now() });
            localStorage.setItem('pendingFeedback', JSON.stringify(all));
        } catch (e) {}
    },

    _success() {
        document.getElementById('fb-message').value = '';
        document.getElementById('fb-submit').disabled = false;
        document.getElementById('fb-submit').textContent = 'Send Feedback';
        document.getElementById('fb-confirmation').classList.add('show');
        setTimeout(() => document.getElementById('fb-confirmation').classList.remove('show'), 3000);
    }
};

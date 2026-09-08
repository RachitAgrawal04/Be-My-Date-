/**
 * ═══════════════════════════════════════════════════════════
 *  ENVELOPES ENGINE — "Open when..." interactive envelopes
 * ═══════════════════════════════════════════════════════════
 */

const Envelopes = {
    openedCount: 0,
    totalCount: 0,

    init() {
        if (!CONFIG.envelopesEnabled) return;

        const grid = document.getElementById('envelopes-grid');
        if (!grid) return;

        this.totalCount = CONFIG.envelopes.length;

        CONFIG.envelopes.forEach((env, index) => {
            const card = document.createElement('div');
            card.className = 'envelope-card';
            card.setAttribute('data-index', index);
            card.style.animationDelay = `${index * 0.1}s`;

            const emoji = document.createElement('div');
            emoji.className = 'envelope-card-emoji';
            emoji.textContent = env.emoji || '💌';

            const copy = document.createElement('div');
            const label = document.createElement('div');
            label.className = 'envelope-card-label';
            label.textContent = env.label || '';

            const hint = document.createElement('div');
            hint.className = 'envelope-card-hint';
            hint.textContent = 'tap to open';

            copy.append(label, hint);
            card.append(emoji, copy);

            card.addEventListener('click', () => this.openEnvelope(index, card));
            grid.appendChild(card);
        });
    },

    openEnvelope(index, cardElement) {
        const env = CONFIG.envelopes[index];
        if (!env) return;

        // Mark as opened
        if (!cardElement.classList.contains('opened')) {
            cardElement.classList.add('opened');
            this.openedCount++;

            // Update hint text
            const hint = cardElement.querySelector('.envelope-card-hint');
            if (hint) hint.textContent = 'opened ✨';
        }

        // Show popup
        const popup = document.getElementById('envelope-popup');
        const title = document.getElementById('envelope-popup-title');
        const message = document.getElementById('envelope-message');
        const closeBtn = document.getElementById('close-envelope');

        if (popup && title && message) {
            title.textContent = `${env.emoji || '💌'} ${env.label}`;
            message.textContent = env.message;
            popup.classList.remove('hidden');
            popup.style.display = 'flex';
        }

        // Close handlers
        if (closeBtn) {
            closeBtn.onclick = () => this.closePopup();
        }
        if (popup) {
            popup.onclick = (e) => {
                if (e.target === popup) this.closePopup();
            };
        }
    },

    closePopup() {
        const popup = document.getElementById('envelope-popup');
        if (popup) {
            popup.classList.add('hidden');
            popup.style.display = 'none';
        }
    }
};

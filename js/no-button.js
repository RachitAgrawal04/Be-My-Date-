/**
 * NO-BUTTON EASTER EGG
 *
 * The button is always reachable and remains a real choice. The gag is a
 * short sequence of increasingly dramatic messages, followed by an explicit
 * "No, really" button for anyone who means it.
 */

const NoButton = {
    noBtn: null,
    realNoBtn: null,
    hintEl: null,
    clickCount: 0,
    isConfirmed: false,

    defaultMessages: [
        'Are you sure?',
        'You are making this unnecessarily difficult.',
        'Okay. I respect your decision.',
        'Just kidding. There is another button.'
    ],

    init() {
        this.noBtn = document.getElementById('no-btn');
        this.realNoBtn = document.getElementById('real-no-btn');
        this.hintEl = document.getElementById('no-hint');

        if (!this.noBtn) return;

        this.noBtn.type = 'button';
        this.noBtn.addEventListener('click', () => this.handleClick());

        if (this.realNoBtn) {
            this.realNoBtn.addEventListener('click', () => this.confirmNo());
        }
    },

    handleClick() {
        if (this.isConfirmed) return;

        this.clickCount++;
        const messages = CONFIG.noEggMessages || this.defaultMessages;
        const messageIndex = Math.min(this.clickCount - 1, messages.length - 1);

        this.noBtn.textContent = messages[messageIndex];
        this.animateNoButton();
        this.showHint();

        if (this.clickCount >= messages.length) {
            this.revealRealNoButton();
        }
    },

    animateNoButton() {
        // Restarting the class animation is reliable even when the button is
        // clicked repeatedly; assigning style.animation is not.
        this.noBtn.classList.remove('no-button-shake');
        void this.noBtn.offsetWidth;
        this.noBtn.classList.add('no-button-shake');
    },

    revealRealNoButton() {
        if (!this.realNoBtn || !this.realNoBtn.classList.contains('hidden')) return;

        this.realNoBtn.classList.remove('hidden');
        this.realNoBtn.setAttribute('aria-hidden', 'false');
        this.realNoBtn.classList.add('button-reveal');
        this.showHint('No pressure. The other button is the real answer. 💖');
    },

    confirmNo() {
        this.isConfirmed = true;
        this.noBtn.textContent = 'Okay. I respect your decision.';
        this.noBtn.disabled = true;
        this.noBtn.classList.remove('no-button-shake');

        if (this.realNoBtn) {
            this.realNoBtn.disabled = true;
            this.realNoBtn.textContent = 'No, really ✓';
        }

        this.showHint('Got it. No pressure — I respect your choice. 💖');
    },

    showHint(message) {
        if (!this.hintEl) return;

        this.hintEl.textContent = message ||
            'No is always a valid answer — this button just has a personality. 💖';
        this.hintEl.classList.remove('hidden');
    }
};

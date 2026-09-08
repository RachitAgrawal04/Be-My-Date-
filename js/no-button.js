/**
 * ═══════════════════════════════════════════════════════════
 *  NO-BUTTON ENGINE — All 6 mischievous behaviors
 *  evader | teleporter | shrinker | fake | reverse | chaos
 * ═══════════════════════════════════════════════════════════
 */

const NoButton = {
    noBtn: null,
    yesBtn: null,
    actionsContainer: null,
    hintEl: null,
    behavior: 'chaos',
    clickCount: 0,
    shrinkScale: 1,
    reverseIndex: 0,
    currentChaosBehavior: null,
    teleported: false,
    behaviors: ['evader', 'teleporter', 'shrinker', 'fake', 'reverse'],

    init() {
        this.noBtn = document.getElementById('no-btn');
        this.yesBtn = document.getElementById('yes-btn');
        this.actionsContainer = document.getElementById('question-actions');
        this.hintEl = document.getElementById('no-hint');
        this.behavior = CONFIG.noBehavior || 'chaos';

        if (!this.noBtn || !this.yesBtn) return;

        this.setupBehavior();
    },

    setupBehavior() {
        const btn = this.noBtn;

        // Touch / hover for evader
        if (this.behavior === 'evader' || this.behavior === 'chaos') {
            // Desktop: mouseover
            btn.addEventListener('mouseover', (e) => this.handleInteraction(e));
            // Mobile: touchstart
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleInteraction(e);
            }, { passive: false });
        }

        // Click for all other behaviors
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleClick(e);
        });
    },

    handleInteraction(e) {
        const activeBehavior = this.getActiveBehavior();
        if (activeBehavior === 'evader') {
            this.evade(e);
        }
    },

    handleClick(e) {
        this.clickCount++;
        const activeBehavior = this.getActiveBehavior();

        switch (activeBehavior) {
            case 'teleporter':
                this.teleport();
                break;
            case 'shrinker':
                this.shrink();
                break;
            case 'fake':
                this.fakeNo();
                break;
            case 'reverse':
                this.reverse();
                break;
            case 'evader':
                // Evader handled on hover/touch, but click still triggers hint
                this.evade(e);
                break;
        }

        this.showHint();
    },

    getActiveBehavior() {
        if (this.behavior === 'chaos') {
            // Pick a random behavior, but keep it for a few interactions
            if (!this.currentChaosBehavior || this.clickCount % 2 === 0) {
                this.currentChaosBehavior = this.behaviors[
                    Math.floor(Math.random() * this.behaviors.length)
                ];
            }
            return this.currentChaosBehavior;
        }
        return this.behavior;
    },

    /** EVADER — Button runs away from cursor/finger */
    evade(e) {
        const btn = this.noBtn;
        const card = document.getElementById('main-card');
        if (!card) return;

        const btnRect = btn.getBoundingClientRect();

        // Keep the button inside the viewport, including on narrow phones.
        const padding = 12;
        const minX = Math.max(-75, padding - btnRect.left);
        const maxX = Math.min(75, window.innerWidth - padding - btnRect.right);
        const minY = Math.max(-40, padding - btnRect.top);
        const maxY = Math.min(40, window.innerHeight - padding - btnRect.bottom);
        const randomOffset = (min, max) => min + Math.random() * Math.max(0, max - min);

        btn.style.position = 'relative';
        btn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        btn.style.left = `${randomOffset(Math.min(minX, maxX), Math.max(minX, maxX))}px`;
        btn.style.top = `${randomOffset(Math.min(minY, maxY), Math.max(minY, maxY))}px`;

        this.showHint();
    },

    /** TELEPORTER — Swap positions with Yes button */
    teleport() {
        const noBtn = this.noBtn;
        const yesBtn = this.yesBtn;
        const container = this.actionsContainer;

        if (!container) return;

        // Explicit opposing orders are needed; assigning both from their old
        // value can leave them in the same visual position.
        this.teleported = !this.teleported;
        noBtn.style.order = this.teleported ? '0' : '1';
        yesBtn.style.order = this.teleported ? '1' : '0';

        // Brief animation
        noBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        yesBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        noBtn.style.transform = 'scale(0.8)';
        yesBtn.style.transform = 'scale(1.1)';

        setTimeout(() => {
            noBtn.style.transform = '';
            yesBtn.style.transform = '';
        }, 300);
    },

    /** SHRINKER — Gets smaller each click */
    shrink() {
        this.shrinkScale *= 0.75;
        const btn = this.noBtn;
        btn.style.transition = 'all 0.3s ease';
        btn.style.transform = `scale(${this.shrinkScale})`;
        btn.style.opacity = Math.max(0.2, this.shrinkScale);

        // If basically invisible, make Yes grow
        if (this.shrinkScale < 0.3) {
            this.yesBtn.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.yesBtn.style.transform = 'scale(1.3)';
        }
    },

    /** FAKE NO — "Are you sure?" then Yes becomes huge */
    fakeNo() {
        const btn = this.noBtn;

        if (this.clickCount === 1) {
            btn.textContent = 'Are you sure? 🥺';
            btn.style.animation = 'shake 0.5s ease';
            setTimeout(() => btn.style.animation = '', 500);
        } else if (this.clickCount === 2) {
            btn.textContent = 'Really?? 😭';
            this.yesBtn.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.yesBtn.style.transform = 'scale(1.3)';
            this.yesBtn.style.padding = '18px 60px';
            this.yesBtn.style.fontSize = '1.4rem';
        } else {
            btn.textContent = 'Fine... click Yes 😤';
            btn.style.opacity = '0.5';
            this.yesBtn.style.transform = 'scale(1.5)';
            this.yesBtn.style.padding = '20px 72px';
            this.yesBtn.style.fontSize = '1.6rem';
        }
    },

    /** REVERSE — Text becomes progressively more romantic */
    reverse() {
        const messages = CONFIG.reverseMessages || [
            'No', 'Are you sure?', 'Really sure? 🥺',
            'Think again...', "You're breaking my heart 💔",
            "I'm gonna cry...", 'Okay fine... 😭',
            'Just kidding, click Yes! 💕'
        ];

        this.reverseIndex = Math.min(this.reverseIndex + 1, messages.length - 1);
        this.noBtn.textContent = messages[this.reverseIndex];

        // Shake animation
        this.noBtn.style.animation = 'shake 0.4s ease';
        setTimeout(() => this.noBtn.style.animation = '', 400);

        // Gradually grow Yes button
        const scale = 1 + (this.reverseIndex * 0.08);
        this.yesBtn.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.yesBtn.style.transform = `scale(${scale})`;
    },

    showHint() {
        if (this.hintEl && this.clickCount >= 1) {
            this.hintEl.classList.remove('hidden');
        }
    }
};

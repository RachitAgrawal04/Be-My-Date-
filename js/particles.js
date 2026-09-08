/**
 * ═══════════════════════════════════════════════════════════
 *  PARTICLES ENGINE — Floating hearts, petals & sparkles
 * ═══════════════════════════════════════════════════════════
 */

const Particles = {
    container: null,
    hearts: [],
    isRunning: false,
    intervalId: null,

    init() {
        this.container = document.getElementById('particles-container');
        if (!this.container) return;
        this.startHearts();
    },

    /** Spawn floating hearts continuously */
    startHearts() {
        if (this.isRunning) return;
        this.isRunning = true;
        // Initial burst
        for (let i = 0; i < 6; i++) {
            setTimeout(() => this.spawnHeart(), i * 400);
        }
        // Continuous
        this.intervalId = setInterval(() => this.spawnHeart(), 2500);
    },

    stopHearts() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },

    spawnHeart() {
        if (!this.container) return;
        const heart = document.createElement('div');
        const symbols = ['❤️', '💕', '💗', '🌹', '✨', '💖', '🩷'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const size = 14 + Math.random() * 18;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 8;
        const delay = Math.random() * 2;

        heart.textContent = symbol;
        heart.style.cssText = `
            position: absolute;
            bottom: -30px;
            left: ${left}%;
            font-size: ${size}px;
            opacity: 0;
            pointer-events: none;
            animation: floatHeart ${duration}s ease-in ${delay}s forwards;
            z-index: 1;
        `;

        this.container.appendChild(heart);

        // Cleanup after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, (duration + delay) * 1000 + 500);
    },

    /** Spawn rose petals (for romantic screens) */
    spawnPetals(count = 8) {
        if (!this.container) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.spawnPetal(), i * 300);
        }
    },

    spawnPetal() {
        if (!this.container) return;
        const petal = document.createElement('div');
        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 6;
        const size = 10 + Math.random() * 14;

        petal.textContent = '🌸';
        petal.style.cssText = `
            position: absolute;
            top: -30px;
            left: ${left}%;
            font-size: ${size}px;
            opacity: 0;
            pointer-events: none;
            animation: petalFall ${duration}s ease-in-out forwards;
            z-index: 1;
        `;

        this.container.appendChild(petal);

        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, duration * 1000 + 500);
    },

    /** Heart burst from a point (for celebration) */
    heartBurst(x, y, count = 20) {
        if (!this.container) return;
        const burstSymbols = ['❤️', '💕', '💖', '💗', '🩷', '✨', '🎉'];
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const symbol = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const distance = 80 + Math.random() * 150;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const size = 16 + Math.random() * 20;
            const duration = 0.8 + Math.random() * 0.6;

            el.textContent = symbol;
            el.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${size}px;
                pointer-events: none;
                z-index: 300;
                --tx: ${tx}px;
                --ty: ${ty}px;
                animation: heartBurst ${duration}s ease-out forwards;
            `;

            this.container.appendChild(el);

            setTimeout(() => {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }, duration * 1000 + 100);
        }
    },

    /** Celebration mode — intense particles */
    celebrationMode() {
        // Spawn lots of hearts
        const burstInterval = setInterval(() => this.spawnHeart(), 400);
        setTimeout(() => clearInterval(burstInterval), 8000);

        // Rose petals too
        this.spawnPetals(15);
    }
};

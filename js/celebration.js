/**
 * ═══════════════════════════════════════════════════════════
 *  CELEBRATION ENGINE — What happens when she says YES
 * ═══════════════════════════════════════════════════════════
 */

const Celebration = {

    /** Trigger the full celebration sequence */
    trigger() {
        const config = CONFIG.celebration;

        // 1. Confetti explosion
        if (config.confetti && window.confetti) {
            this.confettiBurst();
        }

        // 2. Heart particles
        if (config.hearts && typeof Particles !== 'undefined') {
            Particles.celebrationMode();
            // Heart burst from center
            Particles.heartBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
        }

        // 3. Set celebration content
        const celebGif = document.getElementById('celebration-gif');
        const celebMsg = document.getElementById('celebration-message');

        if (celebGif) {
            celebGif.src = CONFIG.celebrationGif;
        }
        if (celebMsg) {
            celebMsg.textContent = config.endingMessage || "She said YES!!! 🎉";
        }

        // 4. Show music player
        if (CONFIG.musicEnabled) {
            this.showMusic();
        }

        // 5. Fireworks (continuous confetti bursts)
        if (config.fireworks) {
            this.fireworks();
        }

        // 6. Show love note notification after a delay
        if (CONFIG.loveNoteEnabled) {
            setTimeout(() => {
                this.showLoveNote();
            }, 3000);
        }
    },

    /** Multi-burst confetti */
    confettiBurst() {
        // Initial big burst
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#c9184a', '#fff0f3', '#ffa8c5'],
        });

        // Side bursts
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#c9184a'],
            });
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#c9184a'],
            });
        }, 400);
    },

    /** Continuous firework-style confetti bursts */
    fireworks() {
        const confetti = window.confetti;
        if (typeof confetti !== 'function') return;

        const duration = 6000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 300,
            colors: ['#ff4d6d', '#ff8fa3', '#c9184a', '#fff0f3', '#ffa8c5', '#ffccd5'],
        };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 40 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            }));
        }, 300);
    },

    /** Show Spotify music player */
    showMusic() {
        const musicBtn = document.getElementById('music-toggle-btn');
        const iframe = document.getElementById('spotify-iframe');

        if (iframe && CONFIG.spotifyTrackId) {
            iframe.src = `https://open.spotify.com/embed/track/${CONFIG.spotifyTrackId}?utm_source=generator&theme=0&t=${CONFIG.spotifyStartTime || 0}`;
        }

        // Auto-open the player
        if (musicBtn) {
            musicBtn.classList.remove('hidden');
            setTimeout(() => {
                MusicPlayer.toggle(true);
            }, 1500);
        }
    },

    /** Show love note notification */
    showLoveNote() {
        const notif = document.getElementById('note-notification');
        if (notif) {
            notif.classList.remove('hidden');
            notif.classList.add('visible');
        }
    }
};

/**
 * Music Player controls
 */
const MusicPlayer = {
    isOpen: false,

    init() {
        const toggleBtn = document.getElementById('music-toggle-btn');
        const closeBtn = document.getElementById('close-music-btn');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle(false);
            });
        }
    },

    toggle(forceState) {
        const player = document.getElementById('spotify-player');
        if (!player) return;

        if (typeof forceState === 'boolean') {
            this.isOpen = forceState;
        } else {
            this.isOpen = !this.isOpen;
        }

        if (this.isOpen) {
            player.classList.add('visible');
            player.classList.remove('hidden');
        } else {
            player.classList.remove('visible');
        }
    }
};

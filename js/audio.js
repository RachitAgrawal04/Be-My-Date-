/**
 * ═══════════════════════════════════════════════════════════
 *  AUDIO MANAGER — Centralized audio control
 *  One controller to rule them all. Prevents overlapping
 *  audio and provides fade in/out support.
 * ═══════════════════════════════════════════════════════════
 */

const AudioManager = {
    currentMusic: null,
    currentVoice: null,
    musicVolume: 0.6,
    isMuted: false,
    fadeInterval: null,

    /** Play a music track */
    playMusic(src, options = {}) {
        const { fade = true, loop = true, volume } = options;

        this.stopMusic();

        const audio = new Audio(src);
        audio.loop = loop;
        audio.volume = 0;
        this.currentMusic = audio;

        const targetVolume = volume || this.musicVolume;

        audio.play().then(() => {
            if (fade) {
                this._fadeAudio(audio, 0, targetVolume, 1500);
            } else {
                audio.volume = targetVolume;
            }
        }).catch(e => {
            console.warn("AudioManager: Music autoplay blocked", e);
        });

        return audio;
    },

    /** Stop current music */
    stopMusic(fade = true) {
        if (!this.currentMusic) return;

        if (fade) {
            const audio = this.currentMusic;
            this._fadeAudio(audio, audio.volume, 0, 800, () => {
                audio.pause();
                audio.currentTime = 0;
            });
        } else {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        this.currentMusic = null;
    },

    /** Pause music without stopping */
    pauseMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
        }
    },

    /** Resume paused music */
    resumeMusic() {
        if (this.currentMusic && this.currentMusic.paused) {
            this.currentMusic.play().catch(() => {});
        }
    },

    /** Play a voice clip (stops any current voice) */
    playVoice(src, options = {}) {
        const { onEnd, volume = 1 } = options;

        this.stopVoice();

        // Lower music volume during voice
        if (this.currentMusic) {
            this._fadeAudio(this.currentMusic, this.currentMusic.volume, 0.15, 500);
        }

        const audio = new Audio(src);
        audio.volume = volume;
        this.currentVoice = audio;

        audio.addEventListener("ended", () => {
            this.currentVoice = null;
            // Restore music volume
            if (this.currentMusic) {
                this._fadeAudio(this.currentMusic, this.currentMusic.volume, this.musicVolume, 800);
            }
            if (onEnd) onEnd();
        });

        audio.play().catch(e => {
            console.warn("AudioManager: Voice playback failed", e);
            this.currentVoice = null;
            if (onEnd) onEnd();
        });

        return audio;
    },

    /** Stop current voice clip */
    stopVoice() {
        if (this.currentVoice) {
            this.currentVoice.pause();
            this.currentVoice.currentTime = 0;
            this.currentVoice = null;
        }
    },

    /** Stop everything */
    stopAll() {
        this.stopMusic(false);
        this.stopVoice();
    },

    /** Set master music volume */
    setVolume(vol) {
        this.musicVolume = Math.max(0, Math.min(1, vol));
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
    },

    /** Toggle mute */
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.currentMusic) {
            this.currentMusic.muted = this.isMuted;
        }
        if (this.currentVoice) {
            this.currentVoice.muted = this.isMuted;
        }
        return this.isMuted;
    },

    // ─── Private: Fade helper ───

    _fadeAudio(audio, from, to, duration, onComplete) {
        if (!audio) return;

        const steps = 30;
        const stepTime = duration / steps;
        const delta = (to - from) / steps;
        let currentStep = 0;

        audio.volume = from;

        const interval = setInterval(() => {
            currentStep++;
            const newVol = from + delta * currentStep;
            audio.volume = Math.max(0, Math.min(1, newVol));

            if (currentStep >= steps) {
                clearInterval(interval);
                audio.volume = Math.max(0, Math.min(1, to));
                if (onComplete) onComplete();
            }
        }, stepTime);
    },
};

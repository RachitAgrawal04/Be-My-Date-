/**
 * ═══════════════════════════════════════════════════════════
 *  STORAGE MANAGER — Persistent state via localStorage
 *  Single source of truth for all user progress.
 * ═══════════════════════════════════════════════════════════
 */

const StorageManager = {
    STORAGE_KEY: "jupiter_v2_state",
    VERSION: 2,

    /** Default state schema */
    defaultState() {
        return {
            version: this.VERSION,
            visitCount: 0,
            firstVisit: null,
            lastVisit: null,
            chaptersCompleted: [],
            currentChapter: "intro",
            cluesFound: [],
            secretUnlocked: false,
            singingDone: false,
            finalAnswer: null,
            finalSeen: false,
            loreInteracted: [],
            detectiveScore: 0,
            envelopesOpened: [],
        };
    },

    /** Initialize — load or create state */
    init() {
        let state = this._load();

        if (!state || state.version !== this.VERSION) {
            // Fresh start or version mismatch
            state = this.defaultState();
        }

        // Track visit
        const now = new Date().toISOString();
        if (!state.firstVisit) {
            state.firstVisit = now;
        }
        state.lastVisit = now;
        state.visitCount = (state.visitCount || 0) + 1;

        this._save(state);
        return state;
    },

    /** Get full state */
    getAll() {
        return this._load() || this.defaultState();
    },

    /** Get a single key */
    get(key) {
        const state = this.getAll();
        return state[key];
    },

    /** Set a single key */
    set(key, value) {
        const state = this.getAll();
        state[key] = value;
        this._save(state);
    },

    /** Merge partial updates */
    update(partial) {
        const state = this.getAll();
        Object.assign(state, partial);
        this._save(state);
    },

    /** Reset to defaults (keep visit count) */
    reset() {
        const state = this.defaultState();
        state.visitCount = this.get("visitCount") || 1;
        state.firstVisit = this.get("firstVisit");
        this._save(state);
    },

    /** Get visit count */
    getVisitCount() {
        return this.get("visitCount") || 1;
    },

    /** Mark a chapter complete */
    completeChapter(chapterId) {
        const completed = this.get("chaptersCompleted") || [];
        if (!completed.includes(chapterId)) {
            completed.push(chapterId);
            this.set("chaptersCompleted", completed);
        }
    },

    /** Check if chapter is complete */
    isChapterComplete(chapterId) {
        const completed = this.get("chaptersCompleted") || [];
        return completed.includes(chapterId);
    },

    /** Add a found clue */
    addClue(clueId) {
        const clues = this.get("cluesFound") || [];
        if (!clues.includes(clueId)) {
            clues.push(clueId);
            this.set("cluesFound", clues);
        }
        return clues.length;
    },

    /** Add interacted lore item */
    addLoreInteraction(loreId) {
        const items = this.get("loreInteracted") || [];
        if (!items.includes(loreId)) {
            items.push(loreId);
            this.set("loreInteracted", items);
        }
    },

    /** Add opened envelope */
    addEnvelopeOpened(envelopeLabel) {
        const opened = this.get("envelopesOpened") || [];
        if (!opened.includes(envelopeLabel)) {
            opened.push(envelopeLabel);
            this.set("envelopesOpened", opened);
        }
    },

    // ─── Private ───

    _load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.warn("StorageManager: Failed to load state", e);
            return null;
        }
    },

    _save(state) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn("StorageManager: Failed to save state", e);
        }
    },
};

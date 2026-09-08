/**
 * Main controller for Jupiter's surprise page.
 * It builds the configurable sections and coordinates the existing feature engines.
 */

const App = {
    flow: [],
    currentIndex: -1,
    storyTimer: null,
    storyRunId: 0,
    celebrationStarted: false,

    init() {
        this.applyConfig();
        this.buildStoryScreens();
        this.buildPhotos();
        this.buildFlow();
        this.buildNavigation();
        this.bindEvents();

        Particles.init();
        Envelopes.init();
        NoButton.init();
        MusicPlayer.init();

        this.showIntro();
    },

    applyConfig() {
        document.title = CONFIG.pageTitle || document.title;

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.content = `A tiny corner of the internet, just for ${CONFIG.recipient.name}.`;
        }

        const question = document.getElementById('question-text');
        const yesButton = document.getElementById('yes-btn');
        const noButton = document.getElementById('no-btn');
        const mainGif = document.getElementById('main-gif');

        if (question) question.textContent = CONFIG.question;
        if (yesButton) yesButton.textContent = CONFIG.yesText;
        if (noButton) noButton.textContent = CONFIG.noText;
        if (mainGif) mainGif.src = CONFIG.mainGif;
    },

    buildStoryScreens() {
        const container = document.getElementById('story-screens-container');
        if (!container) return;

        container.replaceChildren();
        if (!CONFIG.storyEnabled || !CONFIG.storyScreens.length) return;

        CONFIG.storyScreens.forEach((story, index) => {
            const screen = document.createElement('section');
            screen.id = `screen-story-${index}`;
            screen.className = 'screen screen-story';
            screen.dataset.storyIndex = index;
            screen.tabIndex = 0;

            const content = document.createElement('div');
            content.className = 'story-content';

            const text = document.createElement('h1');
            text.className = 'story-text';
            text.dataset.fullText = story.text || '';

            const subtext = document.createElement('p');
            subtext.className = 'story-subtext';
            subtext.textContent = story.subtext || '';
            subtext.hidden = !story.subtext;

            const hint = document.createElement('p');
            hint.className = 'story-tap';
            hint.textContent = 'tap to continue';

            content.append(text, subtext);
            screen.append(content, hint);
            screen.addEventListener('click', () => this.advanceStory());
            screen.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.advanceStory();
                }
            });
            container.appendChild(screen);
        });
    },

    buildPhotos() {
        const grid = document.getElementById("photos-grid");
        if (!grid) return;

        grid.replaceChildren();

        (CONFIG.photos || []).forEach((media, index) => {
            const card = document.createElement("article");
            card.className = "photo-card";
            card.style.setProperty(
                "--rotation",
                `${[-3, 2, -1, 3, -2][index % 5]}deg`
            );

            let element;

            if (media.type === "video") {
                element = document.createElement("video");
                element.controls = true;
                element.playsInline = true;
                element.preload = "metadata";
            } else {
                element = document.createElement("img");
                element.loading = "lazy";
                element.alt = media.caption || `Memory ${index + 1}`;
            }

            element.src = media.src;
            element.addEventListener("error", () => this.showPhotoPlaceholder(card));

            const caption = document.createElement("p");
            caption.className = "photo-caption";
            caption.textContent = media.caption || "";

            card.append(element, caption);
            grid.appendChild(card);
        });
    },

    showPhotoPlaceholder(card) {
        card.querySelector("img, video")?.remove();

        if (!card.querySelector(".photo-placeholder")) {
            const placeholder = document.createElement("div");
            placeholder.className = "photo-placeholder";
            placeholder.textContent = "Media unavailable";
            card.prepend(placeholder);
        }
    },

    buildFlow() {
        this.flow = [];

        if (CONFIG.storyEnabled && CONFIG.storyScreens.length) {
            CONFIG.storyScreens.forEach((_, index) => {
                this.flow.push({ id: `screen-story-${index}`, type: 'story', storyIndex: index });
            });
        }

        const photos = document.getElementById('screen-photos');
        if (CONFIG.photosEnabled && CONFIG.photos.length && photos) {
            this.flow.push({ id: 'screen-photos', type: 'photos' });
        } else if (photos) {
            photos.remove();
        }

        const envelopes = document.getElementById('screen-envelopes');
        if (CONFIG.envelopesEnabled && CONFIG.envelopes.length && envelopes) {
            this.flow.push({ id: 'screen-envelopes', type: 'envelopes' });
        } else if (envelopes) {
            envelopes.remove();
        }

        this.flow.push({ id: 'screen-question', type: 'question' });
    },

    buildNavigation() {
        const dots = document.getElementById('nav-dots');
        if (!dots) return;

        dots.replaceChildren();
        this.flow.forEach((stage, index) => {
            const dot = document.createElement('button');
            dot.className = 'nav-dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to step ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index));
            dots.appendChild(dot);
        });
    },

    bindEvents() {
        const intro = document.getElementById('screen-intro');
        const photosContinue = document.getElementById('photos-continue');
        const envelopesContinue = document.getElementById('envelopes-continue');
        const yesButton = document.getElementById('yes-btn');
        const noteNotification = document.getElementById('note-notification');
        const closeNote = document.getElementById('close-note');
        const notePopup = document.getElementById('note-popup');
        const collageButton = document.getElementById('view-collage-btn');

        if (intro) intro.addEventListener('click', () => this.start());
        if (photosContinue) photosContinue.addEventListener('click', () => this.goNext());
        if (envelopesContinue) envelopesContinue.addEventListener('click', () => this.goNext());
        if (yesButton) yesButton.addEventListener('click', () => this.sayYes());
        if (noteNotification) noteNotification.addEventListener('click', () => this.openLoveNote());
        if (closeNote) closeNote.addEventListener('click', () => this.closeLoveNote());
        if (notePopup) {
            notePopup.addEventListener('click', (event) => {
                if (event.target === notePopup) this.closeLoveNote();
            });
        }
        if (collageButton) {
            collageButton.addEventListener('click', () => {
                const photosIndex = this.flow.findIndex((stage) => stage.type === 'photos');
                if (photosIndex !== -1) this.goTo(photosIndex);
            });
        }
    },

    showIntro() {
        const intro = document.getElementById('screen-intro');
        const dots = document.getElementById('nav-dots');
        if (intro) intro.classList.add('active');
        if (dots) dots.classList.add('hidden');
    },

    start() {
        const intro = document.getElementById('screen-intro');
        if (!intro || !intro.classList.contains('active')) return;

        intro.classList.remove('active');
        const dots = document.getElementById('nav-dots');
        if (dots) dots.classList.remove('hidden');
        this.goTo(0);
    },

    goNext() {
        this.goTo(this.currentIndex + 1);
    },

    goTo(index) {
        if (index < 0 || index >= this.flow.length) return;

        this.storyRunId++;
        window.clearTimeout(this.storyTimer);

        const previous = this.flow[this.currentIndex];
        if (previous) {
            const previousScreen = document.getElementById(previous.id);
            if (previousScreen) previousScreen.classList.remove('active');
        }

        this.currentIndex = index;
        const stage = this.flow[index];
        const screen = document.getElementById(stage.id);
        if (!screen) return;

        screen.classList.add('active');
        this.updateNavigation();

        if (stage.type === 'story') this.enterStory(stage, screen);
    },

    updateNavigation() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
            dot.setAttribute('aria-current', index === this.currentIndex ? 'step' : 'false');
        });
    },

    enterStory(stage, screen) {
        const story = CONFIG.storyScreens[stage.storyIndex];
        const text = screen.querySelector('.story-text');
        const subtext = screen.querySelector('.story-subtext');
        const runId = this.storyRunId;

        if (!text) return;
        if (subtext) subtext.classList.remove('visible');

        this.typeText(text, text.dataset.fullText || '', runId, () => {
            if (runId !== this.storyRunId) return;
            if (subtext && !subtext.hidden) subtext.classList.add('visible');
            if (story.delay > 0) {
                this.storyTimer = window.setTimeout(() => this.goNext(), story.delay);
            }
        });
    },

    typeText(element, value, runId, onComplete) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const characters = Array.from(value);
        element.replaceChildren();

        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        element.appendChild(cursor);

        if (reducedMotion || !characters.length) {
            element.insertBefore(document.createTextNode(value), cursor);
            cursor.remove();
            onComplete();
            return;
        }

        let position = 0;
        const writeCharacter = () => {
            if (runId !== this.storyRunId) return;
            if (position < characters.length) {
                element.insertBefore(document.createTextNode(characters[position]), cursor);
                position++;
                window.setTimeout(writeCharacter, 24);
                return;
            }
            cursor.remove();
            onComplete();
        };

        writeCharacter();
    },

    advanceStory() {
        const stage = this.flow[this.currentIndex];
        if (!stage || stage.type !== 'story') return;
        this.goNext();
    },

    sayYes() {
        if (this.celebrationStarted) return;
        this.celebrationStarted = true;

        const questionScreen = document.getElementById('screen-question');
        const celebrationScreen = document.getElementById('screen-celebration');
        const dots = document.getElementById('nav-dots');

        if (questionScreen) questionScreen.classList.remove('active');
        if (celebrationScreen) celebrationScreen.classList.add('active');
        if (dots) dots.classList.add('hidden');

        Celebration.trigger();
    },

    openLoveNote() {
        const popup = document.getElementById('note-popup');
        const note = document.getElementById('note-handwriting');
        const signOff = document.getElementById('note-signoff-text');
        const name = document.getElementById('note-signoff-name');
        const notification = document.getElementById('note-notification');

        if (note) note.textContent = CONFIG.loveNote;
        if (signOff) signOff.textContent = CONFIG.creator.signOff;
        if (name) name.textContent = CONFIG.creator.name;
        if (notification) notification.classList.add('hidden');
        if (popup) {
            popup.classList.remove('hidden');
            popup.style.display = 'flex';
        }
    },

    closeLoveNote() {
        const popup = document.getElementById('note-popup');
        if (popup) {
            popup.classList.add('hidden');
            popup.style.display = 'none';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());

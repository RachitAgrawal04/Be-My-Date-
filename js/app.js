/*
 * PROJECT JUPITER V2
 * A self-contained chapter controller. Personal copy and media live in
 * content.js; this file only handles the experience and its interactions.
 */

(() => {
    'use strict';

    const el = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    };

    const button = (label, className = 'btn-continue') => {
        const element = el('button', className, label);
        element.type = 'button';
        return element;
    };

    const phaseNames = [
        'phase-dark', 'phase-warm', 'phase-playful', 'phase-intimate',
        'phase-hopeful', 'phase-emotional', 'phase-celebration'
    ];

    const App = {
        app: null,
        chapters: new Map(),
        currentId: null,
        timers: [],
        typing: null,
        introIndex: 0,
        missYouIndex: 0,
        finalPreludeIndex: 0,
        finalChoiceShown: false,
        noClickCount: 0,
        popupOpener: null,
        state: null,
        resumeDismissed: false,

        init() {
            if (!window.CONTENT) {
                console.error('Project Jupiter could not load its content.');
                return;
            }

            this.app = document.getElementById('app');
            if (!this.app) return;

            this.state = window.StorageManager ? StorageManager.init() : {};
            document.title = CONTENT.siteTitle;
            const description = document.querySelector('meta[name="description"]');
            if (description) description.content = CONTENT.siteDescription;

            this.buildExperience();
            this.bindGlobalEvents();
            this.updateClueCounter();
            this.show('intro');
        },

        buildExperience() {
            this.buildIntro();
            this.buildV1Callback();
            this.buildOrigin();
            this.buildFirstNight();
            this.buildAugust22();
            this.buildTimeCounter();
            this.buildLittleThings();
            this.buildLore();
            this.buildDetective();
            this.buildNeverTold();
            this.buildDistance();
            this.buildMemories();
            this.buildFuture();
            this.buildOpenWhen();
            this.buildMissYou();
            this.buildFinalQuestion();
            this.buildYesFinale();
            this.buildEnding();
        },

        makeChapter(id, phase, { scrollable = false, onEnter } = {}) {
            const section = el('section', `chapter${scrollable ? ' scrollable' : ''}`);
            section.id = `chapter-${id}`;
            section.setAttribute('aria-label', id.replaceAll('-', ' '));
            section.tabIndex = -1;
            const inner = el('div', 'chapter-inner');
            section.appendChild(inner);
            this.app.appendChild(section);
            this.chapters.set(id, { id, phase, section, inner, onEnter });
            return inner;
        },

        addNext(parent, target, label = 'Continue') {
            const control = button(label);
            control.addEventListener('click', (event) => {
                event.stopPropagation();
                this.show(target);
            });
            parent.appendChild(control);
            return control;
        },

        addChapterLabel(parent, chapter) {
            parent.appendChild(el('p', 'heading-chapter', chapter));
        },

        addClue(parent, clueId, position = {}) {
            const clue = (CONTENT.clues || []).find((item) => item.id === clueId);
            if (!clue) return;
            const trigger = button(clue.hint, 'hidden-clue');
            trigger.setAttribute('aria-label', 'A hidden clue');
            Object.assign(trigger.style, {
                top: position.top || '12%',
                left: position.left || '8%',
                right: position.right || 'auto',
                bottom: position.bottom || 'auto'
            });
            trigger.addEventListener('click', (event) => {
                event.stopPropagation();
                trigger.classList.add('found');
                if (window.StorageManager) StorageManager.addClue(clueId);
                this.updateClueCounter();
            });
            parent.appendChild(trigger);
        },

        buildIntro() {
            const inner = this.makeChapter('intro', 'phase-dark', {
                onEnter: () => {
                    this.introIndex = 0;
                    this.showIntroLine();
                }
            });
            const line = el('h1', 'text-large');
            line.id = 'intro-line';
            const hint = el('p', 'tap-hint', 'tap to continue');
            const resume = el('div', 'card hidden mt-xl');
            resume.id = 'return-visit';
            inner.append(line, hint, resume);
            this.addClue(inner, 'spider', { top: '20%', right: '12%' });
            this.chapters.get('intro').section.addEventListener('click', () => this.advanceIntro());
        },

        showIntroLine() {
            const lineData = CONTENT.intro.lines[this.introIndex];
            const line = document.getElementById('intro-line');
            if (!lineData || !line) return;
            line.classList.toggle('text-small', Boolean(lineData.small));
            line.classList.toggle('text-large', !lineData.small);
            this.typeText(line, lineData.text, 30);
            this.showReturnVisitPrompt();
        },

        showReturnVisitPrompt() {
            const prompt = document.getElementById('return-visit');
            const savedChapter = this.state && this.state.currentChapter;
            if (!prompt || this.resumeDismissed || !savedChapter || savedChapter === 'intro' || !this.chapters.has(savedChapter)) return;
            prompt.replaceChildren();
            const isLaterVisit = (this.state.visitCount || 1) > 2;
            prompt.append(
                el('p', 'heading-section', isLaterVisit ? CONTENT.returnVisit.third : CONTENT.returnVisit.second),
                el('p', 'text-small mb-md', CONTENT.returnVisit.secondExtra)
            );
            const resume = button('Pick up where you left off', 'btn-continue');
            resume.addEventListener('click', (event) => {
                event.stopPropagation();
                this.resumeDismissed = true;
                this.show(savedChapter);
            });
            prompt.appendChild(resume);
            prompt.classList.remove('hidden');
        },

        advanceIntro() {
            if (this.currentId !== 'intro') return;
            if (this.finishTyping()) return;
            this.introIndex += 1;
            if (this.introIndex >= CONTENT.intro.lines.length) {
                this.show('callback');
                return;
            }
            this.showIntroLine();
        },

        buildV1Callback() {
            const inner = this.makeChapter('callback', 'phase-dark');
            this.addChapterLabel(inner, 'a small callback');
            const wrap = el('div', 'v1-recreation');
            const photo = el('img', 'v1-photo');
            photo.src = CONTENT.v1Callback.photo;
            photo.alt = `${CONTENT.recipient.name}, a favorite photo`;
            photo.loading = 'eager';
            this.watchImage(photo);
            const title = el('p', 'v1-title', CONTENT.v1Callback.oldTitle);
            const copy = el('p', 'text-cinematic mt-xl');
            copy.textContent = CONTENT.v1Callback.afterLines.join(' ');
            wrap.append(photo, title, copy);
            inner.append(wrap);
            this.addNext(inner, 'origin', 'Keep going');
        },

        buildOrigin() {
            const inner = this.makeChapter('origin', 'phase-dark');
            this.addChapterLabel(inner, CONTENT.origin.date);
            inner.appendChild(el('h1', 'text-large', CONTENT.origin.title));
            inner.appendChild(el('p', 'text-cinematic mt-lg', CONTENT.origin.storyLines[0]));
            const conversation = this.makeConversation(CONTENT.origin.conversation);
            inner.appendChild(conversation);
            inner.appendChild(el('p', 'heading-section mt-xl', CONTENT.origin.afterLine));
            this.addClue(inner, 'spider', { bottom: '10%', right: '10%' });
            this.addNext(inner, 'first-night', 'And then…');
        },

        buildFirstNight() {
            const inner = this.makeChapter('first-night', 'phase-dark', { scrollable: true });
            this.addChapterLabel(inner, CONTENT.firstNight.date);
            inner.appendChild(el('h1', 'heading-section', 'The first night'));
            inner.appendChild(el('p', 'text-cinematic', 'Some conversations are supposed to end. Ours kept finding another hour.'));
            const timestamps = el('div', 'timestamp-group mt-xl');
            CONTENT.firstNight.timestamps.forEach((time, index) => {
                const stamp = el('p', 'timestamp', time);
                stamp.style.animationDelay = `${index * 0.45}s`;
                timestamps.appendChild(stamp);
            });
            inner.appendChild(timestamps);
            const lines = el('div', 'mt-xl');
            CONTENT.firstNight.afterLines.forEach((line, index) => {
                const paragraph = el('p', 'text-cinematic mb-md', line);
                paragraph.style.animation = `textRevealUp 0.6s ${0.8 + index * 0.25}s var(--ease-smooth) both`;
                lines.appendChild(paragraph);
            });
            inner.appendChild(lines);
            this.addNext(inner, 'august22', 'Then came August');
        },

        buildAugust22() {
            const inner = this.makeChapter('august22', 'phase-warm', { scrollable: true });
            this.addChapterLabel(inner, CONTENT.august22.date);
            inner.appendChild(el('h1', 'text-large', CONTENT.august22.location));
            inner.appendChild(el('p', 'text-date mt-sm', CONTENT.august22.time));

            const fragments = el('div', 'mt-xl');
            CONTENT.august22.fragments.forEach((fragment, index) => {
                const paragraph = el('p', 'text-cinematic mb-md', fragment);
                paragraph.style.animation = `textRevealUp 0.55s ${index * 0.18}s var(--ease-smooth) both`;
                fragments.appendChild(paragraph);
            });
            inner.appendChild(fragments);
            inner.appendChild(el('p', 'heading-section mt-xl', CONTENT.august22.beautifulLine));
            inner.appendChild(el('p', 'text-cinematic mt-md', CONTENT.august22.shockedLine));

            const explanation = el('div', 'card mt-xl');
            CONTENT.august22.explanation.forEach((line) => explanation.appendChild(el('p', 'text-body mb-sm', line)));
            inner.appendChild(explanation);

            const callback = el('div', 'card mt-lg');
            callback.appendChild(el('p', 'text-small', CONTENT.august22.spiderManCallback.intro));
            callback.appendChild(this.makeConversation([
                { sender: 'rachit', text: CONTENT.august22.spiderManCallback.rachit },
                { sender: 'jupiter', text: CONTENT.august22.spiderManCallback.jupiter }
            ]));
            inner.appendChild(callback);

            const credit = el('div', 'card mt-lg');
            credit.append(
                el('p', 'heading-section', CONTENT.august22.kajalCredit.title),
                el('p', 'text-small mb-md', CONTENT.august22.kajalCredit.subtitle),
                el('p', 'text-body', `“${CONTENT.august22.kajalCredit.quote}”`)
            );
            inner.appendChild(credit);
            this.addClue(inner, '22', { top: '7%', right: '11%' });
            this.addNext(inner, 'time-counter', 'One unnecessary statistic');
        },

        buildTimeCounter() {
            const inner = this.makeChapter('time-counter', 'phase-warm', {
                onEnter: () => this.startCounter()
            });
            this.addChapterLabel(inner, CONTENT.timeCounter.since);
            inner.appendChild(el('h1', 'heading-section', CONTENT.timeCounter.title));
            inner.appendChild(el('p', 'text-cinematic', CONTENT.timeCounter.subtext));
            const display = el('div', 'counter-display');
            ['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
                const unitEl = el('div', 'counter-unit');
                unitEl.append(el('div', 'counter-value', '0'), el('div', 'counter-label', unit));
                unitEl.dataset.unit = unit;
                display.appendChild(unitEl);
            });
            display.id = 'time-counter-display';
            inner.appendChild(display);
            inner.appendChild(el('p', 'text-small', 'The number is not the point. The time is.'));
            this.addNext(inner, 'little-things', 'The little things');
        },

        buildLittleThings() {
            const inner = this.makeChapter('little-things', 'phase-warm', { scrollable: true });
            this.addChapterLabel(inner, 'the things I remember');
            inner.appendChild(el('h1', 'heading-section', 'Little things I remember'));
            inner.appendChild(el('p', 'text-cinematic mb-xl', 'Tap each one. I have been paying attention.'));
            const cards = el('div', 'card-grid');
            CONTENT.littleThings.forEach((item) => {
                const card = button('', 'thing-card');
                const category = el('p', 'thing-card-category', item.category);
                const detail = el('p', 'thing-card-detail', item.detail);
                card.append(category, detail);
                card.addEventListener('click', () => card.classList.toggle('revealed'));
                cards.appendChild(card);
            });
            inner.appendChild(cards);
            this.addClue(inner, 'sunflower', { top: '12%', right: '8%' });
            this.addNext(inner, 'lore', 'Our lore');
        },

        buildLore() {
            const inner = this.makeChapter('lore', 'phase-playful', { scrollable: true });
            this.addChapterLabel(inner, 'chapter seven');
            inner.append(
                el('h1', 'heading-section', CONTENT.lore.title),
                el('p', 'text-cinematic mb-xl', CONTENT.lore.subtitle)
            );
            const cards = el('div', 'card-grid');
            CONTENT.lore.items.forEach((item) => cards.appendChild(this.makeLoreCard(item)));
            inner.appendChild(cards);
            this.addClue(inner, 'wooh', { bottom: '10%', left: '10%' });
            this.addNext(inner, 'detective', 'Prove you remember');
        },

        makeLoreCard(item) {
            const card = el('article', 'lore-card');
            card.tabIndex = 0;
            card.append(el('h2', 'lore-card-title', item.title));
            card.appendChild(el('p', 'lore-card-hint', item.interaction === 'type' ? 'type the answer' : 'tap to reveal'));
            const reveal = () => {
                if (card.classList.contains('revealed')) return;
                card.classList.add('revealed');
                card.appendChild(el('p', 'lore-card-reveal', item.reveal));
                if (window.StorageManager) StorageManager.addLoreInteraction(item.id);
            };

            if (item.interaction === 'type') {
                const wrapper = el('div', 'lore-card-input');
                const input = el('input');
                input.type = 'text';
                input.placeholder = 'Your answer…';
                input.setAttribute('aria-label', item.title);
                input.addEventListener('click', (event) => event.stopPropagation());
                const validate = () => {
                    if (input.value.trim().toLowerCase() === item.correctAnswer.toLowerCase()) {
                        input.disabled = true;
                        reveal();
                    } else {
                        input.value = '';
                        input.placeholder = 'Almost. Try again.';
                    }
                };
                input.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') validate();
                });
                wrapper.appendChild(input);
                card.appendChild(wrapper);
            } else {
                card.addEventListener('click', reveal);
                card.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        reveal();
                    }
                });
            }
            return card;
        },

        buildDetective() {
            const inner = this.makeChapter('detective', 'phase-playful', {
                onEnter: () => this.renderQuiz(0, 0)
            });
            this.addChapterLabel(inner, 'memory detective');
            inner.appendChild(el('h1', 'heading-section', 'How well do you remember us?'));
            inner.appendChild(el('p', 'text-cinematic mb-xl', 'No pressure. It is an open-book test if you are persuasive enough.'));
            const root = el('div', 'quiz-container');
            root.id = 'quiz-root';
            inner.appendChild(root);
        },

        renderQuiz(index, score) {
            if (this.currentId !== 'detective') return;
            const root = document.getElementById('quiz-root');
            if (!root) return;
            root.replaceChildren();
            delete root.dataset.answered;
            const question = CONTENT.detective.questions[index];
            if (!question) {
                const result = el('div', 'card text-center');
                result.append(
                    el('p', 'heading-section', CONTENT.detective.passMessage),
                    el('p', 'text-body mb-lg', `${score} / ${CONTENT.detective.questions.length}`),
                    el('p', 'quiz-score', CONTENT.detective.certificate)
                );
                root.appendChild(result);
                if (window.StorageManager) StorageManager.set('detectiveScore', score);
                this.addNext(root, 'never-told', 'There is more');
                return;
            }

            root.appendChild(el('p', 'text-small mb-md', `Question ${index + 1} of ${CONTENT.detective.questions.length}`));
            root.appendChild(el('h2', 'quiz-question', question.question));
            const options = el('div', 'quiz-options');
            question.options.forEach((choice, choiceIndex) => {
                const option = button(choice, 'quiz-option');
                option.addEventListener('click', () => {
                    if (root.dataset.answered) return;
                    root.dataset.answered = 'true';
                    const isCorrect = choiceIndex === question.correct;
                    option.classList.add(isCorrect ? 'correct' : 'wrong');
                    [...options.children][question.correct].classList.add('correct');
                    [...options.children].forEach((item) => { item.disabled = true; });
                    this.defer(() => this.renderQuiz(index + 1, score + Number(isCorrect)), 850);
                });
                options.appendChild(option);
            });
            root.appendChild(options);
        },

        buildNeverTold() {
            const inner = this.makeChapter('never-told', 'phase-intimate', { scrollable: true });
            this.addChapterLabel(inner, 'a few honest things');
            inner.appendChild(el('h1', 'heading-section', 'Things I never told you'));
            inner.appendChild(el('p', 'text-cinematic mb-xl', 'Not because I did not mean them. I just did not know how to say them.'));
            const cards = el('div', 'card-grid');
            CONTENT.neverTold.forEach((item) => {
                const card = button('', 'never-told-card');
                card.append(el('p', 'never-told-label', item.label), el('p', 'never-told-text', item.text));
                card.addEventListener('click', () => card.classList.toggle('revealed'));
                cards.appendChild(card);
            });
            inner.appendChild(cards);
            this.addNext(inner, 'distance', 'And then I left');
        },

        buildDistance() {
            const inner = this.makeChapter('distance', 'phase-intimate', {
                onEnter: () => {
                    const route = document.querySelector('#chapter-distance .distance-line');
                    if (route) this.defer(() => route.classList.add('animate'), 250);
                }
            });
            this.addChapterLabel(inner, 'september 19');
            inner.appendChild(el('h1', 'heading-section', 'Distance'));
            const route = el('div', 'distance-route');
            route.append(
                el('span', 'distance-city', CONTENT.distance.from),
                el('span', 'distance-dot'),
                el('span', 'distance-line-container'),
                el('span', 'distance-dot'),
                el('span', 'distance-city', CONTENT.distance.to)
            );
            route.querySelector('.distance-line-container').appendChild(el('span', 'distance-line'));
            inner.appendChild(route);
            inner.append(
                el('p', 'text-large', CONTENT.distance.line1),
                el('p', 'text-cinematic mt-lg', CONTENT.distance.line2)
            );
            this.addClue(inner, 'earth-jupiter', { top: '15%', left: '14%' });
            this.addNext(inner, 'memories', 'The things that stayed close');
        },

        buildMemories() {
            const inner = this.makeChapter('memories', 'phase-intimate', { scrollable: true });
            this.addChapterLabel(inner, 'proof that it happened');
            inner.append(
                el('h1', 'heading-section', CONTENT.memories.title),
                el('p', 'text-cinematic mb-xl', CONTENT.memories.subtitle)
            );
            const grid = el('div', 'memory-grid');
            CONTENT.memories.photos.forEach((memory, index) => {
                const card = el('article', 'memory-card');
                card.style.setProperty('--rotation', `${[-2, 2, -1, 1, -3][index % 5]}deg`);
                card.style.animationDelay = `${Math.min(index * 0.08, 0.5)}s`;
                const image = el('img', 'memory-card-image');
                image.src = memory.src;
                image.alt = memory.caption;
                image.loading = index < 2 ? 'eager' : 'lazy';
                this.watchImage(image);
                const body = el('div', 'memory-card-body');
                body.append(
                    el('p', 'memory-card-date', memory.date),
                    el('h2', 'memory-card-caption', memory.caption),
                    el('p', 'memory-card-story', memory.story)
                );
                card.append(image, body);
                grid.appendChild(card);
            });
            inner.appendChild(grid);
            this.addNext(inner, 'future', 'Things ahead of us');
        },

        buildFuture() {
            const inner = this.makeChapter('future', 'phase-hopeful', { scrollable: true });
            this.addChapterLabel(inner, 'not yet');
            inner.appendChild(el('h1', 'heading-section', CONTENT.future.title));
            inner.appendChild(el('p', 'text-cinematic mb-xl', 'Tap the list. I am holding you to every one.'));
            const cards = el('div', 'card-grid');
            CONTENT.future.items.forEach((item) => {
                const card = button(item, 'future-card');
                card.addEventListener('click', () => {
                    card.classList.add('revealed');
                    card.textContent = `✓ ${item}`;
                });
                cards.appendChild(card);
            });
            const mystery = button('One more thing…', 'future-card future-card-mystery');
            mystery.addEventListener('click', () => {
                mystery.classList.add('revealed');
                mystery.textContent = CONTENT.future.mystery;
            });
            cards.appendChild(mystery);
            inner.appendChild(cards);
            this.addNext(inner, 'open-when', 'For the days in between');
        },

        buildOpenWhen() {
            const inner = this.makeChapter('open-when', 'phase-hopeful', { scrollable: true });
            this.addChapterLabel(inner, 'keep these');
            inner.append(
                el('h1', 'heading-section', 'Open when…'),
                el('p', 'text-cinematic mb-xl', 'They will be here when I cannot be.')
            );
            const cards = el('div', 'card-grid');
            CONTENT.openWhen.forEach((note) => {
                const card = button('', 'envelope-card');
                const copy = el('div');
                copy.append(el('h2', 'envelope-card-label', note.label), el('p', 'envelope-card-hint', 'tap to open'));
                card.append(el('span', 'envelope-card-emoji', note.emoji), copy);
                card.addEventListener('click', () => {
                    card.classList.add('opened');
                    card.querySelector('.envelope-card-hint').textContent = 'opened ✦';
                    if (window.StorageManager) StorageManager.addEnvelopeOpened(note.label);
                    this.openNote(note, card);
                });
                cards.appendChild(card);
            });
            inner.appendChild(cards);
            this.addNext(inner, 'miss-you', 'One last thing');
        },

        buildMissYou() {
            const inner = this.makeChapter('miss-you', 'phase-emotional', {
                onEnter: () => {
                    this.missYouIndex = 0;
                    this.showMissYouLine();
                }
            });
            const line = el('h1', 'text-large');
            line.id = 'miss-you-line';
            inner.append(line, el('p', 'tap-hint', 'tap to continue'));
            this.chapters.get('miss-you').section.addEventListener('click', () => this.advanceMissYou());
        },

        showMissYouLine() {
            const item = CONTENT.missYou.lines[this.missYouIndex];
            const line = document.getElementById('miss-you-line');
            if (item && line) this.typeText(line, item.text, 28);
        },

        advanceMissYou() {
            if (this.currentId !== 'miss-you') return;
            if (this.finishTyping()) return;
            this.missYouIndex += 1;
            if (this.missYouIndex >= CONTENT.missYou.lines.length) {
                this.show('final-question');
                return;
            }
            this.showMissYouLine();
        },

        buildFinalQuestion() {
            const inner = this.makeChapter('final-question', 'phase-emotional', {
                onEnter: () => {
                    this.finalPreludeIndex = 0;
                    this.finalChoiceShown = false;
                    this.noClickCount = 0;
                    this.showFinalPrelude();
                }
            });
            const stage = el('div', 'text-center');
            stage.id = 'final-stage';
            inner.append(stage, el('p', 'tap-hint', 'tap to continue'));
            this.chapters.get('final-question').section.addEventListener('click', () => this.advanceFinalPrelude());
        },

        showFinalPrelude() {
            const stage = document.getElementById('final-stage');
            const text = CONTENT.finalQuestion.prelude[this.finalPreludeIndex];
            if (!stage || !text) return;
            stage.replaceChildren();
            const line = el('h1', 'text-large');
            stage.appendChild(line);
            this.typeText(line, text, 28);
        },

        advanceFinalPrelude() {
            if (this.currentId !== 'final-question') return;
            if (this.finalChoiceShown) return;
            if (this.finishTyping()) return;
            this.finalPreludeIndex += 1;
            if (this.finalPreludeIndex >= CONTENT.finalQuestion.prelude.length) {
                this.showFinalChoice();
                return;
            }
            this.showFinalPrelude();
        },

        showFinalChoice() {
            const stage = document.getElementById('final-stage');
            const hint = document.querySelector('#chapter-final-question .tap-hint');
            if (!stage) return;
            this.finalChoiceShown = true;
            if (hint) hint.classList.add('hidden');
            stage.replaceChildren();
            stage.append(
                el('p', 'heading-chapter', 'for real this time'),
                el('p', 'letter-text', CONTENT.finalQuestion.letter),
                el('h1', 'heading-section mt-xl', CONTENT.finalQuestion.question)
            );
            const actions = el('div', 'question-actions');
            const yes = button(CONTENT.finalQuestion.yesText, 'btn-primary');
            const no = button(CONTENT.finalQuestion.noText, 'btn-secondary');
            const realNo = button('No, really', 'btn-real-no hidden');
            const status = el('p', 'hint hidden');
            yes.addEventListener('click', (event) => {
                event.stopPropagation();
                this.sayYes();
            });
            no.addEventListener('click', (event) => {
                event.stopPropagation();
                this.handleNo(no, realNo, status);
            });
            realNo.addEventListener('click', (event) => {
                event.stopPropagation();
                no.disabled = true;
                realNo.disabled = true;
                realNo.textContent = 'No, really ✓';
                status.textContent = 'Okay. I respect that completely. No pressure, ever. 💛';
                status.classList.remove('hidden');
            });
            actions.append(yes, no, realNo);
            stage.append(actions, status);
        },

        handleNo(no, realNo, status) {
            const messages = CONTENT.finalQuestion.noMessages;
            const index = Math.min(this.noClickCount, messages.length - 1);
            no.textContent = messages[index];
            no.classList.remove('no-button-shake');
            void no.offsetWidth;
            no.classList.add('no-button-shake');
            this.noClickCount += 1;
            if (this.noClickCount >= messages.length) {
                realNo.classList.remove('hidden');
                status.textContent = 'No is always a real answer. The other button is here for exactly that. 💛';
                status.classList.remove('hidden');
            }
        },

        buildYesFinale() {
            const inner = this.makeChapter('yes-finale', 'phase-celebration', {
                onEnter: () => this.startCelebration()
            });
            const title = el('h1', 'text-large', CONTENT.yesFinale.line1);
            title.style.animation = 'celebrateText 0.8s var(--ease-bounce) both';
            const message = el('p', 'letter-text text-center');
            message.textContent = CONTENT.yesFinale.finalMessage;
            const photos = el('div', 'celebration-photos');
            CONTENT.yesFinale.photos.forEach((src, index) => {
                const photo = el('img', 'celebration-photo');
                photo.src = src;
                photo.alt = 'A favorite memory';
                photo.loading = 'eager';
                photo.style.animationDelay = `${0.5 + index * 0.12}s`;
                this.watchImage(photo);
                photos.appendChild(photo);
            });
            inner.append(title, message, photos);
            this.addNext(inner, 'ending', 'Stay a little longer');
        },

        buildEnding() {
            const inner = this.makeChapter('ending', 'phase-celebration');
            inner.append(
                el('p', 'heading-chapter', 'the end, for now'),
                el('h1', 'heading-section', CONTENT.ending.line1),
                el('p', 'text-cinematic mt-xl', CONTENT.ending.line2)
            );
            const replay = button('Read it again', 'btn-continue');
            replay.addEventListener('click', () => this.show('intro'));
            inner.appendChild(replay);
        },

        makeConversation(messages) {
            const conversation = el('div', 'conversation');
            messages.forEach((message, index) => {
                const bubble = el('div', `msg-bubble ${message.sender === 'rachit' ? 'sent' : 'received'}`, message.text);
                bubble.style.animationDelay = `${0.2 + index * 0.35}s`;
                conversation.appendChild(bubble);
            });
            return conversation;
        },

        show(id) {
            const chapter = this.chapters.get(id);
            if (!chapter) return;
            this.cancelAsyncWork();
            if (this.currentId) {
                const previous = this.chapters.get(this.currentId);
                if (previous) previous.section.classList.remove('active');
                if (window.StorageManager) StorageManager.completeChapter(this.currentId);
            }
            this.currentId = id;
            phaseNames.forEach((name) => document.body.classList.remove(name));
            document.body.classList.add(chapter.phase);
            chapter.section.classList.add('active');
            chapter.section.scrollTop = 0;
            if (window.StorageManager) StorageManager.set('currentChapter', id);
            if (chapter.onEnter) chapter.onEnter();
            window.setTimeout(() => chapter.section.focus({ preventScroll: true }), 0);
        },

        typeText(target, text, speed = 25) {
            this.cancelTyping();
            target.replaceChildren();
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reducedMotion) {
                target.textContent = text;
                return;
            }
            const job = { target, text, index: 0, timer: null };
            this.typing = job;
            const step = () => {
                if (this.typing !== job) return;
                if (job.index >= text.length) {
                    this.typing = null;
                    return;
                }
                target.append(document.createTextNode(text[job.index]));
                job.index += 1;
                job.timer = window.setTimeout(step, speed);
            };
            step();
        },

        finishTyping() {
            if (!this.typing) return false;
            const job = this.typing;
            window.clearTimeout(job.timer);
            job.target.textContent = job.text;
            this.typing = null;
            return true;
        },

        cancelTyping() {
            if (!this.typing) return;
            window.clearTimeout(this.typing.timer);
            this.typing = null;
        },

        defer(callback, delay) {
            const timer = window.setTimeout(callback, delay);
            this.timers.push({ timer, type: 'timeout' });
            return timer;
        },

        interval(callback, delay) {
            const timer = window.setInterval(callback, delay);
            this.timers.push({ timer, type: 'interval' });
            return timer;
        },

        cancelAsyncWork() {
            this.cancelTyping();
            this.timers.forEach(({ timer, type }) => {
                if (type === 'interval') window.clearInterval(timer);
                else window.clearTimeout(timer);
            });
            this.timers = [];
        },

        startCounter() {
            const display = document.getElementById('time-counter-display');
            if (!display) return;
            const update = () => {
                const difference = Math.max(0, Date.now() - new Date(CONTENT.timeCounter.startDate).getTime());
                const seconds = Math.floor(difference / 1000);
                const values = {
                    days: Math.floor(seconds / 86400),
                    hours: Math.floor((seconds % 86400) / 3600),
                    minutes: Math.floor((seconds % 3600) / 60),
                    seconds: seconds % 60
                };
                Object.entries(values).forEach(([unit, value]) => {
                    const valueEl = display.querySelector(`[data-unit="${unit}"] .counter-value`);
                    if (valueEl) valueEl.textContent = String(value).padStart(unit === 'days' ? 1 : 2, '0');
                });
            };
            update();
            this.interval(update, 1000);
        },

        openNote(note, opener) {
            const popup = document.getElementById('popup');
            const title = document.getElementById('popup-title');
            const body = document.getElementById('popup-body');
            if (!popup || !title || !body) return;
            this.popupOpener = opener;
            title.textContent = `${note.emoji} ${note.label}`;
            body.replaceChildren(el('p', '', note.message));
            if (note.hasAudio && note.audioSrc && note.audioAvailable) {
                const play = button('Play my message', 'btn-continue');
                play.addEventListener('click', () => {
                    if (window.AudioManager) AudioManager.playVoice(note.audioSrc);
                });
                body.appendChild(play);
            }
            popup.classList.remove('hidden');
            document.getElementById('popup-close').focus();
        },

        closePopup() {
            const popup = document.getElementById('popup');
            if (popup) popup.classList.add('hidden');
            if (this.popupOpener) this.popupOpener.focus();
            this.popupOpener = null;
        },

        startCelebration() {
            if (window.StorageManager) StorageManager.update({ finalAnswer: 'yes', finalSeen: true });
            if (typeof window.confetti === 'function') {
                const colors = ['#ffd700', '#f5c882', '#ff4d6d', '#fff0f3'];
                window.confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors });
                this.defer(() => window.confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors }), 300);
                this.defer(() => window.confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors }), 300);
            }
            if (window.Particles && !Particles.isRunning) {
                Particles.init();
                Particles.heartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
            }
        },

        sayYes() {
            this.show('yes-finale');
        },

        watchImage(image) {
            image.addEventListener('error', () => {
                image.alt = 'This memory could not load';
                image.style.opacity = '0.25';
            }, { once: true });
        },

        updateClueCounter() {
            const counter = document.getElementById('clue-counter');
            if (!counter || !window.StorageManager) return;
            const found = StorageManager.get('cluesFound') || [];
            const total = (CONTENT.clues || []).length;
            counter.textContent = `${found.length} / ${total} little clues found`;
            counter.classList.toggle('visible', found.length > 0);
        },

        bindGlobalEvents() {
            const popup = document.getElementById('popup');
            const popupClose = document.getElementById('popup-close');
            if (popup) popup.addEventListener('click', (event) => {
                if (event.target === popup) this.closePopup();
            });
            if (popupClose) popupClose.addEventListener('click', () => this.closePopup());
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && popup && !popup.classList.contains('hidden')) this.closePopup();
            });

            const musicToggle = document.getElementById('music-toggle');
            const musicClose = document.getElementById('music-close');
            if (musicToggle) musicToggle.addEventListener('click', () => this.toggleMusic());
            if (musicClose) musicClose.addEventListener('click', () => this.toggleMusic(false));
        },

        toggleMusic(forceOpen) {
            const player = document.getElementById('music-player');
            const iframe = document.getElementById('spotify-iframe');
            if (!player || !iframe) return;
            const open = typeof forceOpen === 'boolean' ? forceOpen : !player.classList.contains('visible');
            if (open) {
                if (!iframe.src) {
                    const id = CONTENT.music.spotifyTrackId;
                    const time = CONTENT.music.spotifyStartTime || 0;
                    iframe.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0&t=${time}`;
                }
                player.classList.remove('hidden');
                requestAnimationFrame(() => player.classList.add('visible'));
            } else {
                player.classList.remove('visible');
            }
        }
    };

    window.JupiterApp = App;
    App.init();
})();

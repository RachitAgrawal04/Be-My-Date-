/**
 * ═══════════════════════════════════════════════════════════
 *  PROJECT JUPITER — CONTENT CONFIGURATION
 *  All personal content lives here. Nothing is hardcoded
 *  in the application logic. Edit this file to change
 *  any text, photo, message, or lore item.
 * ═══════════════════════════════════════════════════════════
 */

const CONTENT = {

    // ─── Identity ───
    recipient: {
        name: "Jupiter",
        realName: "Radhika",
        nickname: "Bauni",
    },
    creator: {
        name: "Earth",
        realName: "Rachit",
        signOff: "XOXO",
    },

    // ─── Site Meta ───
    siteTitle: "For Jupiter 🌻",
    siteDescription: "A tiny interactive universe that exists because of us.",

    // ─── Key Dates ───
    dates: {
        spiderManStory: "2026-05-05",
        firstNight: "2026-05-07",
        firstMeeting: "2026-08-22T17:00:00+05:30",
        firstHeldHands: "2026-09-14",
        firstHug: "2026-09-17",
        firstKiss: "2026-09-17",
        wentToBangalore: "2026-09-19",
    },

    // ═══════════════════════════════════════
    //  CHAPTER 00: LOCKED INTRO
    // ═══════════════════════════════════════
    intro: {
        lines: [
            { text: "Hey, Jupiter.", pause: 2000 },
            { text: "I made you something.", pause: 2000 },
            { text: "Again.", pause: 1800 },
            { text: "Before you open it, promise me one thing.", pause: 0, waitForTap: true },
            { text: "Stay until the end.", pause: 1800 },
            { text: "I'm trusting you on this one.", pause: 0, small: true, waitForTap: true },
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 01: V1 CALLBACK
    // ═══════════════════════════════════════
    v1Callback: {
        oldTitle: "You have something special...",
        photo: "photos/her/cover.jpeg",
        afterLines: [
            "You did.",
            "But I had more to say.",
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 02: SPIDER-MAN ORIGIN
    // ═══════════════════════════════════════
    origin: {
        date: "5 May",
        title: "SPIDER-MAN",
        storyLines: [
            "A completely normal Instagram story.",
        ],
        conversation: [
            { sender: "rachit", text: "Saw you liked the Spider-man story. Thinking of joining?" },
            { sender: "jupiter", text: "Mere exams hai." },
        ],
        afterLine: "And that's how this started.",
    },

    // ═══════════════════════════════════════
    //  CHAPTER 03: THE FIRST NIGHT
    // ═══════════════════════════════════════
    firstNight: {
        date: "7 May",
        timestamps: ["12:06 AM", "1:07 AM", "2:14 AM", "2:31 AM"],
        afterLines: [
            "That was the first of many nights.",
            "One night of talking.",
            "A month of silence.",
            "Then another night.",
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 04: 22 AUGUST
    // ═══════════════════════════════════════
    august22: {
        date: "22 AUGUST 2026",
        time: "~5:00 PM",
        location: "Yamuna Ghat",
        fragments: [
            "I was there for NGO work.",
            "You arrived on a scooty.",
            "I wasn't even sure it was you.",
            "Then I saw your face.",
            "And somehow... I just started walking towards you.",
        ],
        beautifulLine: "You looked beautiful.",
        shockedLine: "And you looked absolutely fucking shocked.",
        explanation: [
            "I found out that night why you looked so stunned.",
            "You were having a terrible day.",
            "And apparently, running into me was not exactly on your schedule.",
        ],
        spiderManCallback: {
            intro: "So naturally, I brought Spider-Man back.",
            rachit: "Did u see the Spider-Man BND movie then?",
            jupiter: "No, I didn't get the chance.",
        },
        kajalCredit: {
            title: "Special thanks to Kajal.",
            subtitle: "For saving an otherwise increasingly awkward conversation.",
            quote: "Arey Radhika ko toh bye bol do.",
        },
    },

    // ═══════════════════════════════════════
    //  CHAPTER 05: TIME WITH YOU
    // ═══════════════════════════════════════
    timeCounter: {
        title: "A Very Unnecessary Statistic",
        since: "22 August 2026, ~5:00 PM",
        startDate: "2026-08-22T17:00:00+05:30",
        subtext: "I apparently started counting.",
    },

    // ═══════════════════════════════════════
    //  CHAPTER 06: LITTLE THINGS I REMEMBER
    // ═══════════════════════════════════════
    littleThings: [
        { category: "Things you say", detail: "\"Bohat maarungiiiii.\"" },
        { category: "Things you do", detail: "Stealing my sentences and then throwing them back at me." },
        { category: "Things you like", detail: "Sunflowers 🌻" },
        { category: "Things you're weird about", detail: "Not liking your own singing. (You're wrong about that, by the way.)" },
        { category: "Things I notice", detail: "When you go quiet." },
        { category: "Things you probably don't know I remember", detail: "The exact way you looked at me the first time we met." },
        { category: "A fact you told me", detail: "When there is no sun, sunflowers face each other." },
        { category: "Your height", detail: "5 feet of absolute chaos." },
    ],

    // ═══════════════════════════════════════
    //  CHAPTER 07: OUR LORE
    // ═══════════════════════════════════════
    lore: {
        title: "OUR LORE",
        subtitle: "The things that would make absolutely no sense to anyone else.",
        items: [
            {
                id: "ceiling",
                title: "What's up?",
                reveal: "Ceiling.",
                interaction: "type", // user types answer
                correctAnswer: "ceiling",
            },
            {
                id: "duvasu",
                title: "IIT DUVASU",
                reveal: "An institution of questionable prestige.",
                interaction: "tap",
            },
            {
                id: "knee-brain",
                title: "Ghutne me unused dimaag",
                reveal: "Gift wrapped. Never been used.",
                interaction: "tap",
            },
            {
                id: "scooty",
                title: "Scooty",
                reveal: "Many new souls arriving in heaven.",
                interaction: "tap",
            },
            {
                id: "charms",
                title: "My charms",
                reveal: "Apparently they exist. Unverified by independent sources.",
                interaction: "tap",
            },
            {
                id: "wooh",
                title: "WOOOOOOOOOH",
                reveal: "The universal stress-relief mechanism.",
                interaction: "tap",
            },
            {
                id: "teena",
                title: "Teena",
                reveal: "Best friends with the most annoying girl in school.",
                interaction: "tap",
            },
            {
                id: "5ft",
                title: "5 ft of chaos",
                reveal: "Small in height. Enormous in threats of physical violence.",
                interaction: "tap",
            },
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 08: MEMORY DETECTIVE
    // ═══════════════════════════════════════
    detective: {
        questions: [
            {
                question: "Which came first?",
                options: [
                    "The Spider-Man story",
                    "The first late-night call",
                    "Meeting at Yamuna Ghat",
                ],
                correct: 0,
            },
            {
                question: "Which conversation actually happened?",
                options: [
                    "\"Let's watch a movie together someday.\"",
                    "\"Mere exams hai.\"",
                    "\"I've been thinking about you all day.\"",
                ],
                correct: 1,
            },
            {
                question: "Who said this: \"Arey Radhika ko toh bye bol do\"?",
                options: [
                    "Rachit",
                    "Jupiter",
                    "Kajal",
                ],
                correct: 2,
            },
            {
                question: "What did I message you first about?",
                options: [
                    "Your Instagram photos",
                    "The Spider-Man story",
                    "A homework question",
                ],
                correct: 1,
            },
        ],
        passMessage: "You remembered.",
        certificate: "Jupiter Lore Certified ✦",
    },

    // ═══════════════════════════════════════
    //  CHAPTER 09: THINGS I NEVER TOLD YOU
    // ═══════════════════════════════════════
    neverTold: [
        {
            label: "Something I remember",
            text: "The first time you laughed at something I said — genuinely laughed — I knew I was in trouble.",
        },
        {
            label: "Something I admire",
            text: "How you fight for the people you love. Even when you're tired. Even when no one notices.",
        },
        {
            label: "Something I never said",
            text: "There were nights in Bangalore where I'd replay our conversations just to hear your voice in my head.",
        },
        {
            label: "Something you've changed",
            text: "I used to think being vulnerable was a weakness. You made it feel safe.",
        },
        {
            label: "Something I'm scared to lose",
            text: "I don't want the distance to make us forget how easy it is to feel close.",
        },
    ],

    // ═══════════════════════════════════════
    //  CHAPTER 10: DISTANCE
    // ═══════════════════════════════════════
    distance: {
        from: "Bangalore",
        to: "Mathura",
        line1: "A lot of kilometres.",
        line2: "Still the same person.",
    },

    // ═══════════════════════════════════════
    //  CHAPTER 11: OUR MEMORIES
    // ═══════════════════════════════════════
    memories: {
        title: "We really should take more pictures.",
        subtitle: "We have this terrible habit of talking about taking one... and then forgetting.",
        photos: [
            {
                src: "photos/moments/yamuna-flowers.jpg",
                date: "11 September",
                caption: "Morning walk at Yamuna Ghat",
                story: "I woke up early and gathered flowers from Jawahar Bagh before you arrived.",
            },
            {
                src: "photos/moments/birla-1.jpg",
                date: "14 September",
                caption: "Your photoshoot at Birla Mandir",
                story: "You kept trying to avoid the camera. I kept clicking anyway.",
            },
            {
                src: "photos/moments/birla-shy.jpg",
                date: "14 September",
                caption: "Camera shy",
                story: "This is the face you make every time I point a camera at you.",
            },
            {
                src: "photos/her/in-hoodie.jpg",
                date: "19 September",
                caption: "In my hoodie",
                story: "You were so happy wearing that. I was so happy seeing you in it.",
            },
            {
                src: "photos/us/yamuna-1.jpg",
                date: "11 September",
                caption: "Us at Yamuna Ghat",
                story: "We tried to take a good photo. We failed. This is still my favorite.",
            },
            {
                src: "photos/moments/burger-king.jpg",
                date: "10 September",
                caption: "The Burger King Incident",
                story: "You inhaling a terrible cold coffee because your hostel was about to close.",
            },
            {
                src: "photos/moments/photo-frame.jpg",
                date: "18 September",
                caption: "Your gift to me",
                story: "The photo frame with our dates. First held hands: 14th. First hug: 17th. First kiss: 17th.",
            },
            {
                src: "photos/moments/rose-phool.jpg",
                date: "A random day",
                caption: "\"A phool for my fool\"",
                story: "Your caption, not mine. I'm keeping the rose AND the insult.",
            },
            {
                src: "photos/us/videocall-1.jpg",
                date: "After Bangalore",
                caption: "Video call",
                story: "The screen became our meeting spot.",
            },
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 12: FUTURE
    // ═══════════════════════════════════════
    future: {
        title: "Things We Haven't Done Yet",
        items: [
            "That canteen spot behind school.",
            "Watch all the movies I grew up with.",
            "Take the photo we always forget to take.",
            "A random trip with no plan.",
            "Another sunrise.",
            "Sing together badly.",
        ],
        mystery: "We'll figure this one out later.",
    },

    // ═══════════════════════════════════════
    //  CHAPTER 13: OPEN WHEN
    // ═══════════════════════════════════════
    openWhen: [
        {
            label: "Open when you miss me",
            emoji: "🥺",
            message: "Well obviously you do, everyone does ;) But seriously — I miss you too. Probably more than you miss me, if we're being honest. Close your eyes, think of our dumbest conversation, and smile. I'm right there. 💫",
        },
        {
            label: "Open when you're angry at me",
            emoji: "😤",
            message: "Okay. I probably did something dumb. I know. But remember that time I walked across Yamuna Ghat towards you without thinking? That person didn't go anywhere. He just occasionally says stupid things. Forgive him. He's trying. ❤️",
        },
        {
            label: "Open when you need to laugh",
            emoji: "😊",
            message: "Remember the Burger King cold coffee? The way you panicked about hostel timing while I just stood there laughing? That's us. Chaos and laughter. Always. 🍕",
        },
        {
            label: "Open when you need to hear me",
            emoji: "🎵",
            message: "I can't be there in person right now. But my voice hasn't gone anywhere. Close your eyes and listen. I'm singing this one for you.",
            hasAudio: true,
            // No recording has been added to /audio/voice yet. Switch this to
            // true once for-you.mp3 is present, so visitors never see a broken
            // audio control.
            audioAvailable: false,
            audioSrc: "audio/voice/for-you.mp3",
        },
    ],

    // ═══════════════════════════════════════
    //  CHAPTER 14: I MISS YOU
    // ═══════════════════════════════════════
    missYou: {
        lines: [
            { text: "I miss you.", pause: 3000 },
            { text: "More than I thought I would.", pause: 2500 },
            { text: "So I did what I know how to do.", pause: 2500 },
            { text: "I made you something.", pause: 2500 },
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 15: FINAL QUESTION
    // ═══════════════════════════════════════
    finalQuestion: {
        prelude: [
            "Jupiter.",
            "I know I joke a lot.",
            "I know I annoy you a lot.",
            "I know I can probably make you threaten to beat me up within approximately seven minutes.",
            "But I want you to know something.",
        ],
        letter: "You are the most unexpected, most stubborn, most beautiful thing that ever happened to me. You showed up when I wasn't looking, and you stayed when I didn't ask. Every inside joke, every late night, every awkward silence that somehow felt comfortable — it all added up to something I didn't plan but can't imagine losing.\n\nI love you.",
        question: "Will you keep being my person while I'm away?",
        yesText: "Yes",
        noText: "No",
        noMessages: [
            "Really?",
            "You sure about that?",
            "Bauni.",
            "Okay fine. There's another button.",
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 16: YES FINALE
    // ═══════════════════════════════════════
    yesFinale: {
        line1: "You said yes.",
        voiceClip: "audio/voice/you-said-yes.mp3", // placeholder
        finalMessage: "It's you and me, Jupiter.\nAgainst the distance.\nAgainst the time zones.\nAgainst everything.",
        spotifyTrackId: "6rRqA9lDHi7KlhelFfbXCs", // Sway - Michael Bublé
        photos: [
            "photos/her/beautiful.jpg",
            "photos/us/yamuna-1.jpg",
            "photos/moments/birla-1.jpg",
            "photos/her/in-hoodie.jpg",
            "photos/moments/yamuna-flowers.jpg",
            "photos/her/cover.jpeg",
        ],
    },

    // ═══════════════════════════════════════
    //  CHAPTER 17: QUIET ENDING
    // ═══════════════════════════════════════
    ending: {
        line1: "Until I get back, this little universe is yours.",
        line2: "See you outside the screen.",
    },

    // ═══════════════════════════════════════
    //  HIDDEN CLUES
    // ═══════════════════════════════════════
    clues: [
        { id: "spider", chapter: "origin", hint: "🕷️" },
        { id: "22", chapter: "august22", hint: "✦" },
        { id: "sunflower", chapter: "little-things", hint: "🌻" },
        { id: "earth-jupiter", chapter: "distance", hint: "🌍" },
        { id: "wooh", chapter: "lore", hint: "✦" },
    ],

    // ═══════════════════════════════════════
    //  RETURN VISITS
    // ═══════════════════════════════════════
    returnVisit: {
        second: "You're back.",
        secondExtra: "I hid something else.",
        third: "Okay, now you're cheating.",
    },

    // ═══════════════════════════════════════
    //  MUSIC
    // ═══════════════════════════════════════
    music: {
        spotifyTrackId: "6rRqA9lDHi7KlhelFfbXCs",
        spotifyStartTime: 0,
    },
};

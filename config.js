/**
 * ═══════════════════════════════════════════════════════════
 *  JUPITER'S SURPRISE PAGE — CONFIGURATION
 *  Edit this file to customize everything!
 * ═══════════════════════════════════════════════════════════
 */

const CONFIG = {
    // ─── Names ───
    recipient: {
        name: "Jupiter",          // Display name (nickname)
        realName: "Radhika",      // Real name (used in special moments)
    },
    creator: {
        name: "Earth",          // Your sign-off name
        signOff: "XOXO",         // Sign-off text on love notes
    },

    // ─── The Big Question ───
    pageTitle: "Hi Jupiter 🌹",
    icon: "🌹",
    question: "Will u be someone i can ragebait all day, forever?",
    subtitle: "Will u be my love... love?",
    yesText: "Yes",
    noText: "No",

    // ─── Main GIF (shown on the question screen) ───
    mainGif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHg4N2V1bDVhOHcxcmR5ZWhlYjd5Zmx6M2dybHFxMHVzcXVtcXdpciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zl7u48zLVFgLpRwq6f/giphy.gif",

    // ─── Celebration GIF (shown after YES) ───
    celebrationGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajlyMXBnenJ1bTQzMmk3aWZhaDU0NHVhYjBodm1lMWR4ZnFpNDNubSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ukmZRuEqc2Rbi/giphy.gif",

    // ─── Story Mode (screens shown before the question) ───
    // Set storyEnabled to false to skip straight to the question (like BeMyVal)
    storyEnabled: true,
    storyScreens: [
        {
            text: "Hey Jupiter... 🌙",
            subtext: "",
            delay: 2500, // ms before auto-advance (0 = wait for tap)
        },
        {
            text: "There are a few things I've been meaning to tell you...",
            subtext: "",
            delay: 3000,
        },
        {
            text: "Like how you somehow manage to make my worst days better.",
            subtext: "Even when you take an hour to reply 😤",
            delay: 3500,
        },
    ],

    // ─── Intro Photo ───
    introImage: "photos/Her photos/Photo 2_Cover image_highest priority.jpeg",
    introImageAlt: "Jupiter",

    // ─── "Open When..." Envelopes ───
    // Set envelopesEnabled to false to skip this section
    envelopesEnabled: true,
    envelopes: [
        {
            label: "Open when you're sad",
            emoji: "😢",
            message: "Hey you. Whatever happened today, I need you to know — you are the most incredible person I know. And if the world is being mean to you, just remember: I'm always on your team. Always. ❤️"
        },
        {
            label: "Open when you miss me",
            emoji: "🥺",
            message: "Well obviously you do, everyone does ;) But seriously, I miss you too. Probably more than you miss me, if we're being honest. But hey — close your eyes, think of our dumbest conversation, and smile. I'm right there. 💫"
        },
        {
            label: "Open when you need a smile",
            emoji: "😊",
            message: "Remember that time you laughed so hard you couldn't breathe? That's my favorite version of you. But honestly, every version of you is my favorite. Now stop being sad and go eat something nice. 🍕"
        },
        {
            label: "Open when you can't sleep",
            emoji: "🌙",
            message: "Can't sleep? Neither can I, probably. I'm probably up thinking about something you said three days ago that made me smile. Close your eyes. I'll be in your dreams. Hopefully the good ones. 🌟"
        },
        {
            label: "Open when you wonder why I love you",
            emoji: "💕",
            message: "Because you're you. Because you laugh at my terrible jokes. Because you make the ordinary feel extraordinary. Because every moment with you feels like the universe finally got something right. Because whenever i am with you, clock ticks 10X faster than usual. 🌹"
        },
    ],

    // ─── No Button Behavior ───
    // Options: "evader" | "teleporter" | "shrinker" | "fake" | "reverse" | "chaos"
    noBehavior: "chaos",

    // Reverse mode messages (shown in sequence when No is clicked)
    reverseMessages: [
        "No",
        "Are you sure?",
        "Really sure? 🥺",
        "Think again...",
        "You're breaking my heart 💔",
        "I'm gonna cry...",
        "Okay fine... 😭",
        "Just kidding, click Yes! 💕",
    ],

    // ─── Music ───
    // Spotify track ID (extracted from the URL)
    musicEnabled: true,
    spotifyTrackId: "6rRqA9lDHi7KlhelFfbXCs", // Sway - Michael Bublé
    spotifyStartTime: 0, // seconds

    // ─── Love Note ───
    loveNoteEnabled: true,
    loveNote: "I love how we can be silly, serious, and everything in between. You make me want to be a better person (though i am pretty awesome guy as is :) ).\nYou are my Mahayagya Ka Puraskaar, as Yashpal sir would say...",

    // ─── Celebration (after YES) ───
    celebration: {
        confetti: true,
        hearts: true,
        fireworks: true,
        endingMessage: "It's official then. Yayyyyyy!! 😌",
        // Alternative endings you can swap in:
        // "Mission accomplished. You have successfully made one person very happy. ❤️"
        // "Okay, now screenshot this. I want proof. 😌"
    },

    // ─── Theme Colors ───
    theme: {
        primaryPink: "#ff4d6d",
        softPink: "#ff8fa3",
        deepCrimson: "#c9184a",
        bgDark: "#1a0a10",
        bgDarkAlt: "#2d0a1e",
        textLight: "#fff0f3",
        textMuted: "#ffb3c1",
        glass: "rgba(255, 77, 109, 0.08)",
    }
};

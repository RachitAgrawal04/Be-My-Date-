# 🌹 Jupiter's Surprise Page — Implementation Plan

A standalone, cinematic romantic surprise website for Radhika (Jupiter). Pure frontend (HTML/CSS/JS), hostable anywhere. No backend, no framework — just raw craftsmanship.

## Summary

Build a multi-screen cinematic love experience that takes Jupiter through an animated story, interactive envelopes, a playful Yes/No question with mischievous No-button behaviors, and an explosive celebration when she says Yes.

---

## Core Experience Flow

```
SCREEN 1: "Tap to begin" — envelope opening animation
    ↓
SCREEN 2: "Hey Jupiter..." — soft fade-in, typewriter text
    ↓
SCREEN 3: "There are a few things I've been meaning to tell you..." — personal message
    ↓
SCREEN 4: Photo memories — your photos with captions, parallax scroll
    ↓
SCREEN 5: "Open when..." envelopes — interactive floating envelopes
    ↓
SCREEN 6: The Question — "Will u be someone I can ragebait all day, forever?"
           YES / NO (with mischievous No-button)
    ↓
SCREEN 7: 🎉 Celebration — confetti, hearts, music, final message
```

---

## Feature Breakdown

### 1. Cinematic Story Mode
- **Full-screen sections** that scroll/transition vertically
- **Typewriter text animation** for each message reveal
- Each screen has its own ambient animation (floating hearts, gentle particles, parallax stars)
- Smooth transitions between sections using CSS scroll-snap or JS-driven navigation
- Navigation dots on the side to show progress

### 2. Interactive No-Button Behaviors
All 6 behaviors, randomly cycling in "Chaos" mode:

| Behavior | Description |
|----------|-------------|
| **Evader** | Dodges cursor/finger, touch-aware positioning |
| **Teleporter** | Swaps position with Yes button |
| **Shrinker** | Gets progressively smaller each click |
| **Fake No** | Shows "Are you sure?" → Yes becomes enormous |
| **Reverse** | Each click makes text more romantic ("No?" → "🥺" → "You're breaking my heart") |
| **Chaos** | Randomly switches between all above |

> Mobile-first: uses touch events, avoids edges/browser UI, keeps YES always accessible

### 3. "Open When..." Envelopes
5 interactive floating envelopes:
- 💌 Open when you're sad
- 💌 Open when you miss me
- 💌 Open when you need a smile
- 💌 Open when you can't sleep
- 💌 Open when you wonder why I love you

Each: tap → envelope flip animation → handwritten-style message reveals inside

### 4. Celebration Engine (on YES)
- Canvas confetti explosion (using canvas-confetti library)
- Floating hearts animation
- Background gradient transformation
- GIF reveal
- Spotify player auto-shows with "Sway" by Michael Bublé
- Customizable ending message
- Fireworks particle effect

### 5. Photo Memories Section
- Photos displayed in a Polaroid-style layout with captions
- Subtle tilt/parallax on hover/scroll
- Photos loaded from a `/photos` folder (creator adds their own)
- Configurable via a simple JS object at the top of the file

### 6. Background Music
- Spotify embed for "Sway" by Michael Bublé (`6rRqA9lDHi7KlhelFfbXCs`)
- Floating music button (bottom-right)
- "🎵 Tap to play our song" prompt on first interaction
- Persists across all screens

---

## Design System — 🌹 Romantic Theme

| Token | Value |
|-------|-------|
| **Primary** | `#ff4d6d` (rose pink) |
| **Secondary** | `#ff8fa3` (soft blush) |
| **Accent** | `#c9184a` (deep crimson) |
| **Background** | `#1a0a10` → `#2d0a1e` (dark romantic gradient) |
| **Text Primary** | `#fff0f3` (warm white) |
| **Text Secondary** | `#ffb3c1` (pink mist) |
| **Glass** | `rgba(255, 77, 109, 0.08)` with `backdrop-filter: blur(20px)` |
| **Font Headings** | `'Dancing Script', cursive` |
| **Font Body** | `'Quicksand', sans-serif` |

### Ambient Animations
- Floating hearts (CSS keyframes, 15+ particles)
- Gentle rose petals falling
- Soft glow/pulse on key elements
- Parallax star field on story screens
- Glassmorphism cards with subtle border glow

---

## Proposed File Structure

```
d:\Be My Valentine app\
├── index.html              ← Main page (all screens)
├── css/
│   ├── style.css           ← Core design system + layout
│   ├── animations.css      ← All keyframe animations
│   └── screens.css         ← Screen-specific styles
├── js/
│   ├── app.js              ← Main controller (screen flow, navigation)
│   ├── no-button.js        ← No-button behaviors engine
│   ├── envelopes.js        ← "Open when" envelope interactions
│   ├── celebration.js      ← YES celebration engine
│   ├── particles.js        ← Floating hearts, petals, stars
│   └── config.js           ← All customizable content (names, messages, photos)
├── photos/                 ← User adds their photos here
│   └── (placeholder.txt)
└── assets/
    └── (any additional assets)
```

### Key Design Decision: `config.js`

All personalizable content lives in ONE file:

```js
const CONFIG = {
    recipient: { name: "Jupiter", realName: "Radhika" },
    creator: { name: "Digital", signOff: "XOXO" },
    question: "Will u be someone i can ragebait all day, forever?",
    icon: "🌹",
    
    storyScreens: [
        { text: "Hey Jupiter...", delay: 2000 },
        { text: "There are a few things I've been meaning to tell you...", delay: 3000 },
        // ... customizable
    ],
    
    envelopes: [
        { label: "Open when you're sad", message: "..." },
        // ...
    ],
    
    photos: [
        { src: "photos/1.jpg", caption: "Our first..." },
        // ...
    ],
    
    music: {
        spotifyTrackId: "6rRqA9lDHi7KlhelFfbXCs",
        startTimestamp: 0
    },
    
    noBehavior: "chaos", // "evader" | "teleporter" | "shrinker" | "fake" | "reverse" | "chaos"
    
    celebration: {
        gif: "https://media.giphy.com/media/ukmZRuEqc2Rbi/giphy.gif",
        endingMessage: "It's official. Now go call me. 😌",
        confetti: true,
        fireworks: true,
        hearts: true
    },
    
    theme: "romantic" // controls color scheme
};
```

This means you can completely reconfigure the experience by editing one file — no HTML/CSS knowledge needed.

---

## Open Questions

> [!IMPORTANT]
> **Envelope messages**: I'll write placeholder messages for the 5 "Open when..." envelopes. Do you want to write your own, or should I write heartfelt but generic ones that you can customize later?

> [!IMPORTANT]
> **Story screens**: The story flow currently has 3 text screens before photos. Do you want more story screens, or should I keep it concise so it doesn't feel like she's reading a novel?

> [!NOTE]
> **No-button default**: I'll default to "Chaos" mode (randomly cycles all behaviors) since it's the most fun. The `config.js` file lets you change it to any single behavior.

---

## Verification Plan

### Manual Verification
1. **Open `index.html` in browser** — verify the full cinematic flow works
2. **Test all No-button behaviors** — verify each one (evader, teleporter, shrinker, fake, reverse, chaos)
3. **Test on mobile viewport** — resize browser to 375px width, verify touch interactions
4. **Test envelope interactions** — tap each envelope, verify animation and message reveal
5. **Test YES celebration** — verify confetti, hearts, fireworks, music player, ending message
6. **Test Spotify embed** — verify music button and player work
7. **Verify config.js** — change a few values, reload, confirm changes take effect

### Automated
- Run a local HTTP server (`python -m http.server` or `npx serve`) to verify no CORS issues with assets

# 🌹 Jupiter's Surprise Page

A standalone, cinematic, and romantic surprise web application built purely with HTML, CSS, and JavaScript. This project is designed to be a highly customizable, deeply personal digital experience that you can easily tailor for a loved one.

## 🎯 Intent

The intent of this project is to create a digital, interactive love letter. It moves away from static pages and offers a multi-screen storytelling flow. It is built to make the recipient feel special through personalized messages, interactive "Open When..." envelopes, a playful interactive question, and a showcase of shared memories.

The entire experience is completely customizable without needing to touch any HTML or CSS. Everything personal is controlled via a single configuration file (`config.js`).

## ✨ Features

- **📖 Cinematic Story Mode**: A sequential text-based storytelling flow with fade-ins and typewriter effects, setting a romantic tone before the main event.
- **💌 "Open When..." Envelopes**: A collection of virtual, tappable envelopes (e.g., "Open when you're sad", "Open when you miss me"). Tapping an envelope reveals a handwritten-style note inside.
- **❓ The Big Question**: A central proposal/question screen ("Will u be someone i can ragebait all day, forever?").
- **🏃‍♂️ Mischievous "No" Button**: The "No" button has a personality of its own. It features multiple easter egg behaviors (dodging the cursor, shrinking, reversing text, fake buttons, etc.) to playfully guarantee a "Yes".
- **🎉 Celebration Engine**: Clicking "Yes" triggers an explosive celebration screen complete with canvas confetti, fireworks, a celebration GIF, and a final personalized message.
- **📸 Memories Gallery**: A beautiful Polaroid-style photo and video gallery showcasing your favorite moments together.
- **🎵 Ambient Music Player**: An integrated, floating Spotify player (defaulting to "Sway" by Michael Bublé) to set the mood throughout the experience.

## ⚙️ How It Works (Architecture)

This project is a pure frontend application. It requires no backend, no databases, and no complex frameworks. 

### Directory Structure
```text
d:\Be My Valentine app\
├── index.html          # Main entry point containing all screens
├── config.js           # THE CONTROL CENTER. All text, settings, and media links live here.
├── css/
│   ├── style.css       # Core design system, variables, and layout
│   └── animations.css  # Keyframe animations (floating hearts, fade-ins)
├── js/
│   ├── app.js          # Main controller (screen flow, navigation)
│   ├── no-button.js    # Logic for the mischievous "No" button
│   ├── celebration.js  # Confetti and YES celebration logic
│   ├── particles.js    # Ambient background particles (hearts, stars)
│   └── envelopes.js    # Interactive envelope animations
└── photos/             # Directory to drop your personal photos and videos
```

## 🎨 How to Customize

You do not need to be a developer to customize this site! 

1. Open `config.js` in any text editor.
2. Edit the values inside the `CONFIG` object. You can change:
   - **Names & Aliases**: (e.g., "Jupiter", "Earth")
   - **Story Text**: The messages that appear one by one.
   - **Envelopes**: Add, remove, or modify the "Open When" categories and their inner messages.
   - **The Question**: Customize the main question text and YES/NO button text.
   - **Media**: Swap out the GIFs and configure your Spotify track ID.
   - **Photos**: Map the file paths of the images you place in the `/photos` folder.
3. Save the file.

## 💅 Design System & Aesthetics

- **Glassmorphism UI**: Uses translucent, frosted-glass components for the UI cards to blend seamlessly with the animated backgrounds.
- **Dynamic Theming**: Configured using CSS custom properties (`var(--primary-pink)`, etc.) for a cohesive, rich, and vibrant color palette. It looks good for the love theme.
- **Custom Typography**: Utilizes Google Fonts (*Dancing Script* for elegant headings, *Quicksand* for highly legible and modern body text).
- **Ambient Animations**: Continuous CSS keyframe animations (floating, pulsing, gentle bobbing) keep the page feeling alive at all times without requiring user interaction.

## 🛠️ Technical Highlights

- **Mobile First & Touch Optimized**: Designed to work flawlessly on smartphones. Interactions, specifically the "No" button dodging and envelope flipping, are optimized for touch events.
- **Accessible Design**: The typewriter animation respects `prefers-reduced-motion` settings for users who prefer minimal movement.
- **Zero Dependencies**: Entirely vanilla HTML/CSS/JavaScript. The only external script used is a lightweight `canvas-confetti` library for the final celebration. No React, Vue, or heavy frameworks are needed.

---
*Built with ❤️.*

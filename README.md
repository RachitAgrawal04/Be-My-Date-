# For Jupiter 🌻

An intimate, mobile-first interactive story for Radhika (“Jupiter”). It is a standalone HTML/CSS/JavaScript site: no build step, backend, account, or database is required.

## What it now is

The original short Valentine-page concept has been expanded into “Project Jupiter V2,” a complete 18-chapter experience:

1. A quiet, typed introduction and callback to the first page
2. The Spider-Man story, first late-night conversation, and first meeting at Yamuna Ghat
3. Little remembered details, inside-joke lore, and a memory quiz
4. A live time-together counter, distance chapter, and personal photo stories
5. Future plans and “Open when…” notes
6. A personal letter, a respectful yes/no question, celebration, and quiet ending

It also includes five hidden clues, progress saved in the recipient’s browser, optional Spotify music, reduced-motion support, keyboard-friendly interactions, and responsive layouts for phones.

## Run it

Open `index.html` in a browser, or serve the folder locally:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customize it

All current writing, dates, memories, local image paths, notes, and Spotify settings are in [content.js](content.js). This is the main personalization file for V2.

The page uses the local files under:

```text
photos/her/
photos/moments/
photos/us/
video/
audio/voice/
```

The “Open when you need to hear me” note is intentionally text-only right now: there is no recording in `audio/voice/`. After adding `audio/voice/for-you.mp3`, set `audioAvailable: true` for that note in `content.js` to enable its play button.

## Project structure

```text
index.html          App shell and external resources
content.js          All V2 personal content and media references
css/style.css       V2 design system and responsive components
css/animations.css  V2 motion and reduced-motion behavior
js/app.js           Chapter flow and interactions
js/storage.js       Browser-only saved progress
js/audio.js         Optional local-audio controller
js/particles.js     Celebration particles
```

`config.js` and several older scripts are retained as the original V1 source material, but they are no longer loaded by the V2 page.

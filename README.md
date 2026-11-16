# TurboType

A racing-themed typing tutor with a guided course and arcade games. Built with React + Vite; progress is stored in the browser (`localStorage`), no accounts or servers.

## Features

- **Learn** – 8 progressive levels (home row → top row → bottom row → capitals → numbers → punctuation → paragraphs). An on-screen keyboard highlights the next key (and Shift, and which finger to use). Live WPM / accuracy, and a summary after every level. Each level has an accuracy goal to pass; levels unlock in order.
- **Certificate** – finish all levels to get the course **average WPM and accuracy** on a printable certificate (print / save as PDF, or download as an image).
- **Arcade** – *Creature Defense* (type words to stop monsters reaching your castle) and *Space Invaders Typing* (blast aliens by typing their letters/words).
- **Settings** – racing theme (red stripes, checkered flag; on by default) or a plain white-and-blue theme; name for the certificate; reset progress.

## Develop

```bash
npm install
npm run dev      # start the dev server
npm test         # unit tests (levels, metrics, course progress, game engine)
npm run build    # production build in dist/
```

## Layout

- `src/data/` – keyboard layout/finger map and the course levels
- `src/lib/` – pure logic: metrics, course progress, certificate SVG, shared game engine (all unit tested)
- `src/components/` – screens and games

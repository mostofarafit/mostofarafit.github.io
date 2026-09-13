# Mostofa Rafit — Portfolio

Interactive one-page portfolio built with React + Vite and Framer Motion.

## Run

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Structure

```
public/
  rafit.jpg                  portrait used in the hero and about card
  Mostofa-Rafit-Resume.pdf   the CV served by the "Download CV" button
src/
  data/content.js            all résumé content — edit this, not the components
  components/                one file per section + ui/primitives.jsx
  styles/                    base.css design tokens + one stylesheet per section
```

`src/data/content.js` is the single source of truth for every piece of text,
date and link on the page. Changing a job, skill or award only needs an edit
there.

## Design system

Tokens live at the top of `src/styles/base.css`:

- Base: `--ink`, `--ink-2`, `--ink-3` (near-black violet ground)
- Accents: violet `#7c5cff`, coral `#ff5c7a`, lime `#c8ff5e`, cyan `#4ce0ff`
- Gradients: `--grad-main`, `--grad-cool`, `--grad-lime`, `--grad-coral`

Any element can opt into an accent pair with `data-accent="violet | coral |
lime | cyan"`, which sets `--a1` / `--a2` for that subtree — that is how the
timeline nodes, bento cards and skill chips colour themselves.

## Interaction notes

- `Preloader` gates the hero entrance; `App` passes `started` down.
- Smooth scrolling uses Lenis, disabled when `prefers-reduced-motion` is set.
- `useCardGlow()` feeds the pointer position into every `.card--glow` as
  `--mx` / `--my` for the cursor-follow sheen.
- The education section pins and scrolls horizontally above 860px and stacks
  below it.
- The contact form builds a `mailto:` link — no backend.

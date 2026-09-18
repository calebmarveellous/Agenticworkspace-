# Promo Video — The Group Chat Diagnostic Manual

A [Remotion](https://www.remotion.dev/) project that generates the promotional
video for the book sold at `site/index.html`, matching its hot-pink branding.

## Compositions

- `PromoVertical` — 1080x1920, for TikTok / Reels / Shorts (recommended for sales).
- `PromoSquare` — 1080x1080, for feed posts.

Both run a 5-scene, ~16.5s script (495 frames @ 30fps):

1. **Hook** — pattern-interrupt question to stop the scroll.
2. **Problem** — restates the pains from the landing page's problem section.
3. **Book reveal** — the book cover flies in with the title.
4. **Chapter cuts** — fast cuts through the funniest chapter titles.
5. **Price / CTA** — price, "Get The Book Now", trust line.

## Commands

```bash
npm install

# Live preview / editor
npm start

# Render the final MP4s
npm run build          # PromoVertical -> out/promo-vertical.mp4
npm run build:square   # PromoSquare   -> out/promo-square.mp4

# Render a single still (e.g. for a thumbnail)
npm run still
```

## Editing the script

- Copy: `src/scenes/*.tsx`
- Chapter list + brand colors: `src/theme.ts`
- Scene timings: `src/PromoVideo.tsx`
- Book cover asset: `public/book-cover.png` (kept in sync with `site/assets/book-cover.png`)

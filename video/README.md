# Promo Video — The Group Chat Diagnostic Manual

A [Remotion](https://www.remotion.dev/) project that generates promotional
videos for the book sold at `site/index.html`, matching its hot-pink branding.

## Variants (for hook A/B testing)

Three scripts, defined in `src/scripts.ts`, each rendered as a vertical
(1080x1920, TikTok/Reels/Shorts) and square (1080x1080, feed) composition:

| Script | Composition IDs | Hook |
|---|---|---|
| A | `PromoVerticalA` / `PromoSquareA` | "Still texting your ex 'just in case'?" |
| B | `PromoVerticalB` / `PromoSquareB` | "Your group chat has diagnosed your relationship better than any therapist" |
| C | `PromoVerticalC` / `PromoSquareC` | "Golden retriever boyfriend, or black cat boyfriend?" |

Every script runs the same 5-scene structure, timed in `src/PromoVideo.tsx`:

1. **Hook** — pattern-interrupt line to stop the scroll.
2. **Problem** — restates pains from the landing page's problem section.
3. **Book reveal** — the book cover flies in with the title.
4. **Chapter cuts** — fast cuts through a handful of chapter titles (which ones vary per script).
5. **Price / CTA** — price, call to action, trust line.

## Commands

```bash
npm install

# Live preview / editor — pick any PromoVertical*/PromoSquare* composition
npm start

# Render the final MP4s
npm run build:a   # PromoVerticalA -> out/promo-vertical-a.mp4
npm run build:b   # PromoVerticalB -> out/promo-vertical-b.mp4
npm run build:c   # PromoVerticalC -> out/promo-vertical-c.mp4
npm run build:all # all three verticals

npm run build:square:a  # PromoSquareA -> out/promo-square-a.mp4
npm run build:square:b
npm run build:square:c
```

## Voiceover

No narration is baked in yet — these are silent (text-only) cuts. To add
voiceover:

1. Record/generate one narration clip per scene (or per script) matching the
   copy in `src/scripts.ts`.
2. Drop the audio files in `public/audio/`.
3. Add `<Audio src={staticFile(...)} />` inside the relevant `Sequence` in
   `src/PromoVideo.tsx`, and adjust each `Sequence`'s `durationInFrames` to
   match the clip length so cuts land on the narration beats.

## Editing the scripts

- Per-variant copy (hook, problem lines, chapters, price/CTA): `src/scripts.ts`
- Scene visuals: `src/scenes/*.tsx`
- Brand colors/fonts: `src/theme.ts`
- Scene timings: `src/PromoVideo.tsx`
- Book cover asset: `public/book-cover.png` (kept in sync with `site/assets/book-cover.png`)

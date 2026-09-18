import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { BookReveal } from "./scenes/BookReveal";
import { ChapterCuts, FRAMES_PER_CHAPTER } from "./scenes/ChapterCuts";
import { PriceCTA } from "./scenes/PriceCTA";
import { Script, scripts } from "./scripts";

export const HOOK_DURATION = 75;
export const PROBLEM_DURATION = 90;
export const REVEAL_DURATION = 90;
export const CTA_DURATION = 120;

export const getPromoDurationInFrames = (script: Script) =>
  HOOK_DURATION +
  PROBLEM_DURATION +
  REVEAL_DURATION +
  script.chapters.length * FRAMES_PER_CHAPTER +
  CTA_DURATION;

export const PromoVideo: React.FC<{ script: Script }> = ({ script }) => {
  const chaptersDuration = script.chapters.length * FRAMES_PER_CHAPTER;

  let cursor = 0;
  const hookFrom = cursor;
  cursor += HOOK_DURATION;
  const problemFrom = cursor;
  cursor += PROBLEM_DURATION;
  const revealFrom = cursor;
  cursor += REVEAL_DURATION;
  const chaptersFrom = cursor;
  cursor += chaptersDuration;
  const ctaFrom = cursor;

  return (
    <AbsoluteFill>
      <Sequence from={hookFrom} durationInFrames={HOOK_DURATION}>
        <Hook text={script.hook} />
      </Sequence>
      <Sequence from={problemFrom} durationInFrames={PROBLEM_DURATION}>
        <Problem lines={script.problemLines} />
      </Sequence>
      <Sequence from={revealFrom} durationInFrames={REVEAL_DURATION}>
        <BookReveal title={script.bookTitle} subtitle={script.bookSubtitle} />
      </Sequence>
      <Sequence from={chaptersFrom} durationInFrames={chaptersDuration}>
        <ChapterCuts chapters={script.chapters} />
      </Sequence>
      <Sequence from={ctaFrom} durationInFrames={CTA_DURATION}>
        <PriceCTA
          price={script.price}
          note={script.priceNote}
          cta={script.cta}
          trustLine={script.trustLine}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export { scripts };

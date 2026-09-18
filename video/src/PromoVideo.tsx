import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { BookReveal } from "./scenes/BookReveal";
import { ChapterCuts } from "./scenes/ChapterCuts";
import { PriceCTA } from "./scenes/PriceCTA";

export const HOOK_DURATION = 75;
export const PROBLEM_DURATION = 90;
export const REVEAL_DURATION = 90;
export const CHAPTERS_DURATION = 120;
export const CTA_DURATION = 120;

export const PROMO_DURATION_IN_FRAMES =
  HOOK_DURATION +
  PROBLEM_DURATION +
  REVEAL_DURATION +
  CHAPTERS_DURATION +
  CTA_DURATION;

export const PromoVideo: React.FC = () => {
  let cursor = 0;
  const hookFrom = cursor;
  cursor += HOOK_DURATION;
  const problemFrom = cursor;
  cursor += PROBLEM_DURATION;
  const revealFrom = cursor;
  cursor += REVEAL_DURATION;
  const chaptersFrom = cursor;
  cursor += CHAPTERS_DURATION;
  const ctaFrom = cursor;

  return (
    <AbsoluteFill>
      <Sequence from={hookFrom} durationInFrames={HOOK_DURATION}>
        <Hook />
      </Sequence>
      <Sequence from={problemFrom} durationInFrames={PROBLEM_DURATION}>
        <Problem />
      </Sequence>
      <Sequence from={revealFrom} durationInFrames={REVEAL_DURATION}>
        <BookReveal />
      </Sequence>
      <Sequence from={chaptersFrom} durationInFrames={CHAPTERS_DURATION}>
        <ChapterCuts />
      </Sequence>
      <Sequence from={ctaFrom} durationInFrames={CTA_DURATION}>
        <PriceCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

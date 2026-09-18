import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, chapters } from "../theme";

const FRAMES_PER_CHAPTER = 20;

export const ChapterCuts: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const index = Math.min(
    Math.floor(frame / FRAMES_PER_CHAPTER),
    chapters.length - 1
  );
  const localFrame = frame - index * FRAMES_PER_CHAPTER;
  const [num, title] = chapters[index];

  const opacity = interpolate(localFrame, [0, 6, FRAMES_PER_CHAPTER - 4, FRAMES_PER_CHAPTER], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(localFrame, [0, 6], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.fontFamily,
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center", padding: `0 ${width * 0.1}px` }}>
        <div
          style={{
            display: "inline-block",
            background: theme.hotpink,
            color: theme.white,
            fontWeight: 800,
            fontSize: width * 0.035,
            padding: `${width * 0.015}px ${width * 0.04}px`,
            borderRadius: 999,
            marginBottom: width * 0.04,
          }}
        >
          CHAPTER {num}
        </div>
        <div
          style={{
            fontSize: width * 0.065,
            fontWeight: 800,
            color: theme.white,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};

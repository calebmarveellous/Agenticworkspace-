import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const lines = [
  "This week alone, the internet diagnosed:",
  "situationships with no name,",
  "boyfriends jealous of chatbots,",
  "and a guy who split a $14.37 bill down to the cent.",
];

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: theme.white,
        justifyContent: "center",
        alignItems: "center",
        padding: width * 0.1,
      }}
    >
      <div style={{ textAlign: "center", fontFamily: theme.fontFamily }}>
        {lines.map((line, i) => {
          const start = i * 14;
          const opacity = interpolate(frame, [start, start + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const translateY = interpolate(
            frame,
            [start, start + 10],
            [16, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                fontSize: width * 0.06,
                fontWeight: i === 0 ? 700 : 800,
                color: i === 0 ? theme.black : theme.hotpink,
                marginBottom: width * 0.02,
                lineHeight: 1.25,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

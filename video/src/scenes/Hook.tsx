import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bgPink} 0%, ${theme.bgPinkLight} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: width * 0.08,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          fontFamily: theme.fontFamily,
        }}
      >
        <div
          style={{
            fontSize: width * 0.1,
            fontWeight: 900,
            color: theme.hotpink,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          STILL TEXTING YOUR EX &ldquo;JUST IN CASE&rdquo;?
        </div>
      </div>
    </AbsoluteFill>
  );
};

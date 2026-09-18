import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const Hook: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Longer hooks need a smaller font so they don't overflow the frame.
  const fontScale = text.length <= 34 ? 0.1 : text.length <= 55 ? 0.075 : 0.058;

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
            fontSize: width * fontScale,
            fontWeight: 900,
            color: theme.hotpink,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

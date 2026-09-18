import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const PriceCTA: React.FC<{
  price: string;
  note: string;
  cta: string;
  trustLine: string;
}> = ({ price, note, cta, trustLine }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 10 } });
  const pulse = 1 + Math.sin(frame / 6) * 0.03;

  const opacity = interpolate(frame, [0, 10], [0, 1], {
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
      <div style={{ opacity, textAlign: "center" }}>
        <div
          style={{
            fontSize: width * 0.14,
            fontWeight: 900,
            color: theme.hotpink,
            transform: `scale(${pop})`,
          }}
        >
          {price}
        </div>
        <div
          style={{
            fontSize: width * 0.035,
            color: "#ccc",
            marginTop: 4,
            marginBottom: width * 0.06,
          }}
        >
          {note}
        </div>
        <div
          style={{
            display: "inline-block",
            background: theme.hotpink,
            color: theme.white,
            fontWeight: 800,
            fontSize: width * 0.045,
            padding: `${width * 0.035}px ${width * 0.09}px`,
            borderRadius: 999,
            transform: `scale(${pulse})`,
            boxShadow: "0 10px 30px rgba(232,25,91,0.5)",
          }}
        >
          {cta}
        </div>
        <div style={{ marginTop: width * 0.04, fontSize: width * 0.028, color: "#999" }}>
          {trustLine}
        </div>
      </div>
    </AbsoluteFill>
  );
};

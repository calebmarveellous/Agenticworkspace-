import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const BookReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 14, mass: 0.7 } });
  const translateY = interpolate(rise, [0, 1], [height * 0.15, 0]);
  const rotate = interpolate(rise, [0, 1], [8, -3]);

  const titleOpacity = interpolate(frame, [14, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bgPink} 0%, ${theme.bgPinkLight} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: theme.fontFamily,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
          borderRadius: 16,
          overflow: "hidden",
          width: width * 0.45,
        }}
      >
        <Img src={staticFile("book-cover.png")} style={{ width: "100%", display: "block" }} />
      </div>
      <div
        style={{
          opacity: titleOpacity,
          marginTop: width * 0.06,
          textAlign: "center",
          padding: `0 ${width * 0.08}px`,
        }}
      >
        <div
          style={{
            fontSize: width * 0.065,
            fontWeight: 900,
            color: theme.hotpink,
            lineHeight: 1.15,
          }}
        >
          THE GROUP CHAT DIAGNOSTIC MANUAL
        </div>
        <div
          style={{
            fontSize: width * 0.03,
            color: theme.black,
            marginTop: 10,
            fontWeight: 500,
          }}
        >
          The comedic self-help book for your situationship
        </div>
      </div>
    </AbsoluteFill>
  );
};

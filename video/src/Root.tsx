import React from "react";
import { Composition } from "remotion";
import { PromoVideo, PROMO_DURATION_IN_FRAMES } from "./PromoVideo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVertical"
        component={PromoVideo}
        durationInFrames={PROMO_DURATION_IN_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PromoSquare"
        component={PromoVideo}
        durationInFrames={PROMO_DURATION_IN_FRAMES}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};

import React from "react";
import { Composition } from "remotion";
import { PromoVideo, getPromoDurationInFrames } from "./PromoVideo";
import { scripts } from "./scripts";

export const Root: React.FC = () => {
  return (
    <>
      {(Object.keys(scripts) as Array<keyof typeof scripts>).map((key) => {
        const script = scripts[key];
        return (
          <React.Fragment key={key}>
            <Composition
              id={`PromoVertical${script.id}`}
              component={PromoVideo}
              durationInFrames={getPromoDurationInFrames(script)}
              fps={30}
              width={1080}
              height={1920}
              defaultProps={{ script }}
            />
            <Composition
              id={`PromoSquare${script.id}`}
              component={PromoVideo}
              durationInFrames={getPromoDurationInFrames(script)}
              fps={30}
              width={1080}
              height={1080}
              defaultProps={{ script }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

import { Animation } from '@babylonjs/core';

export const ANIMATION_FRAMERATE = 10;

export const visibilityAnimation = (duration: number) => {
  const secs = duration / 1000;

  const xVisibility = new Animation(
    'xVisibility',
    'visibility',
    ANIMATION_FRAMERATE,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const keyFrames = [];

  keyFrames.push({
    frame: 0,
    value: 0,
  });

  keyFrames.push({
    frame: ANIMATION_FRAMERATE * secs * 0.15,
    value: 1,
  });

  keyFrames.push({
    frame: ANIMATION_FRAMERATE * secs * 0.85,
    value: 1,
  });

  keyFrames.push({
    frame: ANIMATION_FRAMERATE * secs,
    value: 0,
  });

  xVisibility.setKeys(keyFrames);

  return xVisibility;
};

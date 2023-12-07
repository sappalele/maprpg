import React from 'react';
import { BattleBabylonScene, GlslScene } from '../3dObjects';
import { BattleCenterStage } from './BattleCenterStage';

export const Battle3dAnimations: React.FC = () => {
  return (
    <>
      <GlslScene />
      <BattleBabylonScene />
      <BattleCenterStage />
    </>
  );
};

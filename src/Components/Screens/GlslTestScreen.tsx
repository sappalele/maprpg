import React from 'react';
import { useRecoilState } from 'recoil';
import { Box } from '..';
import { GlslScene } from '../3dObjects';
import { glslAnimationsState } from '../Battle';

export const GlslTestScreen: React.FC = () => {
  const [animations, setAnimations] = useRecoilState(glslAnimationsState);

  return (
    <>
      <Box zIndex={1000} position="fixed">
        <button
          onClick={() => {
            setAnimations({ fragment: 'galaxy', duration: 2000 });
          }}
        >
          Run
        </button>
      </Box>
      <GlslScene></GlslScene>
    </>
  );
};

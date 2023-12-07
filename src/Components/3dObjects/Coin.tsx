import { Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders/OBJ';
import React from 'react';
import { Box } from '..';
import { BabylonScene, CoinModel } from '../3dObjects';

export const Coin: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" height="50px" width="50px">
      <BabylonScene>
        <arcRotateCamera
          name="Camera"
          target={new Vector3(0, 0, 0)}
          alpha={-2}
          beta={Math.PI / 2}
          radius={1}
          minZ={0.001}
          wheelPrecision={50}
        />
        <CoinModel />
      </BabylonScene>
    </Box>
  );
};

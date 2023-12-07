import { Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders/OBJ';
import { uniqueId } from 'lodash';
import React, { ReactNode, useState } from 'react';
import { useScene } from 'react-babylonjs';
import styled from 'styled-components';
import { Box, Button } from '..';
import { BattleBabylonScene, Coin, FirePlane } from '../3dObjects';

const BabylonLayer = styled(BattleBabylonScene)`
  position: absolute !important;
  z-index: 500;
  width: 100vw;
  height: 100vh;
`;

export type BabylonNode = { node: ReactNode; duration: number; id: string };

export const TextureTester: React.FC = () => {
  const scene = useScene();

  return scene && <FirePlane />;
};

export const BabylonTestScreen: React.FC = () => {
  const [_3dObjects, set3dObjects] = useState<Array<BabylonNode>>([]);

  const add3dObject = (node: BabylonNode) => {
    set3dObjects((ob) => [...ob, { ...node }]);

    setTimeout(
      () => set3dObjects((ob) => ob.filter((o) => o.id !== node.id)),
      node.duration
    );
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        onClick={() => {
          const id = uniqueId('babylonNode');

          add3dObject({
            node: <FirePlane key={id} />,
            id,
            duration: 3000,
          });
        }}
      >
        Test
      </Button>
      <BabylonLayer>
        <freeCamera
          name="Camera"
          target={Vector3.Zero()}
          position={new Vector3(0, 0, -10)}
        />
        <TextureTester />
        {_3dObjects.map((o) => o.node)}
      </BabylonLayer>
      <Coin />
    </Box>
  );
};

import { Color4, Vector3 } from '@babylonjs/core';
import { uniqueId } from 'lodash';
import React from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { babylonAnimationsState, FirePlane } from '..';

const BabylonLayer = styled.div<{ blockPointerEvents: boolean }>`
  position: fixed !important;
  z-index: 419;
  left: 0;
  top: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  opacity: 0.9;
`;

export type BabylonNode = {
  node: keyof typeof NodeMap;
  duration: number;
  id: string;
};
export const NodeMap = {
  inferno: (key: string) => <FirePlane key={key} />,
};

export const BattleBabylonScene: React.FC = () => {
  const [babylonAnimations] = useRecoilState(babylonAnimationsState);

  if (babylonAnimations.length < 1) return <div></div>;

  return (
    <BabylonLayer blockPointerEvents={babylonAnimations.length > 0}>
      <Engine
        canvasStyle={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        antialias
        adaptToDeviceRatio
        canvasId="babylonJS"
      >
        <Scene clearColor={new Color4(0, 0, 0, 0)}>
          <freeCamera
            name="Camera"
            target={Vector3.Zero()}
            position={new Vector3(0, 0, -10)}
          />
          {babylonAnimations.map((o) =>
            NodeMap[o.node](uniqueId('babylonNode'))
          )}
        </Scene>
      </Engine>
    </BabylonLayer>
  );
};

export const BabylonScene: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <div className={className}>
    <Engine
      canvasStyle={{
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      }}
      antialias
      adaptToDeviceRatio
      canvasId="babylonJS"
    >
      <Scene clearColor={new Color4(0, 0, 0, 0)}>{children}</Scene>
    </Engine>
  </div>
);

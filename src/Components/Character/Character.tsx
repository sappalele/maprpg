import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { DirectionState, directionState, MoveState, moveState } from '..';
import { floatKeyFrames } from '../Animations';
import { TerrainItem } from '../MapGenerator/mapConstants';

const getSpriteSheet = (
  move: MoveState,
  direction: DirectionState
): [any, number, boolean] => {
  if (move === 'idle') {
    if (direction === 'N') return ['idle_up', 5, false];
    if (direction === 'S') return ['idle_down', 5, false];
    if (direction === 'E' || direction === 'SE' || direction === 'NE')
      return ['idle_side', 5, false]; // R
    if (direction === 'W' || direction === 'NW' || direction === 'SW')
      return ['idle_side', 5, true]; // L
  }

  if (direction === 'N') return ['walk_up', 6, false];
  if (direction === 'S') return ['walk_down', 6, false];
  if (direction === 'E' || direction === 'SE' || direction === 'NE')
    return ['walk_side', 6, false]; // R
  if (direction === 'W' || direction === 'NW' || direction === 'SW')
    return ['walk_side', 6, true]; // L

  return ['idle_down', 5, false];
};

const Wrapper = styled.div<{ float: boolean }>`
  ${({ float }) =>
    float &&
    css`
      animation: ${floatKeyFrames} 2.5s infinite;
    `};
`;

const Sprite = styled.div<{ flip: number }>`
  transition: all 0.5s;
  transform-origin: center center;
  transform: ${({ flip }) => `scaleX(${flip})`};
  user-select: none;
  position: relative;

  .char {
    z-index: 2;
    width: 36px;
    height: auto;
  }
`;

const Raft = styled.img<{ show: boolean }>`
  position: absolute;
  z-index: -1;
  width: 60px;
  height: auto;
  bottom: 0;
  left: calc(50% - 30px);
  transition: all 1s;

  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const Character: React.FC<{ currentTileItem: TerrainItem | undefined }> =
  ({ currentTileItem }) => {
    const move = useRecoilValue(moveState);
    const direction = useRecoilValue(directionState);
    const [, , flip] = getSpriteSheet(move, direction);
    const buoyant =
      currentTileItem?.type === 'OCEAN' || currentTileItem?.type === 'HELL';

    return (
      <Wrapper float={buoyant}>
        <Sprite flip={flip ? -1 : 1}>
          <img
            className="char"
            src={require('../../Resources/character/char_side.png').default}
            alt="hero"
          />
          <Raft
            className="raft"
            src={require('../../Resources/character/raft.png').default}
            alt="raft"
            show={buoyant}
          />
        </Sprite>
      </Wrapper>
    );
  };

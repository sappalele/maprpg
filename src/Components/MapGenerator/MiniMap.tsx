import React, { useEffect, useRef } from 'react';
import { useClickAway, useWindowSize } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { Box, Button } from '..';
import { MAP_HEIGHT, MAP_WIDTH, TerrainColors } from './mapConstants';
import {
  bossesState,
  charPositionState,
  showMiniMapDialog,
  terrainState,
  visitedTilesState,
} from './mapState';

const CanvasWrapper = styled.div<{ inDialog: boolean }>`
  position: relative;
  border: solid 1rem #262b44;
  border-radius: 1rem;
  background-color: #262b44;
  z-index: 100;

  ${({ inDialog }) =>
    inDialog
      ? css`
          transform: scale(1);
        `
      : css`
          transform: scale(0.365);
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          cursor: pointer;
          transform-origin: bottom left;
        `}
`;

const SpriteLayer = styled.div<{ inDialog: boolean }>`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .map-marker {
    position: absolute;
    width: auto;
    transition: all 1s;
    transform: translate3d(-50%, -50%, 0);

    ${({ inDialog }) =>
      inDialog
        ? css`
            max-height: 30px;
          `
        : css`
            max-height: 50px;
          `}
  }

  .character {
    z-index: 3;
  }
`;

const ModalContainer = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: 450;
  height: 100%;
  width: 100%;
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(-125%)')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: all 1s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalInner = styled.div`
  position: relative;

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    width: 100%;
  }
`;

export const MiniMap: React.FC<{ inDialog?: boolean; tileSize?: number }> = ({
  inDialog = false,
  tileSize = 3,
}) => {
  const charPosition = useRecoilValue(charPositionState);
  const terrain = useRecoilValue(terrainState);
  const visited = useRecoilValue(visitedTilesState);
  const bosses = useRecoilValue(bossesState);
  const [, setShowModal] = useRecoilState(showMiniMapDialog);

  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!terrain || !ctx) return;

    for (var x = 0; x < MAP_WIDTH; x++) {
      for (var y = 0; y < MAP_HEIGHT; y++) {
        const color = visited[[x, y].toString()]
          ? TerrainColors[terrain[x][y].type]
          : '#262b44';
        const startX = x * tileSize;
        const startY = y * tileSize;

        ctx.fillStyle = color;

        ctx.fillRect(startX, startY, tileSize, tileSize);
      }
    }
  }, [terrain, visited, tileSize]);

  return (
    <CanvasWrapper
      inDialog={inDialog}
      role={!inDialog ? 'button' : ''}
      onClick={!inDialog ? () => setShowModal(true) : undefined}
    >
      <SpriteLayer inDialog={inDialog}>
        <Box
          className="map-marker character"
          is="img"
          alt="character-map-marker"
          top={charPosition ? charPosition[1] * tileSize : 0}
          left={charPosition ? charPosition[0] * tileSize : 0}
          src={require('../../Resources/character/char_side.png').default}
        ></Box>
        {bosses
          ?.filter((b) => !b.defeated)
          .map((b) => (
            <Box
              key={b.coord.toString()}
              className="map-marker boss"
              is="img"
              alt="boss-map-marker"
              top={b.coord[1] * tileSize}
              left={b.coord[0] * tileSize}
              src={
                require(`../../Resources/enemies/${b.enemy.sprite.src}`).default
              }
            ></Box>
          ))}
      </SpriteLayer>
      <canvas
        width={MAP_WIDTH * tileSize}
        height={MAP_HEIGHT * tileSize}
        ref={canvas}
      />
    </CanvasWrapper>
  );
};

export const MiniMapDialog: React.FC = () => {
  const [showModal, setShowModal] = useRecoilState(showMiniMapDialog);
  const innerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const onClickAway = () => {
    if (showModal) {
      setShowModal(false);
    }
  };

  useClickAway(innerRef, () => {
    if (onClickAway) {
      onClickAway();
    }
  });

  return (
    <ModalContainer show={showModal}>
      <ModalInner ref={innerRef}>
        <MiniMap inDialog tileSize={width > 400 ? 7 : 3} />
        <div className="btn-container">
          <Button bgColor="#5CAF8C" color="#FFF" onClick={onClickAway}>
            Close
          </Button>
        </div>
      </ModalInner>
    </ModalContainer>
  );
};

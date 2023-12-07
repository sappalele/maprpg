import Color from 'color';
import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { fadeInUpKeyframes, MapEnemy, MapShop, shops } from '..';
import { floatKeyFrames, swayKeyFrames } from '../Animations';
import { allEnemyGroups, bossGroups, enemyGroups } from '../Enemy';
import {
  TerrainColors,
  TerrainItem,
  TerrainTile,
  TerrainType,
} from './mapConstants';

/* const Hexagon = styled(HexagonSvg)<{
  bgColor: string;
  elevation: number;
  scale: number;
  highlight?: boolean;
  animate?: boolean;
}>`
  ${({ scale, bgColor, elevation, highlight, animate }) => {
    return css`
      fill: ${Color(bgColor)
        .lighten(elevation / 20 / (highlight ? 0.5 : 1))
        .hex()};
      width: ${150 * scale}px;
      height: ${86.6 * scale}px;
      //top: ${elevation * -20 * scale}px;
      position: relative;
      //margin: ${43.3 * scale}px 0;

      ${highlight &&
      css`
        animation: ${pulseKeyframes} 1s infinite;
      `}

      ${animate &&
      css`
        animation: ${fadeInUpKeyframes} 0.5s;
      `}
    `;
  }}
`; */

const MoveSprite = styled.div<{ scale: number }>`
  ${({ scale }) => css`
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    top: -100%;
    user-select: none;

    img {
      cursor: pointer;
      max-height: ${160 * scale}px;
    }
  `}
`;

const FoliageSprite = styled.div<{
  size: number;
  scale: number;
  offsetX?: string;
  offsetY?: string;
}>`
  ${({ size, scale, offsetX = '10px', offsetY = '0' }) => css`
    position: absolute;
    z-index: 4;
    left: ${offsetX};
    top: ${offsetY};
    right: 0;
    display: flex;
    animation: ${swayKeyFrames} 5s ease-in-out forwards infinite;
    transform-origin: bottom center;
    user-select: none;

    img {
      max-height: ${100 * size * scale}px;
      max-width: ${80 * size * scale}px;
    }
  `}
`;

const HexButton = styled.div`
  all: unset;
  padding: 0;
  margin: 0;
  display: block;
`;

const Hexagon = styled.div<{
  bgColor: string;
  elevation: number;
  scale: number;
  highlight?: boolean;
  animate?: boolean;
  attacking?: boolean;
  tile?: string;
  inBattle?: boolean;
  hide?: boolean;
}>`
  ${({ scale, bgColor, elevation, highlight, animate, tile, hide }) => {
    return css`
      background: ${tile
        ? Color(bgColor)
            .lighten(elevation / 20)
            .hex() + ` url('${tile}')`
        : Color(bgColor)
            .lighten(elevation / 20)
            .hex()};
      top: ${elevation * -20 * scale}px;
      position: relative;
      width: ${150 * scale}px;
      height: ${86.6 * scale}px;
      margin: ${43.3 * scale}px 0;
      background-size: auto ${173.2051 * scale}px;
      background-position: center;

      ${!animate &&
      css`
        &:hover {
          animation: ${floatKeyFrames} 1s infinite;
          filter: brightness(1.25);
        }
      `}

      ${highlight &&
      css`
        animation: ${floatKeyFrames} 1s infinite;
        filter: brightness(1.25);
      `}

      ${animate &&
      css`
        animation: ${fadeInUpKeyframes} 1s;
      `}

      ${hide &&
      css`
        visibility: hidden;
      `}

      button {
        padding: 0;
        margin: 0;
        display: block;
      }

      .children {
        position: absolute;
        z-index: 4;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        user-select: none;
        justify-content: center;
      }

      .hexTop,
      .hexBottom {
        position: absolute;
        z-index: 2;
        width: ${106.07 * scale}px;
        height: ${106.07 * scale}px;
        overflow: hidden;
        -webkit-transform: scaleY(0.5774) rotate(-45deg);
        -ms-transform: scaleY(0.5774) rotate(-45deg);
        transform: scaleY(0.5774) rotate(-45deg);
        background: inherit;
        left: ${21.97 * scale}px;
      }

      /*counter transform the bg image on the caps*/
      .hexTop:after,
      .hexBottom:after {
        content: '';
        position: absolute;
        width: ${150 * scale}px;
        height: ${86.60254037844388 * scale}px;
        -webkit-transform: rotate(45deg) scaleY(1.7321)
          translateY(${-43.3013 * scale}px);
        -ms-transform: rotate(45deg) scaleY(1.7321)
          translateY(${-43.3013 * scale}px);
        transform: rotate(45deg) scaleY(1.7321)
          translateY(${-43.3013 * scale}px);
        -webkit-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        transform-origin: 0 0;
        background: inherit;
      }

      .hexTop {
        top: ${-53.033 * scale}px;
      }

      .hexTop:after {
        background-position: center top;
      }

      .hexBottom {
        bottom: ${-53.033 * scale}px;
      }

      .hexShadow {
        bottom: calc(${-73.033 * scale}px - ${elevation * scale * 20}px);
        position: absolute;
        z-index: 1;
        width: ${106.07 * scale}px;
        height: ${106.07 * scale}px;
        overflow: hidden;
        -webkit-transform: scaleY(0.5774) rotate(-45deg);
        -ms-transform: scaleY(0.5774) rotate(-45deg);
        transform: scaleY(0.5774) rotate(-45deg);
        left: ${21.97 * scale}px;
        background: linear-gradient(
          -45deg,
          ${Color(bgColor).darken(0.25).hex()} 50%,
          ${Color(bgColor).darken(0.5).hex()} 50%
        );
      }

      .hexShadowBase {
        bottom: -${(elevation + 1) * 20 * scale}px;
        position: absolute;
        z-index: 2;
        width: ${150 * scale}px;
        height: ${(elevation + 1) * 20 * scale}px;
        overflow: hidden;
        background: inherit;
        z-index: 1;
        background-color: inherit;
        background: linear-gradient(
          to left,
          ${Color(bgColor).darken(0.25).hex()} 50%,
          ${Color(bgColor).darken(0.5).hex()} 50%
        );
      }

      .hexBottom:after {
        background-position: center bottom;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0;
        width: ${150 * scale}px;
        height: ${86.6025 * scale}px;
        z-index: 3;
        background: inherit;
      }
    `;
  }}
`;

const getTile = (item: TerrainItem) =>
  TerrainTile[item.type as keyof typeof TerrainTile];

const HexComponent: React.FC<{
  scale: number;
  highlight?: boolean;
  animate?: boolean;
  onClick?: (e: any) => void;
  terrainItem: TerrainItem;
  attacking?: boolean;
  inBattle?: boolean;
  destination?: boolean;
  marker?: {
    enemy?: keyof typeof enemyGroups | keyof typeof bossGroups;
    shop?: keyof typeof shops;
  };
}> = ({
  scale,
  highlight,
  animate,
  onClick,
  terrainItem,
  attacking,
  inBattle,
  destination,
  marker,
}) => (
  <HexButton role="button" onClick={onClick}>
    <Hexagon
      bgColor={TerrainColors[terrainItem.type as TerrainType]}
      elevation={
        terrainItem.type === TerrainType.HELL
          ? -1
          : Math.floor(terrainItem.values[0] * 10)
      }
      scale={scale}
      highlight={!inBattle && highlight}
      animate={animate}
      inBattle={inBattle}
      tile={
        getTile(terrainItem)
          ? require('../../Resources/tiles/' + getTile(terrainItem)).default
          : undefined
      }
      attacking={(!!marker?.enemy || attacking) && !inBattle}
      hide={terrainItem.type === TerrainType.DUMMY}
    >
      {!marker && destination && (
        <MoveSprite scale={scale}>
          <img
            src={require('../../Resources/move.png').default}
            alt="confirm move"
          />
        </MoveSprite>
      )}
      <div
        className="children"
        style={{
          transform: `scale(${scale * 2})`,
          transformOrigin: 'bottom center',
        }}
      >
        {marker?.enemy && !inBattle && (
          <MapEnemy sprite={allEnemyGroups[marker.enemy].sprite} />
        )}
        {marker?.shop && !inBattle && (
          <MapShop sprite={shops[marker.shop].sprite} />
        )}
      </div>
      {!marker && terrainItem.foliage && (
        <FoliageSprite
          scale={scale}
          size={terrainItem.foliage.size}
          offsetX={terrainItem.foliage.offsetX}
          offsetY={terrainItem.foliage.offsetY}
        >
          <img
            alt="foliage"
            src={
              require('../../Resources/foliage/' + terrainItem.foliage.sprite)
                .default
            }
          />
        </FoliageSprite>
      )}
      <div className="hexTop"></div>
      <div className="hexBottom"></div>
      <div className="hexShadowBase"></div>
      <div className="hexShadow"></div>
    </Hexagon>
  </HexButton>
);

export const Hex = memo(HexComponent);

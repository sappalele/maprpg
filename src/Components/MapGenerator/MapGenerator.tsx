import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { inBattleState, slideKeyFrames } from '..';
import { Character } from '../Character';
import { allEnemyGroups } from '../Enemy';
import { shops } from '../Shops';
import { Hex } from './Hex';
import { TerrainItem } from './mapConstants';
import {
  getArraySlice,
  getCardinalDirection,
  getShortestPath,
  isValidLocation,
  useGenerateMapAndPlayIntroduction,
} from './mapGeneratorUtils';
import {
  charPositionState,
  destinationState,
  directionState,
  introductionState,
  IntroductionStateType,
  mapMarkersState,
  mapPositionState,
  terrainState,
  visitedTilesState,
} from './mapState';
import { MiniMap } from './MiniMap';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div<{
  charPosition: [number, number];
  elevation: number;
  scale: number;
  inBattle?: boolean;
}>`
  display: flex;
  transform-origin: center;
  position: relative;
  transition: all 1s;

  ${({ charPosition, scale, inBattle, elevation }) =>
    Math.abs(charPosition[1]) % 2 === 1
      ? css`
          transform: translateX(calc(150px * ${scale} / 2 * -1))
            translateY(calc(${scale} * ${elevation * 10}px));
          ${inBattle &&
          css`
            transform: translateX(calc(150px * ${scale} / 2 * -2))
              translateY(calc(${scale} * ${elevation * 10}px)) scale(2);
            //animation: ${slideKeyFrames} 30s ease-in-out infinite;
          `}
        `
      : inBattle
      ? css`
          transform: translateY(calc(${scale} * ${elevation * 10}px)) scale(2);
        `
      : css`
          transform: translateY(calc(${scale} * ${elevation * 10}px));
        `}
`;

const CharWrapper = styled.div<{ item?: TerrainItem; scale: number }>`
  ${({ item, scale }) => css`
    position: absolute;
    top: calc(
      50% - 32px -
        ${Math.floor((item && item.values[0] * 10) || 0) * 25 * scale + 'px'}
    );
    left: calc(50% - 18px);
    z-index: ${item ? item.coord[1] * 2 + 3 : 202};

    img {
      transform: scale(${scale * 2});
    }

    ${item &&
    Math.abs(item?.coord[1]) % 2 === 1 &&
    css`
      transform: translateX(calc(150px * ${scale} / 2));
    `}
  `}
`;

const GridColumn = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GridItem = styled.div<{
  coord: [number, number];
  scale: number;
  hasMarker: boolean;
}>`
  margin-top: -1px;

  z-index: ${({ coord, hasMarker }) =>
    hasMarker ? coord[1] * 2 + 1 : coord[1] * 2};

  ${({ coord, scale }) => {
    return (
      Math.abs(coord[1]) % 2 === 1 &&
      css`
        transform: translateX(calc(150px * ${scale} / 2))
          translateY(calc(86.95px * ${scale} * -1 / 1 / 2));
        margin-bottom: calc(86.95px * ${scale} * -1);
      `
    );
  }};
`;

export const Map: React.FC = () => {
  const introState = useRecoilValue(introductionState);
  const [battle, setInBattle] = useRecoilState(inBattleState);
  const [mapMarkers] = useRecoilState(mapMarkersState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const setDirectionState = useSetRecoilState(directionState);
  const [mapPosition, setMapPosition] = useRecoilState(mapPositionState);
  const [charPosition, setCharPosition] = useRecoilState(charPositionState);
  const [terrain] = useRecoilState(terrainState);
  const [, setVisited] = useRecoilState(visitedTilesState);

  const [currentMapGrid, setCurrentMapGrid] = useState<
    TerrainItem[][] | undefined
  >(undefined);
  const [previousMapGrid, setPreviousMapGrid] = useState<
    TerrainItem[][] | undefined
  >(undefined);
  const { width } = useWindowSize();
  const introDone = introState === IntroductionStateType.DONE;
  const currentTileItem = currentMapGrid?.length
    ? currentMapGrid
        .flatMap((p) => p)
        .find((p) => isEqual(p.coord, charPosition))
    : undefined;

  useGenerateMapAndPlayIntroduction();

  useEffect(() => {
    if (terrain && mapPosition) {
      const newTerrain = getArraySlice(terrain, mapPosition[0], mapPosition[1]);

      setCurrentMapGrid(newTerrain);
      setCharPosition(mapPosition);
      setVisited((v) => {
        const newVisited = { ...v };
        console.debug(mapPosition, newTerrain);
        newTerrain
          .flatMap((t) => t)
          .forEach((t) => (newVisited[t.coord.toString()] = true));
        return newVisited;
      });
      setTimeout(() => setPreviousMapGrid(newTerrain), 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terrain, mapPosition]);

  useEffect(() => {
    if (destination?.path && mapPosition) {
      setDirectionState(
        getCardinalDirection(
          mapPosition,
          destination.path[destination.path.length - 1] as [number, number]
        )
      );
    }
    if (destination?.confirmed) {
      setMapPosition(
        destination.path[destination.path.length - 1] as [number, number]
      );
      setDestination(null);
    }
  }, [
    battle.active,
    destination,
    mapPosition,
    setDestination,
    setDirectionState,
    setInBattle,
    setMapPosition,
  ]);

  const scale = useCallback(() => {
    if (width > 900) {
      return 0.75;
    }
    if (width > 600) {
      return 0.5;
    }
    return 0.35;
  }, [width]);

  const hexOnClick = useCallback(
    (item: TerrainItem) => {
      if (introState !== IntroductionStateType.DONE || !mapPosition) return;

      console.debug(item);
      const marker = mapMarkers[item.coord.toString()];
      const shortestPath = getShortestPath(
        [mapPosition[0], mapPosition[1]],
        item.coord
      );
      if (marker?.enemy)
        setInBattle({
          enemyGroup: {
            ...allEnemyGroups[marker.enemy],
            coord: item.coord,
            defeated: false,
          },
        });
      setDestination((d) => ({
        path: shortestPath,
        confirmed: isEqual(d?.path[d.path.length - 1], item.coord),
        attacking: !!marker?.enemy,
        shop: marker?.shop ? shops[marker.shop] : undefined,
      }));
    },
    [introState, mapMarkers, mapPosition, setDestination, setInBattle]
  );

  return (
    <Wrapper>
      {!battle.active && introDone && <MiniMap />}
      <GridContainer
        elevation={Math.floor((currentTileItem?.values[0] || 0) * 10)}
        charPosition={charPosition || [0, 0]}
        scale={scale()}
        inBattle={battle.active}
      >
        {!battle.active && introDone && (
          <CharWrapper scale={scale()} item={currentTileItem}>
            <Character currentTileItem={currentTileItem} />
          </CharWrapper>
        )}

        {currentMapGrid &&
          currentMapGrid.map((c, y) => (
            <GridColumn index={y} key={`${c},${y}`}>
              {c
                .sort((a, b) => a.coord[1] - b.coord[1])
                .map((r, x) => (
                  <GridItem
                    coord={r.coord}
                    key={`${r},${x}`}
                    scale={scale()}
                    hasMarker={!!mapMarkers[r.coord.toString()]}
                  >
                    <Hex
                      destination={isEqual(
                        destination?.path[destination.path.length - 1],
                        r.coord
                      )}
                      onClick={
                        isValidLocation(r.coord)
                          ? () => hexOnClick(r)
                          : undefined
                      }
                      scale={scale()}
                      terrainItem={r}
                      animate={
                        !previousMapGrid
                          ?.flatMap((c) => c)
                          .find((r1) => isEqual(r1.coord, r.coord))
                      }
                      attacking={
                        destination?.attacking &&
                        !!destination?.path.find(
                          (e) => e[1] === r.coord[1] && e[0] === r.coord[0]
                        )
                      }
                      highlight={
                        !!destination?.path.find(
                          (e) => e[1] === r.coord[1] && e[0] === r.coord[0]
                        )
                      }
                      inBattle={battle.active}
                      marker={mapMarkers[r.coord.toString()]}
                    ></Hex>
                  </GridItem>
                ))}
            </GridColumn>
          ))}
      </GridContainer>
    </Wrapper>
  );
};

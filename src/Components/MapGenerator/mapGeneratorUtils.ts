import { defineGrid } from 'honeycomb-grid';
import { sample, uniq } from 'lodash';
import { nanoid } from 'nanoid';
import PoissonDiskSampling from 'poisson-disk-sampling';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import SimplexNoise from 'simplex-noise';
import { dayState } from '../Character/characterState';
import {
  allEnemyGroups,
  bossGroups,
  enemyGroups,
  getRandomBosses,
  getRandomEnemyGroup,
} from '../Enemy';
import { getRandomShop, shops } from '../Shops';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  NO_OF_BOSSES,
  TerrainFoliage,
  TerrainItem,
  TerrainType,
  VIEW,
} from './mapConstants';
import {
  DirectionState,
  IntroductionStateType,
  bossesState,
  introductionState,
  mapMarkersState,
  mapPositionState,
  terrainSeedState,
  terrainState,
} from './mapState';

export const getCardinalDirection = (
  curr: [number, number],
  dest: [number, number]
): DirectionState => {
  const currX = curr[0];
  const currY = curr[1];
  const destX = dest[0];
  const destY = dest[1];

  if (destY < currY && currX === destX) return 'N';
  if (destY < currY && destX > currX) return 'NE';
  if (destY < currY && destX < currX) return 'NW';
  if (destY === currY && destX > currX) return 'E';
  if (destY > currY && destX > currX) return 'SE';
  if (destY > currY && currX === destX) return 'S';
  if (destY > currY && destX < currX) return 'SW';
  if (destY === currY && destX < currX) return 'W';

  return 'S';
};

export const getTileType = (e: number, m: number) => {
  if (e < 0.015) return TerrainType.HELL;
  if (e < 0.1) return TerrainType.OCEAN;
  if (e < 0.12) return TerrainType.BEACH;

  if (e > 1.3) {
    return TerrainType.SNOW;
  }

  if (e > 0.8) {
    return TerrainType.SCORCHED;
  }

  if (e > 0.6) {
    if (m < 0.33) return TerrainType.SUBTROPICAL_DESERT;
  }

  return TerrainType.GRASSLAND;
  if (e > 0.3) {
    if (m < 0.16) return TerrainType.TEMPERATE_DESERT;
    if (m < 0.5) return TerrainType.GRASSLAND;
    if (m < 0.83) return TerrainType.TEMPERATE_DECIDUOUS_FOREST;
    return TerrainType.TEMPERATE_RAIN_FOREST;
  }

  if (m < 0.16) return TerrainType.SUBTROPICAL_DESERT;
  if (m < 0.33) return TerrainType.GRASSLAND;
  if (m < 0.66) return TerrainType.TROPICAL_SEASONAL_FOREST;
  return TerrainType.TROPICAL_RAIN_FOREST;
};

export const generateTerrain: any = (seed: string, newSeed: string) => {
  const newTerrain: any[] = [];
  const actualSeed = newSeed || seed;

  try {
    const noise2D_1 = new SimplexNoise(actualSeed);
    const noise2D_2 = new SimplexNoise(actualSeed.split('').reverse().join(''));
    const noise1 = (x: number, y: number) =>
      noise2D_1.noise2D(x, y) / 1.5 + 0.75;
    const noise2 = (x: number, y: number) =>
      noise2D_2.noise2D(x, y) / 1.25 + 0.75;

    for (var x = 0; x < MAP_HEIGHT; x++) {
      newTerrain[x] = [];
      for (var y = 0; y < MAP_WIDTH; y++) {
        const nx = x / MAP_WIDTH - 0.5;
        const ny = y / MAP_HEIGHT - 0.5;

        let e =
          1.0 * noise1(1 * nx, 1 * ny) +
          0.5 * noise1(2 * nx, 2 * ny) +
          0.25 * noise1(4 * nx, 4 * ny) +
          0.13 * noise1(8 * nx, 8 * ny) +
          0.06 * noise1(16 * nx, 16 * ny) +
          0.03 * noise1(32 * nx, 32 * ny);
        e = e / (1.0 + 0.5 + 0.25 + 0.13 + 0.06 + 0.03);
        e = Math.pow(e, 5.0);
        let m =
          1.0 * noise2(1 * nx, 1 * ny) +
          0.75 * noise2(2 * nx, 2 * ny) +
          0.33 * noise2(4 * nx, 4 * ny) +
          0.33 * noise2(8 * nx, 8 * ny) +
          0.33 * noise2(16 * nx, 16 * ny) +
          0.5 * noise2(32 * nx, 32 * ny);
        m = m / (1.0 + 0.75 + 0.33 + 0.33 + 0.33 + 0.5);

        const type = getTileType(e, m);
        const foliage = TerrainFoliage[type as keyof typeof TerrainFoliage];

        newTerrain[x][y] = {
          values: [e, m],
          type,
          coord: [x, y],
          new: false,
          foliage:
            foliage && Math.floor(Math.random() * 10) < 3
              ? foliage[Math.floor(Math.random() * foliage.length)]
              : undefined,
        };
      }
    }
  } catch (error) {
    console.debug('Bad seed');
    return generateTerrain(seed, nanoid(5));
  }

  console.debug({ newTerrain, newSeed });
  return { newTerrain, newSeed };
};

export const getArraySlice = (mat: any[][], x: number, y: number) => {
  const Grid = defineGrid();
  const gridInstance = Grid.hexagon({ radius: VIEW.RADIUS, center: { x, y } });

  const res: Map<number, TerrainItem[]> = new Map();

  console.debug(gridInstance);

  gridInstance.forEach((h, i) => {
    const tile =
      mat[h.x] && mat[h.x][h.y]
        ? mat[h.x][h.y]
        : { values: [0, 0], coord: [h.x, h.y], type: TerrainType.DUMMY };
    res.set(h.x, res.has(h.x) ? [...res.get(h.x)!, tile] : [tile]);
  });

  console.debug(res);

  return Array.from(res, ([, value]) => value);
};

export const getShortestPath = (
  start: [number, number],
  end: [number, number]
) => {
  const Grid = defineGrid();
  const gridInstance = Grid.hexagon({
    radius: VIEW.RADIUS,
    center: { x: start[0], y: start[1] },
  });

  //why?? shouldnt have to search
  const between = gridInstance.hexesBetween(
    gridInstance.find(
      (h) => h.coordinates().x === start[0] && h.coordinates().y === start[1]
    )!,
    gridInstance.find(
      (h) => h.coordinates().x === end[0] && h.coordinates().y === end[1]
    )!
  );

  console.debug(between.map((v) => [v.coordinates().x, v.coordinates().y]));

  return between.map((v) => [v.coordinates().x, v.coordinates().y]);
};

export const isValidLocation = (coord: [number, number]) =>
  coord[0] >= 0 &&
  coord[1] >= 0 &&
  coord[0] <= MAP_WIDTH - 1 &&
  coord[1] <= MAP_HEIGHT - 1;

export const getBossesAndShops = (terrain: TerrainItem[][]) => {
  const bosses: any[] = [];
  const mapMarkers: {
    [key: string]: {
      enemy?: keyof typeof enemyGroups | keyof typeof bossGroups;
      shop?: keyof typeof shops;
      defeated: boolean;
    };
  } = {};

  const shopCoords = new PoissonDiskSampling({
    shape: [MAP_HEIGHT, MAP_WIDTH],
    minDistance: 15,
    tries: 20,
  }).fill();

  shopCoords.forEach(([xDec, yDec]) => {
    const x = Math.floor(xDec);
    const y = Math.floor(yDec);

    const shop = getRandomShop(terrain[x][y].type);
    if (shop)
      mapMarkers[[x, y].toString()] = {
        shop,
        defeated: false,
      };
  });

  const availableTerrainTypes = uniq(
    terrain.flatMap((t) => t).map((t) => t.type)
  );

  getRandomBosses(NO_OF_BOSSES, availableTerrainTypes).forEach((b) => {
    const possibleMapTiles = terrain
      .flatMap((t) => t)
      .filter((t) => b.terrain.includes(t.type));

    const bossTile = sample(possibleMapTiles);
    const bossKey = Object.entries(bossGroups).find(
      ([k, e]) => e === b
    )?.[0] as keyof typeof bossGroups;

    bosses.push({ enemy: b, coord: bossTile!.coord });
    mapMarkers[bossTile!.coord.toString()] = {
      ...mapMarkers[bossTile!.coord.toString()],
      enemy: bossKey,
    };
  });

  return { mapMarkers, bosses };
};

export const getEnemyMarkersForDay = (
  day: number,
  terrain: TerrainItem[][],
  mapMarkers: {
    [key: string]: {
      enemy?: keyof typeof enemyGroups | keyof typeof bossGroups;
      shop?: keyof typeof shops;
      defeated: boolean;
    };
  }
) => {
  const enemiesCoords = new PoissonDiskSampling({
    shape: [MAP_HEIGHT, MAP_WIDTH],
    minDistance: 4,
    tries: 20,
  }).fill();

  enemiesCoords.forEach(([xDec, yDec]) => {
    const x = Math.floor(xDec);
    const y = Math.floor(yDec);

    const enemy = getRandomEnemyGroup(day, terrain[x][y].type);
    const enemyLookup =
      mapMarkers[[x, y].toString()]?.enemy &&
      allEnemyGroups[mapMarkers[[x, y].toString()].enemy!];

    if (enemy && !mapMarkers[[x, y].toString()]?.shop && !enemyLookup?.boss)
      mapMarkers[[x, y].toString()] = {
        enemy,
        defeated: false,
      };
  });

  return { mapMarkers };
};

export const useGenerateMapAndPlayIntroduction = () => {
  const [initRun, setInitRun] = useState(false);
  const [{ day }] = useRecoilState(dayState);
  const [mapMarkers, setMapMarkers] = useRecoilState(mapMarkersState);
  const [, setMapPosition] = useRecoilState(mapPositionState);
  const [terrain, setTerrain] = useRecoilState(terrainState);
  const [seed, setSeed] = useRecoilState(terrainSeedState);
  const [bosses, setBosses] = useRecoilState(bossesState);
  const [intro, setIntro] = useRecoilState(introductionState);

  useEffect(() => {
    // done with intro
    if (initRun) return;

    let _seed = seed;

    if (!_seed) {
      _seed = nanoid(5);
      setSeed(_seed);
      setInitRun(true);
    }

    const { newTerrain, newSeed } = generateTerrain(day, _seed, '');

    if (newSeed) {
      setSeed(newSeed);
      setInitRun(true);
    }

    setTerrain(newTerrain);

    if (!seed && newTerrain) {
      const { mapMarkers: markersBeforeEnemies, bosses } =
        getBossesAndShops(newTerrain);
      const { mapMarkers } = getEnemyMarkersForDay(
        day,
        newTerrain,
        markersBeforeEnemies
      );

      setMapMarkers(mapMarkers);
      setBosses(bosses);
    }
    console.debug(newTerrain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  //intro
  useEffect(() => {
    if (intro === IntroductionStateType.DONE) return;
    if (!terrain || !bosses) return setIntro(IntroductionStateType.GENERATING);

    setIntro(IntroductionStateType.BOSS_INTRO);

    bosses.forEach((b, i) => {
      setTimeout(() => {
        setMapPosition(b.coord);
      }, 3000 * i);

      setTimeout(() => {
        setIntro(IntroductionStateType.BOSS_INTRO_END);
      }, 3000 * 3);
    });

    setTimeout(() => {
      setMapPosition(
        sample(
          terrain
            .flatMap((t) => t)
            .filter(
              (t) =>
                !mapMarkers[t.coord.toString()] &&
                t.type !== TerrainType.OCEAN &&
                t.values[0] < 0.8
            )
        )!.coord
      );
      setIntro(IntroductionStateType.HERO_INTRO);
    }, 3000 * 3 + 2000);

    setTimeout(() => {
      setIntro(IntroductionStateType.DONE);
    }, 3000 * 4 + 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terrain, bosses]);
};

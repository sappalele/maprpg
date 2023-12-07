export interface TerrainItem {
  values: [number, number];
  coord: [number, number];
  type: TerrainType;
  new?: boolean;
  foliage?: FoliageType;
}

export const TerrainColors = {
  OCEAN: '#0099db',
  BEACH: '#ead4aa',
  SCORCHED: '#5a6988',
  BARE: '#8b9bb4',
  TUNDRA: '#c0cbdc',
  SNOW: '#2ce8f5',
  TEMPERATE_DESERT: '#b86f50',
  SHRUBLAND: '#fee761',
  TAIGA: '#63c74d',
  TEMPERATE_DECIDUOUS_FOREST: '#3e8948',
  TEMPERATE_RAIN_FOREST: '#3e8948',
  SUBTROPICAL_DESERT: '#feae34',
  GRASSLAND: '#63c74d',
  TROPICAL_SEASONAL_FOREST: '#3e8948',
  TROPICAL_RAIN_FOREST: '#3e8948',
  HELL: '#a22633',
  DUMMY: 'transparent',
};

export interface FoliageType {
  sprite: string;
  size: number;
  offsetX?: string;
  offsetY?: string;
}

export const Foliage: { [key: string]: FoliageType } = {
  TREE: { sprite: 'tree.png', size: 1 },
  BUSH: { sprite: 'bush_.png', size: 0.75 },
  SMOOTH_ROCK: { sprite: 'smooth_rock.png', size: 0.75 },
  PALM_TREE: {
    sprite: 'palm_tree.png',
    size: 1.5,
    offsetY: '-50%',
    offsetX: '-5%',
  },
  HARD_ROCK: { sprite: 'hard_rock.png', size: 1 },
  OCEAN_STICK: { sprite: 'ocean_stick.png', size: 1 },
  OCEAN_ANCHOR: { sprite: 'ocean_anchor.png', size: 1 },
  HELL_ROCK: { sprite: 'hell_rock.png', size: 1 },
  HELL_SKULL: { sprite: 'hell_skull.png', size: 1 },
  SNOW_ROCK: { sprite: 'snow_rock.png', size: 1 },
};

export const TerrainTile = {
  /* OCEAN: 'water6.png',
  BEACH: 'sand5.png', */
  GRASSLAND: 'grass.png',
  /* SCORCHED: 'mountain.png', */
};

export const TerrainFoliage = {
  GRASSLAND: [Foliage.TREE, Foliage.BUSH],
  SCORCHED: [Foliage.HARD_ROCK],
  BEACH: [Foliage.SMOOTH_ROCK, Foliage.PALM_TREE],
  OCEAN: [Foliage.OCEAN_STICK, Foliage.OCEAN_ANCHOR],
  HELL: [Foliage.HELL_ROCK, Foliage.HELL_SKULL],
  SNOW: [Foliage.SNOW_ROCK],
};

export enum TerrainType {
  OCEAN = 'OCEAN',
  BEACH = 'BEACH',
  SCORCHED = 'SCORCHED',
  BARE = 'BARE',
  TUNDRA = 'TUNDRA',
  SNOW = 'SNOW',
  TEMPERATE_DESERT = 'TEMPERATE_DESERT',
  SHRUBLAND = 'SHRUBLAND',
  TAIGA = 'TAIGA',
  TEMPERATE_DECIDUOUS_FOREST = 'TEMPERATE_DECIDUOUS_FOREST',
  TEMPERATE_RAIN_FOREST = 'TEMPERATE_RAIN_FOREST',
  SUBTROPICAL_DESERT = 'SUBTROPICAL_DESERT',
  GRASSLAND = 'GRASSLAND',
  TROPICAL_SEASONAL_FOREST = 'TROPICAL_SEASONAL_FOREST',
  TROPICAL_RAIN_FOREST = 'TROPICAL_RAIN_FOREST',
  DUMMY = 'DUMMY',
  HELL = 'HELL',
}

export const MAP_HEIGHT = 100;
export const MAP_WIDTH = 100;

export const ENEMY_SPACING_Y = 4;
export const ENEMY_SPACING_X = 6;
export const SHOP_SPACING_Y = 25;
export const SHOP_SPACING_X = 25;

export const NO_OF_BOSSES = 3;

export const VIEW = {
  RADIUS: 3,
  HEIGHT: 10,
  WIDTH: 5,
};

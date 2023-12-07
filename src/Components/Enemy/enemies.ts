import { intersection, sample, sampleSize, values } from 'lodash';
import { CardModel, cards } from '../Card';
import { TerrainType } from '../MapGenerator/mapConstants';
import { MoveType, attackMoves } from '../Move';

export interface EnemyType {
  name: string;
  hp: number;
  sprite: { src: string; size: number; higherThanWide: boolean };
  moves: Array<{ probability: number } & MoveType>;
  gold: number;
  rewards: Array<{ probability: number; card: CardModel }>;
}

export interface EnemyGroupType {
  name: string;
  level: number;
  terrain: TerrainType[];
  sprite: { src: string; size: number };
  enemies: Array<EnemyType>;
  boss?: boolean;
}

export const enemies = {
  crab: {
    name: 'Crab',
    hp: 1,
    sprite: { src: 'crab.png', size: 0.5, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 5,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  blob: {
    name: 'Blob',
    hp: 1,
    sprite: { src: 'blob.png', size: 0.5, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 10,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  babyDuck: {
    name: 'Baby duck',
    hp: 1,
    sprite: { src: 'baby_duck.png', size: 0.5, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 5,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  duckThug: {
    name: 'Duck thug',
    hp: 1,
    sprite: { src: 'duck_thug.png', size: 0.75, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 35,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  snaketaur: {
    name: 'Snaketaur',
    hp: 1,
    sprite: { src: 'snaketaur.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  babyJelly: {
    name: 'Baby jelly',
    hp: 1,
    sprite: { src: 'baby_jellyfish.png', size: 0.4, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 5,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  jellyBoss: {
    name: 'Jelly boss',
    hp: 1,
    sprite: { src: 'jellyboss.png', size: 0.75, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 50,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  anglerFish: {
    name: 'Angler fish',
    hp: 1,
    sprite: { src: 'angler.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  imp: {
    name: 'Imp',
    hp: 10,
    sprite: { src: 'imp.png', size: 0.5, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 35,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  demon: {
    name: 'Demon',
    hp: 1,
    sprite: { src: 'demon.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 250,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  sandworm: {
    name: 'Sandworm',
    hp: 1,
    sprite: { src: 'worm.png', size: 1, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  boulderDragon: {
    name: 'Boulder Dragon',
    hp: 1,
    sprite: { src: 'boulder_dragon.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 250,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  snowMage: {
    name: 'Snow Mage',
    hp: 1,
    sprite: { src: 'snow_mage.png', size: 1, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.blizzard }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  rocky: {
    name: 'Rocky',
    hp: 1,
    sprite: { src: 'rocky.png', size: 1, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  puffy: {
    name: 'Puffy',
    hp: 1,
    sprite: { src: 'dragon.png', size: 1.5, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  hermitKnight: {
    name: 'Hermit Knight',
    hp: 1,
    sprite: { src: 'hermit_knight.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  hermitKing: {
    name: 'Hermit King',
    hp: 1,
    sprite: { src: 'hermit_king.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  lizardKnight: {
    name: 'Lizard Knight',
    hp: 1,
    sprite: { src: 'liz_knight.png', size: 1, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  neckBeard: {
    name: 'Neck Beard',
    hp: 1,
    sprite: { src: 'neckbeard.png', size: 0.75, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  ptero: {
    name: 'Petero',
    hp: 1,
    sprite: { src: 'ptero.png', size: 1, higherThanWide: true },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
  itsy: {
    name: 'Itsy',
    hp: 1,
    sprite: { src: 'spider.png', size: 1, higherThanWide: false },
    moves: [{ probability: 1, ...attackMoves.basic }],
    gold: 100,
    rewards: [
      { probability: 1, card: cards.attack },
      { probability: 1, card: cards.guard },
    ],
  },
};

export const enemyGroups = {
  crabs: {
    name: 'Consortium',
    level: 1,
    sprite: { src: 'crab.png', size: 0.75 },
    terrain: [TerrainType.BEACH],
    enemies: [enemies.crab, enemies.crab, enemies.crab],
    boss: false,
  },
  quakers: {
    name: 'Quackers',
    level: 1,
    sprite: { src: 'duck_thug.png', size: 0.75 },
    terrain: [TerrainType.GRASSLAND],
    enemies: [enemies.babyDuck, enemies.duckThug, enemies.babyDuck],
    boss: false,
  },
  smack: {
    name: 'Smack',
    level: 1,
    sprite: { src: 'jellyboss.png', size: 0.75 },
    terrain: [TerrainType.OCEAN],
    enemies: [enemies.babyJelly, enemies.jellyBoss, enemies.babyJelly],
    boss: false,
  },
  chillShow: {
    name: 'Chill show',
    level: 1,
    sprite: { src: 'snow_mage.png', size: 0.75 },
    terrain: [TerrainType.SNOW],
    enemies: [enemies.snowMage],
    boss: false,
  },
  rockies: {
    name: 'Rockies',
    level: 1,
    sprite: { src: 'rocky.png', size: 1 },
    terrain: [TerrainType.SCORCHED],
    enemies: [enemies.rocky, enemies.rocky],
    boss: false,
  },
  snaketaur: {
    name: 'Snaketaur',
    level: 1,
    sprite: { src: 'snaketaur.png', size: 1.5 },
    terrain: [TerrainType.GRASSLAND],
    enemies: [enemies.snaketaur],
    boss: false,
  },
  chopShop: {
    name: 'Chop Shop',
    level: 1,
    sprite: { src: 'neckbeard.png', size: 1 },
    terrain: [TerrainType.GRASSLAND],
    enemies: [enemies.neckBeard, enemies.neckBeard],
    boss: false,
  },
  jurassic3: {
    name: 'Jurassic 3',
    level: 1,
    sprite: { src: 'ptero.png', size: 1 },
    terrain: [TerrainType.SCORCHED, TerrainType.SNOW],
    enemies: [enemies.ptero, enemies.ptero, enemies.ptero],
    boss: false,
  },
  reptilians: {
    name: 'Reptilian chivalry',
    level: 1,
    sprite: { src: 'liz_knight.png', size: 1 },
    terrain: [TerrainType.GRASSLAND],
    enemies: [enemies.lizardKnight, enemies.lizardKnight, enemies.lizardKnight],
    boss: false,
  },
  itsy: {
    name: 'Itsy',
    level: 1,
    sprite: { src: 'spider.png', size: 1.5 },
    terrain: [TerrainType.GRASSLAND, TerrainType.SCORCHED],
    enemies: [enemies.itsy],
    boss: false,
  },
  minions: {
    name: 'Minions',
    level: 1,
    sprite: { src: 'imp.png', size: 0.75 },
    terrain: [TerrainType.HELL],
    enemies: [enemies.imp, enemies.imp, enemies.imp],
    boss: false,
  },
};

export const bossGroups = {
  puffy: {
    name: 'Puffy',
    level: 1,
    sprite: { src: 'dragon.png', size: 2.25 },
    terrain: [TerrainType.GRASSLAND, TerrainType.SCORCHED],
    enemies: [enemies.puffy],
    boss: true,
  },
  shell: {
    name: 'Shell shock',
    level: 1,
    sprite: { src: 'hermit_king.png', size: 2 },
    terrain: [TerrainType.BEACH],
    enemies: [enemies.hermitKnight, enemies.hermitKing, enemies.hermitKnight],
    boss: true,
  },
  angler: {
    name: 'Angler',
    level: 1,
    sprite: { src: 'angler.png', size: 2 },
    terrain: [TerrainType.OCEAN],
    enemies: [enemies.anglerFish],
    boss: true,
  },
  diablos: {
    name: 'Diablos',
    level: 1,
    sprite: { src: 'demon.png', size: 2 },
    terrain: [TerrainType.HELL],
    enemies: [enemies.imp, enemies.demon, enemies.imp],
    boss: true,
  },
  duneHazard: {
    name: 'Dune hazard',
    level: 1,
    sprite: { src: 'worm.png', size: 2 },
    terrain: [TerrainType.SUBTROPICAL_DESERT],
    enemies: [enemies.sandworm],
    boss: true,
  },
  boulderDragon: {
    name: 'Boulder dragon',
    level: 1,
    sprite: { src: 'boulder_dragon.png', size: 2 },
    terrain: [TerrainType.SCORCHED],
    enemies: [enemies.boulderDragon],
    boss: true,
  },
};

export const allEnemyGroups = { ...enemyGroups, ...bossGroups };

export const getRandomEnemyGroup = (level: number, terrain: TerrainType) => {
  const rng = sample(
    values(enemyGroups).filter(
      (e) => e.level === level && e.terrain.includes(terrain)
    )
  );
  return Object.entries(enemyGroups).find(
    ([k, e]) => e === rng
  )?.[0] as keyof typeof enemyGroups;
};

export const getRandomBosses = (
  nBosses: number,
  availableTerrainTypes: TerrainType[]
) => {
  console.log(
    values(bossGroups).filter(
      (b) => intersection(b.terrain, availableTerrainTypes).length > 0
    )
  );

  console.log(availableTerrainTypes);

  return sampleSize(
    values(bossGroups).filter(
      (b) => intersection(b.terrain, availableTerrainTypes).length > 0
    ),
    nBosses
  );
};

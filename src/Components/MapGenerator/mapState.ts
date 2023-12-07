import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { EnemyGroupType } from '..';
import { allEnemyGroups } from '../Enemy';
import { ShopModel, shops } from '../Shops';
import { TerrainItem } from './mapConstants';

const { persistAtom } = recoilPersist();

export type DirectionState = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export enum IntroductionStateType {
  GENERATING,
  BOSS_INTRO,
  BOSS_INTRO_END,
  HERO_INTRO,
  HERO_INTRO_END,
  DONE,
}

export const introductionState = atom<IntroductionStateType>({
  key: 'IntroductionState',
  default: IntroductionStateType.GENERATING,
  effects_UNSTABLE: [persistAtom],
});

export const directionState = atom<DirectionState>({
  key: 'directionState',
  default: 'S',
  effects_UNSTABLE: [persistAtom],
});

export type MoveState = 'idle' | 'moving';

export const moveState = atom<MoveState>({
  key: 'moveState',
  default: 'idle',
});

export const destinationState = atom<{
  path: number[][];
  confirmed: boolean;
  attacking?: boolean;
  blocked?: boolean;
  shop?: ShopModel;
} | null>({
  key: 'destinationState',
  default: null,
});

export const terrainSeedState = atom<string | undefined>({
  key: 'terrainSeedState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const terrainState = atom<TerrainItem[][] | undefined>({
  key: 'terrainState',
  default: undefined,
});

export const mapPositionState = atom<[number, number] | undefined>({
  key: 'mapPositionState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const charPositionState = atom<[number, number] | undefined>({
  key: 'charPositionState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const mapMarkersState = atom<{
  [key: string]: {
    enemy?: keyof typeof allEnemyGroups;
    shop?: keyof typeof shops;
  };
}>({
  key: 'mapMarkersState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const defeatedState = atom<Array<EnemyGroupType>>({
  key: 'defeatedState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const visitedTilesState = atom<{
  [key: string]: boolean;
}>({
  key: 'visitedTilesState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const showMiniMapDialog = atom<boolean>({
  key: 'showMiniMapDialog',
  default: false,
});

export const showMenuDialogState = atom<boolean>({
  key: 'showMenuDialogState',
  default: false,
});

export const bossesState = atom<
  | {
      enemy: EnemyGroupType;
      coord: [number, number];
      defeated: boolean;
    }[]
  | undefined
>({
  key: 'bossesState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

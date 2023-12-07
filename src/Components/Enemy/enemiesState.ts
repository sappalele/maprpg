import { atom } from 'recoil';
import { EnemyGroupType } from './enemies';

export const mapEncounterPointsState = atom<
  Array<{ coordinates: number[]; id: string }>
>({
  key: 'mapEncounterPointsState',
  default: [],
});

export const mapEncounterGroupsState = atom<
  Array<{ enemies: EnemyGroupType; id: string; defeated: boolean }>
>({
  key: 'mapEncounterGroupsState',
  default: [],
});

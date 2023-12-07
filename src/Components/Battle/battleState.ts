import { atom, selector } from 'recoil';
import { BabylonNode } from '..';
import { CardModel, deckState } from '../Card';
import { EnemyGroupType, EnemyType } from '../Enemy';
import { MoveType } from '../Move';

export interface EnemyBattleState extends EnemyType {
  id: string;
  nextMove?: MoveType;
  remainingHp?: number;
  justTookAoeDmg?: boolean;
}

export const inBattleState = atom<{
  enemyGroup?: EnemyGroupType & { defeated: boolean; coord: [number, number] };
  active?: boolean;
}>({
  key: 'inBattleState',
  default: {},
});

export const handState = atom<Array<{ id: string; card: CardModel }>>({
  key: 'handState',
  default: [],
});

export const shuffledDeckState = atom<Array<{ id: string; card: CardModel }>>({
  key: 'shuffledDeckState',
  default: [],
});

export const encounteredState = atom<Array<EnemyBattleState> | undefined>({
  key: 'encounteredState',
  default: undefined,
});

export const initialEncounteredState = atom<
  Array<EnemyBattleState> | undefined
>({
  key: 'initialEncounteredState',
  default: undefined,
});

export const turnState = atom<string[]>({
  key: 'turnState',
  default: [],
});

export const movesState = atom<number>({
  key: 'movesState',
  default: 0,
});

export const guardState = atom<number>({
  key: 'guardState',
  default: 0,
});

export const battleTextState = atom<
  { text: string; duration: number } | undefined
>({
  key: 'battleTextState',
  default: undefined,
});

export const selectedCardState = atom<
  { id: string; card: CardModel } | undefined
>({
  key: 'selectedCardState',
  default: undefined,
});

export const usedCardState = atom<
  { enemyId?: string; card: CardModel } | undefined
>({
  key: 'usedCardState',
  default: undefined,
});

export const babylonAnimationsState = atom<Array<BabylonNode>>({
  key: 'babylonAnimationsState',
  default: [],
});

export const glslAnimationsState = atom<
  { fragment: string; duration?: number } | undefined
>({
  key: 'glslAnimationsState',
  default: undefined,
});

export const attackAllDmgState = atom<number | undefined>({
  key: 'attackAllDmgState',
  default: undefined,
});

export const blockEndTurnState = atom<boolean>({
  key: 'blockEndTurnState',
  default: false,
});

export const discardedState = selector({
  key: 'discardedState',
  get: ({ get }) => {
    const deck = get(deckState);
    const shuffled = get(shuffledDeckState);
    const hand = get(handState);

    return deck.filter(
      (c) =>
        !shuffled.map((s) => s.id).includes(c.id) &&
        !hand.map((s) => s.id).includes(c.id)
    );
  },
});

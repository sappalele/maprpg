import { uniqueId } from 'lodash';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { CardModel, cards } from './cards';

const { persistAtom } = recoilPersist();

export const DEFAULT_DECK = [
  { card: cards.astro, id: uniqueId('card') },
  { card: cards.inferno, id: uniqueId('card') },
  { card: cards.attack, id: uniqueId('card') },
  { card: cards.attack, id: uniqueId('card') },
  { card: cards.attack, id: uniqueId('card') },
  { card: cards.guard, id: uniqueId('card') },
  { card: cards.guard, id: uniqueId('card') },
  { card: cards.guard, id: uniqueId('card') },
];

export const deckState = atom<Array<{ id: string; card: CardModel }>>({
  key: 'deckState',
  default: DEFAULT_DECK,
  effects_UNSTABLE: [persistAtom],
});

export enum DECK_DISPLAY {
  DISCARD,
  DECK,
  SHUFFLED,
}

export const deckDialogState = atom<DECK_DISPLAY | undefined>({
  key: 'deckDialogState',
  default: undefined,
});

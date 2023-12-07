import { uniqueId } from 'lodash';
import { BabylonNode } from '../3dObjects';

export enum CardType {
  ATTACK,
  ATTACK_ALL,
  DEFENCE,
  RECOVERY,
  SKILL,
}

export type CardModel = {
  name: string;
  type: CardType;
  cost: number;
  atk?: number;
  def?: number;
  hp?: number;
  babylonAnimation?: BabylonNode;
  glslAnimation?: { fragment: string; duration?: number };
  image: string;
  color: string;
  description?: string;
  blockDuration?: number;
  gold: number;
};

export const cards: { [key: string]: CardModel } = {
  attack: {
    name: 'Attack 1',
    type: CardType.ATTACK,
    cost: 1,
    atk: 3,
    image: 'attack.jpg',
    color: '#a22633',
    gold: 100,
  },
  inferno: {
    name: 'Inferno',
    type: CardType.ATTACK_ALL,
    cost: 3,
    atk: 5,
    babylonAnimation: {
      node: 'inferno',
      id: uniqueId('babylonNode'),
      duration: 3000,
    },
    image: 'fire.jpg',
    color: '#a22633',
    blockDuration: 3000,
    gold: 500,
  },
  astro: {
    name: 'Astro',
    type: CardType.ATTACK_ALL,
    cost: 3,
    atk: 5,
    glslAnimation: { fragment: 'galaxy', duration: 3000 },
    image: 'astro.png',
    color: '#181425',
    blockDuration: 3500,
    gold: 500,
  },
  guard: {
    name: 'Guard 1',
    type: CardType.DEFENCE,
    cost: 1,
    def: 3,
    image: 'guard.jpg',
    color: '#124e89',
    gold: 200,
  },
};

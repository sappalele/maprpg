import { BabylonNode } from '..';

export enum MoveVariant {
  ATTACK,
  MAGIC,
}

export type MoveType = {
  name: string;
  dmg: number;
  duration: number;
  variant: MoveVariant;
  babylonAnimation?: BabylonNode;
  glslAnimation?: { fragment: string; duration?: number };
};

export const attackMoves: { [key: string]: MoveType } = {
  basic: {
    name: 'Attack',
    dmg: 2,
    duration: 1000,
    variant: MoveVariant.ATTACK,
  },
  blizzard: {
    name: 'Blizzard',
    duration: 2500,
    dmg: 5,
    glslAnimation: { fragment: 'snow', duration: 2000 },
    variant: MoveVariant.ATTACK,
  },
};

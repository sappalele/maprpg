import { selector } from 'recoil';
import { destinationState, inBattleState, ShopModel } from '..';
import { dayState } from '../Character';
import { ShopType } from '../Shops';

export enum DialogType {
  BATTLE,
  INN,
}

const getDialogType = (
  dest?: {
    path: number[][];
    confirmed: boolean;
    attacking?: boolean | undefined;
    blocked?: boolean | undefined;
    shop?: ShopModel | undefined;
  } | null
) => {
  if (!dest) return;
  if (dest.attacking) return DialogType.BATTLE;
  if (dest.shop && dest.shop.type === ShopType.INN) return DialogType.INN;
};

export const mapDialogState = selector({
  key: 'mapDialogState',
  get: ({ get }) => {
    const battle = get(inBattleState);
    const destination = get(destinationState);
    const { newDay } = get(dayState);

    return {
      active:
        (destination?.shop || destination?.attacking || newDay) &&
        !battle.active,
      type: getDialogType(destination),
    };
  },
});

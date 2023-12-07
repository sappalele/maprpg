import { sample, values } from 'lodash';
import { TerrainType } from '../MapGenerator/mapConstants';

export enum ShopType {
  INN,
  MERCHANT,
}
export type ShopModel = {
  name: string;
  type: ShopType;
  terrain: TerrainType[];
  sprite: { src: string; size: number; higherThanWide: boolean };
};

export const shops = {
  stump: {
    name: 'Stump',
    type: ShopType.INN,
    terrain: [TerrainType.GRASSLAND],
    sprite: { src: 'stump.png', size: 1.25, higherThanWide: false },
  },
  slimeMerchant: {
    name: 'Slime Merchant',
    type: ShopType.MERCHANT,
    terrain: [TerrainType.GRASSLAND, TerrainType.BEACH, TerrainType.SCORCHED],
    sprite: { src: 'slime_merchant.png', size: 1.5, higherThanWide: false },
  },
};

export const getRandomShop = (terrain: TerrainType): keyof typeof shops => {
  const rng = sample(values(shops).filter((e) => e.terrain.includes(terrain)));
  return Object.entries(shops).find(
    ([k, e]) => e === rng
  )?.[0] as keyof typeof shops;
};

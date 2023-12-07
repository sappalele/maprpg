import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const DEFAULT_STAMINA = { total: 100, remaining: 100 };
export const DEFAULT_HEALTH = { total: 20, remaining: 20 };

export const staminaState = atom<{ total: number; remaining: number }>({
  key: 'staminaState',
  default: DEFAULT_STAMINA,
  effects_UNSTABLE: [persistAtom],
});

export const healthState = atom<{ total: number; remaining: number }>({
  key: 'healthState',
  default: DEFAULT_HEALTH,
  effects_UNSTABLE: [persistAtom],
});

export const actionState = atom<number>({
  key: 'actionState',
  default: 3,
});

export const dmgState = atom<number | undefined>({
  key: 'dmgState',
  default: undefined,
});

export const goldState = atom<number>({
  key: 'goldState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const dayState = atom<{ day: number; newDay: boolean }>({
  key: 'levelState',
  default: { day: 1, newDay: false },
  effects_UNSTABLE: [persistAtom],
});

export const deathState = selector({
  key: 'deathState',
  get: ({ get }) => {
    const health = get(healthState);

    return health.remaining < 1;
  },
});

export type TIME_OF_DAY_VALUES = 'NIGHT' | 'EVENING' | 'DUSK' | 'NOON' | 'DAWN';
export const TIME_OF_DAY: {
  [key in TIME_OF_DAY_VALUES]: { name: string; gradient: string };
} = {
  NIGHT: {
    name: 'Night',
    gradient: '#3c5777 0%,#090a0f 100%',
  },
  EVENING: {
    name: 'Evening',
    gradient: '#3c5777,#3a4466,#090a0f',
  },
  DUSK: {
    name: 'Dusk',
    gradient: '#f77622,#d77643,#be4a2f, #733e39',
  },
  NOON: {
    name: 'Noon',
    gradient: ' #2ce8f5 , #0099db, #124e89, #090a0f ',
  },
  DAWN: {
    name: 'Dawn',
    gradient: ' #f77622, #f6757a, #68386c , #262b44, #090a0f ',
  },
};

const getTimeOfDayFromStamina = (stamina: number) => {
  if (stamina >= 85) return TIME_OF_DAY.DAWN;
  else if (stamina >= 50) return TIME_OF_DAY.NOON;
  else if (stamina >= 35) return TIME_OF_DAY.DUSK;
  else return TIME_OF_DAY.NIGHT;
};

export const timeOfDayState = selector({
  key: 'timeOfDayState',
  get: ({ get }) => {
    const stamina = get(staminaState);

    return getTimeOfDayFromStamina(stamina.remaining);
  },
});

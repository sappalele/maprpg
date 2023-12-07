import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  bossesState,
  charPositionState,
  deckState,
  DEFAULT_DECK,
  mapMarkersState,
  mapPositionState,
  terrainSeedState,
  visitedTilesState,
} from './';
import { inBattleState } from './Battle';
import {
  dayState,
  DEFAULT_HEALTH,
  DEFAULT_STAMINA,
  goldState,
  healthState,
  staminaState,
} from './Character/characterState';
import {
  introductionState,
  IntroductionStateType,
  showMenuDialogState,
} from './MapGenerator';

export const useRecoilPersist = () => {
  const setDay = useSetRecoilState(dayState);
  const setBattle = useSetRecoilState(inBattleState);
  const setStamina = useSetRecoilState(staminaState);
  const setHealth = useSetRecoilState(healthState);
  const setGold = useSetRecoilState(goldState);
  const setMapEnemies = useSetRecoilState(mapMarkersState);
  const setMapPosition = useSetRecoilState(mapPositionState);
  const setCharPosition = useSetRecoilState(charPositionState);
  const [seed, setSeed] = useRecoilState(terrainSeedState);
  const setDeck = useSetRecoilState(deckState);
  const setVisited = useSetRecoilState(visitedTilesState);
  const setBosses = useSetRecoilState(bossesState);
  const setIntro = useSetRecoilState(introductionState);
  const setMenu = useSetRecoilState(showMenuDialogState);

  const reset = () => {
    setDay({ day: 1, newDay: false });
    setStamina(DEFAULT_STAMINA);
    setHealth(DEFAULT_HEALTH);
    setGold(0);
    setMapEnemies({});
    setMapPosition(undefined);
    setCharPosition(undefined);
    setSeed(undefined);
    setDeck(DEFAULT_DECK);
    setBattle({});
    setVisited({});
    setBosses(undefined);
    setIntro(IntroductionStateType.GENERATING);
    setMenu(false);
  };

  return { reset, activeGame: !!seed };
};

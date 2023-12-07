import '@babylonjs/loaders/OBJ';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BattleWrapper, Box, destinationState, inBattleState } from '..';
import { Deck } from '../';
import { DeckBrowser, deckDialogState, deckState, DECK_DISPLAY } from '../Card';
import { DayBar, HealthBar } from '../Character';
import { healthState } from '../Character/characterState';
import { bossGroups, enemyGroups, MapEnemy } from '../Enemy';
import { MapDialog } from '../MapDialogs';

const ControlsContainer = styled.div<{ hide: boolean }>`
  z-index: 402;
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  font-family: 'futile';
  transition: all 1s;
  opacity: ${({ hide }) => (hide ? '0' : '1')};
`;

const DeckContainer = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  z-index: 403;
  width: 120px;
  height: 200px;
  transform-origin: right bottom;
  transform: scale(0.75);

  @media (max-width: 991.98px) {
    transform: scale(0.6);
  }
`;

export const BattleTestScreen: React.FC = () => {
  const [, setDestination] = useRecoilState(destinationState);
  const [inBattle, setInBattle] = useRecoilState(inBattleState);
  const health = useRecoilValue(healthState);
  const deck = useRecoilValue(deckState);
  const [, setDialog] = useRecoilState(deckDialogState);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      height="100vh"
      background="radial-gradient(#3c5777 0%, #090a0f 100%)"
    >
      <MapDialog />
      <BattleWrapper />
      <ControlsContainer hide={!!inBattle.active}>
        <DayBar />
        <HealthBar {...health} />
      </ControlsContainer>
      <DeckBrowser />
      {!inBattle.active && (
        <DeckContainer>
          <Deck cards={deck} onClick={() => setDialog(DECK_DISPLAY.DECK)} />
        </DeckContainer>
      )}
      {!inBattle.active &&
        [...Object.values(enemyGroups), ...Object.values(bossGroups)].map(
          (e, i) => (
            <Box
              key={i}
              margin="0.5rem"
              onClick={() => {
                setInBattle({
                  enemyGroup: { ...e, defeated: false, coord: [0, 0] },
                });

                setDestination((d) => ({
                  path: [],
                  confirmed: false,
                  attacking: true,
                }));
              }}
            >
              <MapEnemy sprite={e.sprite}></MapEnemy>
            </Box>
          )
        )}
    </Box>
  );
};

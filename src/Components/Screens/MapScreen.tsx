import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  Deck,
  DynamicBackground,
  introductionState,
  IntroductionStateType,
  MapWrapper,
  Menu,
} from '../';
import { BattleWrapper, inBattleState } from '../Battle';
import { DeathScreen } from '../Battle/DeathScreen';
import { DeckBrowser, deckDialogState, deckState, DECK_DISPLAY } from '../Card';
import { DayBar, GoldBar, HealthBar } from '../Character';
import { healthState } from '../Character/characterState';
import { IntroOverlay } from '../IntroOverlay';
import { MapDialog } from '../MapDialogs';
import { Map } from '../MapGenerator/MapGenerator';
import { MiniMapDialog } from '../MapGenerator/MiniMap';

const ControlsContainer = styled.div<{ hide: boolean }>`
  z-index: 402;
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  font-family: 'futile';
  transition: all 1s;
  opacity: ${({ hide }) => (hide ? '0' : '1')};
  align-items: center;
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

const FadeWrapper = styled.div<{ show: boolean }>`
  transition: all 1s;
  opacity: ${({ show }) => (show ? '1' : '0')};
`;

export const MapScreen: React.FC = () => {
  const introState = useRecoilValue(introductionState);
  const health = useRecoilValue(healthState);
  const inBattle = useRecoilValue(inBattleState);
  const deck = useRecoilValue(deckState);
  const [, setDialog] = useRecoilState(deckDialogState);

  return (
    <>
      <DeathScreen />
      <MiniMapDialog />
      <MapDialog />
      <DeckBrowser />
      <Menu />
      <MapWrapper>
        <FadeWrapper show={introState === IntroductionStateType.DONE}>
          <BattleWrapper />
          <ControlsContainer hide={!!inBattle.active}>
            <DayBar />
            <HealthBar {...health} />
            <GoldBar />
          </ControlsContainer>
          {!inBattle.active && (
            <DeckContainer>
              <Deck cards={deck} onClick={() => setDialog(DECK_DISPLAY.DECK)} />
            </DeckContainer>
          )}
        </FadeWrapper>
        <FadeWrapper show={introState !== IntroductionStateType.DONE}>
          <IntroOverlay />
        </FadeWrapper>
        <DynamicBackground />
        <Map />
      </MapWrapper>
    </>
  );
};

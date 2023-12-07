import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Deck, deckDialogState, DECK_DISPLAY } from '../Card';
import { discardedState, shuffledDeckState } from './battleState';

const DeckContainer = styled.div`
  position: absolute;
  z-index: 423;
  width: 120px;
  height: 200px;
  transform-origin: right bottom;
  transform: scale(0.75);
  bottom: -5rem;
  right: -1rem;
`;

const DiscardContainer = styled.div`
  position: absolute;
  z-index: 423;
  width: 120px;
  height: 200px;
  transform-origin: left bottom;
  transform: scale(0.75);
  bottom: -5rem;
  left: -1rem;
  filter: grayscale(1) brightness(1.5);
`;

export const BattleDeck: React.FC = () => {
  const shuffled = useRecoilValue(shuffledDeckState);
  const discarded = useRecoilValue(discardedState);
  const [, setDialog] = useRecoilState(deckDialogState);

  return (
    <>
      <DiscardContainer>
        <Deck
          showCount
          cards={discarded}
          discard
          onClick={() => {
            setDialog(DECK_DISPLAY.DISCARD);
          }}
        />
      </DiscardContainer>
      <DeckContainer>
        <Deck
          showCount
          showBack
          cards={shuffled}
          onClick={() => setDialog(DECK_DISPLAY.SHUFFLED)}
        />
      </DeckContainer>
    </>
  );
};

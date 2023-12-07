import React from 'react';
import { useMedia } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Box, Card, inBattleState, shuffledDeckState } from '..';
import { discardedState } from '../Battle';
import { Dialog } from '../Dialog';
import { deckDialogState, deckState, DECK_DISPLAY } from './deckState';

const Container = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: 421;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(125%)')};
  transition: all 1s;
  left: 0.5rem;
  right: 0.5rem;
`;

const CardWrapper = styled.div`
  margin: 0.5rem;
`;

export const DeckBrowser: React.FC = () => {
  const deck = useRecoilValue(deckState);
  const { active } = useRecoilValue(inBattleState);
  const shuffledDeck = useRecoilValue(shuffledDeckState);
  const discarded = useRecoilValue(discardedState);
  const [showDialog, setDialog] = useRecoilState(deckDialogState);
  const isMobile = useMedia('(max-width: 991.98px)');
  const battleCards =
    showDialog === DECK_DISPLAY.SHUFFLED ? shuffledDeck : discarded;

  const close = () => setDialog(undefined);

  return (
    <Container show={showDialog !== undefined}>
      <Dialog
        maxWidth="800px"
        maxHeight={isMobile ? '100%' : '632px'}
        onClose={close}
        onClickAway={close}
      >
        <Box marginBottom="1rem">
          {showDialog === DECK_DISPLAY.DISCARD ? 'Discarded' : 'Deck'}
        </Box>
        <Box
          overflow="auto"
          display="flex"
          flexWrap="wrap"
          flexGrow={1}
          justifyContent="space-evenly"
          paddingBottom="3rem"
        >
          {showDialog !== undefined &&
            [...(active ? battleCards : deck)]
              .sort((a, b) => a.card.type - b.card.type)
              .map((c, i) => (
                <CardWrapper key={c.id}>
                  <Card card={c.card} />
                </CardWrapper>
              ))}
        </Box>
      </Dialog>
    </Container>
  );
};

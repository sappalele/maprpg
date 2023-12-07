import React from 'react';
import { useHover } from 'react-use';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { Box, Button, CardModel } from '..';
import { handState, selectedCardState } from '../Battle';
import { Card, CardBack } from './Card';

const CardWrapper = styled.div<{ index: number; hovered: boolean }>`
  position: absolute;
  top: 0;
  transition: all 0.25s;
  z-index: ${({ index }) => index};
  cursor: pointer;

  transform: ${({ index, hovered }) =>
    `rotateX(20deg) rotateZ(${
      (index % 4) * (hovered ? 2 : 1)
    }deg) scale(${1}) translateY(${index * (hovered ? -2 : -1)}px)`};
`;

const NoOfCards = styled.div<{ discard: boolean | undefined }>`
  position: absolute;
  top: -0.75rem;
  ${({ discard }) => (discard ? 'right: -0.75rem' : 'left: -0.75rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border-radius: 50%;
  color: #fff;
  background-color: #e43b44;
  z-index: 406;

  font-family: 'futile';
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
`;

const Discard = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 407;
  opacity: 0;
  transition: all 1s;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  pointer-events: none;

  @media (max-width: 991.98px) {
    left: 20px;
  }

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;

export const Deck: React.FC<{
  cards: {
    id: string;
    card: CardModel;
  }[];
  showBack?: boolean;
  discard?: boolean;
  showCount?: boolean;
  onClick: () => any;
}> = ({ cards, showBack, discard, showCount, onClick }) => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const [, setHand] = useRecoilState(handState);

  const element = (hovered: boolean) => (
    <Box position="relative" width="100%" height="100%">
      {discard && (
        <Discard show={!!selectedCard}>
          <Button
            color="#FFF"
            bgColor="#e43b44"
            onClick={() => {
              if (selectedCard) {
                setHand((h) => h.filter((c) => c.id !== selectedCard.id));
                setSelectedCard(undefined);
              }
            }}
          >
            Discard
          </Button>
        </Discard>
      )}
      {showCount && cards.length > 0 && (
        <NoOfCards discard={discard}>{cards.length}</NoOfCards>
      )}
      {cards.map((c, i) => (
        <CardWrapper onClick={onClick} hovered={hovered} index={i} key={c.id}>
          {showBack ? <CardBack /> : <Card card={c.card} />}
        </CardWrapper>
      ))}
    </Box>
  );

  const [hoverable] = useHover(element);

  return hoverable;
};

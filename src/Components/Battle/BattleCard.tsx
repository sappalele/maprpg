import React from 'react';
import { useDrag } from 'react-dnd';
import { useMedia } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { rotateInUpLeftKeyframes } from '../Animations';
import { Card, CardModel } from '../Card';
import { movesState, selectedCardState } from './battleState';

const Draggable = styled.div<{ selected: boolean; disabled: boolean }>`
  margin-left: -60px;
  transition: all 0.25s;
  animation: ${rotateInUpLeftKeyframes} 0.5s ease;

  ${({ selected }) =>
    selected &&
    `
    margin-right: 40px;
    z-index: 423;
    margin-bottom: 140px;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    filter: grayscale(1) brightness(1.5);
  `}  

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    &:hover {
      margin-right: 0;
    }
  }

  @media (max-width: 420px) {
    margin-left: -95px;

    &:first-child {
      margin-left: 20px;
    }
  }

  @media (min-width: 420px) {
    &:hover {
      margin-right: 40px;
      z-index: 423;
      margin-bottom: 140px;
    }
  }
`;

const CardButton = styled.button<{ selected: boolean }>`
  padding: 0;

  &:focus {
    outline: none;
  }

  ${({ selected }) => selected && 'filter: drop-shadow(0px 0px 5px #2ce8f5);'}
`;

export const BattleCard: React.FC<{ id: string; card: CardModel }> = ({
  id,
  card,
}) => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const moves = useRecoilValue(movesState);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'CARD',
    item: { id, card },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const selected = selectedCard?.id === id;
  const isMobile = useMedia('(max-width: 420px)');

  return (
    <Draggable
      disabled={card.cost > moves}
      selected={selected}
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <CardButton
        selected={selected}
        onClick={() =>
          selected ? setSelectedCard(undefined) : setSelectedCard({ id, card })
        }
        ref={drag}
      >
        <Card card={card} flipName={!selected && isMobile} />
      </CardButton>
    </Draggable>
  );
};

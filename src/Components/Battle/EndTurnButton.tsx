import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  blockEndTurnState,
  Button,
  encounteredState,
  movesState,
  selectedCardState,
  turnState,
} from '..';

export const EndTurnButton: React.FC = () => {
  const [encoutered] = useRecoilState(encounteredState);
  const [moves] = useRecoilState(movesState);
  const [, setTurn] = useRecoilState(turnState);
  const [, setSelectedCard] = useRecoilState(selectedCardState);
  const block = useRecoilValue(blockEndTurnState);

  if (!encoutered) return <div></div>;

  const onClick = () => {
    setTurn(encoutered.map((e) => e.id));
    setSelectedCard(undefined);
  };

  return (
    <Button
      disabled={block}
      bgColor={moves === 0 ? '#5CAF8C' : '#8b9bb4'}
      color="#FFF"
      onClick={onClick}
    >
      End turn
    </Button>
  );
};

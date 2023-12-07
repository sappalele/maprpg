import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Card } from '../Card';
import { usedCardState } from './battleState';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 450;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

export const BattleCenterStage: React.FC = () => {
  const [usedCard, setUsedCard] = useRecoilState(usedCardState);

  return (
    <Wrapper>
      {usedCard && !usedCard.enemyId && <Card card={usedCard.card} used />}
    </Wrapper>
  );
};

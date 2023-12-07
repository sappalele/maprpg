import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BattleCard } from './BattleCard';
import { encounteredState, handState, turnState } from './battleState';

export const Cards = styled.div<{ show: boolean }>`
  position: absolute;
  z-index: 421;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  margin-bottom: -100px;
  align-items: flex-end;
  transition: all 1s;
  padding-left: 130px;
  padding-right: 40px;

  opacity: ${({ show }) => (show ? '1' : '0')};

  & > div {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 991.98px) {
    overflow: auto;
    padding-top: 1rem;
  }
`;

export const BattleCards: React.FC = () => {
  const [hand] = useRecoilState(handState);
  const [encoutered] = useRecoilState(encounteredState);
  const [turn] = useRecoilState(turnState);
  const [initialScrolled, setInitialScrolled] = useState(false);
  const win = encoutered?.length === 0;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      container.current &&
      hand.length &&
      !initialScrolled &&
      turn.length === 0
    ) {
      container.current.scrollTo(1000, 0);
      setInitialScrolled(true);
      console.log('scroll');
    }
  }, [container, hand, initialScrolled, turn]);

  useEffect(() => {
    if (turn.length) {
      setInitialScrolled(false);
    }
  }, [turn]);

  return (
    <Cards ref={container} show={!win}>
      {hand.map((item) => (
        <BattleCard key={item.id} {...item} />
      ))}
    </Cards>
  );
};

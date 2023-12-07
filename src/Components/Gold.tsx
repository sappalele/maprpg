import React from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import { Coin } from '.';

const GoldText = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color || '#8a6e2f'};
  font-size: 2rem;
  padding-right: 0.5rem;
`;

export const Gold: React.FC<{ amount: number; color?: string }> = ({
  amount,
  color,
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: amount,
    config: { ...config.molasses, duration: 1000 },
  });

  return (
    <GoldText color={color}>
      <Coin />
      <animated.div>{number.to((n) => Math.round(n))}</animated.div>
    </GoldText>
  );
};

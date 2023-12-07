import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Box from 'ui-box';
import { goldState } from './characterState';

const GoldContainer = styled.div`
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  display: flex;
  border-radius: 0.5rem;

  img {
    height: 1.25rem;
    width: auto;
    margin-right: 0.5rem;
  }
`;

export const GoldBar: React.FC = () => {
  const gold = useRecoilValue(goldState);

  return (
    <GoldContainer>
      <img src={require('../../Resources/coin.png').default} alt="coin" />
      <Box>{gold}</Box>
    </GoldContainer>
  );
};

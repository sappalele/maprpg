import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Gold } from '../Gold';
import { goldState } from './characterState';

const Wrapper = styled.div`
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  display: flex;
  border-radius: 0.5rem;
  flex-direction: column;
`;

export const Coins: React.FC = () => {
  const gold = useRecoilValue(goldState);

  return (
    <Wrapper>
      <Gold amount={gold} />
    </Wrapper>
  );
};

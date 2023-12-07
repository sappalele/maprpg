import React from 'react';
import styled, { css } from 'styled-components';
import { flashKeyframes } from '../Animations';
import { Box } from '../Box';

const ActionsContainer = styled.div<{ bgSize: number }>`
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  display: flex;
  border-radius: 0.5rem;
  font-family: 'futile';
  transition: all 1s;

  img {
    height: 1.5rem;
    width: auto;
    margin-right: 0.5rem;
  }
`;

const Remaining = styled.span<{ flash: number }>`
  padding-right: 0.25rem;

  ${({ flash }) =>
    flash &&
    css`
      animation: ${flashKeyframes} 2s ease-in-out infinite;
    `}
`;

const Total = styled.span`
  padding-left: 0.25rem;
`;

export const ActionsBar: React.FC<{
  total: number;
  remaining: number;
}> = ({ total, remaining }) => {
  return (
    <ActionsContainer bgSize={Math.floor((remaining / total) * 100)}>
      <Box fontSize="1rem">
        <img
          src={require('../../Resources/lightning.png').default}
          alt="moves"
        />
      </Box>
      <Box>
        <Remaining flash={0}>{remaining}</Remaining>/<Total>{total}</Total>
      </Box>
    </ActionsContainer>
  );
};

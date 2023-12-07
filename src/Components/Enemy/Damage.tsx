import React from 'react';
import styled from 'styled-components';
import { Box } from '..';
import { fadeOutUpKeyframes } from '../Animations';

const DmgText = styled.div`
  animation: ${fadeOutUpKeyframes} 2s ease infinite;
  color: #b4202a;
  font-size: 2rem;
  font-family: 'futile';
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
`;

export const Damage: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <Box width="100%" textAlign="center">
      <DmgText>{amount}</DmgText>
    </Box>
  );
};

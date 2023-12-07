import React from 'react';
import styled, { css } from 'styled-components';
import { floatKeyFrames } from './Animations';
import { Box } from './Box';

const Character = styled.div<{ index: number; hide: boolean }>`
  ${({ hide }) => hide && 'visibility: hidden;'}
  animation: ${({ index }) =>
    css`
      ${floatKeyFrames} 2s ease infinite ${index * 0.5}s
    `};
`;

export const WavyText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Box display="flex">
      {text
        .replaceAll(' ', '_')
        .split('')
        .map((c, i) => (
          <Character key={`${text}${i}`} index={i} hide={c === '_'}>
            {c}
          </Character>
        ))}
    </Box>
  );
};

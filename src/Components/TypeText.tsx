import React from 'react';
import styled, { css } from 'styled-components';
import { fadeInKeyframes } from './Animations';
import { Box } from './Box';

const Character = styled.div<{ index: number }>`
  animation: ${({ index }) =>
    css`
      ${fadeInKeyframes} 0.1s ease  ${index * 0.1}s
    `};
`;

export const TypeText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <Box display="flex" className={className}>
      {Array(text.length)
        .fill(undefined)
        .map((u, i) => (
          <Character key={`${text}${i}`} index={i}>
            {text.charAt(i)}
          </Character>
        ))}
    </Box>
  );
};

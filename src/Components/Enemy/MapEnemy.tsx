import React from 'react';
import styled, { css } from 'styled-components';
import { Box, swayKeyFrames } from '..';

const Sprite = styled.div<{
  size: number;
}>`
  ${css`
    animation: ${swayKeyFrames} 1s ease-in-out 1.5s forwards infinite;
    transform-origin: bottom center;
  `}
  img {
    max-height: ${({ size }) => `${size * 150}px`};
    max-width: ${({ size }) => `${size * 70}px`};
  }
`;

export const MapEnemy: React.FC<{
  sprite: { src: string; size: number };
  height?: string;
  width?: string;
}> = ({ sprite, height = '40px', width = 'auto' }) => {
  return (
    <Box transition="all 1s">
      <Sprite size={sprite.size}>
        <img
          alt="enemy-on-map"
          src={require(`../../Resources/enemies/${sprite.src}`).default}
        />
      </Sprite>
    </Box>
  );
};

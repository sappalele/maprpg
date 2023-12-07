import React from 'react';
import styled from 'styled-components';
import { Box } from '..';

const Sprite = styled.div<{
  size: number;
}>`
  img {
    max-height: ${({ size }) => `${size * 150}px`};
    max-width: ${({ size }) => `${size * 70}px`};
  }
`;

export const MapShop: React.FC<{
  sprite: { src: string; size: number };
  height?: string;
  width?: string;
}> = ({ sprite }) => {
  return (
    <Box transition="all 1s">
      <Sprite size={sprite.size}>
        <img
          alt="shop-on-map"
          src={require(`../../Resources/shops/${sprite.src}`).default}
        />
      </Sprite>
    </Box>
  );
};

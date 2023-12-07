import React from 'react';
import styled from 'styled-components';
import { EnemyType } from './enemies';

const Sprite = styled.div<{
  size: number;
  middle: boolean;
}>`
  margin: 0 ${({ size }) => `${size * -1 * 16}px`};
  img {
    max-height: ${({ size }) => `${size * 150}px`};
    max-width: ${({ size, middle }) => (middle ? `${size * 150}px` : '100%')};
  }
`;

export const DialogEnemy: React.FC<{
  enemy: EnemyType;
  middle: boolean;
}> = ({ enemy: { sprite }, middle }) => {
  return (
    <Sprite size={sprite.size} middle={middle}>
      <img
        alt="enemy-on-map"
        src={require(`../../Resources/enemies/${sprite.src}`).default}
      />
    </Sprite>
  );
};

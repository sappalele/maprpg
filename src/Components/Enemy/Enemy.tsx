import React from 'react';
import styled, { css } from 'styled-components';
import { Box, EnemyBattleState } from '..';
import {
  bounceKeyframes,
  fadeInDownKeyframes,
  floatKeyFrames,
  shakeKeyframes,
  zoomOutKeyframes,
} from '../Animations';
import { HealthBar } from '../Character';
import { MoveVariant } from '../Move';

export enum EnemyAnimationState {
  ATTACKING,
  TAKING_DAMAGE,
  DEAD,
}

const getKeyframes = (state?: EnemyAnimationState) => {
  switch (state) {
    case EnemyAnimationState.TAKING_DAMAGE:
      return shakeKeyframes;
    case EnemyAnimationState.ATTACKING:
      return bounceKeyframes;
    case EnemyAnimationState.DEAD:
      return zoomOutKeyframes;
    default:
      return floatKeyFrames;
  }
};

const nextMoveIndicator = (variant: MoveVariant) => {
  if (variant === MoveVariant.ATTACK)
    return (
      <Box>
        <img
          src={require('../../Resources/sword.png').default}
          alt="attacking"
        />
      </Box>
    );
  if (variant === MoveVariant.MAGIC) return 'trollspä';
  return '';
};

const Sprite = styled.button<{
  size: number;
  higherThanWide: boolean;
  state?: EnemyAnimationState;
}>`
  &:focus {
    outline: none;
  }

  animation: ${({ state }) =>
    css`
      ${getKeyframes(state)} 1s ease ${state === undefined ? 'infinite' : ''}
    `};

  img {
    ${({ size, higherThanWide }) =>
      higherThanWide
        ? css`
            max-width: 100%;
            max-height: ${size * 240}px;
            width: auto;
          `
        : css`
            max-height: ${size * 240}px;
            max-width: 100%;
            height: auto;
          `}
  }
`;

const NextMoveWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin: auto;
  background-color: #fff;
  padding: 0.4rem;
  border-radius: 0.5rem;
  display: flex;
  z-index: 3;
  animation: ${fadeInDownKeyframes} 0.5s;

  img {
    height: 28px;
    width: auto;
  }

  .dot-1 {
    height: 16px;
    width: 16px;
    z-index: 2;
    right: calc(50% - 8px);
    position: absolute;
    bottom: -7px;
    transform: rotate(45deg);
    background-color: #fff;
  }
`;

export const Enemy: React.FC<{
  enemy: EnemyBattleState;
  animation?: EnemyAnimationState;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ enemy, animation, onClick }) => {
  const { src, size, higherThanWide } = enemy.sprite;

  return (
    <Box>
      <Sprite
        onClick={onClick}
        size={size}
        state={animation}
        higherThanWide={higherThanWide}
      >
        <img
          alt="enemy"
          src={require(`../../Resources/enemies/${src}`).default}
        />
      </Sprite>
      {animation !== EnemyAnimationState.DEAD && (
        <>
          {enemy.nextMove && (
            <Box
              position="absolute"
              top="-3.75rem"
              left={0}
              right={0}
              justifyContent="center"
            >
              <NextMoveWrapper>
                {nextMoveIndicator(enemy.nextMove.variant)}
                <Box
                  fontFamily="futile"
                  fontSize="1.25rem"
                  padding="0.25rem"
                  display="flex"
                  alignItems="center"
                >
                  {enemy.nextMove.dmg}
                </Box>
                <div className="dot-1"></div>
              </NextMoveWrapper>
            </Box>
          )}
          <Box marginTop="1rem" display="flex" justifyContent="center">
            <HealthBar
              enemy
              total={enemy.hp}
              remaining={enemy.remainingHp || enemy.hp}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

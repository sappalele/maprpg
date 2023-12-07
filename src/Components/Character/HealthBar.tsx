import React from 'react';
import styled, { css } from 'styled-components';
import Box from 'ui-box';
import { flashKeyframes } from '../Animations';

const HealthContainer = styled.div<{ bgSize: number; enemy?: boolean }>`
  position: relative;
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  display: flex;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  font-family: 'futile';
  z-index: 1;
  transition: all 1s;

  img {
    height: 1.25rem;
    width: auto;
    margin-right: 0.5rem;
  }

  ${({ enemy, bgSize }) =>
    enemy &&
    css`
      background-color: #808080;
      background-image: linear-gradient(0deg, #e43b44, #e43b44);
      background-repeat: no-repeat;
      background-size: ${bgSize > 0 ? bgSize : 0}% 100%;
      font-size: 1rem;
      padding: 0.25rem 1rem;
      margin: 0;
      width: 100%;
    `}
`;

const GuardContainer = styled.div<{ show?: boolean; enemy?: boolean }>`
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  flex-direction: column;
  display: flex;
  border-radius: 0.5rem;
  background-repeat: no-repeat;
  font-family: 'futile';
  transition: all 1s;
  opacity: 0;
  position: absolute;
  transform: translateX(-100%);

  img {
    height: 1.5rem;
    width: auto;
    margin-right: 0.5rem;
  }

  ${({ show }) =>
    show &&
    css`
      position: static;
      opacity: 1;
      padding-left: 1rem;
      transform: translateX(0);
    `}
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

export const HealthBar: React.FC<{
  total: number;
  remaining: number;
  guard?: number;
  enemy?: boolean;
}> = ({ total, remaining, guard, enemy }) => {
  return (
    <Box position="relative" display="flex" height="100%">
      <HealthContainer
        enemy={enemy}
        bgSize={Math.floor((remaining / total) * 100)}
      >
        <Box display={enemy ? 'none' : 'flex'}>
          <img src={require('../../Resources/heart.png').default} alt="heart" />
        </Box>
        <Box>
          <Remaining flash={remaining / total < 0.2 ? 1 : 0}>
            {remaining}
          </Remaining>
          /<Total>{total}</Total>
        </Box>
      </HealthContainer>
      <GuardContainer show={!!guard} enemy={enemy}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src={require('../../Resources/shield.png').default}
            alt="shield"
          />
          {guard}
        </Box>
      </GuardContainer>
    </Box>
  );
};

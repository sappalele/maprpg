import React from 'react';
import styled, { css } from 'styled-components';
import { Box, CardModel, CardType, fadeOutUpKeyframes } from '..';

const Container = styled.div<{
  color?: string;
  bgColor?: string;
  bgImage?: string;
  used?: boolean;
}>`
  background-color: #fff;
  width: 130px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-clip: padding-box;
  box-shadow: 1px 2px 2px rgb(0 0 0 / 30%);
  padding-left: 2rem;
  position: relative;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  background-image: ${({ bgImage }) => `url('${bgImage}')` || 'none'};
  background-size: calc(130px * 0.63);
  background-position: center top;
  background-repeat: no-repeat;

  ${({ used }) =>
    used &&
    css`
      animation: ${fadeOutUpKeyframes} 1s;
    `}
`;

const ContainerBack = styled.div<{ color?: string; bgColor?: string }>`
  background-color: #fff;
  width: 130px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-clip: padding-box;
  box-shadow: 1px 2px 2px rgb(0 0 0 / 30%);
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    background-image: linear-gradient(334deg, #51856080, #51856010);
    height: 100%;
    width: 100%;
  }
`;

const Cost = styled.div`
  color: #fff;
  top: 0;
  left: 0;
  position: absolute;
  font-family: 'futile';
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
`;

const Description = styled.div`
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Abaddon';
  font-size: 1rem;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.87);
`;

const Name = styled.div<{ flip?: boolean }>`
  transition: all 1s;
  font-family: 'futile';
  margin-bottom: 0.5rem;

  ${({ flip }) =>
    flip &&
    css`
      position: absolute;
      top: -110px;
      left: 0.5rem;
      writing-mode: tb;
    `}
`;

const getDescription = (card: CardModel) => {
  if (card.description) return card.description;
  if (card.type === CardType.ATTACK)
    return `Deal ${card.atk} dmg to a single enemy.`;
  if (card.type === CardType.ATTACK_ALL)
    return `Deal ${card.atk} dmg to all enemies.`;
  if (card.type === CardType.DEFENCE)
    return `Apply ${card.def} guard for one turn.`;
};

export const Card: React.FC<{
  card: CardModel;
  flipName?: boolean;
  used?: boolean;
}> = ({ card, flipName, used }) => {
  return (
    <Container
      used={used}
      bgColor={card.color}
      bgImage={require('../../Resources/cards/' + card.image).default}
    >
      <Cost>{card.cost}</Cost>
      <Description>
        <Name flip={flipName}>{card.name}</Name>
        <Box>{getDescription(card)}</Box>
      </Description>
    </Container>
  );
};

export const CardBack: React.FC = () => {
  return (
    <ContainerBack>
      <div className="inner"></div>
    </ContainerBack>
  );
};

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { Box, Button, Gold, mapMarkersState } from '..';
import { floatKeyFrames } from '../Animations';
import { Card, CardModel, deckState } from '../Card';
import { goldState } from '../Character/characterState';
import { bossesState, defeatedState } from '../MapGenerator';
import { WavyText } from '../WavyText';
import { inBattleState, initialEncounteredState } from './battleState';

const Wrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  transition: all 1s;

  opacity: ${({ show }) => (show ? '1' : '0')};

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    font-family: Abaddon;
  }
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CardWrapper = styled.button<{ index: number; selected?: boolean }>`
  margin: 1rem;
  transform: scale(1);
  transition: all 1s;

  ${({ selected }) =>
    selected === false &&
    `
    filter: grayscale(100%);
    transform: scale(0.85);

    &::hover {
      opacity: 1;
    }
  `}

  animation: ${({ selected, index }) =>
    selected === true || selected === undefined
      ? css`
          ${floatKeyFrames} 2s ease infinite ${index * 0.5}s
        `
      : 'none'};
`;

export const Victory: React.FC = () => {
  const [, setMapEnemies] = useRecoilState(mapMarkersState);
  const [, setGoldState] = useRecoilState(goldState);
  const [initEncount, setInitEncount] = useRecoilState(initialEncounteredState);
  const [{ enemyGroup }, setBattleState] = useRecoilState(inBattleState);
  const [deck, setDeck] = useRecoilState(deckState);
  const [defeated, setDefeated] = useRecoilState(defeatedState);
  const [bosses, setBosses] = useRecoilState(bossesState);
  const [rewardCards, setRewardCards] = useState<Array<CardModel>>([]);
  const [gold, setGold] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [rewardCard, setRewardCard] = useState<[CardModel, number] | undefined>(
    undefined
  );

  useEffect(() => {
    if (initEncount) {
      const rewardCards: CardModel[] = initEncount
        .flatMap((e) => e.rewards)
        .flatMap((c) => Array(Math.floor(c.probability * 10)).fill(c.card));

      setRewardCards(
        Array(2)
          .fill(undefined)
          .map(
            () => rewardCards[Math.floor(Math.random() * rewardCards.length)]
          )
      );

      setInitEncount(undefined);
      setTimeout(() => setShow(true), 500);
      setTimeout(
        () => setGold(initEncount?.reduce((p, c) => c.gold + p, 0) || 0),
        1000
      );
    }
  }, [initEncount, setInitEncount]);

  const continueClick = () => {
    if (rewardCard) {
      setDeck([...deck, { card: rewardCard[0], id: `card${deck.length + 2}` }]);
    }

    setMapEnemies((me) => {
      const newVal = { ...me };
      delete newVal[enemyGroup!.coord.toString()];

      return newVal;
    });

    if (enemyGroup?.boss) {
      const currBoss = bosses!.find((b) => b.enemy.name === enemyGroup.name)!;

      setBosses((b) => [
        ...(b || [])?.filter((bo) => bo.enemy.name !== currBoss.enemy.name),
        { ...currBoss, defeated: true },
      ]);
    }

    if (enemyGroup) setDefeated((d) => [...d, enemyGroup]);

    setBattleState({});
    setGoldState((g) => g + gold);
  };

  return (
    <Wrapper show={show}>
      <Box is="h1">
        <WavyText text="Victory!" />
      </Box>
      <Gold amount={gold} />
      <Box is="p">Pick a reward:</Box>
      <Cards>
        {rewardCards.map((c, i) => (
          <CardWrapper
            selected={rewardCard && rewardCard[1] === i}
            index={i}
            key={c.name + i}
            onClick={() =>
              rewardCard && rewardCard[1] === i
                ? setRewardCard(undefined)
                : setRewardCard([c, i])
            }
          >
            <Card card={c}></Card>
          </CardWrapper>
        ))}
      </Cards>
      <Box marginTop="2rem">
        <Button
          bgColor="#5CAF8C"
          color="#FFF"
          onClick={() => {
            continueClick();
          }}
        >
          <Box paddingX="1rem">{rewardCard ? 'CONTINUE' : 'SKIP'}</Box>
        </Button>
      </Box>
    </Wrapper>
  );
};

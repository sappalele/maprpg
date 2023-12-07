import { shuffle, uniqueId } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMedia } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { inBattleState, shakeKeyframes } from '..';
import { Box } from '../Box';
import { CardModel, deckState } from '../Card';
import { ActionsBar, HealthBar } from '../Character';
import {
  actionState,
  dmgState,
  healthState,
} from '../Character/characterState';
import { MoveType } from '../Move';
import { Battle3dAnimations } from './Battle3dAnimations';
import { BattleCards } from './BattleCards';
import { BattleDeck } from './BattleDeck';
import { BattleEnemies } from './BattleEnemies';
import {
  encounteredState,
  guardState,
  handState,
  initialEncounteredState,
  movesState,
  shuffledDeckState,
  turnState,
} from './battleState';
import { BattleText } from './BattleText';
import { EndTurnButton } from './EndTurnButton';
import { Victory } from './Victory';

export enum BattleAnimationState {
  TAKING_DAMAGE,
}

const containerAnimation = (state?: BattleAnimationState) => {
  switch (state) {
    case BattleAnimationState.TAKING_DAMAGE:
      return css`
        animation: ${shakeKeyframes} 0.5s ease infinite;
      `;
    default:
      return '';
  }
};

const Container = styled.div<{ show: number }>`
  position: fixed;
  z-index: 403;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(125%)')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: all 1s;
`;

const BattleContatiner = styled.div<{ state?: BattleAnimationState }>`
  max-width: 800px;
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  overflow: visible;
  z-index: 421;
  position: relative;
  ${({ state }) => containerAnimation(state)}
`;

const StatsBar = styled.div<{ full: boolean }>`
  z-index: 421;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-family: 'futile';
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000de;
  transform-origin: top center;
  height: 68px;

  ${({ full }) =>
    full &&
    css`
      background-color: #ffffffde;
      transition: all 1s;
      height: 100%;
      max-height: 600px;
      position: static;
      width: 100%;
    `}
`;

const EndTurnMobile = styled(Box)`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  justify-content: center;
  z-index: 422;

  button {
    width: 150px;
  }
`;

export const Battle: React.FC = () => {
  const isMobile = useMedia('(max-width: 991.98px)');
  const [{ enemyGroup }] = useRecoilState(inBattleState);
  const actions = useRecoilValue(actionState);
  const [encoutered, setEncountered] = useRecoilState(encounteredState);
  const [, setInitialEncountered] = useRecoilState(initialEncounteredState);
  const [hand, setHand] = useRecoilState(handState);
  const [shuffledDeck, setShuffledDeck] = useRecoilState(shuffledDeckState);
  const deck = useRecoilValue(deckState);
  const [moves, setMoves] = useRecoilState(movesState);
  const [turn, setTurn] = useRecoilState(turnState);
  const [dmg, setDmg] = useRecoilState(dmgState);
  const health = useRecoilValue(healthState);
  const [guard, setGuard] = useRecoilState(guardState);

  const divRef = useRef<HTMLDivElement>(null);
  const [drawSize, setDrawSize] = useState(5);

  const win = encoutered?.length === 0;

  //init battle in this
  useEffect(() => {
    if (enemyGroup) {
      console.debug('init');
      const enemies = enemyGroup.enemies.map((e) => ({
        ...e,
        id: uniqueId('enemy'),
      }));
      setEncountered(enemies);
      setInitialEncountered(enemies);
      setShuffledDeck(shuffle(deck));
      setHand([]);

      return () => {
        setHand([]);
        setShuffledDeck([]);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  //draw cards and reset energy on new turn
  useEffect(() => {
    // try to shuffle if empty
    const initialShuffle = shuffledDeck.length
      ? shuffledDeck
      : shuffle(deck.filter((c) => ![...hand].find((cd) => cd.id === c.id)));

    if (!turn.length && initialShuffle.length) {
      console.debug('draw cards and reset energy, guard on new turn');
      setGuard(0);
      setMoves(actions);

      if (hand.length >= 10) return; // maxed out

      let shuffled = [...initialShuffle];
      const room = 10 - hand.length;
      const actualDraw = room > drawSize ? drawSize : room;
      const leftInDeck = shuffled.length;
      let newCards: { id: string; card: CardModel }[] = [];

      if (leftInDeck > actualDraw) {
        newCards = shuffled.splice(0, actualDraw);
      } else {
        const remainderFromDeck = actualDraw - leftInDeck;
        newCards = shuffled;

        const remainingDeck = deck.filter(
          (c) => ![...hand, ...newCards].find((cd) => cd.id === c.id)
        );
        shuffled = shuffle(remainingDeck);
        newCards = [...newCards, ...shuffled.splice(0, remainderFromDeck)];
      }

      setHand([...hand, ...newCards]);

      // try to shuffle if empty
      if (!shuffled.length) {
        console.debug('empty deck');
        shuffled = shuffle(
          deck.filter(
            (c) => ![...hand, ...newCards].find((cd) => cd.id === c.id)
          )
        );
      }

      setShuffledDeck(shuffled);
      if (drawSize === 5) setDrawSize(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  useEffect(() => {
    if (turn.length) return; // still enemy turn

    console.debug('set enemy moves');
    setEncountered((e) =>
      e?.map((e) => {
        const moves: MoveType[] = e.moves.flatMap((m) =>
          Array(Math.floor(m.probability * 10)).fill(m)
        );
        return {
          ...e,
          nextMove: moves[Math.floor(Math.random() * moves.length)],
        };
      })
    );
  }, [setEncountered, turn]);

  useEffect(() => {
    if (dmg !== undefined)
      setTimeout(() => {
        setDmg(undefined);
      }, 500);
  }, [dmg, setDmg]);

  const getAnimation = useCallback(() => {
    if (dmg !== undefined) return BattleAnimationState.TAKING_DAMAGE;
    return undefined;
  }, [dmg]);

  return (
    <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
      <Battle3dAnimations />
      <BattleContatiner ref={divRef} state={getAnimation()}>
        <StatsBar full={win}>
          {win ? (
            <Victory />
          ) : (
            <>
              <Box display="flex" borderRadius="1rem" padding="0.5rem">
                <ActionsBar total={actions} remaining={moves} />
                <Box>
                  <HealthBar guard={guard} {...health} />
                </Box>
              </Box>
              {encoutered && !isMobile && (
                <Box
                  display="flex"
                  flexGrow={1}
                  justifyContent="flex-end"
                  paddingRight="0.5rem"
                >
                  <EndTurnButton />
                </Box>
              )}
            </>
          )}
        </StatsBar>
        {!win && (
          <>
            <BattleText />
            <BattleEnemies />
            <BattleCards />
            <BattleDeck />
            {encoutered && isMobile && (
              <EndTurnMobile>
                <EndTurnButton />
              </EndTurnMobile>
            )}
          </>
        )}
      </BattleContatiner>
    </DndProvider>
  );
};

export const BattleWrapper: React.FC = () => {
  const [{ active }] = useRecoilState(inBattleState);

  return <Container show={active ? 1 : 0}>{active && <Battle />}</Container>;
};

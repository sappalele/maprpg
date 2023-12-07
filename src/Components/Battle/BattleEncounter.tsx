import React, { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Box } from '..';
import { Card, CardModel, CardType } from '../Card';
import { dmgState, healthState } from '../Character/characterState';
import { Damage, Enemy, EnemyAnimationState } from '../Enemy';
import { MoveType } from '../Move';
import {
  attackAllDmgState,
  battleTextState,
  blockEndTurnState,
  encounteredState,
  EnemyBattleState,
  glslAnimationsState,
  guardState,
  handState,
  movesState,
  selectedCardState,
  turnState,
} from './battleState';

const Wrapper = styled.div<{ selected: boolean; showHover: boolean }>`
  transition: all 1s;
  margin: auto;

  ${({ showHover }) =>
    showHover &&
    `
    &:hover {
        filter: drop-shadow(0px 0px 8px #FF0000);
    }
  `};
  ${({ selected }) =>
    selected &&
    `
    filter: drop-shadow(0px 0px 8px #FF0000);
  `}
`;

export const BattleEncounter: React.FC<{
  enemy: EnemyBattleState;
  index: number;
}> = ({ enemy, index }) => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const [encoutered, setEncountered] = useRecoilState(encounteredState);
  const [hand, setHand] = useRecoilState(handState);
  const [moves, setMoves] = useRecoilState(movesState);
  const [turn, setTurn] = useRecoilState(turnState);
  const [health, setHealth] = useRecoilState(healthState);
  const [guard, setGuard] = useRecoilState(guardState);
  const [, setCharDmg] = useRecoilState(dmgState);
  const [, setText] = useRecoilState(battleTextState);
  const [attackAllDmg, setAttackAllDmg] = useRecoilState(attackAllDmgState);
  const [, setBlockEndTurn] = useRecoilState(blockEndTurnState);
  const setGlslAnimationState = useSetRecoilState(glslAnimationsState);

  const [dmg, setShowDmg] = useState<number | undefined>();
  const [dead, setDead] = useState(false);
  const [move, setMove] = useState<MoveType | undefined>();
  const [usedCard, setUsedCard] = useState<CardModel | undefined>();

  useEffect(() => {
    if (attackAllDmg !== undefined && !enemy.justTookAoeDmg) {
      const dmgRes = (enemy.remainingHp || enemy.hp) - attackAllDmg;
      const dead = dmgRes <= 0;

      setShowDmg(attackAllDmg);
      setDead(dead);

      setEncountered((es) => {
        const newEncountered = [
          ...((es || []).filter((e) => e.id !== enemy.id) || []),
          { ...enemy, remainingHp: dmgRes, justTookAoeDmg: true },
        ];

        return newEncountered;
      });
    }
  }, [attackAllDmg, enemy, setAttackAllDmg, setEncountered]);

  const onDragEnd = useCallback(
    (cardId: string) => {
      const card = hand.find((c) => c.id === cardId);

      if (!card) return; // error no card or enemy
      if (card.card.cost > moves) return; // error not enough moves left

      // block end turn for move duration
      setBlockEndTurn(true);
      setTimeout(() => {
        setBlockEndTurn(false);
      }, card.card.blockDuration || 1000);

      // damage
      if (card.card.atk && card.card.type === CardType.ATTACK) {
        // reduce moves
        setMoves(moves - card.card.cost);

        const dmgRes = (enemy.remainingHp || enemy.hp) - card.card.atk;
        const dead = dmgRes <= 0;

        setShowDmg(card.card.atk);
        setDead(dead);

        setEncountered((en) => [
          ...((en || []).filter((e) => e.id !== enemy.id) || []),
          { ...enemy, remainingHp: dmgRes },
        ]);
        setUsedCard(card.card);
        setSelectedCard(undefined);
        setHand(hand.filter((c) => c.id !== cardId));
      }
    },
    [
      enemy,
      hand,
      moves,
      setBlockEndTurn,
      setEncountered,
      setHand,
      setMoves,
      setSelectedCard,
      setUsedCard,
    ]
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item: any) => {
        if (item && (item.card as CardModel).type === CardType.ATTACK) {
          onDragEnd(item.id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          ((monitor.getItem() as any).card as CardModel).type ===
            CardType.ATTACK,
      }),
    }),
    [encoutered]
  );

  useEffect(() => {
    if (move !== undefined) {
      setText({
        text: `${enemy.name} used move ${move.name}`,
        duration: move.duration,
      });

      const guardDmg = guard - move.dmg;
      let healthDmg = 0;

      if (guardDmg < 0) {
        healthDmg = Math.abs(guardDmg);
      }

      if (move.glslAnimation) setGlslAnimationState(move.glslAnimation);

      setTimeout(() => {
        guardDmg < 0 ? setGuard(0) : setGuard(guardDmg);
        setHealth({ ...health, remaining: health.remaining - healthDmg });
        setCharDmg(move.dmg);
        setMove(undefined);
        setTurn(turn.filter((t) => t !== enemy.id));
        setEncountered((e) => [
          ...(e || []).filter((e) => e.id !== enemy.id),
          { ...enemy, nextMove: undefined },
        ]);
      }, move.duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move]);

  useEffect(() => {
    if (dmg !== undefined)
      setTimeout(() => {
        if (!dead) setShowDmg(undefined);
      }, 2000);
  }, [dead, dmg]);

  useEffect(() => {
    if (dead)
      setTimeout(() => {
        setEncountered((en) => (en || []).filter((e) => e.id !== enemy.id));
      }, 1000);
  }, [dead, enemy.id, setEncountered]);

  // enemy attack
  useEffect(() => {
    if (turn.length && turn[0] === enemy.id) {
      setMove(enemy.nextMove);
    }
  }, [turn, enemy]);

  useEffect(() => {
    if (usedCard) {
      setTimeout(() => setUsedCard(undefined), 1000);
    }
  }, [usedCard]);

  const getAnimation = useCallback(() => {
    if (dmg !== undefined && !dead) return EnemyAnimationState.TAKING_DAMAGE;
    if (dead) return EnemyAnimationState.DEAD;
    if (move) return EnemyAnimationState.ATTACKING;
    return undefined;
  }, [dead, dmg, move]);

  return (
    <Box
      position="absolute"
      transition="all 1s"
      width={`${100 / (encoutered || []).length}%`}
      left={`${(100 * index) / (encoutered || []).length}%`}
    >
      {usedCard && (
        <Box
          zIndex={999}
          position="absolute"
          top={-100}
          left={0}
          right={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card card={usedCard} used />
        </Box>
      )}
      {dmg && (
        <Box zIndex={1000} position="absolute" bottom={32} left={0} right={0}>
          <Damage amount={dmg} />
        </Box>
      )}
      <Wrapper
        showHover={selectedCard?.card.type === CardType.ATTACK}
        selected={isOver && canDrop}
        ref={drop}
        className="enemy"
      >
        <Enemy
          onClick={selectedCard ? () => onDragEnd(selectedCard.id) : undefined}
          enemy={enemy}
          animation={getAnimation()}
        />
      </Wrapper>
    </Box>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Box, Card, CardModel, CardType } from '..';
import { BattleEncounter } from './BattleEncounter';
import {
  attackAllDmgState,
  babylonAnimationsState,
  blockEndTurnState,
  encounteredState,
  glslAnimationsState,
  guardState,
  handState,
  movesState,
  selectedCardState,
} from './battleState';

export const Enemies = styled.div<{ selected: boolean; showHover: boolean }>`
  z-index: 420;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;

  & > div {
    display: flex;
  }

  ${({ showHover }) =>
    showHover &&
    `
    &:hover {
        .enemy {
            filter: drop-shadow(0px 0px 8px #FF0000);
        }
    }
  `};
  ${({ selected }) =>
    selected &&
    `
    .enemy {
        filter: drop-shadow(0px 0px 8px #FF0000);
    }
  `}
`;

export const BattleEnemies = () => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const [encoutered, setEncountered] = useRecoilState(encounteredState);
  const [hand, setHand] = useRecoilState(handState);
  const [moves, setMoves] = useRecoilState(movesState);
  const [, setGuard] = useRecoilState(guardState);
  const setAttackAllDmg = useSetRecoilState(attackAllDmgState);
  const setBabylonAnimationsState = useSetRecoilState(babylonAnimationsState);
  const setGlslAnimationState = useSetRecoilState(glslAnimationsState);
  const [, setBlockEndTurn] = useRecoilState(blockEndTurnState);
  const [usedCard, setUsedCard] = useState<CardModel | undefined>();

  useEffect(() => {
    if (encoutered && encoutered.every((e) => e.justTookAoeDmg)) {
      setAttackAllDmg(undefined);
      setTimeout(
        () =>
          setEncountered(
            encoutered
              .filter((e) => e.remainingHp && e.remainingHp > 0)
              .map((e) => ({ ...e, justTookAoeDmg: false }))
          ),
        500
      );
    }
  }, [encoutered, setAttackAllDmg, setEncountered]);

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

      // guard
      if (card.card.def && card.card.type === CardType.DEFENCE) {
        // reduce moves
        setMoves(moves - card.card.cost);

        setGuard((g) => g + card.card.def!);

        setUsedCard(card.card);
        setSelectedCard(undefined);
        setHand(hand.filter((c) => c.id !== cardId));
      }

      // damage
      if (card.card.atk && card.card.type === CardType.ATTACK_ALL) {
        // reduce moves
        setMoves(moves - card.card.cost);

        if (card.card.babylonAnimation) {
          setBabylonAnimationsState((a) => [...a, card.card.babylonAnimation!]);
          setTimeout(() => {
            setAttackAllDmg(card.card.atk);
            setBabylonAnimationsState((a) =>
              a.filter((o) => o.id !== card.card.babylonAnimation?.id)
            );
          }, card.card.babylonAnimation.duration);
        } else if (card.card.glslAnimation) {
          setGlslAnimationState(card.card.glslAnimation);
          setTimeout(() => {
            setAttackAllDmg(card.card.atk);
          }, card.card.glslAnimation.duration);
        } else {
          setAttackAllDmg(card.card.atk);
        }

        setUsedCard(card.card);
        setSelectedCard(undefined);
        setHand(hand.filter((c) => c.id !== cardId));
      }
    },
    [
      hand,
      moves,
      setAttackAllDmg,
      setBabylonAnimationsState,
      setBlockEndTurn,
      setGlslAnimationState,
      setGuard,
      setHand,
      setMoves,
      setSelectedCard,
    ]
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item: any) => {
        if (item && (item.card as CardModel).type === CardType.ATTACK_ALL) {
          onDragEnd(item.id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          ((monitor.getItem() as any).card as CardModel).type ===
            CardType.ATTACK_ALL,
      }),
    }),
    [encoutered]
  );

  useEffect(() => {
    if (usedCard) {
      setTimeout(() => setUsedCard(undefined), 1000);
    }
  }, [usedCard]);

  return (
    <Enemies
      showHover={selectedCard?.card.type === CardType.ATTACK_ALL}
      selected={isOver && canDrop}
      ref={drop}
      onClick={selectedCard ? () => onDragEnd(selectedCard.id) : undefined}
    >
      {usedCard && (
        <Box
          zIndex={999}
          position="absolute"
          bottom={0}
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
      {[...(encoutered || [])]
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((item, i) => (
          <BattleEncounter index={i} key={item.id} enemy={item} />
        ))}
    </Enemies>
  );
};

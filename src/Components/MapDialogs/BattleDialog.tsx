import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, destinationState, inBattleState } from '..';
import { sword } from '../../Resources';
import { Box } from '../Box';
import { DialogEnemy } from '../Enemy';

const ButtonImage = styled.img`
  height: 32px;
  width: auto;
  margin-right: 0.5rem;
`;

export const BattleDialog: React.FC = () => {
  const [battle, setInBattle] = useRecoilState(inBattleState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const attacking = destination?.attacking && !destination.confirmed;
  const middleIndex = Math.floor((battle.enemyGroup?.enemies.length || 1) / 2);

  const enemies = useCallback(() => {
    let looper = 0;
    return battle.enemyGroup?.enemies.map((e, i) => {
      if (i < middleIndex) looper++;
      else if (i > middleIndex) looper--;

      return (
        <Box zIndex={looper} key={e.name + i}>
          <DialogEnemy middle={middleIndex === i} enemy={e} />
        </Box>
      );
    });
  }, [battle, middleIndex]);

  const onClick = () => {
    setDestination({ ...(destination as any), confirmed: true });
    setTimeout(() => setInBattle((b) => ({ ...b, active: true })), 500);
  };

  return !attacking ? null : (
    <>
      <Box display="flex">{battle.enemyGroup?.name}</Box>
      {battle.enemyGroup && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          {enemies()}
        </Box>
      )}
      <Box width="100%" marginTop="0.5rem">
        <Button
          bgColor="#b1676c"
          color="#FFF"
          disabled={destination?.blocked}
          onClick={onClick}
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingX="1rem"
          >
            <ButtonImage alt="attack" src={sword.default} />
            <Box marginLeft="0.5rem">ATTACK</Box>
          </Box>
        </Button>
      </Box>
    </>
  );
};

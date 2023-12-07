import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, destinationState } from '..';
import { Box } from '../Box';
import {
  goldState,
  healthState,
  staminaState,
} from '../Character/characterState';
import { Gold } from '../Gold';

const InnImage = styled.img`
  height: 128px;
  width: auto;
`;

const BodyText = styled.div`
  font-family: 'Abaddon';
  font-size: 1.25rem;
  margin-top: 1rem;
`;

const INITIAL_COST = 500;

export const InnDialog: React.FC = () => {
  const [destination, setDestination] = useRecoilState(destinationState);
  const [gold, setGold] = useRecoilState(goldState);
  const [, setHealth] = useRecoilState(healthState);
  const [, setStamina] = useRecoilState(staminaState);
  const [cost] = useState(INITIAL_COST);
  const enoughGold = gold >= cost;
  const activeInn =
    destination?.shop && !destination.confirmed ? destination.shop : undefined;

  const onClick = () => {
    if (!enoughGold) return;
    setDestination({
      ...(destination as any),
      shop: undefined,
      confirmed: true,
    });

    setTimeout(() => {
      setGold((g) => g - INITIAL_COST);
      setHealth((h) => ({ remaining: h.total, total: h.total }));
      setStamina((s) => ({ remaining: -1, total: s.total }));
    }, 500);
  };

  return !activeInn ? null : (
    <>
      <Box display="flex">{destination?.shop?.name}</Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        flexDirection="column"
      >
        <InnImage
          src={
            require(`../../Resources/shops/${activeInn?.sprite.src}`).default
          }
          alt="inn-icon"
        />
        <BodyText>Recover all your health by spending the night.</BodyText>
      </Box>
      <Box width="100%" marginTop="0.5rem">
        <Button
          bgColor="#5CAF8C"
          color="#FFF"
          disabled={!enoughGold}
          onClick={onClick}
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Gold color="#FFF" amount={cost} />
          </Box>
        </Button>
      </Box>
    </>
  );
};

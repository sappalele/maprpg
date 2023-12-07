import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, dayState } from '..';
import { Box } from '../Box';

const BodyText = styled.div`
  font-family: 'Abaddon';
  font-size: 1.25rem;
  margin-top: 1rem;
`;

export const NewDayDialog: React.FC = () => {
  const [{ day, newDay }, setDay] = useRecoilState(dayState);

  const onClick = () => {
    setDay((d) => ({ ...d, newDay: false }));
  };

  return !newDay ? null : (
    <>
      <Box display="flex">A new day dawns</Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        flexDirection="column"
      >
        <BodyText>All enemies regroup and grow stronger!</BodyText>
        <BodyText>
          <Box fontSize="2rem" fontFamily="futile">
            {10 - day}
          </Box>
          <Box marginLeft="0.5rem">days remain..</Box>
        </BodyText>
      </Box>
      <Box width="100%" marginTop="0.5rem">
        <Button bgColor="#5CAF8C" color="#FFF" onClick={onClick}>
          Continue
        </Button>
      </Box>
    </>
  );
};

import React from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Box } from '..';
import { Button } from '../Buttons';
import { deathState } from '../Character/characterState';
import { Dialog } from '../Dialog';
import { useRecoilPersist } from '../hooks';
import { URLS } from '../Routes';

const Wrapper = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 451;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-125%)')};
  transition: all 1s;
`;

const TombstoneImage = styled.img`
  width: 125px;
  height: auto;
`;

export const DeathScreen: React.FC = () => {
  const isDead = useRecoilValue(deathState);
  const history = useHistory();
  const { reset } = useRecoilPersist();

  return (
    <Wrapper show={isDead}>
      <Dialog maxHeight="340px" maxWidth="300px" onClickAway={() => {}}>
        <Box marginBottom="1rem">Game Over</Box>
        <Box marginBottom="1rem">
          <TombstoneImage
            src={require('../../Resources/tombstone.png').default}
            alt="tombstone"
          />
        </Box>
        <Button
          color="#FFF"
          bgColor="#8b9bb4"
          onClick={() => {
            reset();
            history.push(URLS.START);
          }}
        >
          Back to start
        </Button>
      </Dialog>
    </Wrapper>
  );
};

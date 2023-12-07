import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Buttons';
import { useRecoilPersist } from '../hooks';
import { URLS } from '../Routes';
import { WavyText } from '../WavyText';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: -webkit-fill-available;
  height: 100vh;
  background: radial-gradient(#3c5777 0%, #090a0f 100%);
`;

const Header = styled.h1`
  font-family: 'Futile';
  display: flex;
  color: #fff;
  letter-spacing: 2px;
  font-weight: normal;
  font-size: 3rem;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

export const StartScreen: React.FC = () => {
  const history = useHistory();
  const { activeGame, reset } = useRecoilPersist();

  return (
    <Wrapper>
      <Logo src={require('../../Resources/logo.png').default} alt="logo" />
      <Header>
        <WavyText text="MAP" />
        <Box marginLeft="0.5rem">
          <WavyText text="RPG" />
        </Box>
      </Header>

      <Box marginBottom="1rem" width="300px">
        <Button
          bgColor="#3e8948"
          color="#FFF"
          onClick={() => {
            reset();
            history.push(URLS.MAP);
          }}
        >
          New Game
        </Button>
      </Box>
      <Box marginBottom="1rem" width="300px">
        <Button
          disabled={!activeGame}
          bgColor="#feae34"
          color="#FFF"
          onClick={() => {
            history.push(URLS.MAP);
          }}
        >
          Continue
        </Button>
      </Box>
    </Wrapper>
  );
};

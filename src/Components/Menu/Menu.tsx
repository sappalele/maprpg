import React from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Box, inBattleState } from '..';
import { Button, CloseButton } from '../Buttons';
import { Dialog } from '../Dialog';
import { bossesState, showMenuDialogState } from '../MapGenerator';
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
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-125%)')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: all 1s;
`;

const MenuButton = styled.button<{ show: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 51px;
  width: 51px;
  transition: all 1s;
  opacity: ${({ show }) => (show ? '1' : '0')};
  z-index: 450;

  img {
    width: 50px;
    height: auto;
  }
`;

const Boss = styled.div<{ defeated: boolean }>`
  margin: 0 0.25rem;
  ${({ defeated }) => defeated && 'filter: grayscale(1);'}

  img {
    width: 75px;
    height: auto;
  }
`;

export const Menu: React.FC = () => {
  const inBattle = useRecoilValue(inBattleState);
  const bosses = useRecoilValue(bossesState);
  const [show, setShow] = useRecoilState(showMenuDialogState);

  const history = useHistory();
  const closeMenu = () => setShow(false);

  return (
    <>
      <MenuButton onClick={() => setShow(true)} show={!inBattle.active}>
        <img src={require('../../Resources/menu.png').default} alt="menu" />
      </MenuButton>
      <Wrapper show={show}>
        <Dialog maxHeight="300px" maxWidth="300px" onClickAway={closeMenu}>
          <CloseButton onClick={closeMenu} />
          <Box marginBottom="1rem">Bosses</Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom="2rem"
          >
            {bosses?.map((b, i) => (
              <Boss key={`boss_${i}`} defeated={!!b.defeated}>
                <img
                  alt="enemy-on-map"
                  src={
                    require(`../../Resources/enemies/${b.enemy.sprite.src}`)
                      .default
                  }
                />
              </Boss>
            ))}
          </Box>
          <Button
            color="#FFF"
            bgColor="#8b9bb4"
            onClick={() => {
              setShow(false);
              history.push(URLS.START);
            }}
          >
            Back to start
          </Button>
        </Dialog>
      </Wrapper>
    </>
  );
};

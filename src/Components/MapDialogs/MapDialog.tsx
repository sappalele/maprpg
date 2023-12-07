import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CloseButton, destinationState } from '..';
import { dayState } from '../Character';
import { Dialog } from '../Dialog';
import { BattleDialog } from './BattleDialog';
import { InnDialog } from './InnDialog';
import { mapDialogState } from './mapDialogState';
import { NewDayDialog } from './NewDayDialog';

const Container = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: 450;
  height: 100%;
  width: 100%;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(125%)')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: all 1s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MapDialog: React.FC = () => {
  const [, setDestination] = useRecoilState(destinationState);
  const [, setDay] = useRecoilState(dayState);
  const { active } = useRecoilValue(mapDialogState);

  const onClickAway = () => {
    if (active) {
      setDestination(null);
      setDay((d) => ({ ...d, newDay: false }));
    }
  };

  return (
    <Container show={!!active}>
      <Dialog maxHeight="420px" maxWidth="300px" onClickAway={onClickAway}>
        <CloseButton onClick={onClickAway} />
        <InnDialog />
        <BattleDialog />
        <NewDayDialog />
      </Dialog>
    </Container>
  );
};

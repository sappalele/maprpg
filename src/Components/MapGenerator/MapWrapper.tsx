import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { deckDialogState } from '../Card';
import { healthState } from '../Character/characterState';
import { mapDialogState } from '../MapDialogs/mapDialogState';
import { showMenuDialogState, showMiniMapDialog } from './mapState';

const Wrapper = styled.div<{ filter: string }>`
  filter: ${({ filter }) => filter};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 1s;
`;

export const MapWrapper: React.FC = ({ children }) => {
  const health = useRecoilValue(healthState);
  const mapDialog = useRecoilValue(mapDialogState);
  const miniMapDialog = useRecoilValue(showMiniMapDialog);
  const deck = useRecoilValue(deckDialogState);
  const menu = useRecoilValue(showMenuDialogState);

  const filter = useCallback(() => {
    if (health.remaining < 1) return 'grayscale(1) blur(5px)';
    if (mapDialog.active || miniMapDialog || deck || menu)
      return 'brightness(0.5)';
    return 'none';
  }, [deck, health.remaining, mapDialog.active, menu, miniMapDialog]);

  return <Wrapper filter={filter()}>{children}</Wrapper>;
};

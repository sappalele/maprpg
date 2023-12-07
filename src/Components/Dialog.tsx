import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { Button } from './Buttons';

const Wrapper = styled.div<{
  maxWidth: string;
  maxHeight: string;
}>`
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => `calc(${maxHeight} - 2rem)`};
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.87);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  > div {
    max-width: ${({ maxWidth }) => maxWidth};
    max-height: ${({ maxHeight }) => maxHeight};
    overflow: auto;
  }
`;

const ButtonCointainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  left: 1.5rem;
`;

const Content = styled.div`
  font-family: 'futile';
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dialog: React.FC<{
  maxWidth: string;
  maxHeight: string;
  onClickAway?: () => any;
  onClose?: () => any;
}> = ({ maxHeight, maxWidth, onClickAway, onClose, children }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useClickAway(divRef, () => {
    if (onClickAway) {
      onClickAway();
    }
  });

  return (
    <Wrapper ref={divRef} maxHeight={maxHeight} maxWidth={maxWidth}>
      <Content>{children}</Content>
      {onClose && (
        <ButtonCointainer>
          <Button bgColor="#5CAF8C" color="#FFF" onClick={onClose}>
            Close
          </Button>
        </ButtonCointainer>
      )}
    </Wrapper>
  );
};

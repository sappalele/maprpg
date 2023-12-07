import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { introductionState } from '.';
import { IntroductionStateType } from './MapGenerator';
import { WavyText } from './WavyText';

const Wrapper = styled.div<{ black: boolean }>`
  z-index: 450;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  font-family: 'futile';
  transition: all 1s;
  background-color: ${({ black }) => (black ? '#000' : 'transparent')};
`;

const Heading = styled.div<{ black: boolean }>`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  transition: all 1s;
  color: ${({ black }) => (black ? 'transparent' : '#FFF')};

  @media (max-width: 599.98px) {
    font-size: 2rem;
  }
`;

export const IntroOverlay: React.FC = () => {
  const introState = useRecoilValue(introductionState);
  const hide =
    introState === IntroductionStateType.GENERATING ||
    introState === IntroductionStateType.BOSS_INTRO_END;
  const bosses =
    introState === IntroductionStateType.BOSS_INTRO ||
    introState === IntroductionStateType.BOSS_INTRO_END;
  const hero =
    introState === IntroductionStateType.HERO_INTRO ||
    introState === IntroductionStateType.HERO_INTRO_END;

  return (
    <Wrapper black={hide}>
      <Heading black={hide}>
        {bosses && <WavyText text="Evil awakens.."></WavyText>}
        {hero && <WavyText text="The hero awakens!"></WavyText>}
      </Heading>
    </Wrapper>
  );
};

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { setTimeout } from 'timers';
import { Box, timeOfDayState } from '..';
import { fadeOutKeyframes } from '../Animations';
import { TIME_OF_DAY } from '../Character';

const Wrapper = styled.div<{ bg?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  transition: all 1.1s ease-in-out;
  background: ${({ bg }) =>
    `radial-gradient(circle at center center,${bg})` ||
    'radial-gradient(#3c5777 0%, #090a0f 100%)'}; ;
`;

const Overlay = styled(Box)<{ bg?: string }>`
  height: 100%;
  width: 100%;
  background: ${({ bg }) =>
    `radial-gradient(circle at center center,${bg})` ||
    'radial-gradient(#3c5777 0%, #090a0f 100%)'};
  animation: ${fadeOutKeyframes} 3s;
`;

const daylightColor: { [keyof: number]: string } = {
  0: 'radial-gradient(#020111 0%,#181425 100%)',
  1: 'brightness(1.5) hue-rotate(-25deg)',
  2: 'invert(1)',
  3: '#f77622',
  4: '#f77622',
};

const daylightFilter: { [keyof: number]: string } = {
  0: 'radial-gradient(#020111 0%,#181425 100%)',
  1: 'brightness(1.5) hue-rotate(-25deg)',
  2: 'invert(1)',
  3: 'brightness(1.5)',
  4: 'none',
};

export const DynamicBackground: React.FC = () => {
  const timeOfDay = useRecoilValue(timeOfDayState);
  const [bg, setBg] = useState(TIME_OF_DAY.NIGHT.gradient);
  const [prevBg, setPrevBg] = useState<string | undefined>();

  useEffect(() => {
    const bgLookup = timeOfDay.gradient;

    if (bg !== bgLookup) {
      setPrevBg(bg);
      setBg(bgLookup);
      setTimeout(() => setPrevBg(undefined), 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOfDay]);

  return <Wrapper bg={bg}>{prevBg && <Overlay bg={prevBg} />}</Wrapper>;
};

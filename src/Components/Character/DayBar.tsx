import React, { useEffect } from 'react';
import { useKey } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Box from 'ui-box';
import { destinationState } from '..';
import { dayState, staminaState, timeOfDayState } from './characterState';

const StaminaContainer = styled.div<{ bgGradient: string }>`
  position: relative;
  background-color: #80808099;
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  display: flex;
  background-image: ${({ bgGradient }) =>
    `linear-gradient(135deg,${bgGradient})`};
  background-repeat: no-repeat;
  border-radius: 0.5rem;
  flex-direction: column;
  width: 5rem;
  overflow: hidden;
`;

const Remaining = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  border-radius: 0.5rem;
  opacity: 0.15;
`;

const Spent = styled.div<{ widthPercent: number }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${({ widthPercent }) => widthPercent + '%'};
  background-color: #000;
  transition: all 1s;
  opacity: 0.5;
`;

export const DayBar: React.FC = () => {
  const [{ total, remaining }, setStamina] = useRecoilState(staminaState);
  const timeOfDay = useRecoilValue(timeOfDayState);
  const [day, setDay] = useRecoilState(dayState);
  const destination = useRecoilValue(destinationState);

  useEffect(() => {
    if (destination && destination.confirmed)
      setStamina((curr) => ({
        ...curr,
        remaining: curr.remaining - destination.path.length,
      }));
  }, [destination, setStamina]);

  useEffect(() => {
    if (remaining < 0) {
      setDay((d) => ({ newDay: true, day: d.day + 1 }));
      setStamina({ total, remaining: total + remaining });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  useKey('ArrowUp', () =>
    setStamina((s) => ({ ...s, remaining: s.remaining + 1 }))
  );
  useKey('ArrowDown', () =>
    setStamina((s) => ({ ...s, remaining: s.remaining - 1 }))
  );

  return (
    <StaminaContainer bgGradient={timeOfDay.gradient}>
      <Remaining />
      <Spent widthPercent={((total - remaining) / total) * 100} />
      <Box zIndex={1} textAlign="center">
        <Box fontSize="1rem">{`Day ${day.day}`}</Box>
        <Box>
          {timeOfDay.name}
          {/* <Remaining flash={distance ? 1 : 0}>
          {distance ? remaining - distance : remaining}
        </Remaining>
        /<Total>{total}</Total> */}
        </Box>
      </Box>
    </StaminaContainer>
  );
};

import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { battleTextState } from '..';
import { fadeInDownKeyframes, fadeOutDownKeyframes } from '../Animations';

const TextWrapper = styled.div<{ noOfTexts: number }>`
  z-index: 500;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25rem;
  bottom: 0;
  height: 40vh;
  transition: all 1s;
  pointer-events: none;

  opacity: ${({ noOfTexts }) => (noOfTexts > 0 ? '1' : '0')};
`;

const TextContainer = styled.div<{ index: number }>`
  padding: 1rem;
  background-color: #ffffff;
  animation: ${fadeInDownKeyframes} 0.5s, ${fadeOutDownKeyframes} 1s ease-out 2s;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
`;

export const BattleText: React.FC = () => {
  const [text, setRecoilText] = useRecoilState(battleTextState);
  const [texts, setTexts] = useState<{ text: string; id: string }[]>([]);
  const [removedTexts, setRemovedTexts] = useState<string[]>([]);

  const removeText = (id: string) => {
    setRemovedTexts((curr) => [...curr, id]);
  };

  useEffect(() => {
    if (text) {
      const id = uniqueId('text');
      const newTexts = [{ text: text.text, id }, ...texts];

      setTexts(newTexts);
      setTimeout(() => {
        removeText(id);
      }, 3000);
    }

    return () => {
      setRecoilText(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <TextWrapper
      noOfTexts={texts.filter((t) => !removedTexts.includes(t.id)).length}
    >
      {texts
        .filter((t) => !removedTexts.includes(t.id))
        .map((t, i) => (
          <TextContainer index={i} key={t.id}>
            {t.text}
          </TextContainer>
        ))}
    </TextWrapper>
  );
};

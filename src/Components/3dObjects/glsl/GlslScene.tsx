import GlslCanvas from 'glslCanvas';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { glslAnimationsState } from '../..';

const GlslLayer = styled.canvas<{ opacity: number }>`
  position: fixed !important;
  z-index: 419;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all 0.5s;
  opacity: ${({ opacity }) => opacity};
`;

export const GlslScene: React.FC = () => {
  const { height, width } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sandBoxRef = useRef<any>(null);
  const [animation, setAnimation] = useRecoilState(glslAnimationsState);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = canvasRef.current;

    if (!node) return;

    sandBoxRef.current = new GlslCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (animation)
      sandBoxRef.current.load(
        require(`./shaders/${animation?.fragment}.glsl`).default
      );
    sandBoxRef.current.play();
    setShow(true);
    if (animation?.duration)
      setTimeout(() => {
        setShow(false);
        setAnimation(undefined);
        setTimeout(() => sandBoxRef.current.pause(), animation.duration! + 500);
      }, animation.duration - 500);

    return () => {
      setAnimation(undefined);
      setShow(false);
      sandBoxRef.current.pause();
    };
  }, [animation, setAnimation]);

  return (
    <GlslLayer
      ref={canvasRef}
      opacity={show ? 1 : 0}
      height={height}
      width={width}
    ></GlslLayer>
  );
};

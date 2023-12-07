import {
  bounce,
  bounceInUp,
  fadeIn,
  fadeInDown,
  fadeInUp,
  fadeOut,
  fadeOutDown,
  fadeOutUp,
  flipInY,
  pulse,
  rotateInUpLeft,
  shake,
  slideInDown,
  slideInUp,
  swing,
  zoomIn,
  zoomOut,
} from 'react-animations';
import styled, { keyframes } from 'styled-components';

export const FadeGrow = styled.div<{ state?: string }>`
  transition: 0.25s;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
  transform: ${({ state }) => (state === 'entered' ? 'scale(1)' : 'scale(0)')};
`;

export const Fade = styled.div<{ state?: string }>`
  transition: 0.25s;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
`;

export const Width = styled.div<{ state?: string; width: string }>`
  transition: 0.25s;
  width: ${({ state, width }) => (state === 'entered' ? width : '0px')};
`;

export const flowKeyframes = keyframes`
    0%{background-position:0% 50%;}
    50%{background-position:100% 50%;}
    100%{background-position:0% 50%;}
`;

export const flashKeyframes = keyframes`
    0% {
      opacity: 1;
      transform: scale(1);
    }

    50% {
      opacity: 0.5;
      transform: scale(0.9);
    }

    100%{
      opacity: 1;
      transform: scale(1);
    }
`;

export const swayKeyFrames = keyframes`
    0%, 100%{ 
      transform: rotate(-1deg);
    }
    50%{ 
      transform: rotate(2deg); 
    }
`;

export const gradientKeyFrames = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}

`;

export const floatKeyFrames = keyframes`
   0% {
		transform: translatey(0px);
	}
  50% {
		transform: translatey(-3px);
	}
	100% {
		transform: translatey(0px);
	}
`;

export const slideKeyFrames = keyframes`
   0% {
      transform: translate3d(0,0,0);
    }

    50% {
      transform: translate3d(100%,100%,100%);
    }

    100% {
      transform: translate3d(0,0,0);
    }
`;

export const bounceInKeyframes = keyframes`${bounceInUp}`;
export const shakeKeyframes = keyframes`${shake}`;
export const zoomOutKeyframes = keyframes`${zoomOut}`;
export const zoomInKeyframes = keyframes`${zoomIn}`;
export const swingKeyframes = keyframes`${swing}`;
export const pulseKeyframes = keyframes`${pulse}`;
export const slideInDownKeyframes = keyframes`${slideInDown}`;
export const slideInUpKeyframes = keyframes`${slideInUp}`;
export const fadeInDownKeyframes = keyframes`${fadeInDown}`;
export const fadeInUpKeyframes = keyframes`${fadeInUp}`;
export const fadeInKeyframes = keyframes`${fadeIn}`;
export const fadeOutUpKeyframes = keyframes`${fadeOutUp}`;
export const fadeOutDownKeyframes = keyframes`${fadeOutDown}`;
export const fadeOutKeyframes = keyframes`${fadeOut}`;
export const bounceKeyframes = keyframes`${bounce}`;
export const flipInYKeyframes = keyframes`${flipInY}`;
export const rotateInUpLeftKeyframes = keyframes`${rotateInUpLeft}`;

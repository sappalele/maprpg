import styled from 'styled-components';

export const Button = styled.button<{
  color?: string;
  bgColor?: string;
  opacity?: number;
}>`
  max-width: 300px;
  width: 100%;
  font-family: 'futile';
  font-size: 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: ${({ color }) => color || '#000'};
  opacity: ${({ opacity }) => (opacity === undefined ? 1 : opacity)};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border: 0.25rem solid ${({ bgColor }) => bgColor + '80' || '#00000080'};
  background-clip: padding-box;
  transition: all 1s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:disabled {
    filter: grayscale(100%);
    pointer-events: none;

    &::hover {
      opacity: 1;
    }
  }
`;

const CloseButtonStyled = styled.button`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  border-radius: 50%;
  background-color: #fff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
  font-family: 'futile';
  z-index: 2;

  img {
    width: 1rem;
    height: auto;
  }
`;

export const CloseButton: React.FC<{ onClick: () => any }> = ({ onClick }) => (
  <CloseButtonStyled onClick={onClick}>
    <img src={require('../Resources/x.png').default} alt="close" />
  </CloseButtonStyled>
);

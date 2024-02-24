import styled, { keyframes } from 'styled-components';
import { type ReactNode } from 'react';
import Icon from '../Icon/Icon.tsx';

type ToasterProps = {
  message: string;
  type: 'DANGER' | 'SUCCESS' | 'ERROR';
};

const ToasterAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -100px);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, 20px);
  }
  90% {
    opacity: 1;
    transform: translate(-50%, 20px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -100px);
  }`;

const ToasterContainer = styled.div<{ $bgColor: string; $color: string }>`
  position: absolute;
  left: 50%;
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  border-radius: 10px;
  gap: 10px;
  padding: 10px;
  z-index: 1000;

  animation: ${ToasterAnimation} 5s ease-in-out forwards;
`;

export const Toaster = (props: ToasterProps): ReactNode => {
  const { message, type } = props;
  const colors = {
    DANGER: { bgColor: '#ff7826', color: '#000000' },
    SUCCESS: { bgColor: '#61ff61', color: '#000000' },
    ERROR: { bgColor: '#ff4a4a', color: '#FFFFFF' }
  };
  const icons = {
    DANGER: 'bi-exclamation-triangle',
    SUCCESS: 'bi-check-circle',
    ERROR: 'bi-exclamation-circle'
  };

  return (
    <ToasterContainer data-testid="Toaster.container" $color={colors[type].color} $bgColor={colors[type].bgColor}>
      <Icon iconName={icons[type]} />
      <div
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          maxWidth: '100%',
          background: 'none',
          color: 'inherit',
          whiteSpace: 'nowrap'
        }}
      >
        {message}
      </div>
    </ToasterContainer>
  );
};

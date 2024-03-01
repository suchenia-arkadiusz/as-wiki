import styled from 'styled-components';
import Button from '../Button/Button.tsx';
import { Left, Right } from '../styles.ts';
import React from 'react';

const PopupOverlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.1);
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  title: string;
  width: number;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
};

type PopupStyle = {
  width: string;
  height?: string;
};

const Popup = (props: Props) => {
  const { title, width, height, onClose, children } = props;

  const popupStyle: PopupStyle = {
    width: `${width}px`,
  };
  if (height && height > 0) {
    popupStyle.height = `${height}px`;
  }

  return (
    <PopupOverlay data-testid="PopupOverlayContainer">
      <PopupContainer data-testid="PopupContainer" style={popupStyle} onClick={(e) => { e.stopPropagation(); }}>
        <PopupHeader>
          <Left>
            <h1>{title.toUpperCase()}</h1>
          </Left>
          <Right data-testid="PopupCloseButtonContainer">
            <Button iconName="bi-x-lg" onClick={onClose} />
          </Right>
        </PopupHeader>
        {children}
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;

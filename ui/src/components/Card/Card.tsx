import { type HTMLProps, type ReactNode } from 'react';
import './Card.css';
import styled from 'styled-components';

type CardProps = HTMLProps<HTMLDivElement> & {
  isCenter?: boolean;
  withShadow?: boolean;
  children?: ReactNode;
};

const CardCenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid #b9b9b9;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 20px;
`;

const CardContainer = styled.div`
  border: 1px solid #b9b9b9;
  border-radius: 20px;
  padding: 20px;
`;

const Card = (props: CardProps) => {
  const { isCenter, children, style } = props;

  return (
    <>
      {isCenter
        ? (
          <CardCenterContainer data-testid="CardContainer.center" style={style}>
            {children}
          </CardCenterContainer>
        )
        : (
          <CardContainer data-testid="CardContainer.normal" style={style}>
            {children}
          </CardContainer>
        )}
    </>
  );
};

export default Card;

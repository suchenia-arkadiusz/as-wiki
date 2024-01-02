import styled from "styled-components";
import Icon from "../Icon/Icon.tsx";

const ButtonContainer = styled.button<{ $color?: string; $hoverColor?: string; $height: number; $padding?: string }>`
  height: ${(props) => props.$height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  color: ${(props) => props.$color};
  cursor: pointer;
  font-weight: normal;
  transition: color 0.2s ease-in-out;
  padding: ${(props) => props.$padding};

  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`;

type IconButtonProps = {
  onClick: () => void;
  iconName?: string;
  height?: number;
  text?: string;
  color?: string;
  hoverColor?: string;
  iconPosition?: "left" | "right";
  className?: string;
  padding?: any;
};

const Button = (props: IconButtonProps) => {
  const { iconName, onClick, text, color, hoverColor, height, iconPosition, className, padding } = props;

  return (
    <ButtonContainer
      data-testid="ButtonContainer"
      onClick={onClick}
      $color={color || "#747474"}
      $hoverColor={hoverColor || "#393939"}
      $height={height || 16}
      $padding={padding || "0"}
      className={className}
    >
      {iconPosition === "right" ? (
        <>
          {text || ""}
          {iconName && iconName.length > 0 ? <Icon iconName={iconName || ""} /> : null}
        </>
      ) : (
        <>
          {iconName && iconName.length > 0 ? <Icon iconName={iconName || ""} /> : null}
          {text || ""}
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;

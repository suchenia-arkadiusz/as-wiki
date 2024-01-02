import styled from "styled-components";

const IconContainer = styled.span<{ $width: number; $height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

type IconProps = {
  iconName: string;
  width?: number;
  height?: number;
};

const Icon = ({ iconName, width, height }: IconProps) => {
  return <IconContainer data-testid="IconContainer" className={`${iconName}`} $width={width || 16} $height={height || 16} />;
};

export default Icon;

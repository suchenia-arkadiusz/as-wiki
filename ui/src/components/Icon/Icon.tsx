import styled from 'styled-components';

const IconContainer = styled.span<{ $width: number; $height: number }>`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  color: inherit;
  font-size: ${(props) => props.$width}px;

  &:hover {
    color: inherit;
  }
`;

type Props = {
  iconName: string;
  width?: number;
  height?: number;
  'data-testid'?: string;
};

const Icon = (props: Props) => {
  const { iconName, width, height } = props;
  return <IconContainer data-testid={props['data-testid'] ? props['data-testid'] : 'Icon.container'} className={`${iconName}`} $width={width || 16} $height={height || 16} />;
};

export default Icon;

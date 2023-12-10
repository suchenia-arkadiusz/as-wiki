import * as icons from "react-bootstrap-icons";
import { useState } from "react";

type IconProps = {
  iconName: keyof typeof icons;
  width?: string;
  height?: string;
  color?: string;
  hoverColor?: string;
};

const Icon = ({ iconName, width, height, color, hoverColor }: IconProps) => {
  const [isHover, setIsHover] = useState(false);
  const BootstrapIcon = icons[iconName];

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const iconStyle = {
    background: "transparent",
    width: width,
    height: height,
    fill: isHover ? hoverColor : color,
    transition: "fill 0.2s ease-in-out",
  };

  return <BootstrapIcon style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
};

Icon.defaultProps = {
  color: "#747474",
  hoverColor: "#393939",
  width: "16px",
  height: "16px",
};

export default Icon;

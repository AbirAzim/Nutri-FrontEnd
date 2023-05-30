import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  font?: string;
  fontName?: IconDefinition;
  size?: string | number;
  variant?: "bold" | "bolder" | "normal" | "lighter";
  style?: any;
  className?: string;
  source?: string;
  color?: string;
  children?: React.ReactNode;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    font,
    size,
    variant,
    style,
    className,
    fontName,
    source,
    children,
    ...others
  } = props;
  if (fontName)
    return (
      <FontAwesomeIcon
        icon={fontName}
        className={className}
        style={{
          width: typeof size === "number" ? `${size}px` : size,
          height: typeof size === "number" ? `${size}px` : size,
          ...style,
        }}
        {...(others as any)}
      />
    );
  if (children) {
    return (
      <img
        src={`/icons/${children}.svg`}
        alt="icon"
        style={{
          width: typeof size === "number" ? `${size}px` : size,
          height: typeof size === "number" ? `${size}px` : size,
          ...style,
        }}
        className={className}
      />
    );
  }
  return (
    <i
      className={`${font}-icon ${className}`}
      style={{
        fontSize: size,
        fontWeight: variant,
        ...style,
      }}
    />
  );
};

Icon.defaultProps = {
  size: "100%",
  variant: "normal",
};

export default Icon;

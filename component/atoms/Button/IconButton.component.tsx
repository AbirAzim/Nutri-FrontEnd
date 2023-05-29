import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import { theme } from "../../../configs/themes";
import Icon from "../Icon/Icon.component";
import styles from "./IconButton.module.scss";

interface IconButtonProps {
  variant?: "hover" | "fade" | "white" | "primary" | "secondary" | "disabled";
  color?: "primary" | "secondary";
  colorCode?: string;
  size?: "small" | "medium" | "large";
  fontName?: IconDefinition;
  font?: string;
  title?: string;
  style?: CSSProperties;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  let {
    variant,
    size,
    style,
    color,
    colorCode,
    font,
    fontName,
    title,
    className,
    onClick,
    active,
    disabled,
    children,
  } = props;

  let variantClass: string;
  switch (variant) {
    case "hover":
      variantClass = [
        styles["btn-icon-hover"],
        styles[`btn-icon-hover--${color}`],
      ].join(" ");
      break;
    case "fade":
      variantClass = styles["btn-icon-fade"];
      break;
    case "white":
      variantClass = styles["btn-icon-white"];
      break;
    case "primary":
      variantClass = styles["btn-icon-primary"];
      break;
    case "secondary":
      variantClass = styles["btn-icon-secondary"];
      break;
    case "disabled":
      variantClass = styles["btn-icon-disabled"];
      break;
    default:
      variantClass = "";
      break;
  }

  let sizeClass: string;
  switch (size) {
    case "small":
      sizeClass = styles["btn-icon-small"];
      break;
    case "medium":
      sizeClass = styles["btn-icon-medium"];
      break;
    default:
      sizeClass = "";
      break;
  }

  return (
    <button
      type="button"
      title={title}
      className={`${variantClass} ${sizeClass} ${className} ${
        active ? styles["btn-icon-active"] : ""
      }`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children ? (
        children
      ) : fontName ? (
        <FontAwesomeIcon
          icon={fontName}
          color={variant !== "hover" && color ? theme.color[color] : colorCode}
        />
      ) : (
        <Icon font={font} />
      )}
    </button>
  );
};

IconButton.defaultProps = {
  className: "",
  variant: "fade",
  size: "medium",
  colorCode: theme.color.dark,
};

export default IconButton;

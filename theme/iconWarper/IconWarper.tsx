import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: (e: React.SyntheticEvent) => void;
  hover?: "bgPrimary" | "bgSecondary" | "bgGray" | "bgSlightGray" | "none";
  defaultBg?:
    | "gray"
    | "primary"
    | "secondary"
    | "slightGray"
    | "none"
    | "slightDark";
  iconColor?:
    | "iconColorPrimary"
    | "iconColorSecondary"
    | "iconColorWhite"
    | "iconColorDefault";
}

const IconWarper = ({
  children,
  style = {},
  handleClick = () => {},
  hover = "bgPrimary",
  defaultBg = "none",
  iconColor = "iconColorDefault",
}: IconProps) => {
  return (
    <div
      className={`${styles.iconContainer} ${styles[iconColor]} ${styles[defaultBg]} ${styles[hover]}  hvr-pop`}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default IconWarper;

import React, { ButtonHTMLAttributes } from "react";
import styles from "./PanelHeader.module.scss";
interface HeaderTextBtnType extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "containSecondary"
    | "containPrimary"
    | "outlineSecondary"
    | "outlinePrimary";
}
const HeaderTextBtn: React.FC<HeaderTextBtnType> = ({
  variant = "containSecondary",
  children,
  ...rest
}) => {
  return (
    <button
      className={`${styles.headerTextBtn} ${styles[variant]} hvr-pop`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HeaderTextBtn;

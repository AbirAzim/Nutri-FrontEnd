import React, { ReactNode } from "react";
import styles from "./toggleMenu.module.scss";

type ToggleMenuProps = {
  toggle?: number;
  setToggle?: (val: number) => void;
  toggleMenuList: string[] | ReactNode[];
  maxWidth?: React.CSSProperties;
  variant?:
    | "containPrimary"
    | "containSecondary"
    | "outlinePrimary"
    | "outlineSecondary";
};

const ToggleMenu = ({
  toggle = 0,
  setToggle = () => {},
  toggleMenuList,
  maxWidth = {},
  variant = "containPrimary",
}: ToggleMenuProps) => {
  return (
    <div className={styles.topMenuContainer}>
      <div
        className={styles.topMenu}
        style={{
          ...maxWidth,
        }}
      >
        <div
          className={`${styles.active} ${styles[variant]}`}
          style={{
            width: `${100 / toggleMenuList.length}%`,
            left: `${(100 / toggleMenuList.length) * toggle}%`,
          }}
        ></div>
        {toggleMenuList?.map((menu, index) => {
          return (
            <div
              key={index}
              className={`${styles.menu} ${
                toggle === index ? styles[variant] : ""
              }`}
              onClick={() => setToggle(index)}
              style={{ width: `${100 / toggleMenuList.length}%` }}
            >
              {menu}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleMenu;

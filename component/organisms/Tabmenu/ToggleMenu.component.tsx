import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./ToggleMenu.module.scss";

interface ToggleMenuProps {
  width?: string | number;
  menu: {
    label?: string;
    icon?: IconDefinition;
    onClick?: (item: any) => void;
  }[];
  toggleState: [number, any];
}

const ToggleMenu: React.FC<ToggleMenuProps> = (props) => {
  const { menu, width, toggleState } = props;
  const [toggle, setToggle] = toggleState;
  const toggleRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    const menuNo = index + 1;

    const menuLength = menu.length;
    if (menuLength === 0) return;

    const portion = 100 / menuLength;

    toggleRef.current.style.left = `${index * portion}%`;

    setToggle(menuNo);
  };

  return (
    <div style={{ width: typeof width === "number" ? `${width}px` : width }}>
      <div className={styles.main__top__menu}>
        <div className={styles.active} ref={toggleRef}></div>
        {menu.map((item, index) => (
          <div
            key={item.label}
            className={
              toggle === index + 1
                ? styles.main__top__menu__child + " " + styles.active__menu
                : styles.main__top__menu__child
            }
            onClick={() => {
              handleToggle(index);
              item.onClick && item.onClick(item);
            }}
          >
            <FontAwesomeIcon icon={item.icon} size="lg" />
            {item.label && <span className="ml-10">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

ToggleMenu.defaultProps = {
  width: "100%",
};

export default ToggleMenu;

import React from "react";
import styles from "./Button.module.scss";

interface ActionButtonProps {
  children?: React.ReactNode;
  onClick: (e) => any;
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { children, onClick } = props;
  return (
    <button className={styles.action} onClick={onClick}>
      {children}
    </button>
  );
};

//prod

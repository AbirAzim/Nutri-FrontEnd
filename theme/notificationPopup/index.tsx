import React from "react";
import styles from "./NotificationPopup.module.scss";

interface PositionType {
  x: number;
  y: number;
}

interface NotificationPopupType {
  position: PositionType;
  clickPosition: PositionType;
}

const NotificationPopup: React.FC<NotificationPopupType> = ({
  position,
  clickPosition,
  children,
}) => {
  const calculateArrowMargin = () => {
    const arrowSize = 10;
    const arrowMargin = 5;
    const margin = arrowSize + arrowMargin;
    console.log(position, clickPosition);

    if (clickPosition.y < position.y) {
      return {
        top: -margin,
        left: arrowMargin,
        right: arrowMargin,
        bottom: "auto",
      };
    }

    return {
      top: arrowMargin,
      left: arrowMargin,
      right: arrowMargin,
      bottom: "auto",
    };
  };

  return (
    <div className={styles.popup} style={{ top: position.y, left: position.x }}>
      <div className={styles.arrow} style={calculateArrowMargin()} />
      {children}
    </div>
  );
};

export default NotificationPopup;

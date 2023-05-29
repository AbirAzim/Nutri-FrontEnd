import { faBell } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./NotificationBell.module.scss";

const NotificationBell = ({ count, onClick }) => {
  return (
    <div onClick={onClick} className={styles.notificationBell}>
      <FontAwesomeIcon icon={faBell} />
      {count > 0 && <span className={styles.count}>{count}</span>}
    </div>
  );
};

export default NotificationBell;

import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import styles from "./queueTray.module.scss";

const QueueTray = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__clearAllDiv}>
        <IoMdRemoveCircleOutline
          className={styles.mainContainer__clearAllDiv__icon}
        />
        <span className={styles.mainContainer__clearAllDiv__text}>
          Clear All
        </span>
      </div>
    </div>
  );
};

export default QueueTray;

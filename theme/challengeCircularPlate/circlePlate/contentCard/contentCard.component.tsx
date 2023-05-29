import React from "react";
import Image from "next/image";
import styles from "./contentCard.module.scss";

const ContentCard = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__contentTray}>
        <div className={styles.mainContainer__contentTray__imageDiv}>
          <Image
            src={"/images/5.jpeg"}
            alt={""}
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
        <h4>Tuesday, Mar 26</h4>
      </div>

      <div className={styles.mainContainer__daysContainer}>
        <h2>39 Day Challenge</h2>
        <div className={styles.mainContainer__daysContainer__daysRemaining}>
          8 Days Remaining
        </div>
      </div>
      <div className={styles.mainContainer__percentageScore}>
        <span
          className={styles.mainContainer__percentageScore__score}
        >
          80.9%
        </span>
        <span
          className={styles.mainContainer__percentageScore__scoreText}
        >
          Blend Score
        </span>
      </div>
    </div>
  );
};

export default ContentCard;

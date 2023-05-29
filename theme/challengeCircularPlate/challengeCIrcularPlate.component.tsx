import React from "react";
import styles from "./challengeCircularPlate.module.scss";
import CirclePlate from "./circlePlate/circlePlate.component";
import ChallengeHeaderTray from "./headerTray/headerTray.component";

const ChallengeCircularPlate = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__headerDiv}>
        <ChallengeHeaderTray />
      </div>
      <div className={styles.mainContainer__circularPlate}>
        <CirclePlate />
      </div>
    </div>
  );
};

export default ChallengeCircularPlate;

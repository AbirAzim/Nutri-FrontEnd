import React from "react";
import styles from "./scoreTray.component.module.scss";
import InfoIcon from "../../../../../public/icons/info_black_36dp.svg";
import { GiGl } from "../../../../../type/nutrationType";

interface Props {
  giGl?: GiGl;
}
const ScoreTray = ({
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
}: Props) => {
  return (
    <div className={styles.scoreTray}>
      <div className={styles.scoreCards}>
        <div className={styles.scoreCards__left}>
          <h3>{Math?.round(giGl?.netCarbs)}</h3>
          <h5>Net Carbs</h5>
        </div>
        <div className={styles.scoreCards__center}>
          <h3>{Math?.round(giGl?.totalGL)}</h3>
          <h5>Glycemic Load</h5>
        </div>
        <div className={styles.scoreCards__right}>
          <h3>
            805
            <div className={styles.scoreCards__right__infoIcon}>
              <InfoIcon />
            </div>
          </h3>
          <h5>Rx Score</h5>
        </div>
      </div>
    </div>
  );
};

export default ScoreTray;

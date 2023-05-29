import React from "react";
import styles from "./progress.module.scss";

interface Percent {
  percent: number;
  highestValue: number;
  highLight?: boolean;
}

const LinearIndicatorcomponent = ({
  percent,
  highestValue,
  highLight = false,
}: Percent) => {
  let width: number = (percent / highestValue) * 100;

  return (
    <div className={styles.LinearIndicatorDiv}>
      {/* <LinearProgress variant="determinate" value={20} sx={color="green"} /> */}
      <div
        className={`${styles.progressBar} ${
          highLight ? styles.progressBarHighLight : ""
        }`}
        style={{ width: `${width}%` }}
        role="progressbar"
      ></div>
    </div>
  );
};

export default LinearIndicatorcomponent;

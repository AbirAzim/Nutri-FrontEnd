import React from "react";
import styles from "./ProgessBar.module.scss";

type ProgessBarProps = {
  steps: number;
};
const ProgessBar = ({ steps = 1 }: ProgessBarProps) => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.progessBarContainer}>
        <h2>Complete Your Profile</h2>
        <p>
          No more generic 2,000 calorie recommended daily intake nutrition
          labels.
        </p>
        <div className={styles.progressbar}>
          <div
            className={`${styles.step} ${steps >= 1 ? styles.active : ""} ${
              steps >= 2 ? styles.finish : ""
            } `}
          >
            <span className="step_no">1</span>
          </div>
          <div
            className={`${styles.step} ${steps >= 2 ? styles.active : ""} ${
              steps >= 3 ? styles.finish : ""
            }  `}
          >
            <span className="step_no">2</span>
          </div>
          <div
            className={`${styles.step} ${steps >= 3 ? styles.active : ""} ${
              steps >= 4 ? styles.finish : ""
            }`}
          >
            <span className="step_no">3</span>
          </div>
          <div
            className={`${styles.step} ${styles.step_four} ${
              steps >= 4 ? styles.active : ""
            }`}
          >
            <span className="step_no">4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgessBar;

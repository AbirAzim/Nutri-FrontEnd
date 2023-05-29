import React from "react";
import styles from "./Skeleton.module.scss";

const Shimmer = () => {
  return (
    <div className={styles.shimmer_wrapper}>
      <div className={styles.shimmer}></div>
    </div>
  );
};

export default Shimmer;

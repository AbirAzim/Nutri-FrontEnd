import React from "react";
import Shimmer from "../Shimmer";
import SkeletonElement from "../SkeletonElement";
import styles from "../Skeleton.module.scss";

const SkeletonProfile = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`${styles.skeleton_wrapper} ${styles[themeClass]}`}>
      <div className={`${styles.skeleton_profile}`}>
        <div>
          <SkeletonElement type="avatar" />
        </div>
        <div>
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonProfile;

import React from "react";
import Shimmer from "../Shimmer";
import SkeletonElement from "../SkeletonElement";
import styles from "../Skeleton.module.scss";

const SkeletonArticle = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`${styles.skeleton_wrapper} ${styles[themeClass]}`}>
      <div className={`${styles.skeleton_article}`}>
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonArticle;

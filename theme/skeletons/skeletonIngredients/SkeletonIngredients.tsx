import React from "react";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonIngredients.module.scss";
const SkeletonIngredients = () => {
  return (
    <div className={styles.skeletonIngredients_wraper}>
      <div className={styles.category_wraper}>
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "65px", height: "65px", margin: "5px 0" }}
        />
      </div>
    </div>
  );
};

export default SkeletonIngredients;

import React from "react";
import SkeletonElement from "../SkeletonElement";
import styles from "./skeletonBlogDetails.module.scss";

const SkeletonBlogDetails = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <SkeletonElement type="title" />
        {[...Array(3)]?.map((item, index) => {
          return (
            <SkeletonElement
              type="thumbnail"
              key={index}
              style={{ width: "100%", height: "277px" }}
            />
          );
        })}
      </div>
      <div className={styles.center}>
        <SkeletonElement type="title" />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "100%", height: "277px" }}
        />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" style={{ width: "50%" }} />
        {[...Array(4)]?.map((_, index) => {
          return (
            <div className={styles.section} key={index}>
              <SkeletonElement type="title" />
              <SkeletonElement type="text" />
              <SkeletonElement type="text" />
              <SkeletonElement type="text" style={{ width: "70%" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkeletonBlogDetails;

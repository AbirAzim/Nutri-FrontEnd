import React from "react";
import Shimmer from "../Shimmer";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonComment.module.scss";

interface Props {
  singleComment?: boolean;
}

const SkeletonComment = ({ singleComment = false }: Props) => {
  return (
    <>
      {singleComment ? (
        <div className={styles.skeletonComment_wraper}>
          <div className={styles.title_wraper}>
            <SkeletonElement
              type="avatar"
              style={{ width: "40px", height: "40px" }}
            />
            <SkeletonElement type="title" style={{ marginLeft: "16px" }} />
          </div>
          <div className={styles.text_wraper}>
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.skeletonComment_wraper}>
            <div className={styles.title_wraper}>
              <SkeletonElement
                type="avatar"
                style={{ width: "40px", height: "40px" }}
              />
              <SkeletonElement type="title" style={{ marginLeft: "16px" }} />
            </div>
            <div className={styles.text_wraper}>
              <SkeletonElement type="text" />
              <SkeletonElement type="text" />
            </div>
          </div>
          <div className={styles.skeletonComment_wraper}>
            <div className={styles.title_wraper}>
              <SkeletonElement
                type="avatar"
                style={{ width: "40px", height: "40px" }}
              />
              <SkeletonElement type="title" style={{ marginLeft: "16px" }} />
            </div>
            <div className={styles.text_wraper}>
              <SkeletonElement type="text" />
              <SkeletonElement type="text" />
            </div>
          </div>
          <div className={styles.skeletonComment_wraper}>
            <div className={styles.title_wraper}>
              <SkeletonElement
                type="avatar"
                style={{ width: "40px", height: "40px" }}
              />
              <SkeletonElement type="title" style={{ marginLeft: "16px" }} />
            </div>
            <div className={styles.text_wraper}>
              <SkeletonElement type="text" />
              <SkeletonElement type="text" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SkeletonComment;

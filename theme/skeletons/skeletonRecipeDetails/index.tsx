import React, { useMemo } from "react";
import randomNum from "../randomNum";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonRecipeDetails.module.scss";
import NutrationPanelSkeleton from "../nutrationPanelSkeleton/NutrationPanelSkeleton";

interface Props {
  style?: React.CSSProperties;
}
const SkeletonRecipeDetails = ({ style }: Props) => {
  return (
    <div className={styles.main} style={style}>
      <div className={styles.left}>
        <RecipeDetailsLeftSide />
      </div>
      <div className={styles.center}>
        <RecipeDetailsMiddle />
      </div>
      <div className={styles.right}>
        <RecipeDetailsRightSide />
      </div>
    </div>
  );
};

export const RecipeDetailsLeftSide = () => (
  <div className={styles.sectionContainer}>
    <SkeletonElement type="title" />
    <div className={`${styles.content} ${styles.containerBorder}`}>
      {[...Array(4)]?.map((item, index) => {
        return (
          <SkeletonElement
            type="thumbnail"
            key={index}
            style={{ width: "100%", height: "277px" }}
          />
        );
      })}
    </div>
  </div>
);
export const RecipeDetailsRightSide = () => (
  <div className={styles.sectionContainer}>
    <SkeletonElement type="title" />
    <div className={` ${styles.containerBorder}`}>
      <NutrationPanelSkeleton />
    </div>
  </div>
);
export const RecipeDetailsMiddle = () => {
  const makeRandomPercent = useMemo(() => randomNum(), []);
  return (
    <>
      <SkeletonElement type="title" />
      <div className={`${styles.containerBorder}`}>
        <SkeletonElement type="title" style={{ width: "100%" }} />
        <SkeletonElement type="title" />
        <SkeletonElement type="text" style={{ marginBottom: "20px" }} />
        <SkeletonElement
          type="thumbnail"
          style={{ height: "250px", width: "100%" }}
        />
        <SkeletonElement type="text" style={{ marginBottom: "20px" }} />
      </div>
      <div
        style={{ marginTop: "30px" }}
        className={`${styles.containerBorder}`}
      >
        <SkeletonElement type="title" />
        <div>
          {[...Array(4)].map((item, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <SkeletonElement
                  type="avatar"
                  style={{
                    marginRight: "20px",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <SkeletonElement
                  type="text"
                  style={{ width: `${makeRandomPercent}%`, margin: "5px 0" }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{ marginTop: "30px" }}
        className={`${styles.containerBorder}`}
      >
        <SkeletonElement type="title" />
        <div>
          {[...Array(2)].map((item, index) => {
            return (
              <div key={index} style={{ marginTop: "30px" }}>
                <SkeletonElement type="title" style={{}} />
                <SkeletonElement type="text" />
                <SkeletonElement
                  type="text"
                  style={{ width: `${makeRandomPercent}%`, margin: "5px 0" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SkeletonRecipeDetails;

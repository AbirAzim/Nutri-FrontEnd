import React, { useEffect, useState } from "react";
import useWindowSize from "../../../components/utility/useWindowSize";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonComparePage.module.scss";

const SkeletonComparePage = () => {
  const [slideSize, setSlideSize] = useState(4);
  const [comparedRecipe, setComparedRecipe] = useState(10);
  const { height, width } = useWindowSize();

  useEffect(() => {
    if (width <= 600) {
      setSlideSize(1);
      setComparedRecipe(2);
    } else if (width >= 600 && width < 1250) {
      setSlideSize(2);
      setComparedRecipe(4);
    } else if (width >= 1250 && width < 1450) {
      setSlideSize(3);
      setComparedRecipe(6);
    } else {
      setSlideSize(4);
      setComparedRecipe(7);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  return (
    <>
      <div className={styles.sectionContainer}>
        <SkeletonElement type="title" style={{ marginBottom: "20px" }} />
        <div className={styles.contentCompare}>
          {[...Array(comparedRecipe)]?.map((item, index) => {
            return (
              <SkeletonElement
                type="thumbnail"
                key={index}
                style={{ width: "100%", height: "270px" }}
              />
            );
          })}
        </div>
        <div className={styles.contentFormulate}>
          {[...Array(slideSize)]?.map((item, index) => {
            return (
              <SkeletonElement
                type="thumbnail"
                key={index}
                style={{ width: "100%", height: "500px" }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SkeletonComparePage;

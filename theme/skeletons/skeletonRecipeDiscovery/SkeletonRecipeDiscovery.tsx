import React, { useEffect, useState } from "react";
import useWindowSize from "../../../components/utility/useWindowSize";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonRecipeDiscovery.module.scss";

const SkeletonRecipeDiscovery = ({
  style = {},
}: {
  style?: React.CSSProperties;
}) => {
  const [slideSize, setSlideSize] = useState(4);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= 600) {
      setSlideSize(1);
    } else if (width >= 600 && width < 1250) {
      setSlideSize(2);
    } else if (width >= 1250 && width < 1450) {
      setSlideSize(3);
    } else {
      setSlideSize(4);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  return (
    <>
      <div className={styles.sectionContainer} style={style}>
        <SkeletonElement type="title" style={{ marginBottom: "20px" }} />
        <div className={styles.content}>
          {[...Array(slideSize)]?.map((item, index) => {
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
    </>
  );
};

export default SkeletonRecipeDiscovery;

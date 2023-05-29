import React from "react";
import numberToArray from "../../../helperFunc/array/numberToArray";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonBlendType.module.scss";

interface Props {
  amount?: number;
}

const SkeletonBlendType = ({ amount = 6 }: Props) => {
  return (
    <div className={styles.skeletonBlendType_wraper}>
      <SkeletonElement type="title" />
      <div className={styles.category_wraper}>
        {numberToArray(amount).map((item) => (
          <SkeletonElement
            key={item}
            type="thumbnail"
            style={{ width: "100%", height: "65px", margin: "5px 0" }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonBlendType;

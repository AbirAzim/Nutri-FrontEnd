import React from "react";
import styles from "./Skeleton.module.scss";

type SkeletonElementProps = {
  type: "text" | "avatar" | "title" | "thumbnail";
  style?: React.CSSProperties;
};

function SkeletonElement({ type = "text", style = {} }: SkeletonElementProps) {
  const classes = `${styles.skeleton} ${styles[type]}`;

  return <div className={classes} style={style}></div>;
}

export default SkeletonElement;

import React from "react";
import styles from "./headingBox.module.scss";

interface headingBoxInterface{
  children:any
}
const HeadingBox = ({children}:headingBoxInterface) => {
  return <div className={styles.mainOutline}>{children}</div>;
};

export default HeadingBox;

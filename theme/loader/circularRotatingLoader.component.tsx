import React from "react";
import styles from "./CircularRotatingLoader.module.scss";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  color?: "primary" | "secondary" | "gray" | "white";
  style?: React.CSSProperties;
}

const CircularRotatingLoader = ({ color = "secondary", style = {} }: Props) => {
  return (
    <div className={styles.mainLoader}>
      <BiLoaderAlt
        className={`${styles.mainLoader__loader} ${styles[color]}`}
        style={style}
      />
    </div>
  );
};

export default CircularRotatingLoader;

import React, { ReactNode } from "react";
import styles from "./tray.module.scss";

interface TrayTagProps {
  hover?: boolean;
  handleTagClick?: () => void;
  icon: string | ReactNode;
  placeMent?: "right" | "left";
}

const TrayTag = ({
  handleTagClick = () => {},
  hover = false,
  icon,
  placeMent = "right",
}: TrayTagProps) => {
  return (
    <div
      className={`${styles.filterTaryTag} ${
        hover ? styles.filterTaryHovered : ""
      }
        ${placeMent === "left" ? styles.leftRadius : styles.rightRadius}
      `}
      onClick={handleTagClick}
    >
      {typeof icon === "string" ? <img src={icon} alt="icon" /> : icon}
    </div>
  );
};

export default TrayTag;

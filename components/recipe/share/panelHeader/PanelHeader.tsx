import { faChartColumn } from "@fortawesome/pro-light-svg-icons";
import Image from "next/image";
import React from "react";
import Icon from "../../../../component/atoms/Icon/Icon.component";
import styles from "./PanelHeader.module.scss";

interface PanelHeaderProps {
  icon?: string | React.ReactNode;
  title?: string;
  rightSide?: React.ReactNode | null;
  panelHeaderVariant?: "headerSolid" | "headerBorderBottom";
  activeHeader?: boolean;
  index?: number;
  handleClick?: (index: number) => void;
}

const PanelHeader = ({
  icon = "/icons/chart-bar-light-green.svg",
  title = "Rx Facts",
  rightSide = null,
  panelHeaderVariant = "headerSolid",
  activeHeader = false,
  index = 0,
  handleClick = () => {},
}: PanelHeaderProps) => {
  return (
    <div className={styles.headingContainer}>
      <div
        className={`${styles[panelHeaderVariant]} ${
          activeHeader ? styles.activeTab : ""
        }`}
        onClick={() => handleClick(index)}
      >
        <div className={styles.icon}>
          {typeof icon === "string" ? (
            <Icon fontName={faChartColumn} size="2.5rem" />
          ) : (
            icon
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>
      </div>
      {rightSide && rightSide}
    </div>
  );
};

export default PanelHeader;

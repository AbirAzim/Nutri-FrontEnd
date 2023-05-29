/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import useHover from "../../../components/utility/useHover";
import styles from "./Drawer.module.scss";

const panelWidth = "320px";

interface leftTrayInterface {
  children: ReactNode;
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
  openTray?: boolean;
  closeTray?: () => void;
  panleTag?: (hover: boolean) => ReactNode;
  isolated?: boolean;
}

export default function Drawer({
  children,
  showTagByDefaut = true,
  showPanle = "left",
  closeTray = () => {},
  openTray = false,
  panleTag = (hover: boolean) => (
    <img
      src={
        hover ? "/icons/left__drawer__orange.svg" : "/icons/left__drawer.svg"
      }
      alt="Icon"
    />
  ),
  isolated = false,
}: leftTrayInterface) {
  const [hoevrRef, hover] = useHover();

  return (
    <div className={`${isolated ? styles[showPanle] : ""}`}>
      <div
        className={`${styles.tray} `}
        ref={hoevrRef}
        style={
          showPanle === "left"
            ? { left: openTray ? "0px" : `-${panelWidth}` }
            : { right: openTray ? "0px" : `-${panelWidth}` }
        }
      >
        <div className={styles.tray__inner}>
          <div
            className={`${styles.image}`}
            onClick={closeTray}
            style={
              showPanle === "left"
                ? { right: hover ? "5px" : "20px" }
                : { left: hover ? "-40px" : "-25px" }
            }
          >
            {!openTray && !showTagByDefaut ? null : panleTag(hover)}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import React from "react";
import TrayWrapper from "../TrayWrapper";
import styles from "./nutritiontray.module.scss";

export default function WikiTray({ title, children }) {
  return (
    <TrayWrapper
    // closeTray={() => {}}
    // openTray={false}
    >
      <div className={styles.nutrition}>
        <div className={styles.nutrition__top}>
          <h3>Type</h3>
          <div className={styles.nutrition__menu}>
            <div className={styles.nutrition__menu__item}>
              <div className={styles.nutrition__menu__item__image}>
                <img src="/other/nutrition.svg" alt="ingr" />
              </div>
              <p>Ingredients</p>
            </div>
            <div className={styles.nutrition__menu__item}>
              <div className={styles.nutrition__menu__item__image}>
                <img src="/other/nutritio.svg" alt="ingr" />
              </div>
              <p>Nutrition</p>
            </div>
            <div className={styles.nutrition__menu__item}>
              <div className={styles.nutrition__menu__item__image}>
                <img src="/other/heart.svg" alt="ingr" />
              </div>
              <p>Health</p>
            </div>
          </div>
        </div>
        <div className={styles.nutrition__top} style={{ marginTop: "20px" }}>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </TrayWrapper>
  );
}

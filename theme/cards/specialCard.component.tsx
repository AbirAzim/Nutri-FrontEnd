import React from "react";
import styles from "./card.module.scss";

interface specialCardInterface {
  img?: string;
  title: string;
  style?: object;
  imageHeight?: string;
  color?: string;
  type?: string;
  rx?: number;
  category?: string;
}

export default function SpecialcardComponent({
  img,
  title,
  style,
  imageHeight,
  color,
  type,
  rx,
  category,
}: specialCardInterface) {
  // STEP 2: HANDLE VARIABLES FALLBACK VALUE TO AVOID UI FAILURE
  rx = rx || 500;
  img = img || "/cards/grains.png";
  style = style || {};
  style = { ...style, backgroundImage: `url("${img}")` };
  if (imageHeight) style = { ...style, height: imageHeight };

  let textStyle = {};
  if (color) textStyle = { ...textStyle, color: color };

  // CASE 1: IF TYPE IS SECONDARY SERVE SECONDARY CARD
  if (type === "secondary")
    return (
      <div className={styles.cardTwo}>
        <div className={styles.cardTwo__top} style={style}></div>
        <div className={styles.cardTwo__bottom}>
          <h5 style={textStyle}>{title}</h5>
        </div>
      </div>
    );

  // CASE 2: SERVE DEFAULT CARD
  return (
    <div className={styles.cardTwo}>
      <div className={styles.cardTwo__top} style={style}>
        <div
          className={styles.cardTwo__float + " " + styles.cardTwo__float__left}
        >
          Rx Score <span> &nbsp; {rx}</span>
        </div>
        <div
          className={styles.cardTwo__float + " " + styles.cardTwo__float__right}
        >
          {category}
        </div>
      </div>
      <div className={styles.cardTwo__bottom}>
        <h5 style={textStyle}>{title}</h5>
      </div>
    </div>
  );
}

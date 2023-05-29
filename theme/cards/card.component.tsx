/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./card.module.scss";

interface cardInterface {
  img?: string;
  icon?: string;
  rating?: number;
  noOfRating?: number;
  price?: number;
  discountPrice?: number;
  type?: string;
  title: string;
  rx?: number;
  style?: object;
}

export default function CardComponent({
  img,
  icon,
  rating,
  noOfRating,
  price,
  discountPrice,
  type,
  title,
  rx,
  style,
}: cardInterface) {
  // STEP 1: HANDLE VARIABLES FALLBACK VALUE TO AVOID UI FAILURE
  style = style || {};
  rx = Math.round(rx || 500);
  img = img || "/cards/banana.png";
  price = price || 16.95;
  discountPrice = discountPrice || 12.95;
  rating = rating || 4.6;
  noOfRating = noOfRating || 71;
  title = title || "Default Title";
  icon = icon || "/icons/star.svg";

  if (type === "second")
    return (
      <div className={styles.card} style={style}>
        <h3>{title}</h3>
        <div className={styles.image}>
          <img src={img} alt={img} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom__left}>
            <s>{price}</s> &nbsp; <span>{discountPrice}</span>
          </div>
          <div className={styles.bottom__right}>
            <img src={icon} alt="icon" /> &nbsp; {rating} &nbsp; ({noOfRating})
          </div>
        </div>
      </div>
    );
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <div className={styles.image}>
        <img src={img} alt={img} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom__left}>
          Rx Score <span>&nbsp; {rx}</span>
        </div>
        <div className={styles.bottom__right}>
          <img src={icon} alt="icon" /> &nbsp; {rating} &nbsp; ({noOfRating})
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import React from "react";
import ButtonComponent from "../button/button.component";
import styles from "./homebanner.module.scss";

export default function HomebannerComponent(props) {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__inner}>
        <div
          className={styles.banner__child}
          style={{ backgroundImage: `url("/background/fruits.png")` }}
        >
          <div className={styles.card__one}>
            <div className={styles.card__one__top}>
              <p>What&apos;s New</p>
            </div>
            <div className={styles.card__one__bottom}>
              <p>
                Grocery list just got smarter. You can now select your favorites
                brands..
              </p>
            </div>
          </div>
        </div>
        <div
          className={styles.banner__child}
          style={{ backgroundImage: `url("/background/juices.png")` }}
        >
          <div className={styles.card__two}>
            <div className={styles.card__two__top}>
              <p>Check out the most popular smoothies this week...</p>
            </div>
          </div>
        </div>
        <div className={styles.banner__child}>
          <div className={styles.card__three}>
            <div className={styles.card__three__top}>
              <p>Grab the Blending101 Formula & Ingredients Guide</p>
            </div>
            <div className={styles.card__three__middle}>
              <p>
                The fail proof resource for creating all of the (6) blending
                types.
              </p>
            </div>
            <div className={styles.card__three__bottom}>
              <ButtonComponent
                type="border"
                value="Download Now"
                fullWidth={0}
                width={0}
                style={{
                  display: "inline-block",
                  border: "1px solid #FE5D1F",
                  backgroundColor: "transparent",
                  color: "#FE5D1F",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.banner__child}
          style={{ backgroundImage: `url("/background/detail.png")` }}
        >
          <div className={styles.card__four}></div>
        </div>
        <div className={styles.banner__child}>
          <div className={styles.card__five}>
            <div className={styles.card__five__left}>
              <img src="/background/chrome-logho.svg" alt="chrome" />
            </div>
            <div className={styles.card__five__right}>
              <p>Get the Chrome Extension</p>
              <p>
                Add blend recipes to you Blending101 collection from your
                favorites sites and blogs
              </p>
              <div className={styles.card__three__bottom}>
                <ButtonComponent
                  type="border"
                  value="Download Now"
                  fullWidth={0}
                  width={0}
                  style={{
                    display: "inline-block",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.banner__child}
          style={{ backgroundImage: `url("/background/babyjuice.png")` }}
        >
          <div className={styles.card__six}>
            <div className={styles.card__six__top}>
              <p>Free: Blending for kids e-book</p>
            </div>
          </div>
        </div>
        <div
          className={styles.banner__child}
          style={{ backgroundImage: `url("/background/shakes.png")` }}
        >
          <div className={styles.card__seven}>
            <div className={styles.card__seven__top}>
              <p>What you dont know about your plant milk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

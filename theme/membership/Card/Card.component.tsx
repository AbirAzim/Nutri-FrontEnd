import React from "react";
import ButtonComponent from "../../button/buttonA/button.component";
import styles from "./card.module.scss";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <h2>{props.children}</h2>
      <div className={styles.cardContent}>
        <div className={styles.priceDiv}>
          ${0}/<span>{"mo"}</span>
        </div>
        <div className={styles.buttonDiv}>
          <ButtonComponent
            type="transparentHover"
            fullWidth={true}
            style={{ height: "100%" }}
            value="Select Plan"
          />
        </div>
      </div>
      <div className={styles.featureList}>
        <ul>
          <li>user</li>
          <li>user</li>
          <li>user</li>
          <li>user</li>
          <li>user</li>
        </ul>
      </div>
    </div>
  );
};

export default Card;

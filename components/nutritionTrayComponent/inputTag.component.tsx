import React from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import styles from "./nutritionTrayComponent.module.scss";

const InputTag = () => {
  return (
    <div className={styles.servingTrayContainer__element__inputContainer}>
      <input
        className={styles.servingTrayContainer__element__inputContainer__input}
        type="number"
      />
      <div
        className={
          styles.servingTrayContainer__element__inputContainer__input__arrowDiv
        }
      >
        <AiOutlineUp
          className={
            styles.servingTrayContainer__element__inputContainer__input__arrowDiv__icon
          }
          onClick={() => {
            // adjusterFunc("+");
          }}
        />
        <AiOutlineDown
          className={
            styles.servingTrayContainer__element__inputContainer__input__arrowDiv__icon
          }
          onClick={() => {
            // adjusterFunc("+");
          }}
        />
      </div>
    </div>
  );
};

export default InputTag;

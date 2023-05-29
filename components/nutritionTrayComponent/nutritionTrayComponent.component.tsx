import React from "react";
import InputTag from "./inputTag.component";
import styles from "./nutritionTrayComponent.module.scss";

const NutritionTrayComponent = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.nutritionPaddingContainer}>
        <h2 className={styles.title}>Nutition</h2>
        <div className={styles.servingTrayContainer}>
          <div className={styles.servingTrayContainer__element}>
            <InputTag />
            <span className={styles.servingTrayContainer__element__text}>
              servings
            </span>
          </div>
          <div className={styles.servingTrayContainer__element}>
            <span className={styles.servingTrayContainer__element__value}>
              16
            </span>
            <span style={{fontSize:"16px"}}>&nbsp;:</span>
            <span className={styles.servingTrayContainer__element__text}>
              servings
            </span>
          </div>
        </div>
      </div>
      <div className={styles.nutritionPaddingContainer}>
        <div className={styles.selectedElementContainer}>
          <div>A</div>
          <div>B</div>
        </div>
        <p className={styles.description}>Amount Per Saving Calorie</p>
      </div>
    </div>
  );
};

export default NutritionTrayComponent;

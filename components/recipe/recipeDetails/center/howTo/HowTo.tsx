import React from "react";
import styles from "../Center.module.scss";

const HowTo = ({
  recipeInstructions = [],
}: {
  recipeInstructions: string[];
}) => {
  return (
    <div className={styles.ingredentContainer}>
      <div className={styles.ingredentHeader}>
        <img src="/images/chef.svg" alt="basket" />
        <h3>How to</h3>
      </div>
      {recipeInstructions?.map((step, index) => {
        return (
          <div
            className={styles.steps}
            key={index + "recipeInstruction__recipeDetails"}
          >
            <span>Step {index + 1}</span>
            <p>{step}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HowTo;

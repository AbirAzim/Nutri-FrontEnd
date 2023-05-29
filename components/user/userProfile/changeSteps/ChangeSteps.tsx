import React from "react";
import ButtonComponent from "../../../../theme/button/button.component";
import styles from "./ChangeSteps.module.scss";

type ChangeStepsProps = {
  nextStep: () => void;
  prevStep: () => void;
  steps: number;
};

const ChangeSteps = ({ nextStep, prevStep, steps }: ChangeStepsProps) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonContainer__innerContainer}>
        {steps === 1 ? null : (
          <button className={styles.backButton} onClick={prevStep}>
            Back
          </button>
        )}

        <ButtonComponent
          type="primary"
          value={steps === 4 ? "Finish" : "Next"}
          onClick={nextStep}
          style={{
            borderRadius: "40px",
            margin: "0 30px",
            height: "62px",
            width: "135px",
          }}
        />
      </div>
    </div>
  );
};

export default ChangeSteps;

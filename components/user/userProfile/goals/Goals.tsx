import React from "react";
import styles from "./Goals.module.scss";

type GoalsProps = {
  title: string;
  list: string[];
  updateUserProfile: Function;
  fieldName: string;
  alredyExistGoals: (value: string, fieldName: string) => boolean;
  headingStyle?: object;
};

const Goals = ({
  list,
  title,
  fieldName,
  updateUserProfile,
  alredyExistGoals,
  headingStyle = {},
}: GoalsProps) => {
  return (
    <div className={styles.container}>
      <h2 style={headingStyle}>{title}</h2>
      <div className={styles.container__goalsContainer}>
        {list?.map((item, index) => {
          const ckeckGoals = alredyExistGoals(item, "whyBlending");
          return (
            <span
              key={index}
              className={`${styles.container__goalsContainer__label} ${
                ckeckGoals ? styles.selected : ""
              }`}
              onClick={() => updateUserProfile(fieldName, item)}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;

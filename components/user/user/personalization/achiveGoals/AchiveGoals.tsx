import React from "react";
import Goals from "../../../userProfile/goals/Goals";
const goals = [
  "loose weight",
  "save time",
  "prevent disease",
  "make tastier blends",
  "treat existing condition",
  "get more nutrition",
  "reduce dependence on medications",
  "less food waste",
  "workouts booster",
  "healthier kids",
  "eat more fruits and vegetables",
];

type AchiveGoalsProps = {
  updateUserProfile: (name: string, value: any) => void;
  checkGoals: (value: string, fieldName: string) => boolean;
};

const AchiveGoals = ({ updateUserProfile, checkGoals }: AchiveGoalsProps) => {
  return (
    <>
      <p
        style={{
          color: "#c4c4c4",
          fontSize: "12px",
          alignItems: "center",
          textAlign: "center",
          lineHeight: "1.125rem",
          fontWeight: 400,
          padding: "30px 0",
        }}
      >
        This information is used to customize daily recommended nutrition
        targets
      </p>

      <Goals
        list={goals}
        title="Select all the goals you with like to achieve with Blending 101"
        fieldName="whyBlending"
        updateUserProfile={updateUserProfile}
        alredyExistGoals={checkGoals}
        headingStyle={{ fontSize: "22px" }}
      />
    </>
  );
};

export default AchiveGoals;

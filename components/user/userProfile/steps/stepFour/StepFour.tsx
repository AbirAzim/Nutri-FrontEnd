import React from "react";
import Goals from "../../goals/Goals";

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

type StepFourProps = {
  updateUserProfile: (name: string, value: any) => void;
  checkGoals: (value: string, fieldName: string) => boolean;
};

const StepFour = ({ updateUserProfile, checkGoals }: StepFourProps) => {
  return (
    <Goals
      list={goals}
      title="Select all the goals you with like to achieve with Blending 101"
      fieldName="whyBlending"
      updateUserProfile={updateUserProfile}
      alredyExistGoals={checkGoals}
    />
  );
};

export default StepFour;

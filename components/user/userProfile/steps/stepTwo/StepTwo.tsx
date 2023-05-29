import React from "react";
import SectionWithIcon from "../../sectionWithIcon/SectionWithIcon";

const dietary = [
  {
    icon: "/images/healthy-food.png",
    label: "Low fodmap",
  },
  {
    icon: "/images/avocado-1.png",
    label: "Ketogenic",
  },
  {
    icon: "/images/milk.png",
    label: "Vegetarian dairy",
  },
  {
    icon: "/images/vegetarian.png",
    label: "Vegetarian no dairy",
  },
  // {
  //   icon: "/images/milk.png",
  //   label: "vegetarian dairy",
  // },
  // {
  //   icon: "/images/milk.png",
  //   label: "vegetarian dairy",
  // },
];
const allergies = [
  {
    icon: "/images/milk-bottle.png",
    label: "Low",
  },
  {
    icon: "/images/peanut.png",
    label: "Moderate",
  },
  {
    icon: "/images/almond.png",
    label: "High",
  },
];

type StepTwoProps = {
  userProfile: any;
  updateUserProfile: Function;
  alredyExist?: (value: string, fieldName: string) => boolean;
};
const StepTwo = ({
  userProfile,
  updateUserProfile,
  alredyExist,
}: StepTwoProps) => {
  return (
    <>
      <SectionWithIcon
        title="Which dietary lifestyle applies to you?"
        body={dietary}
        fieldName="dieteryLifeStyle"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
      />
      <SectionWithIcon
        title="Which allergies do you have?"
        body={allergies}
        fieldName="allergies"
        updateUserProfile={updateUserProfile}
        userProfile={userProfile}
        alredyExist={alredyExist}
      />
    </>
  );
};

export default StepTwo;

import React, { useState } from "react";
import DropDown from "../../../../../theme/dropDown/DropDown.component";
import styles from "./Dietary.module.scss";
import DietarySection from "./dietarySection/DietarySection";

let dropdownItem = [
  { name: "Warning", value: "Warning" },
  { name: "Hiding", value: "Hiding" },
];

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

type DietaryProps = {
  userProfile: any;
  updateUserProfile: Function;
  alredyExist?: (value: string, fieldName: string) => boolean;
};

const Dietary = ({
  updateUserProfile,
  userProfile,
  alredyExist,
}: DietaryProps) => {
  const [dropDownValue, setDropDownValue] = useState("Warning");
  return (
    <div className={styles.dietaryContainer}>
      <p className={styles.infoText}>
        This information is used to customize daily recommended nutrition
        targets
      </p>
      <div className={styles.dietrySelect}>
        <p className={styles.text}>
          How should dietary or allergy conflicts be handled?
        </p>
        <div style={{ flex: "auto" }}>
          <DropDown
            listElem={dropdownItem}
            style={{ maxWidth: "200px" }}
            value={dropDownValue}
            handleChange={(e) => setDropDownValue(e?.target?.value)}
          />
        </div>
      </div>
      <div>
        <DietarySection
          body={dietary}
          fieldName="dieteryLifeStyle"
          title="Which dietary lifestyle applies to you ?"
          updateUserProfile={updateUserProfile}
          userProfile={userProfile}
        />
      </div>
      <div>
        <DietarySection
          body={allergies}
          fieldName="allergies"
          title="Which allergies do you have ?"
          updateUserProfile={updateUserProfile}
          userProfile={userProfile}
          alredyExist={alredyExist}
        />
      </div>
    </div>
  );
};

export default Dietary;

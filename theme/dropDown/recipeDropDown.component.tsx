/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./DropDown.module.scss";

interface dropDown {
  elemList?: { name: string; value: string }[];
  name?: string;
  style?: object;
  mode?: string;
  selectedValue?: string;
  setSelectedValue?: any;
}
const RecipeDropDown = ({
  style = {},
  elemList,
  name = "dropdown",
  selectedValue = "",
  setSelectedValue = () => {},
}: dropDown): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <select
        name={name}
        id="dropdown"
        className={styles.customSelectbx}
        style={{ ...style }}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
        value={selectedValue}
      >
        {elemList?.map((item, index) => {
          return (
            <option value={item?.value} key={index}>
              {item?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default RecipeDropDown;

//backgroundImage: `url(/icons/dropdown.svg)`

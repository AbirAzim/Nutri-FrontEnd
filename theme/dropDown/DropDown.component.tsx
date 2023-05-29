/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./DropDown.module.scss";

export interface DropDownType {
  listElem?: { name: string; value: string | number }[];
  value?: string | number;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
  name?: string;
}
const DropDown = ({
  listElem = [],
  style = {},
  value = "",
  name = "",
  handleChange = () => {},
}: DropDownType) => {
  return (
    <div className={styles.formGroup}>
      <select
        name={name}
        id="dropdown"
        className={styles.customSelectbx}
        style={{ ...style }}
        onChange={(e) => handleChange(e)}
        value={value}
      >
        {listElem?.map((item, index) => {
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

export default DropDown;

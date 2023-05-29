import React from "react";
import styles from "./CustomCheckbox.module.scss";

type CustomCheckboxProps = {
  value?: string | number;
  name?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disable?: boolean;
  id?: string;
  style?: React.CSSProperties;
};

const CustomCheckbox = ({
  handleChange = () => {},
  checked = false,
  name = "",
  value = "",
  disable = false,
  id = "checkBox",
  style = {},
}: CustomCheckboxProps) => {
  return (
    <label className={styles.checkbxWrap} style={style}>
      <input
        type="checkbox"
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
        checked={checked}
        disabled={disable}
        id={id}
      />{" "}
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CustomCheckbox;

import React from "react";
import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  name: string;
  checked?: boolean;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  handleChange,
  label,
  name,
  value,
  checked = false,
}: RadioButtonProps) => {
  return (
    <label className={styles.radioContainer}>
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default RadioButton;

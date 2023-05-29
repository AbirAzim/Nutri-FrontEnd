import React from "react";
import styles from "./inputGoal.module.scss";

interface InputGoalProps {
  inputValue: null | number;
  setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  style?: React.CSSProperties;
  min?: string;
}

const InputGoal = ({
  inputValue = null,
  setInputValue = (e) => {},
  name = "",
  style = {},
  min = "0",
}: InputGoalProps) => {
  return (
    <input
      style={style}
      name={name}
      type="number"
      min={min}
      className={styles.mainInput}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e);
      }}
    />
  );
};

export default InputGoal;

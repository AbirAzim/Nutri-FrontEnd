import React from "react";
import styles from "./customButton.module.scss";

interface CustomButtonInterface {
  buttonText?: string;
  onClickFunc?: () => void;
}
const CustomButton = ({
  buttonText,
  onClickFunc,
}: CustomButtonInterface) => {
  return (
    <button className={styles.buttonStyle} onClick={onClickFunc}>
      {buttonText}
    </button>
  );
};

export default CustomButton;

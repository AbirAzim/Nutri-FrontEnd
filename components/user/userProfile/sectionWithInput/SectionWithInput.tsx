import React, { useState } from "react";
import styles from "./SectionWithInput.module.scss";
import InputComponent from "../../../../theme/input/input.component";
import CancelIcon from "../../../../public/icons/cancel_black_36dp.svg";

type SectionWithInputProps = {
  title: string;
  value: any;
  setValue: (name: string, value: any) => void;
  fieldName: string;
  maxWidth: string;
  style?: React.CSSProperties;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  fullWidth?: boolean;
  removeInput: (name: string, value: any) => void;
  headingStyle?: React.CSSProperties;
};

const SectionWithInput = ({
  title,
  value,
  setValue,
  fieldName,
  maxWidth,
  style = {},
  type = "text",
  placeholder = "Add you text here",
  textarea = false,
  fullWidth = false,
  removeInput,
  headingStyle = {},
}: SectionWithInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(fieldName, inputValue);
    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e?.target;
    setInputValue(value);
  };
  return (
    <div className={styles.sectionWithInputContainer}>
      <h2 style={headingStyle}>{title}</h2>

      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit}>
          <InputComponent
            maxWidth={maxWidth}
            style={style}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            fullWidth={fullWidth}
            fieldName={fieldName}
            handleChange={handleChange}
          />
        </form>
        <div className={styles.inputContainer__inputValueContainer}>
          {value?.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  styles.inputContainer__inputValueContainer__inputValue
                }
              >
                <span
                  className={
                    styles.inputContainer__inputValueContainer__inputValue__label
                  }
                >
                  {item}
                </span>
                <CancelIcon
                  className={
                    styles.inputContainer__inputValueContainer__inputValue__closeIcon
                  }
                  onClick={() => removeInput(fieldName, item)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionWithInput;

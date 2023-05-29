import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import styles from "./input.module.scss";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  style?: React.CSSProperties;
  value?: string | number;
  placeholder?: string;
  fullWidth?: boolean;
  maxWidth?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  min?: number;
  max?: number;
  borderSecondary?: boolean;
  fieldName?: string;
  inputWithIcon?: boolean;
  icon?: ReactNode | string;
}

function InputComponent(
  {
    type,
    style = {},
    value,
    placeholder,
    fullWidth,
    maxWidth,
    handleChange = () => {},
    name,
    min = 0,
    max,
    borderSecondary = false,
    fieldName = "",
    inputWithIcon = false,
    icon,

    ...InputProps
  }: InputComponentProps,
  ref,
) {
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  type = type || "text";
  style = style || {};
  if (fullWidth) style = { ...style, width: "100%" };
  if (maxWidth) style = { ...style, maxWidth: maxWidth };
  value = value || "";
  placeholder = placeholder || "Add your text here";

  if (inputWithIcon) {
    return (
      <div
        className={`${styles.inputWithIcon} ${
          borderSecondary ? styles.borderSecondary : null
        }`}
      >
        <input
          name={name}
          className={`${styles.input} `}
          type={type}
          style={style}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          ref={ref}
          {...InputProps}
        />
        {typeof icon === "string" ? (
          <img className={styles.icon} src={icon} alt="icon" />
        ) : (
          <div className={styles.icon}>{icon}</div>
        )}
      </div>
    );
  }

  return (
    <input
      name={name}
      className={`${styles.input} ${
        borderSecondary ? styles.borderSecondary : null
      }`}
      type={type}
      style={style}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      ref={ref}
      {...InputProps}
    />
  );
}

export default forwardRef(InputComponent);

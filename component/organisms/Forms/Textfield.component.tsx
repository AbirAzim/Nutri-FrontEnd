/* eslint-disable react/display-name */
import React, { cloneElement, forwardRef, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { CustomStyle } from "./types";
import styles from "./Textfield.module.scss";

interface TextfieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    CustomStyle {
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  startAdornment?: any;
  endAdornment?: any;
  required?: boolean;
  errorText?: string;
  value?: string | number;
  unit?: string;
  accept?: "number" | "string" | "both";
  onChange?: (value: any) => void;
  isPassword?: boolean;
  isUnit?: boolean;
  hidden?: boolean;
}

const Textfield = forwardRef((props: TextfieldProps, ref) => {
  const {
    type,
    name,
    label,
    value,
    placeholder,
    required,
    className,
    style,
    errorText,
    startAdornment,
    endAdornment,
    isPassword,
    isUnit,
    hidden,
    unit,
    accept,
    ...InputProps
  } = props;

  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }

  let endormentClass = "";
  if (isPassword && endAdornment) {
    endormentClass = styles["field_endAdorment--password"];
  }
  if (isUnit && endAdornment) {
    endormentClass = styles["field_endAdorment--password"];
  }
  if (!isPassword && !isUnit && endAdornment) {
    endormentClass = styles.field_endAdorment;
  }
  if (!isPassword && !isUnit && startAdornment) {
    endormentClass = styles.field_startAdornment;
  }

  const onKeyPressHandler = (evt: any) => {
    if (!accept) return true;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (
      accept === "number" &&
      ((charCode !== 46 && charCode < 48) || 57 < charCode)
    )
      return evt.preventDefault();
    if (accept === "string" && 47 < charCode && charCode < 58)
      return evt.preventDefault();
    return true;
  };

  return (
    <div className={`${styles.field} ${endormentClass} ${className}`}>
      {label && (
        <label htmlFor={label} className={required ? styles.required : ""}>
          {label}
        </label>
      )}

      <div className={`${unit ? styles["field-with-unit"] : ""}`}>
        <input
          id={label}
          placeholder={placeholder}
          type={type}
          className={styles["form-control"]}
          value={value}
          ref={ref}
          style={{ ...style, display: hidden ? "none" : "block" }}
          onKeyPress={onKeyPressHandler}
          {...register(name, {
            required: {
              value: required as boolean,
              message: `Please fill the value of ${label} field`,
            },
          })}
          {...InputProps}
        />

        {unit && (
          <span className={styles["field-with-unit__unit"]}>{unit}</span>
        )}

        {startAdornment &&
          cloneElement(startAdornment, {
            className: `${startAdornment.className || ""}`,
          })}
        {endAdornment &&
          cloneElement(endAdornment, {
            className: `${endAdornment.className || ""}`,
          })}
      </div>
      {/* {!hidden && <p style={{ color: 'red', height: 14 }}>{errorText}</p>} */}
    </div>
  );
});

Textfield.defaultProps = {
  type: "text",
  placeholder: "",
  required: false,
  className: "",
  hidden: false,
  accept: "both",
};

export default Textfield;

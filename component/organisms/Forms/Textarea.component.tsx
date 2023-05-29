import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { CustomStyle } from "./types";

import styles from "./Textarea.module.scss";

interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement>,
    CustomStyle {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}
const Textarea = (props: TextareaProps) => {
  const { label, name, placeholder, className, required, ...others } = props;
  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }

  return (
    <div className={`${styles.field} ${className ? className : ""}`}>
      {label && (
        <label htmlFor={label} className={required ? styles.required : ""}>
          {label}
        </label>
      )}
      <textarea
        className={styles["custom-input"]}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: required as boolean,
            message: `Please fill the value of ${label} field`,
          },
        })}
        {...others}
      />
    </div>
  );
};
Textarea.defaultProps = {
  placeholder: "",
};

export default Textarea;

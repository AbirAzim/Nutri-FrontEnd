import React, { InputHTMLAttributes, SyntheticEvent, useState } from "react";
import styles from "./RegisterInput.module.scss";
import VisibilityOffIcon from "../../../public/icons/visibility_off_black_36dp.svg";
import VisibilityIcon from "../../../public/icons/visibility_black_36dp.svg";
import ShowError from "../../showError/ShowError";

interface Inputproperties extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  style?: React.CSSProperties;
  width?: string;
  name?: string;
  register?: any;
  required?: any;
  handleChange?: Function;
  error?: {
    isError?: boolean;
    message?: any;
  };
}
export default function InputField({
  type = "text",
  placeholder = "Inter Input",
  style = {},
  width = "100%",
  name,
  register = () => {},
  required,
  handleChange = () => {},
  error = {
    isError: false,
    message: "error message",
  },
  ...otherProps
}: Inputproperties) {
  // STATE FOR INPUT FEILDS

  //STATE HANDLING FOR PASSWORD VISIBILITY
  const [passVisibility, visibilityState] = useState(false);
  const visiToggle = () => {
    visibilityState(!passVisibility);
  };

  type = type || "text";

  placeholder = placeholder || `${type[0].toUpperCase()}${type.slice(1)}`;

  if (type === "password") {
    return (
      <div style={{ ...style, width: width }}>
        <div className={styles.passwordDiv}>
          <input
            className={styles.input}
            type={passVisibility ? "text" : type}
            placeholder={placeholder}
            {...otherProps}
            {...register(name, {
              onChange: handleChange,
              ...required,
            })}
          />

          <span className={styles.visiIconDiv} onClick={visiToggle}>
            {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        {error?.isError ? <ShowError message={error?.message} /> : null}
      </div>
    );
  }

  return (
    <div style={{ ...style, width: width }}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...otherProps}
        {...register(name, {
          onChange: handleChange,
          ...required,
        })}
      />
      {error?.isError ? <ShowError message={error?.message} /> : null}
    </div>
  );
}

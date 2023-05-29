import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./RadioButton.module.scss";
import { CustomStyle } from "./types";

type Option = {
  value: string;
  id: string;
};

interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement>,
    CustomStyle {
  label?: string;
  name?: string;
  options: Option[] | string[];
  required?: boolean;
  errorText?: string;
  selected?: string;
  className?: string;
}

const RadioButton = (props: RadioButtonProps) => {
  const {
    label,
    options,
    required,
    name,
    className,
    selected,
    onChange,
    ...InputProps
  } = props;

  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }

  const isObj = options.length > 0 && typeof options[0] === "object";

  return (
    <div className={`${styles.field} ${className}`}>
      {label && <h5>{label}</h5>}
      <div className="d-flex">
        {options &&
          options.map((option) => {
            const id = isObj ? (option as Option).id : (option as string);
            const value = isObj ? (option as Option).value : (option as string);
            return (
              <label
                key={value}
                htmlFor={id}
                className={`${styles.custom_radio} mr-20`}
                onClick={onChange as any}
              >
                <input
                  type="radio"
                  id={id}
                  name={name}
                  value={value}
                  checked={value === selected}
                  {...register(name, {
                    required: {
                      value: required as boolean,
                      message: `Please fill the value of ${label} field`,
                    },
                  })}
                  {...InputProps}
                />
                <div className={styles.custom_radio_content}>
                  <h5>{id}</h5>
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default RadioButton;

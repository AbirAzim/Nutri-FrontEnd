import React, { SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./Combobox.module.scss";

interface CustomStyle {
  style?: React.CSSProperties;
}
type Option = {
  value: string;
  label: string;
};

interface ComboboxProps
  extends React.DetailedHTMLProps<
      SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    CustomStyle {
  name?: string;
  label?: string;
  placeholder?: string;
  errorText?: string | React.ReactNode;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: Option[] | string[];
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Combobox = (props: ComboboxProps) => {
  const {
    name,
    label,
    value = "",
    placeholder = "Select",
    required,
    disabled,
    options,
    style,
    className,
    handleChange = () => {},
    ...selectProps
  } = props;

  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext) {
    register = formContext.register;
  }

  const isObj = options.length > 0 && typeof options[0] === "object";

  const Options = (
    <>
      {/* {required ? (
        <option disabled selected value="">
          {placeholder}
        </option>
      ) : (
        <option value="">{placeholder}</option>
      )} */}

      {value === "" ? <option value="">{placeholder}</option> : null}
      {options &&
        options.map((option) => (
          <option
            value={isObj ? (option as Option).value : (option as string)}
            key={isObj ? (option as Option).value : (option as string)}
          >
            {isObj ? (option as Option).label : option}
          </option>
        ))}
    </>
  );

  return (
    <div className={styles.field}>
      {label && <label htmlFor={label}>{label}</label>}
      <select
        name={name}
        id={label}
        value={value}
        disabled={disabled}
        className={`${className} ${styles["custom-input"]}`}
        style={style}
        onChange={handleChange}
        {...selectProps}
        {...register(name, {
          required: {
            value: required as boolean,
            message: `Please fill the value of ${label} field`,
          },
        })}
      >
        {Options}
      </select>
      {/* <p style={{ color: 'red', height: 14 }}>
        {categoryId.name === 'select' && 'Product category is required'}
      </p> */}
    </div>
  );
};

Combobox.defaultProps = {
  options: [
    {
      value: "",
      label: "",
    },
  ],
};

export default Combobox;

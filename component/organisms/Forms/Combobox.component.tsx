import React, { SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { CustomStyle } from "./types";
import styles from "./Combobox.module.scss";

type Option = {
  value: string;
  label: string;
  selected?: boolean;
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
  onChange?: (e: any) => any;
}

const Combobox = (props: ComboboxProps) => {
  const {
    name,
    label,
    value,
    placeholder,
    required,
    disabled,
    options,
    style,
    className,
    onChange,
    ...selectProps
  } = props;

  const formContext = useFormContext();
  let register: any = () => ({
    onChange: onChange,
  });
  if (formContext && !onChange) {
    register = formContext.register;
  }

  const isObj = options.length > 0 && typeof options[0] === "object";

  const Options = (
    <>
      {required ? (
        <option disabled selected value="">
          {placeholder}
        </option>
      ) : (
        <option disabled value="">
          {placeholder}
        </option>
      )}
      {options &&
        options.map((option) => (
          <option
            value={isObj ? (option as Option).value : (option as string)}
            key={isObj ? (option as Option).value : (option as string)}
            selected={(option as Option).selected || false}
          >
            {isObj ? (option as Option).label : option}
          </option>
        ))}
    </>
  );

  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={label} className={required ? styles.required : ""}>
          {label}
        </label>
      )}
      <select
        id={label}
        value={value}
        disabled={disabled}
        className={`${className} ${styles.customSelectbx}`}
        style={{ backgroundImage: `url(/icons/dropdown.svg)`, ...style }}
        {...selectProps}
        {...register(name, {
          required: {
            value: required as boolean,
            message: `Please fill the value of ${label} field`,
          },
        })}
        // onChange={onChange}
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
  options: [],
};

export default Combobox;

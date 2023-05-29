import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  variant?: 'empty';
  className?: string;
}
const Checkbox = (props: CheckboxProps) => {
  const { name, label, variant, className, required, ...others } = props;

  const formContext = useFormContext();
  let register: any = () => {};
  if (formContext && name) {
    register = formContext.register;
  }

  return (
    <label
      data-wsf-tooltip={others.title}
      htmlFor={name}
      className={`${styles['custom-checkbox']} ${
        variant === 'empty' ? styles.empty : ''
      } ${className}`}
    >
      <input
        type="checkbox"
        id={name}
        {...register(name, {
          required: {
            value: required as boolean,
            message: `Please fill the value of ${label} field`,
          },
        })}
        {...others}
      />
      <div className={styles.content}>{label}</div>
    </label>
  );
};

export default Checkbox;

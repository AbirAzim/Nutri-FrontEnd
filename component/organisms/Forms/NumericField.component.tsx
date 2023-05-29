import React, { Fragment, useRef, useEffect, useState } from "react";
import styles from "./NumberField.module.scss";

interface NumberFieldProps {
  minValue?: number;
  valueState?: [number, any];
  label?: string;
  className?: string;
  onChange?: (value: any) => any;
}
const NumberField = (props: NumberFieldProps) => {
  let { minValue, valueState, label, className, onChange } = props;
  const [value, setvalue] = valueState;

  const adjusterFunc = (task: "+" | "-") => {
    if (value <= minValue && task === "-") return;
    if (task === "+") {
      setvalue((value) => value + 1);
    } else {
      setvalue((value) => value - 1);
    }
    onChange &&
      onChange({ target: { value: task === "+" ? value + 1 : value - 1 } });
  };

  const changeNumber = (e) => {
    const ammount = +e.target.value;
    if (typeof ammount === "number" && isFinite(ammount)) {
      setvalue(ammount);
      onChange && onChange({ target: { value: ammount } });
    } else {
      setvalue(0);
    }
  };

  return (
    <Fragment>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.numberField} ${className || ""}`}>
        <div className={styles.numberField__options}>
          <input
            className={styles.text}
            type="text"
            value={value}
            onChange={changeNumber}
          />
          <div className={styles.arrow}>
            <div className={styles.arrow_div}>
              <img
                onClick={() => {
                  adjusterFunc("+");
                }}
                src={"/icons/dropdown.svg"}
                alt="icon"
                width={"17px"}
                height={"15px"}
                className={styles.reverse_arrow}
              />
              <img
                onClick={() => {
                  adjusterFunc("-");
                }}
                src={"/icons/dropdown.svg"}
                alt="icon"
                width={"17px"}
                height={"15px"}
                className={styles.original_arrow}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NumberField.defaultProps = {
  value: 0,
  minValue: 0,
};
export default NumberField;

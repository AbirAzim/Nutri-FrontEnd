import React, { Fragment, useRef, useEffect, useState } from "react";
import styles from "./NumberField.module.scss";

interface NumberFieldProps {
  minValue?: number;
  value?: any;
  label?: string;
  className?: string;
  onChange?: (value: any) => any;
}
const NumberField = (props: NumberFieldProps) => {
  let { minValue, value, label, className, onChange } = props;
  const hasInitialNumberSet = useRef(false);
  const [number, setNumber] = useState<number>(value);

  const adjusterFunc = (task: "+" | "-") => {
    let ammount = number;
    if (number <= minValue && task === "-") {
      ammount = minValue;
    } else {
      if (task === "+") {
        ammount += 1;
      } else {
        ammount -= 1;
      }
    }
    value = ammount;
    onChange && onChange({ target: { value: ammount } });
    setNumber(ammount);
  };

  const changeNumber = (e) => {
    const ammount = +e.target.value;
    console.log(ammount, e.target.value);
    if (typeof ammount === "number" && isFinite(ammount)) {
      value = ammount;
      onChange && onChange({ target: { value: ammount } });
      setNumber(ammount);
    } else {
      setNumber(0);
    }
  };

  // useEffect(() => {
  //   if (value !== 0 && value !== number && !hasInitialNumberSet.current) {
  //     setNumber(value);
  //   }
  // }, [number, value]);

  return (
    <Fragment>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.numberField} ${className || ""}`}>
        <div className={styles.numberField__options}>
          <input
            className={styles.text}
            type="text"
            value={number}
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

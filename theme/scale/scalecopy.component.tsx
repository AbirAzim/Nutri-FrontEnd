/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./scale.module.scss";

interface scaleCompInterface {
  value: string;
  setValue: Function;
  longLineDivider?: number;
  shortLineDivider?: number;
  fieldName: string;
  min: string;
  max: string;
}
export function ScaleComponentCopy(props: scaleCompInterface) {
  const {
    value,
    setValue,
    longLineDivider = 10,
    shortLineDivider = 0,
    fieldName,
    min = 0,
    max = 100,
  } = props;

  const [line, setLine] = useState([]);

  useEffect(() => {
    let array = [];

    for (let i = Number(min); i <= Number(max); i++) {
      array.push(i);
    }
    setLine(array);
  }, []);

  let scaleValue = "0";
  const YLine = ({ value, index }) => {
    let longline = false;
    const style = {
      left: `calc(${index * (100 / (Number(max) - Number(min)))}%)`,
      height: `20px`,
    };

    const number = value % longLineDivider;

    if (number === 0) {
      if (value === Number(min) || value === Number(max)) {
        style.height = "0px";
      } else {
        style.height = "40px";
        longline = value;
      }
    } else {
      if (shortLineDivider) {
        if (number % shortLineDivider !== 0) {
          style.height = "0px";
        }
      }
    }

    const feetConverter = (value) => {
      let tempValue = (value * 0.3937) / 12;
      let tempfeet = Math.floor(tempValue);
      let tempInch = Math.round((tempValue - tempfeet) * 12);
      scaleValue = `${tempfeet}'${tempInch}''`;
    };
    feetConverter(value);

    return (
      <div className={styles.yLine} style={style}>
        {longline && <div className={styles.longline}>{scaleValue}</div>}
      </div>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.scale}>
        <input
          type="range"
          step={1}
          value={value}
          onChange={(e) => setValue(fieldName, e.target.value)}
          min={min}
          max={max}
        />
        <div className={styles.line}>
          {line?.map((no, i) => (
            <YLine key={"linex" + i} value={no} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./Scale.module.scss";
import { ScaleComponent } from "../../../../theme/scale/scale.component";
import { ScaleComponentCopy } from "../../../../theme/scale/scalecopy.component";

type ScaleProps = {
  title: string;
  value: string;
  setValue: Function;
  resultWithText: string;
  fieldName: string;
  min: string;
  max: string;
  longLineDivider?: number;
  shortLineDivider?: number;
};

const ScaleHeight = (props: ScaleProps) => {
  const {
    title,
    value,
    setValue,
    resultWithText,
    fieldName,
    min,
    max,
    longLineDivider,
    shortLineDivider,
  } = props;

  const feetConverter = (value) => {
    let tempValue = (value * 0.3937) / 12;
      let tempfeet = Math.floor(tempValue);
      let tempInch = Math.round((tempValue - tempfeet) * 12);
      return`${tempfeet}'${tempInch}''`;
  };
  return (
    <div className={styles.scaleContainer}>
      <h2>{title}</h2>
      <div className={styles.scaleContainer__scale}>
        <ScaleComponentCopy
          value={value}
          setValue={setValue}
          fieldName={fieldName}
          min={min}
          max={max}
          longLineDivider={longLineDivider}
          shortLineDivider={shortLineDivider}
        />
      </div>
      <h3>
        {feetConverter(value)} {resultWithText}
      </h3>
    </div>
  );
};

export default ScaleHeight;

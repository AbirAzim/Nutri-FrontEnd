import React from "react";
import s from "./index.module.scss";

interface Props {
  dailyAverage: number;
  dailyRecomended: number;
  attainment: number;
  upperLimit: number;
  units?: string;
}

const LineChartHeadingForIngredient = ({
  attainment = 0,
  dailyAverage = 0,
  dailyRecomended = 0,
  upperLimit = 0,
  units = "",
}: Props) => {
  const unitsLowerCase = units?.toLowerCase();
  const handleToFixed = (nam: number, toFixedLength: number = 2) => {
    return nam?.toFixed(toFixedLength);
  };
  return (
    <div className={s.description}>
      <div className={s.singleItem}>
        <p>Daily Average</p>
        <p>
          <span>{handleToFixed(dailyAverage)}</span>
          {unitsLowerCase}
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Daily Recommended</p>
        <p>
          <span>{handleToFixed(dailyRecomended)}</span>
          {unitsLowerCase}
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Attainment</p>
        <p>
          <span>{handleToFixed(attainment)}</span>
          {unitsLowerCase}
        </p>
      </div>
      <div className={s.singleItem}>
        <p>Upper Limit</p>
        <p>
          <span>{handleToFixed(upperLimit)}</span>
          {unitsLowerCase}
        </p>
      </div>
    </div>
  );
};

export default LineChartHeadingForIngredient;

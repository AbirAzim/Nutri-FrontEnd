import React, { Dispatch, SetStateAction, useState } from "react";
import s from "./index.module.scss";
const chartDuration = [
  {
    name: "Week",
    value: "W",
  },
  {
    name: "Month",
    value: "M",
  },
  {
    name: "YTD",
    value: "YD",
  },
  {
    name: "Year",
    value: "Y",
  },
];

interface Props {
  fetchChartData?: (type?: string) => void;
  chartDurationPoint?: string;
  setChartDurationPoint?: Dispatch<SetStateAction<string>>;
}

const LineChartDuration = ({
  fetchChartData,
  chartDurationPoint = "M",
  setChartDurationPoint,
}: Props) => {
  const handleChartPoint = (point: string) => {
    setChartDurationPoint(point);
    fetchChartData(point);
  };
  return (
    <div className={s.lineChartDurationPointBox}>
      {chartDuration?.map((point) => {
        return (
          <p
            key={point?.value}
            className={`${s.term} ${
              chartDurationPoint === point?.value ? s.active : ""
            }`}
            onClick={() => handleChartPoint(point?.value)}
          >
            {point?.name}
          </p>
        );
      })}
    </div>
  );
};

export default LineChartDuration;

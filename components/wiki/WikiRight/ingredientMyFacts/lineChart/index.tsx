import React, { useState } from "react";
import { Portion } from "../../../../../type/wikiListType";
import s from "./index.module.scss";
import LineChart from "./LineChart";
import LineChartDuration from "./LineChartDuration";
import LineChartHeadingForIngredient from "./LineChartHeadingForIngredient";
interface Props {
  stats?: any[];
  portion?: Portion;
  fetchChartData?: (type?: string) => void;
  loading?: boolean;
  category?: string;
  dailyAverage?: number;
  dailyRecomended?: number;
  attainment?: number;
  upperLimit?: number;
  units?: string;
}

const LineChartIndex = ({
  portion = { default: true, measurement: "", meausermentWeight: "" },
  stats = [],
  fetchChartData = () => {},
  loading = false,
  category = "",
  attainment = 0,
  dailyAverage = 0,
  dailyRecomended = 0,
  upperLimit = 0,
  units = "",
}: Props) => {
  const [chartDurationPoint, setChartDurationPoint] = useState("M");
  return (
    <div className={s.lineChartContainer}>
      <h2 className={s.title}>Ingredients</h2>
      <LineChartHeadingForIngredient
        dailyAverage={dailyAverage}
        dailyRecomended={dailyRecomended}
        attainment={attainment}
        upperLimit={upperLimit}
        units={units}
      />
      <LineChartDuration
        fetchChartData={fetchChartData}
        chartDurationPoint={chartDurationPoint}
        setChartDurationPoint={setChartDurationPoint}
      />
      <LineChart
        lineChartData={stats}
        loading={loading}
        category={category}
        chartDurationPoint={chartDurationPoint}
        units={units}
      />
    </div>
  );
};

export default LineChartIndex;

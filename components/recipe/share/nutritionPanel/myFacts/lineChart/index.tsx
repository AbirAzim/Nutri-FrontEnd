import React, { useState } from "react";
import { Portion } from "../../../../../../type/wikiListType";
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
}

const LineChartIndex = ({
  portion = { default: true, measurement: "", meausermentWeight: "" },
  stats = [],
  fetchChartData = () => {},
  loading = false,
  category = "",
}: Props) => {
  const [chartDurationPoint, setChartDurationPoint] = useState("M");
  return (
    <div className={s.lineChartContainer}>
      <h2 className={s.title}>Ingredients</h2>
      <LineChartHeadingForIngredient
        portion={portion}
        stats={stats}
        category={category}
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
      />
    </div>
  );
};

export default LineChartIndex;

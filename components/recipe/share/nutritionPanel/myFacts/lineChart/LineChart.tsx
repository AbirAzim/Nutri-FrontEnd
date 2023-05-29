import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import SkeletonElement from "../../../../../../theme/skeletons/SkeletonElement";
import { measurementConverter } from "../measurementConverter";
import s from "./index.module.scss";
import formatDate from "../../../../../../helperFunc/date/formatDate";

interface Props {
  lineChartData?: any[];
  loading?: boolean;
  category?: string;
  chartDurationPoint?: string;
}

const LineChart = ({
  lineChartData = [],
  loading = false,
  category = "",
  chartDurationPoint = "M",
}: Props) => {
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const measurement = measurementConverter(category, payload[0].value);
      const formatedDate = formatDate(new Date(payload[0].payload?._id));
      const durationYearOrYearToday =
        chartDurationPoint === "Y" || chartDurationPoint === "YD";
      return (
        <div className={s.customTooltipBox}>
          <p
            className={s.label}
          >{`Consume : ${measurement?.amount}${measurement?.measurement}`}</p>
          <p className={s.dateLabel}>{`${formatedDate?.month} ${
            durationYearOrYearToday ? "" : formatedDate?.day
          }${durationYearOrYearToday ? "" : ","} ${formatedDate?.year}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className={s.lineChartBoxContainer}>
      {loading ? (
        <SkeletonElement
          type="thumbnail"
          style={{ width: "200px", height: "100px" }}
        />
      ) : lineChartData?.length ? (
        chartDurationPoint === "Y" || chartDurationPoint === "YD" ? (
          <AreaChart
            width={200}
            height={100}
            data={lineChartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <Tooltip content={customTooltip} />
            <Area
              type="monotone"
              dataKey="consumptionInGram"
              stroke="#7dbd3b"
              fill="#d2e7bc"
            />
          </AreaChart>
        ) : (
          <BarChart
            width={200}
            height={100}
            data={lineChartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <Tooltip content={customTooltip} />
            <Bar dataKey="consumptionInGram" fill="#d2e7bc" />
          </BarChart>
        )
      ) : (
        <p className={s.noRecordFound}>No record found</p>
      )}
    </div>
  );
};

export default LineChart;

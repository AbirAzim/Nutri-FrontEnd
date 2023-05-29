import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import styles from "./_Charts.module.scss";

interface MacroMakeupProps {
  data?: any[];
  showBar?: boolean;
}
const MacroMakeup = (props: MacroMakeupProps) => {
  const { data, showBar } = props;
  return (
    <div className={styles.insights__graph}>
      <h3 className="mb-20">Macro Makeup</h3>
      <ResponsiveContainer width={"100%"} height={200}>
        <PieChart margin={{ top: 120 }}>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
          >
            {macroMakeup.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            margin={{ top: 80 }}
            content={CustomLegend}
          />
        </PieChart>
      </ResponsiveContainer>
      {showBar && (
        <ResponsiveContainer width="100%" height={170}>
          <BarChart layout="vertical" data={macroMakeup}>
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              hide
              padding={{ top: 20 }}
              tickLine={false}
              type="category"
              dataKey="name"
            />
            <Bar
              dataKey="value"
              fill="#FFA482"
              layout="vertical"
              background={{
                stroke: "#eee",
                height: 30,
                radius: 20,
                strokeWidth: 1,
                fill: "none",
              }}
              shape={<CustomBar />}
            >
              {macroMakeup.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const CustomBar = (props) => {
  const { fill, x, y, width } = props;
  return (
    <rect
      x={x + 5}
      y={y + 5}
      width={width}
      rx={8}
      height={20}
      fill={fill}
      className={styles.rectangle}
    />
  );
};

const CustomLegend = (props) => {
  const { payload } = props;
  console.log(payload);
  return (
    <ul className={styles.insights__legend}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          {entry?.value}
          <span style={{ backgroundColor: entry?.color }}>
            {entry?.payload?.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

const macroMakeup = [
  { name: "Carbs", value: 400 },
  { name: "Fats", value: 300 },
  { name: "Protein", value: 500 },
];

const COLORS = ["#B9EB84", "#66A7FF", "#FF8252"];

MacroMakeup.defaultProps = {
  data: macroMakeup,
  showBar: true,
};
export default MacroMakeup;

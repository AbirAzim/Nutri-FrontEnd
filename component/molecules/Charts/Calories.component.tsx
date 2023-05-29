import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from "recharts";

import styles from "./_Charts.module.scss";

const Calories = () => {
  return (
    <div className={styles.insights__graph}>
      <h3 className="mb-20">Calories</h3>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart layout="vertical" data={calories}>
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
            {calories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#FEB44F" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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

const calories = [{ name: "Carbs", value: 400 }];

export default Calories;

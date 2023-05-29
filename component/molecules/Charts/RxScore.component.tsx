import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  AreaChart,
  Area,
} from "recharts";

import styles from "./_Charts.module.scss";

interface RxScoreProps {
  rxScore?: any;
}

const RxScore = (props: RxScoreProps) => {
  const [type, setType] = useState<"Weekly" | "Monthly">("Weekly");
  return (
    <div>
      <div className={styles.insights__graph}>
        <h3 className="mb-20">RX Score</h3>
        <div className={styles.stacked__outline}>
          <span>0</span>
          <div className={styles.stacked}>
            <div id="variety" />
            <div id="quality" />
            <div id="quantity">
              <span className={styles.stacked__total}>
                90
                <i>&nbsp;</i>
              </span>
            </div>
          </div>
          <span>100</span>
        </div>
        <div className={styles.insights__score}>
          <span>
            Variety <i style={{ background: "#b9eb84" }}>20</i>
          </span>
          <span>
            Quality <i style={{ background: "#66A7FF", color: "#fff" }}>30</i>
          </span>
          <span>
            Quantity <i style={{ background: "#FF8252", color: "#fff" }}>10</i>
          </span>
        </div>
        <ResponsiveContainer width="100%" height={170}>
          {type === "Weekly" ? (
            <BarChart
              data={rxScore}
              barGap={7}
              barSize={30}
              margin={{
                left: -20,
              }}
            >
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip />
              <Bar dataKey="variety" stackId="a" fill="#FF8252" />
              <Bar dataKey="quality" stackId="a" fill="#66A7FF" />
              <Bar dataKey="quantity" stackId="a" fill="#B9EB84" />
            </BarChart>
          ) : (
            <AreaChart
              width={500}
              height={400}
              data={rxScore}
              margin={{
                left: -20,
              }}
            >
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="variety"
                stackId="1"
                stroke="#FF8252"
                fill="#FF8252"
              />
              <Area
                type="monotone"
                dataKey="quality"
                stackId="1"
                stroke="#66A7FF"
                fill="#66A7FF"
              />
              <Area
                type="monotone"
                dataKey="quantity"
                stackId="1"
                stroke="#B9EB84"
                fill="#B9EB84"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
        <div className={styles.insights__timeframes}>
          <button
            style={type === "Weekly" ? { backgroundColor: "#B9EB84" } : {}}
            onClick={() => setType("Weekly")}
          >
            Weekly
          </button>
          <button
            style={type === "Monthly" ? { backgroundColor: "#B9EB84" } : {}}
            onClick={() => setType("Monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
    </div>
  );
};

export default RxScore;

const rxScore = [
  {
    name: "S",
    variety: 60,
    quality: 34,
    quantity: 23,
  },
  {
    name: "M",
    variety: 15,
    quality: 35,
    quantity: 26,
  },
  {
    name: "T",
    variety: 52,
    quality: 72,
    quantity: 12,
  },
  {
    name: "W",
    variety: 123,
    quality: 74,
    quantity: 93,
  },
  {
    name: "T",
    variety: 82,
    quality: 107,
    quantity: 34,
  },
  {
    name: "F",
    variety: 96,
    quality: 61,
    quantity: 123,
  },
  {
    name: "S",
    variety: 115,
    quality: 24,
    quantity: 23,
  },
];

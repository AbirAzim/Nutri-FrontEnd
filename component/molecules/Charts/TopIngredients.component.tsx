import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList,
} from "recharts";

import styles from "./_Charts.module.scss";

interface IngredientsProps {
  ingredients: any[];
}

const TopIngredients = (props: IngredientsProps) => {
  const { ingredients } = props;
  return (
    <div>
      <div className={styles.insights__graph}>
        <h3>Top Ingredients</h3>
        <h5>Servings</h5>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart layout="vertical" data={ingredients}>
            <XAxis hide type="number" />
            <YAxis
              tickLine={false}
              padding={{ top: 20 }}
              axisLine={false}
              type="category"
              dataKey="name"
            />
            <Bar
              dataKey="quantity"
              fill="#FFA482"
              layout="vertical"
              barSize={30}
              shape={<CustomBar />}
            >
              <LabelList
                dataKey="icon"
                position="left"
                content={renderCustomizedLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopIngredients;

const CustomBar = (props) => {
  const { fill, x, y, width, payload } = props;
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        rx={5}
        height={30}
        fill={fill}
        className={styles.rectangle}
      />
      <text x={x + 10} y={y + 20} fill="#333">
        {payload?.quantity} | {payload?.label}
      </text>
    </>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, value } = props;
  return <image x={x - 40} y={y - 2} href={value} height="30" width="30" />;
};

const ingredients = [
  {
    icon: "https://freepngimg.com/thumb/orange/19-orange-png-image-download.png",
    label: "Orange",
    quantity: 22,
  },
  {
    icon: "https://freepngimg.com/thumb/strawberry/1-strawberry-png-images.png",
    label: "Strawberry",
    quantity: 18,
  },
  {
    icon: "https://freepngimg.com/thumb/apple/9-apple-png-image.png",
    label: "Apple",
    quantity: 15,
  },
  {
    icon: "https://freepngimg.com/thumb/mango/1-2-mango-png.png",
    label: "Mango",
    quantity: 15,
  },
  {
    icon: "https://freepngimg.com/thumb/pineapple/2-pineapple-png-image-download.png",
    label: "Pineapple",
    quantity: 15,
  },
];

TopIngredients.defaultProps = {
  ingredients,
};

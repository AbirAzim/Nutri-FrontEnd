import React from "react";
import Linearcomponent from "../../../../../theme/linearProgress/LinearProgress.component";
import IngredientPanelSkeleton from "../../../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";
import s from "./index.module.scss";

interface Props {
  loading?: boolean;
  barChartData?: any[];
  fetchChartData?: (type?: string) => void;
  wikiId?: string;
  category?: string;
}

const BarChart = ({
  loading = false,
  barChartData = [],
  fetchChartData = () => {},
  wikiId = "",
  category = "",
}: Props) => {
  return (
    <div className={s.barChartContainer}>
      <p className={s.title}>Your top sources</p>
      <p className={s.subTitle}>{category}</p>

      {loading ? (
        <IngredientPanelSkeleton />
      ) : barChartData?.length ? (
        barChartData?.map(
          (
            { defaultPortion, totalAmount, units, _id, ingredientName },
            index,
          ) => {
            return (
              <Linearcomponent
                name={ingredientName}
                percent={parseInt(totalAmount?.toFixed(2))}
                key={index}
                units={units}
                highestValue={barChartData?.[0]?.totalAmount}
                ingredientId={_id}
                portion={defaultPortion}
                highLight={wikiId === _id}
              />
            );
          },
        )
      ) : (
        <p className={s.noIngredient}>No ingredient found</p>
      )}
    </div>
  );
};

export default BarChart;

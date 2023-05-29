import React from "react";
import Linearcomponent from "../../../../../../theme/linearProgress/LinearProgress.component";
import IngredientPanelSkeleton from "../../../../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";
import { measurementConverter } from "../measurementConverter";
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
          ({ name, consumptionInGram, _id, portion }, index) => {
            const measurement = measurementConverter(
              category,
              consumptionInGram,
            );
            return (
              <Linearcomponent
                name={name}
                // percent={parseInt(consumptionInGram?.toFixed(2))}
                percent={measurement?.amount}
                key={index}
                // units="G"
                units={measurement?.measurement}
                highestValue={
                  measurementConverter(
                    category,
                    barChartData[0]?.consumptionInGram,
                  )?.amount
                }
                ingredientId={_id}
                portion={portion}
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

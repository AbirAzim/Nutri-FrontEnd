import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import GET_NUTRIENT_STATS from "../../../../gqlLib/wiki/query/getNutrientStats";
import { useAppSelector } from "../../../../redux/hooks";
import BarChart from "./barChart";
import s from "./index.module.scss";
import LineChartIndex from "./lineChart";

interface Props {
  wikiId: string;
}

const IngredientMyFactsIndex = ({ wikiId }: Props) => {
  const [getNutrientStats, { data, loading, error }] = useLazyQuery(
    GET_NUTRIENT_STATS,
    { fetchPolicy: "cache-and-network" },
  );
  const { dbUser } = useAppSelector((state) => state?.user);

  const fetchData = async (type?: string) => {
    const today = new Date().toISOString().slice(0, 10);
    try {
      const { data } = await getNutrientStats({
        variables: {
          nutrientId: wikiId,
          memberId: dbUser?._id,
          currentDate: `${today}`,
          type: type || "M",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.myFactsContainer}>
      <LineChartIndex
        stats={data?.testGetNuteientsStats?.dateStats}
        portion={data?.testGetNuteientsStats?.portion}
        fetchChartData={fetchData}
        loading={loading}
        category={data?.testGetNuteientsStats?.category}
        dailyAverage={data?.testGetNuteientsStats?.dailyAverage}
        dailyRecomended={data?.testGetNuteientsStats?.dailyRecomended}
        attainment={data?.testGetNuteientsStats?.attainment}
        upperLimit={data?.testGetNuteientsStats?.upperLimit}
        units={data?.testGetNuteientsStats?.units}
      />
      <BarChart
        loading={loading}
        barChartData={
          data?.testGetNuteientsStats?.ingredientStats
            ? data?.testGetNuteientsStats?.ingredientStats
            : []
        }
        fetchChartData={fetchData}
        wikiId={wikiId}
        category={data?.testGetNuteientsStats?.category}
      />
    </div>
  );
};

export default IngredientMyFactsIndex;

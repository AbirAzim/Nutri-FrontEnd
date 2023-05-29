import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import GET_ALL_INGREDIENTS_DATA_BASED_ON_NUTRITION from "../gqlLib/ingredient/query/getAllIngredientsDataBasedOnNutrition";

const useGetAllIngredientsDataBasedOnNutrition = (
  nutritionID: string,
  category: string,
  isRankingTab: boolean
) => {
  const [GetAllIngredientsDataBasedOnNutrition, { data, loading, error }] =
    useLazyQuery(GET_ALL_INGREDIENTS_DATA_BASED_ON_NUTRITION, {
      // fetchPolicy: "network-only",
    });

  useEffect(() => {
    if (isRankingTab && nutritionID && category) {
      GetAllIngredientsDataBasedOnNutrition({
        variables: {
          data: {
            nutritionID,
            category,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutritionID, category, isRankingTab]);

  return { data, loading, error };
};

export default useGetAllIngredientsDataBasedOnNutrition;

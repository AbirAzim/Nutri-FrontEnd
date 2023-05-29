import { useLazyQuery } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import notification from "../components/utility/reactToastifyNotification";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";

interface IngredientsInfo {
  ingredientId: string;
  value: number;
}

const useGetBlendNutritionBasedOnRecipexxx = () => {
  const [getNutrientsListAndGiGlByIngredients, { ...rest }] = useLazyQuery(
    GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS,
  );

  const fetchData = (ingredientsInfo: IngredientsInfo[]) => {
    try {
      getNutrientsListAndGiGlByIngredients({
        variables: {
          ingredientsInfo,
        },
      });
    } catch (error) {
      notification("error", "failed to fetch nutrients list");
    }
  };

  const handleFetchIngrdients = (
    selectedIngredientsList: Array<any> = [],
    nutritionState: any = {},
    SetcalculateIngOz: Dispatch<SetStateAction<number>> = () => {},
    isRecipeDetailsPage: boolean = false,
  ) => {
    if (isRecipeDetailsPage) {
      if (nutritionState?.ingredientId?._id) {
        // Single Ingredient Details
        const value = nutritionState?.selectedPortion?.gram;
        const quantity = nutritionState?.selectedPortion?.quantity;
        const data = [
          {
            ingredientId: nutritionState?.ingredientId?._id,
            value: parseFloat(value) * parseFloat(quantity),
          },
        ];
        fetchData(data);
      } else {
        const data = selectedIngredientsList?.map((item) => ({
          ingredientId: item?.ingredientId?._id,
          value:
            parseFloat(item?.selectedPortion?.gram) *
            parseFloat(item?.selectedPortion?.quantity),
        }));
        fetchData(data);
      }
    } else {
      // Single Ingredient Details
      if (nutritionState?._id) {
        const value = nutritionState?.selectedPortion?.gram;
        const quantity = nutritionState?.selectedPortion?.quantity;
        if (value) {
          const data = [
            {
              ingredientId: nutritionState?._id,
              value: parseFloat(value) * parseFloat(quantity),
            },
          ];
          fetchData(data);
        }
      } else {
        let ingArr = [];
        let ozArr = 0;
        selectedIngredientsList
          ?.filter((ing) => ing?.ingredientStatus === "ok")
          ?.forEach((item) => {
            const defaultPortion = item?.portions?.find((item) => item.default);
            let value: any = 0;
            if (item.hasOwnProperty("selectedPortion")) {
              value =
                parseFloat(item?.selectedPortion?.gram) *
                parseFloat(item?.selectedPortion?.quantity);
            } else {
              value = defaultPortion?.meausermentWeight;
            }
            ozArr += value && parseInt(value);
            if (value) {
              ingArr?.push({
                ingredientId: item?._id,
                value: parseFloat(value),
              });
            }
          });
        SetcalculateIngOz(Math?.round(ozArr * 0.033814));
        fetchData(ingArr);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return { handleFetchIngrdients, ...rest };
};

export default useGetBlendNutritionBasedOnRecipexxx;

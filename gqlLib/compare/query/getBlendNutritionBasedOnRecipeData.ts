import { gql } from "@apollo/client";

const GET_BLEND_NUTRITION_BASED_ON_RECIPE_DATA = gql`
  query GetBlendNutritionBasedOnRecipeData($recipeId: String!) {
    getBlendNutritionBasedOnRecipeData(recipeId: $recipeId)
  }
`;

export default GET_BLEND_NUTRITION_BASED_ON_RECIPE_DATA;

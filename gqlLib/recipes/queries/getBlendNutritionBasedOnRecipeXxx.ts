import { gql } from "@apollo/client";

const GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX = gql`
  query GetBlendNutritionBasedOnRecipexxx(
    $ingredientsInfo: [BlendIngredientInfo!]!
  ) {
    getBlendNutritionBasedOnRecipexxx(ingredientsInfo: $ingredientsInfo)
  }
`;
export default GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX;

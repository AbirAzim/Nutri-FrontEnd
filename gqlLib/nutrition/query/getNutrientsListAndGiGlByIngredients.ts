import { gql } from "@apollo/client";

const GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS = gql`
  query GetNutrientsListAndGiGlByIngredients(
    $ingredientsInfo: [BlendIngredientInfo!]!
  ) {
    getNutrientsListAndGiGlByIngredients(ingredientsInfo: $ingredientsInfo) {
      nutrients
      giGl {
        totalGi
        netCarbs
        totalGL
      }
    }
  }
`;

export default GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS;

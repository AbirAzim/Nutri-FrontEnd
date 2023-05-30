import { gql } from "@apollo/client";

export const GET_INGREDIENTS = gql`
  query GetIngredients($classType: String!) {
    filterIngredientByCategoryAndClass(
      data: { ingredientCategory: $classType, IngredientClass: 0 }
    ) {
      value: _id
      label: ingredientName
      featuredImage
      portions {
        measurement
        meausermentWeight
        default
      }
    }
  }
`;

export const GET_INGREDIENTS_RXFACT = gql`
  query GetIngredientsFact($ingredients: [BlendIngredientInfo!]!) {
    getIngredientsFact: getNutrientsListAndGiGlByIngredientsForScrappingPanel(
      ingredientsInfo: $ingredients
    ) {
      nutrients {
        name
        units
        value
      }
      giGl {
        totalGL
        netCarbs
      }
    }
  }
`;

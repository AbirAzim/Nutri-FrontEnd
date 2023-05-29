import { gql } from "@apollo/client";

const SEARCH_IN_SCRAPPED_RECIPE_FROM_USER = gql`
  mutation SearchInScrappedRecipeFromUser(
    $recipeIngredients: [String!]
    $isClient: Boolean
  ) {
    searchInScrappedRecipeFromUser(
      recipeIngredients: $recipeIngredients
      isClient: $isClient
    ) {
      blendIngredients {
        ingredientId
        selectedPortionName
        weightInGram
        db_name
        featuredImage
        quantity
      }
      errorIngredients {
        errorString
        ingredientId
        qaId
      }
      notFoundIndexes
    }
  }
`;

export default SEARCH_IN_SCRAPPED_RECIPE_FROM_USER;

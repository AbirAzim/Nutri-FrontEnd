import { gql } from "@apollo/client";

const GET_A_RECIPE_VERSION_ONLY = gql`
  query GetARecipeVersion($versionId: String!) {
    getARecipeVersion(versionId: $versionId) {
      _id
      servingSize
      recipeId
      recipeInstructions
      postfixTitle
      description
      errorIngredients {
        errorIngredientId: ingredientId
        qaId
        errorString
      }
      ingredients {
        comment
        ingredientId {
          ingredientName
          _id
          images
          featuredImage
        }

        portions {
          name
          gram
          default
          quantity
        }
        weightInGram
        selectedPortion {
          name
          quantity
          gram
        }
      }
    }
  }
`;

export default GET_A_RECIPE_VERSION_ONLY;

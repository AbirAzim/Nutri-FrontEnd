import { gql } from "@apollo/client";

const GET_ALL_RECIPES_WITHIN_COLLECTIONS = gql`
  query GetAllRecipesFromCollection($userId: String!) {
    getAllRecipesFromCollection(userId: $userId) {
      image {
        default
        image
      }
      name
      _id
      description
      prepTime
      cookTime
      totalTime
      recipeYield
      recipeIngredients
      recipeInstructions
      recipeCuisines
      url
      discovery
      favicon
      averageRating
      numberOfRating
      ingredients {
        ingredientId {
          _id
          ingredientName
        }
      }
      notes
      addedToCompare
      userCollections
      defaultVersion {
        postfixTitle
      }
      isMatch
      userId {
        _id
        displayName
        image
      }
    }
  }
`;

export default GET_ALL_RECIPES_WITHIN_COLLECTIONS;

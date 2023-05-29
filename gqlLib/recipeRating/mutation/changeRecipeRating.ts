import { gql } from "@apollo/client";

const CHANGE_RECIPE_RATING = gql`
  mutation ChangeRecipeRating(
    $rating: Float!
    $recipeId: String!
    $userId: String!
  ) {
    changeRecipeRating(Rating: $rating, recipeId: $recipeId, userId: $userId) {
      averageRating
      myRating
      numberOfRating
    }
  }
`;

export default CHANGE_RECIPE_RATING;

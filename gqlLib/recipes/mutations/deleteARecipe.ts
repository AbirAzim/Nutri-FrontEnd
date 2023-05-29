import { gql } from "@apollo/client";

const DELETE_A_RECIPE = gql`
  mutation DeleteARecipe($userId: String!, $recipeId: String!) {
    deleteARecipe(userId: $userId, recipeId: $recipeId)
  }
`;

export default DELETE_A_RECIPE;

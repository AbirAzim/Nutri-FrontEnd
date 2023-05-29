import { gql } from "@apollo/client";

const REMOVE_A_RECIPE_VERSION = gql`
  mutation RemoveARecipeVersion(
    $isTurnedOn: Boolean!
    $userId: String!
    $recipeId: String!
    $versionId: String!
  ) {
    removeARecipeVersion(
      isTurnedOn: $isTurnedOn
      userId: $userId
      recipeId: $recipeId
      versionId: $versionId
    )
  }
`;
export default REMOVE_A_RECIPE_VERSION;

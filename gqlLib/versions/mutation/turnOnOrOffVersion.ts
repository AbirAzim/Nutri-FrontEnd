import { gql } from "@apollo/client";

const TURN_ON_OR_OFF_VERSION = gql`
  mutation TurnedOnOrOffVersion(
    $turnedOn: Boolean!
    $versionId: String!
    $recipeId: String!
    $userId: String!
  ) {
    turnedOnOrOffVersion(
      turnedOn: $turnedOn
      versionId: $versionId
      recipeId: $recipeId
      userId: $userId
    )
  }
`;

export default TURN_ON_OR_OFF_VERSION;

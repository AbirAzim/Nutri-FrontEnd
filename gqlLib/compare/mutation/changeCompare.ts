import { gql } from "@apollo/client";

const CHANGE_COMPARE = gql`
  mutation ChangeCompare($userId: String!, $recipeId: String!) {
    changeCompare(userId: $userId, recipeId: $recipeId)
  }
`;

export default CHANGE_COMPARE;

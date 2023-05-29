import { gql } from "@apollo/client";

const GET_DEFAULT_PORTION = gql`
  query GetDefaultPortion($ingredientId: String!) {
    getDefaultPortion(ingredientId: $ingredientId)
  }
`;

export default GET_DEFAULT_PORTION;

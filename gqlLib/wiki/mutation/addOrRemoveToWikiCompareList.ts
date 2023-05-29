import { gql } from "@apollo/client";

const ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST = gql`
  mutation AddOrRemoveToWikiCompareList(
    $ingredientId: String!
    $userId: String!
  ) {
    addOrRemoveToWikiCompareList(ingredientId: $ingredientId, userId: $userId)
  }
`;
export default ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST;

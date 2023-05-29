import { gql } from "@apollo/client";

const EMPTY_COMPARE_LIST = gql`
  mutation EmptyCompareList($userId: String!) {
    emptyCompareList(userId: $userId)
  }
`;

export default EMPTY_COMPARE_LIST;

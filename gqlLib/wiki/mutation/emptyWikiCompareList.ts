import { gql } from "@apollo/client";

const EMPTY_WIKI_COMPARE_LIST = gql`
  mutation EmptyWikiCompareList($userId: String!) {
    emptyWikiCompareList(userId: $userId)
  }
`;

export default EMPTY_WIKI_COMPARE_LIST;

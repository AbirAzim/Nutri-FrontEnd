import { gql } from "@apollo/client";

const REMOVE_WIKI_COMMENT = gql`
  mutation RemoveAWikiComment($userId: String!, $commentId: String!) {
    removeAWikiComment(userId: $userId, commentId: $commentId)
  }
`;

export default REMOVE_WIKI_COMMENT;

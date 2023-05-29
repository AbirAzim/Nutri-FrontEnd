import { gql } from "@apollo/client";

const REMOVE_A_BLOG_COMMENT = gql`
  mutation RemoveABlogComment($memberId: String!, $commentId: String!) {
    removeABlogComment(memberId: $memberId, commentId: $commentId)
  }
`;

export default REMOVE_A_BLOG_COMMENT;

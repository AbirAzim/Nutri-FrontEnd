import { gql } from "@apollo/client";

const GET_ALL_COMMENTS_FOR_A_BLOG = gql`
  query GetAllCommentsForABlog($blogId: String!) {
    getAllCommentsForABlog(blogId: $blogId) {
      _id
      blogId
      comment
      createdAt
      updatedAt
      memberId {
        firstName
        lastName
        displayName
        image
        _id
      }
    }
  }
`;

export default GET_ALL_COMMENTS_FOR_A_BLOG;

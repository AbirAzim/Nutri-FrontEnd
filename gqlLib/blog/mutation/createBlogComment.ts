import { gql } from "@apollo/client";

const CREATE_BLOG_COMMENT = gql`
  mutation CreateBlogComment($data: CreateNewBlogComment!) {
    createBlogComment(data: $data) {
      _id
      blogId
      comment
      createdAt
      updatedAt
      memberId {
        _id
        displayName
        firstName
        image
        lastName
      }
    }
  }
`;

export default CREATE_BLOG_COMMENT;

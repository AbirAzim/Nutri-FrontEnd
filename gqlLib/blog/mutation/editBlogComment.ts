import { gql } from "@apollo/client";

const EDIT_BLOG_COMMENT = gql`
  mutation EditBlogComment($data: EditBlogComment!) {
    editBlogComment(data: $data) {
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

export default EDIT_BLOG_COMMENT;

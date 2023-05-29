import { gql } from "@apollo/client";

const ADD_TO_LAST_MODIFIED_BLOG_COLLECTION = gql`
  mutation AddToLastModifiedBlogCollection(
    $blogId: String!
    $memberId: String!
  ) {
    addToLastModifiedBlogCollection(blogId: $blogId, memberId: $memberId) {
      _id
      name
    }
  }
`;

export default ADD_TO_LAST_MODIFIED_BLOG_COLLECTION;

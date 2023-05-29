import { gql } from "@apollo/client";

const DELETE_BLOG_COLLECTION = gql`
  mutation DeleteBlogCollection($memberId: String!, $collectionId: String!) {
    deleteBlogCollection(memberId: $memberId, collectionId: $collectionId) {
      blogCollections {
        blogs
        _id
        collectionDataCount
        image
        name
        slug
      }
    }
  }
`;

export default DELETE_BLOG_COLLECTION;

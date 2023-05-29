import { gql } from "@apollo/client";

const GET_ALL_BLOG_COLLECTIONS = gql`
  query GetAllBlogCollections($memberId: String!) {
    getAllBlogCollections(memberId: $memberId) {
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

export default GET_ALL_BLOG_COLLECTIONS;

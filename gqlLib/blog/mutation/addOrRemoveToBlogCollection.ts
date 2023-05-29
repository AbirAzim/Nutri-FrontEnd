import { gql } from "@apollo/client";

const ADD_OR_REMOVE_TO_BLOG_COLLECTION = gql`
  mutation AddOrRemoveToBlogCollection(
    $blogId: String!
    $memberId: String!
    $collectionIds: [String!]!
  ) {
    addOrRemoveToBlogCollection(
      blogId: $blogId
      memberId: $memberId
      collectionIds: $collectionIds
    ) {
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

export default ADD_OR_REMOVE_TO_BLOG_COLLECTION;

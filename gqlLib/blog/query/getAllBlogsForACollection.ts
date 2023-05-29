import { gql } from "@apollo/client";

const GET_ALL_BLOGS_FOR_A_COLLECTION = gql`
  query GetAllBlogsForACollection(
    $page: Float
    $limit: Float
    $slug: String!
    $memberId: String!
  ) {
    getAllBlogsForACollection(
      page: $page
      limit: $limit
      slug: $slug
      memberId: $memberId
    ) {
      totalBlogs
      collectionInfo {
        _id
        name
      }
      blogs {
        _id
        coverImage
        mediaLength
        mediaUrl
        publishDate
        slug
        title
        publishDateString
        type
        commentsCount
        blogCollections
        createdBy {
          _id
          displayName
          firstName
          image
          lastName
        }
      }
    }
  }
`;

export default GET_ALL_BLOGS_FOR_A_COLLECTION;

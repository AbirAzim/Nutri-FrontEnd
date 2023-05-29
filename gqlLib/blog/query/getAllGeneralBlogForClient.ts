import { gql } from "@apollo/client";

const GET_ALL_GENERAL_BLOG_FOR_CLIENT = gql`
  query GetAllGeneralBlogForClient($memberId: String!, $currentDate: String!) {
    getAllGeneralBlogForClient(memberId: $memberId, currentDate: $currentDate) {
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
`;

export default GET_ALL_GENERAL_BLOG_FOR_CLIENT;

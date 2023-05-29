import { gql } from "@apollo/client";

const GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY = gql`
  query GetAllWikiCommentsForAWikiEntity($userId: String!, $entityId: String!) {
    getAllWikiCommentsForAWikiEntity(userId: $userId, entityId: $entityId) {
      _id
      comment
      createdAt
      entityId
      type
      updatedAt
      userId {
        _id
        email
        displayName
        firstName
        image
        lastName
      }
    }
  }
`;

export default GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY;

import { gql } from "@apollo/client";

const CREATE_WIKI_COMMENT = gql`
  mutation Mutation($data: CreateWikiComment!) {
    createWikiComment(data: $data) {
      _id
      comment
      createdAt
      entityId
      type
      updatedAt
      userId {
        _id
        displayName
        email
        firstName
        image
        lastName
      }
    }
  }
`;

export default CREATE_WIKI_COMMENT;

import { gql } from "@apollo/client";

const CREATE_NEW_NOTE = gql`
  mutation Mutation($data: CreateNewNote!) {
    createNewNote(data: $data) {
      _id
      title
      body
      updatedAt
      createdAt
    }
  }
`;
export default CREATE_NEW_NOTE;

import { gql } from "@apollo/client";

const EDIT_MY_NOTE = gql`
  mutation Mutation($editMyNoteData2: EditUserNote!) {
    editMyNote(data: $editMyNoteData2) {
      _id
      title
      body
      createdAt
      updatedAt
    }
  }
`;

export default EDIT_MY_NOTE;

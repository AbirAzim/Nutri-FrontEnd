import { gql } from "@apollo/client";

const DELETE_MY_NOTE = gql`
  mutation Mutation($data: RemoveNote!) {
    removeMyNote(data: $data) {
      _id
      title
      body
      createdAt
      updatedAt
    }
  }
`;

export default DELETE_MY_NOTE;

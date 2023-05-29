import { gql } from "@apollo/client";

const EDIT_COLLECTION = gql`
  mutation Mutation($data: EditCollection!) {
    editACollection(data: $data)
  }
`;

export default EDIT_COLLECTION;

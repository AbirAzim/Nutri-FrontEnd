import { gql } from "@apollo/client";

const EDIT_USER_BY_ID = gql`
  mutation Mutation($data: EditUser!) {
    editUserById(data: $data)
  }
`;

export default EDIT_USER_BY_ID;

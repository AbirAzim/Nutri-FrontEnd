import { gql } from "@apollo/client";

const GET_ALL_ADMIN = gql`
  query GetAllAdmin {
    getAllAdmin {
      _id
      firstName
      lastName
    }
  }
`;

export default GET_ALL_ADMIN;

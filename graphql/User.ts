import { gql } from "@apollo/client";

export const GET_ALL_USER_LIST = gql`
  query GetAllUsers {
    getAllusers {
      displayName
      email
    }
  }
`;

//prod

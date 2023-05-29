import { gql } from "@apollo/client";

const GET_LAST_MODIFIED_COLLECTION = gql`
  query Query($userEmail: String!) {
    getLastModifieldCollection(userEmail: $userEmail) {
      _id
      name
    }
  }
`;

export default GET_LAST_MODIFIED_COLLECTION;

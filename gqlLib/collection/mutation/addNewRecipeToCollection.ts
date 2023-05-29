import { gql } from "@apollo/client";

const ADD_NEW_RECIPE_TO_COLLECTION = gql`
  mutation AddTolastModifiedCollection(
    $data: AddToLastModifiedCollectionInput!
  ) {
    addTolastModifiedCollection(data: $data) {
      _id
      name
    }
  }
`;
export default ADD_NEW_RECIPE_TO_COLLECTION;

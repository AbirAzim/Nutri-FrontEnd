import { gql } from "@apollo/client";

const ADD_OR_REMOVE_RECIPE_FORM_COLLECTION = gql`
  mutation AddOrRemoveRecipeFromCollection(
    $data: AddOrRemoveRecipeFromCollectionInput!
  ) {
    addOrRemoveRecipeFromCollection(data: $data) {
      _id
    }
  }
`;

export default ADD_OR_REMOVE_RECIPE_FORM_COLLECTION;

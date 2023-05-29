import { gql } from "@apollo/client";

const REMOVE_EXISTING_RECIPE_TO_ANOTHER_COLLECTION = gql`
  mutation Mutation($data: AddCRecipeTOAUserCollectionInput!) {
    removeRecipeFromAColection(data: $data) {
      _id
      name
      image
      recipes {
        image {
          default
          image
        }
        name
        _id
      }
    }
  }
`;

export default REMOVE_EXISTING_RECIPE_TO_ANOTHER_COLLECTION;

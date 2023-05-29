import { gql } from "@apollo/client";

const CREATE_NEW_COLLECTION = gql`
  mutation CreateNewCollection($data: CreateNewCollection!) {
    createNewCollection(data: $data) {
      _id
      name
      recipes {
        recipeId {
          image {
            default
            image
          }
          name
          _id
        }
      }
      image
      slug
    }
  }
`;
export default CREATE_NEW_COLLECTION;

import { gql } from "@apollo/client";

const DELETE_COLLECTION = gql`
  mutation Mutation($data: RemoveACollectionInput!) {
    deleteCollection(data: $data) {
      _id
      name
      image
      slug
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

export default DELETE_COLLECTION;

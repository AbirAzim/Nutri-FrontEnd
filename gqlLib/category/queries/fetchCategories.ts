import { gql } from "@apollo/client";

export const FETCH_BLEND_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      _id
      name
      image
      icon
    }
  }
`;

import { gql } from "@apollo/client";

const GET_ALL_BLEND_NUTRIENTS_CATEGORIES = gql`
  query GetAllBlendNutrientCategories {
    getAllBlendNutrientCategories {
      _id
      categoryName
    }
  }
`;

export default GET_ALL_BLEND_NUTRIENTS_CATEGORIES;

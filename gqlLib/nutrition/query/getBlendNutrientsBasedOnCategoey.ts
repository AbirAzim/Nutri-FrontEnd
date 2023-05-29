import { gql } from "@apollo/client";

const GET_BLEND_NUTRIENTS_BASED_ON_CATEGORY = gql`
  query GetBlendNutrientsBasedOnCategoey($nutrientCategoryId: String!) {
    getBlendNutrientsBasedOnCategoey(nutrientCategoryId: $nutrientCategoryId) {
      _id
      nutrientName
    }
  }
`;

export default GET_BLEND_NUTRIENTS_BASED_ON_CATEGORY;

import { gql } from "@apollo/client";

const GET_ALL_BLEND_NUTRIENTS = gql`
  query GetAllBlendNutrients {
    getAllBlendNutrients {
      _id
      nutrientName
      category {
        _id
      }
    }
  }
`;

export default GET_ALL_BLEND_NUTRIENTS;

import { gql } from "@apollo/client";

const GET_ALL_INGREDIENTS_DATA_BASED_ON_NUTRITION = gql`
  query GetAllIngredientsDataBasedOnNutrition(
    $data: GetIngredientsFromNutrition!
  ) {
    getAllIngredientsDataBasedOnNutrition(data: $data) {
      ingredientId
      name
      value
      units
      portion {
        _id
        default
        meausermentWeight
        measurement
      }
    }
  }
`;

export default GET_ALL_INGREDIENTS_DATA_BASED_ON_NUTRITION;

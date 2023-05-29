import { gql } from "@apollo/client";

const GET_NUTRIENT_STATS = gql`
  query TestGetNuteientsStats(
    $nutrientId: String!
    $memberId: String!
    $currentDate: String!
    $type: String
  ) {
    testGetNuteientsStats(
      nutrientId: $nutrientId
      memberId: $memberId
      currentDate: $currentDate
      type: $type
    ) {
      ingredientStats {
        defaultPortion {
          meausermentWeight
          measurement
          default
        }
        units
        totalAmount
        ingredientName
        _id
      }
      dateStats {
        assignDate
        totalAmount
      }
      dailyAverage
      dailyRecomended
      attainment
      upperLimit
      units
    }
  }
`;

export default GET_NUTRIENT_STATS;

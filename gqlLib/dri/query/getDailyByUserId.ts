import { gql } from "@apollo/client";

const GET_DAILY_BY_USER_ID = gql`
  query GetDailyByUserId($userId: String!) {
    getDailyByUserId(userId: $userId) {
      bmi {
        value
        units
      }
      calories {
        value
        units
      }
      nutrients {
        Energy {
          percentage
          showPercentage
          blendNutrientRef
          data {
            units
            value
          }
          nutrientName
          calorieGram
        }
        Minerals {
          nutrientName
          data {
            value
            units
          }
          blendNutrientRef
          showPercentage
          percentage
          calorieGram
        }
        Vitamins {
          nutrientName
          data {
            value
            units
          }
          blendNutrientRef
          showPercentage
          percentage
          calorieGram
        }
      }
    }
  }
`;

export default GET_DAILY_BY_USER_ID;

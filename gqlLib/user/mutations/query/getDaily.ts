import { gql } from "@apollo/client";

export const GET_DAILY_BY_USER_ID = (userId) => gql`
  query {
    getDailyByUserId(userId: "${userId}") {
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
          nutrientName
          blendNutrientRef
          data {
            value
            units
          }
        }
        Minerals {
          nutrientName
          blendNutrientRef
          data {
            value
            units
          }
        }
        Vitamins {
          nutrientName
          blendNutrientRef
          data {
            value
            units
          }
        }
      }
    }
  }
`;
// export const GET_DAILY_BY_USER_ID = (userId) => gql`
//   query {
//     getDailyByUserIdxxx(userId: "${userId}") {
//       bmi {
//         value
//         units
//       }
//       calories {
//         value
//         units
//       }
//       nutrients
//     }
//   }
// `;

export const GET_DAILY_GOALS = (userId) => gql`
  query {
    getDailyGoals(memberId: "${userId}") {
      memberId
      calories
      bmi
      goals
    }
  }
`;

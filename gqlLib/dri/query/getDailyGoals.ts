import { gql } from "@apollo/client";

const GET_DAILY_GOALS = gql`
  query GetDailyGoals($memberId: String!) {
    getDailyGoals(memberId: $memberId) {
      memberId
      goals
      calories {
        goal
        dri
      }
      bmi
    }
  }
`;

export default GET_DAILY_GOALS;

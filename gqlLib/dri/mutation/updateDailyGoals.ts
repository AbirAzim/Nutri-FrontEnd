import { gql } from "@apollo/client";

const UPDATE_DAILY_GOALS = gql`
  mutation UpdateDailyGoals($data: CreateEditDailyGoal!) {
    updateDailyGoals(data: $data)
  }
`;

export default UPDATE_DAILY_GOALS;

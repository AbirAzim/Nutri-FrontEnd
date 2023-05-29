import { gql } from "@apollo/client";

export const UPDATE_DAILY_GOALS = ({ memberId, calories, bmi, goalsArray }) => {
  const arrayToString = (array) => {
    let arrayofStringObject = [];

    array.map((itm) => {
      arrayofStringObject = [
        ...arrayofStringObject,
        `{blendNutrientId:"${itm.blendNutrientId}",goal:${itm.goal}}`,
      ];
    });
    return(`[${arrayofStringObject}]`)
  };

  return gql`
    mutation {
      updateDailyGoals(
        data: {
          memberId: "${memberId}"
          calories: ${calories}
          bmi: ${bmi}
          goals: ${arrayToString(goalsArray)}
        }
      )
    }
  `;
};

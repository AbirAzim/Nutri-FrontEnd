import { gql } from "@apollo/client";

const GET_ALL_NOTES_FOR_A_RECIPE = gql`
  query GetMyNotesForARecipe($data: GetMyNote!) {
    getMyNotesForARecipe(data: $data) {
      _id
      title
      body
      createdAt
      updatedAt
    }
  }
`;
export default GET_ALL_NOTES_FOR_A_RECIPE;

import { gql } from "@apollo/client";

const EDIT_A_RECIPE = gql`
  mutation EditARecipe($data: EditRecipe!, $userId: String!) {
    editARecipe(data: $data, userId: $userId)
  }
`;

export default EDIT_A_RECIPE;

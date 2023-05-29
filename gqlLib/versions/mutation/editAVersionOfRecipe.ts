import { gql } from "@apollo/client";

const EDIT_A_VERSION_OF_RECIPE = gql`
  mutation EditAVersionOfRecipe($data: EditRecipeVersion!) {
    editAVersionOfRecipe(data: $data) {
      isNew
      status
    }
  }
`;

export default EDIT_A_VERSION_OF_RECIPE;

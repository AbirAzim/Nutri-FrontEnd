import { gql } from "@apollo/client";

const EDIT_NUTRIENT_WIKI = gql`
  mutation EditNutrientWiki(
    $editNutrientWikiData2: EditIngredientAndNutrientInWiki!
  ) {
    editNutrientWiki(data: $editNutrientWikiData2)
  }
`;

export default EDIT_NUTRIENT_WIKI;

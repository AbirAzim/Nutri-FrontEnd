import { gql } from "@apollo/client";

const FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS = gql`
  query FilterIngredientByCategoryAndClass($data: IngredientFilter!) {
    filterIngredientByCategoryAndClass(data: $data) {
      _id
      ingredientName
      category
      blendStatus
      classType
      description
      images
      featuredImage
      portions {
        measurement
        meausermentWeight
        default
      }
    }
  }
`;
export default FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS;

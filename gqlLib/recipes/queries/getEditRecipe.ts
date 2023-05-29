import { gql } from "@apollo/client";

export const SEARCH_RESULTS_EDIT_RECIPE = gql`
  query SearchIngredients($term: String!) {
    SearchIngredients(searchTerm: $term) {
      ingredientName
      description
      images
      featuredImage
      nutrients {
        value
        uniqueNutrientRefference {
          nutrient
          category
          unitName
          min
        }
      }
    }
  }
`;

export const NUTRITION_BASED_RECIPE = (array: string) => gql`
  query  {
    getNutritionBasedOnRecipe(
      ingredientsInfo: ${array}
    ) {
      value
      uniqueNutrientRefference {
        _id
        nutrient
        unitName
        category
      }
    }
  }
`;

export const INGREDIENTS_BY_CATEGORY_AND_CLASS = gql`
  query FilterIngredientByCategoryAndClass($classType: String!) {
    filterIngredientByCategoryAndClass(
      data: { ingredientCategory: $classType, IngredientClass: 0 }
    ) {
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
        measurement2
        meausermentWeight
        default
      }
    }
  }
`;

export const BLEND_CATEGORY = gql`
  query {
    getAllCategories {
      _id
      name
    }
  }
`;

// ${itm.selectedPortion.gram}

export const GET_RECIPE_NUTRITION = (ingredients) => {
  const convertArrToString = (arr) => {
    arr = arr?.map((itm) => {
      let value = itm?.portions?.filter((item) => item.default === true);
      value = value[0]?.meausermentWeight;
      return `
            {
              ingredientId: "${itm?._id}",
              value: ${value}
            }
          `;
    });
    arr = `[${arr?.toString()}]`;
    return arr;
  };
  return gql`
  query {
    getBlendNutritionBasedOnRecipexxx(ingredientsInfo: ${convertArrToString(
      ingredients
    )})
  }
  `;
};

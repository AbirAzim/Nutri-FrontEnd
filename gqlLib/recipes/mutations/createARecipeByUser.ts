import { gql } from "@apollo/client";

const CREATE_A_RECIPE_BY_USER = gql`
  mutation AddRecipeFromUser($data: CreateRecipe!) {
    addRecipeFromUser(data: $data) {
      datePublished
      name
      recipeIngredients
      recipeBlendCategory {
        name
      }
      image {
        image
        default
      }
      description
      prepTime
      cookTime
      totalTime
      _id
      url
      favicon
      averageRating
      numberOfRating
      ingredients {
        ingredientId {
          _id
          ingredientName
        }
        weightInGram
        portions {
          name
          quantity
          default
          gram
        }
        selectedPortion {
          name
          quantity
          gram
        }
      }
      notes
      addedToCompare
    }
  }
`;

export default CREATE_A_RECIPE_BY_USER;

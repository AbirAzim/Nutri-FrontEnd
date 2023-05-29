import { gql } from "@apollo/client";

const ADD_VERSION = gql`
  mutation AddVersion($data: AddVersion!) {
    addVersion(data: $data) {
      _id
      description
      postfixTitle
      recipeId
      recipeInstructions
      servingSize
      selectedImage
      errorIngredients {
        errorString
        errorIngredientId: ingredientId
        qaId
      }
      ingredients {
        comment
        ingredientId {
          ingredientName
          _id
          images
          featuredImage
        }

        portions {
          name
          gram
          default
          quantity
        }
        weightInGram
        selectedPortion {
          name
          quantity
          gram
        }
      }
    }
  }
`;

export default ADD_VERSION;

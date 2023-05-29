import { gql } from "@apollo/client";

export const CREATE_NEW_RECIPE = (
  userId,
  name,
  description,
  recipeIngredients,
  ingredients,
  portion
) => gql`
  mutation {
    addRecipeRecipeFromUser(
      data: {
        userId: "619359150dc1bfd62b314757"
        name: "hello"
        description: "none"
        recipeIngredients: [""]
        ingredients: [
          { ingredientId: "61c6e4453a320071dc96ab1a", customWeightInGram: 88 }
          {
            ingredientId: "61c6e4453a320071dc96ab3e"
            portion: { measurement: "Cup", meausermentWeight: "32" }
          }
          { ingredientId: "61c6e4493a320071dc96acc4", customWeightInGram: 44 }
        ]
      }
    ) {
      foodCategories
      ingredients {
        ingredientId
        portion {
          measurement
          meausermentWeight
        }
      }
    }
  }
`;

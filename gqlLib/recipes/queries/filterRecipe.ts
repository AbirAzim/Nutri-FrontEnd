import { gql } from "@apollo/client";

const FILTER_RECIPE = gql`
  query FilterRecipe(
    $userId: String!
    $data: FilterRecipe!
    $page: Float
    $limit: Float
  ) {
    filterRecipe(userId: $userId, data: $data, page: $page, limit: $limit) {
      totalRecipes
      recipes {
        recipeId {
          _id
          name
          image {
            image
            default
          }
          originalVersion {
            _id
            postfixTitle
          }
          userId {
            _id
            displayName
            image
            firstName
            lastName
          }
          brand {
            _id
            brandName
            brandImage
          }
          averageRating
          numberOfRating
        }
        defaultVersion {
          _id
          postfixTitle
          errorIngredients {
            errorString
            errorIngredientId: ingredientId
            qaId
          }
          ingredients {
            comment
            ingredientId {
              _id
              ingredientName
            }
          }
          description
          calorie {
            value
          }
          gigl {
            netCarbs
          }
        }
        isMatch
        allRecipes
        myRecipes
        notes
        addedToCompare
        userCollections
        versionCount
        personalRating
      }
    }
  }
`;

export default FILTER_RECIPE;

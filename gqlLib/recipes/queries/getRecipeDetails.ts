import { gql } from "@apollo/client";

const GET_A_RECIPE = gql`
  query GetARecipe2($userId: String!, $token: String, $recipeId: String) {
    getARecipe2(userId: $userId, token: $token, recipeId: $recipeId) {
      recipeId {
        _id
        name
        image {
          image
          default
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
        servings
        servingSize
        token
        totalRating
        description
        recipeBlendCategory {
          _id
          name
        }
        originalVersion {
          _id
          description
          postfixTitle
          selectedImage
        }
      }
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
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
        selectedImage
      }
      turnedOnVersions {
        _id
        servingSize
        recipeId
        recipeInstructions
        postfixTitle
        description
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
        selectedImage
      }

      turnedOffVersions {
        _id
        servingSize
        recipeId
        recipeInstructions
        postfixTitle
        description
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
        selectedImage
      }
      addedToCompare
      allRecipes
      isMatch
      myRecipes
      notes
      userCollections
      versionsCount
      personalRating
    }
  }
`;

export default GET_A_RECIPE;

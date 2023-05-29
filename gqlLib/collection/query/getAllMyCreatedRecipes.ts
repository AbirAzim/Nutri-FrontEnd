import { gql } from "@apollo/client";

const GET_ALL_MY_CREATED_RECIPES = gql`
  query GetAllMyCreatedRecipes($userId: String!) {
    getAllMyCreatedRecipes(userId: $userId) {
      addedToCompare
      allRecipes
      isMatch
      myRecipes
      notes
      userCollections
      versionCount
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        calorie {
          value
        }
        gigl {
          netCarbs
        }
        ingredients {
          ingredientId {
            ingredientName
            _id
          }
        }
      }
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
          lastName
          firstName
          email
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
          servingSize
          recipeInstructions
          recipeId
        }
      }
    }
  }
`;

export default GET_ALL_MY_CREATED_RECIPES;

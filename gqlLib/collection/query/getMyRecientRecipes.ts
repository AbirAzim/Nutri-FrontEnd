import { gql } from "@apollo/client";

const GET_MY_RECENT_RECIPES = gql`
  query GetMyRecentRecipes($userId: String!) {
    getMyRecentRecipes(userId: $userId) {
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
        ingredients {
          ingredientId {
            _id
            ingredientName
          }
        }
        description
      }
      isMatch
      allRecipes
      myRecipes
      notes
      addedToCompare
      userCollections
      versionCount
    }
  }
`;

export default GET_MY_RECENT_RECIPES;

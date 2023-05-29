import { gql } from "@apollo/client";

const GET_ALL_COLLECTIONS_WITH_RECIPES = gql`
  query GetAllCollectionsWithRecipes($userId: String!) {
    getAllCollectionsWithRecipes(userId: $userId) {
      _id
      canContribute
      canShareWithOther
      description
      image
      isShared
      name
      personalizedName
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
          calorie {
            value
          }
          gigl {
            netCarbs
          }
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
        personalRating
      }
      sharedBy {
        _id
        displayName
        email
        firstName
        image
        lastName
      }
      slug
    }
  }
`;

export default GET_ALL_COLLECTIONS_WITH_RECIPES;

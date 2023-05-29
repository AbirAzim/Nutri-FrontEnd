import { gql } from "@apollo/client";

const GET_ALL_RECIPE_VERSION = gql`
  query GetAllVersions($userId: String!, $recipeId: String!) {
    getAllVersions(userId: $userId, recipeId: $recipeId) {
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
          servingSize
          recipeInstructions
          recipeId
          selectedImage
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
      defaultVersion {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        selectedImage
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
      turnedOffVersions {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        selectedImage
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
      addedToCompare
      allRecipes
      isMatch
      myRecipes
      notes
      userCollections
      versionsCount
      personalRating
      turnedOnVersions {
        _id
        description
        postfixTitle
        recipeId
        recipeInstructions
        servingSize
        selectedImage
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
  }
`;

export default GET_ALL_RECIPE_VERSION;

import { gql } from "@apollo/client";

const CHANGE_DEFAULT_VERSION = gql`
  mutation ChangeDefaultVersion(
    $userId: String!
    $recipeId: String!
    $versionId: String!
    $isTurnedOff: Boolean
  ) {
    changeDefaultVersion(
      userId: $userId
      recipeId: $recipeId
      versionID: $versionId
      isTurnedOff: $isTurnedOff
    ) {
      isMatch
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
    }
  }
`;

export default CHANGE_DEFAULT_VERSION;

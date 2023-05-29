import { gql } from "@apollo/client";

const GET_SHARE_WITH_ME_COLLECTIONS = gql`
  query GetSharedWithMeCollections($userId: String!) {
    getSharedWithMeCollections(userId: $userId) {
      _id
      description
      image
      name
      recipes {
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
        }
        notes
        addedToCompare
        userCollections
        defaultVersion {
          _id
          postfixTitle
        }
        isMatch
        userId {
          _id
          displayName
          image
        }
        recipeVersion {
          _id
          isDefault
          isOriginal
          postfixTitle
          description
        }
        token
      }
      slug
      creatorInfo {
        displayName
        email
        firstName
        image
        lastName
      }
    }
  }
`;

export default GET_SHARE_WITH_ME_COLLECTIONS;

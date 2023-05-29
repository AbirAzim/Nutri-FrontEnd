import { gql } from "@apollo/client";

const GET_ALL_INGREDIENTS_BASED_ON_NURTITION = gql`
  query GetAllIngredientsBasedOnNutrition2(
    $data: GetIngredientsFromNutrition!
    $userId: String
  ) {
    getAllIngredientsBasedOnNutrition2(data: $data, userId: $userId) {
      wikiTitle
      wikiDescription
      wikiCoverImages
      wikiFeatureImage
      bodies
      ingredients {
        portion {
          measurement
          default
          meausermentWeight
        }
        ingredientId
        name
        value
        units
      }
      type
      category
      publishedBy
      isPublished
      commentsCount
      nutrientBookmarkList {
        nutrientId {
          _id
          nutrientName
        }
        customBookmarkName
        link
        active
      }
    }
  }
`;

export default GET_ALL_INGREDIENTS_BASED_ON_NURTITION;

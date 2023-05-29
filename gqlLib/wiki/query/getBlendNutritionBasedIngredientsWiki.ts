import { gql } from "@apollo/client";

const GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI = gql`
  query GetBlendNutritionBasedIngredientsWiki2(
    $ingredientsInfo: [BlendIngredientInfo!]!
    $userId: String
  ) {
    getBlendNutritionBasedIngredientsWiki2(
      ingredientsInfo: $ingredientsInfo
      userId: $userId
    ) {
      wikiTitle
      wikiDescription
      wikiCoverImages
      wikiFeatureImage
      bodies
      type
      category
      publishedBy
      isPublished
      commentsCount
      portions {
        measurement
        meausermentWeight
        default
      }
      ingredientBookmarkList {
        ingredientId {
          _id
          ingredientName
          portions {
            meausermentWeight
            default
            measurement
          }
        }
        link
        active
        customBookmarkName
      }
    }
  }
`;

export default GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI;

import { gql } from "@apollo/client";

export const GET_WIDGET_TYPE = gql`
  query GetWidgetType($slug: String!) {
    getWidgetTypeBySlug(slug: $slug)
  }
`;

export const GET_GRID_WIDGET = gql`
  query GetRecipeWidget($slug: String!) {
    getWidgetsForClient(slug: $slug) {
      widgetCollections {
        slug
        displayName
        icon
      }
    }
  }
`;

export const GET_SLIDER_WIDGET = gql`
  query GetRecipeWidget($slug: String!) {
    getWidgetsForClient(slug: $slug) {
      _id
      widgetName
      widgetType
      widgetCollections {
        _id
        themeLink
        displayName
        icon
        banner
        slug
        showTabMenu
        filter {
          filterType
          values {
            label
            value
          }
        }
        data {
          collectionType
          Recipe {
            name
            recipeIngredients
            recipeBlendCategory {
              _id
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
            foodCategories
            notes
            addedToCompare
          }
        }
      }
    }
  }
`;

export const GET_ALL_WIDGET_COLLECTION_DATA = gql`
  query GetGridWidgetData($widgetSlug: String!, $collectionSlug: String!) {
    getWidgetCollectionbySlugForClient(
      widgetSlug: $widgetSlug
      slug: $collectionSlug
    ) {
      displayName
      icon
      themeLink
      bannerLink
      data {
        collectionType
        Recipe {
          name
          recipeIngredients
          recipeBlendCategory {
            _id
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
          foodCategories
          notes
          addedToCompare
        }
      }
    }
  }
`;

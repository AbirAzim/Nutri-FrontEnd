import { gql } from "@apollo/client";

export const GET_CART_DATA = gql`
  query GetCartData($userId: String!) {
    getMyGroceryList(memberId: $userId) {
      ingredientId {
        _id
        ingredientName
        featuredImage
        portions {
          measurement
        }
      }
      selectedPortion
      quantity
    }
    getPantryList(memberId: $userId) {
      ingredientId {
        _id
        ingredientName
        featuredImage
        portions {
          measurement
        }
      }
      selectedPortion
      quantity
    }
    getStapleList(memberId: $userId) {
      ingredientId {
        _id
        ingredientName
        featuredImage
        portions {
          measurement
        }
      }
      selectedPortion
      quantity
    }
  }
`;

export const SEARCH_INGREDIENTS_FOR_GROCERY = gql`
  query SearchIngredients($query: String!, $memberId: String!) {
    searchBlendIngredientsForGrocery(memberId: $memberId, searchTerm: $query) {
      _id
      ingredientName
      featuredImage
      portions {
        measurement
      }
    }
  }
`;

export const ADD_GROCERY_ITEM = gql`
  mutation AddGrocery($data: CreateNewGroceries!) {
    addGroceryList(data: $data)
  }
`;

export const ADD_PANTRY_ITEM = gql`
  mutation AddPantry($data: CreateNewPantry!) {
    addPantryList(data: $data)
  }
`;

export const ADD_STAPLE_ITEM = gql`
  mutation AddGrocery($data: CreateNewGroceries!) {
    addGroceryList(data: $data)
  }
`;

export const EDIT_CART_ITEM = gql`
  mutation EditCartItem(
    $list: String!
    $memberId: String!
    $ingredient: CreateGroceryIngreidnets!
  ) {
    editAListItem(listType: $list, memberId: $memberId, ingredient: $ingredient)
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem(
    $userId: String!
    $groceries: [ID!]!
    $pantries: [ID!]!
    $staples: [ID!]!
  ) {
    deleteSomeFromList(
      memberId: $userId
      stapleIngredients: $staples
      groceryIngredients: $groceries
      pantryIngredients: $pantries
    )
  }
`;

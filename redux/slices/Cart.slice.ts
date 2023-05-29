import { createSlice } from "@reduxjs/toolkit";

type Grocery = {
  ingredientId: { _id: string; ingredientName: string; featuredImage: string };
  selectedPortion: string;
  quantity: number;
};

interface CartState {
  groceries: Grocery[];
  pantries: Grocery[];
  staples: Grocery[];
}

const initialState: CartState = {
  groceries: [],
  pantries: [],
  staples: [],
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addGroceries: (state, action) => {
      state.groceries = action.payload || [];
    },
    addGrocery: (state, action: { payload: Grocery }) => {
      state.groceries.push(action.payload);
    },
    addPantries: (state, action) => {
      state.pantries = action.payload || [];
    },
    addPantry: (state, action: { payload: Grocery }) => {
      state.pantries.push(action.payload);
    },
    addStaples: (state, action) => {
      state.staples = action.payload || [];
    },
    addStaple: (state, action: { payload: Grocery }) => {
      state.staples.push(action.payload);
    },
    editCartIngredients: (state, action) => {
      const { listType, ingredient } = action.payload;
      if (listType === "Grocery") {
        const groceries = state.groceries.map((grocery) => {
          if (grocery.ingredientId._id === ingredient.ingredientId) {
            grocery.selectedPortion = ingredient.selectedPortion;
            grocery.quantity = ingredient.quantity;
          }
          return grocery;
        });
        state.groceries = groceries;
      } else if (listType === "Pantry") {
        const pantries = state.pantries.map((pantry) => {
          if (pantry.ingredientId._id === ingredient.ingredientId) {
            pantry.selectedPortion = ingredient.selectedPortion;
            pantry.quantity = ingredient.quantity;
          }
          return pantry;
        });
        state.pantries = pantries;
      }
    },
    deleteCartIngredients: (
      state,
      action: { payload: { ingredients: any } },
    ) => {
      const { ingredients } = action.payload;
      state.groceries = state.groceries.filter(
        (item) => !ingredients?.groceries.includes(item.ingredientId._id),
      );
      state.pantries = state.pantries.filter(
        (item) => !ingredients?.pantries.includes(item.ingredientId._id),
      );
      state.staples = state.staples.filter(
        (item) => !ingredients?.staples.includes(item.ingredientId._id),
      );
    },
  },
});

export const {
  addGroceries,
  addGrocery,
  addPantries,
  addPantry,
  addStaples,
  addStaple,
  editCartIngredients,
  deleteCartIngredients,
} = CartSlice.actions;

export default CartSlice.reducer;

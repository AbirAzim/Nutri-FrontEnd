import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ingredientsSliceProps = {
  allIngredients: any[];
  recipeFilterByIngredientCategory: string;
};

const initialState: ingredientsSliceProps = {
  allIngredients: [],
  recipeFilterByIngredientCategory: "",
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setAllIngredients: (state, action: PayloadAction<any[]>) => {
      state.allIngredients = action?.payload;
    },
    setRecipeFilterByIngredientCategory: (
      state,
      action: PayloadAction<string>
    ) => {
      state.recipeFilterByIngredientCategory = action?.payload;
    },
  },
});

export const { setAllIngredients, setRecipeFilterByIngredientCategory } =
  ingredientsSlice?.actions;

export default ingredientsSlice?.reducer;

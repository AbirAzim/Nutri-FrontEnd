import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeName: "",
  descriptionRecipe: "",
  recipeImagesArray: [],
  recipeFileImagesArray: [],
  selectedBlendCategory: null,
  allBlendCategories: [],
  allIngredientListBasedOnClass: [],
  selectedIngredientsList: [],
  servingCounter: 1,
  recipeInstruction: [],
  ingredientArrayForNutrition: [],
  arrayOfSingleSelectedIngredientForNutrition: [],
  selectedIngredientBool: false,
};

export const editRecipeStateSlice = createSlice({
  name: "editRecipeReducer",
  initialState,
  reducers: {
    setEditRecipeName: (state, action) => {
      state.recipeName = action?.payload;
    },
    setDescriptionRecipe: (state, action) => {
      state.descriptionRecipe = action?.payload;
    },
    setRecipeImagesArray: (state, action) => {
      state.recipeImagesArray = action?.payload;
    },
    setRecipeFileImagesArray: (state, action) => {
      state.recipeFileImagesArray = action?.payload;
    },
    setSelectedBlendCategory: (state, action) => {
      state.selectedBlendCategory = action?.payload;
    },
    setAllIngredientListBasedOnClass: (state, action) => {
      state.allIngredientListBasedOnClass = action?.payload;
    },
    setSelectedIngredientsList: (state, action) => {
      state.selectedIngredientsList = action?.payload;
    },
    setAllBlendCategories: (state, action) => {
      state.allBlendCategories = action?.payload;
    },
    setServingCounter: (state, action) => {
      state.servingCounter = action?.payload;
    },
    setRecipeInstruction: (state, action) => {
      state.recipeInstruction = action?.payload;
    },
    setIngredientArrayForNutrition: (state, action) => {
      state.ingredientArrayForNutrition = action?.payload;
    },
    setArrayOfSingleSelectedIngredientForNutrition: (state, action) => {
      state.arrayOfSingleSelectedIngredientForNutrition = action?.payload;
    },
    setSelectedIngredientBool: (state, action) => {
      state.selectedIngredientBool = action?.payload;
    },
    setRecipeIngredients: (state, action) => {
      const idxIngredient = state.selectedIngredientsList.findIndex(
        (ing) => ing._id === action?.payload._id,
      );
      if (idxIngredient !== -1) {
        state.selectedIngredientsList[idxIngredient] = action?.payload;
      } else {
        state.selectedIngredientsList = [
          ...state.selectedIngredientsList,
          action?.payload,
        ];
      }
    },
  },
});

export const {
  setEditRecipeName,
  setDescriptionRecipe,
  setRecipeImagesArray,
  setRecipeFileImagesArray,
  setSelectedBlendCategory,
  setAllIngredientListBasedOnClass,
  setSelectedIngredientsList,
  setAllBlendCategories,
  setServingCounter,
  setRecipeInstruction,
  setIngredientArrayForNutrition,
  setArrayOfSingleSelectedIngredientForNutrition,
  setSelectedIngredientBool,
  setRecipeIngredients,
} = editRecipeStateSlice.actions;

export default editRecipeStateSlice?.reducer;

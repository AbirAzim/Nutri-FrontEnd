import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompareRecipeType } from "../../type/compareRecipeType";
import { RecipeDetailsType } from "../../type/recipeDetailsType";
import {
  RecipeType,
  ReferenceOfRecipeUpdateFuncType,
} from "../../type/recipeType";

interface CurrentRecipeInfo {
  name: string;
  image: string;
  personalRating: number;
}

type recipeSliceState = {
  recommended: RecipeType[];
  popular: RecipeType[];
  latest: RecipeType[];
  currentRecipeInfo: CurrentRecipeInfo;
  compareList: CompareRecipeType[];
  detailsARecipe: RecipeDetailsType;
  allFilterRecipe: RecipeType[];
  searchRecipeResults: RecipeType[];
  referenceOfRecipeUpdateFunc: ReferenceOfRecipeUpdateFuncType;
};

const initialState: recipeSliceState = {
  latest: [] as RecipeType[],
  popular: [] as RecipeType[],
  recommended: [] as RecipeType[],
  currentRecipeInfo: { name: "", image: "", personalRating: 0 },
  compareList: [],
  detailsARecipe: {} as RecipeDetailsType,
  allFilterRecipe: [] as RecipeType[],
  searchRecipeResults: [],
  referenceOfRecipeUpdateFunc: () => {},
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecommended: (state, action: PayloadAction<RecipeType[]>) => {
      state.recommended = action?.payload;
    },
    setPopular: (state, action: PayloadAction<RecipeType[]>) => {
      state.popular = action?.payload;
    },
    setLatest: (state, action: PayloadAction<RecipeType[]>) => {
      state.latest = action?.payload;
    },
    setCurrentRecipeInfo: (state, action: PayloadAction<CurrentRecipeInfo>) => {
      state.currentRecipeInfo = action?.payload;
    },
    setCompareList: (state, action: PayloadAction<CompareRecipeType[]>) => {
      state.compareList = action?.payload;
    },
    setDetailsARecipe: (state, action: PayloadAction<RecipeDetailsType>) => {
      state.detailsARecipe = action?.payload;
    },
    setAllFilterRecipe: (state, action: PayloadAction<RecipeType[]>) => {
      state.allFilterRecipe = [...action?.payload];
    },
    updateSearchRecipeResult: (state, action: PayloadAction<RecipeType[]>) => {
      state.searchRecipeResults = [...action.payload];
    },
    setReferenceOfRecipeUpdateFunc: (
      state,
      action: PayloadAction<ReferenceOfRecipeUpdateFuncType>,
    ) => {
      state.referenceOfRecipeUpdateFunc = action.payload;
    },
  },
});

export const {
  setLatest,
  setPopular,
  setRecommended,
  setCurrentRecipeInfo,
  setCompareList,
  setDetailsARecipe,
  setAllFilterRecipe,
  updateSearchRecipeResult,
  setReferenceOfRecipeUpdateFunc,
} = recipeSlice?.actions;

export default recipeSlice?.reducer;

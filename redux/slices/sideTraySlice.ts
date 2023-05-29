import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  openFilterTray: boolean;
  blends: any[];
  ingredients: any[];
  category: string;
  openCommentsTray: boolean;
  openModal: boolean;
  openCollectionsTary: boolean;
};

const initialState: SideTrayState = {
  openFilterTray: false,
  blends: [],
  category: null,
  ingredients: [],
  openCommentsTray: false,
  openModal: false,
  openCollectionsTary: false,
};

export const sideTraySlice = createSlice({
  name: "sideTray",
  initialState,
  reducers: {
    setOpenFilterTray: (state, action: PayloadAction<boolean>) => {
      state.openFilterTray = action?.payload;
    },
    setBlendTye: (state, action) => {
      state.blends = action?.payload;
    },
    setCategoryTye: (state, action) => {
      state.category = action?.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action?.payload;
    },
    setOpenCommentsTray: (state, action: PayloadAction<boolean>) => {
      state.openCommentsTray = action?.payload;
    },
    setToggleModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action?.payload;
    },
    setOpenCollectionsTary: (state, action: PayloadAction<boolean>) => {
      state.openCollectionsTary = action?.payload;
    },
  },
});

export const {
  setOpenFilterTray,
  setBlendTye,
  setIngredients,
  setCategoryTye,
  setOpenCommentsTray,
  setToggleModal,
  setOpenCollectionsTary,
} = sideTraySlice?.actions;

export default sideTraySlice?.reducer;

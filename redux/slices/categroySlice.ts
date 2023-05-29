import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dataObj = {
  _id: string;
  name: string;
  image: string;
};

type categroySliceProps = {
  allCategories: dataObj[];
};

const initialState: categroySliceProps = {
  allCategories: [],
};

export const categroySlice = createSlice({
  name: "categroy",
  initialState,
  reducers: {
    setAllCategories: (state, action: PayloadAction<dataObj[]>) => {
      state.allCategories = action?.payload;
    },
  },
});

export const { setAllCategories } = categroySlice?.actions;

export default categroySlice?.reducer;

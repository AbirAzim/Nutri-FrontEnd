import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sidebarActiveMenuNameType } from "../../components/sidebar/Sidebar.component";

type SideTrayState = {
  loading: boolean;
  sidebarActiveMenuName: sidebarActiveMenuNameType;
};

const initialState: SideTrayState = {
  loading: false,
  sidebarActiveMenuName: "Home",
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
    updateSidebarActiveMenuName: (
      state,
      action: PayloadAction<sidebarActiveMenuNameType>,
    ) => {
      state.sidebarActiveMenuName = action.payload;
    },
  },
});

export const { setLoading, updateSidebarActiveMenuName } =
  utilitySlice?.actions;

export default utilitySlice?.reducer;

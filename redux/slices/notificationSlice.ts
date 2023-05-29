import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  isNotificationTrayOpen: boolean;
}

const initialState: InitialStateType = {
  isNotificationTrayOpen: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsNotificationTrayOpen: (state, action: PayloadAction<boolean>) => {
      state.isNotificationTrayOpen = action.payload;
    },
  },
});

export const { setIsNotificationTrayOpen } = notificationSlice.actions;
export default notificationSlice.reducer;

// import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import sampleUser from "../../data/sampleUser";
import { DbUserType } from "../../type/dbUserType";

type SideTrayState = {
  nonConfirmedUser: string;
  user: string | null;
  dbUser: DbUserType;
  provider: string;
  isNewUseImage: any[];
};

const initialState: SideTrayState = {
  nonConfirmedUser: "",
  user: "",
  dbUser: {} as DbUserType,
  provider: "email",
  isNewUseImage: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action?.payload;
    },
    setNonConfirmedUser: (state, action: PayloadAction<string>) => {
      state.nonConfirmedUser = action?.payload;
    },
    setDbUser: (state, action: PayloadAction<DbUserType>) => {
      state.dbUser = action?.payload;
    },
    setProvider: (state, action: PayloadAction<string>) => {
      state.provider = action?.payload;
    },
    setIsNewUseImage: (state, action: PayloadAction<any>) => {
      state.isNewUseImage = action?.payload;
    },
  },
});

export const {
  setNonConfirmedUser,
  setUser,
  setDbUser,
  setProvider,
  setIsNewUseImage,
} = userSlice?.actions;

export default userSlice?.reducer;

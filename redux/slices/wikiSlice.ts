import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WikiType } from "../../type/wikiListType";

interface wikiSliceProps {
  wikiCommentsTrayCurrentWikiEntity: WikiCommentsTrayCurrentWikiEntity;
  isOpenWikiCommentsTray: boolean;
}
interface WikiCommentsTrayCurrentWikiEntity {
  type: WikiType;
  title: string;
  image: string;
  id: string;
}

const initialState: wikiSliceProps = {
  isOpenWikiCommentsTray: false,
  wikiCommentsTrayCurrentWikiEntity: {
    id: "",
    image: "",
    title: "",
    type: "Ingredient",
  },
};

export const wikiSlice = createSlice({
  name: "wiki",
  initialState,
  reducers: {
    setWikiCommentsCurrentIngredient: (
      state,
      action: PayloadAction<WikiCommentsTrayCurrentWikiEntity>,
    ) => {
      state.wikiCommentsTrayCurrentWikiEntity = action?.payload;
    },
    setIsOpenWikiCommentsTray: (state, action: PayloadAction<boolean>) => {
      state.isOpenWikiCommentsTray = action?.payload;
    },
  },
});

export const { setIsOpenWikiCommentsTray, setWikiCommentsCurrentIngredient } =
  wikiSlice?.actions;

export default wikiSlice?.reducer;

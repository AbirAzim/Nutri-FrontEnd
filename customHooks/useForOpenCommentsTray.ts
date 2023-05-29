import { useAppDispatch } from "../redux/hooks";
import { setActiveRecipeId } from "../redux/slices/collectionSlice";
import {
  setCurrentRecipeInfo,
  setReferenceOfRecipeUpdateFunc,
} from "../redux/slices/recipeSlice";
import {
  setOpenCollectionsTary,
  setOpenCommentsTray,
} from "../redux/slices/sideTraySlice";
import { ReferenceOfRecipeUpdateFuncType } from "../type/recipeType";

const useForOpenCommentsTray = () => {
  const dispatch = useAppDispatch();

  const handleComment = (
    id: string,
    title: string,
    image: string,
    e: React.SyntheticEvent,
    updateDataFunc: ReferenceOfRecipeUpdateFuncType = () => {},
    personalRating: number = 0,
  ) => {
    // HANDLE COMMENTS CLICK
    e?.stopPropagation();
    dispatch(setActiveRecipeId(id));
    dispatch(setOpenCommentsTray(true));
    dispatch(setCurrentRecipeInfo({ name: title, image, personalRating }));
    dispatch(setOpenCollectionsTary(false));
    dispatch(setReferenceOfRecipeUpdateFunc(updateDataFunc));
  };

  return handleComment;
};

export default useForOpenCommentsTray;

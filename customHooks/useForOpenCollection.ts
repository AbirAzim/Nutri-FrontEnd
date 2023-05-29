import { useAppDispatch } from "../redux/hooks";
import {
  setActiveRecipeId,
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../redux/slices/collectionSlice";
import { setReferenceOfRecipeUpdateFunc } from "../redux/slices/recipeSlice";
import { setOpenCollectionsTary } from "../redux/slices/sideTraySlice";

const useForOpenCollectionTray = () => {
  const dispatch = useAppDispatch();

  const handleOpenCollectionTray = (
    id: string,
    collectionIds: string[],
    e: React.SyntheticEvent,
    updateDataFunc: (
      id: string,
      obj: { [key: string]: any },
    ) => void = () => {},
  ) => {
    e?.stopPropagation();
    dispatch(setSingleRecipeWithinCollecions(collectionIds));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    dispatch(setActiveRecipeId(id));
    dispatch(setReferenceOfRecipeUpdateFunc(updateDataFunc));
  };

  return handleOpenCollectionTray;
};

export default useForOpenCollectionTray;

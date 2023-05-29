import { useAppDispatch } from "../../redux/hooks";
import {
  setIsActivePlanForCollection,
  setIsOpenPlanCollectionTray,
} from "../../redux/slices/Planner.slice";

const useToOpenPlanCollectionTray = () => {
  const dispatch = useAppDispatch();
  const handleOpenCollectionTray = (
    id: string,
    collectionIds: string[],
    planComeFrom: "list" | "details" | "globalPlans" | "homePage",
  ) => {
    dispatch(
      setIsActivePlanForCollection({
        id,
        collectionIds,
        planComeFrom,
      }),
    );
    dispatch(setIsOpenPlanCollectionTray(true));
  };

  return handleOpenCollectionTray;
};

export default useToOpenPlanCollectionTray;

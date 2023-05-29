import { useAppDispatch } from "../../redux/hooks";
import {
  CurrentPlanInfoType,
  setIsPlanCommentsTrayOpen,
  updateCurrentPlanInfoForComments,
} from "../../redux/slices/Planner.slice";

const useToOpenPlanCommentsTray = () => {
  const dispatch = useAppDispatch();
  // open comment tray
  const handleOpenPlanCommentsTray = (props: CurrentPlanInfoType) => {
    dispatch(updateCurrentPlanInfoForComments(props));
    dispatch(setIsPlanCommentsTrayOpen(true));
  };

  return handleOpenPlanCommentsTray;
};

export default useToOpenPlanCommentsTray;

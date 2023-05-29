import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { ADD_TO_LAST_MODIFIED_PLAN_COLLECTION } from "../../graphql/Planner";
import { useAppDispatch } from "../../redux/hooks";
import {
  PlanComeFromType,
  setIsActivePlanForCollection,
  updateLastModifiedPlanCollection,
} from "../../redux/slices/Planner.slice";
import useToUpdatePlanField from "./useToUpdatePlanField";
import useToUpdatePlanDetailsField from "./useToUpdatePlanDetailsField";
import useToUpdateGlobalPlans from "./useToUpdateGlobalPlans";

const useToAddPlanToCollection = () => {
  const dispatch = useAppDispatch();
  const handleUpdatePlanField = useToUpdatePlanField();
  const handleUpdatePlanDetailsField = useToUpdatePlanDetailsField();
  const handleUpdateGlobalPlansField = useToUpdateGlobalPlans();
  let timeOut;
  const [addToBlogCollection] = useMutation(
    ADD_TO_LAST_MODIFIED_PLAN_COLLECTION,
    { fetchPolicy: "network-only" },
  );
  const handleToAddPlanToCollection = async (
    planId: string = "",
    memberId: string = "",
    setOpenLastModifiedBlogCollectionModal: (arg: boolean) => void = () => {},
    planComeFrom: PlanComeFromType = "list",
  ) => {
    try {
      const {
        data: { addToLastModifiedPlanCollection },
      } = await addToBlogCollection({
        variables: {
          planId,
          memberId,
        },
      });

      dispatch(
        updateLastModifiedPlanCollection(addToLastModifiedPlanCollection),
      );
      dispatch(
        setIsActivePlanForCollection({
          id: planId,
          collectionIds: [addToLastModifiedPlanCollection?._id],
          planComeFrom,
        }),
      );
      const updateObj = {
        planCollections: [addToLastModifiedPlanCollection?._id],
      };

      switch (planComeFrom) {
        case "list":
          handleUpdatePlanField(planId, updateObj);
          break;
        case "details":
          handleUpdatePlanDetailsField(planId, updateObj);
          break;
        case "globalPlans":
          handleUpdateGlobalPlansField(planId, updateObj);
          break;
        case "homePage":
          handleUpdateGlobalPlansField(planId, updateObj, 8);
          break;
        default:
          handleUpdatePlanField(planId, updateObj);
          break;
      }
      setOpenLastModifiedBlogCollectionModal(true);
      timeOut = setTimeout(() => {
        setOpenLastModifiedBlogCollectionModal(false);
      }, 5000);
    } catch (error) {}
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, [timeOut]);

  return handleToAddPlanToCollection;
};

export default useToAddPlanToCollection;

import { useMutation } from "@apollo/client";
import REJECT_RECIPE_SHARE from "../../gqlLib/notification/mutation/rejectRecipeShare";
import useToUpdateShareNotification from "./useToUpdateShareNotification";
import notification from "../../components/utility/reactToastifyNotification";

const useToRejectRecipeShare = () => {
  const [handleRejectRecipeShare, { loading: rejectRecipeShareLoading }] =
    useMutation(REJECT_RECIPE_SHARE);
  const handleUpdateShareNotification = useToUpdateShareNotification();
  // reject recipe
  const functionRejectRecipeShare = async (variables: {
    userId: string;
    token: string;
  }) => {
    try {
      const { data } = await handleRejectRecipeShare({ variables });
      const updateData = data?.rejectRecipeShare;
      handleUpdateShareNotification(variables, updateData);
    } catch (error) {
      notification("error", "Failed accept recipe share");
    }
  };

  return { functionRejectRecipeShare, rejectRecipeShareLoading };
};

export default useToRejectRecipeShare;

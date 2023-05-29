import { useMutation } from "@apollo/client";
import ACCEPT_RECIPE_SHARE from "../../gqlLib/notification/mutation/acceptRecipeShare";
import useToUpdateShareNotification from "./useToUpdateShareNotification";
import notification from "../../components/utility/reactToastifyNotification";

const useToAcceptRecipeShare = () => {
  const [handleAcceptRecipeShare, { loading: acceptRecipeShareLoading }] =
    useMutation(ACCEPT_RECIPE_SHARE);
  const handleUpdateShareNotification = useToUpdateShareNotification();
  const functionAcceptRecipeShare = async (variables: {
    userId: string;
    token: string;
  }) => {
    try {
      const { data } = await handleAcceptRecipeShare({ variables });
      const updateData = data?.acceptRecipeShare;
      handleUpdateShareNotification(variables, updateData);
      notification("success", "Recipe added to shared with me collection");
    } catch (error) {
      notification("error", "Failed accept recipe share");
    }
  };
  return { functionAcceptRecipeShare, acceptRecipeShareLoading };
};

export default useToAcceptRecipeShare;

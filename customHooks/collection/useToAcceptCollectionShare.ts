import { useMutation } from "@apollo/client";
import notification from "../../components/utility/reactToastifyNotification";
import ACCEPT_COLLECTION_SHARE from "../../gqlLib/notification/mutation/acceptCollectionShare";
import useToUpdateShareNotification from "../notification/useToUpdateShareNotification";

const useToAcceptCollectionShare = () => {
  const [
    handleAcceptCollectionShare,
    { loading: acceptCollectionShareLoading },
  ] = useMutation(ACCEPT_COLLECTION_SHARE);
  const handleUpdateShareNotification = useToUpdateShareNotification();
  const functionAcceptCollectionShare = async (variables: {
    userId: string;
    token: string;
  }) => {
    try {
      const { data } = await handleAcceptCollectionShare({ variables });
      const updateData = data?.acceptCollectionShare;
      handleUpdateShareNotification(variables, updateData);
      notification("success", "Collection added to shared with me collection");
    } catch (error) {
      notification("error", "Failed accept Collection share");
    }
  };
  return { functionAcceptCollectionShare, acceptCollectionShareLoading };
};

export default useToAcceptCollectionShare;

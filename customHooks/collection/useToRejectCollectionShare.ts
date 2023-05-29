import { useMutation } from "@apollo/client";
import notification from "../../components/utility/reactToastifyNotification";
import REJECT_COLLECTION_SHARE from "../../gqlLib/notification/mutation/rejectCollectionShare";
import useToUpdateShareNotification from "../notification/useToUpdateShareNotification";

const useToRejectCollectionShare = () => {
  const [
    handleRejectCollectionShare,
    { loading: rejectCollectionShareLoading },
  ] = useMutation(REJECT_COLLECTION_SHARE);
  const handleUpdateShareNotification = useToUpdateShareNotification();
  // reject Collection
  const functionRejectCollectionShare = async (variables: {
    userId: string;
    token: string;
  }) => {
    try {
      const { data } = await handleRejectCollectionShare({ variables });
      const updateData = data?.rejectCollectionShare;
      handleUpdateShareNotification(variables, updateData);
    } catch (error) {
      notification("error", "Failed accept Collection share");
    }
  };

  return { functionRejectCollectionShare, rejectCollectionShareLoading };
};

export default useToRejectCollectionShare;

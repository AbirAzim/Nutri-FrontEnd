import client from "../../gqlLib/client";
import GET_SHARE_NOTIFICATION from "../../gqlLib/notification/query/getShareNotification";

const useToUpdateShareNotification = () => {
  const handleUpdateShareNotification = (variables, updatedData) => {
    client.writeQuery({
      query: GET_SHARE_NOTIFICATION,
      variables,
      data: {
        getShareNotification: {
          ...updatedData,
        },
      },
    });
  };

  return handleUpdateShareNotification;
};

export default useToUpdateShareNotification;

import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import CHANGE_COMPARE from "../gqlLib/compare/mutation/changeCompare";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDbUser } from "../redux/slices/userSlice";

const useChangeCompare = () => {
  const dispatch = useAppDispatch();
  const [changeCompare, { called, client, loading, reset, data, error }] =
    useMutation(CHANGE_COMPARE, {
      fetchPolicy: "network-only",
    });
  const { dbUser } = useAppSelector((state) => state?.user);

  const handleChangeCompare = async (
    e: React.SyntheticEvent,
    id: string,
    versionId: string,
    compared: boolean,
    updateDataFunc: (
      id: string,
      obj: { [key: string]: any },
    ) => void = () => {},
  ) => {
    e.stopPropagation();

    try {
      const { data } = await changeCompare({
        variables: {
          userId: dbUser?._id,
          recipeId: id,
        },
      });
      dispatch(
        setDbUser({
          ...dbUser,
          compareLength: Number(data?.changeCompare),
        }),
      );

      updateDataFunc(id, { addedToCompare: compared });

      notification(
        "success",
        ` ${!compared ? "Removed from" : "Added to"} compare list`,
      );
    } catch (error) {
      notification(
        "error",
        ` Unable to ${compared ? "remove" : "add"} from compare list`,
      );
    }
  };

  return { handleChangeCompare, called, client, loading, reset, data, error };
};

export default useChangeCompare;

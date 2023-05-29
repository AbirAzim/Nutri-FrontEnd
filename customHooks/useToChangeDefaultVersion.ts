import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import CHANGE_DEFAULT_VERSION from "../gqlLib/versions/mutation/changelDefaultVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

const useToChangeDefaultVersion = () => {
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [changeDefaultVersion, { data, ...rest }] = useMutation(
    CHANGE_DEFAULT_VERSION,
  );
  const dispatch = useAppDispatch();

  const handleToUpdateDefaultVersion = async (
    userId: string,
    recipeId: string,
    versionId: string,
    isOriginalVersion: boolean = false,
    isTurnedOff: boolean = false,
  ) => {
    try {
      const { data } = await changeDefaultVersion({
        variables: {
          userId,
          recipeId,
          versionId,
          isTurnedOff,
        },
      });

      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          ...data?.changeDefaultVersion,
        }),
      );

      notification("success", "Default version change successfully");
    } catch (error) {
      notification("error", error?.message || "Something went wrong");
    }
  };

  return {
    handleToUpdateDefaultVersion,
    data: data?.changeDefaultVersion,
    ...rest,
  };
};

export default useToChangeDefaultVersion;

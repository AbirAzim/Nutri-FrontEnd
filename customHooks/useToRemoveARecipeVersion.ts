import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import REMOVE_A_RECIPE_VERSION from "../gqlLib/versions/mutation/removeARecipeVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

const useToRemoveARecipeVersion = () => {
  const [removeARecipeVersion, { ...rest }] = useMutation(
    REMOVE_A_RECIPE_VERSION,
  );
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);

  const handleToRemoveARecipeVersion = async (
    userId: string,
    recipeId: string,
    versionId: string,
    isTurnedOn: boolean,
  ) => {
    if (detailsARecipe?.defaultVersion?._id !== versionId) {
      try {
        await removeARecipeVersion({
          variables: {
            userId,
            recipeId,
            versionId,
            isTurnedOn,
          },
        });

        const turnedOnVersions = isTurnedOn
          ? detailsARecipe?.turnedOnVersions?.filter(
              (version) => version?._id !== versionId,
            )
          : detailsARecipe?.turnedOnVersions;

        const turnedOffVersions = isTurnedOn
          ? detailsARecipe?.turnedOffVersions
          : detailsARecipe?.turnedOffVersions?.filter(
              (version) => version?._id !== versionId,
            );

        dispatch(
          setDetailsARecipe({
            ...detailsARecipe,
            turnedOnVersions,
            turnedOffVersions,
            versionsCount: detailsARecipe?.versionsCount - 1,
          }),
        );
        notification("success", "Version remove Successfully");
      } catch (error) {
        notification("error", error?.message || "Version remove failed");
      }
    } else {
      notification("info", "You can't remove default version");
    }
  };

  return { handleToRemoveARecipeVersion, ...rest };
};

export default useToRemoveARecipeVersion;

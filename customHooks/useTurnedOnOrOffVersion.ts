import { gql, useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import TURN_ON_OR_OFF_VERSION from "../gqlLib/versions/mutation/turnOnOrOffVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

const useTurnedOnOrOffVersion = () => {
  const [turnedOnOrOffVersion, { ...rest }] = useMutation(
    TURN_ON_OR_OFF_VERSION,
    { fetchPolicy: "network-only" },
  );
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);

  const handleTurnOnOrOffVersion = async (
    turnedOn: boolean,
    userId: string,
    recipeId: string,
    versionId: string,
  ) => {
    try {
      await turnedOnOrOffVersion({
        variables: {
          turnedOn,
          userId,
          recipeId,
          versionId,
        },
      });

      const version = turnedOn
        ? detailsARecipe?.turnedOffVersions?.find(
            (version) => version?._id === versionId,
          )
        : detailsARecipe?.turnedOnVersions?.find(
            (version) => version?._id === versionId,
          );

      const turnedOnVersions = turnedOn
        ? [...detailsARecipe?.turnedOnVersions, version]
        : detailsARecipe?.turnedOnVersions?.filter(
            (version) => version?._id !== versionId,
          );

      const turnedOffVersions = turnedOn
        ? detailsARecipe?.turnedOffVersions?.filter(
            (version) => version?._id !== versionId,
          )
        : [...detailsARecipe?.turnedOffVersions, version];

      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          turnedOnVersions,
          turnedOffVersions,
        }),
      );
    } catch (error) {
      notification("error", `Version turn ${turnedOn ? "on" : "off"} failed`);
    }
  };

  return { handleTurnOnOrOffVersion, ...rest };
};

export default useTurnedOnOrOffVersion;

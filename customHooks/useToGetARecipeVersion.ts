import { useLazyQuery } from "@apollo/client";
import GET_A_RECIPE_VERSION from "../gqlLib/versions/query/getARecipeVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { setOpenVersionTray } from "../redux/slices/versionTraySlice";
import { VersionDataType } from "../type/recipeDetailsType";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToGetARecipeVersion = () => {
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const { shouldCloseVersionTrayWhenClickAVersion } = useAppSelector(
    (state) => state?.versionTray,
  );
  const [getARecipeVersion, { ...rest }] = useLazyQuery(GET_A_RECIPE_VERSION, {
    fetchPolicy: "network-only",
  });

  const handleToGetARecipeVersion = async (
    versionId: string,
    isOriginalVersion: boolean = false,
    isShareAble: boolean | null = true,
  ) => {
    try {
      const { data } = await getARecipeVersion({
        variables: { versionId },
      });

      const { _id, errorIngredients, ingredients, ...rest } =
        data?.getARecipeVersion;

      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,

          tempVersionInfo: {
            isShareAble,
            isOriginalVersion,
            version: {
              ...data?.getARecipeVersion,
              ingredients: [
                ...ingredients?.map((ing) => ({
                  ...ing,
                  ingredientStatus: "ok",
                })),
                ...errorIngredients?.map((ing) => ({
                  ...ing,
                  ingredientStatus: "partial_ok",
                })),
              ],
            },
          },
        }),
      );
      if (shouldCloseVersionTrayWhenClickAVersion) {
        dispatch(setOpenVersionTray(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleToGetARecipeVersion, ...rest };
};

export default useToGetARecipeVersion;

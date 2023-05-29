import { useDispatch } from "react-redux";
import updateRecipeFunc from "../components/utility/updateRecipeFunc";
import client from "../gqlLib/client";
import GET_ALL_LATEST_RECIPES from "../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../gqlLib/recipes/queries/getRecommendedRecipes";
import { useAppSelector } from "../redux/hooks";
import { setAllRecipeWithinCollections } from "../redux/slices/collectionSlice";
import {
  setAllFilterRecipe,
  setDetailsARecipe,
  setLatest,
  setPopular,
  setRecommended,
} from "../redux/slices/recipeSlice";

type Props = (id: string, obj: object) => void;

const useUpdateRecipeField = () => {
  const dispatch = useDispatch();
  const { latest, popular, recommended, detailsARecipe, allFilterRecipe } =
    useAppSelector((state) => state?.recipe);
  const { allRecipeWithinCollections } = useAppSelector(
    (state) => state?.collections,
  );
  const { dbUser } = useAppSelector((state) => state?.user);

  const updateRecipe: Props = (id = "", obj = {}) => {
    // update apollo client cache

    const { getAllrecomendedRecipes } = client.readQuery({
      query: GET_ALL_RECOMMENDED_RECIPES,
      variables: { userId: dbUser?._id },
    });
    const { getAllpopularRecipes } = client.readQuery({
      query: GET_ALL_POPULAR_RECIPES,
      variables: { userId: dbUser?._id },
    });
    const { getAllLatestRecipes } = client.readQuery({
      query: GET_ALL_LATEST_RECIPES,
      variables: { userId: dbUser?._id },
    });

    client.writeQuery({
      query: GET_ALL_RECOMMENDED_RECIPES,
      variables: { userId: dbUser?._id },
      data: {
        getAllrecomendedRecipes: getAllrecomendedRecipes?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      },
    });
    client.writeQuery({
      query: GET_ALL_POPULAR_RECIPES,
      variables: { userId: dbUser?._id },
      data: {
        getAllpopularRecipes: getAllpopularRecipes?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      },
    });
    client.writeQuery({
      query: GET_ALL_LATEST_RECIPES,
      variables: { userId: dbUser?._id },
      data: {
        getAllLatestRecipes: getAllLatestRecipes?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      },
    });
    dispatch(
      setDetailsARecipe({
        ...detailsARecipe,
        ...obj,
      }),
    );

    dispatch(
      setAllRecipeWithinCollections([
        ...updateRecipeFunc(allRecipeWithinCollections, obj, id),
      ]),
    );
    dispatch(
      setAllFilterRecipe([...updateRecipeFunc(allFilterRecipe, obj, id)]),
    );
    dispatch(setRecommended(updateRecipeFunc(recommended, obj, id)));
    dispatch(setLatest(updateRecipeFunc(latest, obj, id)));
    dispatch(setPopular(updateRecipeFunc(popular, obj, id)));
  };

  return updateRecipe;
};

export default useUpdateRecipeField;

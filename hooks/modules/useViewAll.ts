import { useLazyQuery } from "@apollo/client";
import { faClock, faFire, faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { useState, useEffect, useMemo } from "react";

import GET_ALL_LATEST_RECIPES from "../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../gqlLib/recipes/queries/getRecommendedRecipes";
import { useAppSelector } from "../../redux/hooks";

const useViewAll = (param: string) => {
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const [response, setResponse] = useState([]);

  const config = useMemo(
    () => ({
      variables: {
        userId,
      },
      skip: userId === "",
    }),
    [userId],
  );

  const [getAllRecommendedRecipes, getAllRecommendedRecipesData] = useLazyQuery(
    GET_ALL_RECOMMENDED_RECIPES,
    config,
  );
  const [getAllPopularRecipes, getAllPopularRecipesData] = useLazyQuery(
    GET_ALL_POPULAR_RECIPES,
    config,
  );
  const [getAllLatestRecipes, getAllLatestRecipesData] = useLazyQuery(
    GET_ALL_LATEST_RECIPES,
    config,
  );

  const responseObj = useMemo(
    () => ({
      recommended: {
        method: getAllRecommendedRecipes,
        data: getAllRecommendedRecipesData,
      },
      popular: {
        method: getAllPopularRecipes,
        data: getAllPopularRecipesData,
      },
      latest: {
        method: getAllLatestRecipes,
        data: getAllLatestRecipesData,
      },
    }),
    [
      getAllLatestRecipes,
      getAllLatestRecipesData,
      getAllPopularRecipes,
      getAllPopularRecipesData,
      getAllRecommendedRecipes,
      getAllRecommendedRecipesData,
    ],
  );

  async function fetchData() {
    await responseObj?.[param]?.method();
    // let response: any;
    // switch (param) {
    //   case "recommended":
    //     response = await getAllRecommendedRecipes();
    //     break;
    //   case "popular":
    //     response = await getAllPopularRecipes();
    //     break;
    //   case "latest":
    //     response = await getAllLatestRecipes();
    //     break;
    //   default:
    //     return;
    // }
    // setResponse(response?.data[QUERY_DICTIONARY[param]?.query]);
  }

  useEffect(() => {
    if (param !== "") {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return { ...responseObj[param]?.data };
};

export default useViewAll;

export const QUERY_DICTIONARY = {
  recommended: {
    title: "Recommended",
    query: "getAllrecomendedRecipes2",
    icon: faThumbsUp,
  },
  popular: {
    title: "Popular",
    query: "getAllpopularRecipes2",
    icon: faFire,
  },
  latest: {
    title: "Recent",
    query: "getAllLatestRecipes2",
    icon: faClock,
  },
};

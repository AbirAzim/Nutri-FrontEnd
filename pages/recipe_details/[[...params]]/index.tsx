import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import GET_A_RECIPE from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";
import { GiGl } from "../../../type/nutrationType";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
import SkeletonRecipeDetails from "../../../theme/skeletons/skeletonRecipeDetails";
import AContainer from "../../../containers/A.container";
import ErrorPage from "../../../components/pages/404Page";
import { updateSidebarActiveMenuName } from "../../../redux/slices/utilitySlice";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";

const Index = () => {
  const router = useRouter();
  const { params = [], token = "" } = router.query;
  const recipe__Id = params?.[0] || "";
  const versionId = params?.[1] || "";
  const [nutritionState, setNutritionState] = useState(null);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();

  const {
    handleToGetARecipe,
    loading: getARecipeLoading,
    error: getARecipeError,
  } = useToGetARecipe();
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();

  useEffect(() => {
    dispatch(setOpenVersionTray(false));
    dispatch(setOpenVersionTrayFormWhichPage("details"));
    // dispatch(setDetailsARecipe({} as RecipeDetailsType));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detailsARecipe?.recipeId?._id !== recipe__Id) {
      if (dbUser?._id && recipe__Id) {
        handleToGetARecipe(recipe__Id, dbUser?._id, token);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe__Id, dbUser?._id, token]);

  useEffect(() => {
    dispatch(updateSidebarActiveMenuName("Blends"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchIngrdients(
      detailsARecipe?.tempVersionInfo?.version?.ingredients.filter(
        (ing) => ing?.ingredientStatus === "ok",
      ),
      nutritionState,
      () => {},
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsARecipe?.tempVersionInfo?.version?.ingredients, nutritionState]);

  //@ts-ignore
  const recipeBasedNutrition =
    nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  if (getARecipeLoading) {
    return (
      <AContainer showHeader={true} logo={true}>
        <SkeletonRecipeDetails />;
      </AContainer>
    );
  }
  if (getARecipeError) {
    return (
      <AContainer showHeader={true} logo={true}>
        <ErrorPage errorMessage="Recipe not found" />;
      </AContainer>
    );
  }

  return (
    <RecipeDetails
      recipeData={
        getARecipeLoading ? ({} as RecipeDetailsType) : detailsARecipe
      }
      nutritionData={
        recipeBasedNutrition ? JSON.parse(recipeBasedNutrition) : []
      }
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      nutritionDataLoading={nutritionDataLoading}
      giGl={giGl}
      pageComeFrom="details"
    />
  );
};

//compilation

export default Index;

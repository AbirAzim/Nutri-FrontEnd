import { useQuery } from "@apollo/client";
import { faClock, faFire, faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import Widget from "../../../../component/module/Widget/Widget.component";
import client from "../../../../gqlLib/client";
import GET_ALL_LATEST_RECIPES from "../../../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../../../gqlLib/recipes/queries/getRecommendedRecipes";
import joniIngredients from "../../../../helperFunc/joinIngredients";
import { useAppSelector } from "../../../../redux/hooks";
import DataCardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import SkeletonRecipeDiscovery from "../../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import { Ingredient, RecipeType } from "../../../../type/recipeType";
import AppdownLoadCard from "../AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../ContentTray/ContentTray.component";
import styles from "../recipeDiscovery.module.scss";

type UpdateRecipeFunc = (
  id: string,
  obj: object,
  innerLabel?: "defaultVersion" | "recipeId",
) => void;
const defaultHeadingContent = {
  heading: "Recommended",
  image: "/images/thumbs-up.svg",
  allUrl: "recipes/recommended",
};
interface RegularRecipesType {
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShareRecipeData?: React.Dispatch<
    React.SetStateAction<{ id: string; image: string; name: string }>
  >;
}
const RegularRecipes = ({
  setOpenCollectionModal,
  setOpenShareModal,
  setShareRecipeData,
}: RegularRecipesType) => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    data: recommendedRecipesData,
    loading: recommendedRecipesLoading,
    error: recommendedRecipesError,
  } = useQuery(GET_ALL_RECOMMENDED_RECIPES, {
    // fetchPolicy: "cache-and-network",

    variables: { userId: dbUser?._id },
  });
  const {
    data: popularRecipesData,
    loading: popularRecipesLoading,
    error: popularRecipesError,
  } = useQuery(GET_ALL_POPULAR_RECIPES, {
    // fetchPolicy: "cache-and-network",
    variables: { userId: dbUser?._id },
  });
  const {
    data: latestRecipesData,
    loading: latestRecipesLoading,
    error: latestRecipesError,
  } = useQuery(GET_ALL_LATEST_RECIPES, {
    // fetchPolicy: "cache-and-network",
    variables: { userId: dbUser?._id },
  });

  const updateRecipe: UpdateRecipeFunc = useCallback(
    (id = "", obj = {}, innerLabel) => {
      // update apollo client cache

      client.writeQuery({
        query: GET_ALL_RECOMMENDED_RECIPES,
        variables: { userId: dbUser?._id },
        data: {
          getAllrecomendedRecipes2:
            recommendedRecipesData?.getAllrecomendedRecipes2?.map((recipe) =>
              recipe?.recipeId?._id === id
                ? {
                    ...recipe,
                    ...obj,
                    [innerLabel]: { ...recipe[innerLabel], ...obj },
                  }
                : recipe,
            ),
        },
      });
      client.writeQuery({
        query: GET_ALL_POPULAR_RECIPES,
        variables: { userId: dbUser?._id },
        data: {
          getAllpopularRecipes2: popularRecipesData?.getAllpopularRecipes2?.map(
            (recipe) =>
              recipe?.recipeId?._id === id
                ? {
                    ...recipe,
                    ...obj,
                    [innerLabel]: { ...recipe[innerLabel], ...obj },
                  }
                : recipe,
          ),
        },
      });
      client.writeQuery({
        query: GET_ALL_LATEST_RECIPES,
        variables: { userId: dbUser?._id },
        data: {
          getAllLatestRecipes2: latestRecipesData?.getAllLatestRecipes2?.map(
            (recipe) =>
              recipe?.recipeId?._id === id
                ? {
                    ...recipe,
                    ...obj,
                    [innerLabel]: { ...recipe[innerLabel], ...obj },
                  }
                : recipe,
          ),
        },
      });
    },

    [
      dbUser?._id,
      latestRecipesData?.getAllLatestRecipes2,
      popularRecipesData?.getAllpopularRecipes2,
      recommendedRecipesData?.getAllrecomendedRecipes2,
    ],
  );

  return (
    <>
      <AppdownLoadCard />
      <div className={styles.main__tray}>
        {/* its for recommended */}
        <ShowRecipes
          headerData={{
            heading: "Recommended",
            image: (
              <FontAwesomeIcon icon={faThumbsUp} color="#fe5d1f" size="2x" />
            ),
            allUrl: "recipes/recommended",
          }}
          loading={recommendedRecipesLoading}
          recipes={recommendedRecipesData?.getAllrecomendedRecipes2}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
          updateDataFunc={updateRecipe}
        />
        {/* its for latest */}
        <ShowRecipes
          headerData={{
            heading: "Recent",
            image: <FontAwesomeIcon icon={faClock} color="#fe5d1f" size="2x" />,
            allUrl: "recipes/latest",
          }}
          loading={latestRecipesLoading}
          recipes={latestRecipesData?.getAllLatestRecipes2}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
          updateDataFunc={updateRecipe}
        />
        {/* its for popular */}
        <ShowRecipes
          headerData={{
            heading: "Popular",
            image: <FontAwesomeIcon icon={faFire} color="#fe5d1f" size="2x" />,
            allUrl: "recipes/popular",
          }}
          loading={popularRecipesLoading}
          recipes={popularRecipesData?.getAllpopularRecipes2}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
          updateDataFunc={updateRecipe}
        />

        <Widget slug="recipe-editor" />
      </div>
    </>
  );
};

interface ShowRecipesType {
  recipes: RecipeType[];
  loading: boolean;
  headerData: {
    heading: string;
    image: string | React.ReactChild;
    allUrl: string;
  };
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShareRecipeData?: React.Dispatch<
    React.SetStateAction<{ id: string; image: string; name: string }>
  >;
  updateDataFunc?: (id: string, obj: { [key: string]: any }) => void;
}

export const ShowRecipes = ({
  headerData = defaultHeadingContent,
  loading = false,
  recipes = [],
  setOpenCollectionModal,
  setOpenShareModal = () => {},
  setShareRecipeData = () => {},
  updateDataFunc = () => {},
}: ShowRecipesType) => {
  if (loading) {
    return <SkeletonRecipeDiscovery />;
  }
  return (
    <>
      {recipes.length ? (
        <ContentTray {...headerData}>
          {recipes?.map((item, index) => {
            const {
              recipeId: {
                _id = "",
                name = "",
                image = "",
                originalVersion = "",
                numberOfRating = 0,
                averageRating = 0,
                recipeBlendCategory,
                userId,
                brand,
              },
              defaultVersion: {
                _id: defaultVersionId = "",
                postfixTitle = "",
                ingredients,
                description = "",
                calorie: { value: calorieValue },
                gigl: { netCarbs },
              },
              isMatch = false,
              allRecipes = false,
              myRecipes = false,
              notes = 0,
              addedToCompare = false,
              userCollections = [],
              versionCount = 0,
              personalRating = 0,
            } = item;
            const ing = joniIngredients(ingredients);
            return (
              <div
                className={styles.slider__card}
                key={`${headerData.heading}${index}`}
              >
                <DataCardComponent
                  title={name}
                  ingredients={ing}
                  category={recipeBlendCategory?.name}
                  ratings={averageRating}
                  noOfRatings={numberOfRating}
                  carbs={netCarbs}
                  // score={rxScore}
                  calorie={calorieValue}
                  noOfComments={numberOfRating}
                  image={
                    image.find((img) => img?.default)?.image ||
                    image?.[0]?.image ||
                    ""
                  }
                  recipeId={_id}
                  notes={notes}
                  addedToCompare={addedToCompare}
                  isCollectionIds={userCollections}
                  setOpenCollectionModal={setOpenCollectionModal}
                  isMatch={isMatch}
                  postfixTitle={postfixTitle}
                  defaultVersionId={defaultVersionId}
                  userId={userId}
                  recipeVersion={versionCount}
                  showMoreMenuAtHover={true}
                  setShareRecipeData={setShareRecipeData}
                  setOpenShareModal={setOpenShareModal}
                  token={item?.token}
                  updateDataFunc={updateDataFunc}
                  brand={brand}
                  personalRating={personalRating}
                />
              </div>
            );
          })}
        </ContentTray>
      ) : null}
    </>
  );
};

export default RegularRecipes;

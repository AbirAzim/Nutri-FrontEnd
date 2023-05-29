import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_INGREDIENTS_BASED_ON_NURTITION from "../../../gqlLib/wiki/query/getAllIngredientsBasedOnNutrition";
import GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI from "../../../gqlLib/wiki/query/getBlendNutritionBasedIngredientsWiki";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setLoading,
  updateSidebarActiveMenuName,
} from "../../../redux/slices/utilitySlice";
import NutritionPanel from "../../recipe/share/nutritionPanel/NutritionPanel";
import notification from "../../utility/reactToastifyNotification";
import WikiCenterComponent from "../WikiCenter";
import WikiRightComponent from "../WikiRight";
import styles from "../../pageLayout/pageLayout.module.scss";
import { useRouter } from "next/router";
import RelatedWikiItem from "./realtedWikiItem/RelatedWikiItem";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";
import { GiGl } from "../../../type/nutrationType";
import {
  WikiDetailsIngredientType,
  WikiDetailsNutrientType,
} from "../../../type/wikiDetailsType";
import { WikiType } from "../../../type/wikiListType";
import useWindowSize from "../../utility/useWindowSize";
import ShowRelatedItems from "../../showRelatedItems";
import dummyData from "./dummyData";
export const placeHolderImage = "/images/no-image-available.webp";

interface Props {
  type?: string;
  wikiId?: string;
  measurementWeight?: string;
}

function WikiSingleItem() {
  const [defaultMeasureMentWeight, setDefaultMeasureMentWeight] = useState("");
  const [scrollPoint, setScrollPoint] = useState("");
  const [currentWikiId, setCurrentWikiId] = useState("");
  const [portions, setPortions] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { params = [] } = router?.query;
  const type: string = params?.[0] || "Ingredient";
  const wikiId = params?.[1] || "";
  const params2 = params?.[2] || "0";
  const { dbUser } = useAppSelector((state) => state?.user);
  const [getAllIngredientsBasedOnNutrition, ingredientsData] = useLazyQuery(
    GET_ALL_INGREDIENTS_BASED_ON_NURTITION,
    { fetchPolicy: "network-only" },
  );
  const [getBlendNutritionBasedIngredientsWiki, nutritionData] = useLazyQuery(
    GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI,
    { fetchPolicy: "network-only" },
  );
  const { width } = useWindowSize();

  const [
    getNutrientsListAndGiGlByIngredients,
    {
      data: nutritionPanelData,
      loading: nutritionPanelDataLoading,
      error: nutritionPanelError,
    },
  ] = useLazyQuery(GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS);

  const fetchNutritionPanelData = async (
    measureMentWeight: string,
    id?: string,
  ) => {
    try {
      await getNutrientsListAndGiGlByIngredients({
        variables: {
          ingredientsInfo: [
            {
              ingredientId: id || currentWikiId,
              value: parseInt(
                measureMentWeight || params2 || defaultMeasureMentWeight,
              ),
            },
          ],
          userId: dbUser?._id,
        },
      });
    } catch (error) {
      notification("error", "Failed to fetch nutrition panel data");
    }
  };

  const fetchData = async (id?: string, measureMentWeight?: string) => {
    dispatch(setLoading(true));
    try {
      if (type === "Nutrient") {
        await getAllIngredientsBasedOnNutrition({
          variables: {
            data: {
              nutritionID: id || wikiId,
              category: "All",
            },
            userId: dbUser?._id,
          },
        });
        dispatch(setLoading(false));
      }
      if (type === "Ingredient") {
        const { data } = await getBlendNutritionBasedIngredientsWiki({
          variables: {
            ingredientsInfo: [
              {
                ingredientId: id || wikiId,
                value: parseInt(measureMentWeight || params2),
              },
            ],
            userId: dbUser?._id,
          },
        });

        const res: WikiDetailsIngredientType =
          data?.getBlendNutritionBasedIngredientsWiki2;
        setPortions(res?.portions);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    if (wikiId) {
      fetchData(wikiId, params2);
      setCurrentWikiId(wikiId);
      setDefaultMeasureMentWeight(params2);
      if (type === "Ingredient") {
        fetchNutritionPanelData(params2, wikiId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiId]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash?.slice(0, 1) === "#") {
      setScrollPoint(hash?.slice(1));
    }
  }, []);

  useEffect(() => {
    dispatch(updateSidebarActiveMenuName("Wiki"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (ingredientsData?.error || nutritionData?.error) {
    return <div>Error</div>;
  }
  const dataObj = {
    Nutrient: ingredientsData?.data?.getAllIngredientsBasedOnNutrition2,
    Ingredient: nutritionData?.data?.getBlendNutritionBasedIngredientsWiki2,
  };

  const data = dataObj[type];
  const nutrients =
    nutritionPanelData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl =
    nutritionPanelData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <AContainer
      headerIcon={"/icons/books.svg"}
      headerTitle="Wiki details"
      showWikiCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      headTagInfo={{
        title: `Wiki ${type} details`,
        description: `wiki ${type} details`,
      }}
    >
      <div className={styles.main}>
        <div className={styles.left}>
          <RelatedWikiItem type={type} />
        </div>

        <div className={styles.center}>
          <WikiCenterComponent
            author={data?.publishedBy}
            body={data?.bodies}
            categroy={data?.category}
            coverImages={data?.wikiCoverImages}
            heading={`About ${data?.type}`}
            name={data?.wikiTitle}
            description={data?.wikiDescription}
            giGl={giGl}
            type={data?.type}
            wikiId={wikiId}
            commentsCount={data?.commentsCount}
            scrollPoint={scrollPoint}
            ingredientBookmarkList={data?.ingredientBookmarkList || []}
            nutrientBookmarkList={data?.nutrientBookmarkList || []}
            fetchNutritionPanelData={fetchNutritionPanelData}
            setDefaultMeasureMentWeight={setDefaultMeasureMentWeight}
            setCurrentWikiId={setCurrentWikiId}
            setPortions={setPortions}
            originalPortions={data?.portions}
          />
        </div>
        <div className={styles.right}>
          {type === "Ingredient" && (
            <NutritionPanel
              nutritionTrayData={nutrients ? JSON?.parse(nutrients) : {}}
              showUser={true}
              counter={1}
              nutritionDataLoading={nutritionPanelDataLoading}
              showServing={false}
              measurementDropDownState={{
                showDropDown: true,
                value: defaultMeasureMentWeight,
                handleChange: (e) => {
                  setDefaultMeasureMentWeight(e?.target?.value);
                  fetchNutritionPanelData(e?.target?.value);
                },
                listElem: portions?.map((item) => ({
                  name: `1 ${item?.measurement} (${item?.meausermentWeight}g)`,
                  value: item?.meausermentWeight,
                })),
              }}
              isNutrientPanelHasMyFacts={true}
              wikiId={wikiId}
            />
          )}
          {type === "Nutrient" && (
            <WikiRightComponent
              ingredient={data?.ingredients}
              wikiId={currentWikiId}
              ingredientsDataLoading={ingredientsData?.loading}
              isIngredientHasMyFacts={true}
              mainWikiId={wikiId}
            />
          )}
        </div>
      </div>
      {width < 1280 ? (
        <ShowRelatedItems
          category="wiki"
          title={`Related ${type}`}
          itemsList={
            type === "Ingredient" ? dummyData?.Ingredient : dummyData?.Nutrient
          }
        />
      ) : null}
    </AContainer>
  );
}

export default WikiSingleItem;

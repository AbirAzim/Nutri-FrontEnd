import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../wikiCenter.module.scss";
import { CoverImageType, WikiCenterComponentProps } from "..";
import TopHeader from "./TopHeader";
import SubHeader from "./SubHeader";
import { Portion } from "../../../../type/wikiListType";
import IngredientInfo from "./ingredientInfo/IngredientInfo";
import NutrientBookmarkList from "./NutrientBookmarkList";
import IngredientBookmarkList from "./IngredientBookmarkList";
import ReadMore from "../../../../theme/readMore";
import ImageSlider from "./ImageSlider";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
} from "../../../../redux/slices/wikiSlice";

const FirstPortion = ({
  author = "Author",
  categroy = "Categroy",
  coverImages = [],
  heading = "About Heading",
  name = "Name",
  description = "",
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
  type = "Ingredient",
  wikiId = "",
  commentsCount = 0,
  ingredientBookmarkList = [],
  nutrientBookmarkList = [],
  fetchNutritionPanelData = () => {},
  setCurrentWikiId = () => {},
  setDefaultMeasureMentWeight = () => {},
  setPortions = () => {},
  originalPortions: originalPortions = [],
  expandAllCollapse = true,
  setExpandAllCollapse = () => {},
  imagesWithinBlock = [],
}: WikiCenterComponentProps & {
  expandAllCollapse?: boolean;
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
  imagesWithinBlock?: CoverImageType[];
}) => {
  const [activeVariant, setActiveVariant] = useState<number>(0);
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);
  const dispatch = useAppDispatch();

  const openWikiCommentsTray = (id: string) => {
    if (!isOpenWikiCommentsTray) {
      dispatch(setIsOpenWikiCommentsTray(true));
    }
    dispatch(
      setWikiCommentsCurrentIngredient({
        ...wikiCommentsTrayCurrentWikiEntity,
        id,
      }),
    );
  };

  const updatePanel = (index: number, id: string, portions?: Portion[]) => {
    if (type === "Nutrient") {
      setActiveVariant(index);
      setCurrentWikiId(id);
    }
    if (type === "Ingredient") {
      const defaultMeasureMentWeight = portions?.find((item) => item?.default);
      setPortions(portions);
      setCurrentWikiId(id);
      setDefaultMeasureMentWeight(defaultMeasureMentWeight?.meausermentWeight);
      setActiveVariant(index);
      fetchNutritionPanelData(defaultMeasureMentWeight?.meausermentWeight, id);
    }
  };

  return (
    <>
      <TopHeader title={type} backAddress="/wiki" />

      <div className={styles.card}>
        <div className={styles.blendingRecipeHeading}>
          <h3>{name}</h3>
        </div>
        <SubHeader
          id={wikiId}
          author={author}
          categroy={categroy}
          commentsCount={commentsCount}
          expandAllCollapse={expandAllCollapse}
          setExpandAllCollapse={setExpandAllCollapse}
          handleToOpenCommentTray={openWikiCommentsTray}
        />
        <ImageSlider
          imagesWithinBlock={imagesWithinBlock}
          setExpandAllCollapse={setExpandAllCollapse}
        />

        {type === "Ingredient" && (
          <div className={styles.ingredientInfoContainer}>
            <IngredientInfo borderRight={true} />
            <IngredientInfo
              borderRight={true}
              text="Glycemic Index"
              amount={Math?.round(giGl?.totalGi)}
            />
            <IngredientInfo
              borderRight={true}
              text="Glycemic Load"
              amount={Math?.round(giGl?.totalGL)}
            />
            <IngredientInfo amount={240} text="Nutri Score" />
          </div>
        )}
        <div className={styles.variantContainer}>
          {nutrientBookmarkList?.length ? (
            <NutrientBookmarkList
              updatePanel={updatePanel}
              wikiId={wikiId}
              activeVariant={activeVariant}
              name={name}
              nutrientBookmarkList={nutrientBookmarkList}
            />
          ) : null}

          {ingredientBookmarkList?.length ? (
            <IngredientBookmarkList
              updatePanel={updatePanel}
              wikiId={wikiId}
              activeVariant={activeVariant}
              ingredientBookmarkList={ingredientBookmarkList}
              name={name}
              originalPortions={originalPortions}
            />
          ) : null}
        </div>
        <div className={styles.wikiDescriptionBox}>
          <ReadMore>
            <p className={styles.textDis}>{description}</p>
          </ReadMore>
        </div>
      </div>
    </>
  );
};

export default FirstPortion;

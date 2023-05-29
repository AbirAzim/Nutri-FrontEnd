/* eslint-disable @next/next/no-img-element */
import React from "react";
import TrayWrapper from "../TrayWrapper";
import styles from "./filter.module.scss";
import { FaEye } from "react-icons/fa";
import { BsTagsFill } from "react-icons/bs";
import TagSection from "./tag/TagSection";
import VisualSection from "./visaul/VisualSection";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import TrayTag from "../TrayTag";
import { FiFilter } from "react-icons/fi";
import {
  FilterCriteriaValue,
  updateActiveFilterTag,
  updateFilterCriteriaItem,
} from "../../../redux/slices/filterRecipeSlice";
import { useQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../gqlLib/category/queries/fetchCategories";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function Filtertray({ showPanle, showTagByDefaut }: Props) {
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const { allFilters, activeFilterTag } = useAppSelector(
    (state) => state?.filterRecipe,
  );
  const dispatch = useAppDispatch();
  const { data: blendCategoryData, loading: blendCategoryLoading } = useQuery(
    FETCH_BLEND_CATEGORIES,
  );
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  // toggle tab
  const handleToggle = (no: number) => {
    dispatch(
      updateActiveFilterTag({
        ...activeFilterTag,
        activeSection: no === 0 ? "visual" : "tags",
      }),
    );
  };

  const toggleTray = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

  //check active filter item
  const checkActiveItem = (id: string) => {
    return allFilters.some((item) => item?.id === id);
  };
  //check active filter item
  const checkExcludeIngredientIds = (id: string) => {
    return allFilters.some(
      (item) =>
        item?.filterCriteria === "includeIngredientIds" &&
        item?.id === id &&
        //@ts-ignore
        item?.excludeIngredientIds,
    );
  };

  // blend and ingredient update function
  const handleBlendAndIngredientUpdate = (
    item: any | FilterCriteriaValue,
    isItemExist: boolean,
    extraInfo?: any,
  ) => {
    // const isItemExist = checkActiveItem(item?.id);
    dispatch(
      updateFilterCriteriaItem({
        updateStatus: isItemExist ? "remove" : "add",
        value: extraInfo,
        filterCriteria: item.filterCategory,
      }),
    );
  };

  return (
    <TrayWrapper
      closeTray={toggleTray}
      openTray={openFilterTray}
      showTagByDefaut={showTagByDefaut}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag icon={<FiFilter />} placeMent="left" hover={hover} />
      )}
    >
      <ToggleMenu
        setToggle={handleToggle}
        toggle={activeFilterTag.activeSection === "visual" ? 0 : 1}
        toggleMenuList={[
          <div key={"key0"} style={{ display: "flex", alignItems: "center" }}>
            <FaEye className={styles.tag} />
            <p>Visual</p>
          </div>,
          <div key={"key1"} style={{ display: "flex", alignItems: "center" }}>
            <BsTagsFill className={styles.tag} />
            <p>Tags</p>
          </div>,
        ]}
        variant={"containSecondary"}
      />

      {activeFilterTag.activeSection === "visual" && (
        <VisualSection
          checkActiveItem={checkActiveItem}
          handleBlendAndIngredientUpdate={handleBlendAndIngredientUpdate}
          blendCategoryData={blendCategoryData?.getAllCategories}
          blendCategoryLoading={blendCategoryLoading}
          ingredientCategoryData={
            ingredientCategoryData?.filterIngredientByCategoryAndClass
          }
          ingredientCategoryLoading={ingredientCategoryLoading}
        />
      )}
      {activeFilterTag.activeSection === "tags" && (
        <TagSection
          checkActiveItem={checkActiveItem}
          blendCategoryData={blendCategoryData?.getAllCategories}
          blendCategoryLoading={blendCategoryLoading}
          ingredientCategoryData={
            ingredientCategoryData?.filterIngredientByCategoryAndClass
          }
          ingredientCategoryLoading={ingredientCategoryLoading}
          checkExcludeIngredientIds={checkExcludeIngredientIds}
        />
      )}
    </TrayWrapper>
  );
}

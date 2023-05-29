/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../filter.module.scss";
import Ingredients from "../ingredients/Ingredients.component";
import BlendType from "../blendType/BlendType";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
} from "../../../../redux/slices/filterRecipeSlice";
import { BlendCategoryType } from "../../../../type/blendCategoryType";

interface Props {
  checkActiveItem: (id: string) => boolean;
  handleBlendAndIngredientUpdate: (
    value: FilterCriteriaValue,
    present: boolean,
  ) => void;
  blendCategoryData: BlendCategoryType[];
  blendCategoryLoading: boolean;
  ingredientCategoryData: any[];
  ingredientCategoryLoading: boolean;
}

const VisualSection = ({
  checkActiveItem = () => false,
  handleBlendAndIngredientUpdate = () => {},
  blendCategoryData = [],
  blendCategoryLoading = false,
  ingredientCategoryData = [],
  ingredientCategoryLoading = false,
}: Props) => {
  return (
    <div className={styles.filter}>
      <BlendType
        checkActiveItem={checkActiveItem}
        handleBlendAndIngredientUpdate={handleBlendAndIngredientUpdate}
        blendCategoryData={blendCategoryData}
        blendCategoryLoading={blendCategoryLoading}
      />
      <Ingredients
        checkActiveIngredient={checkActiveItem}
        handleIngredientClick={handleBlendAndIngredientUpdate}
        ingredientCategoryData={ingredientCategoryData}
        ingredientCategoryLoading={ingredientCategoryLoading}
      />
    </div>
  );
};

export default VisualSection;

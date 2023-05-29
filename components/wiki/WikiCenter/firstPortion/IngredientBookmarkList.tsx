import React from "react";
import { IngredientBookmarkListType } from "../../../../type/wikiDetailsType";
import { Portion } from "../../../../type/wikiListType";
import styles from "../wikiCenter.module.scss";

interface Props {
  wikiId: string;
  ingredientBookmarkList?: IngredientBookmarkListType[];
  updatePanel: (index: number, id: string, portions?: Portion[]) => void;
  activeVariant?: number;
  name?: string;
  originalPortions?: Portion[];
}

const IngredientBookmarkList = ({
  updatePanel = () => {},
  wikiId = "",
  activeVariant = 0,
  ingredientBookmarkList = [],
  name = "",
  originalPortions = [],
}: Props) => {
  return (
    <>
      <p
        onClick={() => updatePanel(0, wikiId, originalPortions)}
        className={`${styles.variantItem} ${
          activeVariant === 0 ? styles.activeVariant : ""
        }`}
      >
        {name}
      </p>
      {ingredientBookmarkList
        .filter((variant) => !variant?.customBookmarkName)
        ?.map((variant, index) => {
          return (
            <p
              onClick={() =>
                updatePanel(
                  index + 1,
                  variant?.ingredientId?._id,
                  variant?.ingredientId?.portions,
                )
              }
              key={variant?.ingredientId?._id}
              className={`${styles.variantItem} ${
                activeVariant === index + 1 ? styles.activeVariant : ""
              }`}
            >
              {variant?.ingredientId?.ingredientName}
            </p>
          );
        })}
    </>
  );
};

export default IngredientBookmarkList;

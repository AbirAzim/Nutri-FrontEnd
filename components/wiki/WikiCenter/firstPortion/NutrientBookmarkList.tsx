import React from "react";
import { NutrientBookmarkListType } from "../../../../type/wikiDetailsType";
import { Portion } from "../../../../type/wikiListType";
import styles from "../wikiCenter.module.scss";

interface Porps {
  wikiId: string;
  nutrientBookmarkList?: NutrientBookmarkListType[];
  updatePanel: (index: number, id: string, portions?: Portion[]) => void;
  activeVariant?: number;
  name?: string;
}

const NutrientBookmarkList = ({
  wikiId = "",
  nutrientBookmarkList = [],
  updatePanel = () => {},
  activeVariant = 0,
  name = "",
}: Porps) => {
  return (
    <>
      <p
        onClick={() => updatePanel(0, wikiId)}
        className={`${styles.variantItem} ${
          activeVariant === 0 ? styles.activeVariant : ""
        }`}
      >
        {name}
      </p>
      {nutrientBookmarkList
        .filter((variant) => !variant?.customBookmarkName)
        ?.map((variant, index) => {
          return (
            <p
              onClick={() => updatePanel(index + 1, variant.nutrientId._id)}
              key={variant?.nutrientId?._id}
              className={`${styles.variantItem} ${
                activeVariant === index + 1 ? styles.activeVariant : ""
              }`}
            >
              {variant?.nutrientId?.nutrientName}
            </p>
          );
        })}
    </>
  );
};

export default NutrientBookmarkList;

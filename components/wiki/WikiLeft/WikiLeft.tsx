import React, { Dispatch, SetStateAction } from "react";
import s from "./WikiLeft.module.scss";
import FilterbottomComponent from "../../sidetray/filter/ingredients/Ingredients.component";
import WikiTypes from "../wikiTypes/WikiTypes";
import WikiNutritionPanel from "../wikiNutritionPanel/WikiNutritionPanel";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";
import { SelectedWikiType } from "..";
import { WikiType as Type } from "../../../type/wikiListType";
import { useQuery } from "@apollo/client";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
interface Props {
  type: Type;
  setType: Dispatch<SetStateAction<Type>>;
  selectedWikiItem?: SelectedWikiType;
  setSelectedWikiItem?: Dispatch<SetStateAction<SelectedWikiType>>;
}

const WikiLeft = ({
  type = "Ingredient",
  selectedWikiItem = {} as SelectedWikiType,
  setSelectedWikiItem = () => {},
  setType = () => {},
}: Props) => {
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  const checkActive = (id: string) => {
    return selectedWikiItem[type]?.includes(id);
  };

  const handleItemClick = (item: any = {}, isExist) => {
    const checkWikiList = (list: string[], id: string) => {
      if (list?.length) {
        return [...list, id];
      } else {
        return [id];
      }
    };
    if (isExist) {
      setSelectedWikiItem((wikiItem) => ({
        ...wikiItem,
        [type]: wikiItem[type]?.filter((items) => items !== item?._id) || [],
      }));
    } else {
      setSelectedWikiItem((wikiItem) => ({
        ...wikiItem,
        [type]: [...checkWikiList(wikiItem[type], item?._id)],
      }));
    }
  };

  const renderUi = (type: Type) => {
    switch (type) {
      case "Ingredient":
        return (
          <FilterbottomComponent
            checkActiveIngredient={checkActive}
            handleIngredientClick={handleItemClick}
            scrollAreaMaxHeight={{ maxHeight: "450px" }}
            ingredientCategoryData={
              ingredientCategoryData?.filterIngredientByCategoryAndClass
            }
            ingredientCategoryLoading={ingredientCategoryLoading}
          />
        );
      case "Nutrient":
        return (
          <WikiNutritionPanel
            checkActiveNutrition={checkActive}
            handleNutritionClick={handleItemClick}
          />
        );

      case "Health":
        return <WikiHealthPanel />;

      default:
        break;
    }
  };

  return (
    <div className={s.wikiLeftContainer}>
      <WikiTypes type={type} setType={setType} />
      {renderUi(type)}
    </div>
  );
};

export default WikiLeft;

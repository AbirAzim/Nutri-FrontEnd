import React, { Dispatch, SetStateAction } from "react";
import CalciumSearchElem from "../../../../theme/calcium/calcium.component";
import Linearcomponent from "../../../../theme/linearProgress/LinearProgress.component";
import IngredientPanelSkeleton from "../../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";
import { ingredientState, List } from "../ingredients/Ingredients.component";
import styles from "../filter.module.scss";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
} from "../../../../redux/slices/filterRecipeSlice";
import useWindowSize from "../../../utility/useWindowSize";

interface Props {
  ascendingDescending?: boolean;
  setascendingDescending?: Dispatch<SetStateAction<boolean>>;
  list?: List[];
  setList?: Dispatch<SetStateAction<List[]>>;
  rankingDropDownState?: string;
  setRankingDropDownState?: Dispatch<SetStateAction<string>>;
  scrollAreaMaxHeight?: React.CSSProperties;
  checkActiveItem: (id: string) => boolean;
  handleBlendAndIngredientUpdate: (
    value?: any | FilterCriteriaValue,
    present?: boolean,
    extraInfo?: any | FilterCriteriaValue,
  ) => void;
  nutritionLoading?: boolean;
  arrayOrderState?: any[];
  allIngredients?: any[];
}

const RankingSection = ({
  ascendingDescending = true,
  list = [],
  rankingDropDownState = "",
  setList = () => {},
  setRankingDropDownState = () => {},
  setascendingDescending = () => {},
  checkActiveItem = () => false,
  handleBlendAndIngredientUpdate = () => {},
  scrollAreaMaxHeight = { maxHeight: "350px" },
  nutritionLoading = false,
  arrayOrderState = [],
  allIngredients = [],
}: Props) => {
  const { height } = useWindowSize();
  const handleIngredientClick = (item) => {
    handleBlendAndIngredientUpdate(item, checkActiveItem(item?._id), {
      id: item?._id,
      image: item?.featuredImage || "/food/chard.png",
      name: item?.ingredientName,
      tagLabel: "",
      filterCriteria: "includeIngredientIds",
      origin: {
        activeSection: "visual",
        filterCriteria: "includeIngredientIds",
        activeTab: "Ingredients",
        childTab: item?.ingredientName || "",
      },
    });
  };
  return (
    <div className={styles.rankings}>
      <CalciumSearchElem
        ascendingDescending={ascendingDescending}
        setascendingDescending={setascendingDescending}
        list={list}
        setList={setList}
        dropDownState={rankingDropDownState}
        setDropDownState={setRankingDropDownState}
      />
      <div
        className={`${styles.rankgingItemContainer} y-scroll`}
        style={{ maxHeight: `${height - 350}px` }}
      >
        {nutritionLoading ? (
          <IngredientPanelSkeleton />
        ) : arrayOrderState?.length ? (
          arrayOrderState?.map(
            (
              { name, value, units, ingredientId, portion }: ingredientState,
              index,
            ) => {
              return (
                <Linearcomponent
                  name={name}
                  percent={Number(value?.toFixed(2))}
                  key={index}
                  units={units}
                  //@ts-ignore
                  highestValue={
                    ascendingDescending
                      ? arrayOrderState[0]?.value
                      : arrayOrderState[arrayOrderState?.length - 1]?.value
                  }
                  checkbox={true}
                  checkedState={checkActiveItem(ingredientId)}
                  handleOnChange={() =>
                    handleIngredientClick(
                      allIngredients?.find(
                        (item) => item?._id === ingredientId,
                      ) || {},
                    )
                  }
                  portion={portion}
                />
              );
            },
          )
        ) : (
          <div className={styles.noResult}>
            <p>No Ingredients</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingSection;

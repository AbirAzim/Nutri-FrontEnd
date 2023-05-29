/* eslint-disable @next/next/no-img-element */
import React from "react";
import Cancel from "../../public/icons/cancel_black_24dp.svg";
import { useAppDispatch } from "../../redux/hooks";

import styles from "./searchtag.module.scss";
import {
  ActiveFilterTagCriteriaType,
  FilterCriteriaValue,
  updateActiveFilterTag,
  updateFilterCriteriaItem,
} from "../../redux/slices/filterRecipeSlice";
import { setOpenFilterTray } from "../../redux/slices/sideTraySlice";

interface searchtagsComponentProps {
  allFilters?: FilterCriteriaValue[];
}

export default function SearchtagsComponent({
  allFilters = [],
}: searchtagsComponentProps) {
  const dispatch = useAppDispatch();
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

  const handleUpdateActiveFilterTag = (
    activeFilterTag: ActiveFilterTagCriteriaType,
  ) => {
    dispatch(setOpenFilterTray(true));
    dispatch(updateActiveFilterTag(activeFilterTag));
  };
  return (
    <div className={styles.searchtab}>
      {allFilters?.length
        ? allFilters.map((filterItem) => {
            const { tagLabel, id } = filterItem;
            const checkExcludeId = checkExcludeIngredientIds(id);
            return tagLabel ? (
              <FilterByTag
                key={id}
                item={filterItem}
                isIdExcluded={checkExcludeId}
                handleUpdateActiveFilterTag={handleUpdateActiveFilterTag}
              />
            ) : (
              <FilterByPicture
                key={id}
                item={filterItem}
                isIdExcluded={checkExcludeId}
                handleUpdateActiveFilterTag={handleUpdateActiveFilterTag}
              />
            );
          })
        : null}
    </div>
  );
}

const FilterByPicture = ({
  item,
  isIdExcluded = false,
  handleUpdateActiveFilterTag,
}: {
  item: FilterCriteriaValue;
  isIdExcluded: boolean;
  handleUpdateActiveFilterTag: (args: ActiveFilterTagCriteriaType) => void;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.item} ${
        isIdExcluded ? styles.activeItemPrimary : ""
      }`}
      onClick={() => handleUpdateActiveFilterTag(item?.origin)}
    >
      <div
        className={styles.cross}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            updateFilterCriteriaItem({
              updateStatus: "remove",
              filterCriteria: item.filterCriteria,
              value: item,
            }),
          );
        }}
      >
        <Cancel className={styles.cancel} />
      </div>

      <div className={styles.image}>
        {/*  @ts-ignore */}
        <img src={item?.image} alt="img" />
      </div>
      <p>{item?.name}</p>
    </div>
  );
};

const FilterByTag = ({
  item,
  isIdExcluded = false,
  handleUpdateActiveFilterTag,
}: {
  item: FilterCriteriaValue;
  isIdExcluded: boolean;
  handleUpdateActiveFilterTag: (args: ActiveFilterTagCriteriaType) => void;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.item} ${
        isIdExcluded ? styles.activeItemPrimary : ""
      }`}
      style={{ minHeight: "35px" }}
      onClick={() => handleUpdateActiveFilterTag(item?.origin)}
    >
      <div
        className={styles.cross}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            updateFilterCriteriaItem({
              updateStatus: "remove",
              filterCriteria: item.filterCriteria,
              value: item,
            }),
          );
        }}
      >
        <Cancel className={styles.cancel} />
      </div>

      <p>{item.tagLabel}</p>
    </div>
  );
};

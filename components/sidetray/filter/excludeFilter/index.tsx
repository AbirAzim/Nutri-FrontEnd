import React from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  IngredientType,
  updateFilterCriteriaItem,
} from "../../../../redux/slices/filterRecipeSlice";
import styles from "./ExcludeFilter.module.scss";

interface Props {
  excludeFilterState: IngredientType;
}

const ExcludeFilter = ({ excludeFilterState }: Props) => {
  const { excludeIngredientIds, id = "" } = excludeFilterState;

  const dispatch = useAppDispatch();
  const handleIncludeExclude = (status: boolean) => {
    if (id) {
      dispatch(
        updateFilterCriteriaItem({
          updateStatus: "update",
          value: {
            ...excludeFilterState,
            excludeIngredientIds: status,
          },
          filterCriteria: "includeIngredientIds",
        }),
      );
    }
  };

  return (
    <div
      className={`${styles.tabContainer} ${
        excludeIngredientIds === undefined
          ? ""
          : excludeIngredientIds
          ? styles.activeTabContainerPrimary
          : styles.activeTabContainerSecondary
      }`}
    >
      <div
        className={`${styles.firstChild} ${
          excludeIngredientIds ? styles.activePrimary : ""
        }`}
        onClick={() => handleIncludeExclude(true)}
      >
        Without
      </div>

      <div
        className={`${styles.lastChild} ${
          excludeIngredientIds ? "" : styles.activeSecondary
        }`}
        onClick={() => handleIncludeExclude(false)}
      >
        With
      </div>
    </div>
  );
};

export default ExcludeFilter;

import React, { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import styles from "./OptionSelect.module.scss";
import {
  ActiveFilterTagCriteriaType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  updateFilterCriteriaItem,
} from "../../../../redux/slices/filterRecipeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import OptionSelectSkeleton from "../../../../theme/skeletons/optionSelectSkeleton/OptionSelectSkeleton";

type OptionSelectProps = {
  checkActiveItem: (id: string) => boolean;
  // handleBlendAndIngredientUpdate: (
  //   value: FilterCriteriaValue,
  //   present: boolean,
  // ) => void;
  optionSelectItems: any[];
  filterCriteria: FilterCriteriaOptions;
  checkExcludeIngredientIds?: (id: string) => boolean;
  focusOptionId?: string;
  activeFilterTag: ActiveFilterTagCriteriaType;
  optionsLoading?: boolean;
};

const OptionSelect = ({
  checkActiveItem = () => false,
  filterCriteria,
  optionSelectItems = [],
  checkExcludeIngredientIds = () => false,
  focusOptionId = "",
  activeFilterTag,
  optionsLoading = false,
}: OptionSelectProps) => {
  if (optionsLoading) {
    return <OptionSelectSkeleton />;
  }

  return (
    <div className={styles.optionSelectContainer}>
      <div className={styles.options}>
        {optionSelectItems?.length
          ? optionSelectItems?.map((item, index) => {
              const isSelected = checkActiveItem(item.id);
              const isIdExcluded = checkExcludeIngredientIds(item.id);
              return (
                <Chip
                  key={item?.id}
                  item={item}
                  filterCriteria={filterCriteria}
                  isSelected={isSelected}
                  isIdExcluded={isIdExcluded}
                  focusOptionId={focusOptionId}
                  activeFilterTag={activeFilterTag}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

const Chip = ({
  item,
  isSelected,
  filterCriteria,
  isIdExcluded,
  focusOptionId = "",
  activeFilterTag = {},
}) => {
  const [isChipHovered, setIsChipHovered] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${styles.signleItem} ${
        isSelected
          ? isIdExcluded
            ? styles.selectedPrimary
            : styles.selectedSecondary
          : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          updateFilterCriteriaItem({
            updateStatus: isSelected ? "focus" : "add",
            value: {
              ...item,
              origin: { ...activeFilterTag },
            },
            filterCriteria,
          }),
        );
      }}
      onMouseOver={() => setIsChipHovered(true)}
      onMouseOut={() => setIsChipHovered(false)}
    >
      <span
        className={`${
          item.id === focusOptionId
            ? isIdExcluded
              ? styles.activeColorPrimary
              : styles.activeColorSecondary
            : ""
        }`}
      >
        {item?.name}
      </span>
      {isSelected && (
        <div className={styles.tick}>
          {isChipHovered ? (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.ticked}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  updateFilterCriteriaItem({
                    updateStatus: "remove",
                    value: {
                      ...item,
                      origin: { ...activeFilterTag },
                    },
                    filterCriteria,
                  }),
                );
                // handleBlendAndIngredientUpdate(filterCriteria, item);
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faCircleCheck} className={styles.ticked} />
          )}
        </div>
      )}
    </div>
  );
};

export default OptionSelect;

import React from "react";
import { BsArrowRepeat, BsChevronLeft } from "react-icons/bs";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  updateActiveFilterTag,
  updateFilterCriteriaItem,
} from "../../../../redux/slices/filterRecipeSlice";
import styles from "./OptionSelect.module.scss";

type OptionSelectHeaderProps = {
  activeTab: string;
  filterCriteria: any;
};

const OptionSelectHeader = ({
  activeTab,
  filterCriteria,
}: OptionSelectHeaderProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.optionSelectHeaderContainer}>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <div
            className={styles.icon}
            onClick={() =>
              dispatch(
                updateActiveFilterTag({
                  activeTab: "",
                  childTab: "",
                  filterCriteria: null,
                  activeSection: "tags",
                }),
              )
            }
          >
            <BsChevronLeft />
          </div>
          <h3>{activeTab}</h3>
        </div>
        <div
          className={styles.rightSide}
          onClick={() =>
            dispatch(
              updateFilterCriteriaItem({
                filterCriteria,
                updateStatus: "removeAll",
              }),
            )
          }
        >
          <BsArrowRepeat />
        </div>
      </div>
      <input className={styles.optionSelectInput} placeholder="Search" />
    </div>
  );
};

export default OptionSelectHeader;

import React, { useCallback, useRef, useState, useEffect } from "react";
import styles from "./NumericFilter.module.scss";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  FilterCriteriaOptions,
  modifyFilter,
  updateFilterCriteriaItem,
  updateNumericFilterState,
} from "../../../../redux/slices/filterRecipeSlice";
import { parentPort } from "worker_threads";
import useDebounce from "../../../../customHooks/useDebounce";
import debounce from "../../../../helperFunc/debounce";

type NumericFilterProps = {
  filterCriteria: FilterCriteriaOptions;
  childIngredient?: string;
  type?: "counter" | "currency" | "date";
  activeTab: string;
};

const NumericFilter = ({
  childIngredient,
  type = "counter",
  filterCriteria,
  activeTab,
}: NumericFilterProps) => {
  const dispatch = useAppDispatch();
  const [debouncedTrigger, setDebouncedTrigger] = useState<any>(null);

  const isMounted = useRef(false);

  const { numericFilterState } = useAppSelector((state) => state.filterRecipe);
  const {
    between,
    greaterThan,
    lessThan = true,
    betweenEndValue = 0,
    betweenStartValue = 0,
    greaterThanValue = 0,
    lessThanValue = 0,
    id = "",
  } = numericFilterState;

  const debouncedSearchTerm: any = useDebounce<any>(debouncedTrigger, 800);

  const handleActiveTab = (tab: string) => {
    // setTabValue(value);
    let newNumericFilterState = { ...numericFilterState };
    if (tab === "lessThan") {
      newNumericFilterState = {
        ...newNumericFilterState,
        between: false,
        greaterThan: false,
        lessThan: true,
        tagLabel: `${activeTab} | ${newNumericFilterState.name} < ${newNumericFilterState.lessThanValue}`,
      };
    }
    if (tab === "greaterThan") {
      newNumericFilterState = {
        ...newNumericFilterState,
        between: false,
        greaterThan: true,
        lessThan: false,
        tagLabel: `${activeTab} | ${newNumericFilterState.greaterThanValue} >  ${newNumericFilterState.name} `,
      };
    }
    if (tab === "between") {
      newNumericFilterState = {
        ...newNumericFilterState,
        between: true,
        greaterThan: false,
        lessThan: false,
        tagLabel: `${activeTab} | ${newNumericFilterState.betweenStartValue} <  ${newNumericFilterState.name} < ${newNumericFilterState.betweenEndValue}`,
      };
    }

    if (newNumericFilterState.id) {
      dispatch(updateNumericFilterState(newNumericFilterState));
      dispatch(
        updateFilterCriteriaItem({
          updateStatus: "update",
          value: newNumericFilterState,
          filterCriteria,
        }),
      );
    }
  };

  const handleUpdateNumericFilterState = debounce((value) => {
    dispatch(
      updateFilterCriteriaItem({
        updateStatus: "update",
        value,
        filterCriteria,
      }),
    );
  }, 700);

  const counterHandler = (
    value: number = 0,
    title:
      | "lessThanValue"
      | "betweenStartValue"
      | "betweenEndValue"
      | "greaterThanValue",
  ) => {
    let newNumericFilterState = { ...numericFilterState };

    // prettier-ignore
    if (title === "lessThanValue") {
        newNumericFilterState = {
          ...newNumericFilterState,
          lessThanValue:value,
          tagLabel:`${activeTab} | ${newNumericFilterState.name} < ${value}`
        };

    } else if (title === "greaterThanValue") {
       newNumericFilterState = {
         ...newNumericFilterState,
         greaterThanValue: value,
         tagLabel: `${activeTab} | ${value} >  ${newNumericFilterState.name} `,
       };
      
    } else if (title === "betweenStartValue") {
       newNumericFilterState = {
         ...newNumericFilterState,
         betweenStartValue: value,
         tagLabel: `${activeTab} | ${value} <  ${newNumericFilterState.name} < ${newNumericFilterState.betweenEndValue}`,
       };
      
    } else if (title === "betweenEndValue") {
      newNumericFilterState = {
        ...newNumericFilterState,
        betweenEndValue: value,
        tagLabel: `${activeTab} | ${newNumericFilterState.betweenStartValue} <  ${newNumericFilterState.name} < ${value}`,
      };
    }
    if (newNumericFilterState.id) {
      dispatch(updateNumericFilterState(newNumericFilterState));
      setDebouncedTrigger(newNumericFilterState);
    }
  };

  useEffect(() => {
    if (!isMounted.current) return;

    dispatch(
      updateFilterCriteriaItem({
        updateStatus: "update",
        value: numericFilterState,
        filterCriteria,
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.numericFilterContainer}>
      <div
        className={`${styles.tabContainer} ${
          id ? styles.activeTabTabContainer : ""
        }`}
      >
        <div
          className={`${styles.firstChild} ${lessThan ? styles.active : ""}`}
          onClick={() => handleActiveTab("lessThan")}
        >
          Less than
        </div>
        <div
          className={`${styles.middleChild} ${between ? styles.active : ""}`}
          onClick={() => handleActiveTab("between")}
        >
          Between
        </div>
        <div
          className={`${styles.lastChild} ${greaterThan ? styles.active : ""}`}
          onClick={() => handleActiveTab("greaterThan")}
        >
          Greater than
        </div>
      </div>
      {lessThan ? (
        <div className={styles.counterContainer}>
          <div
            className={styles.counterButton}
            onClick={() => {
              if (lessThanValue >= 1) {
                counterHandler(lessThanValue - 1, "lessThanValue");
              }
            }}
          >
            <BiMinus />
          </div>
          <input
            className={styles.counterContainerInput}
            min={0}
            type="number"
            value={lessThanValue}
            onChange={(e) =>
              counterHandler(parseFloat(e?.target?.value), "lessThanValue")
            }
          />
          <div
            className={styles.counterButton}
            onClick={() => counterHandler(lessThanValue + 1, "lessThanValue")}
          >
            <BiPlus />
          </div>
        </div>
      ) : null}
      {between ? (
        <div className={styles.counterBetween}>
          <div className={styles.counterContainer}>
            <div
              className={styles.counterButton}
              onClick={() => {
                if (betweenStartValue >= 1) {
                  counterHandler(betweenStartValue - 1, "betweenStartValue");
                }
              }}
            >
              <BiMinus />
            </div>
            <input
              className={styles.counterContainerInput}
              min={0}
              type="number"
              value={betweenStartValue}
              onChange={(e) =>
                counterHandler(
                  parseFloat(e?.target?.value),
                  "betweenStartValue",
                )
              }
              style={{ width: "50px" }}
            />
            <div
              className={styles.counterButton}
              onClick={() =>
                counterHandler(betweenStartValue + 1, "betweenStartValue")
              }
            >
              <BiPlus />
            </div>
          </div>
          <div className={styles.counterContainer}>
            <div
              className={styles.counterButton}
              onClick={() => {
                if (betweenEndValue >= 1) {
                  counterHandler(betweenEndValue - 1, "betweenEndValue");
                }
              }}
            >
              <BiMinus />
            </div>
            <input
              className={styles.counterContainerInput}
              min={0}
              type="number"
              value={betweenEndValue}
              onChange={(e) =>
                counterHandler(parseFloat(e?.target?.value), "betweenEndValue")
              }
              style={{ width: "50px" }}
            />
            <div
              className={styles.counterButton}
              onClick={() =>
                counterHandler(betweenEndValue + 1, "betweenEndValue")
              }
            >
              <BiPlus />
            </div>
          </div>
        </div>
      ) : null}

      {greaterThan ? (
        <div className={styles.counterContainer}>
          <div
            className={styles.counterButton}
            onClick={() => {
              if (greaterThanValue >= 1) {
                counterHandler(greaterThanValue - 1, "greaterThanValue");
              }
            }}
          >
            <BiMinus />
          </div>
          <input
            className={styles.counterContainerInput}
            min={0}
            type="number"
            value={greaterThanValue}
            onChange={(e) =>
              counterHandler(parseFloat(e?.target?.value), "greaterThanValue")
            }
          />
          <div
            className={styles.counterButton}
            onClick={() =>
              counterHandler(greaterThanValue + 1, "greaterThanValue")
            }
          >
            <BiPlus />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NumericFilter;

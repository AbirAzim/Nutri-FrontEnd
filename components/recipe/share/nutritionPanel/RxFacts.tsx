/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { setIngredientArrayForNutrition } from "../../../../redux/edit_recipe/editRecipeStates";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { DropDownType } from "../../../../theme/dropDown/DropDown.component";
import NutritionPanelSkeleton from "../../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import UpdatedRecursiveAccordion from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import styles from "./NutritionPanel.module.scss";

interface NutritionPanelInterface {
  variant?: "panel" | "main";
  nutritionTrayData?: any;
  nutritionState?: any;
  setNutritionState?: any;
  counter?: number;
  isComeFormRecipeEditPage?: boolean;
  calculatedIngOz?: number;
  nutritionDataLoading: boolean;
  servingSize?: number;
  servings?: number;
  adjusterFunc?: (value: number) => void;
  showServing?: boolean;
  showUser?: boolean;
  measurementDropDownState?: DropDownType & { showDropDown: boolean };
  showTitle?: boolean;
}

const NutritionPanelRxFacts = ({
  variant = "main",
  nutritionTrayData = {},
  setNutritionState = () => {},
  counter = 1,
  isComeFormRecipeEditPage = false,
  calculatedIngOz = 0,
  nutritionState = {},
  nutritionDataLoading,
  servingSize = 0,
  servings = 1,
  adjusterFunc = () => {},
  showServing = true,
  showUser = true,
  measurementDropDownState = {
    listElem: [],
    style: {},
    value: "",
    name: "",
    handleChange: () => {},
    showDropDown: false,
  },
  showTitle = true,
}: NutritionPanelInterface) => {
  const [servingSizeCounter, setServingSizeCounter] = useState(1);
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );
  const dispatch = useAppDispatch();
  const measurement =
    nutritionState?.portions?.find((itm) => itm?.default)?.measurement ||
    nutritionState?.selectedPortion?.name;
  const nutrientName =
    nutritionState?.ingredientName ||
    nutritionState?.ingredientId?.ingredientName;
  const singleIngQuantity =
    parseFloat(nutritionState?.selectedPortion?.quantity) || 1;

  useEffect(() => {
    if (servings) {
      setServingSizeCounter(servings);
    }
  }, [servings]);

  return (
    <div
      className={styles.right}
      style={variant === "panel" ? { boxShadow: "none" } : {}}
    >
      <div>
        {showTitle && <div className={styles.right__title}>Nutrition</div>}

        {showServing ? (
          nutritionState?._id || nutritionState?.ingredientId?._id ? (
            <div className={styles.content}>
              <div className={styles.content__heading__nutrition}>
                <>
                  <div>
                    <h3 className={styles.content__name}>
                      {singleIngQuantity}&nbsp;
                      {measurement}
                      &nbsp;
                      {nutrientName}
                    </h3>
                  </div>
                  <div
                    className={styles.content__closeBox}
                    onClick={() => {
                      setNutritionState({});
                      dispatch(
                        setIngredientArrayForNutrition(selectedIngredientsList),
                      );
                    }}
                  >
                    <MdOutlineClose
                      className={styles.content__closeBox__closeIcon}
                    />
                  </div>
                </>
              </div>
            </div>
          ) : (
            <div className={styles.right__counterTray}>
              {/* <p className={styles.servings}>{counter}</p> */}

              <div className={styles.right__counterTray__counter}>
                <input
                  className={styles.right__counterTray__counter__input}
                  type="number"
                  value={
                    isComeFormRecipeEditPage ? counter : servingSizeCounter
                  }
                  min={1}
                  onChange={(e) => {
                    isComeFormRecipeEditPage
                      ? adjusterFunc(parseInt(e?.target?.value))
                      : setServingSizeCounter(parseInt(e?.target?.value));
                  }}
                />
              </div>

              <div className={styles.right__counterTray__serving}>
                <div>servings</div>
              </div>
              <div className={styles.right__counterTray__servingsize}>
                <div className={styles.right__counterTray__serving__num}>
                  {isComeFormRecipeEditPage
                    ? Math.round(calculatedIngOz / counter)
                    : Math.round((servingSize * counter) / servingSizeCounter)}
                  oz
                </div>
                &nbsp; serving size
              </div>
            </div>
          )
        ) : null}
      </div>

      <div className={styles.compoent__box__nutrition}>
        {nutritionDataLoading ? (
          <div style={{ padding: " 0 10px" }}>
            <NutritionPanelSkeleton />
          </div>
        ) : (
          <UpdatedRecursiveAccordion
            variant={variant}
            dataObject={nutritionTrayData}
            counter={isComeFormRecipeEditPage ? 1 : counter}
            servingSize={
              isComeFormRecipeEditPage ? counter : servingSizeCounter
            }
            showUser={showUser}
            sinngleIngQuintity={singleIngQuantity}
            measurementDropDownState={measurementDropDownState}
          />
        )}
      </div>
    </div>
  );
};

export default NutritionPanelRxFacts;

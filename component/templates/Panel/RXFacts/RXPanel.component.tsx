import React, { useEffect, useState } from "react";
import { faChartSimple } from "@fortawesome/pro-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setShowPanel } from "../../../../redux/slices/Ui.slice";
import IconButton from "../../../atoms/Button/IconButton.component";

import classes from "./RXPanel.module.scss";
import NutritionPanel from "../../../../components/recipe/share/nutritionPanel/NutritionPanel";
import { useLazyQuery } from "@apollo/client";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";
import useHideOnClickOutside from "../../../../hooks/useHideOnClickOutside";

const RXPanel = () => {
  const [nutritionState, setNutritionState] = useState(null);

  const dispatch = useAppDispatch();
  const panelList = useAppSelector((state) => state.ui.panel);
  const panel = panelList.find((panel) => panel.name === "RXPanel");

  const [getNutrientFacts, { loading, data, error }] = useLazyQuery(
    GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS,
  );

  useEffect(() => {
    if (panel && panel?.show) {
      getNutrientFacts({
        variables: {
          ingredientsInfo: panel.payload,
        },
      });
    }
  }, [getNutrientFacts, panel]);

  // const hideOutsideClick = useHideOnClickOutside(() => {
  //   if (panel && panel?.show)
  //     dispatch(setShowPanel({ name: "RXPanel", show: false }));
  // });

  return (
    <div
      // ref={hideOutsideClick}
      className={`${classes["side-panel"]} ${
        panel?.show ? classes.active : ""
      }`}
    >
      <IconButton
        fontName={faChartSimple}
        variant="fade"
        className={classes["side-panel__close"]}
        onClick={() => dispatch(setShowPanel({ name: "RXPanel", show: false }))}
      />
      <div className={classes["side-panel__content"]}>
        <NutritionPanel
          variant="panel"
          nutritionTrayData={
            data?.getNutrientsListAndGiGlByIngredients
              ? JSON.parse(
                  data?.getNutrientsListAndGiGlByIngredients?.nutrients,
                )
              : []
          }
          nutritionDataLoading={loading}
          nutritionState={nutritionState}
          setNutritionState={setNutritionState}

          // counter={counter}
          // servingSize={parseInt(recipeData?.servingSize || 0)}
          // servings={recipeData?.servings}
        />
      </div>
    </div>
  );
};

export default RXPanel;

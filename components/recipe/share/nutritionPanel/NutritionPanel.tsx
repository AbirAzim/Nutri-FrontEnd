/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { faChartColumn, faUser } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState } from "react";
import { DropDownType } from "../../../../theme/dropDown/DropDown.component";
import PanelHeader from "../panelHeader/PanelHeader";
import styles from "./NutritionPanel.module.scss";
import NutritionPanelMyFacts from "./myFacts";
import NutritionPanelRxFacts from "./RxFacts";

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
  isNutrientPanelHasMyFacts?: boolean;
  wikiId?: string;
}

const panelHeaders = [
  {
    title: "Rx Facts",
    icon: faChartColumn,
  },
  {
    title: "My Facts",
    icon: faUser,
  },
];

const NutritionPanel = (props: NutritionPanelInterface) => {
  const { variant = "main", isNutrientPanelHasMyFacts = false, wikiId } = props;
  const [toggle, setToggle] = useState(0);

  const handleHeaderClick = (index: number = 0) => {
    setToggle(index);
  };

  return (
    <div className={styles.rightTaryContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isNutrientPanelHasMyFacts ? (
          panelHeaders?.map((header, index) => {
            return (
              <PanelHeader
                key={header?.title}
                activeHeader={index === toggle}
                index={index}
                handleClick={handleHeaderClick}
                icon={
                  variant === "panel" ? (
                    ""
                  ) : (
                    <FontAwesomeIcon icon={header.icon} fontSize="24" />
                  )
                }
                title={header?.title}
                panelHeaderVariant="headerBorderBottom"
              />
            );
          })
        ) : (
          <PanelHeader
            icon={
              variant === "panel" ? "" : "/icons/chart-bar-light-green.svg"
              // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
            }
            title="Rx Facts"
          />
        )}
      </div>
      {toggle === 0 ? (
        <NutritionPanelRxFacts {...props} />
      ) : (
        <NutritionPanelMyFacts wikiId={wikiId} />
      )}
    </div>
  );
};

export default memo(NutritionPanel);

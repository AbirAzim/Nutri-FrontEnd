import React, { useState } from "react";
import styles from "./WikiRight.module.scss";
import { faChartColumn, faUser } from "@fortawesome/pro-regular-svg-icons";
import PanelHeader from "../../recipe/share/panelHeader/PanelHeader";
import IngredientRxFacts from "./IngredientRxFacts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IngredientMyFactsIndex from "./ingredientMyFacts";

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

interface NutrientPanelProps {
  ingredient?: any[];
  wikiId?: string;
  ingredientsDataLoading?: boolean;
  isIngredientHasMyFacts?: boolean;
  mainWikiId?: string;
}

function WikiRightComponent(props: NutrientPanelProps) {
  const { isIngredientHasMyFacts = false, mainWikiId = "" } = props;
  const [toggle, setToggle] = useState(0);

  return (
    <div className={styles.right}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isIngredientHasMyFacts ? (
          panelHeaders?.map((header, index) => {
            return (
              <PanelHeader
                key={header?.title}
                activeHeader={index === toggle}
                index={index}
                handleClick={() => setToggle(index)}
                icon={<FontAwesomeIcon icon={header.icon} fontSize="24" />}
                title={header?.title}
                panelHeaderVariant="headerBorderBottom"
              />
            );
          })
        ) : (
          <PanelHeader
            icon={"/icons/chart-bar-light-green.svg"}
            title="Rx Facts"
          />
        )}
      </div>
      {toggle === 0 ? (
        <IngredientRxFacts {...props} />
      ) : (
        <IngredientMyFactsIndex wikiId={mainWikiId} />
      )}
    </div>
  );
}

export default WikiRightComponent;

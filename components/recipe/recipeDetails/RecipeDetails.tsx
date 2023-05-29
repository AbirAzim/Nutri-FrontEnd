import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import Center from "./center/Center";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import useWindowSize from "../../utility/useWindowSize";
import { useAppSelector } from "../../../redux/hooks";
import ShowRelatedItems from "../../showRelatedItems";
import { recommendedList } from "../fackData/recipeDetails";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { GiGl } from "../../../type/nutrationType";

interface Props {
  recipeData: RecipeDetailsType;
  nutritionData: any;
  nutritionState: any;
  setNutritionState: any;
  nutritionDataLoading: boolean;
  giGl: GiGl;
  pageComeFrom?: "edit" | "details";
}

const RecipeDetails = ({
  recipeData,
  nutritionData,
  nutritionState,
  setNutritionState,
  nutritionDataLoading = false,
  giGl,
  pageComeFrom,
}: Props) => {
  const [counter, setCounter] = useState(1);
  const { width } = useWindowSize();
  const { openVersionTray } = useAppSelector((state) => state?.versionTray);

  return (
    <AContainer
      showHeader={true}
      logo={true}
      headerIcon="/icons/juicer.svg"
      headerTitle="Recipe Details"
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      showCollectionTray={{
        show: true,
        showTagByDeafult: false,
        showPanle: "left",
      }}
      showVersionTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      showGroceryTray={{
        show: openVersionTray ? false : true,
        showPanle: "right",
        showTagByDeafult: openVersionTray ? false : true,
      }}
      headTagInfo={{
        title: "Recipe Details",
        description: "recipe Details",
      }}
      showNotificationTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: true,
      }}
    >
      <div className={styles.main}>
        <div className={styles.left}>
          <LeftSide />
        </div>

        <div className={styles.center}>
          <Center
            recipeData={recipeData}
            counter={counter}
            setCounter={setCounter}
            setNutritionState={setNutritionState}
            nutritionState={nutritionState}
            giGl={giGl}
            pageComeFrom={pageComeFrom}
          />
        </div>
        <div className={styles.right}>
          <NutritionPanel
            nutritionTrayData={nutritionData}
            counter={counter}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            nutritionDataLoading={nutritionDataLoading}
            servingSize={recipeData.tempVersionInfo?.version?.servingSize}
            servings={recipeData?.recipeId?.servings}
          />
        </div>
      </div>
      {width < 1280 ? (
        <ShowRelatedItems
          category="recipe"
          title="Related Recipes"
          itemsList={recommendedList}
        />
      ) : null}
    </AContainer>
  );
};

export default RecipeDetails;

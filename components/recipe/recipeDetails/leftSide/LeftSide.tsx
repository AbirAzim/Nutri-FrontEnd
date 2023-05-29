/* eslint-disable @next/next/no-img-element */
import React from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import { recommendedList } from "../../fackData/recipeDetails";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import PanelHeader from "../../share/panelHeader/PanelHeader";

const LeftSide = () => {
  return (
    <div>
      <PanelHeader icon="/images/telescope.svg" title="Related" />
      {recommendedList ? (
        recommendedList?.slice(0, 4)?.map((cardData, index) => {
          return (
            <div key={index} style={{ paddingBottom: "10px" }}>
              {cardData ? (
                <div key={index}>
                  <DatacardComponent
                    title={cardData.title}
                    ingredients={cardData.ingredients}
                    category={cardData.category}
                    ratings={cardData.ratings}
                    noOfRatings={cardData.noOfRatings}
                    carbs={cardData.carbs}
                    score={cardData.score}
                    calorie={cardData.calorie}
                    noOfComments={cardData.noOfComments}
                    image={cardData.image}
                  />
                </div>
              ) : (
                <div>
                  <CircularRotatingLoader />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div style={{ marginTop: "30px" }}>
          <CircularRotatingLoader />
        </div>
      )}
    </div>
  );
};

export default LeftSide;

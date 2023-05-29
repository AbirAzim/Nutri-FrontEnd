/* eslint-disable @next/next/no-img-element */
import React from "react";
import PanelHeader from "../recipe/share/panelHeader/PanelHeader";
import CustomSlider from "../../theme/carousel/carousel.component";
import DatacardComponent from "../../theme/cards/dataCard/dataCard.component";
import WikiCard from "../wiki/wikiCard/WikiCard";

interface Porps {
  category?: "recipe" | "wiki";
  title?: string;
  itemsList?: any[];
}

const ShowRelatedItems = ({
  category = "recipe",
  title = "Related Recipes",
  itemsList = [],
}: Porps) => {
  const responsiveSetting = {
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ margin: "16px 10px 20px 10px" }}>
      <PanelHeader icon="/images/telescope.svg" title={title} />
      <CustomSlider moreSetting={responsiveSetting}>
        {itemsList?.map((item, index) => {
          return (
            <>
              {category === "recipe" ? (
                <DatacardComponent
                  key={item.title + index}
                  title={item.title}
                  ingredients={item.ingredients}
                  category={item.category}
                  ratings={item.ratings}
                  noOfRatings={item.noOfRatings}
                  carbs={item.carbs}
                  score={item.score}
                  calorie={item.calorie}
                  noOfComments={item.noOfComments}
                  image={item.image}
                  recipeVersion={item?.recipeVersion}
                />
              ) : (
                <WikiCard
                  key={item._id}
                  author={item.publishedBy}
                  comments={item.commentsCount}
                  description={item.wikiDescription}
                  image={item.image}
                  title={item.wikiTitle}
                  type={item.type}
                  portions={item.portions}
                  id={item._id}
                  hasInCompare={item.hasInCompare}
                />
              )}
            </>
          );
        })}
      </CustomSlider>
    </div>
  );
};

export default ShowRelatedItems;

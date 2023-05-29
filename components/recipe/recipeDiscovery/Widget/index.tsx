import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ContentTray from "../ContentTray/ContentTray.component";
import styles from "../recipeDiscovery.module.scss";
import HTML from "./html";

interface WidgetCollectionProps {
  collection: any;
  compareRecipeList: any;
  setcompareRecipeList: any;
}

const WidgetCollection = (props: WidgetCollectionProps) => {
  const { collection, compareRecipeList, setcompareRecipeList } = props;

  const [tab, setTab] = useState("All");
  const { data, filter, icon, banner, displayName, showTabMenu } = collection;
  const { filterType, values } = filter;
  const results = data[data?.collectionType] || [];

  const items =
    tab === "All"
      ? results
      : results.filter((recipe) => {
          // console.log(recipe);
          const filterProps = recipe[filterType];
          if (Array.isArray(filterProps)) {
            return filterProps.includes(tab);
          } else {
            return filterProps === tab;
          }
        });

  return (
    <ContentTray
      heading={collection.displayName}
      hasFilter
      filters={[...values].sort()}
      tabState={[tab, setTab]}
      image={"/images/fire-alt-light.svg"}
      customHTML={items.length === 0}
    >
      {items?.length > 0 &&
        items?.map((item, index) => {
          let ingredients = [];
          item?.ingredients?.forEach((ing) => {
            const ingredient = ing?.ingredientId?.ingredientName;
            ingredients.push(ingredient);
          });
          const ing = ingredients.join(", ");
          {
            return (
              <div
                className={styles.slider__card}
                key={"popular" + index}
                onClick={() => router.push(`/recipe_details/${item?._id}`)}
              >
                <Card item={item} />
              </div>
            );
          }
        })}
      {}
    </ContentTray>
  );
};

const Card = (props) => {
  const { item } = props;
  const ref = useRef<HTMLDivElement>(null);
  const collectionHandler = () => {
    alert("I Worked");
  };
  useEffect(() => {
    if (ref.current) {
      const recipe = ref.current;
      recipe.querySelector("#Name").innerHTML = item?.name;
      (recipe.querySelector("#Image") as HTMLImageElement).src =
        "https://blending.s3.us-east-1.amazonaws.com/8335749.jpeg";
    }
  }, [item]);

  useEffect(() => {
    if (ref.current) {
      const recipe = ref.current;

      (recipe.querySelector("#Name") as HTMLButtonElement).onclick =
        collectionHandler;
    }
  });

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: HTML }} />;
};

export default WidgetCollection;

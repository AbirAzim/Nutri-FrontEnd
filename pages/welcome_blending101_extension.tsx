import React from "react";
import AppdownLoadCard from "../components/recipe/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component";
import s from "../components/pageLayout/pageLayout.module.scss";
import AContainer from "../containers/A.container";

const Index = () => {
  return (
    <div className={s.ordinaryPageLayout}>
      <AppdownLoadCard title="WELCOME TO BLENDING101 EXTENSION" />
    </div>
  );
};

export default Index;

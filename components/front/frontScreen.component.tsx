import React from "react";
import LandingFooter from "./footer/landingFooter.component";
import ToggleScreens from "./toggleElement/toggleScreens.component";
import ToStoryCard from "./toStoryCard/toStoryCard.component";

const FrontScreen = () => {
  return (
    <>
      <ToggleScreens />
      <ToStoryCard />
      <LandingFooter />
    </>
  );
};

export default FrontScreen;

import React from "react";

import RxScore from "../../molecules/Charts/RxScore.component";
import TopIngredients from "../../molecules/Charts/TopIngredients.component";

import styles from "./Overview.module.scss";
import BlendTrend from "../../molecules/Charts/BlendTrend.component";
import Calories from "../../molecules/Charts/Calories.component";
import MacroMakeup from "../../molecules/Charts/MacroMakeup.component";

const Overview = () => {
  return (
    <div className={styles.insights}>
      <div className={styles.insights__body}>
        <BlendTrend />
        <RxScore />
        <TopIngredients />
        <MacroMakeup />
        <Calories />
      </div>
    </div>
  );
};

export default Overview;

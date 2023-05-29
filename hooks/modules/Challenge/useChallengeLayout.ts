// @ts-nocheck
import { useEffect } from "react";

import styles from "../../../component/module/Challenge/Achievement/index.module.scss";
import foodStyles from "../../../component/module/Challenge/Achievement/_RecipeCategory.module.scss";
import mainStyles from "../../../component/module/Challenge/Achievement/_Dialer.module.scss";
import graphStyles from "../../../component/module/Challenge/Achievement/_Streakbar.module.scss";

const useChallengeLayout = () => {
  useEffect(() => {
    function handleResize() {
      const insideWidth = 0.82;
      // For Food
      let challengeCircleBox = document.querySelector(
        `.${styles.challenge_circle_box}`,
      );

      let challengeCircleFood = document.querySelector(
        `.${foodStyles.challenge_circle_food}`,
      );

      let challengeCircleFoodBoxList = document.querySelectorAll(
        `.${foodStyles.challenge_circle_food_box}`,
      );
      challengeCircleFoodBoxList.forEach((challengeCircleFoodBox) => {
        let challengeCircleFoodColorRepresent =
          challengeCircleFoodBox?.querySelector(
            `.${foodStyles.challenge_circle_food_color_represent}`,
          );
        challengeCircleFoodColorRepresent.style.width =
          challengeCircleFood.clientWidth / 13 + "px";
      });

      // For Circle
      let challengeCircleMainCircleOuter = document.querySelector(
        `.${mainStyles.challenge_circle_main_circle_outer}`,
      );

      let challengeCircleMainCircle = document.querySelector(
        `.${mainStyles.challenge_circle_main_circle}`,
      );

      let challengeCircleInsideCircle = document.querySelector(
        `.${mainStyles.challenge_circle_inside_circle}`,
      );
      let challengeCircleInsideDate = document.querySelector(
        `.${mainStyles.challenge_circle_inside_date}`,
      );
      challengeCircleMainCircleOuter.style.width =
        challengeCircleBox.clientWidth * insideWidth + "px";
      const cCMCOWidth = challengeCircleMainCircleOuter.clientWidth;

      challengeCircleMainCircle.style.width = cCMCOWidth * 0.85 + "px";
      challengeCircleInsideCircle.style.width = cCMCOWidth * 0.7 + "px";
      challengeCircleInsideDate.style.fontSize = cCMCOWidth * 0.035 + "px";
      challengeCircleInsideDate.style.marginTop = cCMCOWidth * 0.01 + "px";

      // Ring Logic
      let circles = document.querySelectorAll(`.${mainStyles.wheel__button}`);
      let semiCircle = document.querySelector(
        `.${mainStyles.challenge_circle_semi_circle}`,
      );
      circles.forEach((circle) => {
        circle.style.fontSize = cCMCOWidth * 0.018 + "px";
        // circle.style.width = cCMCOWidth * 0.075 + "px";
        circle.style.width = "45px";
      });

      circles = [...circles, semiCircle];
      let angle = 360 - 25;
      let dangle = 357 / circles.length;
      let circle;
      for (let i = 0; i < circles.length; ++i) {
        circle = circles[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${
          challengeCircleMainCircle.clientWidth / 2
        }px) rotate(-${angle}deg)`;
      }
      circle.style.transform = `rotate(${angle - 2}deg) translate(${
        challengeCircleMainCircle.clientWidth / 2
      }px) rotate(-${angle - 150}deg)`;
      semiCircle.style.width =
        (cCMCOWidth - challengeCircleInsideCircle.clientWidth) / 2 + 1 + "px";

      // For Graph Container
      let challengeCircleGraphData = document.querySelector(
        `.${graphStyles.challenge_circle_graph_data}`,
      );
      let challengeCircleNoOfDaysList = document.querySelectorAll(
        `.${graphStyles.challenge_circle_no_of_days}`,
      );
      let challengeCircleParagraphsList = document.querySelectorAll(
        `.${graphStyles.challenge_circle_paragraph}`,
      );
      let challengeCircleGraphBox = document.querySelector(
        `.${graphStyles.challenge_circle_graph_box}`,
      );

      challengeCircleGraphData.style.width =
        challengeCircleBox.clientWidth * insideWidth + "px";
      challengeCircleGraphData.style.marginTop =
        challengeCircleBox.clientWidth * 0.035 + "px";
      // challengeCircleGraphData.style.marginBottom =
      //   challengeCircleBox.clientWidth * 0.09 + "px";

      challengeCircleNoOfDaysList.forEach((challengeCircleNoOfDays) => {
        challengeCircleNoOfDays.style.fontSize =
          challengeCircleGraphData.clientWidth * 0.04 + "px";
      });
      challengeCircleParagraphsList.forEach((challengeCircleParagraph) => {
        challengeCircleParagraph.style.fontSize =
          challengeCircleGraphData.clientWidth / 35 + "px";
        challengeCircleParagraph.style.marginTop =
          challengeCircleGraphData.clientWidth / 100 + "px";
      });
      challengeCircleGraphBox.style.margin = `0 ${
        challengeCircleGraphData.clientHeight * 0.2
      }px`;
      challengeCircleGraphBox.style.height =
        challengeCircleGraphData.clientHeight * 0.4 + "px";
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });
};

export default useChallengeLayout;

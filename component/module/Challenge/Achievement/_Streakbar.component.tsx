import { useMemo } from "react";
import HSBar from "react-horizontal-stacked-bar-chart";

import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";

import styles from "./_Streakbar.module.scss";

interface GraphDetailContainerInterface {
  activities?: any[];
  statistics: any;
}
function GraphDetailContainer({
  statistics,
  activities,
}: GraphDetailContainerInterface) {
  const chartData = useMemo(() => {
    const categories = {};

    Object.keys(RECIPE_CATEGORY_COLOR).forEach((category) => {
      categories[category] = {
        name: category,
        description: 0,
        color: RECIPE_CATEGORY_COLOR[category],
        value: 0,
      };
    });

    let total = 0;
    activities?.forEach((activity) => {
      activity?.posts?.forEach((post) => {
        if (post?.recipeBlendCategory?.name) {
          categories[post.recipeBlendCategory?.name].value++;
          total++;
        }
      });
    });

    const data = [];
    Object.values(categories).forEach((category: any) => {
      if (category?.value <= 0) return;
      category.description = `${((category.value * 100) / total).toFixed(
        1,
      )}% (${category.value})`;
      data.push(category);
    });

    return data;
  }, [activities]);
  return (
    <div className={styles.challenge_circle_graph_data}>
      <div className={styles.challenge_circle_streak}>
        <p className={styles.challenge_circle_no_of_days}>
          {statistics?.currentStreak || 0} Days
        </p>
        <p className={styles.challenge_circle_paragraph}>Current Streak</p>
      </div>
      <div className={styles.challenge_circle_graph_box}>
        <HSBar
          height={"40px"}
          id={styles.challenge_circle_new_id}
          data={chartData}
        />
      </div>
      <div className={styles.challenge_circle_streak}>
        <p className={styles.challenge_circle_no_of_days}>
          {statistics?.longestStreak || 0} Days
        </p>
        <p className={styles.challenge_circle_paragraph}>Longest Streak</p>
      </div>
    </div>
  );
}

export default GraphDetailContainer;

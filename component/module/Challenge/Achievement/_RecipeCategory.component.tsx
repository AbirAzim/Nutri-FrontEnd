import { useQuery } from "@apollo/client";
import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import { GET_BLEND_CATEGORY } from "../../../../graphql/Recipe";

import styles from "./_RecipeCategory.module.scss";

function RecipeCategory() {
  const { data } = useQuery(GET_BLEND_CATEGORY);
  return (
    <div className={styles.challenge_circle_food}>
      {data?.getAllCategories?.map((category) => (
        <div className={styles.challenge_circle_food_box} key={category.value}>
          <div
            className={styles.challenge_circle_food_color_represent}
            style={{ backgroundColor: RECIPE_CATEGORY_COLOR[category.label] }}
          />
          <p className={styles.challenge_circle_food_name}>{category.label}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeCategory;

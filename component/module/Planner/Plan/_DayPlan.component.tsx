import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  faChartSimple,
  faClone,
  faEllipsisVertical,
  faTrash,
  faUpDownLeftRight,
  faCartShopping,
} from "@fortawesome/pro-regular-svg-icons";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  IPlannerRecipe,
  setDayRecipe,
} from "../../../../redux/slices/Planner.slice";

import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import CalendarTray from "../../../../theme/calendar/calendarTray.component";

import { ADD_TO_GROCERY_LIST } from "../../../../graphql/Planner";
import Publish from "../../../../helpers/Publish";
import IconButton from "../../../atoms/Button/IconButton.component";
import { setShowPanel } from "../../../../redux/slices/Ui.slice";
import Icon from "../../../atoms/Icon/Icon.component";

import styles from "./_DayPlan.module.scss";
import {
  useCopyPlanRecipe,
  useDeletePlanRecipe,
  useMovePlanRecipe,
} from "../../../../hooks/modules/Plan/useMyPlan";

interface PlanProps {
  plannerId?: string;
  day?: string;
  date?: string;
  indexValue: number;
  setToggleOptionCard?: any;
  toggleOptionCard?: object;
  recipeList?: IPlannerRecipe[];
  isWeekFromURL?: boolean;
  week?: any;
}

const DayPlan = (props: PlanProps) => {
  const { plannerId, day, date, indexValue, recipeList, week, isWeekFromURL } =
    props;
  const dispatch = useAppDispatch();

  const copyRecipe = useCopyPlanRecipe(week, isWeekFromURL);
  const moveRecipe = useMovePlanRecipe(plannerId);
  const deleteRecipe = useDeletePlanRecipe(plannerId, week, isWeekFromURL);

  return (
    <div className={styles.plan}>
      <div
        className={styles.plan__dateDiv}
        style={indexValue % 2 == 0 ? { backgroundColor: "#eeeeee" } : {}}
        onClick={() => dispatch(setDayRecipe(recipeList[0]?._id))}
      >
        <div className={styles.plan__dateDiv__day}>{day}</div>
        <div className={styles.plan__dateDiv__date}>{date}</div>
      </div>
      <div className={styles.plan__recipeDiv}>
        {recipeList?.map((recipe) => (
          <PlanItem
            key={recipe?._id}
            recipe={recipe}
            onDelete={deleteRecipe}
            onCopy={copyRecipe}
            onMove={moveRecipe}
          />
        ))}
      </div>
    </div>
  );
};

export default DayPlan;

interface RecipeColorIndicatorInterface {
  recipe: IPlannerRecipe;
  onCopy?: any;
  onMove?: any;
  onDelete?: any;
}
const PlanItem = (props: RecipeColorIndicatorInterface) => {
  const { recipe, onCopy, onMove, onDelete } = props;
  let {
    _id,
    name: recipeName,
    calorie,
    category,
    recipeBlendCategory,
    rxScore,
    ingredients,
  } = recipe;
  category = recipeBlendCategory?.name || category;
  const [showMenu, setShowMenu] = useState(false);
  const [showCalender, setShowCalender] = useState<"move" | "copy" | "">("");

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [addToGrocery, addState] = useMutation(ADD_TO_GROCERY_LIST, {
    refetchQueries: ["GetCartData"],
  });

  const style = { backgroundColor: RECIPE_CATEGORY_COLOR[category] };

  if (!recipeName) return null;

  const addToGroceryList = async () => {
    await Publish({
      mutate: addToGrocery,
      variables: {
        recipeId: _id,
        memberId: userId,
      },
      state: addState,
      success: `Added Ingredients to the Grocery List`,
    });
  };

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__containerDiv}>
        <div
          className={styles.recipe__containerDiv__colorIndicator}
          style={style}
        />
        {recipeName}
      </div>

      <div className={styles.recipe__rxScore}>{rxScore}</div>
      <div className={styles.recipe__calories}>{calorie}</div>
      <div className={styles.recipe__tray}>
        <IconButton
          size="medium"
          variant="hover"
          fontName={faChartSimple}
          color="primary"
          onClick={() =>
            dispatch(
              setShowPanel({
                name: "RXPanel",
                show: true,
                payload: ingredients?.map((ing) => ({
                  ingredientId: ing?.ingredientId?._id,
                  value: ing?.selectedPortion?.gram,
                })),
              }),
            )
          }
        />
        <IconButton
          size="medium"
          variant="hover"
          fontName={faCartShopping}
          color="primary"
          onClick={addToGroceryList}
        />
        <IconButton
          size="medium"
          variant="hover"
          fontName={faEllipsisVertical}
          color="primary"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </div>

      <div
        className={styles.recipe__optionTray}
        style={showMenu ? { display: "block", zIndex: "1" } : { zIndex: "-1" }}
      >
        <div className={styles.recipe__optionTray__pointingDiv} />
        <div className={styles.option} onClick={() => onDelete(_id)}>
          <span>Remove</span>
          <span className={styles.option__icon}>
            <Icon fontName={faTrash} size="1.5rem" />
          </span>
        </div>
        <div
          className={styles.option}
          onClick={() => {
            setShowCalender("copy");
            setShowMenu(false);
          }}
        >
          <span>Copy</span>
          <span className={styles.option__icon}>
            <Icon fontName={faClone} size="1.5rem" />
          </span>
        </div>
        <div
          className={styles.option}
          onClick={() => {
            setShowCalender("move");
            setShowMenu(false);
          }}
        >
          <span>Move</span>
          <span className={styles.option__icon}>
            <Icon fontName={faUpDownLeftRight} size="1.5rem" />
          </span>
        </div>
      </div>
      {showCalender !== "" && (
        <div className={styles.calender}>
          <CalendarTray
            handler={(date) => {
              showCalender === "copy"
                ? onCopy(date, recipe)
                : onMove(date, recipe);
              setShowCalender("");
            }}
          />
        </div>
      )}
    </div>
  );
};

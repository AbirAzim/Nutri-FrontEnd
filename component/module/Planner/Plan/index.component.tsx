import React, { useState } from "react";
import { format } from "date-fns";

import MealCalendarDatePlan from "./_DayPlan.component";

import styles from "./index.module.scss";
import { UTCDate } from "../../../../helpers/Date";

interface PlanListProps {
  data?: any[];
  week?: any;
  isWeekFromURL?: boolean;
}
const PlanList = ({ data, week, isWeekFromURL }: PlanListProps) => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  return (
    <div className={styles.wrapper}>
      {data?.map((planner, index) => {
        let dayName, day;
        if (planner?.day !== undefined) {
          dayName = "Day";
          day = index + 1;
        } else if (planner?.date) {
          const days = UTCDate(planner?.date);
          dayName = format(days, "eee") || "UND";
          day = format(days, "d") || "0";
        }
        return (
          <MealCalendarDatePlan
            key={planner.id}
            plannerId={planner.id}
            indexValue={index}
            day={dayName}
            date={day}
            week={week}
            recipeList={planner.recipes}
            isWeekFromURL={isWeekFromURL}
            setToggleOptionCard={setToggleOptionCard}
            toggleOptionCard={toggleOptionCard}
          />
        );
      })}
    </div>
  );
};

export default PlanList;

import React from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/pro-regular-svg-icons";

import { MONTH } from "../../../data/Date";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  gotoPreviousWeek,
  gotoNextWeek,
} from "../../../redux/slices/Planner.slice";
import IconButton from "../../atoms/Button/IconButton.component";

import styles from "./Header.module.scss";

const PlanHeader = () => {
  const dispatch = useAppDispatch();
  const { start, end } = useAppSelector((state) => state.planner);

  const startMonth = MONTH[start.getMonth()];
  const endMonth = MONTH[end.getMonth()];

  const startDay = start.getDate();
  const endDay = end.getDate();

  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.textArrowTray}>
          <IconButton
            size="small"
            fontName={faChevronLeft}
            onClick={() => dispatch(gotoPreviousWeek())}
          />
          <h4 className={styles.textArrowTray__text}>
            Meal Plan, {`${startMonth} ${startDay} - ${endMonth} ${endDay}`}
          </h4>
          <IconButton
            size="small"
            fontName={faChevronRight}
            onClick={() => dispatch(gotoNextWeek())}
          />
        </div>
        <IconButton
          size="medium"
          fontName={faEllipsisV}
          className={styles.header__menu}
        />
      </div>
    </div>
  );
};

export default PlanHeader;

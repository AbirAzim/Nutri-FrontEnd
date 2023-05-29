import { forwardRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { faCalendarDay } from "@fortawesome/pro-light-svg-icons";
import { differenceInDays, format, isAfter, isToday } from "date-fns";

import Icon from "../../../atoms/Icon/Icon.component";
import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";
import {
  setChallengeDate,
  setChallengePost,
  setShowPostForm,
} from "../../../../redux/slices/Challenge.slice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import styles from "./_Dialer.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import { UTCDate } from "../../../../helpers/Date";

interface MainInterface {
  canUpload: boolean;
  statistics: any;
  activities: any[];
}

type ILabel = "Total Days" | "Days Completed" | "Days Remaining";

function Main({ canUpload, activities, statistics }: MainInterface) {
  const [label, setLabel] = useState<ILabel>("Days Completed");

  const dispatch = useAppDispatch();
  const activeDate = useAppSelector((state) => state.challenge.activeDate);
  const today = activeDate !== "" ? UTCDate(activeDate) : new Date();
  const begin = statistics?.startDate ? UTCDate(statistics?.startDate) : today;
  const end = statistics?.endDate ? UTCDate(statistics?.endDate) : today;
  const hasChallengeEnded = isAfter(today, end);

  const onDateDblClick = (date) => {
    if (!canUpload) return;
    dispatch(setShowPostForm(true));
    dispatch(
      setChallengePost({
        isEditMode: false,
        id: "",
        docId: statistics?.challengeId,
        startDate: date,
        title: "",
        category: "",
        images: [],
        ingredients: [],
        notes: "",
        serving: 0,
      }),
    );
  };

  return (
    <div className={styles.challenge_circle_main_circle_outer}>
      <div className={styles.challenge_circle_main_circle}>
        <div className={styles.challenge_circle_inside_circle}>
          <div className={styles.wheel__profile}>
            <Image
              src={
                statistics?.memberInfo?.image || "/images/user-placeholder.png"
              }
              alt={""}
              layout={"fill"}
              objectFit={"fill"}
            />
          </div>
          <div className={`${styles.challenge_circle_inside_date} mt-10`}>
            {format(today, "EEEE, MMM dd")}
            <DateSelector
              activeDate={activeDate}
              startDate={begin}
              endDate={end}
            />
          </div>
          <div className={styles.dialer__days}>
            <span
              className={
                label === "Total Days" ? styles["dialer__days--active"] : ""
              }
              onClick={() => setLabel("Total Days")}
            >
              {statistics?.days || 0}
            </span>
            <span
              className={
                label === "Days Completed" ? styles["dialer__days--active"] : ""
              }
              onClick={() => setLabel("Days Completed")}
            >
              {statistics?.days === 0 && statistics?.daysRemaining === 0
                ? 0
                : differenceInDays(hasChallengeEnded ? end : today, begin) + 1}
            </span>
            <span
              className={
                label === "Days Remaining" ? styles["dialer__days--active"] : ""
              }
              onClick={() => setLabel("Days Remaining")}
            >
              {statistics?.daysRemaining || 0}
            </span>
          </div>
          <div className={styles.dialer__timeline_wrapper}>
            <div className={styles.dialer__timeline}>
              <span>{begin && format(begin, "MMM dd")}</span>
              <div className={styles.dialer__progress_wrapper}>
                <div className={styles.dialer__progress}>
                  <div style={{ width: `${statistics?.blendScore}%` }} />
                </div>
              </div>
              <span>{end && format(end, "MMM dd")}</span>
            </div>
            <h3>{label}</h3>
          </div>
          <div className={styles.dialer__score}>
            <h4>{parseFloat(statistics?.blendScore || 0).toFixed(1)}%</h4>
            <span>Score</span>
          </div>
          {/* <p className={styles.challenge_circle_remaining_percentage}>
            {parseFloat(statistics?.blendScore || 0).toFixed(1)}%
          </p>
          <p className={styles.challenge_circle_remaining_percentage_paragraph}>
            Blend Score
          </p> */}
        </div>
        {activities.map((activity, key) => {
          const categories = activity?.posts.map(
            (post) => post?.recipeBlendCategory?.name || "",
          );
          if (key > 30) return <div></div>;
          return (
            <DateButton
              key={activity?._id}
              date={activity?.date}
              categories={categories}
              disabled={activity?.disabled}
              isActive={
                activeDate !== ""
                  ? activity?.date === activeDate
                  : isToday(UTCDate(activity?.date))
              }
              onDateDblClick={onDateDblClick}
            />
          );
        })}
        <div className={styles.challenge_circle_semi_circle} />
      </div>
    </div>
  );
}

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span
    className="ml-10"
    style={{ cursor: "pointer", transform: "translateY(-1.5px)" }}
    onClick={onClick}
    ref={ref}
  >
    <Icon fontName={faCalendarDay} size="2rem" color="#fe5d1f" />
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

interface DateSelectorProps {
  activeDate: string;
  startDate: Date;
  endDate: Date;
}
const DateSelector = (props: DateSelectorProps) => {
  const dispatch = useAppDispatch();
  const { activeDate, startDate, endDate } = props;

  const dateHandler = (date) => {
    dispatch(setChallengeDate(format(date, "yyyy-MM-dd")));
  };

  return (
    <DatePicker
      selected={activeDate ? UTCDate(activeDate) : new Date()}
      minDate={startDate}
      maxDate={endDate}
      onChange={dateHandler}
      fixedHeight
      customInput={<DatePickerButton />}
    />
  );
};

function DateButton({
  date,
  isActive,
  categories,
  disabled,
  onDateDblClick,
}: any) {
  const days = UTCDate(date);
  const day = format(days, "d");
  const dayOfWeek = format(days, "eeee");
  const dayName = format(days, "MMM");

  const dispatch = useAppDispatch();
  const activateDate = () => {
    dispatch(setChallengeDate(date));
  };

  // Case - 1 - That day is not in the Challenge Range -> Disabled White Circle with border with no text
  if (disabled) {
    return (
      // <Tooltip content={dayOfWeek}>
      <div
        className={`${styles.wheel__button} ${styles["wheel__button--disabled"]}`}
        style={{
          background: "white",
          border: "1px solid #dddada",
        }}
      />
      // </Tooltip>
    );
  } else {
    // Case - 2 - That day is stil not passed -> Disabled White Circle with text and without any border
    if (isAfter(days, new Date())) {
      return (
        // <Tooltip content={dayOfWeek}>
        <div
          className={`${styles.wheel__button} ${styles["wheel__button--disabled"]}`}
          style={{
            background: "white",
            color: "#333",
            border: "1px solid #dddada",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
        // </Tooltip>
      );
    } else {
      // Case - 3 - That day is passed and it didn't had any post -> Disabled grey Circle with text and border
      // Case - 4 - That day is passed and has post -> Colorful circle with text and border
      // Case - 5 - Active Date -> Circle will be highlighted with extra shadow
      const hasPosts = categories.length !== 0;
      return (
        <div
          title={dayOfWeek}
          className={`${styles.wheel__button} ${
            hasPosts ? "" : styles["wheel__button--disabled"]
          }`}
          onClick={hasPosts ? activateDate : null}
          onDoubleClick={() => onDateDblClick(date)}
          style={{
            background: getBackgroundColor(categories),
            color: "white",
            boxShadow: isActive ? "3px 6px 6px #00000029" : "none",
          }}
        >
          <p>{day}</p>
          <p>{dayName}</p>
        </div>
      );
    }
  }
}

export function getBackgroundColor(categories: string[]) {
  const length = categories.length;
  if (length === 0) return "#D8D8D8";
  else if (length === 1) return RECIPE_CATEGORY_COLOR[categories[0]];
  else if (length === 2)
    return `linear-gradient(to left, ${
      RECIPE_CATEGORY_COLOR[categories[0]]
    } 50%, ${RECIPE_CATEGORY_COLOR[categories[1]]} 50%)`;
  else {
    const baseAngle = 360 / length;
    const result = categories.reduce((prev, curr, idx) => {
      return (prev += `${RECIPE_CATEGORY_COLOR[curr]} ${idx * baseAngle}deg, ${
        RECIPE_CATEGORY_COLOR[curr]
      } ${(idx + 1) * baseAngle}deg, `);
    }, "");

    return `conic-gradient(${result.slice(0, -2)})`;
  }
}

export default Main;

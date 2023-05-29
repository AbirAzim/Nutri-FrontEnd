/* eslint-disable @next/next/no-img-element */
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useRef,
  useState,
} from "react";
import styles from "./PlanCard.module.scss";
import useForSelectCommentsAndNotesIcon from "../../../customHooks/useForSelectCommentsAndNotesIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/pro-light-svg-icons";
import { RecipeCreatorInfo } from "../../../type/recipeType";
import useHover from "../../../components/utility/useHover";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import Icon from "../../atoms/Icon/Icon.component";
import WeekPicker from "../../molecules/DatePicker/Week.component";
import { startOfWeek, endOfWeek } from "date-fns";
import { useAppSelector } from "../../../redux/hooks";
import useToAddPlanToCollection from "../../../customHooks/plan/useToAddPlanToCollection";
import Link from "next/link";
import useToOpenPlanCollectionTray from "../../../customHooks/plan/useToOpenPlanCollectionTray";
import { PlanComeFromType } from "../../../redux/slices/Planner.slice";
import useToOpenPlanCommentsTray from "../../../customHooks/plan/useToOpenPlanCommentsTray";

interface dataCardInterface {
  title?: string;
  ingredients?: string;
  category?: string;
  ratings?: number;
  noOfRatings?: number;
  carbs?: number;
  score?: number;
  calorie?: number;
  noOfComments?: number;
  image?: string;
  planId?: string;
  notes?: number;
  addedToCompare?: boolean;
  compareRecipeList?: any[];
  setcompareRecipeList?: (state: any) => void;
  showMoreMenu?: boolean;
  showOptionalEditIcon?: boolean;
  changeToFormulateRecipe?: () => void;
  isCollectionIds?: string[] | null;
  setOpenCollectionModal?: Dispatch<SetStateAction<boolean>>;
  postfixTitle?: string;
  isMatch?: boolean;
  isImageOverlay?: boolean;
  imageOverlayFunc?: (arg: string) => void;
  userId?: null | RecipeCreatorInfo;
  customMenu?: React.ReactNode | null;
  showMoreMenuAtHover?: boolean;
  description?: string;
  className?: string;
  weekRange?: {
    start: Date;
    end: Date;
  };
  planComrFrom?: PlanComeFromType;
}

function PlanCard({
  className,
  title,
  ingredients,
  category,
  ratings,
  noOfRatings,
  carbs,
  score,
  calorie,
  noOfComments,
  image,
  weekRange,
  planId = "asf4weyfdh5477",
  notes = 0,
  setcompareRecipeList = () => {},
  showMoreMenu = true,
  isCollectionIds = [] || null,
  setOpenCollectionModal = () => {},
  customMenu = null,
  showMoreMenuAtHover = false,
  planComrFrom = "list",
}: dataCardInterface) {
  title = title || "Diabetes Friendly Meal Plan: Week 1";
  ingredients = ingredients;
  category = category || "Smoothie";
  noOfRatings = noOfRatings || 0;
  carbs = carbs || 23;
  calorie = calorie || 270;
  score = score || 701;
  noOfComments = noOfComments || 0;
  image = image || "/images/plan.png";
  ratings = Math.ceil(ratings);
  const menu = useRef<any>();
  const handleAddToCollection = useToAddPlanToCollection();
  const handleOpenPlanCommentsTray = useToOpenPlanCommentsTray();
  const selectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();
  const handleOpenCollectionTray = useToOpenPlanCollectionTray();
  const [hoverRef, isHover] = useHover();
  const [week, setWeek] = useState(weekRange);
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
  const handleClick = () => {
    const elem = menu.current;
    elem.classList.toggle("show__hidden");
  };

  const floatingMenu = (
    <div className={styles.floating__menu} ref={menu}>
      <ul>
        <li>
          <img src="/icons/square.png" alt="square" />
        </li>
        <li>
          <img src="/icons/share.png" alt="square" />
        </li>
        <li>
          <img src="/icons/edit.png" alt="square" />
        </li>
        <li>
          <img src="/icons/calender.png" alt="square" />
        </li>
        <li>
          <img src="/icons/cart.png" alt="square" />
        </li>
      </ul>
    </div>
  );

  const showFloatingMenu = (
    <>
      <IconWarper
        hover="bgSlightGray"
        handleClick={handleClick}
        style={{ width: "30px", height: "30px" }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconWarper>
      {floatingMenu}
    </>
  );

  const hangleShowCommentsAndNotesIcon = (comments: number, notes: number) => {
    const res = selectCommentsAndNotesIcon(comments, notes);
    return (
      <>
        <img
          src={`/icons/${res?.icon}.svg`}
          alt="icon"
          onClick={(e) => {
            handleOpenPlanCommentsTray({
              id: planId,
              name: title,
              image,
            });
          }}
        />{" "}
        <span style={{ color: res?.amount ? "#7cbc39" : "#c4c4c4" }}>
          {res?.amount}
        </span>
      </>
    );
  };

  const weekChangeHandler = (start, end) => {};

  return (
    <div className={`${styles.datacard} ${className || ""}`} ref={hoverRef}>
      <div className={styles.datacard__inner}>
        <div className={styles.heading}>
          <div className={styles.title}>
            <Link href={`/planner/plan/${planId}`}>
              <a className={styles.title}>
                <h2>{title}</h2>
              </a>
            </Link>
          </div>
          <div className={styles.menu}>
            {showMoreMenu &&
              (showMoreMenuAtHover ? (
                <div style={{ visibility: isHover ? "visible" : "hidden" }}>
                  {customMenu ? customMenu : showFloatingMenu}
                </div>
              ) : (
                <>{customMenu ? customMenu : showFloatingMenu}</>
              ))}
          </div>
        </div>
        <div className={styles.datacard__body__middle}>
          <img src={image} alt="" />
        </div>
        <div className={styles.datacard__body__belt}>
          <div className={styles.datacard__body__belt__child}>
            Net Carbs <span>{carbs}</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Rx Score <span>{score}</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Calorie <span>{calorie}</span>
          </div>
        </div>
        <div className={styles.datacard__body__bottom}>
          <div className={styles.datacard__body__bottom__left}>
            <div className={styles.databody__top__info}>
              <img src="/icons/star.svg" alt="star" />
              <span>{ratings || 0}</span>&nbsp;
              <span>({noOfRatings || 0})</span>
            </div>
          </div>
          <div className={styles.datacard__body__bottom__right}>
            <ul>
              <li>
                <WeekPicker
                  element={<DatePickerButton />}
                  week={week}
                  onWeekChange={weekChangeHandler}
                />
              </li>
              <li>
                <img
                  src={
                    isCollectionIds?.length
                      ? "/icons/compare.svg"
                      : "/images/BookmarksStar.svg"
                  }
                  alt="compare"
                  onClick={(e) => {
                    e.stopPropagation();
                    isCollectionIds?.length
                      ? handleOpenCollectionTray(
                          planId,
                          isCollectionIds,
                          planComrFrom,
                        )
                      : handleAddToCollection(
                          planId,
                          memberId,
                          setOpenCollectionModal,
                          planComrFrom,
                        );
                  }}
                />
              </li>
              <li>{hangleShowCommentsAndNotesIcon(noOfComments, notes)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span onClick={onClick} ref={ref}>
    <Icon fontName={faCalendarWeek} size="2rem" color="#aaa" />
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

PlanCard.defaultProps = {
  weekRange: { start: startOfWeek(new Date()), end: endOfWeek(new Date()) },
};
export default PlanCard;

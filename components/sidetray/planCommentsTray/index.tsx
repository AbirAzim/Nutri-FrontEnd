/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./PlanCommentsTray.module.scss";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMemo, faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import NoteSection from "../commentsTray/noteSection/NoteSection";
import CommentsSectionForPlan from "./commentsSectionForPlan";
import { setIsPlanCommentsTrayOpen } from "../../../redux/slices/Planner.slice";

interface CommentsTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function PlanCommentsTray({
  showPanle,
  showTagByDefaut,
}: CommentsTrayProps) {
  const [toggle, setToggle] = useState(0);
  const dispatch = useAppDispatch();
  const { currentPlanInfoForComments, isPlanCommentsTrayOpen } = useAppSelector(
    (state) => state?.planner,
  );

  const handleToggle = (no: number) => {
    setToggle(no);
  };

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={() =>
        dispatch(setIsPlanCommentsTrayOpen(!isPlanCommentsTrayOpen))
      }
      openTray={isPlanCommentsTrayOpen}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <ToggleMenu
        setToggle={handleToggle}
        toggle={toggle}
        toggleMenuList={[
          <div key={"key0"} className={styles.menu}>
            <FontAwesomeIcon icon={faMessageDots} className={styles.icon} />

            <p>Comments</p>
          </div>,
          <div key={"key1"} className={styles.menu}>
            <FontAwesomeIcon icon={faMemo} className={styles.icon} />
            <p>Notes</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <div className={styles.recipeName}>
        {/* {icon && <img src={icon} alt="img" />} */}
        <h3>{currentPlanInfoForComments?.name}</h3>
      </div>
      <img
        src={currentPlanInfoForComments?.image || "/images/plan.png"}
        alt=""
        className={styles.recipeImage}
      />
      {toggle === 0 ? (
        <CommentsSectionForPlan id={currentPlanInfoForComments?.id} />
      ) : (
        <NoteSection />
      )}
    </TrayWrapper>
  );
}

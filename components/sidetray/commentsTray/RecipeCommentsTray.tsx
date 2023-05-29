/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenCommentsTray } from "../../../redux/slices/sideTraySlice";
import styles from "./CommentsTray.module.scss";
import CommentSection from "./CommentSection/CommentSection";
import NoteSection from "./noteSection/NoteSection";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMemo, faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import ItemHeading from "../common/itemHeading/ItemHeading";

interface CommentsTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function RecipeCommentsTray({
  showPanle,
  showTagByDefaut,
}: CommentsTrayProps) {
  const [toggle, setToggle] = useState(0);
  const { openCommentsTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const { currentRecipeInfo } = useAppSelector((state) => state?.recipe);

  const handleClick = () => {
    dispatch(setOpenCommentsTray(!openCommentsTray));
  };

  const handleToggle = (no: number) => {
    setToggle(no);
  };

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={handleClick}
      openTray={openCommentsTray}
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
      <ItemHeading
        image={currentRecipeInfo?.image}
        title={currentRecipeInfo?.name}
      />
      {toggle === 0 ? (
        <CommentSection personalRating={currentRecipeInfo?.personalRating} />
      ) : (
        <NoteSection />
      )}
    </TrayWrapper>
  );
}

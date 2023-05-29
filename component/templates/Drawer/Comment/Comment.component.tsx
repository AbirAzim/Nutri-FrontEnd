import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { faMessageDots } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../../../redux/hooks";
import { format } from "date-fns";
import { FiEdit2 } from "react-icons/fi";
import { MdPersonOutline, MdDeleteOutline } from "react-icons/md";

import Drawer from "../Drawer.component";
import Publish from "../../../../helpers/Publish";
import StarRating from "../../../../theme/starRating/StarRating";
import TextArea from "../../../../theme/textArea/TextArea";
import TrayTag from "../../../../components/sidetray/TrayTag";

import {
  ADD_PLAN_COMMENT,
  EDIT_PLAN_COMMENT,
  REMOVE_PLAN_COMMENT,
} from "../../../../graphql/Planner";

import styles from "./Comment.module.scss";

interface CommentsTrayProps {
  id: string;
  show: boolean;
  title?: string;
  cover?: string;
  comments?: any[];
  icon?: string;
  onClose?: () => void;
}

function CommentDrawer(props: CommentsTrayProps) {
  const { show, id, title, cover, icon, onClose, comments } = props;

  const ref = useRef<any>();
  const [toggle, setToggle] = useState(1);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");

  const { dbUser } = useAppSelector((state) => state?.user);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [addComment, addState] = useMutation(ADD_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });
  const [editComment, editState] = useMutation(EDIT_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });
  const [deleteComment, deleteState] = useMutation(REMOVE_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });

  const handleToggle = (no: number) => {
    if (no === 1) {
      ref.current.style.left = "0";
    } else {
      ref.current.style.left = "50%";
    }
    setToggle(no);
  };

  const modifyComment = async () => {
    if (updateComment) {
      await Publish({
        mutate: editComment,
        state: editState,
        variables: {
          memberId: userId,
          commentId: updateCommentId,
          comment,
        },
        success: "Edited Comment",
        onSuccess: () => {
          setComment("");
          setShowCommentBox(false);
        },
      });
    } else {
      await Publish({
        mutate: addComment,
        state: addState,
        variables: {
          planId: id,
          memberId: userId,
          comment,
        },
        success: "Added Comment",
        onSuccess: () => {
          setComment("");
          setShowCommentBox(false);
        },
      });
    }
  };

  const removeComment = async (id: string) => {
    await Publish({
      mutate: deleteComment,
      state: deleteState,
      variables: {
        memberId: userId,
        commentId: id,
      },
      success: "Removed Comment",
      onSuccess: () => {
        setComment("");
        setShowCommentBox(false);
      },
    });
  };

  const updateComments = (id: string, comment: string, rating: number) => {
    setUpdateComment(true);
    setShowCommentBox(true);
    setUpdateCommentId(id);
    setComment(comment);
    setRating(rating);
  };

  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };

  return (
    <Drawer
      showTagByDefaut={false}
      closeTray={onClose}
      openTray={show}
      showPanle="right"
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <div className={styles.main}>
        <div className={styles.main__top}>
          <div className={styles.main__top__menu}>
            <div className={styles.active} ref={ref}></div>
            <div
              className={
                toggle === 2
                  ? styles.main__top__menu__child + " " + styles.inActiveImg
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(1)}
            >
              <img src="/icons/comment.svg" alt="comment_icon" /> Comments
            </div>
            <div
              className={
                toggle === 1
                  ? styles.main__top__menu__child + " " + styles.inActiveImg
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(2)}
            >
              <img src="/images/noun_note_3378544.svg" alt="note_icon" /> Notes
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recipeName}>
        {icon && <img src={icon} alt="img" />}
        <h3>{title}</h3>
      </div>
      <img
        src={cover || "/images/plan.png"}
        alt=""
        className={styles.recipeImage}
      />

      <div className={styles.userImage}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.imageBox}>
            {dbUser?.image ? (
              <img src={dbUser?.image} alt="user_img" />
            ) : (
              <MdPersonOutline />
            )}
          </div>
          <h6>
            {dbUser?.displayName ||
              dbUser?.lastName ||
              dbUser?.firstName ||
              dbUser?.email}
          </h6>
        </div>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      {showCommentBox && (
        <div className={styles.commentBoxContainer}>
          <TextArea
            name="comments"
            value={comment}
            onChange={(e) => setComment(e?.target?.value)}
            placeholder={`Comment`}
            style={{ fontSize: "12px", borderRadius: "10px" }}
            borderSecondary={true}
          />

          <div className={styles.buttonGroup}>
            <button
              className={styles.submitBtn}
              style={{ boxShadow: "5px 5px 15px #fe5d1f38" }}
              onClick={modifyComment}
            >
              {updateComment ? "Update" : "Comment"}
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                toggleCommentBox();
                setUpdateComment(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.commentsIconBox}>
        <span>{comments?.length} comments</span>
        {showCommentBox ? null : (
          <button
            onClick={() => {
              toggleCommentBox();
              setUpdateComment(false);
              setComment("");
              setRating(0);
            }}
          >
            <img src="/images/plus-white-icon.svg" alt="add-icon" />
            <span>Add</span>
          </button>
        )}
      </div>

      <div className={`${styles.commentsShowContainer} y-scroll`}>
        {comments?.length ? (
          comments?.map((comment, index) => {
            return (
              <div className={styles.singleComment} key={index}>
                <div className={styles.header}>
                  <div className={styles.leftSide}>
                    <div className={styles.userIcon}>
                      {comment?.memberId?.image ? (
                        <img src={comment?.memberId?.image} alt="user" />
                      ) : (
                        <MdPersonOutline />
                      )}
                    </div>
                    <h6>
                      {" "}
                      {comment?.memberId?.displayName ||
                        comment?.memberId?.lastName ||
                        comment?.memberId?.firstName ||
                        comment?.memberId?.email}
                    </h6>
                  </div>
                  <StarRating
                    rating={comment?.rating}
                    isAbleToSetRating={false}
                  />
                </div>
                <p>{comment?.comment}</p>
                <div className={styles.buttomSection}>
                  <span>
                    {comment?.updatedAt ? (
                      <>
                        {format(new Date(comment?.updatedAt), "dd/MM/yyyy")}{" "}
                        (edited)
                      </>
                    ) : (
                      format(new Date(comment?.createdAt), "dd/MM/yyyy")
                    )}
                  </span>
                  {userId === comment?.memberId?._id && (
                    <div className={styles.rightSide}>
                      <div
                        className={styles.editIconBox}
                        onClick={() =>
                          updateComments(
                            comment?._id,
                            comment?.comment,
                            comment?.rating,
                          )
                        }
                      >
                        <FiEdit2 className={styles.icon} />
                      </div>
                      <div
                        className={styles.editIconBox}
                        onClick={() => removeComment(comment?._id)}
                      >
                        <MdDeleteOutline className={styles.icon} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className={styles.noComments}>No comments</p>
        )}
      </div>
    </Drawer>
  );
}

export default CommentDrawer;

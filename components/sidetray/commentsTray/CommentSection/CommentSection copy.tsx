/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdDeleteOutline, MdPersonOutline } from "react-icons/md";
import CREATE_NET_COMMENT from "../../../../gqlLib/comments/mutation/createNewComment";
import DELETE_COMMENT from "../../../../gqlLib/comments/mutation/deleteComment";
import EDIT_COMMENT from "../../../../gqlLib/comments/mutation/edtiComment";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
// import { setLoading } from "../../../../redux/slices/utilitySlice";
import CommentBox from "../commentBox/CommentBox";
import styles from "./CommentSection.module.scss";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import StarRating from "../../../../theme/starRating/StarRating";
import { format } from "date-fns";
import { FiEdit2 } from "react-icons/fi";
import {
  setLatest,
  setPopular,
  setRecommended,
} from "../../../../redux/slices/recipeSlice";
import SkeletonComment from "../../../../theme/skeletons/skeletonComment/SkeletonComment";

type CommentSectionProps = {
  allComments: any[];
  setComments: Dispatch<SetStateAction<any[]>>;
  userComments: {};
  setUserComments: Dispatch<SetStateAction<{}>>;
};

const CommentSection = ({
  allComments,
  setComments,
  setUserComments,
  userComments,
}: CommentSectionProps) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [rating, setRating] = useState(0);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");
  const [comment, setComment] = useState("");
  const [createComment] = useMutation(CREATE_NET_COMMENT);
  const [editComment] = useMutation(EDIT_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const { latest, popular, recommended } = useAppSelector(
    (state) => state?.recipe,
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const updateRecipeRating = (
    id: string,
    averageRating: number,
    numberOfRating: number,
  ) => {
    dispatch(
      setRecommended(
        recommended?.map((recipe) =>
          recipe?._id === id
            ? { ...recipe, averageRating, numberOfRating }
            : recipe,
        ),
      ),
    );
    dispatch(
      setLatest(
        latest?.map((recipe) =>
          recipe?._id === id
            ? { ...recipe, averageRating, numberOfRating }
            : recipe,
        ),
      ),
    );
    dispatch(
      setPopular(
        popular?.map((recipe) =>
          recipe?._id === id
            ? { ...recipe, averageRating, numberOfRating }
            : recipe,
        ),
      ),
    );
  };

  const removeComment = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await deleteComment({
        variables: {
          data: {
            recipeId: activeRecipeId,
            userId: dbUser?._id,
            commentId: id,
          },
        },
      });

      setUserComments(data?.removeComment?.userComment || {});
      const { averageRating, numberOfRating, _id } =
        data?.removeComment?.recipe;
      updateRecipeRating(_id, averageRating, numberOfRating);
      setLoading(false);
      setUpdateComment(false);
      reactToastifyNotification("info", "Delete comment successfully");
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  const createOrUpdateComment = async () => {
    setLoading(true);
    try {
      if (!updateComment) {
        const { data } = await createComment({
          variables: {
            data: {
              comment: comment,
              // rating: rating || 1,
              recipeId: activeRecipeId,
              userId: dbUser?._id,
            },
          },
        });
        setComments(data?.createComment?.comments || []);
        setUserComments(data?.createComment?.userComment || {});
        const { averageRating, numberOfRating, _id } =
          data?.createComment?.recipe;
        updateRecipeRating(_id, averageRating, numberOfRating);
      } else {
        const { data: editData } = await editComment({
          variables: {
            editCommentData2: {
              editId: updateCommentId,
              recipeId: activeRecipeId,
              userId: dbUser?._id,
              editableObject: {
                // rating: rating,
                comment: comment,
              },
            },
          },
        });
        setUserComments(editData?.editComment?.userComment || {});
        const { averageRating, numberOfRating, _id } =
          editData?.editComment?.recipe;
        updateRecipeRating(_id, averageRating, numberOfRating);
        setUpdateComment(false);
      }

      setLoading(false);
      reactToastifyNotification(
        "info",
        `Comment ${updateComment ? "update" : "create"} successfully`,
      );
      toggleCommentBox();
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("error", error?.message);
    }
  };

  const updateCommentValue = (id: string, body: string, rating: number) => {
    setUpdateComment(true);
    setComment(body);
    setUpdateCommentId(id);
    setRating(rating);
    setShowCommentBox(true);
  };

  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };

  if (loading) {
    return <SkeletonComment />;
  }
  return (
    <div>
      {updateComment ? (
        <div className={styles.userImage}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.imageBox}>
              {dbUser?.image ? (
                <img src={dbUser?.image} alt="user_img" />
              ) : (
                <MdPersonOutline />
              )}
            </div>
            <h6 className={styles.userName}>
              {dbUser?.displayName ||
                dbUser?.lastName ||
                dbUser?.firstName ||
                dbUser?.email}
            </h6>
          </div>
          <StarRating rating={rating} setRating={setRating} />
        </div>
      ) : /* @ts-ignore */
      userComments?.comment ? (
        <div style={{ padding: "10px" }}>
          <div className={styles.singleComment}>
            <div className={styles.header}>
              <div className={styles.leftSide}>
                <div className={styles.userIcon}>
                  {dbUser?.image ? (
                    <img src={dbUser?.image} alt="user_img" />
                  ) : (
                    <MdPersonOutline />
                  )}
                </div>
                <h6 className={styles.userName}>
                  {" "}
                  {dbUser?.displayName ||
                    dbUser?.lastName ||
                    dbUser?.firstName ||
                    dbUser?.email}
                </h6>
              </div>

              <StarRating
                //@ts-ignore
                rating={userComments?.rating}
                isAbleToSetRating={false}
              />
            </div>
            {/* @ts-ignore */}
            <p>{userComments?.comment}</p>
            <div className={styles.buttomSection} style={{ margin: "0px" }}>
              <span>
                {/* @ts-ignore */}
                {userComments?.updatedAt ? (
                  <>
                    {format(
                      /* @ts-ignore */
                      new Date(userComments?.updatedAt),
                      "dd/MM/yyyy",
                    )}{" "}
                    (edited)
                  </>
                ) : (
                  /* @ts-ignore */
                  format(new Date(userComments?.createdAt), "dd/MM/yyyy")
                )}
              </span>
              <div className={styles.rightSide}>
                <div
                  className={styles.editIconBox}
                  onClick={() =>
                    updateCommentValue(
                      /* @ts-ignore */
                      userComments?._id,
                      /* @ts-ignore */
                      userComments?.comment,
                      /* @ts-ignore */
                      userComments?.rating,
                    )
                  }
                >
                  <FiEdit2 className={styles.icon} />
                </div>
                <div
                  className={styles.editIconBox}
                  /* @ts-ignore */
                  onClick={() => removeComment(userComments?._id)}
                >
                  <MdDeleteOutline className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}

      {showCommentBox ? (
        <CommentBox
          toggleCommentBox={toggleCommentBox}
          comment={comment}
          setComment={setComment}
          createOrUpdateComment={createOrUpdateComment}
          setUpdateComment={setUpdateComment}
          updateComment={updateComment}
        />
      ) : /* @ts-ignore */
      userComments?.comment ? null : showCommentBox ? (
        <CommentBox
          toggleCommentBox={toggleCommentBox}
          comment={comment}
          setComment={setComment}
          createOrUpdateComment={createOrUpdateComment}
          setUpdateComment={setUpdateComment}
          updateComment={updateComment}
        />
      ) : null}

      <div className={styles.commentsIconBox}>
        <span>
          {`${
            /* @ts-ignore */
            (allComments?.length || 0) + (userComments?.comment ? 1 : 0)
          } comments`}
        </span>
        {/* @ts-ignore */}
        {userComments?.comment ? null : showCommentBox ? null : (
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
        {allComments.length ? (
          allComments?.map((comment, index) => {
            return (
              <div className={styles.singleComment} key={index}>
                <div className={styles.header}>
                  <div className={styles.leftSide}>
                    <div className={styles.userIcon}>
                      {comment?.userId?.image ? (
                        <img src={comment?.userId?.image} alt="user" />
                      ) : (
                        <MdPersonOutline />
                      )}
                    </div>
                    <h6>
                      {" "}
                      {comment?.userId?.displayName ||
                        comment?.userId?.lastName ||
                        comment?.userId?.firstName ||
                        comment?.userId?.email}
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
                    {/* @ts-ignore */}
                    {comment?.updatedAt ? (
                      <>
                        {format(new Date(comment?.updatedAt), "dd/MM/yyyy")}{" "}
                        (edited)
                      </>
                    ) : (
                      format(new Date(comment?.createdAt), "dd/MM/yyyy")
                    )}
                  </span>
                  <div></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className={styles.noComments}>
            {/* @ts-ignore */}
            {userComments?.comment ? "No other comments " : "No comments"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

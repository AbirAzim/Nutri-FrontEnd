/* eslint-disable @next/next/no-img-element */
import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import CREATE_NET_COMMENT from "../../../../gqlLib/comments/mutation/createNewComment";
import DELETE_COMMENT from "../../../../gqlLib/comments/mutation/deleteComment";
import EDIT_COMMENT from "../../../../gqlLib/comments/mutation/edtiComment";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
// import { setLoading } from "../../../../redux/slices/utilitySlice";
import CommentBox from "../commentBox/CommentBox";
import styles from "./CommentSection.module.scss";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import {
  setLatest,
  setPopular,
  setRecommended,
} from "../../../../redux/slices/recipeSlice";
import SkeletonComment from "../../../../theme/skeletons/skeletonComment/SkeletonComment";
import IconForAddComment from "../../common/iconForAddComment/IconForAddComment";
import UserRating from "../../common/userRating/UserRating";
import GET_ALL_COMMENTS_FOR_A_RECIPE from "../../../../gqlLib/comments/query/getAllCommentsForARecipe";
import CommentsTopSection from "../../common/commentsTopSection/CommentsTopSection";
import CommentsBottomSection from "../../common/commentsButtomSection/CommentsBottomSection";
import CHANGE_RECIPE_RATING from "../../../../gqlLib/recipeRating/mutation/changeRecipeRating";

type CommentSectionProps = {
  // allComments: any[];
  // setComments: Dispatch<SetStateAction<any[]>>;
  // userComments: {};
  // setUserComments: Dispatch<SetStateAction<{}>>;
  personalRating?: number;
};

const CommentSection = ({ personalRating }: CommentSectionProps) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [rating, setRating] = useState(0);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");
  const [comment, setComment] = useState("");
  const [createComment, { loading: createCommentLoading }] =
    useMutation(CREATE_NET_COMMENT);
  const [editComment, { loading: editCommentLoading }] =
    useMutation(EDIT_COMMENT);
  const [deleteComment, { loading: deleteCommentsLoading }] =
    useMutation(DELETE_COMMENT);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const { latest, popular, recommended, referenceOfRecipeUpdateFunc } =
    useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();
  const { openCommentsTray } = useAppSelector((state) => state?.sideTray);
  const [changeRecipeRating] = useMutation(CHANGE_RECIPE_RATING);

  const [
    getAllCommentsForARecipe,
    { data: commentData, loading: commentLoading },
  ] = useLazyQuery(GET_ALL_COMMENTS_FOR_A_RECIPE, {
    fetchPolicy: "cache-and-network",
  });

  // fetch comments
  const fetchComments = async () => {
    try {
      getAllCommentsForARecipe({
        variables: {
          data: {
            recipeId: activeRecipeId,
            userId: dbUser?._id,
          },
        },
      });
    } catch (error) {
      reactToastifyNotification(error?.message);
    }
  };

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

  // delete or remove comment
  const removeComment = async (id: string) => {
    try {
      const { data } = await deleteComment({
        variables: {
          data: {
            recipeId: activeRecipeId,
            userId: dbUser?._id,
            commentId: id,
          },
        },
        update(cache, { data: { removeComment } }) {
          cache.writeQuery({
            query: GET_ALL_COMMENTS_FOR_A_RECIPE,
            variables: {
              data: {
                recipeId: activeRecipeId,
                userId: dbUser?._id,
              },
            },
            data: {
              getAllCommentsForARecipe: {
                comments: [...removeComment?.comments],

                recipe: {
                  ...removeComment?.recipe,
                },
              },
            },
          });
        },
      });

      referenceOfRecipeUpdateFunc(activeRecipeId, {
        numberOfRating: data?.removeComment?.comments?.length
          ? data?.removeComment?.comments?.length
          : null,
      });

      setUpdateComment(false);
      reactToastifyNotification("info", "Delete comment successfully");
    } catch (error) {
      reactToastifyNotification("error", error?.message);
    }
  };

  const createOrUpdateComment = async () => {
    setShowCommentBox(false);
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
          update(cache, { data: { createComment } }) {
            cache.writeQuery({
              query: GET_ALL_COMMENTS_FOR_A_RECIPE,
              variables: {
                data: {
                  recipeId: activeRecipeId,
                  userId: dbUser?._id,
                },
              },
              data: {
                getAllCommentsForARecipe: {
                  comments: [...createComment?.comments],
                  recipe: {
                    ...createComment?.recipe,
                  },
                },
              },
            });
          },
        });
        referenceOfRecipeUpdateFunc(activeRecipeId, {
          numberOfRating: data?.createComment?.comments?.length
            ? data?.createComment?.comments?.length
            : null,
        });
      } else {
        await editComment({
          variables: {
            data: {
              editId: updateCommentId,
              recipeId: activeRecipeId,
              userId: dbUser?._id,
              editableObject: {
                // rating: rating,
                comment: comment,
              },
            },
          },
          update(cache, { data: { editComment } }) {
            cache.writeQuery({
              query: GET_ALL_COMMENTS_FOR_A_RECIPE,
              variables: {
                data: {
                  recipeId: activeRecipeId,
                  userId: dbUser?._id,
                },
              },
              data: {
                getAllCommentsForARecipe: {
                  comments: [...editComment?.comments],
                  recipe: {
                    ...editComment?.recipe,
                  },
                },
              },
            });
          },
        });
        setUpdateComment(false);
      }

      reactToastifyNotification(
        "info",
        `Comment ${updateComment ? "update" : "create"} successfully`,
      );
    } catch (error) {
      reactToastifyNotification("error", error?.message);
    }
  };

  const updateCommentValue = (body: string, id?: string, rating?: number) => {
    setUpdateComment(true);
    setComment(body);
    setUpdateCommentId(id);
    setRating(rating);
    setShowCommentBox(true);
  };

  const toggleCommentBox = () => {
    setComment("");
    setShowCommentBox((pre) => !pre);
  };

  const updatedRating = useCallback(
    async (newRating: number) => {
      setRating(newRating);
      const { data } = await changeRecipeRating({
        variables: {
          rating: newRating,
          recipeId: activeRecipeId,
          userId: dbUser?._id,
        },
      });

      const { averageRating, numberOfRating } = data?.changeRecipeRating;
      referenceOfRecipeUpdateFunc(
        activeRecipeId,
        { averageRating, numberOfRating },
        "recipeId",
      );
    },
    [
      activeRecipeId,
      changeRecipeRating,
      dbUser?._id,
      referenceOfRecipeUpdateFunc,
    ],
  );
  useEffect(() => {
    setRating(personalRating);
  }, [personalRating]);

  useEffect(() => {
    if (openCommentsTray && activeRecipeId) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCommentsTray, activeRecipeId]);

  return (
    <>
      <UserRating
        rating={rating}
        setRating={updatedRating}
        userImage={dbUser?.image}
        userName={
          dbUser?.displayName ||
          dbUser?.lastName ||
          dbUser?.firstName ||
          dbUser?.email
        }
      />
      <div className="flex ai-center jc-between mt-20 mb-30">
        {commentData?.getAllCommentsForARecipe?.comments?.length ? (
          <span className={styles.commentsLength}>{`${
            commentData?.getAllCommentsForARecipe?.comments?.length
          } ${
            commentData?.getAllCommentsForARecipe?.comments?.length >= 1
              ? "comments"
              : "comment"
          }`}</span>
        ) : null}

        {!showCommentBox && (
          <IconForAddComment handleIconClick={toggleCommentBox} />
        )}
      </div>

      {(createCommentLoading || editCommentLoading) && (
        <SkeletonComment singleComment={true} />
      )}

      {showCommentBox && (
        <>
          <CommentBox
            toggleCommentBox={toggleCommentBox}
            comment={comment}
            setComment={setComment}
            createOrUpdateComment={createOrUpdateComment}
            setUpdateComment={setUpdateComment}
            updateComment={updateComment}
          />
        </>
      )}

      {commentLoading ? (
        <SkeletonComment />
      ) : (
        <div className={`${styles.commentsShowContainer} y-scroll`}>
          {commentData?.getAllCommentsForARecipe?.comments?.length ? (
            commentData?.getAllCommentsForARecipe?.comments?.map(
              (comment, index) => {
                return (
                  <div className={styles.singleComment} key={index}>
                    <CommentsTopSection
                      userRating={comment?.rating}
                      isAbleToSetRating={false}
                      user={comment?.userId}
                      page="recipe"
                      isCurrentUser={comment?.userId?._id === dbUser?._id}
                      updateCommentValue={updateCommentValue}
                      removeComment={removeComment}
                      deleteCommentLoading={deleteCommentsLoading}
                      userComments={comment}
                    />
                    <CommentsBottomSection
                      userComments={comment}
                      isCurrentUser={comment?.userId?._id === dbUser?._id}
                      updateCommentValue={updateCommentValue}
                      removeComment={removeComment}
                      deleteCommentLoading={deleteCommentsLoading}
                      rating={comment?.rating}
                    />
                  </div>
                );
              },
            )
          ) : (
            <p className={styles.noComments}>{"No comments"}</p>
          )}
        </div>
      )}
    </>
  );
};

export default CommentSection;

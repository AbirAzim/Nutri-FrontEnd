import React, { useEffect, useState } from "react";
import {
  ADD_PLAN_COMMENT,
  EDIT_PLAN_COMMENT,
  GET_ALL_PLAN_COMMENTS,
  REMOVE_PLAN_COMMENT,
} from "../../../../graphql/Planner";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import IconForAddComment from "../../common/iconForAddComment/IconForAddComment";
import styles from "../PlanCommentsTray.module.scss";
import SkeletonComment from "../../../../theme/skeletons/skeletonComment/SkeletonComment";
import CommentBox from "../../commentsTray/commentBox/CommentBox";
import Publish from "../../../../helpers/Publish";
import { useAppSelector } from "../../../../redux/hooks";
import CommentsTopSection from "../../common/commentsTopSection/CommentsTopSection";
import CommentsBottomSection from "../../common/commentsButtomSection/CommentsBottomSection";
import notification from "../../../utility/reactToastifyNotification";

interface CommentsSectionForPlanType {
  id: string;
}
const CommentsSectionForPlan = ({ id }: CommentsSectionForPlanType) => {
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");
  const [getAllCommentsForAPlan, { data, loading: getCommentsLoading }] =
    useLazyQuery(GET_ALL_PLAN_COMMENTS);

  const [addComment, addState] = useMutation(ADD_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });
  const [editComment, editState] = useMutation(EDIT_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });
  const [deleteComment, deleteState] = useMutation(REMOVE_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });

  const toggleCommentBox = () => {
    setComment("");
    setShowCommentBox((pre) => !pre);
  };

  const modifyComment = async () => {
    if (!comment) {
      notification("warning", "Please add comments");
      return;
    }
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

  const updateCommentValue = (body: string, id?: string) => {
    setUpdateComment(true);
    setComment(body);
    setUpdateCommentId(id);
    setShowCommentBox(true);
  };

  useEffect(() => {
    if (id) {
      getAllCommentsForAPlan({
        variables: {
          id,
          skip: id === "",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let comments = data?.getAllCommentsForAPlan;

  return (
    <div>
      <div className="flex ai-center jc-between mt-20 mb-30">
        {comments?.length ? (
          <span className={styles.commentsLength}>{`${comments?.length} ${
            comments?.length >= 1 ? "comments" : "comment"
          }`}</span>
        ) : (
          <span></span>
        )}

        {!showCommentBox && (
          <IconForAddComment handleIconClick={toggleCommentBox} />
        )}
      </div>

      {addState.loading ||
        (editState.loading && <SkeletonComment singleComment={true} />)}

      {showCommentBox && (
        <>
          <CommentBox
            toggleCommentBox={toggleCommentBox}
            comment={comment}
            setComment={setComment}
            createOrUpdateComment={modifyComment}
            setUpdateComment={setUpdateComment}
            updateComment={updateComment}
          />
        </>
      )}

      {getCommentsLoading ? (
        <SkeletonComment />
      ) : (
        <div className={`${styles.commentsShowContainer} y-scroll`}>
          {comments?.length ? (
            comments?.map((comment, index) => {
              return (
                <div className={styles.singleComment} key={index}>
                  <CommentsTopSection
                    userRating={comment?.rating}
                    isAbleToSetRating={false}
                    user={comment?.memberId}
                    page="recipe"
                    isCurrentUser={comment?.memberId?._id === userId}
                    updateCommentValue={updateCommentValue}
                    removeComment={removeComment}
                    deleteCommentLoading={deleteState.loading}
                    userComments={comment}
                  />
                  <CommentsBottomSection
                    userComments={comment}
                    isCurrentUser={comment?.userId?._id === userId}
                    updateCommentValue={updateCommentValue}
                    removeComment={removeComment}
                    deleteCommentLoading={deleteState.loading}
                    rating={comment?.rating}
                  />
                </div>
              );
            })
          ) : (
            <p className={styles.noComments}>{"No comments"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSectionForPlan;

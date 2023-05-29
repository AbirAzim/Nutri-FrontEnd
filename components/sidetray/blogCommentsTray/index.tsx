import { useLazyQuery, useMutation } from "@apollo/client";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CREATE_BLOG_COMMENT from "../../../gqlLib/blog/mutation/createBlogComment";
import EDIT_BLOG_COMMENT from "../../../gqlLib/blog/mutation/editBlogComment";
import REMOVE_A_BLOG_COMMENT from "../../../gqlLib/blog/mutation/removeABlogComment";
import GET_ALL_COMMENTS_FOR_A_BLOG from "../../../gqlLib/blog/query/getAllCommentsForABlog";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsOpenBlogCommentsTray } from "../../../redux/slices/blogSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import notification from "../../utility/reactToastifyNotification";
import CommentBox from "../commentsTray/commentBox/CommentBox";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import ItemHeading from "../common/itemHeading/ItemHeading";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import CommentsBottomSection from "../common/commentsButtomSection/CommentsBottomSection";
import CommentsTopSection from "../common/commentsTopSection/CommentsTopSection";
import styles from "./BlogCommentsTray.module.scss";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const BlogCommentsTray = ({
  showPanle = "right",
  showTagByDefaut = false,
}: Props) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [comment, setComment] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState("");
  const { isOpenBlogCommentsTray, currentBlogForShowComments } = useAppSelector(
    (state) => state.blog,
  );
  const [
    getAllComments,
    {
      data: allCommentsData,
      loading: allCommentsLoading,
      error: allCommentsError,
    },
  ] = useLazyQuery(GET_ALL_COMMENTS_FOR_A_BLOG);
  const [crateBlogComment, { loading: createBlogCommentLoading }] =
    useMutation(CREATE_BLOG_COMMENT);
  const [editBlogComment, { loading: editBlogCommentLoading }] =
    useMutation(EDIT_BLOG_COMMENT);
  const [removeABlogComment, { loading: removeBlogLoading }] = useMutation(
    REMOVE_A_BLOG_COMMENT,
  );
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state.user);

  // update Comment value
  const updateCommentValue = (comment: string, id?: string) => {
    setUpdateComment(true);
    setComment(comment);
    setUpdateCommentId(id);
    setShowCommentBox(true);
  };

  // create or update wiki comment
  const createOrUpdateWikiComment = async () => {
    setShowCommentBox(false);
    const { id } = currentBlogForShowComments;
    try {
      if (updateComment) {
        await editBlogComment({
          variables: {
            data: {
              editableObject: {
                comment,
              },
              editId: updateCommentId,
              memberId: dbUser?._id,
            },
          },
          update(cache, { data: { editBlogComment } }) {
            cache.writeQuery({
              query: GET_ALL_COMMENTS_FOR_A_BLOG,
              variables: { blogId: id },
              data: {
                getAllCommentsForABlog:
                  allCommentsData?.getAllCommentsForABlog?.map((blog) =>
                    blog?._id === editBlogComment?._id
                      ? { ...blog, ...editBlogComment }
                      : blog,
                  ),
              },
            });
          },
        });

        setUpdateComment(false);
        setComment("");
      } else {
        await crateBlogComment({
          variables: {
            data: {
              comment,
              blogId: id,
              memberId: dbUser?._id,
            },
          },
          update(cache, { data: { createBlogComment } }) {
            cache.writeQuery({
              query: GET_ALL_COMMENTS_FOR_A_BLOG,
              variables: { blogId: id },
              data: {
                getAllCommentsForABlog: [
                  createBlogComment,
                  ...allCommentsData?.getAllCommentsForABlog,
                ],
              },
            });
          },
        });
        setComment("");
      }
    } catch (error) {
      notification(
        "error",
        `Failed to ${updateComment ? "update" : "create"} comment`,
      );
    }
  };

  // delete blog comment
  const handleToRemoveBlogComment = async (id: string) => {
    const { id: blogId } = currentBlogForShowComments;
    try {
      await removeABlogComment({
        variables: {
          commentId: id,
          memberId: dbUser?._id,
        },
        update(cache) {
          cache.writeQuery({
            query: GET_ALL_COMMENTS_FOR_A_BLOG,
            variables: { blogId },
            data: {
              getAllCommentsForABlog:
                allCommentsData?.getAllCommentsForABlog?.filter(
                  (blog) => blog?._id !== id,
                ),
            },
          });
        },
      });
    } catch (error) {
      notification("error", "Unable to delete blog comment");
    }
  };

  // Toggle comments box
  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };

  useEffect(() => {
    if (currentBlogForShowComments?.id) {
      getAllComments({ variables: { blogId: currentBlogForShowComments?.id } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlogForShowComments?.id]);

  return (
    <TrayWrapper
      openTray={isOpenBlogCommentsTray}
      showPanle={showPanle}
      showTagByDefaut={showTagByDefaut}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
          handleTagClick={() => dispatch(setIsOpenBlogCommentsTray(false))}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={["Blog Comments"]}
        variant="outlineSecondary"
      />
      <ItemHeading
        image={currentBlogForShowComments?.image}
        title={currentBlogForShowComments?.title}
      />
      {!showCommentBox && (
        <IconForAddComment
          handleIconClick={toggleCommentBox}
          label="Add Comments"
        />
      )}

      {(editBlogCommentLoading || createBlogCommentLoading) && (
        <SkeletonComment singleComment={true} />
      )}

      {showCommentBox && (
        <CommentBox
          toggleCommentBox={toggleCommentBox}
          comment={comment}
          setComment={setComment}
          createOrUpdateComment={createOrUpdateWikiComment}
          setUpdateComment={setUpdateComment}
          updateComment={updateComment}
        />
      )}
      {allCommentsLoading ? (
        <SkeletonComment />
      ) : (
        <div className={`${styles.commentsShowContainer} y-scroll`}>
          {allCommentsData?.getAllCommentsForABlog?.length ? (
            allCommentsData?.getAllCommentsForABlog?.map((comment, index) => {
              return (
                <div className={styles.singleComment} key={index}>
                  <CommentsTopSection user={comment?.memberId} page="wiki" />
                  <CommentsBottomSection
                    userComments={comment}
                    isCurrentUser={comment?.memberId?._id === dbUser?._id}
                    updateCommentValue={updateCommentValue}
                    removeComment={handleToRemoveBlogComment}
                    deleteCommentLoading={removeBlogLoading}
                  />
                </div>
              );
            })
          ) : (
            <p className={styles.noComments}>{"No comments"}</p>
          )}
        </div>
      )}
    </TrayWrapper>
  );
};

export default BlogCommentsTray;

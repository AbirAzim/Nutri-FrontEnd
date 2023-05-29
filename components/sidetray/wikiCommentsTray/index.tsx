import { useLazyQuery, useMutation } from "@apollo/client";
import { faMessageDots, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CREATE_WIKI_COMMENT from "../../../gqlLib/wiki/mutation/createWikiComment";
import EDIT_WIKI_COMMENTS from "../../../gqlLib/wiki/mutation/editWikiComment";
import REMOVE_WIKI_COMMENT from "../../../gqlLib/wiki/mutation/removeAWikiComment";
import GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY from "../../../gqlLib/wiki/query/getAllWikiCommentsForAWikiEntity";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsOpenWikiCommentsTray } from "../../../redux/slices/wikiSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import {
  WikiCommentsType,
  WikiUserComment,
} from "../../../type/wikiCommentsType";
import notification from "../../utility/reactToastifyNotification";
import CommentBox from "../commentsTray/commentBox/CommentBox";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import ItemHeading from "../common/itemHeading/ItemHeading";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import CommentsBottomSection from "../common/commentsButtomSection/CommentsBottomSection";
import CommentsTopSection from "../common/commentsTopSection/CommentsTopSection";
import s from "./WikiCommentsTray.module.scss";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

const WikiCommentsTray = ({
  showPanle = "right",
  showTagByDefaut = false,
}: Props) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [comment, setComment] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState("");
  const dispatch = useAppDispatch();
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);
  const { dbUser } = useAppSelector((state) => state?.user);
  const [
    getAllWikiCommentsForAWikiEntity,
    { data: allWikiCommentsData, loading: getAllWikiCommentsLoading },
  ] = useLazyQuery(GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY, {
    fetchPolicy: "cache-and-network",
  });
  const [crateWikiComment, { loading: createWikiCommentLoading }] =
    useMutation(CREATE_WIKI_COMMENT);
  const [editWikiComment, { loading: editWikiCommentLoading }] =
    useMutation(EDIT_WIKI_COMMENTS);
  const [removeWikiComment, { loading: removeWikiCommentLoading }] =
    useMutation(REMOVE_WIKI_COMMENT);

  // update Comment value
  const updateCommentValue = (comment: string, id?: string) => {
    setUpdateComment(true);
    setComment(comment);
    setUpdateCommentId(id);
    setShowCommentBox(true);
  };

  // delete wiki comment
  const handleToRemoveWikiComment = async (commentId: string) => {
    try {
      await removeWikiComment({
        variables: {
          commentId,
          userId: dbUser?._id,
        },
        update(cache) {
          cache.writeQuery({
            query: GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY,
            variables: {
              entityId: wikiCommentsTrayCurrentWikiEntity?.id,
              userId: dbUser?._id,
            },
            data: {
              getAllWikiCommentsForAWikiEntity:
                allWikiCommentsData?.getAllWikiCommentsForAWikiEntity?.filter(
                  (wiki) => wiki?._id !== commentId,
                ),
            },
          });
        },
      });
    } catch (error) {
      notification("error", "Unable to delete wiki comment");
    }
  };

  // create or update wiki comment
  const createOrUpdateWikiComment = async () => {
    setShowCommentBox(false);
    const { id, type } = wikiCommentsTrayCurrentWikiEntity;
    try {
      let res: WikiUserComment = null;
      if (updateComment) {
        await editWikiComment({
          variables: {
            data: {
              editableObject: {
                comment,
              },
              editId: updateCommentId,
              userId: dbUser?._id,
            },
          },
          update(cache, { data: { editWikiComment } }) {
            cache.writeQuery({
              query: GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY,
              variables: {
                entityId: wikiCommentsTrayCurrentWikiEntity?.id,
                userId: dbUser?._id,
              },
              data: {
                getAllWikiCommentsForAWikiEntity:
                  allWikiCommentsData?.getAllWikiCommentsForAWikiEntity?.map(
                    (wiki) =>
                      wiki?._id === editWikiComment?._id
                        ? { ...wiki, ...editWikiComment }
                        : wiki,
                  ),
              },
            });
          },
        });
        // res = data?.editWikiComment;
        setUpdateComment(false);
        setComment("");
      } else {
        await crateWikiComment({
          variables: {
            data: {
              comment,
              type,
              entityId: id,
              userId: dbUser?._id,
            },
          },
          update(cache, { data: { createWikiComment } }) {
            cache.writeQuery({
              query: GET_ALL_WIKI_COMMENTS_FOR_A_WIKI_ENTITY,
              variables: {
                entityId: wikiCommentsTrayCurrentWikiEntity?.id,
                userId: dbUser?._id,
              },
              data: {
                getAllWikiCommentsForAWikiEntity: [
                  createWikiComment,
                  ...allWikiCommentsData?.getAllWikiCommentsForAWikiEntity,
                ],
              },
            });
          },
        });
        // res = data?.createWikiComment;
        setComment("");
      }
    } catch (error) {
      notification(
        "error",
        `Failed to ${updateComment ? "update" : "create"} comment`,
      );
    }
  };

  // Toggle comments box
  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };

  //  get All Wiki Comments for a wiki entity

  const handleToGetAllWikiComments = async () => {
    try {
      const { data } = await getAllWikiCommentsForAWikiEntity({
        variables: {
          entityId: wikiCommentsTrayCurrentWikiEntity?.id,
          userId: dbUser?._id,
        },
      });
      const res: WikiCommentsType = data?.getAllWikiCommentsForAWikiEntity;
    } catch (error) {
      notification("error", "Unable to fetch wiki entry comments");
      console.log(error);
    }
  };

  useEffect(() => {
    if (wikiCommentsTrayCurrentWikiEntity?.id && dbUser?._id) {
      handleToGetAllWikiComments();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiCommentsTrayCurrentWikiEntity?.id]);

  return (
    <TrayWrapper
      openTray={isOpenWikiCommentsTray}
      showPanle={showPanle}
      showTagByDefaut={showTagByDefaut}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
          handleTagClick={() => dispatch(setIsOpenWikiCommentsTray(false))}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={["Wiki Comments"]}
        variant="outlineSecondary"
      />
      <ItemHeading
        image={wikiCommentsTrayCurrentWikiEntity?.image}
        title={wikiCommentsTrayCurrentWikiEntity?.title}
      />
      {!showCommentBox && (
        <IconForAddComment handleIconClick={toggleCommentBox} />
      )}

      {editWikiCommentLoading ||
        (createWikiCommentLoading && <SkeletonComment singleComment={true} />)}

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
      {getAllWikiCommentsLoading ? (
        <SkeletonComment />
      ) : (
        <div className={`${s.commentsShowContainer} y-scroll`}>
          {allWikiCommentsData?.getAllWikiCommentsForAWikiEntity.length ? (
            allWikiCommentsData?.getAllWikiCommentsForAWikiEntity?.map(
              (comment, index) => {
                return (
                  <div className={s.singleComment} key={index}>
                    <CommentsTopSection user={comment?.userId} page="wiki" />
                    <CommentsBottomSection
                      userComments={comment}
                      isCurrentUser={comment?.userId?._id === dbUser?._id}
                      updateCommentValue={updateCommentValue}
                      removeComment={handleToRemoveWikiComment}
                      deleteCommentLoading={removeWikiCommentLoading}
                    />
                  </div>
                );
              },
            )
          ) : (
            <p className={s.noComments}>{"No comments"}</p>
          )}
        </div>
      )}
    </TrayWrapper>
  );
};

export default WikiCommentsTray;

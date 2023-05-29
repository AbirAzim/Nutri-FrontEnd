import React, { Dispatch, SetStateAction } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdPersonOutline } from "react-icons/md";
import StarRating from "../../../../theme/starRating/StarRating";
import styles from "./CommentsTopSection.module.scss";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import { WikiUserComment } from "../../../../type/wikiCommentsType";

interface Props {
  userComments?: WikiUserComment;
  user?: any;
  rating?: number;
  setRating?: Dispatch<SetStateAction<number>>;
  isAbleToSetRating?: boolean;
  userRating?: number;
  page?: "wiki" | "blog" | "recipe";
  updateCommentValue?: (agr: string, id?: string, rating?: number) => void;
  removeComment?: (id: string) => void;
  isCurrentUser?: boolean;
  deleteCommentLoading?: boolean;
}

const CommentsTopSection = ({
  rating = 1,
  setRating = () => {},
  user = {},
  isAbleToSetRating = true,
  userRating = 0,
  page = "recipe",
  updateCommentValue = () => {},
  removeComment = () => {},
  isCurrentUser = false,
  deleteCommentLoading = false,
  userComments,
}: Props) => {
  return (
    <div className={styles.userImage}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.imageBox}>
          {user?.image ? (
            <img src={user?.image} alt="user_img" />
          ) : (
            <MdPersonOutline />
          )}
        </div>
        <h6 className={styles.userName}>
          {user?.displayName ||
            user?.lastName ||
            user?.firstName ||
            user?.email}
        </h6>
      </div>

      {isCurrentUser && (
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <IconWarper
              hover="none"
              defaultBg="gray"
              handleClick={() =>
                updateCommentValue(
                  userComments?.comment,
                  userComments?._id,
                  rating,
                )
              }
              style={{ marginRight: "5px" }}
            >
              <FontAwesomeIcon icon={faPen} fontSize={12} />
            </IconWarper>

            <IconWarper
              hover="none"
              defaultBg="gray"
              handleClick={() => removeComment(userComments?._id)}
            >
              {deleteCommentLoading ? (
                <CircularRotatingLoader
                  color="white"
                  style={{ fontSize: "16px" }}
                />
              ) : (
                <FontAwesomeIcon icon={faTrash} fontSize={12} />
              )}
            </IconWarper>
          </div>
        </div>
      )}
      {/* {page === "recipe" && (
        <StarRating
          rating={isAbleToSetRating ? rating : userRating}
          setRating={setRating}
          isAbleToSetRating={isAbleToSetRating}
        />
      )} */}
    </div>
  );
};

export default CommentsTopSection;

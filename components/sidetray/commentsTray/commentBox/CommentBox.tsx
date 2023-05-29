import React, { Dispatch, SetStateAction } from "react";
import CommentAndNoteButton from "../../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import TextArea from "../../../../theme/textArea/TextArea";
import styles from "./CommentBox.module.scss";

type CommentBoxProps = {
  toggleCommentBox: () => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  createOrUpdateComment: () => void;
  setUpdateComment: Dispatch<SetStateAction<boolean>>;
  updateComment: boolean;
};

const CommentBox = ({
  toggleCommentBox,
  setComment,
  comment,
  createOrUpdateComment,
  setUpdateComment,
  updateComment,
}: CommentBoxProps) => {
  return (
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
        <CommentAndNoteButton
          type="submitBtn"
          text={updateComment ? "Update" : "Comment"}
          style={{ boxShadow: "5px 5px 15px #fe5d1f38" }}
          handleClick={createOrUpdateComment}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text="Cancel"
          handleClick={() => {
            toggleCommentBox();
            setUpdateComment(false);
          }}
        />
      </div>
    </div>
  );
};

export default CommentBox;

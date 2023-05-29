import React, { ReactNode } from "react";
import styles from "./Buttons.module.scss";

type Props = {
  style?: React.CSSProperties;
  handleClick?: () => void;
  text?: string | ReactNode;
  type: "submitBtn" | "cancleBtn";
  submitBtnVarient?: "primary" | "secondary";
};

const CommentAndNoteButton = ({
  style = {},
  handleClick = () => {},
  text = "Submit",
  type = "submitBtn",
  submitBtnVarient = "primary",
}: Props) => {
  return (
    <button
      className={`${styles.btn} ${styles[submitBtnVarient]} ${styles[type]}`}
      style={style}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default CommentAndNoteButton;

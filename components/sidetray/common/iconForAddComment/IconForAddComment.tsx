import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import styles from "./IconForAddComment.module.scss";

interface Props {
  handleIconClick: () => void;
  label?: string;
}

const IconForAddComment = ({
  handleIconClick,
  label = "Add Comments",
}: Props) => {
  return (
    <div className={styles.addCommentsIcon}>
      <p className={styles.text}>{label}</p>
      <IconWarper
        iconColor="iconColorWhite"
        defaultBg="secondary"
        hover="bgSecondary"
        style={{ width: "28px", height: "28px" }}
        handleClick={handleIconClick}
      >
        <FontAwesomeIcon icon={faPlus} />
      </IconWarper>
    </div>
  );
};

export default IconForAddComment;

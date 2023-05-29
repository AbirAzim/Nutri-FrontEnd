import {
  faShareNodes,
  faSquareCaretUp,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faCircle,
  faMessageDots as faMessageDotsSolid,
} from "@fortawesome/pro-solid-svg-icons";
import { faMessageDots as faMessageDotsLight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../wikiCenter.module.scss";

interface Props {
  id: string;
  categroy?: string;
  author?: string;
  commentsCount?: number;
  expandAllCollapse?: boolean;
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
  handleToOpenCommentTray?: (id) => void;
}

const SubHeader = ({
  id,
  author,
  categroy,
  commentsCount,
  expandAllCollapse = true,
  setExpandAllCollapse = () => {},
  handleToOpenCommentTray = () => {},
}: Props) => {
  return (
    <div className={styles.blendingRecipeTopOptions}>
      <div className={styles.blendingTopLeft}>
        <div className={styles.tagItemBx}>
          <p>{categroy}</p>
        </div>
        <div className={styles.authorBx}>
          <div className={styles.dotDiv}>
            <FontAwesomeIcon icon={faCircle} className={styles.dot} />
          </div>

          <div className={styles.authName}>{author}</div>
        </div>
      </div>

      <ul className={styles.subHeadingIconBoxRight}>
        <li>
          <FontAwesomeIcon
            className={`${styles.innerIcon}`}
            icon={faShareNodes}
          />
          <span className={styles.innerText}>Share</span>
        </li>
        <li onClick={() => setExpandAllCollapse((prev) => !prev)}>
          <FontAwesomeIcon
            icon={faSquareCaretUp}
            className={`${styles.innerIcon} ${
              expandAllCollapse && styles.rotatedIcon180Deg
            } ${expandAllCollapse && styles.activeIcon}`}
          />
          <span className={`${styles.innerText} `}>Expand All</span>
        </li>
        <li onClick={() => handleToOpenCommentTray(id)}>
          <FontAwesomeIcon
            icon={commentsCount ? faMessageDotsSolid : faMessageDotsLight}
            className={`${styles.innerIcon} ${
              commentsCount && styles.activeIcon
            }`}
          />
          <span className={`${styles.innerText} `}>{commentsCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default SubHeader;

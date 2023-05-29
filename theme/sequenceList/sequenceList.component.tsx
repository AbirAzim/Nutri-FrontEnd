import React from "react";
import { BsArrowRight } from "react-icons/bs";
import styles from "./sequenceList.module.scss";

interface SequenceListInterface {
  sequenceList: string[];
  listTitle: string;
}

const SequenceList = ({
  sequenceList,
  listTitle,
}: SequenceListInterface) => {
  return (
    <div className={styles.mainContainer}>
      <h3 className={styles.mainContainer__heading}>{listTitle}</h3>
      {sequenceList.map((tip, index) => (
        <div className={styles.mainContainer__tipDiv} key={tip}>
          <span className={styles.mainContainer__tipDiv__indexValue}>
            {index}
          </span>

          <div className={styles.mainContainer__tipDiv__itm}>
            {tip}
          </div>
        </div>
      ))}

      <div className={styles.mainContainer__moreTips}>
        more Tips
        <span>
          <BsArrowRight />
        </span>
      </div>
    </div>
  );
};

export default SequenceList;

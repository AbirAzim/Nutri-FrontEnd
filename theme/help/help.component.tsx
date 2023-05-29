import React from "react";
import AContainer from "../../containers/A.container";
import styles from "./help.module.scss";
import Card from "./card/cards.component";
import HelpBox from "./rightHelpBox/helpBox.component";

const Help = () => {
  return (
    <AContainer>
      <div className={styles.mainDiv}>
        <div className={styles.contentCard}>
          <div className={styles.leftDiv}>
            <h2>Frequently Asked Question</h2>
            <Card />
          </div>
          <div className={styles.rightDiv}>
            <HelpBox />
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default Help;

import React from "react";
import styles from "./membership.module.scss";
import Image from "next/image";
import Card from "./Card/Card.component";

const Membership = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentDiv}>
        <div className={styles.headerIcon}>
          <div>
            <Image
              src="/images/logo.png"
              alt="logo will soon load"
              layout={"fill"}
              // height={400}
              // width={400}
              objectFit={"contain"}
              quality={100}
            />
          </div>
        </div>
        <div className={styles.membershipDiv}>
          <Card>Free</Card>
          <Card>Supporter</Card>
          <Card>Founder</Card>
        </div>
      </div>
    </div>
  );
};

export default Membership;

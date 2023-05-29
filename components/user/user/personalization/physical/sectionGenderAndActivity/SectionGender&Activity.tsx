/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./SectionGenderAndActivity.module.scss";
import capitalizeFirstLetter from "../../../../../utility/capitalizeFirstLetter";

type SectionGenderAndActivityProps = {
  body: { icon: string; label: string }[];
  fieldName: string;
  updateUserProfile: Function;
  userProfile: any;
};

const SectionGenderAndActivity = ({
  body = [],
  fieldName,
  updateUserProfile,
  userProfile,
}: SectionGenderAndActivityProps) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageContainer__innerDiv}>
        {body.length
          ? body?.map((item, index) => {
              return (
                <div
                  className={styles.imageContainer__innerDiv__elem}
                  key={index}
                >
                  <div
                    className={`${styles.singleImage} ${
                      item?.label === userProfile[fieldName]
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => updateUserProfile(fieldName, item?.label)}
                  >
                    <div className={styles.imageBox}>
                      <img src={item?.icon} alt="icon" />
                      <p> {capitalizeFirstLetter(item?.label)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SectionGenderAndActivity;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./DietarSection.module.scss";
import capitalizeFirstLetter from "../../../../../utility/capitalizeFirstLetter";

type SectionWithIconProps = {
  title: string;
  body: { icon: string; label: string }[];
  fieldName: string;
  updateUserProfile: Function;
  userProfile: any;
  alredyExist?: (value: string, fieldName: string) => boolean;
};

const DietarySection = ({
  title = "",
  body = [],
  fieldName,
  updateUserProfile,
  userProfile,
  alredyExist,
}: SectionWithIconProps) => {
  return (
    <div className={styles.sectionWithIconContainer}>
      <p>{title}</p>
      <div className={styles.imageContainer}>
        {body.length
          ? body?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.singleImage} ${
                    alredyExist
                      ? alredyExist(item?.label?.toLowerCase(), "allergies")
                        ? styles.active
                        : ""
                      : item?.label?.toLowerCase() ===
                        userProfile[fieldName]?.toLowerCase()
                      ? styles.active
                      : ""
                  }`}
                  onClick={() =>
                    updateUserProfile(fieldName, item?.label?.toLowerCase())
                  }
                >
                  <div className={styles.imageBox}>
                    <img src={item?.icon} alt="icon" />
                    <p> {capitalizeFirstLetter(item?.label)}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DietarySection;

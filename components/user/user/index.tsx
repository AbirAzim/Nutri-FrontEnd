import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./User.module.scss";
import SideBar from "./sidebar/SideBar";
import Main from "./main/Main";
import { useAppSelector } from "../../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-regular-svg-icons";

const User = () => {
  const [userData, setUserData] = useState({
    about: {
      bio: "",
      image: "",
      firstName: "",
      lastName: "",
      displayName: "",
      yourBlender: "",
      email: "",
      location: "",
    },
    membership: {
      plan: "free",
    },
    notification: {
      platform: {
        newsAndEvents: [],
        blending101Offers: [],
      },
      topicDigest: {
        recommendations: [],
        sharedwithYou: [],
      },
    },
    personalization: {
      activity: "",
      age: {
        months: null,
        quantity: null,
        years: null,
      },
      allergies: [],
      dieteryLifeStyle: "",
      gender: "",
      heightInCentimeters: null,
      weightInKilograms: null,
      meditcation: [],
      preExistingMedicalConditions: [],
      whyBlending: [],
      pregnantOrLactating: null,
    },
  });

  const { dbUser } = useAppSelector((state) => state?.user);

  useEffect(() => {
    if (dbUser?.configuration) {
      const {
        bio,
        displayName,
        email,
        firstName,
        location,
        yourBlender,
        image,
        lastName,
        configuration,
      } = dbUser;

      const {
        activity,
        age,
        allergies,
        dieteryLifeStyle,
        gender,
        heightInCentimeters,
        weightInKilograms,
        meditcation,
        preExistingMedicalConditions,
        whyBlending,
        pregnantOrLactating,
      } = configuration;

      setUserData({
        ...userData,
        about: {
          ...userData?.about,
          bio: bio || "",
          image,
          firstName,
          lastName,
          displayName,
          email,
          location,
          yourBlender,
        },
        personalization: {
          ...userData?.personalization,
          activity,
          age: {
            quantity: age?.quantity,
            months: age?.months,
            years: age?.years,
          },
          allergies: allergies || [],
          dieteryLifeStyle,
          gender,
          heightInCentimeters,
          weightInKilograms,
          meditcation: meditcation || [],
          preExistingMedicalConditions: preExistingMedicalConditions || [],
          whyBlending: whyBlending || [],
          pregnantOrLactating,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser?._id]);

  return (
    <AContainer
      headerTitle="My Profile"
      logo={false}
      headerIcon={
        <FontAwesomeIcon icon={faUser} color="#7dbd3b" fontSize={20} />
      }
    >
      <header className={styles.header}>
        <div className={styles.header__banner}>
          <h2>Blending 101</h2>
          <p>Where you learn to blend life into a life style</p>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.container__div}>
          <div className={styles.container__div__left}>
            <div className={styles.sideBar}>
              <SideBar userData={userData} setUserData={setUserData} />
            </div>
          </div>
          <div className={styles.container__div__right}>
            <div className={styles.main}>
              <Main userData={userData} setUserData={setUserData} />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default User;

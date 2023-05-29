/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import About from "../about/AboutUser";
import Membership from "../membership/Membership";
import Notification from "../notification/Notification";
import Personalization from "../personalization/Personalization";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useMutation } from "@apollo/client";
import EDIT_CONFIGRATION_BY_ID from "../../../../gqlLib/user/mutations/editCofigrationById";
import EDIT_USER_BY_ID from "../../../../gqlLib/user/mutations/editUserById";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import imageUploadS3 from "../../../utility/imageUploadS3";
import {
  setDbUser,
  setIsNewUseImage,
} from "../../../../redux/slices/userSlice";
import notification from "../../../utility/reactToastifyNotification";
import ButtonComponent from "../../../../theme/button/button.component";
import { useRouter } from "next/router";
import HeadTagInfo from "../../../../theme/headTagInfo";

const tab = ["About", "Membership", "Notification", "Personalization"];

type MainProps = {
  userData: any;
  setUserData: any;
};

const Main = ({ userData, setUserData }: MainProps) => {
  const router = useRouter();
  const { type } = router.query;
  const [activeTab, setActiveTab] = useState(type);

  useEffect(() => {
    tab?.forEach((itm) => {
      if (itm.toLowerCase() === type) {
        setActiveTab(itm);
      }
    });
  }, []);

  useEffect(() => {
    if (!type) return;
    setActiveTab(type);
  }, [type]);

  useEffect(() => {
    if (!activeTab) return;
    router.push(`user/?type=${activeTab}`);
  }, [activeTab]);

  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const [editUserData] = useMutation(EDIT_CONFIGRATION_BY_ID);
  const [editUserById] = useMutation(EDIT_USER_BY_ID);
  const { configuration } = dbUser;
  const { isNewUseImage } = useAppSelector((state) => state?.user);
  const [toggle, setToggle] = useState(0);
  const [colorToggle, setColorToggle] = useState(false);
  const [profileActiveTab, setProfileActiveTab] = useState(0);

  const submitData = async () => {
    dispatch(setLoading(true));

    try {
      if (isNewUseImage?.length) {
        const res = await imageUploadS3(isNewUseImage);
        const imageURL = res?.[0];
        setUserData((pre) => {
          return {
            ...pre,
            about: {
              ...pre.about,
              image: imageURL,
            },
          };
        });

        await editUserById({
          variables: {
            data: {
              editId: dbUser._id,
              editableObject: { ...userData?.about, image: imageURL },
            },
          },
        });

        await editUserData({
          variables: {
            data: {
              editId: configuration?._id,
              editableObject: userData?.personalization,
            },
          },
        });

        dispatch(
          setDbUser({
            ...dbUser,
            ...userData?.about,
            image: imageURL,
            configuration: {
              ...dbUser?.configuration,
              ...userData?.personalization,
            },
          }),
        );
        dispatch(setLoading(false));

        dispatch(setIsNewUseImage(null));

        notification("info", "your profile updated successfully");
      } else {
        await editUserById({
          variables: {
            data: {
              editId: dbUser._id,
              editableObject: { ...userData?.about },
            },
          },
        });

        await editUserData({
          variables: {
            data: {
              editId: configuration?._id,
              editableObject: userData?.personalization,
            },
          },
        });

        dispatch(
          setDbUser({
            ...dbUser,
            ...userData?.about,
            configuration: {
              ...dbUser?.configuration,
              ...userData?.personalization,
            },
          }),
        );
        dispatch(setLoading(false));
        notification("info", "Updated successfully");
        setColorToggle(true);
      }
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  const renderUI = () => {
    switch (activeTab) {
      case "about":
        return <About userData={userData} setUserData={setUserData} />;
      case "membership":
        return (
          <Membership
            colorToggle={colorToggle}
            setColorToggle={setColorToggle}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "notification":
        return <Notification userData={userData} setUserData={setUserData} />;
      case "personalization":
        return (
          <Personalization
            userData={userData}
            setUserData={setUserData}
            toggle={toggle}
            setToggle={setToggle}
            setProfileActiveTab={setProfileActiveTab}
            profileActiveTab={profileActiveTab}
          />
        );

      default:
        return <About userData={userData} setUserData={setUserData} />;
    }
  };

  useEffect(() => {
    setColorToggle(false);
  }, [activeTab, toggle, profileActiveTab]);

  return (
    <div className={styles.mainContainer}>
      <HeadTagInfo
        description={`user profile (${activeTab})`}
        title={`User profile (${activeTab})`}
      />
      <header className={styles.header}>
        {tab?.map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`${styles.text} ${
                activeTab === item.toLowerCase() ? styles.active : ""
              }`}
            >
              {item}
            </p>
          );
        })}
      </header>
      {renderUI()}
      {activeTab === "personalization" && toggle === 0 ? null : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <ButtonComponent
            type="primary"
            value="Update Profile"
            style={{
              borderRadius: "30px",
              height: "48px",
              width: "180px",
            }}
            onClick={submitData}
          />
        </div>
      )}
    </div>
  );
};

export default Main;

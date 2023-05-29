import React, { useState, useEffect } from "react";
import Table from "../../../../theme/table/Table";
import styles from "./Notification.module.scss";

type NofificationProps = {
  userData: any;
  setUserData: any;
};

const Nofification = ({ userData, setUserData }: NofificationProps) => {
  const { platform, topicDigest } = userData?.notification;
  const [platformOptions, setPlatformOptions] = useState(platform);
  const [topicDigestOptions, setTopicDigestOptions] = useState(topicDigest);
  const handleCheck = (pre: any, val: any) => {
    if (pre) {
      return [...pre, val];
    } else {
      return [val];
    }
  };

  const handlePlatformOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e?.target;

    if (checked) {
      setPlatformOptions((pre) => ({
        ...pre,
        [name]: handleCheck(pre[name], value),
      }));
    } else {
      setPlatformOptions((pre) => ({
        ...pre,
        [name]: pre[name]?.filter((item) => item !== value),
      }));
    }
  };
  const handleTopicDigestOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e?.target;
    if (checked) {
      setTopicDigestOptions((pre) => ({
        ...pre,
        [name]: handleCheck(pre[name], value),
      }));
    } else {
      setTopicDigestOptions((pre) => ({
        ...pre,
        [name]: pre[name]?.filter((item) => item !== value),
      }));
    }
  };

  useEffect(() => {
    setUserData((pre) => ({
      ...pre,
      notification: {
        ...pre?.notification,
        platform: platformOptions,
        topicDigest: topicDigestOptions,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformOptions, topicDigestOptions]);

  const sectionOneData = [
    {
      platform: "News and events",
      phone: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="phone"
            name="newsAndEvents"
            onChange={(e) => handlePlatformOptions(e)}
            // checked={
            //   platformOptions?.newsAndEvents?.includes("phone") ? true : false
            // }
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
      email: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="email"
            name="newsAndEvents"
            onChange={(e) => handlePlatformOptions(e)}
            // checked={
            //   platformOptions?.newsAndEvents?.includes("email") ? true : false
            // }
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
    },
    {
      platform: "Blending 101 offers",
      phone: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="phone"
            name="blending101Offers"
            onChange={(e) => handlePlatformOptions(e)}
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
      email: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="email"
            name="blending101Offers"
            onChange={(e) => handlePlatformOptions(e)}
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
    },
  ];
  const sectionTwoData = [
    {
      topicDigest: "Recommendations",
      phone: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="phone"
            name="recommendations"
            onChange={(e) => handleTopicDigestOptions(e)}
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
      email: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="email"
            name="recommendations"
            onChange={(e) => handleTopicDigestOptions(e)}
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
    },
    {
      topicDigest: "Shared with you",
      phone: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="phone"
            name="sharedwithYou"
            onChange={(e) => handleTopicDigestOptions(e)}
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
      email: (
        <label className={styles.checkbxWrap}>
          <input
            type="checkbox"
            value="email"
            name="sharedwithYou"
            onChange={(e) => handleTopicDigestOptions(e)}
          />{" "}
          <span className={styles.checkmark}></span>
        </label>
      ),
    },
  ];

  const sectionOneColumn = [
    {
      Header: "Platform",
      accessor: "platform", // accessor is the "key" in the data
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
  ];
  const sectionTwoColumn = [
    {
      Header: "Topic Digest",
      accessor: "topicDigest", // accessor is the "key" in the data
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
  ];

  return (
    <>
      <div style={{ paddingBottom: "40px" }}>
        <Table data={sectionOneData} columns={sectionOneColumn} />
      </div>
      <Table data={sectionTwoData} columns={sectionTwoColumn} />
    </>
  );
};

export default Nofification;

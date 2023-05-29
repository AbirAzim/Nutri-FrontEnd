/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ToggleMenu from "../../../../theme/toggleMenu/ToggleMenu";
import styles from "./Membership.module.scss";
import Plan from "./plan/Plan";
import Transactions from "./transactions/Transactions";

type MembershipProps = {
  userData: any;
  setUserData: any;
  colorToggle: any;
  setColorToggle: any;
};

const Membership = ({
  userData,
  setUserData,
  colorToggle,
  setColorToggle,
}: MembershipProps) => {
  const [toggle, setToggle] = useState(0);
  const { plan } = userData?.membership;

  const handleChange = (name, value) => {
    setUserData((pre) => {
      return {
        ...pre,
        membership: {
          ...pre.membership,
          [name]: value,
        },
      };
    });
    setColorToggle(true);
  };

  useEffect(() => {
    setColorToggle(false);
  }, [toggle]);

  const renderUI = () => {
    switch (toggle) {
      case 0:
        return <Plan plan={plan} handleChange={handleChange} />;
      case 1:
        return <Transactions />;

      default:
        return <Plan plan={plan} handleChange={handleChange} />;
    }
  };

  return (
    <>
      <ToggleMenu
        setToggle={setToggle}
        toggle={toggle}
        toggleMenuList={["Plan", "Transactions"]}
        maxWidth={{ maxWidth: "320px" }}
      />

      <div className={styles.userPlan}>{renderUI()}</div>
    </>
  );
};

export default Membership;

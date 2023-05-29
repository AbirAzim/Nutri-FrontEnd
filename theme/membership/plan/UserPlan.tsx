import React from "react";
import ButtonComponent from "../../button/button.component";
import styles from "./UserPlan.module.scss";

const userPlan = [
  {
    label: "Free",
    value: "free",
    amount: 0,
  },
  {
    label: "Supporter",
    value: "supporter",
    amount: 5,
  },
  {
    label: "Founder",
    value: "founder",
    amount: 14,
  },
];

type UserPlanProps = {
  label: string;
  value: string;
  amount: number;
  plan: string;
  handleChange: (name: string, value: string) => void;
};

const UserPlan = ({
  plan,
  handleChange,
  label,
  value,
  amount,
}: UserPlanProps) => {
  return (
    <div
      className={`${styles.userPlanContainer} ${
        value === plan ? styles.active : ""
      }`}
      onClick={() => handleChange("plan", value)}
    >
      <p className={styles.planTitle}>{label}</p>
      <p className={styles.planSubtitle}>Ullamco laboris nisi ut</p>
      <strong>
        ${amount} <small>/mo</small>
      </strong>
      <div className={styles.btnContainer}>
        <ButtonComponent
          type={value === plan ? "primary" : "transparent"}
          value="Current Plan"
          style={{
            borderRadius: "20px",
            height: "40px",
            width: "140px",
            fontSize: "11px",
          }}
        />
      </div>
      <ul>
        <li>Free access to all Blending 101 standard features.</li>
      </ul>
    </div>
  );
};

export default UserPlan;

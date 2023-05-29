import styles from "./plan.module.scss";
import React from "react";
import ButtonComponent from "../../../../../theme/button/button.component";
import UserPlan from "../../../../../theme/membership/plan/UserPlan";

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
  plan: string;
  handleChange: (name: string, value: string) => void;
};

const Plan = ({ plan, handleChange }: UserPlanProps) => {
  return (
    <div>
      <div className={styles.mainContainer}>
        {userPlan?.map((item, index) => {
          const { label, value, amount } = item;
          return (
            <div className={styles.mainContainer__div} key={index}>
              <UserPlan
                plan={plan}
                handleChange={handleChange}
                label={label}
                value={value}
                amount={amount}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plan;

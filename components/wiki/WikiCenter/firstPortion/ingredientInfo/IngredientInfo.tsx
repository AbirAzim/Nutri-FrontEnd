import React from "react";
import s from "./IngredientInfo.module.scss";

interface Props {
  amount?: number;
  text?: string;
  borderRight?: boolean;
}

const IngredientInfo = ({
  amount = 21,
  text = "Research",
  borderRight = false,
}: Props) => {
  return (
    <div
      className={`${s.ingredientInfoContainer} ${
        borderRight ? s.borderRight : ""
      }`}
    >
      <h2 className={s.amount}>{amount}</h2>
      <p className={s.text}>{text}</p>
    </div>
  );
};

export default IngredientInfo;

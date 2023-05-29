import React from "react";
import s from "./CheckIcon.module.scss";
import CheckCircle from "../../public/icons/check_circle_black_24dp.svg";

interface Props {
  style?: React.CSSProperties;
}

const CheckIcon = ({ style }: Props) => {
  return (
    <div style={style}>
      <CheckCircle className={s.ticked} />
    </div>
  );
};

export default CheckIcon;

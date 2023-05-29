/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styles from "./styledCheckbox.module.scss";

interface StyledCheckboxInterface {
  checkedStatus?: boolean;
  onClickFunc?: any;
}
const StyledCheckbox = ({
  checkedStatus,
  onClickFunc,
}: StyledCheckboxInterface) => {
  useEffect(() => {
    if (!checkedStatus) return;
    setCheck(checkedStatus);
  }, []);

  const [check, setCheck] = useState(false);
  const handleCheck = () => {
    const elem = document.getElementById("checkboxInput");
    elem?.click();
    // @ts-ignore
    setCheck(!check);
    onClickFunc && onClickFunc();
  };

  return (
    <div className={styles.mainContainer}>
      <input
        type="checkbox"
        hidden
        id={"checkboxInput"}
        checked={check}
        onChange={() => {}}
      />
      <div
        className={styles.mainContainer__checkbox}
        onClick={handleCheck}
      >
        <div
          className={styles.mainContainer__checkbox__visibleSelector}
          style={check ? { display: "block" } : {}}
        />
      </div>
    </div>
  );
};

export default StyledCheckbox;

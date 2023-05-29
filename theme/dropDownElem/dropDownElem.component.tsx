/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsCaretDown } from "react-icons/bs";
import styles from "./dropDownElem.module.scss";

const DropDownElem = () => {
  const elemList = ["Wholefood", "Softy", "Ice-Cream"];
  const [toggleList, setToggleList] = useState(false);
  const [selectedElem, setSelectedElem] = useState("");

  useEffect(() => {
    setSelectedElem(elemList[0]);
  }, []);
  
  const handleSelectElement=(elemName: React.SetStateAction<string>)=>{
    setSelectedElem(elemName);
    setToggleList(false);
  }

  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__selectedFeild}
        onClick={() => setToggleList(!toggleList)}
      >
        <span>{selectedElem}</span>
        <BsCaretDown className={styles.icon} />
      </div>
      <div
        className={styles.optionList}
        style={
          toggleList ? { maxHeight: "1000px" } : { maxHeight: "0px" }
        }
      >
        {elemList.map((elem) => (
          <span key={`${elem}`} onClick={()=>handleSelectElement(elem)}>{elem}</span>
        ))}
      </div>
    </div>
  );
};

export default DropDownElem;

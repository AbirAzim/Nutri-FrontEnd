/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./dropDownElem.module.scss";
import { BsCaretDown } from "react-icons/bs";
import Image from "next/image";

interface DropDownElemSettingInterface {
  iconBool?: boolean;
}
const DropDownElemSetting = ({
  iconBool,
}: DropDownElemSettingInterface) => {
  const elemList = ["Priority", "Softy", "Ice-Cream"];
  const [toggleList, setToggleList] = useState(false);
  const [selectedElem, setSelectedElem] = useState("");

  useEffect(() => {
    setSelectedElem(elemList[0]);
  }, []);

  const handleSelectElement = (
    elemName: React.SetStateAction<string>
  ) => {
    setSelectedElem(elemName);
    setToggleList(false);
  };
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.mainContainer__selectedFeild}
        onClick={() => setToggleList(!toggleList)}
        style={iconBool ? { marginLeft: "30px" } : {}}
      >
        <span>{selectedElem}</span>
        <BsCaretDown className={styles.icon} />
      </div>
      <div
        className={styles.optionList}
        style={
          toggleList
            ? { maxHeight: "1000px" }
            : { maxHeight: "0px", border: "none" }
        }
      >
        {elemList.map((elem) => (
          <span
            key={`${elem}`}
            onClick={() => handleSelectElement(elem)}
          >
            {elem}
          </span>
        ))}
      </div>

      {iconBool && (
        <div className={styles.imageDiv}>
          <div className={styles.imageDiv__rel}>
            <Image
              src={"/images/5.jpeg"}
              alt={""}
              objectFit={"fill"}
              layout={"fill"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownElemSetting;

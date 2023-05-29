import React, { useEffect, useState } from "react";
import InputGoal from "../../user/user/personalization/physical/dailyIntake/inputGoal/inputGoal.component";
import AccordianElement from "./accordianElement/accordianElement.component";
import styles from "./dailyIntakeAccordian.module.scss";

interface dailyIntakeAccordian {
  recursiveObject?: object;
  inputValue?: object;
  setInputValue?: any;
  checkMacrosPercentage?: (agr: any[]) => number;
}

const DailyIntakeAccordian = ({
  recursiveObject,
  inputValue,
  setInputValue,
  checkMacrosPercentage = () => null,
}: dailyIntakeAccordian) => {
  return (
    <>
      {recursiveObject &&
        Object?.entries(recursiveObject)?.map((elem, i) => {
          if (elem[0] !== "__typename") {
            return (
              <AccordianElement
                key={`${elem[0]}` + i}
                inputValue={inputValue}
                setInputValue={setInputValue}
                title={elem[0] === "Energy" ? "Macros" : elem[0]}
                data={elem[1]}
                checkMacrosPercentage={checkMacrosPercentage}
              />
            );
          }
        })}
    </>
  );
};

export default DailyIntakeAccordian;

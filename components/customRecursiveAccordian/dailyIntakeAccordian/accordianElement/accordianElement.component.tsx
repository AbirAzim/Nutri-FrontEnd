import React, { useEffect, useRef, useState } from "react";
import InputGoal from "../../../user/user/personalization/physical/dailyIntake/inputGoal/inputGoal.component";
import styles from "./accordianElement.module.scss";
import { FiInfo } from "react-icons/fi";
import { GiGolfFlag } from "react-icons/gi";

interface AccordianElementInterface {
  title?: string;
  data: object;
  inputValue?: any;
  setInputValue?: any;
  children?: any;
  checkMacrosPercentage?: (agr: any[]) => number;
}
const AccordianElement = ({
  title,
  data,
  inputValue,
  setInputValue,
  children,
  checkMacrosPercentage = () => null,
}: AccordianElementInterface) => {
  const [collapseAccordian, setCollapseAccordian] = useState(true);

  const accordianRef = useRef();
  const handleAccordianClick = () => {
    setCollapseAccordian(!collapseAccordian);
  };

  const percentage = checkMacrosPercentage(
    Object?.values(inputValue?.goals) || [],
  );

  useEffect(() => {
    if (collapseAccordian === false) {
      //@ts-ignore
      accordianRef.current.style.maxHeight = "0px";
    } else {
      //@ts-ignore
      accordianRef.current.style.maxHeight =
        //@ts-ignore
        accordianRef.current.scrollHeight + "px";
    }
  }, [collapseAccordian]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    mainData: any,
  ) => {
    const { name, value } = e?.target;
    const blendNutrientId = mainData.blendNutrientRef;
    const calorieGram = mainData?.calorieGram;

    setInputValue((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        [blendNutrientId]: {
          ...prev.goals[blendNutrientId],
          [name]: parseFloat(value),
          dri:
            (parseFloat(prev?.calories?.dri) *
              parseFloat(`${parseFloat(value) / 100}`)) /
              parseFloat(calorieGram) || 0,
        },
      },
    }));
  };

  const populateAccordianData = (dataElem) => {
    if (!dataElem) return null;

    return (
      dataElem &&
      Object?.entries(data)?.map((elem, index) => {
        const mainData = elem[1];
        if (mainData?.data?.value) {
          return (
            <div
              key={`${mainData?.blendNutrientRef}` + `${index}`}
              className={styles.accordianDiv__tray}
            >
              <div className={styles.accordianDiv__tray__left}>
                {mainData?.nutrientName}
              </div>
              {title === "Macros" ? (
                <div className={styles.accordianDiv__tray__centerGrid}>
                  {mainData?.showPercentage ? (
                    <div className={styles.leftSide}>
                      <InputGoal
                        style={{
                          borderColor:
                            percentage === 100 ? "#dfdfdf" : "#ED4337",
                        }}
                        name="percentage"
                        inputValue={
                          inputValue?.goals?.[mainData?.blendNutrientRef]
                            ?.percentage
                        }
                        setInputValue={(e) => handleInput(e, mainData)}
                      />
                      %
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div>
                    {`${Math.round(
                      inputValue?.goals?.[mainData?.blendNutrientRef]?.dri,
                    )}${mainData?.data?.units?.toLowerCase()} `}
                  </div>
                </div>
              ) : (
                <div className={styles.accordianDiv__tray__center}>
                  {`${parseFloat(mainData?.data?.value).toFixed(
                    0,
                  )}${mainData?.data?.units?.toLowerCase()} `}
                </div>
              )}

              <div className={styles.accordianDiv__tray__right}>
                <span className={styles.accordianDiv__tray__right__icon}>
                  {/* <GiGolfFlag /> */}
                </span>
                <InputGoal
                  name="goal"
                  inputValue={
                    inputValue?.goals?.[mainData?.blendNutrientRef]?.goal
                  }
                  setInputValue={(e) => handleInput(e, mainData)}
                />
                <span className={styles.accordianDiv__tray__right__icon}>
                  {/* <FiInfo /> */}
                </span>
              </div>
            </div>
          );
        }
      })
    );
  };

  return (
    <>
      <div className={styles.centerElement}>
        <div
          className={styles.centerElement__icon}
          onClick={handleAccordianClick}
        >
          {collapseAccordian ? "-" : "+"}
        </div>
        {title === "Macros" ? (
          <div className={styles.heading}>
            <h3 className={styles.mainHeading}>{title}</h3>
            {percentage === 100 ? null : (
              <p className={styles.errorText}>Macros should equal 100%</p>
            )}
            <div></div>
          </div>
        ) : (
          <h3 className={styles.centerElement__mainHeading}>{title}</h3>
        )}
      </div>
      <div className={styles.accordianDiv} ref={accordianRef}>
        {populateAccordianData(data)}
      </div>
    </>
  );
};

export default AccordianElement;

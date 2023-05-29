import React, { useEffect, useRef, useState } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import styles from "./updatedAccordion.module.scss";
import { useRouter } from "next/router";

type CustomAccordionProps = {
  title: string;
  type?: string;
  content?: any;
  children?: React.ReactNode;
  iconRight?: boolean;
  plusMinusIcon?: boolean;
  dataObject?: object;
  value?: number;
  percentage?: string;
  unit?: string;
  counter?: number;
  lastElement?: boolean;
  nutritionId?: string;
  servingSize?: number;
  sinngleIngQuintity?: number;
  showChildren?: boolean;
  disabled?: undefined | boolean;
  link?: undefined | null | string;
};

const AccordComponent = ({
  title,
  type,
  content,
  children,
  iconRight = false,
  plusMinusIcon = true,
  value,
  percentage,
  unit,
  counter = 1,
  lastElement,
  nutritionId = "",
  servingSize = 1,
  sinngleIngQuintity = 1,
  showChildren = false,
  disabled = undefined,
  link = undefined,
}: CustomAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const finalNutritionValue = Math?.round(
    (Math?.round(value) * counter * sinngleIngQuintity) / servingSize,
  );
  const handleClickNutration = (
    id: string,
    disabled: undefined | boolean = undefined,
    link: undefined | null | string = undefined,
  ) => {
    if (!disabled) {
      router?.push(`/wiki/Nutrient/${id}`);
    } else if (disabled && link) {
      const splitted = link?.split("Nutrient");
      const second = splitted[1];
      router?.push(`/wiki/Nutrient/${second}`);
    }
  };

  useEffect(() => {
    if (type === "mainHeading") {
      setExpanded(true);
    } else {
      setExpanded(showChildren);
    }
  }, [showChildren, type]);

  useEffect(() => {
    if (contentRef.current) {
      expanded
        ? (contentRef.current.style.maxHeight = `1000px`)
        : (contentRef.current.style.maxHeight = "0px");
    }
  }, [expanded, contentRef]);
  return (
    <div className={styles.accordion}>
      {!type ? (
        <div className={`${styles.accordionSummary}`}>
          {finalNutritionValue > 0 && (
            <div className={styles.accordionSummaryForNested}>
              {expanded ? (
                <BiMinus
                  className={styles.icon + " " + styles.iconCopy}
                  style={!plusMinusIcon && { visibility: "hidden" }}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                />
              ) : (
                <BsPlus
                  className={styles.icon + " " + styles.iconCopy}
                  style={!plusMinusIcon && { visibility: "hidden" }}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                />
              )}
              {lastElement ? (
                <div
                  className={styles.accordianContent}
                  style={{ border: "none" }}
                >
                  <div
                    className={
                      value && unit
                        ? styles.accordianContent__whiteCard
                        : styles.accordianContent__whiteCard_conditionalSubheading
                    }
                  >
                    <h5
                      className={`${styles.titleCopy} ${
                        disabled && !link ? "" : styles.active
                      }`}
                      onClick={() =>
                        handleClickNutration(nutritionId, disabled, link)
                      }
                    >
                      {title}
                    </h5>
                    {
                      <p
                        className={styles.valueUnit + " " + styles.alignCenter}
                      >
                        {`${finalNutritionValue}${unit?.toLowerCase()}`}
                      </p>
                    }
                  </div>

                  <p className={styles.valueUnit + " " + styles.percentage}>
                    {percentage || ""}
                  </p>
                </div>
              ) : (
                <div className={styles.accordianContent}>
                  <div
                    className={
                      value && unit
                        ? styles.accordianContent__whiteCard
                        : styles.accordianContent__whiteCard_conditionalSubheading
                    }
                  >
                    <h5
                      className={`${styles.titleCopy} ${
                        disabled && !link ? "" : styles.active
                      }`}
                      onClick={() =>
                        handleClickNutration(nutritionId, disabled, link)
                      }
                    >
                      {title}
                    </h5>
                    {
                      <p
                        className={styles.valueUnit + " " + styles.alignCenter}
                      >
                        {`${finalNutritionValue}${unit?.toLowerCase()}`}
                      </p>
                    }
                  </div>

                  <p className={styles.valueUnit + " " + styles.percentage}>
                    {percentage || ""}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={`${styles.accordionSummary}`}>
          <div className={styles.accordianMainHeading}>
            {expanded ? (
              <FiMinusSquare
                className={styles.icon + " " + styles.iconCopy}
                style={!plusMinusIcon && { visibility: "hidden" }}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            ) : (
              <FiPlusSquare
                className={styles.icon + " " + styles.iconCopy}
                style={!plusMinusIcon && { visibility: "hidden" }}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            )}
            <div className={styles.accordianContent}>
              <h5 className={styles.titleAccordianMainHeading}>{title}</h5>
              {value && unit && (
                <p className={styles.valueUnit + " " + styles.alignLeft}>
                  {/* {parseFloat(value).toFixed(1)} &nbsp; {unit} */}
                </p>
              )}
              <p className={styles.valueUnit + " " + styles.percentage}>
                {percentage || ""}
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        className={styles.accordianDetails}
        ref={contentRef as React.RefObject<HTMLDivElement>}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordComponent;

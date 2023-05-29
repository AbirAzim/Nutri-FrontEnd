import React from "react";
import ChevronLeftIcon from "../../../../public/icons/chevron_left_black_36dp.svg";
import ChevronRightIcon from "../../../../public/icons/chevron_right_black_36dp.svg";
import styles from "./SliderArrows.module.scss";

type SliderArrowsProps = {
  compareRecipeLength?: number;
  prevFunc: () => void;
  nextFunc: () => void;
  clickCount?: number;
};

const SliderArrows = ({
  compareRecipeLength,
  prevFunc,
  nextFunc,
  clickCount,
}: SliderArrowsProps) => {
  return (
    <>
      {compareRecipeLength ? (
        <div className={styles.customeArrowContainer}>
          <div></div>

          <div className={styles.customeArrowContainer__arrows}>
            <div
              className={styles.prev}
              onClick={prevFunc}
              style={
                clickCount <= 0 ? { display: "none" } : { marginRight: "auto" }
              }
            >
              <ChevronLeftIcon />
            </div>

            <div
              className={styles.next}
              onClick={nextFunc}
              style={
                clickCount >= compareRecipeLength - 2
                  ? { display: "none" }
                  : { marginLeft: "auto" }
              }
            >
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const PreviousButton = (prop) => {
  const { className, onClick } = prop;
  return (
    <div className={className + " " + styles.prev} onClick={onClick}>
      <ChevronLeftIcon />
    </div>
  );
};
export const NextButton = (prop) => {
  const { className, onClick } = prop;
  return (
    <div className={className + " " + styles.next} onClick={onClick}>
      <ChevronRightIcon />
    </div>
  );
};

export default SliderArrows;

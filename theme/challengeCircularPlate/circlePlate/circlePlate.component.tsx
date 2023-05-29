import React, { useEffect, useRef, useState } from "react";
import { elementArray } from "../staticData/staticDataPlate";
import styles from "./circlePlate.module.scss";
import ContentCard from "./contentCard/contentCard.component";

const CirclePlate = () => {
  const outerCircleRef: any = useRef(null);
  const innerCircleRef: any = useRef(null);
  const [heightOfCircularRing, setHeightOfCircularRing] = useState(0);
  const [heightOfOuterCircle, setHeightOfOuterCircle] = useState(0);
  const [heightOfInnerCircle, setHeightOfInnerCircle] = useState(0);
  const adjusterHeight = 0;
  useEffect(() => {
    if (!innerCircleRef || !outerCircleRef) return;
    setHeightOfCircularRing(heightOfInnerCircle / 2 + adjusterHeight);
  }, [heightOfInnerCircle, heightOfOuterCircle]);

  return (
    <div className={styles.mainContainer} ref={outerCircleRef}>
      <div className={styles.innerCircle} ref={innerCircleRef}>
        <ContentCard />
      </div>

      {heightOfCircularRing
        ? elementArray.map(
            ({ elem1, elem2, elem3, elem4 }, index) => {
              const angleOfDiversion = 360 / elementArray.length;
              const elemRotationValue = angleOfDiversion * index;
              return (
                <div
                  key={`${elem1},${elem2},${elem3},${elem4},${index},`}
                  className={styles.innerCircle__circleRingConnector}
                  style={{
                    height: `${heightOfCircularRing}px`,
                    transform: `rotate(${elemRotationValue}deg)`,
                  }}
                >
                  <li
                    style={{
                      transform: `rotate(-${elemRotationValue}deg)`,
                    }}
                  >
                    {elementArray.length}
                  </li>
                </div>
              );
            }
          )
        : null}
    </div>
  );
};

export default CirclePlate;

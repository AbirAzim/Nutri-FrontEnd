import React from "react";
import styles from "./daysAndDate.module.scss";

interface daysInterface {
  day: string;
  letter: string;
}

interface DaysAndDateTrayInterface {
  date: number;
  days: daysInterface[];
  setSelectedDate: any;
  firstDayOfMonth: number;
  numberOfDaysInMonth: number;
  dateHandler: any;
  onClose: any;
}
const DaysAndDateTray = ({
  date,
  days,
  setSelectedDate,
  firstDayOfMonth,
  numberOfDaysInMonth,
  dateHandler,
  onClose,
}: DaysAndDateTrayInterface) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.daysTray}>
        {days.map((dayElem, index) => (
          <div key={`${dayElem}${index}`}>{dayElem.letter}</div>
        ))}
      </div>
      <div className={styles.datesTray}>
        {[...Array(firstDayOfMonth)].map((elem, index) =>
          index < firstDayOfMonth - 1 ? <span key={`${index}`}></span> : null,
        )}
        {[...Array(numberOfDaysInMonth)].map((elem, index) => (
          <div
            key={`${index}`}
            style={
              index + 1 === date
                ? { backgroundColor: "#019688", color: "white" }
                : {}
            }
            onClick={() => {
              setSelectedDate(index + 1);
              dateHandler(index + 1);
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.mainContainer__actionTray}>
        <span>Set</span>
        <span>Today</span>
        <span onClick={onClose}>Close</span>
      </div>
    </div>
  );
};

export default DaysAndDateTray;

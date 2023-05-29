import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import styles from "./calendarTray.module.scss";
import DaysAndDateTray from "./daysAndDateTray/daysAndDateTray.component";

const CalendarTray = ({ handler, onClose }: any) => {
  // this array reflects the order in which days are considered when we get new Date()
  // sunday is represented by 0 and sat with 6
  const daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // this array reflects the order in which months are considered when we get new Date()
  // january is represented by 0 and december with 11
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novermber",
    "December",
  ];

  //days array is to ensure the sequence with which days appear.
  const days = [
    { day: "Monday", letter: "M" },
    { day: "Tuesday", letter: "T" },
    { day: "Wednesday", letter: "W" },
    { day: "Thursday", letter: "T" },
    { day: "Friday", letter: "F" },
    { day: "Saturday", letter: "S" },
    { day: "Sunday", letter: "S" },
  ];
  const dateData = new Date();
  const date = dateData.getDate();
  const month = dateData.getMonth();
  const year = dateData.getFullYear();

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const numberOfDaysInMonth = new Date(
    selectedYear,
    selectedMonthIndex + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedYear,
    selectedMonthIndex,
    1,
  ).getDay();

  const dateDataObject = new Date(
    selectedYear,
    selectedMonthIndex,
    selectedDate,
  );

  const dateHandler = (selectedDate) => {
    const date = `${selectedYear}-${selectedMonthIndex + 1 < 10 ? "0" : ""}${
      selectedMonthIndex + 1
    }-${selectedDate < 10 ? "0" : ""}${selectedDate}`;

    handler(date);
  };

  useEffect(() => {
    setSelectedDate(date);
    setSelectedMonthIndex(month);
    setSelectedYear(year);
  }, [date, month, year]);

  useEffect(() => {
    if (selectedDate > numberOfDaysInMonth) {
      setSelectedDate(numberOfDaysInMonth);
    }
  }, [numberOfDaysInMonth, selectedDate]);

  useEffect(() => {
    if (selectedMonthIndex > 11) {
      setSelectedMonthIndex(0);
      setSelectedYear(selectedYear + 1);
    }
    if (selectedMonthIndex < 0) {
      setSelectedMonthIndex(11);
      setSelectedYear(selectedYear - 1);
    }
  }, [selectedMonthIndex, selectedYear]);

  const handleArrowClick = (type: "+" | "-") => {
    if (type === "+") {
      setSelectedMonthIndex(selectedMonthIndex + 1);
    }
    if (type === "-") {
      setSelectedMonthIndex(selectedMonthIndex - 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__controllerTray}>
        <span>
          <BsChevronCompactLeft
            className={styles.icon + " " + styles.left}
            onClick={() => handleArrowClick("-")}
          />
        </span>
        <span className={styles.mainContainer__controllerTray__dateText}>
          {daysArray[dateDataObject.getDay()]}{" "}
          {monthArray[dateDataObject.getMonth()]} {dateDataObject.getDate()},{" "}
          {dateDataObject.getFullYear()}
        </span>
        <span>
          <BsChevronCompactRight
            className={styles.icon + " " + styles.right}
            onClick={() => handleArrowClick("+")}
          />
        </span>
      </div>
      <div className={styles.mainContainer__calendarContent}>
        <DaysAndDateTray
          numberOfDaysInMonth={numberOfDaysInMonth}
          firstDayOfMonth={firstDayOfMonth}
          days={days}
          date={selectedDate}
          setSelectedDate={setSelectedDate}
          dateHandler={dateHandler}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CalendarTray;

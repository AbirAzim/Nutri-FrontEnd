import React from "react";
import DatePicker from "react-datepicker";
import { isSameWeek, endOfWeek, startOfWeek } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface WeekPickerProps {
  element: React.ReactNode;
  week: {
    start: Date;
    end: Date;
  };
  onWeekChange: (startDate: Date, endDate: Date) => void;
}

const WeekPicker = (props: WeekPickerProps) => {
  const { element, week, onWeekChange } = props;

  return (
    <div id="week-picker">
      <DatePicker
        dayClassName={(date: Date) =>
          isSameWeek(date, week?.start || new Date())
            ? "react-datepicker__day--selected"
            : ""
        }
        closeOnScroll={(e) => e.target === document}
        selected={new Date()}
        onChange={(date) => onWeekChange(startOfWeek(date), endOfWeek(date))}
        customInput={element}
      />
    </div>
  );
};

export default WeekPicker;

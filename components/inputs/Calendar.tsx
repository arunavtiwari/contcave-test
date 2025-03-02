import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar as ReactDateRangeCalendar, DateRange } from 'react-date-range';

type Props = {
  value: Date;
  onChange: (value: Date) => void;
  disabledDates?: Date[];
  allowedDays?:any[];
};

function Calendar({ value, onChange, disabledDates, allowedDays }: Props) {
  const isDayDisabled = (value:Date) => {
     const days = ["mon","tue","wed","thu","fri","sat","sun"];
     if(allowedDays && allowedDays?.filter((item) => item).length) {
      let getDay = value.getDay();
      let startDayIndex = days.indexOf(allowedDays[0].toLowerCase().trim());
      let endDayIndex = days.indexOf(allowedDays[1].toLowerCase().trim());
      return getDay <startDayIndex+1 || getDay >endDayIndex+1;
     }
     return false; 
  }
  return (
    <ReactDateRangeCalendar
      date={value}
      onChange={(newDate) => onChange(newDate as Date)}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      disabledDay={(d)=>isDayDisabled(d)}
    />
  );
}

export default Calendar;

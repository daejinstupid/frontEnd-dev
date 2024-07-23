import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./ManagerReservationCalendar.css";
import { format, addWeeks, subMonths } from "date-fns";

registerLocale("ko", ko);

const ManagerReservationCalendar = ({
  selectedDate,
  onDateChange,
  minDate,
  maxDate,
  handleMonthChange,
}) => {
  return (
      <div className="DatePicker-Section">
        <DatePicker
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              className="ManagerDatePicker-header-section"
              style={{ width: 480 }}
            >
              <button
                className="ManagerDatePickerButton"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                style={{ marginRight: 50 }}
              >
                {"<"}
              </button>
              <span className="ManagerDatePickerText">
                {format(date, "MMMM", { locale: ko })}
              </span>
              <button
                className="ManagerDatePickerButton"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                style={{ marginLeft: 50 }}
              >
                {">"}
              </button>
            </div>
          )}
          minDate={minDate}
          maxDate={maxDate}
          locale={ko}
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="yyyy/MM/dd"
          inline
          onMonthChange={handleMonthChange}
          showDisabledMonthNavigation
        />
      </div>
  );
};

export default ManagerReservationCalendar;

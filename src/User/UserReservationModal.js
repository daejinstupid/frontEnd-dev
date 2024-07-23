import React, { useEffect, useState } from "react";
import "./UserReservationModal.css";
import { readReservationTime } from "../apis/UserReservation";

const UserReservationModal = ({
  isOpen,
  onSubmit,
  onClose,
  selectedDate,
  tableId,
}) => {
  const [selecteTime, setSelecteTime] = useState([]);
  const [modalSelectTime, setModalSelectTime] = useState([]);

  const handleSelectTime = (timeSelect) => {
    if (timeSelect.available === "Y") {
      setSelecteTime((prevSelecteTimes) => {
        const isSelected = prevSelecteTimes.some(
          (selectedTime) =>
            selectedTime.reserveStart === timeSelect.reserveStart
        );
        if (isSelected) {
          return prevSelecteTimes.filter(
            (selectedTime) =>
              selectedTime.reserveStart !== timeSelect.reserveStart
          );
        } else {
          return [...prevSelecteTimes, timeSelect];
        }
      });
    }
  };

  const formattedDate = selectedDate.toISOString().slice(0, 10).replace(/-/g, '');

  useEffect(() => {
    const fetchReservationTime = async () => {
      try {
        const response = await readReservationTime(formattedDate, tableId);

        if (response && response.data && Array.isArray(response.data.data)) {
          setModalSelectTime(response.data.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    if (isOpen) {
      fetchReservationTime();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(selecteTime);
  };

  return (
    <div className="user_reservation_modal">
      <div className="user_reservation_modal_form">
        <div className="user_reservation_modal_header">
          <h3>시간 선택하기</h3>
          <div className="user_reservation_modal_img">
            <img onClick={onClose} src="/assets/search-x.png" alt="Close" />
          </div>
        </div>
        <div className="user_reservation_modal_select_time">
          {modalSelectTime.map((timeSelect, index) => (
            <button
              key={index}
              disabled={timeSelect.available === "N"}
              onClick={() => handleSelectTime(timeSelect)}
              className={selecteTime.includes(timeSelect) ? "selected" : ""}
            >
              {timeSelect.reserveStart}
            </button>
          ))}
        </div>
        <div className="user_reservation_select_time_submit">
          <button onClick={handleSubmit}>시간 선택하기</button>
        </div>
      </div>
    </div>
  );
};

export default UserReservationModal;

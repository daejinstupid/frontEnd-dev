import React, { useEffect, useState } from "react";
import "./UserSearchFilterModal.css";
import Radio from "../Radio";

const UserSearchFilter = ({ isOpen, onFilterSubmit, onClose }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userStudy, setUserStudy] = useState("");
  const [preferSeat, setPreferSeat] = useState("");

  const handleTableTypeChange = (event) => {
    setPreferSeat(event.target.value);
  };

  const handleCafeStudyChange = (event) => {
    setUserStudy(event.target.value);
  };

  useEffect(() => {

  }, [userStudy, preferSeat]);

  const handleSubmit = () => {
    const filterData = {
      startTime,
      endTime,
      preferSeat,
    };
    onFilterSubmit(filterData);
    onClose(); // 모달을 닫습니다
  };
  useEffect(() => {
    setEndTime(startTime);
  }, [startTime]);
  if (!isOpen) return null;
  const hours = Array.from({ length: 25 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <usersearchfilter>
      <div className="search_filter">
        <div className="search_filter_form">
          <div className="search_filter_header">
            <button onClick={onClose}>
              <img src="/assets/search-x.png" />
            </button>
          </div>
          <div className="search_filter_first_header">
            <h4>카페 운영 시간</h4>
          </div>
          <div className="search_filter_first">
            <div className="search_filter_select">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div className="search_filter_time">
              <h5>시작 시간</h5> <h5>종료 시간</h5>
            </div>
          </div>
          <div className="search_filter_second">
            <div className="search_filter_second_header">
              <h4>카공 여부</h4>
            </div>
            <div
              className="search_filter_second_radio"
              onChange={handleCafeStudyChange}
            >
              <Radio
                className="user_filter_radio_btn"
                value={"N"}
                name="cafestudy"
                checked={userStudy === "N"}
                onChange={handleCafeStudyChange}
              >
                <p>불가능</p>
              </Radio>
              <Radio
                className="user_filter_radio_btn"
                name="cafestudy"
                value={"Y"}
                checked={userStudy === "Y"}
                onChange={handleCafeStudyChange}
              >
                <p>가능</p>
              </Radio>
            </div>
            <div className="search_filter_third_header">
              <h4>선호 좌석</h4>
            </div>
            <div className="search_filter_tird">
              <div
                className="search_filter_third_radio"
                onChange={handleTableTypeChange}
              >
                <Radio
                  className="search_filter_radio_btn"
                  name="preferSeat"
                  value={"M"}
                  checked={preferSeat === "M"}
                  onChange={handleTableTypeChange}
                >
                  <p>단체석</p>
                </Radio>
                <Radio
                  className="search_filter_radio_btn"
                  name="preferSeat"
                  value={"F"}
                  checked={preferSeat === "F"}
                  onChange={handleTableTypeChange}
                >
                  <p>4인석</p>
                </Radio>
                <Radio
                  className="search_filter_radio_btn"
                  name="preferSeat"
                  value={"T"}
                  checked={preferSeat === "T"}
                  onChange={handleTableTypeChange}
                >
                  <p>2인석</p>
                </Radio>
                <Radio
                  className="search_filter_radio_btn"
                  name="preferSeat"
                  value={"O"}
                  checked={preferSeat === "O"}
                  onChange={handleTableTypeChange}
                >
                  <p>1인석</p>
                </Radio>
              </div>
              <div className="search_filter_submit">
                <button onClick={handleSubmit}>적용하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </usersearchfilter>
  );
};
export default UserSearchFilter;

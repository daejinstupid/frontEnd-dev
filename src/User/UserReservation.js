import { useEffect, useState } from "react";
import Radio from "../Radio";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import addDays from "date-fns/addDays";
import { createReservation, readTableList } from "../apis/UserReservation";
import { startOfWeek, endOfWeek, addWeeks, isWithinInterval } from "date-fns";
import "./UserReservation.css";
import UserNav from "./UserNav";
import Footer from "../Footer";
import UserReservationModal from "./UserReservationModal";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserReservation = () => {
  const [showTableOptions, setShowTableOptions] = useState(false);
  const [showSeatAndTimeOptions, setShowSeatAndTimeOptions] = useState(false);
  const [counter, setCounter] = useState(1);
  const [selectdate, setSelectDate] = useState(new Date());
  const [tableType, setTableType] = useState("onetable");
  const [selecteTime, setSelecteTime] = useState(null);
  const [tableNo, setTableNo] = useState("");
  const [tableId, setTableId] = useState(0);
  const [tableInfo, setTableInfo] = useState(null);
  const [minReservationId, setMinReservationId] = useState(null);
  const { cafeId } = useParams();
  const [isUserReservationModal, setIsUserReservationModal] = useState(false);
  const [formattedSelecteTime, setFormattedSelecteTime] = useState("");
  const handleSelectTimeModal = () => {
    setIsUserReservationModal(true);
  };

  const handleCloseSelectTimeModal = () => {
    setIsUserReservationModal(false);
  };

  useEffect(() => {
    setFormattedSelecteTime(""); // selecteTime이 비어있을 경우 초기화
    if (selecteTime && selecteTime.length > 0) {
      const timeString = selecteTime
        .map((time) => time.reserveStart)
        .join(", ");
      setFormattedSelecteTime(timeString);
    } else {
    }
  }, [selecteTime]);

  const handleSelectTimeSubmit = (selectedTimes) => {
    setSelecteTime(selectedTimes);
    handleCloseSelectTimeModal();
  };

  const onDateChange = (date) => {
    setSelectDate(date);
    setShowTableOptions(true);
  };

  const today = new Date();
  const nextWeek = addDays(today, 7);
  const handleTableTypeChange = (event) => {
    setTableType(event.target.value);
    setShowSeatAndTimeOptions(true);
  };

  useEffect(() => {
    const fetchTableInfo = async () => {
      try {
        const response = await readTableList(cafeId);
        setTableInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTableInfo();
  }, []);
  const navigate = useNavigate();
  const submitReservation = async () => {
    if (
      counter === 0 ||
      !selectdate ||
      !tableType ||
      !selecteTime ||
      !tableId
    ) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: "예약하기 위한 필요한 정보들을 입력해주세요.",
        Button: true,
        ButtonText: "확인",
      });
      return;
    }
    const reservationData = {
      tableId: parseInt(tableId),
      personCnt: counter,
      reserveDate: format(selectdate, "yyyy-MM-dd"),
      reserveTime: selecteTime.map((time) => ({
        reserveStart: time.reserveStart,
        reserveEnd: time.reserveEnd,
      })),
    };
    try {
      const response = await createReservation(reservationData);
      const newMinReservationId = Math.min(
        ...response.data.data.reservationIds
      );
      setMinReservationId(newMinReservationId);
      navigate(`/user/reservationstatus/${newMinReservationId}`);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (
      tableInfo &&
      tableInfo.data.tableInfo[tableType] &&
      tableInfo.data.tableInfo[tableType].length > 0
    ) {
      setTableId(tableInfo.data.tableInfo[tableType][0].tableId);
    }
  }, [tableInfo, tableType]);

  return (
    <userreservation>
      <UserNav />
      <div className="user_reservation_form">
        <div className="user_reservation_left">
          {tableInfo && tableInfo.data.cafeName ? (
            <h1>{tableInfo.data.cafeName}</h1>
          ) : (
            ""
          )}

          {/* 테스트 중 */}
          <div className="user_reservation_counter">
            <h5>인원</h5>
            <div className="user_reservation_counter_no">
              <button onClick={() => setCounter(counter > 0 ? counter - 1 : 0)}>
                -
              </button>
              <h5>{counter}</h5>
              <button onClick={() => setCounter(counter + 1)}>+</button>
            </div>
          </div>
          <div className="user_reservation_date">
            <h5>날짜</h5>
            <DatePicker
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="ManagerDatePicker-header-section">
                  <button
                    className="ManagerDatePickerButton"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
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
                  >
                    {">"}
                  </button>
                </div>
              )}
              minDate={today}
              maxDate={nextWeek}
              locale={ko}
              selected={selectdate}
              onChange={onDateChange}
              dateFormat="yyyy-MM-dd"
              filterDate={(date) => {
                const startOfThisWeek = startOfWeek(new Date(), {
                  weekStartsOn: 1,
                });
                const endOfNextWeek = endOfWeek(addWeeks(new Date(), 1), {
                  weekStartsOn: 1,
                });
                return isWithinInterval(date, {
                  start: startOfThisWeek,
                  end: endOfNextWeek,
                });
              }}
            />
          </div>
          {showTableOptions && (
            <div className="user_reservation_radio">
              <h5>테이블 예약</h5>
              <div
                className="user_reservation_radio_button"
                onChange={handleTableTypeChange}
              >
                <Radio
                  className="user_reservation_radio_btn"
                  name="tableType"
                  value="M"
                  checked={tableType === "multitable"}
                  onChange={handleTableTypeChange}
                >
                  <p>단체석</p>
                </Radio>
                <Radio
                  className="user_reservation_radio_btn"
                  name="tableType"
                  value="F"
                  checked={tableType === "fourtable"}
                  onChange={handleTableTypeChange}
                >
                  <p>4인석</p>
                </Radio>
                <Radio
                  className="user_reservation_radio_btn"
                  name="tableType"
                  value="T"
                  checked={tableType === "twotable"}
                  onChange={handleTableTypeChange}
                >
                  <p>2인석</p>
                </Radio>
                <Radio
                  className="user_reservation_radio_btn"
                  name="tableType"
                  value="O"
                  checked={tableType === "onetable"}
                  onChange={handleTableTypeChange}
                >
                  <p>1인석</p>
                </Radio>
              </div>
            </div>
          )}
          {showSeatAndTimeOptions && (
            <div className="user_reservation_seatno">
              <h5>좌석 번호</h5>
              <select
                value={tableId}
                onChange={(e) => setTableId(parseInt(e.target.value))}
              >
                {tableInfo &&
                  tableInfo.data.tableInfo[tableType] &&
                  tableInfo.data.tableInfo[tableType].map((table, index) => (
                    <option key={index} value={table.tableId}>
                      {table.tableNumber}
                    </option>
                  ))}
              </select>
              <button onClick={handleSelectTimeModal}> 시간 선택 </button>
            </div>
          )}
          <div className="user_reservation_time">
            <h5>예약 시간대</h5>
            <div className="user_reservation_time_p">
              <p>
                {selecteTime
                  ? selecteTime
                      .map((time, index) => (
                        <span key={index} className="time-choice">
                          {time.reserveStart}
                        </span>
                      ))
                      .reduce((acc, curr) => [...acc, curr], [])
                  : ""}
              </p>
            </div>
          </div>
          <Link
            to={
              minReservationId
                ? `/user/reservationstatus/${minReservationId}`
                : "#"
            }
          >
            <div className="user_reservation_submit">
              <button onClick={submitReservation}>예약하기</button>
            </div>
          </Link>
        </div>
        <div className="user_reservation_right">
          {tableInfo && tableInfo.data && tableInfo.data.studyImg ? (
            <img
              src={`data:image/;base64,${tableInfo.data.studyImg}`}
              alt="Study Table"
            />
          ) : (
            <div>Loading image...</div>
          )}
        </div>
      </div>
      <Footer />
      <UserReservationModal
        isOpen={isUserReservationModal}
        onClose={handleCloseSelectTimeModal}
        onSubmit={handleSelectTimeSubmit}
        selectedDate={selectdate}
        tableId={tableId}
      />
    </userreservation>
  );
};
export default UserReservation;

import React, { useEffect, useState } from "react";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./ManagerReservationList.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { addWeeks, subMonths, format } from "date-fns";
import Footer from "../Footer";
import ManagerNav from "./ManagerNav";
import ReactPaginate from "react-js-pagination";
import { managerReadCalendarReservation } from "./../apis/ManagerReservation";
import ManagerReservationCalendar from "./ManagerReservationCalendar";
import { PulseLoader } from "react-spinners";

registerLocale("ko", ko);

const ManagerReservationList = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const tableTypeToText = {
    O: "1인석",
    T: "2인석",
    F: "4인석",
    M: "다인석",
  };
  const tableStatusTypeToText = {
    A: "승인전",
    P: "승인완료",
    F: "종료",
  };

  useEffect(() => {
    fetchReservationsForDate(selectedDate);
  }, [selectedDate]);

  const getTableTypeText = (tableType) => {
    return tableTypeToText[tableType] || "알 수 없는 타입";
  };

  const getTableStatusText = (tableStatusType) => {
    return tableStatusTypeToText[tableStatusType] || "알 수 없는 타입";
  };

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReservationsForDate(selectedDate);
  }, [selectedDate]);

  const fetchReservationsForDate = async (date) => {
    setIsLoading(true);
    const formattedDate = format(date, "yyyyMMdd");
    try {
      const response = await managerReadCalendarReservation(formattedDate);
      if (response && response.data && response.data.data) {
        setReservations(response.data.data); // 예약 정보 배열을 상태로 설정
      }
    } catch (error) {
      console.error("예약 정보를 가져오는 중 오류 발생", error);
    } finally {
      setIsLoading(false);
    }
  };

  const minDate = subMonths(new Date(), 1); // 한 달 전
  const maxDate = addWeeks(new Date(), 1); // 일주일 후

  const [dateRange, setDateRange] = useState({
    minDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    maxDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
  });

  // 달력의 달이 변경될 때 호출됩니다.
  const handleMonthChange = (newMonth) => {
    // 새로운 달의 첫날과 마지막날을 계산합니다.
    setDateRange({
      minDate: new Date(newMonth.getFullYear(), newMonth.getMonth(), 1),
      maxDate: new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0),
    });
  };

  // const getListSectionClass = () => {
  //   return reservations.length === 0 ? 'ManagerReservationList-Container-List-Section hidden' : 'ManagerReservationList-Container-List-Section';
  // };
  return (
    <managerreservationlist>
      <ManagerNav />
      <div className="ManagerReservationList">
        <div className="ManagerReservationList-Container">

          <div className="ManagerReservationList-Container-Items">
            <div className="ManagerReservationList-Container-Date-Section">
              {/* 달력 섹션 */}
              <div className="ManagerReservationList-Container-Date">
                <div className="ManagerReservationList-Container-Date-Text">
                  <h2>날짜별 예약 확인</h2>
                </div>

                <div className="DatePicker-Section">
                  <ManagerReservationCalendar
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    handleMonthChange={handleMonthChange}
                  />
                </div>
              </div>

              <div className="ManagerReservationList-Container-List-Section">
                <h2>예약자 현황</h2>
                {isLoading ? (
                  <div className="Manager-res-spinner-container">
                    <PulseLoader
                      color="#929292"
                      margin={5}
                      size={15}
                      speedMultiplier={0.5}
                    />
                    <h4>예약 내역을 불러오는중</h4>
                  </div>
                ) : (
                  <>
                    <div className="ManagerReservationList-Container-List-OverFlow">
                      {reservations.length === 0 ? (
                        <div className="ReservationList-Status-No">
                          <p>해당 날짜에 예약내역이 없습니다</p>
                          <img src="/assets/search-X.png" alt="이미지" />
                        </div>
                      ) : (
                        <div className="ManagerReservationList-Container-List-items">
                          {paginate(reservations).map((reservation, index) => (
                            <div
                              key={index}
                              className="ReservationList-Section"
                            >
                              <div className="ReservationList-Status-items">
                                <div className="ReservationList-UserName">
                                  <h2>{reservation.userRealName}</h2>
                                </div>
                                <div className="ReservationList-Status">
                                  <div>
                                    <p>예약 좌석 : {reservation.tableNumber}</p>
                                    <p>
                                      예약 테이블 :{" "}
                                      {getTableTypeText(reservation.tableType)}
                                    </p>
                                  </div>
                                  <div>
                                    <p>인원 수 : {reservation.personCnt}</p>
                                    <p>
                                      예약 시간 : {reservation.reserveStart} ~{" "}
                                      {reservation.reserveEnd}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ReservationList-Status-Reservation">
                                <p className={`status-${reservation.status}`}>
                                  {getTableStatusText(reservation.status)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* ReactPaginate 컴포넌트 위치 변경 */}
                    {reservations.length !== 0 && (
                      <ReactPaginate
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={reservations.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                      />
                    )}
                  </>
                )}
              </div>

              <div ManagerReservationListc-Container-Date></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </managerreservationlist>
  );
};

export default ManagerReservationList;

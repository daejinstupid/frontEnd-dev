import "./UserMyReservationAfter.css";
import { Link } from "react-router-dom";
import "./UserMyReservationAfter.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-js-pagination";
import { reservationFinish } from "../apis/UserReservation";
import { PulseLoader } from "react-spinners";

const UserMyReservationAfter = () => {
  const [reservationAfter, setReservationAfter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [cancleReservationId, setCancleReservationId] = useState("");
  const [loading, setLoading] = useState(true);

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const reservationAfterInfo = async () => {
      try {
        setLoading(true);
        const response = await reservationFinish();
        setReservationAfter(response.data.data);
        setCancleReservationId(response.data.data.reservationIds);
      } catch (error) {
        console.error("error : ", error);
      } finally {
        setLoading(false);
      }
    };
    reservationAfterInfo();
  }, []);

  return (
    <usermyreservationafter>
      <div className="user_myReservation-container_after">
        {loading ? (
          <div className="user_reservation_loading">
            <p>예약 내역을 불러오는 중입니다</p>
            <PulseLoader color="#CCC" margin={5} speedMultiplier={0.8} />
          </div>
        ) : (
          <div className="user_page">
            {reservationAfter.length === 0 ? (
              <div className="user_reservation_no_exist">
                예약 현황이 없습니다.
              </div>
            ) : (
              <>
                {paginate(reservationAfter).map((reservation, index) => (
                  <div key={index} className="user_reservation-item_after">
                    <div className="user_reservation_cafe_img_after">
                      <img
                        src={`data:image/;base64,${reservation.cafeRepImg}`}
                      />
                    </div>
                    <div>
                      <div className="user_cafe_name">
                        {reservation.cafeName}
                      </div>
                      <div className="user_reservation_row">
                        <div className="user_inprogress-info">
                          <div>이용 날짜 : {reservation.reserveDate}</div>
                          <div>
                            이용 시간 : {reservation.reserveStart} ~{" "}
                            {reservation.reserveEnd}
                          </div>
                          <div>좌석: {reservation.tableNumber}</div>
                        </div>
                        {reservation.state === "F" && (
                          <div className="user_reservation_finish">
                            <h4>완료</h4>
                          </div>
                        )}
                        {reservation.state === "N" && (
                          <div className="user_reservation_cancle">
                            <h4>취소</h4>
                            <Link
                              to={`/user/reservationstatus/cancle/${reservation.reservationIds[0]}`}
                            >
                              <button>사유 확인</button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="user_paging" style={{ marginRight: "-470px" }}>
                  <ReactPaginate
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={reservationAfter.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </usermyreservationafter>
  );
};
export default UserMyReservationAfter;

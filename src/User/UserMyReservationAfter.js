import "./UserMyReservationAfter.css";
import { Link } from "react-router-dom";
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
  const [showReviewModal, setShowReviewModal] = useState(false); // 모달 창 상태
  const [rating, setRating] = useState(0); // 현재 선택한 별점
  const [reviewButtonText, setReviewButtonText] = useState("별점주기"); // 후기 작성 버튼 텍스트

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 별점 클릭 시 처리
  const handleStarClick = (index, e) => {
    const starWidth = e.currentTarget.offsetWidth; // 별의 너비
    const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left; // 클릭한 위치
    const percentage = (clickPosition / starWidth) * 100; // 클릭한 위치 비율

    if (percentage < 50) {
      // 왼쪽 클릭: 반개씩 추가
      setRating((prev) => Math.min(index + 0.5, 5)); // 최대 5개 별점으로 제한
    } else {
      // 오른쪽 클릭: 꽉 채우기
      setRating((prev) => index + 1); // 현재 클릭한 별까지 꽉 채우기
    }
  };

  const closeModal = () => {
    setShowReviewModal(false);
    setRating(0); // 모달 닫을 때 별점 초기화
  };

  const handleCompleteClick = () => {
    setReviewButtonText(`다시주기 (${rating}점)`); // 버튼 텍스트 업데이트
    closeModal(); // 모달 닫기
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
                    <img src={`data:image/;base64,${reservation.cafeRepImg}`} />
                  </div>
                  <div>
                    <div className="user_cafe_name">{reservation.cafeName}</div>
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
                          <button onClick={() => setShowReviewModal(true)}>
                            {reviewButtonText} {/* 버튼 텍스트 */}
                          </button>
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

      {/* 별점 평가 모달 창 */}
      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>별점주기</h3>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                let starClass = "star empty"; // 기본적으로 빈 별
                if (rating >= index + 1) {
                  starClass = "star full"; // 꽉 찬 별
                } else if (rating > index && rating < index + 1) {
                  starClass = "star half"; // 반 채워진 별
                }
                return (
                  <div
                    key={index}
                    className={starClass}
                    onClick={(e) => handleStarClick(index, e)} // 클릭 이벤트에 이벤트 객체 전달
                  />
                );
              })}
            </div>
            <div className="thank-you-message">소중한 별점 감사합니다. ❤️</div>
            <div className="modal-buttons">
              <div className="button-box">
                <button className="button" onClick={closeModal}>
                  취소
                </button>
              </div>
              <div className="button-box">
                <button className="button" onClick={handleCompleteClick}>
                  완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMyReservationAfter;

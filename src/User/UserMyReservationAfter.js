import "./UserMyReservationAfter.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-js-pagination";
import { reservationFinish, submitReview } from "../apis/UserReservation";
import { PulseLoader } from "react-spinners";

const UserMyReservationAfter = () => {
  const [reservationAfter, setReservationAfter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const maxReviewLength = 50;

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStarClick = (index, e) => {
    const starWidth = e.currentTarget.offsetWidth;
    const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const percentage = (clickPosition / starWidth) * 100;

    if (percentage < 50) {
      setRating((prev) => Math.min(index + 0.5, 5));
    } else {
      setRating((prev) => index + 1);
    }
  };

  const closeModal = () => {
    setShowReviewModal(false);
    setRating(0);
    setReviewText("");
    setSelectedReservationId(null);
  };

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxReviewLength) {
      setReviewText(value);
    }
  };

  const handleCompleteClick = async () => {
    if (!selectedReservationId) {
      alert("예약 ID가 설정되지 않았습니다.");
      return;
    }

    if (rating === 0 || reviewText.trim() === "") {
      alert("별점과 리뷰를 작성해주세요.");
      return;
    }

    try {
      console.log("Reservation ID:", selectedReservationId);
      await submitReview(selectedReservationId, reviewText, rating);
      alert("리뷰가 저장되었습니다.");

      closeModal();
    window.location.reload();

      const updatedReservations = reservationAfter.map((res) =>
        res.reservationIds.includes(selectedReservationId)
          ? { ...res, hasReview: true }
          : res
      );
      setReservationAfter(updatedReservations);
    } catch (error) {
      alert("리뷰 저장에 실패했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    const reservationAfterInfo = async () => {
      try {
        setLoading(true);
        const response = await reservationFinish();

        console.log("Reservation data from API:", response.data.data);

        const reservationsWithReviewFlag = response.data.data.map((res) => ({
          ...res,
          hasReview: !!res.reviewText,
        }));

        setReservationAfter(reservationsWithReviewFlag);
      } catch (error) {
        console.error("Error fetching reservations:", error);
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
            <div className="user_reservation_no_exist">예약 현황이 없습니다.</div>
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
                          <button
                            onClick={() => {
                              if (
                                !reservation.reservationIds ||
                                reservation.reservationIds.length === 0
                              ) {
                                console.error("Reservation ID is missing or empty!");
                                return;
                              }
                              const reservationId = reservation.reservationIds[0];
                              setSelectedReservationId(reservationId);
                              setReviewText(reservation.reviewText || "");
                              setRating(reservation.rating || 0);
                              setShowReviewModal(true);
                            }}
                          >
                            {reservation.hasReview ? "리뷰 수정" : "리뷰 작성"}
                          </button>
                        </div>
                      )}
                      {reservation.state === "N" && (
                        <div className="user_reservation_cancel">
                          <h4>취소</h4>
                          <Link
                            to={`/user/reservationstatus/cancel/${reservation.reservationIds[0]}`}
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

      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>리뷰 작성</h3>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                let starClass = "star empty";
                if (rating >= index + 1) {
                  starClass = "star full";
                } else if (rating > index && rating < index + 1) {
                  starClass = "star half";
                }
                return (
                  <div
                    key={index}
                    className={starClass}
                    onClick={(e) => handleStarClick(index, e)}
                  />
                );
              })}
            </div>
            <textarea
              className="review-textarea"
              placeholder="리뷰를 작성해주세요."
              value={reviewText}
              onChange={handleReviewChange}
              maxLength={maxReviewLength}
            ></textarea>
            <div className="review-char-counter">
              {reviewText.length} / {maxReviewLength}
            </div>
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

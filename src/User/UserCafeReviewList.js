import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCafeReviews } from "../apis/UserReservation";
import ReactPaginate from "react-js-pagination";
import "./UserCafeReviewList.css";

// 헤더와 푸터 컴포넌트 추가
import UserNav from "./UserNav";
import Footer from "../Footer";

const UserCafeReviewList = () => {
  const { cafeId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [cafeName, setCafeName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);

  // 리뷰와 카페 이름 가져오기
  useEffect(() => {
    const loadReviews = async () => {
      if (!cafeId) {
        console.error("Invalid cafeId:", cafeId);
        return;
      }

      setLoading(true); // 로딩 상태 시작
      try {
        const response = await fetchCafeReviews(cafeId);
        console.log("API Response:", response.data);

        // 상태 업데이트
        const updatedCafeName = response.data.data.cafeName || "알 수 없는 카페";
        const updatedReviews = response.data.data.reviews || [];

        setCafeName(updatedCafeName);
        setReviews(updatedReviews);

        console.log("Updated Cafe Name:", updatedCafeName);
        console.log("Updated Reviews:", updatedReviews);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [cafeId]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReservation = () => {
    navigate(`/user/reservation/${cafeId}`);
  };

  const displayedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <p>리뷰 데이터를 불러오는 중입니다...</p>; // 로딩 중일 때 메시지 표시
  }

  return (
    <div>
      <UserNav /> {/* 헤더 추가 */}
      <div className="user-cafe-review-list">
        <h2>{cafeName}의 리뷰 목록</h2> {/* 카페 이름 표시 */}
        <button className="reservation-button" onClick={handleReservation}>
          예약하기
        </button> {/* 예약하기 버튼 */}
        {reviews.length === 0 ? (
          <p>아직 작성된 리뷰가 없습니다.</p>
        ) : (
          <>
            <ul className="review-list">
              {displayedReviews.map((review, index) => (
                <li key={index} className="review-item">
                  <div className="review-header">
                    <span className="review-user">{review.userRealName}</span>
                    <span className="review-rating">
                      {"⭐".repeat(review.rating)} {/* 별점 표시 */}
                    </span>
                  </div>
                  <div className="review-content">
                    <p>{review.reviewText}</p>
                  </div>
                  <div className="review-date">{review.reviewDate}</div>
                </li>
              ))}
            </ul>
            <ReactPaginate
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={reviews.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              prevPageText={"‹"}
              nextPageText={"›"}
              containerClassName="pagination"
              activeClassName="active"
            />
          </>
        )}
      </div>
      <Footer /> {/* 푸터 추가 */}
    </div>
  );
};

export default UserCafeReviewList;

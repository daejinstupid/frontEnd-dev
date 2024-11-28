import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// 기존 함수들
export function readTableList(cafeId) {
  return axios.get(`/user/reservation/cafe/${cafeId}`);
}
export function readReservationTime(selectedDate, tableId) {
  return axios.get(`/user/reservation/time/${selectedDate}/${tableId}`);
}
export function createReservation(reservationData) {
  return axios.post("user/reservation/register", reservationData);
}
export function reservationNow(reservationId) {
  return axios.get(`/user/reservation/now/${reservationId}`);
}
export function reservationCancel(reservationId) {
  return axios.get(`/user/reservation/now/cancel/${reservationId}`);
}
export function reservationProgress() {
  return axios.get("/user/reservation/list/state");
}
export function reservationFinish() {
  return axios.get("/user/reservation/list/finish");
}

// 추가된 리뷰 제출 함수
export function submitReview(reservationId, reviewText, rating) {
  return axios.post("/user/reservation/review", {
    reservationId,
    reviewText,
    rating,
  });
}

// 새로운 함수: 특정 카페의 리뷰 가져오기
export function fetchCafeReviews(cafeId) {
  return axios.get(`/user/reservation/review/${cafeId}`);
}


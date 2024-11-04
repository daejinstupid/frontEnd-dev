import axios from "axios";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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

import axios from "axios";

// 현재 호스트 이름에 따라 baseURL 설정
const isProduction = window.location.hostname === "www.cafein.store";

axios.defaults.baseURL = isProduction ? "http://www.cafein.store" : "http://localhost:8080/";


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

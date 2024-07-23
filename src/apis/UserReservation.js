import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/api";

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
export function reservationCancle(reservationId) {
  return axios.get(`/user/reservation/now/cancle/${reservationId}`);
}
export function reservationProgress() {
  return axios.get("/user/reservation/list/state");
}
export function reservationFinish() {
  return axios.get("/user/reservation/list/finish");
}

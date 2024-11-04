import axios from "axios";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function managerReadProgress() {
  return axios.get("/manager/reservation/read/ing");
}

export function managerReadUpcoming() {
  return axios.get("/manager/reservation/read/before");
}

export function managerChangeConfirm(data) {
  return axios.patch("/manager/reservation/confirm", data);
}

export function managerChangeCancel(data){
  return axios.patch("/manager/reservation/cancel", data);
}

export function managerChangeFinish(data){
  return axios.patch("/manager/reservation/finish", data);
}

export function managerReadCalendarReservation(selectDate){
  return axios.get(`/manager/reservation/read/date/${selectDate}`);
}

import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

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

// 예약 거절 함수 (예약 전 거절)
export function managerChangeReject(data) {
  return axios.patch("/manager/reservation/reject", data);
}

export function managerChangeFinish(data){
  return axios.patch("/manager/reservation/finish", data);
}

export function managerReadCalendarReservation(selectDate){
  return axios.get(`/manager/reservation/read/date/${selectDate}`);
}

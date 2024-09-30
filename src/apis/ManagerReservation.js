import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/";

export function managerReadProgress() {
  return axios.get("/manager/reservation/read/ing");
}

export function managerReadUpcoming() {
  return axios.get("/manager/reservation/read/before");
}

export function managerChangeConfirm(data) {
  return axios.patch("/manager/reservation/confirm", data);
}

export function managerChangeCancle(data){
  return axios.patch("/manager/reservation/cancle", data);
}

export function managerChangeFinish(data){
  return axios.patch("/manager/reservation/finish", data);
}

export function managerReadCalendarReservation(selectDate){
  return axios.get(`/manager/reservation/read/date/${selectDate}`);
}

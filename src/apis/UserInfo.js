import axios from "axios";

// 현재 호스트 이름에 따라 baseURL 설정
const isProduction = window.location.hostname === "www.cafein.store";

axios.defaults.baseURL = isProduction ? "http://www.cafein.store" : "http://localhost:8080/";


export function checkPassword(password) {
  return axios.post("/user/check/password", { password });
}
export function updatePassword() {
  return axios.patch("/user/update/password", { password: "password" });
}

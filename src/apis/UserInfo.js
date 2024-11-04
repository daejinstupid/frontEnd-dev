import axios from "axios";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function checkPassword(password) {
  return axios.post("/user/check/password", { password });
}
export function updatePassword() {
  return axios.patch("/user/update/password", { password: "password" });
}

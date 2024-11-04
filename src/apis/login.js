import axios from "axios";

// 현재 호스트 이름에 따라 baseURL 설정
const isProduction = window.location.hostname === "www.cafein.store";

axios.defaults.baseURL = isProduction ? "http://www.cafein.store" : "http://localhost:8080/";

export function login(user) {
  return axios.post("/login", user);
}

export function signup(user) {
  return axios.post("/signup", user);
}

export function idCheck(id) {
  return axios.get(`/check/userName/dup/${id}`);
}
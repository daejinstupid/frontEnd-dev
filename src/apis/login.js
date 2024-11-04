import axios from "axios";

// 현재 호스트 이름에 따라 baseURL 설정
const isProduction = window.location.hostname === "www.cafein.store";
axios.defaults.baseURL = isProduction ? "https://www.cafein.store" : "http://localhost:8080";

// 로그인 함수
export function login(user) {
  return axios.post("/login", user);
}


// 회원가입 함수
export function signup(user) {
  return axios.post("/signup", user);
}

// 아이디 중복 확인 함수
export function idCheck(id) {
  return axios.get(`/check/userName/dup/${id}`);
}

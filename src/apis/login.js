import axios from "axios";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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

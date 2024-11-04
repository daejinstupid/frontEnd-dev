import axios from "axios";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer "+accessToken;
}

export function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

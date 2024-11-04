import axios from "axios";

// 현재 호스트 이름에 따라 baseURL 설정
const isProduction = window.location.hostname === "www.cafein.store";

axios.defaults.baseURL = isProduction ? "http://www.cafein.store" : "http://localhost:8080/";

export function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer "+accessToken;
}

export function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

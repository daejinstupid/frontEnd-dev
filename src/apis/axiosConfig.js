import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

export function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer "+accessToken;
}

export function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}
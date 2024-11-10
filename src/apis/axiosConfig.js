import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer "+accessToken;
}

export function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}
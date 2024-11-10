import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function checkPassword(password) {
  return axios.post("/user/check/password", { password });
}
export function updatePassword() {
  return axios.patch("/user/update/password", { password: "password" });
}

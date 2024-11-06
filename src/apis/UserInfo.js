import axios from "axios";

axios.defaults.baseURL = "http://www.cafein.store/";

export function checkPassword(password) {
  return axios.post("/user/check/password", { password });
}
export function updatePassword() {
  return axios.patch("/user/update/password", { password: "password" });
}

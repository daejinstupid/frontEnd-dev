import axios from "axios";


axios.defaults.baseURL = "https://www.cafein.store/";

export function login(user) {
  return axios.post("/login", user);
}

export function signup(user) {
  return axios.post("/signup", user);
}

export function idCheck(id) {
  return axios.get(`/check/userName/dup/${id}`);
}
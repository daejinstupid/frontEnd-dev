import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function login(user) {
  return axios.post("/login", user);
}

export function signup(user) {
  return axios.post("/signup", user);
}

export function idCheck(id) {
  return axios.get(`/check/userName/dup/${id}`);
}
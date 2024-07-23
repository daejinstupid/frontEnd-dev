import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

export function managerCafeReg(formData) {
    return axios.post("/manager/cafe/register", formData);
  }
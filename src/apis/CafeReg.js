import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function managerCafeReg(formData) {
    return axios.post("/manager/cafe/register", formData);
  }
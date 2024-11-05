import axios from "axios";

axios.defaults.baseURL = "https://www.cafein.store/";

export function managerCafeReg(formData) {
    return axios.post("/manager/cafe/register", formData);
  }
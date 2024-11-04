import axios from "axios";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function managerCafeReg(formData) {
    return axios.post("/manager/cafe/register", formData);
}

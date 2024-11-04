import axios from "axios";
import qs from "qs";

// 환경 변수에서 baseURL을 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function filterSearch(filterData, pageNo = 1) {
  const queryString = qs.stringify(filterData, {
    arrayFormat: "repeat",
  });

  return axios.get(`/user/search?${queryString}`); // baseURL을 자동으로 사용
}

export function locationSearch(x, y) {
  return axios.get(`/user/search/near/mylocation?x=${x}&y=${y}`); // baseURL을 자동으로 사용
}

export function cafeInfo(cafeId) {
  return axios.get(`/user/cafe/${cafeId}`); // baseURL을 자동으로 사용
}

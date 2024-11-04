import axios from "axios";
import qs from "qs";

// 현재 호스트 이름에 따라 baseURL 설정
const isProduction = window.location.hostname === "www.cafein.store";

axios.defaults.baseURL = isProduction ? "http://www.cafein.store" : "http://localhost:8080/";

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

import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function filterSearch(filterData, pageNo = 1) {
  const queryString = qs.stringify(filterData, {
    arrayFormat: "repeat",
  });

  // 템플릿 리터럴을 사용하여 baseURL 적용
  return axios.get(`${process.env.REACT_APP_BASE_URL}/user/search?${queryString}`);
}

export function locationSearch(x, y) {
  return axios.get(`/user/search/near/mylocation?x=${x}&y=${y}`);
}

export function cafeInfo(cafeId) {
  return axios.get(`/user/cafe/${cafeId}`);
}

import axios from "axios";
import qs from "qs";


axios.defaults.baseURL = "http://localhost:8080/";

export function filterSearch(filterData, pageNo = 1) {
  const queryString = qs.stringify(filterData, {
    arrayFormat: "repeat",
  });

  return axios.get(`http://localhost:8080/user/search?${queryString}`);
}

export function locationSearch(x, y) {
  return axios.get(`/user/search/near/mylocation?x=${x}&y=${y}`);
}
export function cafeInfo(cafeId) {
  return axios.get(`/user/cafe/${cafeId}`);
}

import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

/* Basic 업데이트 */
export function managerBasicRead() {
    return axios.get("/manager/cafe/basic");
  }
  export function managerBasicCafeTelUpdate(updatedPhone) {
    return axios.patch("/manager/cafe/edit/tel", { cafeTel: updatedPhone });
}
export function managerBasicCafeAddressUpdate(updatedAddress) {
    return axios.patch("/manager/cafe/edit/location", updatedAddress);
  }

  export function managerBasicCafeRepImgUpdate(studyImg) {
    return axios.patch("/manager/cafe/edit/cafeRepImg", studyImg, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /* Details 업데이트 */
  export function managerDetailRead() {
    return axios.get("/manager/cafe/details");
  }
  export function managerDetailCafeTimeUpdate(updatedTime) {
    return axios.patch("/manager/cafe/edit/time", updatedTime);
  }
  export function managerDetailCafeFeatureUpdate(features) {
    return axios.post("/manager/cafe/edit/feature", features);
  }
  

/* Setting 업데이트 */
  export function managerSettingRead() {
    return axios.get("/manager/cafe/setting");
  }

  export function managerSettingCafeStudyUpdate(study) {
    return axios.patch("/manager/cafe/edit/study", study);
  }

  export function managerSettingCafeImgUpdate(studyImg) {
    return axios.patch("/manager/cafe/edit/studyImg", studyImg, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  export function managerSettingCafeTableUpdate(tableNo) {
    return axios.post("/manager/cafe/edit/tableNumber", tableNo);
  }

  export function managerSettingCafeTableDelete(tableNo) {
    return axios.delete(`/manager/cafe/edit/tableNumber/${tableNo}`);
  }
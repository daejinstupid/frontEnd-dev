import { useCallback, useEffect, useState } from "react";
import ManagerNav from "../ManagerNav";
import "./cafeRegister.css";
import Footer from "../../Footer";
import CafeType from "./CafeType";
import CafeImage from "./CafeImage";
import CafeStudySetting from "./CafeStudySetting";
import CafeName from "./CafeName";
import CafeBasic from "./CafeBasic";
import CafeFeature from "./CafeFeature";
import { managerCafeReg } from "./../../apis/CafeReg";
import Swal from "sweetalert2";

const CafeRegister = () => {
  const defaultStartTime = new Date();
  defaultStartTime.setHours(9, 0, 0); // 오전 9시로 설정

  const defaultEndTime = new Date();
  defaultEndTime.setHours(21, 0, 0); // 오후 9시(21시)로 설정

  const [number, setNumer] = useState(1);
  const [cafeName, setCafeName] = useState("");
  const [cafeType, setCafeType] = useState("");
  const [cafeBasicInfo, setCafeBasicInfo] = useState({
    address: {
      townAddress: "",
      areaAddress: "",
      X: "",
      Y: "",
    },
    phoneNumber: "",
    startTime: defaultStartTime, // 여기에서 초기값 설정
    endTime: defaultEndTime, // 여기에서 초기값 설정
  });

  const [cafeImages, setCafeImages] = useState({
    titleFile: null,
    detailFiles: [],
  });
  const [cafeFeatures, setCafeFeatures] = useState({});

  const [cafeStudySetting, setCafeStudySetting] = useState({
    studySetting: "",
    floorPlanFile: null,
  });
  useEffect(() => {
  }, [cafeStudySetting.floorPlanFile]);

  const handleStudySettingChange = useCallback((setting) => {
    setCafeStudySetting(setting);
  }, []);

  const handleFeaturesChange = useCallback((features) => {
    setCafeFeatures(features);
  }, []);

  const handleImageChange = useCallback((images) => {
    setCafeImages(images);
  }, []);

  const validatePhoneNumber = (number) => {
    const regex =
      /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    return regex.test(number);
  };

  const addNumber = () => {
    if (number === 1) {
      if (cafeName.trim().length < 1) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `카페이름은 1글자 이상 입력해야 합니다..`,
          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        // alert("카페이름은 1글자 이상 입력해야 합니다.");
        return;
      }
    }

    if (number === 2 && !cafeType) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: `카페 유형을 선택해주세요..`,

        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: "no-outline",
        },
      });
      // alert("카페 유형을 선택해주세요.");
      return;
    }

    // CafeBasic 유효성 검사
    if (number === 3) {
      if (!cafeBasicInfo.address || !cafeBasicInfo.phoneNumber) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `카페 기본 정보를 올바르게 입력해주세요.`,

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        // alert("카페 기본 정보를 올바르게 입력해주세요.");
        return;
      }

      // 전화번호 포맷 유효성 검사
      if (!validatePhoneNumber(cafeBasicInfo.phoneNumber)) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `유효한 전화번호를 입력해주세요.`,

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        // alert("유효한 전화번호를 입력해주세요.");
        return;
      }

      if (
        !cafeBasicInfo.address.townAddress ||
        !cafeBasicInfo.address.areaAddress
      ) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `카페 주소를 입력해주세요.`,

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        return;
      }

      // 시간 유효성 검사 (시작 시간이 종료 시간보다 늦으면 안 됨)
      if (cafeBasicInfo.startTime >= cafeBasicInfo.endTime) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `카페 종료 시간은 시작 시간보다 늦어야 합니다.`,

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        // alert("카페 종료 시간은 시작 시간보다 늦어야 합니다.");
        return;
      }
    }

    if (number === 4) {
      if (!cafeImages.titleFile || cafeImages.detailFiles.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `대표 사진과 상세 사진 모두 업로드해주세요.`,

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        // alert("대표 사진과 상세 사진을 모두 업로드해주세요.");
        return;
      }
    }

    setNumer((prevNumber) => {
      if (prevNumber >= 6) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: `마지막 페이지 입니다.`,

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
        return 6;
      }
      return prevNumber + 1;
    });
  };

  const subNumber = () => {
    setNumer((prevNumber) => {
      if (prevNumber <= 1) {
        return 1;
      }
      return prevNumber - 1;
    });
  };

  const handleBasicInfoChange = useCallback(
    (basicInfo) => {
      setCafeBasicInfo(basicInfo);
    },
    [setCafeBasicInfo]
  );

  useEffect(() => {
  }, [cafeBasicInfo]);

  const handleFinalSubmit = async () => {
    // FormData 준비
    const formData = new FormData();

    // JSON 데이터를 문자열로 변환하여 추가
    formData.append(
      "cafeReg",
      new Blob(
        [
          JSON.stringify({
            cafeName,
            cafeType,
            startTime: cafeBasicInfo.startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            endTime: cafeBasicInfo.endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            address: `${cafeBasicInfo.address.townAddress}, ${
              cafeBasicInfo.address.areaAddress === null
                ? " "
                : cafeBasicInfo.address.areaAddress
            }`,
            longitude: cafeBasicInfo.address.X,
            latitude: cafeBasicInfo.address.Y,
            cafeTel: cafeBasicInfo.phoneNumber,
            study: cafeStudySetting.studySetting,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    // 이미지 파일 추가
    if (cafeImages.titleFile) {
      formData.append("cafeRepImg", cafeImages.titleFile);
    }
    cafeImages.detailFiles.forEach((file) => {
      formData.append("cafeImgs", file);
    });

    // 평면도 추가 (있을 경우)
    if (cafeStudySetting.floorPlanFile) {
      formData.append("cafeStudyImg", cafeStudySetting.floorPlanFile);
    }

    // 특성 추가 (JSON 문자열로 변환하여 추가)
    formData.append(
      "cafeFeature",
      new Blob([JSON.stringify(cafeFeatures)], { type: "application/json" })
    );

    // API 호출
    const response = await managerCafeReg(formData);
    try {
      if (response.data.isSuccess) {
        // 등록 성공 처리
        console.log("등록 성공", response.data.data);
      } else {
        // 오류 처리
        console.error("등록 실패", response.data.message);
      }
    } catch (error) {
      console.error("등록 중 오류 발생", error);
    }
  };

  return (
    <caferegister>
      <ManagerNav />

      <div className="register-full-container">
        <div className="button-container-total">

        {/* <div className="bg"></div> */}
        
        <div className="button-container">
       
          {/* <div className="register-buttons"> */}
          <div className="button-previous">
            <button className="previous" onClick={subNumber}>
              {"<"}
            </button>
          </div>
          <div className="register-main-items">
          <div className="register-number">
          <span className="stepNumber">0{number}</span>
          <span className="totalNumber">/ 06</span>
        </div>
          <div className="register-stepbox">
          
            {number === 1 && (
              <CafeName cafeName={cafeName} setCafeName={setCafeName} />
            )}
            {number === 2 && (
              <CafeType cafeType={cafeType} setCafeType={setCafeType} />
            )}
            {number === 3 && (
              <CafeBasic
                cafeBasicInfo={cafeBasicInfo}
                onBasicInfoChange={handleBasicInfoChange}
              
              />
            )}
            {number === 4 && <CafeImage onImageChange={handleImageChange} cafeImages={cafeImages}/>}
            {number === 5 && (
              <CafeFeature onFeaturesChange={handleFeaturesChange}
              selectedFeatures={cafeFeatures} />
            )}
            {number === 6 && (
              <CafeStudySetting
              onStudySettingChange={handleStudySettingChange}
              onFinalSubmit={handleFinalSubmit}
              initialStudySetting={cafeStudySetting.studySetting}
              initialFile={cafeStudySetting.floorPlanFile}
              />
            )}
          </div>
          </div>
          <div className="button-next">
            <button className="next" onClick={addNumber}>
              {">"}
            </button>
          </div>
          
          </div>
          {/* <div className="bg"></div> */}
          {/* </div> */}
        </div>
      </div>

      <Footer />
    </caferegister>
  );
};

export default CafeRegister;

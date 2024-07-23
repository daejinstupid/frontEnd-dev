import { useDaumPostcodePopup } from "react-daum-postcode";

function DaumPost({ setAddressObj }) {
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let KakaoX = "";
    let KakaoY = "";
    let localAddress = data.sido + " " + data.sigungu;
    if (data.addressType === "R") {
      // if (data.bname !== '') {
      //   extraAddress += data.bname;
      // }
      // if (data.buildingName !== '') {
      //   extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      // }
      // fullAddress = fullAddress.replace(localAddress, '');
      // fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(data.roadAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          KakaoX = result[0].x;
          KakaoY = result[0].y;
          
          setAddressObj({
            // props 제거
            townAddress: fullAddress,
            X: KakaoX,
            Y: KakaoY,
          });
        }
      });
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" onClick={handleClick}>
      주소찾기
    </button>
  );
}

export default DaumPost;

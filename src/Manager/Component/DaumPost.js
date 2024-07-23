  import { useDaumPostcodePopup } from 'react-daum-postcode';


  function DaumPost({ setAddressObj }) {
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handleComplete = (data) => {
      let fullAddress = data.address;

      if (data.addressType === 'R') {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const getAddressCoordinates = (address) => {
          return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                resolve({ x: result[0].x, y: result[0].y });
              } else {
                reject(new Error('주소를 찾는 데 실패했습니다.'));
              }
            });
          });
        };

        getAddressCoordinates(data.roadAddress)
          .then(coordinates => {
            setAddressObj({
              townAddress: fullAddress,
              X: coordinates.x,
              Y: coordinates.y
            });
          })
          .catch(error => console.error(error));
      }
    };

    const handleClick = () => {
      open({ onComplete: handleComplete });
    };

    return <button type="button" onClick={handleClick}>주소찾기</button>
  }

  export default DaumPost;

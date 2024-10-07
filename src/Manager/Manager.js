import React, { useEffect, useState } from "react";
import "./Manager.css";
import Footer from "../Footer";
import ManagerNav from "./ManagerNav";

const Manager = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ManagerNav />
      <div className={`manager_index_text ${isLoaded ? "show" : ""}`}>
        <h1>cafe-in</h1>
        <p>
          저희 cafe-in 플랫폼은 카페 직원들이 고객뿐만 아니라 스터디와 협업을 원하는 분들에게 최적의 매칭 서비스를 제공하도록 돕습니다.
        </p>
        <p>
          직원들은 효율적인 예약 시스템을 통해 판매를 최적화하고 테이블 회전율을 높일 수 있으며, 이는 매출 증가로 이어집니다.
        </p>
        <p>
          커피와 학습, 네트워킹이 어우러진 공간을 관리하는 카페인의 직원이 되어, 혁신적인 카페 운영 경험을 직접 체험해 보세요. 
        </p>
        <p>이제 카페는 단순한 휴식 공간을 넘어 다양한 가능성을 제공합니다.
        </p>
      </div>
      <div className="advantages_section">
        <h2>cafe-in을 선택해야 하는 4가지 이유</h2>
      </div>
      <div className="manager_index_img">
        <div className="image-container">
          <img src="assets/small_img1.jpg" alt="매장관리" />
          <div className="overlay-text">
          플랫폼을 통해 카페 운영을<br></br> 손쉽게 관리할 수 있습니다.<br></br> 실시간 예약 현황과 카페 정보 <br></br>
          소개 기능으로 효율적인 운영이<br></br> 가능합니다.
          </div>
          <div className="caption">매장관리</div>
        </div>
        <div className="image-container">
          <img src="assets/small_img2.JPEG" alt="이미지 2" />
          <div className="overlay-text">
          고객의 예약을 보다 효과적으로 지원하여 자원 낭비를 <br></br> 줄이고 카페 운영의 효율성을 극대화합니다.
          </div>
          <div className="caption">효율적인 제공</div>
        </div>
        <div className="image-container">
          <img src="assets/small_img3.jpeg" alt="이미지 3" />
          <div className="overlay-text">
          방문을 체계적으로 관리하여<br></br> 테이블 회전율을 높이고<br></br> 대기 시간을 줄입니다.<br></br>
           고객 만족도와 재방문율을 <br></br>향상시킵니다.
          </div>
          <div className="caption">고객 순환</div>
        </div>
        <div className="image-container">
          <img src="assets/small_img4.jpeg" alt="이미지 4" />
          <div className="overlay-text">
          다양한 정보를 제공하여<br></br> 카페의 매출을 극대화합니다.<br></br> 성과를 쉽게 모니터링하고<br></br> 필요한 지원을 아끼지 않습니다.
          </div>
          <div className="caption">매출 증대</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Manager;
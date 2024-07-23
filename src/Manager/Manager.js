import "./Manager.css";
import Footer from "../Footer";
import ManagerNav from "./ManagerNav";

const Manager = () => {
  return (
    <manager>
      
      <ManagerNav />
      <div className="manager_index">
        <div className="manager_index_text">
          <h1>cafe-in</h1>
          <p>
            저희 cafe-in 사이트는 일반 이용객 말고도 공부하는 이용객들을 상대로
            매칭의 경험을 만나게 해줍니다.
          </p>
          <p>
            점주는 카페를 제공함으로써 약속을 통한 효율적인 판매, 원활한 테이블
            순환을 통한 매출 증가를 경험해 볼 수 있습니다.
          </p>
          <p>
            커피와 스터디의 조화로운 공간 카페인의 점주가 되어 경험해 보세요.
          </p>
        </div>
        <div className="manager_index_img">
          <img src="assets/manager_index1.png" />
          <img src="assets/manager_index2.png" />
          <img src="assets/manager_index3.png" />
          <img src="assets/manager_index4.png" />
        </div>
      </div>
      <Footer />
    </manager>
  );
};
export default Manager;

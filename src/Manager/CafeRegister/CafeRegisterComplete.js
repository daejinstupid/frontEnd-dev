import "./CafeRegisterComplete.css";
import ManagerNav from "../ManagerNav";
import Footer from "../../Footer";

const CafeRegisterComplete = () => {
  return (
    <caferegistercomplete>
      <ManagerNav />
      <div className="caferegistercomplete">
        <div className="registercomp">
          <div className="v">
            <img src="/assets/check-white.png" />
          </div>
          <div className="register-comp-content">
            <p>
              등록이 완료되었습니다! <br />
              점주분들의 지점이 번창하기를 기원합니다.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </caferegistercomplete>
  );
};

export default CafeRegisterComplete;
import { Link } from "react-router-dom";
import "./EmptyRegister.css";
import "./ManagerCommon.css";

const EmptyRegister = () => {
  return (
    <div className="EmptyRegister">
      <div className="EmptyRegister-container">
        <div className="EmptyRegister-items">
          <div className="EmptyRegister-img-div">
            <img src="/assets/no_result.png" alt="이미지" />
          </div>
          <p>아직 등록된 카페가 없습니다.</p>
          <p>점주님의 카페를 소개해주세요.</p>
          <div className="EmptyRegister-button-div">
            <Link to="/manager/cafe/initial">
              <button>등록하러 가기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyRegister;

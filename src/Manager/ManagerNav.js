import { Link } from "react-router-dom";
import "./ManagerNav.css";
import { useContext } from "react";
import AppContext from "../AppContext";
import { removeAuthHeader } from "../apis/axiosConfig";

const ManagerNav = () => {
  const appContext = useContext(AppContext);

  const handleLogout = (event) => {
    removeAuthHeader();
    //context 전역상태 초기화
    appContext.setUser("");
    appContext.setAccessToken("");

  };

  return (
    <managernav>
      <div className="manager_nav">
        <div className="header_img">
          <Link to="/manager">
            <img src="/assets/text_logo_black.png" />
          </Link>
        </div>
        <div className="manager_nav_item">
          <Link to="/manager/update">
            <h3>카페 정보 관리</h3>
          </Link>
          <div className="manager_dropdown_content">
            <div className="manager_dropdown_content_left">
              <Link to="/manager/update">
                <p>카페 정보 관리</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="manager_nav_item">
          <Link to="/manager/reservationstatus">
            <h3>카페 예약 관리</h3>
          </Link>
          <div className="manager_dropdown_content">
            <div className="manager_dropdown_content_right">
              <Link to="/manager/reservationstatus">
                <p>고객 예약 현황</p>
              </Link>
              <Link to="/manager/reservationlist">
                <p>날짜 별 예약 조회</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="header_right">
        {appContext.user === "" ? (
          <>
            <Link to="/login">
              <p>로그인</p>
            </Link>
            <p> | </p>
            <Link to="/register">
              <p>회원가입</p>
            </Link>
            </>
         
        ) : (
          
          <div className="loginafterbox">
            <span className="userNameDiv">{appContext.user}님 환영합니다!</span>
            <button className="logoutButton" onClick={handleLogout}>
              로그아웃
            </button>
            </div>
            
        )}
        </div>
      </div>
    </managernav>
  );
};
export default ManagerNav;

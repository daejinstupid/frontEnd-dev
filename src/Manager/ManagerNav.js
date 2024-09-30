import { Link } from "react-router-dom";
import "./ManagerNav.css";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import { removeAuthHeader } from "../apis/axiosConfig";

const ManagerNav = () => {
  const appContext = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState({ update: false, reservation: false });

  const handleLogout = () => {
    removeAuthHeader();
    appContext.setUser("");
    appContext.setAccessToken("");
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLinkClick = (e) => {
    // 모바일 버전에서는 링크 클릭 시 기본 동작을 막음
    if (window.innerWidth <= 768) {
      e.preventDefault();
    }
  };

  return (
    <div className="manager_nav">
      <div className="header_img">
        <Link to="/manager">
          <img src="/assets/text_logo_black.png" />
        </Link>
      </div>
      <div 
        className="manager_nav_item" 
        onClick={() => toggleDropdown('update')}
        onMouseEnter={() => !dropdownOpen.update && setDropdownOpen((prev) => ({ ...prev, update: true }))}
        onMouseLeave={() => dropdownOpen.update && setDropdownOpen((prev) => ({ ...prev, update: false }))}
      >
        <Link to="/manager/update" onClick={handleLinkClick}>
          <h3>카페 정보 관리</h3>
        </Link>
        {dropdownOpen.update && (
          <div className="manager_dropdown_content">
            <Link to="/manager/update">
              <p>카페 정보 관리</p>
            </Link>
          </div>
        )}
      </div>
      <div 
        className="manager_nav_item" 
        onClick={() => toggleDropdown('reservation')}
        onMouseEnter={() => !dropdownOpen.reservation && setDropdownOpen((prev) => ({ ...prev, reservation: true }))}
        onMouseLeave={() => dropdownOpen.reservation && setDropdownOpen((prev) => ({ ...prev, reservation: false }))}
      >
        <Link to="/manager/reservationstatus" onClick={handleLinkClick}>
          <h3>카페 예약 관리</h3>
        </Link>
        {dropdownOpen.reservation && (
          <div className="manager_dropdown_content">
            <Link to="/manager/reservationstatus">
              <p>고객 예약 현황</p>
            </Link>
            <Link to="/manager/reservationlist">
              <p>날짜 별 예약 조회</p>
            </Link>
          </div>
        )}
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
  );
};

export default ManagerNav;

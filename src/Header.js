import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import AppContext from "./AppContext";

const Header = () => {
  const appContext = useContext(AppContext);

  const handleLogout = (event) => {
    //context 전역상태 초기화
    appContext.setUser("");
  };

  return (
    <header>
      <div className="header">
        <div className="login_header_left">
          <div className="login_header_img">
            <Link to="/">
              <img src="./assets/logo_text_4-1.png" />
            </Link>
          </div>
        </div>
        <div className="login_header_right">
        {appContext.user === "" ? (
          <>
            <Link to="/login">
              <p>로그인</p>
            </Link>
            <p>|</p>
            <Link to="/register">
              <p>회원가입</p>
            </Link>
            </>
         
        ) : (
          // <div className="loginUser">
          <>
            <span className="userNameDiv">{appContext.user}님 환영합니다!</span>
            <button className="logoutButton" onClick={handleLogout}>
              로그아웃
            </button>
            </>
            // </div>
        )}
         </div>
      </div>
    </header>
  );
};
export default Header;

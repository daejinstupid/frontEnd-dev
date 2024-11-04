import React, { useCallback, useContext, useState } from "react";
import "./Login.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "./AppContext";
import { addAuthHeader, removeAuthHeader } from "./apis/axiosConfig";
import { login } from "./apis/login";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const appContext = useContext(AppContext);

  const handleChange = useCallback((event) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value };
    });
  }, []);

  const handleLogin = useCallback(
    async (event) => {
      try {
        if (user.userName === "" && user.password === "") {
          Swal.fire({
            icon: "warning",
            text: "아이디와 패스워드를 입력하여 주시기 바랍니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#FFCD4A",
          });
        } else if (user.userName === "") {
          Swal.fire({
            icon: "warning",
            text: "아이디를 입력하여 주시기 바랍니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#FFCD4A",
          });
        } else if (user.password === "") {
          Swal.fire({
            icon: "warning",
            text: "비밀번호를 입력하여 주시기 바랍니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#FFCD4A",
          });
        } else {
          // 로그인 요청
          const response = await login(user);

          // 응답 데이터 구조 확인
          const data = response.data?.data;
          if (data) {
            // 요청 공통 헤더에 Authorization 추가
            addAuthHeader(data.accessToken);

            // Context에 인증 내용 저장
            appContext.setUser(data.userName);
            appContext.setAccessToken(data.accessToken);
            appContext.setRole(data.role);

            // 상태 초기화
            setUser({
              userName: "",
              password: "",
            });

            // 역할에 따라 페이지 이동
            if (data.role === "ROLE_MANAGER") {
              navigate("/manager");
            } else {
              navigate("/user");
            }
          } else {
            // 서버 응답이 예상한 데이터 구조가 아닐 경우 처리
            Swal.fire({
              icon: "error",
              title: "오류",
              text: "로그인에 실패하였습니다. 다시 시도해주세요.",
              confirmButtonText: "확인",
              confirmButtonColor: "#FFCD4A",
            });
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "오류",
          text: error.response?.data?.message || "로그인 중 오류가 발생했습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
        });
      }
    },
    [appContext, user]
  );

  const handleLogout = (event) => {
    // 요청 공통 헤더에서 Authorization 제거
    removeAuthHeader();

    // Context에서 인증 내용 제거
    appContext.setUser("");
    appContext.setAccessToken("");
    appContext.setRole("");
  };

  return (
    <div className="login">
      <Header />
      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>
        <div className="login-box">
          <h1 className="login-intro">카페인을 이용해 주셔서 감사합니다.</h1>
          {appContext.user === "" ? (
            <div className="login-before">
              <div className="login-inputs">
                <div className="id-box">
                  <label className="id">아이디</label>
                  <input
                    type="text"
                    placeholder="아이디"
                    id="userName"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className="pw-box">
                  <label className="pw">비밀번호</label>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="login-button">
                <button onClick={handleLogin}>로그인</button>
              </div>
              <div className="go-register-section">
                <label className="notyet-register">
                  아직 회원가입을 하지 않았다면?
                </label>
                <Link to={"/register"} className="go-register">
                  회원가입
                </Link>
              </div>
            </div>
          ) : (
            <div className="loginafterbox-loginpage">
              <button className="logoutButton" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

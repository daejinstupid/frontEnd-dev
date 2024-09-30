import React, { useCallback, useEffect, useState } from "react";
import "./Register.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { idCheck, signup } from "./apis/login";
import Swal from "sweetalert2";

function Register() {
  const [register, setRegister] = useState({
    role: "",
    userName: "",
    userRealName: "",
    password: "",
  });

  const [duplicate, setDuplicate] = useState(true);

  const [disable, setDisable] = useState(false);
  const [pwcheck, setPwcheck] = useState(true);

  const [validatePw, setValidatePw] = useState("");

  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const handleChange = useCallback((event) => {
    setRegister((prevRegister) => {
      return { ...prevRegister, [event.target.name]: event.target.value };
    });
    if (event.target.name === "password" ){
      if(event.target.value === validatePw) {
      setPwcheck(true);
    } else {
      setPwcheck(false);
    }}
  }, [validatePw]);

  

  const handleChangePw = useCallback(
    (event) => {
      const input = event.target.value;
      setValidatePw(input);
      if (register.password === input) {
        setPwcheck(true);
      } else {
        setPwcheck(false);
      }
    },
    [register.password]
  );

  const signupFun = useCallback(async () => {
    try {
      if (disable === true) {
        if (register.userRealName !== "") {
          if (pwcheck === true) {
            //로그인 요청
            const response = await signup(register);

            //상태 재초기화
            setRegister({
              role: "",
              userName: "",
              userRealName: "",
              password: "",
            });
            setValidatePw("");
          } else {
            Swal.fire({
              icon: "warning",
              title: "",
              text: "비밀번호가 일치하지 않습니다.",

              confirmButton: true,
              confirmButtonText: "확인",
              confirmButtonColor: "#FFCD4A",
              customClass: {
                confirmButton: "no-outline",
              },
            });
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "",
            text: "성함을 입력하여 주세요.",

            confirmButton: true,
            confirmButtonText: "확인",
            confirmButtonColor: "#FFCD4A",
            customClass: {
              confirmButton: "no-outline",
            },
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "",
          text: "아이디 중복 체크를 해주세요.",

          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: "no-outline",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [register, duplicate, pwcheck]);

  const idCheckFun = useCallback(async () => {
    try {
      //로그인 요청
      if (register.userName !== "") {
        const response = await idCheck(register.userName);

        if (response.data.data === false) {
          setDuplicate(false);
        } else {
          setDuplicate(true);
          setDisable(true);
        }
      } else {
        alert("아이디를 입력해 주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  }, [duplicate, register.userName]);

  const handleRoleChange = useCallback((event) => {
    setRegister((prevRegister) => ({
      ...prevRegister,
      role: event.target.value
    }));
  }, []);

  return (
    <register>
      <div className="register">
        <Header />
        <div className="register-container">
          <h1 className="register-title">SIGN UP</h1>
          <div className="register-box">
            <h1 className="register-intro">안녕하세요 카페인입니다.</h1>
            <div className="register-radio">
              <label className="usertype-label" value="회원유형">
                회원 유형
              </label>

              <input
                type="radio"
                className="register-radio-button"
                name="role"
                id="role"
                value="USER"
                checked={register.role === "USER"}
                onChange={handleChange}
              />
                <label htmlFor="register-radio-button">USER</label>
              <input 
              type="radio"
                className="register-radio-button"
                name="role"
                id="role"
                value="MANAGER"
                checked={register.role === "MANAGER"}
                onChange={handleChange}
              />
              <label htmlFor="register-radio-button">MANAGER</label>
               
            </div>
            <div className={duplicate ? "id-section" : "id-signin-error"}>
              <input
                type="text"
                placeholder="아이디"
                id="userName"
                name="userName"
                value={register.userName}
                onChange={handleChange}
              />
              <button onClick={idCheckFun}>확인</button>
            </div>

            <input
              type="text"
              placeholder="성 명"
              id="userRealName"
              name="userRealName"
              value={register.userRealName}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="비밀번호"
              id="password"
              name="password"
              value={register.password}
              onChange={handleChange}
            />

            <input
              value={validatePw}
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleChangePw}
            />
            {pwcheck ? (
              <span className="pwCheck-access">비밀번호가 일치합니다.</span>
            ) : (
              <span className="pwCheck-deny">비밀번호가 일치하지않습니다.</span>
            )}

            <div className="register-button">
              <button onClick={signupFun}>회원가입</button>
            </div>
            <div className="go-login-section">
              <label className="already-signin">이미 회원가입하셨다면</label>
              <Link to={"/login"} className="go-login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </register>
  );
}

export default Register;

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
  const [termsAccepted, setTermsAccepted] = useState(false); // 이용약관 체크박스 상태 추가
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const handleChange = useCallback((event) => {
    setRegister((prevRegister) => {
      return { ...prevRegister, [event.target.name]: event.target.value };
    });
    if (event.target.name === "password") {
      if (event.target.value === validatePw) {
        setPwcheck(true);
      } else {
        setPwcheck(false);
      }
    }
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
      if (!termsAccepted) {
        Swal.fire({
          icon: "warning",
          title: "",
          text: "이용 약관에 동의해주세요.",
          confirmButtonColor: "#FFCD4A",
        });
        return;
      }

      if (disable === true) {
        if (register.userRealName !== "") {
          if (pwcheck === true) {
            const response = await signup(register);

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
              confirmButtonColor: "#FFCD4A",
            });
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "",
            text: "성함을 입력하여 주세요.",
            confirmButtonColor: "#FFCD4A",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "",
          text: "아이디 중복 체크를 해주세요.",
          confirmButtonColor: "#FFCD4A",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [register, duplicate, pwcheck, termsAccepted]);

  const idCheckFun = useCallback(async () => {
    try {
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
      role: event.target.value,
    }));
  }, []);

  const handleTermsChange = useCallback(() => {
    setTermsAccepted((prevState) => !prevState);
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

            {/* 이용 약관 추가 */}
            <div className="terms-section">
              <div className="terms-box">
                <p>회원가입 이용약관<br></br><br></br>

[공통 항목]<br></br>
1. 개인정보 수집 및 이용<br></br>
예약 및 서비스 제공을 위해 회원의 이름, 연락처, 이메일 등 개인정보를 수집 및 이용하는 데 동의합니다. <br></br>해당 정보는 개인정보 처리방침에 따라 안전하게 관리됩니다.<br></br><br></br>

2. 이용 규칙 준수<br></br>
cafe-in 플랫폼 이용 시 모든 이용자는 예의와 규칙을 준수해야 하며, 규칙을 어길 경우 서비스 이용이 제한될 수 있습니다.<br></br> 카페 사장과 이용자는 플랫폼 규칙과 카페 내 규칙을 모두 준수하는 것에 동의합니다.<br></br><br></br>
_________________________________________________________<br></br><br></br>
[카페 이용자]<br></br>

3. 이용시간 제한<br></br>
카페 테이블 예약의 1회 최대 이용시간은 4시간입니다.<br></br> 해당 시간 동안 공간을 제공/이용하는 데 동의합니다.<br></br><br></br>

4. 1인 1메뉴 주문 의무<br></br>
cafe-in을 통해 카페를 이용하고자 하는 사람은 모두 1인 1메뉴 이상 주문하여야 합니다. 해당 내용에 동의합니다.<br></br><br></br>

5. 예약 취소 가능성<br></br>
무료 서비스로 제공되는 예약 시스템 특성상, 카페의 내부 사정 또는 기타 불가피한 사유로 인해 예약이 취소될 수 있습니다.<br></br> 이 경우 사전에 안내드리도록 노력하며, 이에 대해 동의합니다.<br></br><br></br>
___________________________________________________________<br></br><br></br>
[카페 매니저]<br></br>

3. 예약 관리 책임<br></br>
카페 사장은 cafe-in 플랫폼을 통해 예약된 이용자 정보를 확인하고 관리할 책임이 있습니다.<br></br> 예약 취소 및 변경 사항은 이용자에게 신속히 전달할 의무가 있습니다.<br></br><br></br>

4. 서비스 품질 유지<br></br>
cafe-in 플랫폼을 통해 예약된 고객에게 최상의 서비스를 제공하기 위해 노력해야 하며, 카페 내 규정과 서비스 품질을 유지해야 합니다.<br></br><br></br>

5. 카페 정보 관리<br></br>
카페의 운영 시간, 예약 가능 시간, 1인 1메뉴 주문 규정 등 이용자에게 표시되는 카페 정보를 정확히 관리해야 하며,<br></br> 정보를 허위로 제공하지 않는 것에 동의합니다.</p>
              </div>
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <label htmlFor="termsCheckbox">이용 약관에 동의합니다.</label>
              </div>
            </div>

            <div className="register-button">
              <button onClick={signupFun} disabled={!termsAccepted}>
                회원가입
              </button>
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

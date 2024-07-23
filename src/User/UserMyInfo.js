import Footer from "../Footer";
import UserNav from "./UserNav";
import "./UserMyInfo.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addAuthHeader } from "../apis/axiosConfig";
import { checkPassword } from "../apis/UserInfo";
import Swal from "sweetalert2";

const UserMyInfo = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkPassword(password);
      if (response.data.isSuccess && response.data.data) {
        navigate("/user/myinfo/update");
      } else {
        Swal.fire({
          icon: "error",
          title: "",
          text: "비밀번호가 일치하지 않습니다.",
          confirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#FFCD4A",
          customClass: {
            confirmButton: 'no-outline',
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <usermyinfo>
      <UserNav />
      <div className="myUserInfo-container">
        <div className="myUserInfo-title">
          <p>내 정보 변경</p>
        </div>
        <hr />
        <div className="myUserInfo-inform">
          <p>
            <span>개인 정보 보호</span>를 위해
            <br />
            비밀번호를 입력해주세요
          </p>
        </div>
        <div className="myUserInfo-input">
          <label>비밀번호</label>
          <input type="password" onChange={handlePasswordChange} />
        </div>
        <div className="myUserInfo-button">
          <Link to="/user/myinfo/update">
            <button onClick={handleSubmit}>확인하기</button>
          </Link>
        </div>
      </div>
      <Footer />
    </usermyinfo>
  );
};
export default UserMyInfo;

import Footer from "../Footer";
import UserNav from "./UserNav";
import "./UserInfoUpdate.css";
import { addAuthHeader } from "../apis/axiosConfig";
import { updatePassword } from "../apis/UserInfo";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UserInfoUpdate = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "비밀번호 확인이 잘못되었습니다.",
        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: "no-outline",
        },
      });
      return;
    }

    try {
      const response = await updatePassword({ password: newPassword });
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <userinfoupdate>
      <UserNav />
      <div className="userinfoupdate_form">
        <div className="userinfoupdate_header">
          <h1>
            비밀번호 변경
            <hr />
          </h1>
        </div>
        <div className="userpasswordupdate">
          <input
            type="password"
            placeholder="새 비밀번호"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="userinfoupdatebutton">
          <Link to="/user">
            <button onClick={changePassword}>
              <h5>변경하기</h5>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </userinfoupdate>
  );
};
export default UserInfoUpdate;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserReservationStatusEmpty.css";
import UserNav from "./UserNav";
import Footer from "../Footer";

const UserReservationStatusStatusEmpty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoBack = () => {
      // 뒤로가기
      window.history.navigate(-2);
    };

    // 페이지가 언마운트될 때 뒤로가기 이벤트를 제거합니다.
    return () => {
      window.removeEventListener("popstate", handleGoBack);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  return (
    <userreservationstatusempty>
      <UserNav />
      <div className="userreservationstatusstatusempty">
        <div className="noreserv">
          <h1 className="x">X</h1>
          <div className="no-reserve-main-content">
            <p>
              <span>윤형우 고객님 </span>
              예약된 사항이 없습니다.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </userreservationstatusempty>
  );
};

export default UserReservationStatusStatusEmpty;

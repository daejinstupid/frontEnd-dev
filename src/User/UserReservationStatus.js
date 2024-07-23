import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import "./UserReservationStatus.css";
import Footer from "../Footer";
import { reservationNow } from "../apis/UserReservation";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UserReservationStatus = () => {
  const [reservationStatus, setReservationStatus] = useState({});
  const [progress, setProgress] = useState(0);
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const readReservationStatus = async () => {
    try {
      const response = await reservationNow(reservationId);
      setReservationStatus(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "예약하신 정보가 없습니다.",
        Button: true,
        ButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: "no-outline",
        },
      });
      navigate(-1);
    }
  };
  useEffect(() => {
    readReservationStatus();
    let interval = setInterval(readReservationStatus, 6000);

    if (reservationStatus.status === "A" && progress < 90) {
      interval = setInterval(() => {
        setProgress((oldProgress) => Math.min(oldProgress + 1, 90));
      }, 900);
    }
    if (reservationStatus.status === "P") {
      setProgress(100);
      clearInterval(interval);
    }
    if (reservationStatus.status === "N") {
      navigate(`/user/reservationstatus/cancle/${reservationId}`);
    }
    if (reservationStatus.reservationId === "undefined") {
      alert("예약하신 정보가 없습니다");
      navigate(-1);
    }
    return () => clearInterval(interval);
  }, [
    reservationStatus.status,
    reservationStatus.reservationId,
    progress,
    navigate,
    reservationId,
  ]);

  return (
    <userreservationstatus>
      <UserNav reservationId={reservationId} />
      <div className="reservation-status">
        {reservationStatus && reservationStatus.userRealName && (
          <div className="reservation_username">
            <h1>
              <span>{reservationStatus.userRealName}</span> 고객님
              <hr />
            </h1>
          </div>
        )}
        <div className="reservation_status_text">
          <h5>신청</h5>
          <h5>진행</h5>
        </div>
        <div className="progress-bar">
          <div
            className={`step ${
              reservationStatus.status === "A" ? "progressbar_1" : ""
            }`}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={`step ${
              reservationStatus.status === "P" ? "progressbar_2" : ""
            }`}
          ></div>
        </div>
        <div className="reservation_bottom">
          {reservationStatus && reservationStatus.status && (
            <h4>
              고객님의 예약이{" "}
              <span>
                {reservationStatus.status === "A" && "신청"}
                {reservationStatus.status === "P" && "진행"}
              </span>{" "}
              상태 입니다.
            </h4>
          )}
        </div>
        <Link to="/user/myreservation">
          {reservationStatus.status === "P" && (
            <div className="link_reservationList">
              <button>예약 내역 조회하기</button>
            </div>
          )}
        </Link>
      </div>
      <div className="status_footer">
        <Footer />
      </div>
    </userreservationstatus>
  );
};

export default UserReservationStatus;

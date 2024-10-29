import { useEffect, useState } from "react";
import Footer from "../Footer";
import { reservationCancel } from "../apis/UserReservation";
import UserNav from "./UserNav";
import "./UserReservationStatusCancel.css";
import { useParams } from "react-router-dom";

const UserReservationStatusCancel = () => {
  const [cancelReason, setCancelReason] = useState({});
  const { reservationId } = useParams();

  useEffect(() => {
    const cancelReservationCancel = async () => {
      try {
        const response = await reservationCancel(reservationId);
        setCancelReason(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    cancelReservationCancel();
  }, []);
  return (
    <userreservationstatuscancel>
      <UserNav />
      <div className="status_cancel_form">
        <div className="status_cancel_img">
          <img src="/assets/sorry-512.png" />
        </div>
        <div className="status_cancel_text">
          <h1>
            죄송합니다.
            <br />
            {cancelReason.cancelContent}
          </h1>
          <br></br>
          <br></br>
          <h2>카페 전화번호 : {cancelReason.cafeTel}</h2>
        </div>
      </div>
      <Footer />
    </userreservationstatuscancel>
  );
};
export default UserReservationStatusCancel;

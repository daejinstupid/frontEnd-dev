import { useEffect, useState } from "react";
import Footer from "../Footer";
import { reservationCancle } from "../apis/UserReservation";
import UserNav from "./UserNav";
import "./UserReservationStatusCancle.css";
import { useParams } from "react-router-dom";

const UserReservationStatusCancle = () => {
  const [cancleReason, setCancleReason] = useState({});
  const { reservationId } = useParams();

  useEffect(() => {
    const cancleReservationCancle = async () => {
      try {
        const response = await reservationCancle(reservationId);
        setCancleReason(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    cancleReservationCancle();
  }, []);
  return (
    <userreservationstatuscancle>
      <UserNav />
      <div className="status_cancle_form">
        <div className="status_cancle_img">
          <img src="/assets/sorry-512.png" />
        </div>
        <div className="status_cancle_text">
          <h1>
            죄송합니다.
            <br />
            <br />
            {cancleReason.cancleContent}
          </h1>
          <h2>카페 전화번호 : {cancleReason.cafeTel}</h2>
        </div>
      </div>
      <Footer />
    </userreservationstatuscancle>
  );
};
export default UserReservationStatusCancle;

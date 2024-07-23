import { useEffect, useState } from "react";
import UserNav from "./UserNav";
import "./UserMyReservation.css";
import Footer from "../Footer";
import UserMyReservationBefore from "./UserMyReservationBefore";
import UserMyReservationAfter from "./UserMyReservationAfter";

const UserMyReservation = () => {
  const [activeTab, setActiveTab] = useState("진행");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  useEffect(() => {
    const saveTab = localStorage.getItem("activeTab");
    if (saveTab) {
      setActiveTab(saveTab);
    }

    return () => {
      localStorage.removeItem("activeTab");
    };
  }, []);

  return (
    <usermyreservation>
      <UserNav />
      <div className="status-tab-container_user">
        <div className="user_reservation-status-top">
          <p className="user_reservation-status-title">예약현황</p>
          <hr className="status-tab-hr" />
        </div>
        <div className="user_tab-buttons">
          <button
            className={`inProgressButton ${
              activeTab === "진행" ? "active" : ""
            }`}
            onClick={() => handleTabChange("진행")}
          >
            진행
          </button>
          <button
            className={`upcomingButton ${activeTab === "확정" ? "active" : ""}`}
            onClick={() => handleTabChange("확정")}
          >
            확정
          </button>
        </div>
        <div className="test_img">
          <img className="test_img_img" src="/assets/zerocar_img.png" />
          <div className="user_tab-content">
            {activeTab === "진행" ? (
              <UserMyReservationBefore />
            ) : (
              <UserMyReservationAfter />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </usermyreservation>
  );
};
export default UserMyReservation;

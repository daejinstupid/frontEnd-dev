import { useEffect, useState } from "react";
import Footer from "../../Footer";
import ManagerNav from "../ManagerNav";
import InProgressTabContent from "./InProgressTabContent";
import UpcomingTabContent from "./UpcomingTabContent";
import './ManagerReservationStatus.css'

const ManagerReservationStatus = () => {
  const [activeTab, setActiveTab] = useState('진행');  

  const handleTabChange = (tab) => {
      setActiveTab(tab);
      localStorage.setItem('activeTab', tab);
    };

  useEffect(() => {
    const saveTab = localStorage.getItem('activeTab');
    if(saveTab){
      setActiveTab(saveTab);
    }

    return () => {
      localStorage.removeItem('activeTab');
    };
  }, []);

  return (
    <managerreservationstatus>
      <ManagerNav />
      <div className="status-tab-full-container">
        <div className="banner">
          <img src="/assets/banner2.png" />
        </div>
        <div className="status-tab-container">
          <div className="reservation-status-top">
            <p className="reservation-status-title">예약현황</p>
            <hr className="status-tab-hr"/>
          </div>
          <div className="tab-buttons">
            <button className={`inProgressButton ${activeTab === '진행' ? 'active' : ''}`} 
                onClick={() => handleTabChange('진행')}>진행</button>
            <button className={`upcomingButton ${activeTab === '예정' ? 'active' : ''}`}
                onClick={() => handleTabChange('예정')}>예정</button>
          </div>
          <div className="tab-content">
            {activeTab === '진행' ? <InProgressTabContent /> : <UpcomingTabContent />}
          </div>
        </div>
      </div>
      <Footer />
    </managerreservationstatus>
  );
};
export default ManagerReservationStatus;

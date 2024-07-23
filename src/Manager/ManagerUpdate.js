import "./ManagerRegister.css";
import ManagerNav from "./ManagerNav";
import ManagerUpdateSideBar from "./ManagerUpdateSideBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import { useState } from "react";
import EmptyRegister from "./EmptyRegister";
import "./ManagerUpdate.css";
const ManagerUpdate = () => {
  const [CheckCafeReg, setCheckCafeReg] = useState(true);
  const handleCafeCheck = (isCafeRegistered) => {
    setCheckCafeReg(isCafeRegistered);
  };

  return (
    <div className="manager">
      <ManagerNav />
      <div className="manager-background">
        {CheckCafeReg ? (
          <>
            <ManagerUpdateSideBar />
            <div className="content-container"> {/* 추가된 컨테이너 */}
            <Outlet context={{ onCafeCheck: handleCafeCheck }} />
            </div>
          </>
        ) : (
          <EmptyRegister />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default ManagerUpdate;

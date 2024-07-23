import "./ManagerRegister.css";
import Footer from "../Footer";
import Header from "../Header";
import EmptyRegister from "./EmptyRegister";
import ManagerUpdateBasic from "./ManagerUpdateBasic";
import ManagerUpdateDetail from "./ManagerUpdateDetail";
import ManagerUpdateStudySetting from "./ManagerUpdateStudySetting";
import ManagerNav from "./ManagerNav";
import { Link } from "react-router-dom";

const ManagerRegister = () => {
  return (
    <div className="manager">
      <ManagerNav />

      {/* <EmptyRegister/> */}
      <ManagerUpdateStudySetting />
      <Footer />
    </div>
  );
};
export default ManagerRegister;

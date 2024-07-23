import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./Maintest.css";

const Maintest = () => {
  return (
    <maintest>
      <div className="test">
        <div className="test_header">
          <img src="./assets/logo_text_4-1.png" />
        </div>
        <div className="test_link">
          <div className="link_manager">
            <div className="link">
              <Link to="/manager">MANAGER</Link>
            </div>
          </div>
          <div className="link_user">
            <Link to="/user">USER</Link>
          </div>
        </div>
      </div>
    </maintest>
  );
};
export default Maintest;

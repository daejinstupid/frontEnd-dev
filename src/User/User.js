import React from "react";
import Footer from "../Footer";
import UserNav from "./UserNav";
import "./User.css";

const User = () => {
  return (
    <div className="user">
      <UserNav />
      <div className="user_index">
        <div className="user_index_text">
          {/* <h1>cafe - in</h1> */}
          {/* <p>
            저희 cafe-in은 나만의 카페를 검색하고 매칭 시켜주는 시스템을
            제공합니다.
          </p>
          <p>
            일반 이용객을 넘어서, 카페에서 스터디를 하시고싶은 고객님들의 카페
            라이프를 실현시키겠습니다.
          </p>
          <p>매장 찾기를 통해 나만의 아지트 카페를 찾아보세요!</p> */}
        </div>
        <div className="user_index_section">
          <div className="user_index_section1">
            <img src="/assets/index_user_img3.jpg" alt="Study Place" />
            <div className="user_index_section1_text">
              <h1>
                스터디 플레이스는 <br />
                cafe-in과 함께!
              </h1>
            </div>
          </div>
          <div className="user_index_section2">
            <div className="user_index_section2_text">
              <h1>
                cafe-in 만의 검색 기능을 통해 <br /> 자신만의 아지트를
                찾아보세요!
              </h1>
            </div>
            <img src="/assets/index_user_img4.jpg" alt="Search Cafe" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;

import { Link } from "react-router-dom";
import "./UserSearchCafeInfo.css";
import { useEffect, useState } from "react";
import UserCafeInfoSlide from "./UserCafeInfoSlide";
import { cafeInfo } from "../apis/Search";

const UserSearchCafeInfo = ({ cafeId, onClose }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCafeInfo, setCafeInfo] = useState({});

  const handleCloseComponent = () => {
    setShowInfo(false);
    onClose();
  };

  useEffect(() => {
    const searchCafeIdInfo = async () => {
      try {
        if (cafeId) {
          const response = await cafeInfo(cafeId);
          setCafeInfo(response.data.data);
        } else {
          console.error("cafeId가 제공되지 않았습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    searchCafeIdInfo();
  }, [cafeId]);

  return (
    <usersearchcafeinfo>
      <div className="UserSearchCafeInfo_header">
        <img
          className="search-left-arrow"
          onClick={handleCloseComponent}
          src="/assets/left-arrow.png"
        />
        <h2>{showCafeInfo.cafeName}</h2>
      </div>
      <div className="usersearchcafeinfo_img">
        <UserCafeInfoSlide cafeImages={showCafeInfo.detailImgs} />
      </div>
      <div className="usersearchcafeinfo_section">
        <div className="usersearchcafeinfo_sections">
          <img src="/assets/search-address.png" />
          <p>{showCafeInfo.address}</p>
        </div>
        <div className="usersearchcafeinfo_sections">
          <img src="/assets/search-clock.png" />
          <p>
            {showCafeInfo.startTime} ~ {showCafeInfo.endTime}
          </p>
        </div>
        <div className="usersearchcafeinfo_sections">
          <img src="/assets/search-phone.png" />
          <p>{showCafeInfo.cafeTel}</p>
        </div>
        <div className="usersearchcafeinfo_sections">
          <img src="/assets/search-keywords.png" />
          <p>
            {Array.isArray(showCafeInfo.features)
              ? showCafeInfo.features
                  .map((feature) => feature.featureName)
                  .join(", ")
              : "특징 정보 없음"}
          </p>
        </div>
        <div className="usersearchcafeinfo_sections">
          <img src="/assets/search-check.png" />
          <p>{showCafeInfo.study === "Y" ? "카공 가능" : "카공 불가능"}</p>
        </div>
      </div>

      {/* 예약하기 버튼 */}
      {showCafeInfo.study === "Y" && (
        <Link
          to={{
            pathname: `/user/reservation/${cafeId}`,
            state: { cafeId: cafeId },
          }}
        >
          <div className="go_to_reservation">
            <button>예약하기</button>
          </div>
        </Link>
      )}

      {/* 리뷰보기 버튼 */}
      <div className="go_to_review">
        <Link to={`/user/reservation/review/${cafeId}`}>
          <button>리뷰보기</button>
        </Link>
      </div>
    </usersearchcafeinfo>
  );
};

export default UserSearchCafeInfo;

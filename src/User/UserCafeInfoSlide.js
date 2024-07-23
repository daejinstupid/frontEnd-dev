import React from "react";
import Slider from "react-slick";
import "./UserCafeInfoSlide.css";

const UserCafeInfoSlide = ({ cafeImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <usercafeinfoslide>
      <div className="user_cafe_info_slide">
        <Slider {...settings}>
          {Array.isArray(cafeImages) ? (
            cafeImages.map((image, index) => (
              <div key={index} className="cafe-info-slide">
                <img
                  src={`data:image/;base64,${image}`}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <p>No images available</p> // 또는 다른 대체 컨텐츠
          )}
        </Slider>
      </div>
    </usercafeinfoslide>
  );
};
const NextArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} className="cafe_info_next" type="button">
      <img src="/assets/right_arrow.png" />
    </button>
  );
};
const PrevArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} className="cafe_info_prev" type="button">
      <img src="/assets/left_arrow.png" />
    </button>
  );
};
export default UserCafeInfoSlide;

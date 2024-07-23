import { useState } from "react";
import "./CafeImage.css";
import Swal from "sweetalert2";

const CafeImage = ({onImageChange, cafeImages }) => {
  const handleTitleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageChange({ ...cafeImages, titleFile: file });
    }
  };

  const handleDetailFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: `상세 사진은 최대 5장까지만 선택할 수 있습니다..`,
        
        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: 'no-outline',
        }
    })
      // alert("상세 사진은 최대 5장까지만 선택할 수 있습니다.");
      event.target.value = ""; // input 필드 초기화
      return;
    }
    onImageChange({ ...cafeImages, detailFiles: files });
  };

  return (
    <div className="cafe-register-box">
      <div className="cafe-register-title">
        <p>카페 사진을 <br />등록해주세요</p>
        <hr />
      </div>
      <div className="cafe-register-content">
        <div className="image-input">
          <div>
            <p>대표사진 등록</p>
            <input 
            className="study-img-file"
              type="file"
              onChange={handleTitleFileChange}
              style={{ display: 'none' }}
              id="title-file-input"
            />
               <label htmlFor="title-file-input" className="study-img-file">
              {cafeImages.titleFile ? cafeImages.titleFile.name : "이미지 불러오기"}
            </label>
          </div>
          <div>
            <p>상세사진 등록</p>
            <input 
            className="study-img-file"
              type="file"
              multiple
              onChange={handleDetailFileChange}
              style={{ display: 'none' }}
              id="detail-file-input"
              accept="image/*"
            />
            <label htmlFor="detail-file-input" className="study-img-file">
              {cafeImages.detailFiles.length > 0
                ? `${cafeImages.detailFiles.length}개의 이미지 선택됨`
                : "이미지 불러오기"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeImage;

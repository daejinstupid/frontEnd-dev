import { useEffect, useState } from "react";
import "./CafeStudySetting.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CafeStudySetting = ({ onStudySettingChange, onFinalSubmit,initialStudySetting, initialFile  }) => {
  const navigate = useNavigate();
  const [studySetting, setStudySetting] = useState(initialStudySetting || "");
  const [isDivVisible, setDivVisible] = useState(initialStudySetting === "Y");
  const [selectedFile, setSelectedFile] = useState(initialFile);

  useEffect(() => {
    // 이전 설정값을 기반으로 초기 상태 설정
    setStudySetting(initialStudySetting || "");
    setDivVisible(initialStudySetting === "Y");
    setSelectedFile(initialFile);
  }, [initialStudySetting, initialFile]);

  const handleStudySettingRadioChange = (event) => {
    setStudySetting(event.target.value);
    setDivVisible(event.target.value === "Y");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    onStudySettingChange({
      studySetting,
      floorPlanFile: selectedFile
    });
  }, [studySetting, selectedFile, onStudySettingChange]);

  const handleFinalSubmitWrapper = () => {
    if (studySetting === '') {
      Swal.fire({
        icon: "warning",
        title: "",
        text: `카공 운영 여부를 선택해주세요.`,
        
        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: 'no-outline',
        }
    })
      // alert('카공 운영 여부를 선택해주세요.');
    } else if (studySetting === 'Y' && !selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: `평면도 이미지를 업로드해야 합니다. `,
        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: 'no-outline',
        }
    })
      // alert('카공 운영을 선택한 경우, 평면도 이미지를 업로드해야 합니다.');
    } else {
      onFinalSubmit(); // 실제 제출 함수 호출
      navigate('/manager'); // 여기서 페이지 이동
    }
  };

  return (
    <div className="cafe-register-box">
      <div className="cafe-register-title">
        <p>카공 정보를 <br />입력해주세요</p>
        <hr />
      </div>
      <div className="cafe-register-content">
        <div className="study-setting-div">
          <p>카공 운영</p>
          <div className="study-setting-radio">
            <div>
              <input
                  type="radio"
                  name="studySetting"
                  value="Y"
                  id="cafeStatusTrue"
                  checked={studySetting === "Y"}
                  onChange={handleStudySettingRadioChange} /> 
              <label htmlFor="cafeStatusTrue">운영</label>
            </div>
            <div>
              <input
                type="radio"
                name="studySetting"
                value="N"
                id="cafeStatusFalse"
                checked={studySetting === "N"}
                onChange={handleStudySettingRadioChange} /> 
              <label htmlFor="cafeStatusFalse">미 운영</label>
            </div>
          </div>
        </div>
        
        {isDivVisible && (
          <div className="study-setting-div">
            <p>평면도 등록</p>
            <input className="study-setting-floorplan"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="study-setting-floorplan">
              {selectedFile ? selectedFile.name : "이미지 불러오기"}
            </label>
        </div>
        )}
       <button className="cafe-final-register" onClick={handleFinalSubmitWrapper}>
  카페 등록하기
</button>
      </div>
    </div>
  );
};

export default CafeStudySetting;

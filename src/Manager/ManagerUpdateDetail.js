import React, { useEffect, useState } from "react";
import "./ManagerUpdateDetail.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {managerDetailRead,managerDetailCafeTimeUpdate, managerDetailCafeFeatureUpdate} from "./../apis/ManagerUpdateAxios";
import { async } from "q";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

function ManagerUpdateDetail() {
  const roundToHour = (date) => {
    date.setMinutes(0);
    return date;
  };

  const [showFindTime, setShowFindTime] = useState(false);
  const [showFindChips, setShowFindChips] = useState(false);
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [savedChips, setSavedChips] = useState(new Set());
  
  const [startTime, setStartTime] = useState(roundToHour(new Date()));
  const [endTime, setEndTime] = useState(roundToHour(new Date()));

  const [tempStartTime, setTempStartTime] = useState(startTime);
  const [tempEndTime, setTempEndTime] = useState(endTime);
 

  

  
  const handleChangeStartTime = (time) => {
    setStartTime(time);
  };

  const handleChangeEndTime = (time) => {
    setEndTime(time);
  };

  const toggleFindTime = () => {
    setShowFindTime(!showFindTime);
  };

  const handleChangeTempStartTime = (time) => {
    setTempStartTime(time);
  };

  const handleChangeTempEndTime = (time) => {
    setTempEndTime(time);
  };

  const toggleFindChips = () => {
    setShowFindChips(!showFindChips);
  };

  const handleSelectChip = (chip) => {
    setSelectedChips((prevSelectedChips) => {
      const newSelectedChips = new Set(prevSelectedChips);
      if (newSelectedChips.has(chip)) {
        newSelectedChips.delete(chip);
      } else {
        newSelectedChips.add(chip);
      }
      return newSelectedChips;
    });
  };

  const formatTime = (date) => {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const handleSaveTime = async () => {
    if (tempStartTime >= tempEndTime) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: `시작 시간은 종료 시간보다 빨라야 합니다.`,
        
        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: 'no-outline',
        }
    })
      // alert("시작 시간은 종료 시간보다 빨라야 합니다.");
      return;
    }
  
    try {
      const updatedStartTime = formatTime(tempStartTime);
      const updatedEndTime = formatTime(tempEndTime);
  
      const updatedTime = {
        startTime: updatedStartTime,
        endTime: updatedEndTime,
      };
  
      const response = await managerDetailCafeTimeUpdate(updatedTime);
      if (response.data.isSuccess) {
        setStartTime(tempStartTime);
        setEndTime(tempEndTime);
        setShowFindTime(false);
      } else {
        console.log("시간 업데이트 실패: ", response.data.message);
      }
    } catch (error) {
      console.error("API 호출 중 에러 발생: ", error);
    }
  };

 
 const handleSaveChips = async () => {

  try {
    const features = {
      "comfortableSeats": selectedChips.has("24시간"),
      "hasDesserts": selectedChips.has("1인실"),
      "quiet": selectedChips.has("세미나실"),
      "noMusic": selectedChips.has("음악 없음"),
      "sentimental": selectedChips.has("감성적"),
      "hasPowerOutlets": selectedChips.has("콘센트")
    };

    const response = await managerDetailCafeFeatureUpdate(features);
    if (response.data.isSuccess) {
    setSavedChips(new Set(selectedChips));
    setShowFindChips(false);

    } else {
      console.log("특성 업데이트 실패: ", response.data.message);
    }
  } catch (error) {
    console.error("API 호출 중 에러 발생: ", error);
  }

  };

 

  const ChipButton = ({ chip }) => {
    const isSelected = selectedChips.has(chip);
    const chipClass = `ManagerUpdateBasic-Container-Chips-Button ${
      isSelected ? "select-Chips" : ""
    }`;
    return (
      <button className={chipClass} onClick={() => handleSelectChip(chip)}>
        {chip}
      </button>
    );
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // API 호출을 통해 카페 정보를 가져옵니다.
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await managerDetailRead(); // API 호출
        if (response.data.isSuccess) {
          const { detailResponse, featureResponse } = response.data.data;

          // 카페 운영 시간 설정
          const startTime = new Date();
          const endTime = new Date();
          const tempStartTime = new Date();
          const tempEndTime = new Date();

          startTime.setHours(...detailResponse.startTime.split(':'));
          endTime.setHours(...detailResponse.endTime.split(':'));
          tempStartTime.setHours(...detailResponse.startTime.split(':'));
          tempEndTime.setHours(...detailResponse.endTime.split(':'));
          setStartTime(startTime);
          setEndTime(endTime);
          setTempStartTime(startTime);
          setTempEndTime(endTime);

          // 카페 특성 설정
          const featureSet = new Set(featureResponse.featureIds);
          const initialChips = ["세미나실", "음악 없음", "24시간", "1인실", "감성적", "콘센트"].map(
            (chip, index) => ({ name: chip, selected: featureSet.has(index + 22) })
          );
          setSelectedChips(new Set(initialChips.filter(chip => chip.selected).map(chip => chip.name)));
          setSavedChips(new Set(initialChips.filter(chip => chip.selected).map(chip => chip.name)));
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생: ", error);
      }finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ManagerUpdateDetail">
       {isLoading ? (
        <div className="Manager-res-spinner-container">
          <PulseLoader color="#929292" margin={5} size={15} speedMultiplier={0.5}/>
          <h4>카페 정보를 불러오는중</h4>
        </div>
      ) : (
        <>
      <div className="ManagerUpdateDetail-Container">
        <div className="ManagerUpdateDetail-Container-Items">
          {/* 카페 운영시간 */}
          <div className="ManagerUpdateDetail-Container-Time">
            <div className="ManagerUpdateDetail-Container-Time-Text">
              <h2>운영시간</h2>
              <button onClick={toggleFindTime}>수정</button>
            </div>
            <div className="ManagerUpdateDetail-Container-Time-labeling">
              <label>카페 시작 시간</label>
            </div>
            <div className="ManagerUpdateBasic-Container-Time-Input">
              <DatePicker
                className="ManagerUpdateBasic-Container-DatePicker"
                selected={startTime}
                  onChange={handleChangeStartTime}
                timeFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
                disabled
              />
            </div>

            <div className="ManagerUpdateDetail-Container-Time-labeling">
              <label>카페 종료 시간</label>
            </div>
            <div className="ManagerUpdateBasic-Container-Time-Input">
              <DatePicker
                className="ManagerUpdateBasic-Container-DatePicker"
                selected={endTime}
                onChange={handleChangeEndTime}
                timeFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
                disabled
              />
            </div>
          </div>

          <div
            className={`ManagerUpdateDetail-Container-Time Update-Container ${
              !showFindTime ? "hidden" : ""
            }`}
          >
            <div className="ManagerUpdateDetail-Container-Time-Text">
              <h2>운영시간 수정</h2>
            </div>
            <div className="ManagerUpdateDetail-Container-Time-labeling">
              <label>카페 시작 시간</label>
            </div>
            <div className="ManagerUpdateBasic-Container-Time-Input">
              <DatePicker
                className="ManagerUpdateBasic-Container-DatePicker"
                selected={tempStartTime}
                onChange={handleChangeTempStartTime}
                timeFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
              />
            </div>

            <div className="ManagerUpdateDetail-Container-Time-labeling">
              <label>카페 종료 시간</label>
            </div>
            <div className="ManagerUpdateBasic-Container-Time-Input">
              <DatePicker
                className="ManagerUpdateBasic-Container-DatePicker"
                selected={tempEndTime}
                  onChange={handleChangeTempEndTime}
                timeFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
              />
            </div>
            <div className="ManagerUpdateDetail-Container-Time-Button">
            <button onClick={toggleFindTime}>취소</button>
            <button onClick={handleSaveTime}>저장</button>
            </div>
          </div>

          {/* 카페 특성 */}
          <div className="ManagerUpdateDetail-Container-Chips">
            <div className="ManagerUpdateDetail-Container-Chips-labeling">
              <h2>카페 특성</h2>
              <button onClick={toggleFindChips}>수정</button>
            </div>
            <div className="ManagerUpdateBasic-Container-Chips-Input">
              {/* 저장된 특성만 출력 */}
              {Array.from(savedChips).map((chip) => (
                <button
                  key={chip}
                  className="ManagerUpdateBasic-Container-Chips-Button"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* 카페 특성 수정 */}
          {showFindChips && (
            <div className="ManagerUpdateDetail-Container-Chips Update-Container">
              <div className="ManagerUpdateDetail-Container-Chips-labeling">
                <h2>카페 특성 수정</h2>
              </div>
              <div className="ManagerUpdateBasic-Container-Chips-Input">
                {[
                  "세미나실",
                  "음악 없음",
                  "24시간",
                  "1인실",
                  "감성적",
                  "콘센트",
                ].map((chip) => (
                  <ChipButton key={chip} chip={chip} />
                ))}
              </div>
              <div className="ManagerUpdateDetail-Container-Chips-Button">
                <button onClick={toggleFindChips}>취소</button>
                <button onClick={handleSaveChips}>저장</button>
              </div>
            </div>
          )}
         
        </div>
        
      </div>
      </>
          )}
    </div>
    
  );
}

export default ManagerUpdateDetail;

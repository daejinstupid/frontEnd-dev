import { useEffect, useState } from "react";
import "./CafeType.css";

const CafeType = ({ cafeType, setCafeType }) => {

  const handleTypeRadioChange = (event) => {
    setCafeType(event.target.value);
  };
 
  return (
    <div className="cafe-register-box">
      <div className="cafe-register-title">
        <p>카페 유형을 <br />선택해주세요</p>
        <hr />
      </div>
      <div className="cafe-register-content">
        <div className="type-radio">
          <div>
            <input
                type="radio"
                id="typeIndividual"
                name="cafeType"
                value="G"
                checked={cafeType === "G"}
                onChange={handleTypeRadioChange} /> 
            <label htmlFor="typeIndividual">개인</label>
          </div>
          <div>
            <input
              type="radio"
              id="typeFranchise"
              name="cafeType"
              value="P"
              checked={cafeType === "P"}
              onChange={handleTypeRadioChange} /> 
            <label htmlFor="typeFranchise">프랜차이즈</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeType;

import { useEffect, useState } from "react";
import "./CafeFeature.css";

const CafeFeature = ({ onFeaturesChange, selectedFeatures }) => {
  const featureMapping = {
    "조용함": "quiet",
    "음악 없음": "noMusic",
    "편한 좌석": "comfortableSeats",
    "디저트": "hasDesserts",
    "감성적": "sentimental",
    "콘센트": "hasPowerOutlets"
  };

  // selectedFeatures로부터 선택된 특성을 Set으로 초기화
  const initialSelectedChips = new Set(Object.entries(selectedFeatures)
    .filter(([feature, isSelected]) => isSelected)
    .map(([feature]) => Object.keys(featureMapping).find(key => featureMapping[key] === feature)));

  const [selectedChips, setSelectedChips] = useState(initialSelectedChips);

  const handleSelectChip = (chip) => {
    setSelectedChips((prevSelectedChips) => {
      const newSelectedChips = new Set(prevSelectedChips);
      if (newSelectedChips.has(chip)) {
        newSelectedChips.delete(chip);
      } else {
        newSelectedChips.add(chip);
      }
      updateFeatures(newSelectedChips);
      return newSelectedChips;
    });
  };

  // 상태가 변경되면 부모 컴포넌트에 업데이트 전달
  const updateFeatures = (chips) => {
    const updatedFeatures = Object.keys(featureMapping).reduce((acc, feature) => {
      acc[featureMapping[feature]] = chips.has(feature);
      return acc;
    }, {});
    onFeaturesChange(updatedFeatures);
  };

  const ChipButton = ({ chip }) => {
    const isSelected = selectedChips.has(chip);
    const chipClass = `cafeFeature-Chips ${isSelected ? "select-Features" : ""}`;
    return (
      <button className={chipClass} onClick={() => handleSelectChip(chip)}>
        {chip}
      </button>
    );
  };

  return (
    <div className="cafe-register-box">
      <div className="cafe-register-title">
        <p>카페 특성을 선택해주세요</p>
        <hr />
      </div>
      <div className="cafeFeature-Chips">
        {Object.keys(featureMapping).map((chip) => (
          <ChipButton key={chip} chip={chip} />
        ))}
      </div>
    </div>
  );
};

export default CafeFeature;

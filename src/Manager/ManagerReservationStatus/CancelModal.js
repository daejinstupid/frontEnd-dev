import React, { useState } from "react";
import "./CancelModal.css";
import Swal from "sweetalert2";

const CancelModal = ({ isOpen, onClose, onConfirm, reservationIds }) => { // 'reservationIds'로 수정

  const [cancelReasonId, setCancelReason] = useState("");

  const handleReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  const handleConfirm = () => {
    if (cancelReasonId) {
      onConfirm(reservationIds, cancelReasonId); // 'reservationIds'로 수정
    } else {
      Swal.fire({
        icon: "warning",
        title: "",
        text: "취소 사유를 선택해주세요.",
        confirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#FFCD4A",
        customClass: {
          confirmButton: 'no-outline',
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
      <div className="cancel-modal">
        <div className="cancel-modal-content">
          <p className="cancel-title">예약을 취소하시겠습니까?</p>
          <p className="cancel-inform">취소가 확정된 이후에는 되돌릴 수 없습니다.<br />취소 사유를 선택해주세요.</p>
          <select className="cancel-reason" defaultValue="" onChange={handleReasonChange}>
            <option value="" disabled>취소사유를 선택해주세요</option>
            <option value="F">영업종료</option>
            <option value="N">손님 미도착</option>
            <option value="I">카페 내부 사정</option>
            <option value="B">카페 내부 분위기 저해</option>
            <option value="E">기타</option>
          </select>
          <div className="cancel-modal-buttons">
            <button className="cancel-modal-close-button" onClick={onClose}>닫기</button>
            <button className="cancel-modal-confirm-button" onClick={handleConfirm}>취소 확정</button>
          </div>
        </div>
      </div>
  );
};

export default CancelModal;

import React, { useState } from "react";
import "./RejectModal.css";
import Swal from "sweetalert2";

const CancelModal = ({ isOpen, onClose, onConfirm, reservationIds }) => {
  const [cancelReasonId, setCancelReason] = useState("");

  const handleReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  const handleConfirm = () => {
    if (cancelReasonId) {
      onConfirm(reservationIds, cancelReasonId);
    } else {
      Swal.fire({
        icon: "warning",
        title: "",
        text: "거절 사유를 선택해주세요.",
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
          <p className="cancel-title">예약을 거절하시겠습니까?</p>
          <p className="cancel-inform">취소가 확정된 이후에는 되돌릴 수 없습니다.<br />취소 사유를 선택해주세요.</p>
          <select className="cancel-reason" defaultValue="" onChange={handleReasonChange}>
            <option value="" disabled>취소사유를 선택해주세요</option>
            <option value="Q">영업종료</option>
            <option value="W">손님 미도착</option>
            <option value="R">예약 초과</option>
            <option value="T">카페 내부 분위기 저해</option>
            <option value="Y">기타</option>
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

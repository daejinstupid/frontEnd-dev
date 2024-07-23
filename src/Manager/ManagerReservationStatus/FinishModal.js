import React from "react";
import "./FinishModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="finish-modal">
      <div className="finish-modal-content">
        <p className="finish-title">고객의 이용을 종료하시겠습니까?</p>
        <div className="finish-modal-buttons">
          <button className="finish-modal-close-button" onClick={onClose}>닫기</button>
          <button className="finish-modal-confirm-button" onClick={onConfirm}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
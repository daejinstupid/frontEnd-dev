import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal">
      <div className="confirm-modal-content">
        <p className="confirm-title">예약을 확정하시겠습니까?</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-modal-close-button" onClick={onClose}>닫기</button>
          <button className="confirm-modal-confirm-button" onClick={onConfirm}>확정</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
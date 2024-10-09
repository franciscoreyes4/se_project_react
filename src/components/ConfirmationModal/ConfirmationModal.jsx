import React from 'react';
import "./ConfirmationModal.css";
import closeIcon from "../../assets/close_btn.svg";

function ConfirmationModal({ isOpen, handleConfirmDelete, handleCloseClick }) {
  return (
    <div className={`confirmation-modal ${isOpen ? "confirmation-modal_opened" : ""}`}>
      <div className="confirmation-modal__content">
        <button
          onClick={handleCloseClick}
          type="button"
          className="confirmation-modal__close"
        >
          <img
            src={closeIcon}
            alt="close"
            className="confirmation-modal__close-icon"
          />
        </button>
        <p className='confirmation-modal__text'>Are you sure you want to delete this item?</p>
        <p className='confirmation-modal__text'>This action is irreversible.</p>
        <div className="confirmation-modal__button-container">
          <button onClick={handleConfirmDelete} className="confirmation-modal__confirm-button">
            Yes, delete item
          </button>
          <button onClick={handleCloseClick} className="confirmation-modal__cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

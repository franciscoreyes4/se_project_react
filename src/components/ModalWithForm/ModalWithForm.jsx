import React from "react";
import './ModalWithForm.css';
import closeBtn from "../../assets/close_btn.svg";

const ModalWithForm = ({ children, buttonText, title, isOpen, handleCloseClick, onSubmit, isButtonDisabled }) => {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleCloseClick} type="button" className="modal__close">
          <img src={closeBtn} alt="close" className="modal__close_button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;

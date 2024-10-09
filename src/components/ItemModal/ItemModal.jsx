import React from 'react';
import './ItemModal.css';
import closeBtn from "../../assets/close_btn.svg";

function ItemModal({ activeModal, handleCloseClick, card, onDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={handleCloseClick} type="button" className="modal__close">
          <img className="modal__close_button" src={closeBtn} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button className="modal__delete-button" onClick={() => onDeleteItem(card._id)}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

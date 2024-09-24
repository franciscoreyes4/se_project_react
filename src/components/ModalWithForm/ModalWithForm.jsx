import "./ModalWithForm.css";
import closeBtn from "../../assets/close_btn.svg";

function ModalWithForm({ children, buttonText, title, isOpen, handleCloseClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleCloseClick} type="button" className="modal__close">
          <img className="modal__close_button" src={closeBtn} alt="close" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
